'use strict';

export default function() {
  return {
    cluster: {
      listen: {
        path: '',
        port: 8001,
        hostname: '0.0.0.0',
      }
    },
    callBackUrl: 'http://gray-qapi.forwe.store/api/spf-cc/html2pdf/html2PdfResult'
  };
}
