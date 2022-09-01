// This file is created by egg-ts-helper@1.26.0
// Do not modify this file!!!!!!!!!

// import 'egg';
import { EggAppConfig } from 'egg';
import ExportConfigDefault from '../../config/config.default';
type ConfigDefault = ReturnType<typeof ExportConfigDefault>;
type NewEggAppConfig = ConfigDefault;
declare module 'egg' {
  // tslint:disable-next-line:no-empty-interface
  interface EggAppConfig extends NewEggAppConfig { }
}
