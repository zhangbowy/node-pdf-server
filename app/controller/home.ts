'use strict';

import { Context } from 'egg';
import BaseController from './base';
import { formatDate } from '~/app/lib/utils';
import { SelfController, Get } from './../router'
function validate() {
  return (_target: HomeController, propertyKey: string, descriptor: PropertyDescriptor) => {
    const oldAsyncFunc = descriptor.value;
    descriptor.value = async function(ctx: Context) {
      console.info('validate in', propertyKey, ctx.app.config.HOME);
      await oldAsyncFunc.call(this, ctx);
    };
  };
}


@SelfController('/home')
export default class HomeController extends BaseController {
  [x: string]: any;
  @validate()
  @Get("/")
  public async index(): Promise<void> {
    const { ctx, service } = this;
    const time = service.time.today();
    this.app.logger.info(ctx.app.model.User.getData());
    this.app.logger.info(ctx.app.model.Castle.getData());
    this.app.logger.info(`request visit in ${formatDate(new Date())}`);
    this.app.logger.info(this.ctx.helper.test().ip);

    if (ctx.isAjax()) {
      ctx.body = { time };
    } else {
      ctx.body = `
      <div style="text-align: center;font-size: 24px;padding: 30px 0;">
        ${this.config.local ? this.config.local.msg : ''} <span id="time">${time}</span>
      </div>
      <script>
        setInterval(function() {
          var xhr = new XMLHttpRequest();
          xhr.open('GET', '/');
          xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
          xhr.send();
          xhr.onreadystatechange = function() {
            if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
              document.getElementById('time').innerText = JSON.parse(xhr.responseText).time;
            }
          }
        }, 1000);
      </script>
      `;
    }
  }

  /**
   * 
   */
  @Get('/list')
  public slider() {
    this.success();
  }
  public async error() {
    throw new Error('see the error stack!!');
  }
}
