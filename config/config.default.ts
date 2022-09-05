'use strict';

import { EggAppConfig, PowerPartial } from 'egg';

export default function(appInfo: EggAppConfig) {
  const config = {
    proxy: true,
    feishu: {
      appid: 'cli_a02b668b45799013',
      app_secret: 'HtU64rLTVEH6M8YZuItgHg4xQLCKQuqf'
    },
    jwt: {
      secret: '123456',
    },
    web_hook: 'https://oapi.dingtalk.com/robot/send?access_token=b8dde52ae19e2511bb1848c61ef63385c2760af8e590c97361d92c0def6c546b'

    // sequelize: {
    //   dialect: 'mysql', // 数据库类型
    //   host: '127.0.0.1',
    //   port: 3306,
    //   database: 'dc-zhangbo',
    //   username: 'root',
    //   password: '123456',
    //   timezone: '+08:00', // 将日期从数据库转换为JavaScript日期时使用的时区。
    //   benchmark: true, // 将查询执行时间（以毫秒为单位）作为日志记录功能的第二个参数(options.logging)。
    //   define: {
    //     timestamps: true,
    //     createdAt: 'created_at',
    //     updatedAt: 'updated_at',
    //     // paranoid: false, //  删除时不删除数据，而更新deleteAt
    //     underscored: false, // 不使用驼峰法自动添加属性，而是用_
    //     freezeTableName: true, // 不是用复数表名
    //     charset: 'utf8mb4', // 字符集
    //     // dialectOptions: {
    //     //   collate: 'utf8mb4_general_ci', // 排序方式 general_ci 不区分大小写
    //     // },
    //     getterMethods: {
    //       createdTime() {
    //         // @ts-ignore
    //         const createdTime = this.getDataValue('createdTime');
    //         if (createdTime) {
    //           // return fecha.format(createdTime, 'YYYY-MM-DD HH:mm:ss');
    //         }
    //       },
    //       updateTime() {
    //         // @ts-ignore
    //         const updateTime = this.getDataValue('updateTime');
    //         if (updateTime) {
    //           // return fecha.format(updateTime, 'YYYY-MM-DD HH:mm:ss');
    //         }
    //       },
    //     },
    //   },
    //   pool: {
    //     // 连接池属性
    //     max: 5, // 最大连接数
    //     min: 0, // 最小连接数
    //   },
    // },
    // redis: {
    //   client: {
    //     port: 6379,          // Redis port
    //     host: '127.0.0.1',   // Redis host
    //     password: '123456',
    //     db: 0,
    //   },
    // }
  } as PowerPartial<EggAppConfig>;

  config.keys = appInfo.name + '123123';

  config.middleware = [
    'metas',
    'rateLimit',
    // 'auth',
    'errorHandler'
  ];

  config.security = {
    csrf: {
      ignore: '123',
      enable: false
    },
  };

  config.cluster = {
    listen: {
      path: '',
      port: 8001,
      hostname: '0.0.0.0',
    }
};

  // config.customLoader = {
  //   model: {
  //     directory: 'app/model',
  //     inject: 'app',
  //     caseStyle: 'upper',
  //   },
  // };

  config.cors = {
    credentials: true,
    // @ts-ignore
    origin: (ctx: any) => {
      return ctx.header.origin;
    },
    allowMethods: 'GET,HEAD,PUT,POST,OPTIONS'
  };
  config.logger = {
    disableConsoleAfterReady: false,
  };
  const bizConfig = {
    local: {
      msg: 'local',
    },

    uuid: {
      name: 'ebuuid',
      maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
    },
  };

  config.session = {
    key:'MAITIAN_SESSIONID',
    maxAge: 1000 * 60 * 60 * 4,  // 过期时间
    httpOnly: true,
    encrypt: true,
    renew: true, // 延长会话有效期,
    sameSite: 'none',
    secure: true
  };

  config.io = {

    init: {
      cors: {
        // origin: "https://front-domain.com",
        // methods: ["GET", "POST"],
        credentials: true
      },
      cookie: {
        name: 'my-cookie',
        httpOnly: true,
        sameSite: 'none',
        secure: true,
        maxAge: 86400,
      },
      wsEngine: 'ws',
    }, // passed to engine.io
    namespace: {
      '/': {
        connectionMiddleware: [
          'auth',
        ],
        packetMiddleware: [],
      },
      '/example': {
        connectionMiddleware: [],
        packetMiddleware: [],
      },
    },

    redis: {
      host: '127.0.0.1',
      port: 6379,
      auth_pass: 123456
    },
  };
  config.protocolHeaders = 'X-Forwarded-Proto';

  config.alinode = {
    server: 'wss://agentserver.node.aliyun.com:8080',
    appid: '91412',
    secret: 'dfed0e6a5b0e11814ae3b9861ea64eb3459f2cc5',
    logdir: '/tmp/',
    error_log: [
      '您的应用在业务层面产生的异常日志的路径，数组，可选，可配置多个',
      '例如：/root/.logs/error.#YYYY#-#MM#-#DD#.log',
      '不更改 Egg 默认日志输出路径可不配置本项目',
    ],
    // agentidMode:'IP' '可选，如果设置，则在实例ID中添加部分IP信息，用于多个实例 hostname 相同的场景（以容器为主）'
  };

  config.sentry = {
    dsn: 'https://5b6d656d8bfb437dadfe8013b7d549cc@o1173615.ingest.sentry.io/6643651',
  };

  return {
    ...config as {},
    ...bizConfig,
  };
}
