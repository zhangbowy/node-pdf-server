// This file is created by egg-ts-helper@1.25.9
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportBase from '../../../app/controller/base';
import ExportHome from '../../../app/controller/home';

declare module 'egg' {
  interface IController {
    base: ExportBase;
    home: ExportHome;
  }
}
