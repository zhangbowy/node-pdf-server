
import BaseController from '../core/baseController';
import { SelfController as Controller, Get } from '../router';

@Controller('/dc/monitor')
export default class OrderController extends BaseController {
    /**
     * 订单列表
     */
    @Get('/orderList')
    public async orderList(): Promise<void> {
        const { currentPage = 1, pageSize = 10 } = this.ctx.query as any;
        const result = await this.ctx.service.order.getOrderList(Number(pageSize), Number(currentPage));
        this.success(result, '请求成功');
    }

    /**
     * 销售数据统计
     */
    @Get('/orderStats')
    public async stats(): Promise<void> {
        const result = await this.ctx.service.order.getSaleStats();
        this.success(result, '请求成功');
    }

    /**
     * 支付订单列表
     */
    @Get('/payOrderList')
    public async payOrderList(): Promise<void> {
        const { currentPage = 1, pageSize = 10, startTime, endTime } = this.ctx.query as any;
        const result = await this.ctx.service.order.getPayOrderList(Number(pageSize), Number(currentPage), startTime, endTime);
        this.success(result);
    }
}
