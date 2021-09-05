
import BaseController from '../core/baseController';
import { SelfController as Controller, Get } from '../router'
@Controller('/permission')
export default class PermissionController extends BaseController {
  @Get("/list")
  public async orderList(): Promise<void> {
    this.success([], '请求成功');
  }

  /**
   * 
   */
  @Get('/update',)
  public slider() {
    this.success([], '请求成功');
  }
}
