'use strict';

export default function() {
  return {
    prodLocal: {
      msg: 'prod',
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
