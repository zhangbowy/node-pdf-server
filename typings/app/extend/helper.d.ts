// This file is created by egg-ts-helper@1.26.0
// Do not modify this file!!!!!!!!!

import 'egg';
import ExtendIHelper from '../../../app/extend/helper';
type ExtendIHelperType = typeof ExtendIHelper;
declare module 'egg' {
  // tslint:disable-next-line:no-empty-interface
  interface IHelper extends ExtendIHelperType { }
}
