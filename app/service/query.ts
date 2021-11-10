import { Service } from 'egg';
import { PrismaClient } from '@prisma/client';
// @ts-ignore
import { createLRUCacheMiddleware } from 'prisma-lrucache-middleware/dist';
import * as LRU from 'lru-cache';
import dayjs from 'dayjs';
const prisma = new PrismaClient();
prisma.$connect();

const UserCache = new LRU(120);
prisma.$use(createLRUCacheMiddleware({ cache: UserCache }));
export default class QueryService extends Service {
    /**
     * 获取矿机销售订单数据
     */
    public async getOrderList(pageSize: number = 10, currentPage: number = 1) {
        const count = await prisma.order_info.count({
            where: {
                deleted_at: null,
                status: 3
             },
        });
        const result = await prisma.$queryRaw`
        SELECT
            total_price,
            orderno AS order_no,
            SUM(o.buy_num * c.power) AS power,
            o.buy_num,
            o.status,
            c.commodityname AS product_name, 
            agent.company AS 'agent_name',
            DATE_FORMAT(o.buy_time, '%Y-%m-%d %H:%i:%S') as buy_time
        FROM
            order_info o
            INNER JOIN commodity c on c.id = o.commodityid
            INNER JOIN agent on agent.id = o.agentid
        WHERE
            o.STATUS = 3 
            AND o.deleted_at IS NULL
        GROUP BY o.orderno
        ORDER BY o.buy_time DESC
        limit ${(currentPage - 1) * pageSize},${pageSize}`;

        return {
            pageSize,
            currentPage,
            data: result,
            count,
        };
    }

    /**
     * 获取支付订单列表
     * @param pageSize 
     * @param currentPage 
     * @param startTime 
     * @param endTime 
     * @param type 
     * @returns 
     */
    public async getPayOrderList(pageSize: number = 10, currentPage: number = 1, startTime: any, endTime: any) {
        let where = ` po.status = 2 AND po.deleted_at IS NULL `;

        if (startTime && endTime) {
            where += ` and po.created_at between ${dayjs()}`;
        }
        const count = await prisma.pay_order.count({
            where: {
                deleted_at: null,
                status: 2
             },
        });

        const result = await prisma.$queryRawUnsafe(
            `SELECT
            po.pay_no,
            po.type,
            po.pay_type,
            po.pay_amount,
            po.remark,
            IFNULL(por.expend_capacity, 0) AS expend_capacity,
            IFNULL(por.expend_amount, 0) AS expend_amount,
            DATE_FORMAT(po.created_at, '%Y-%m-%d %H:%i:%S') AS pay_at,
            u.company AS 'agent_name'
        FROM
            pay_order po
            LEFT JOIN (SELECT user.id, agent.company FROM \`user\` INNER JOIN agent ON agent.id = \`user\`.agent_id) u ON  u.id = po.uid
            LEFT JOIN ( SELECT pay_no, created_at, SUM( expend_capacity) AS expend_capacity, SUM( expend_amount ) AS expend_amount FROM pay_order_record GROUP BY pay_no ) por ON por.pay_no = po.pay_no
        WHERE ${where}
        ORDER BY po.created_at DESC
        limit ${(currentPage - 1) * pageSize},${pageSize}`);
        return {
            pageSize,
            currentPage,
            data: result,
            count,
        };
    }

    /**
     * 获取销售统计数据
     */
    public async getSaleStats() {
        const order = await this.getOrderStats();
        const payOrder = await this.getPayOrderStats();
        return {
            ...order,
            ...payOrder
        };
    }

    /**
     * 获取订单数据统计
     */
    private async getOrderStats() {
        // @ts-ignore
       const [ order ] = await prisma.$queryRaw`
        SELECT
            SUM( total_price ) as total_amount,
            SUM(o.buy_num * c.power / 1000) AS order_total_power,
            SUM(expand_capacity / 1000) as expand_capacity,
            SUM(increase_capacity / 1000) as increase_capacity
        FROM
            order_info o
            INNER JOIN commodity c on c.id = o.commodityid
        WHERE
            o.STATUS = 3 
            AND o.deleted_at IS NULL;`;
       return order;
    }

    /**
     * 获取扩容费托管费支付订单统计
     */
    private async getPayOrderStats() {
        const payOrder: any = await prisma.$queryRaw`
        SELECT
            COUNT(1) AS count,
            SUM( pay_amount ) as pay_amount,
            type,
            pay_type
        FROM
            pay_order 
        WHERE
            pay_order.status = 2
            AND type IN (1,2)
            AND pay_order.deleted_at IS NULL
        GROUP BY type, pay_type;`;
        const result: any = {};
        const keys = {
            '1-1': 'deposit_cny',
            '1-2': 'deposit_usdt',
            '2-2': 'extend_usdt',
            '1-3': 'deposit_fil',
            '2-3': 'extend_fil',
            '2-1': 'extend_cny',
        };
        payOrder.forEach((val: { type: any; pay_type: any; count: any; pay_amount: any; }) => {
            result[keys[`${val.type}-${val.pay_type}`]] = {
                count: val.count,
                pay_amount: val.pay_amount
            };
        });
        return result;
    }
    
}
