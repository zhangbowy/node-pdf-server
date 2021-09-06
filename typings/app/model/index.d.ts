// This file is created by egg-ts-helper@1.26.0
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportOrderInfo from '../../../app/model/order_info';
import ExportOrderRelatedSn from '../../../app/model/order_related_sn';
import ExportOrderRule from '../../../app/model/order_rule';
import ExportRole from '../../../app/model/role';
import ExportStudent from '../../../app/model/student';

declare module 'egg' {
  interface IModel {
    OrderInfo: ReturnType<typeof ExportOrderInfo>;
    OrderRelatedSn: ReturnType<typeof ExportOrderRelatedSn>;
    OrderRule: ReturnType<typeof ExportOrderRule>;
    Role: ReturnType<typeof ExportRole>;
    Student: ReturnType<typeof ExportStudent>;
  }
}
