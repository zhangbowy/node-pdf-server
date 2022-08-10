'use strict';

export default function() {
  return {
    prodLocal: {
      msg: 'prod',
    },
    feishu: {
      appid: 'cli_a02b668b45799013',
      app_secret: 'HtU64rLTVEH6M8YZuItgHg4xQLCKQuqf'
    },
    cluster: {
      listen: {
        path: '',
        port: 8001,
        hostname: '0.0.0.0',
      }
    },
  };
}
