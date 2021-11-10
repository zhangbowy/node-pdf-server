import { Controller, Context } from 'egg';
export default class BaseController extends Controller {
    constructor(ctx: Context) {
        super(ctx);
    }

    /**
     * 成功的返回
     * @param data 返回的数据
     * @param msg 提示信息
     */
    public success(data: any = [], msg: string = '调用成功') {
        this.ctx.body = {
            code: 1,
            data,
            msg
        };
     }
    
    /**
     * 失败的返回
     * @param code 错误码
     * @param msg 错误信息
     */
    fail(code: number = 0, msg: string = '') {
        this.ctx.body = {
            code,
            data: [],
            msg
        }; 
    }
}
