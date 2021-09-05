import BaseController from '@/core/baseController';
import { SelfController as Controller, Get } from './../router'
@Controller('/home')
export default class HomeController extends BaseController {
  @Get("/")
  public async index(): Promise<void> {
    this.success([], '请求成功');
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
