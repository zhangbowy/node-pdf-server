import { Context } from 'egg';
// 请求和返回日志输出
export default () => {
  return async function errorHandler(ctx: Context, next: any) {
    try {
      await next();
      if (!ctx.body) {
        ctx.status = 404;
        ctx.body = {
          code: 0,
          msg: 'not found',
        };
      }
      // const transaction = await ctx.app.getTransaction();

      // // 如果有事务自动提交
      // if (transaction) {
      //   transaction.commit();
      //   ctx.app.deleteTransaction();
      // }
    } catch (err) {
      console.log(err);
      // if (isApiError(err)) {
      // 所有的异常都在 app 上触发一个 error 事件，框架会记录一条错误日志
      // ctx.app.emit('error', err, ctx);
      // @ts-ignore
      const status = err.status || 500;

      // 生产环境时 500 错误的详细错误内容不返回给客户端，因为可能包含敏感信息
      // @ts-ignore
      // const error = status === 500 && ctx.app.config.env === 'prod' ? '系统内部错误' : err.message;
      ctx.body = {
        code: ctx.ERROR_CODE,
         // @ts-ignore
        msg: err.message,
      };

      if (status === 422) {
        // ctx.body.detail = err.errors;
      }

      ctx.status = status;

      // const transaction = await ctx.app.getTransaction();
      // // 如果有事务自动回滚
      // if (transaction) {
      //   transaction.rollback();
      //   ctx.app.deleteTransaction();
      // }
    }
    // }
  };
};
