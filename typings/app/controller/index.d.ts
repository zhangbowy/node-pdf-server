// This file is created by egg-ts-helper@1.26.0
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportBase from '../../../app/core/base';
import ExportHome from '../../../app/controller/home';
import ExportAdminHome from '../../../app/controller/admin/home';

declare module 'egg' {
  interface IController {
    base: ExportBase;
    home: ExportHome;
    admin: {
      home: ExportAdminHome;
    }
  }
}
