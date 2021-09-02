import { Controller } from 'egg';
export default {
    success(this: Controller) {
       this.ctx.body = {
           code: 1,
           data: [],
           msg: ""
       } 
    }
};


