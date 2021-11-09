// import { Application } from 'egg';
// import order_related_sn from './../schema/order_related_sn';
// // 订单信息表
// export default (app: Application) => {
//   const orderRelatedSnSchema: any = order_related_sn(app);
//   // 定义表模型
//   const orderRelatedSn = app.model.define(
//     'orderRelatedSn',
//     orderRelatedSnSchema
//   );

//   return class extends orderRelatedSn {
//     static readonly tableName = 'order_relation_sn';

//     static associate() {
  
//     }

//     static getListByOrderNo() {
      
//     }
//   };
// };
