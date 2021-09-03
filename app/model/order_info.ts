import { Application } from 'egg';
import order_info from './../schema/order_info';
// 订单信息表
export default (app: Application) => {
  const orderInfoSchema: any = order_info(app);
  // 定义表模型
  const OrderInfo = app.model.define('orderInfo', orderInfoSchema);

  return class extends OrderInfo {
    static readonly tableName = 'order_info'
    // 创建表间关系
    static associate() {
   
    }

    static saveModify() {

    }

    // 获取订单列表信息
    static getList() {
      
    }

    // 根据订单id获取订单详情
    static getDetailById() {

    }
  }
};
