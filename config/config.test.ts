'use strict';

export default function() {
  return {
    prodLocal: {
      msg: 'test',
    },
    feishu: {
      appid: 'cli_a11d80349bf8d00e',
      app_secret: 'DUE3q73M3SoHgFR97CZzOSupUZ0otoS0'
    },
    cluster: {
      listen: {
        path: '',
        port: 8001,
        hostname: '0.0.0.0',
      }
    }
  };
}
