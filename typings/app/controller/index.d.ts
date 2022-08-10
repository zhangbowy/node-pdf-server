// This file is created by egg-ts-helper@1.33.0
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportFeishu from '../../../app/controller/feishu';
import ExportHome from '../../../app/controller/home';
import ExportOrder from '../../../app/controller/order';
import ExportPdf from '../../../app/controller/pdf';
import ExportUser from '../../../app/controller/user';

declare module 'egg' {
  interface IController {
    feishu: ExportFeishu;
    home: ExportHome;
    order: ExportOrder;
    pdf: ExportPdf;
    user: ExportUser;
  }
}
