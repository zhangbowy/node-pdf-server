
import BaseController from '../core/baseController';
import { SelfController as Controller, Get } from '../router';
@Controller('/authority')
export default class PermissionController extends BaseController {
  @Get('/authorityList')
  public async orderList(): Promise<void> {
    const result = await this.ctx.service.test.getList();
    this.success(result, '请求成功');
  }

  /**
   * 
   */
  @Get('/update')
  public slider() {
    this.success([], '请求成功');
  }
}
