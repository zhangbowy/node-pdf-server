// This file is created by egg-ts-helper@1.26.0
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAuth from '../../../app/middleware/auth';
import ExportErrorHandler from '../../../app/middleware/errorHandler';
import ExportMetas from '../../../app/middleware/metas';
import ExportRateLimit from '../../../app/middleware/rateLimit';

declare module 'egg' {
  interface IMiddleware {
    auth: typeof ExportAuth;
    errorHandler: typeof ExportErrorHandler;
    metas: typeof ExportMetas;
    rateLimit: typeof ExportRateLimit;
  }
}
