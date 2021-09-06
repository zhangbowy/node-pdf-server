import BaseController from '@/core/baseController';
import { SelfController as Controller, Get } from './../router'
import { Auth } from '@/lib//decorator/auth'
import { LoginType } from '@/lib/enum'
@Controller('/home')
export default class HomeController extends BaseController {
  @Get("/")
  public async index(): Promise<void> {
    const token: any = this.app.jwt.sign({}, this.app.config.jwt.secret)
    this.success({token}, '请求成功');
  }

  /**
   * 
   */
  @Auth(LoginType.ADMIN)
  @Get('/list')
  public slider() {
    this.success([], '请求成功');
  }
  public async error() {
    throw new Error('see the error stack!!');
  }
}
