
import BaseController from '../core/baseController';
import { SelfController as Controller, Get } from '../router';
@Controller('/dc/monitor')
export default class OrderController extends BaseController {
  /**
   * 订单列表
   */
  @Get('/orderList')
  public async orderList(): Promise<void> {
    const result = await this.ctx.service.query.getOrderList();
    this.success(result, '请求成功');
  }

  /**
   * 销售数据统计
   */
  @Get('/orderStats')
  public async stats(): Promise<void> {
    const result = await this.ctx.service.query.getSaleStats();
    this.success(result, '请求成功');
  }


  /**
   * 
   */
  @Get('/payOrderList')
  public async payOrderList() {
    const { currentPage = 1, pageSize = 10, startTime, endTime, type } = this.ctx.query as any;
    const result = await this.ctx.service.query.getPayOrderList(Number(pageSize), Number(currentPage), startTime, endTime);
    this.success(result, '请求成功');
  }
}
