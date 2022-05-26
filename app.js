'use strict';

const tencentCloudSms = require('./lib/tencentCloudSms');

module.exports = app => {
  if (app.config.tencentCloudSms.app) tencentCloudSms(app);
};
