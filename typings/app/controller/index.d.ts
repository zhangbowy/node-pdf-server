// This file is created by egg-ts-helper@1.26.0
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportFeishu from '../../../app/controller/feishu';
import ExportHome from '../../../app/controller/home';
import ExportOrder from '../../../app/controller/order';
import ExportUser from '../../../app/controller/user';

declare module 'egg' {
  interface IController {
    feishu: ExportFeishu;
    home: ExportHome;
    order: ExportOrder;
    user: ExportUser;
  }
}
