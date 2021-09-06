'use strict';

import { EggAppConfig, PowerPartial } from 'egg';

export default function(): PowerPartial<EggAppConfig> {
  return {
    local: {
      msg: 'local',
    },
    sequelize: {
      dialect: "mysql", // 数据库类型
      host: "127.0.0.1",
      port: 3306,
      database: "dc-zhangbo",
      username: "root",
      password: "123456",
      timezone: "+08:00", // 将日期从数据库转换为JavaScript日期时使用的时区。
      benchmark: true, // 将查询执行时间（以毫秒为单位）作为日志记录功能的第二个参数(options.logging)。
      define: {
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        // paranoid: false, //  删除时不删除数据，而更新deleteAt
        underscored: false, // 不使用驼峰法自动添加属性，而是用_
        freezeTableName: true, // 不是用复数表名
        charset: "utf8mb4", // 字符集
        // dialectOptions: {
        //   collate: "utf8mb4_general_ci", // 排序方式 general_ci 不区分大小写
        // },
        getterMethods: {
          createdTime() {
            // @ts-ignore
            const createdTime = this.getDataValue("createdTime");
            if (createdTime) {
              // return fecha.format(createdTime, "YYYY-MM-DD HH:mm:ss");
            }
          },
          updateTime() {
            // @ts-ignore
            const updateTime = this.getDataValue("updateTime");
            if (updateTime) {
              // return fecha.format(updateTime, "YYYY-MM-DD HH:mm:ss");
            }
          },
        },
      },
      pool: {
        // 连接池属性
        max: 5, // 最大连接数
        min: 0, // 最小连接数
      },
    },
    redis: {
      client: {
        port: 6379,          // Redis port
        host: '127.0.0.1',   // Redis host
        password: '123456',
        db: 0,
      },
    }
  };
};
