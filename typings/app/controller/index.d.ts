// This file is created by egg-ts-helper@1.26.0
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportHome from '../../../app/controller/home';
import ExportOrder from '../../../app/controller/order';
import ExportPdf from '../../../app/controller/pdf';
import ExportUser from '../../../app/controller/user';

declare module 'egg' {
  interface IController {
    home: ExportHome;
    order: ExportOrder;
    pdf: ExportPdf;
    user: ExportUser;
  }
}
