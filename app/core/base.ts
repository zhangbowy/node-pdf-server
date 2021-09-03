import { Controller, Context} from 'egg';
export default class BaseController extends Controller {
    constructor(ctx: Context) {
        super(ctx);
    }
    success() {
        this.ctx.body = {
            code: 1,
            data: [],
            msg: ""
        } 
     }
}