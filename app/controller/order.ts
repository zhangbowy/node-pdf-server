
import BaseController from '@/core/baseController';
import { SelfController as Controller, Get } from '@/router';
import { Auth } from '@/lib//decorator/auth';
interface Page {
    currentPage?: number;
    pageSize?: number;
}

interface PayOrder extends Page {
    startTime?: string| undefined;
    endTime?: string;
}

const pageRule = {
    currentPage: { type: 'number', required: false },
    pageSize: { type: 'number', required: false },
};

@Controller('/dc/monitor')
export default class OrderController extends BaseController {
    /**
     * 订单列表
     */
    @Get('/orderList')
    @Auth()
    public async orderList(): Promise<void> {
        const { ctx } = this;
        try {
            ctx.validate(pageRule);
        } catch (e) {
            // @ts-ignore
            return this.fail(0, e);
        }
        const { currentPage = 1, pageSize = 10 } = ctx.query as Page;
        const result = await ctx.service.order.getOrderList(pageSize, currentPage);
        this.success(result, '请求成功');
    }

    /**
     * 销售数据统计
     */
    @Get('/orderStats')
    @Auth()
    public async stats(): Promise<void> {
        const result = await this.ctx.service.order.getSaleStats();
        this.success(result, '请求成功');
    }

    /**
     * 支付订单列表
     */
    @Get('/payOrderList')
    @Auth()
    public async payOrderList(): Promise<void> {
        const { ctx } = this;
        try {
            ctx.validate(pageRule);
        } catch (e) {
             // @ts-ignore
             return this.fail(0, e);
        }
        const { currentPage = 1, pageSize = 10, startTime = '', endTime = '' } = ctx.query as PayOrder;
        const result = await ctx.service.order.getPayOrderList(pageSize, currentPage, startTime, endTime);
        this.success(result);
    }
}
