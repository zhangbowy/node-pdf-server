import BaseController from '@/core/baseController';
import { SelfController as Controller, Get } from '@/router';
// import { Auth } from '@/lib//decorator/auth';
// import { LoginType } from '@/lib/enum';
@Controller('/')
export default class HomeController extends BaseController {
  @Get('/')
  public async index(): Promise<void> {
    this.ctx.request.headers;
    this.success(this.ctx.request.headers, '请求成功');
  }

  @Get('/list')
  public slider() {
    this.success([], '请求成功');
  }
  public async error() {
    throw new Error('see the error stack!!');
  }
}
