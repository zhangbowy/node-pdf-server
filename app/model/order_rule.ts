// import { Application } from 'egg';
// import order_rule from './../schema/order_rule';
// // 订单信息表
// export default (app: Application) => {
//   const orderRuleSchema: any = order_rule(app);
//   // 定义表模型
//   const OrderRule = app.model.define('orderRule', orderRuleSchema);


//   return class extends OrderRule {
//     static readonly tableName = 'order_rule';
//     // 创建表间关系
//     static associate() {
   
//     }
//     // 创建订单加速配置信息
//     static saveNew() {

//     }

//     // 更新订单加速配置信息
//     static saveModify() {
      
//     }

//     // 根据订单id获取订单详情
//     static getDetailById() {

//     }
//   };
// };
