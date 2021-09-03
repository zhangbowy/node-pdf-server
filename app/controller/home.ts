'use strict';

import { Context } from 'egg';
import BaseController from '../core/baseController';
import { SelfController as Controller, Get } from './../router'
function validate() {
  return (_target: HomeController, propertyKey: string, descriptor: PropertyDescriptor) => {
    const oldAsyncFunc = descriptor.value;
    descriptor.value = async function(ctx: Context) {
      console.info('validate in', propertyKey, ctx.app.config.HOME);
      await oldAsyncFunc.call(this, ctx);
    };
  };
}


@Controller('/home')
export default class HomeController extends BaseController {
  @validate()
  @Get("/")
  public async index(): Promise<void> {
  }

  /**
   * 
   */
  @Get('/list')
  public slider() {
    this.success([], '请求成功');
  }
  public async error() {
    throw new Error('see the error stack!!');
  }
}
