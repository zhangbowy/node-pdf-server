
import BaseController from '../core/baseController';
import { SelfController as Controller, Get } from '../router'
@Controller('/order')
export default class OrderController extends BaseController {
  @Get("/orderList")
  public async orderList(): Promise<void> {
    this.success([], '请求成功');
  }

  /**
   * 
   */
  @Get('/list',)
  public slider() {
    this.success([], '请求成功');
  }
}
