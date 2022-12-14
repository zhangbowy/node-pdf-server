import { Context, Application } from 'egg';

/**
 * default options
 */
const defaultOptions = {
    requestTimeout: 10 * 1000, // request timeout, default is 10s
    requestTimeoutCallback: () => {}, // request timeout callback
    sendPowerBy: true, // send powerby
    sendResponseTime: true, // send response time
    logRequest: true
  };
/**
 * send meta middleware
 */
export default (options: any, app: Application) => {
    options = Object.assign({}, defaultOptions, options);
    options.requestTimeout = options.requestTimeout;

    return (ctx: Context, next) => {
        ctx.traceId = ctx.uuid('v4');
        // send power by header
        if (options.sendPowerBy && !ctx.res.headersSent) {
            ctx.res.setHeader('X-Powered-By', `ASP.NET`);
            ctx.res.setHeader('x-dc-request-id', `${ctx.traceId}`);
        }
        const body = ctx.method === 'POST' ? ctx.request.body : ctx.request.query;
        app.logger.info(`<- ${ctx.method} ${ctx.url} ${JSON.stringify(body)}`);
        // send response     time header
        if (options.sendResponseTime || options.logRequest) {
            const startTime = Date.now();
            let err;
            return next().catch((e: any) => {
                err = e;
            }).then(() => {
                const endTime = Date.now();
                if (options.sendResponseTime && !ctx.res.headersSent) {
                    ctx.res.setHeader('X-Response-Time', `${endTime - startTime}ms`);
                    ctx.res.setHeader('Server-Timing', `total;dur=${endTime - startTime}`);
                }
                if (options.logRequest) {
                    process.nextTick(() => {
                        app.logger.info(`-> ${ctx.method} ${ctx.url} ${ctx.status} ${endTime - startTime}ms`);
                    });
                }
                if (err) return Promise.reject(err);
            });
        } else {
            return next();
        }
    };
};
