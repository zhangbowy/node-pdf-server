import { Application } from 'egg';
import role from './../schema/role';
// 订单信息表
export default (app: Application) => {
  const roleSchema: any = role(app);
  // 定义表模型
  const Role = app.model.define('role', roleSchema);


  return class extends Role {
    static readonly tableName = 'role'
    // 创建表间关系
    static associate() {
   
    }
    // 创建订单加速配置信息
    static saveNew() {

    }

    // 更新订单加速配置信息
    static saveModify() {
      
    }

    // 根据订单id获取订单详情
    static getDetailById() {

    }

    // 根据订单id获取订单详情
    static getList() {
        return this.findAll()
    }
  }
};
