// This file is created by egg-ts-helper@1.26.0
// Do not modify this file!!!!!!!!!

import 'egg';
import ExtendContext from '../../../app/extend/context';
type ExtendContextType = typeof ExtendContext;
declare module 'egg' {
  // tslint:disable-next-line:no-empty-interface
  interface Context extends ExtendContextType { }
}
