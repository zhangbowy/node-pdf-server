'use strict';

// import mm from 'egg-mock';
import { app } from 'egg-mock/bootstrap';

describe('test/app/controller/home.test.js', () => {
  beforeEach(() => {
    // app.mockCsrf();
  });

  afterEach(() => {
    // mm.restore();
  });

  it('销售看板 orderList', () => {
    return app
      .httpRequest()
      .get('/dc/monitor/orderList')
      .expect(200);
  });
});
