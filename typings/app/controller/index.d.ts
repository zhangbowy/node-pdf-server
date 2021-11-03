// This file is created by egg-ts-helper@1.26.0
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportHome from '../../../app/controller/home';
import ExportOrder from '../../../app/controller/order';

declare module 'egg' {
  interface IController {
    home: ExportHome;
    order: ExportOrder;
  }
}
