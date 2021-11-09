import { RateLimit } from 'koa2-ratelimit';
export default () => {
    return RateLimit.middleware({
        interval: { min: 1 }, // 15 minutes = 15*60*1000
        max: 20, // limit each IP to 100 requests per interval
        // tslint:disable-next-line:typedef
        async handler (ctx) {
            // @ts-ignore
            ctx.status = 429;
            ctx.body = {
                code: 0,
                msg: '你被限流了!'
            };
        }
    });
};
