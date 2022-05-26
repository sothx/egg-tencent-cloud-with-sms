'use strict';

const mock = require('egg-mock');

describe('test/tencent-cloud-with-sms.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/tencent-cloud-with-sms-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect('hi, tencentCloudSms')
      .expect(200);
  });
});
