'use strict';

const _ = require('lodash');

const assert = require('assert');


class TencentCloudSMSService {
  constructor(config, app) {
    this.config = _.assign({}, config);
    this.app = app;
    const {
      sdk,
      clientModels,
      credential,
      region,
      profile,
    } = this.config;

    const smsClient = sdk.sms[clientModels].Client;
    this.smsClientService = new smsClient({
      credential,
      region,
      profile,
    });
  }
  // 将普通回调转换成Promise方式
  promisify(...inputArgs) {
    return new Promise((resolve, reject) => {
      const { defaultParams, AppID: globalAppID } = this.config;
      const [ inputAction, inputPayload ] = inputArgs;
      // 获取默认参数
      const actionDefaultParams = defaultParams[inputAction];
      // 获取应该使用的AppID
      const currentAppID = inputPayload.AppID || globalAppID || '';
      // 混入参数
      const assignParams = _.assign({}, actionDefaultParams, inputPayload, {
        SmsSdkAppId: currentAppID,
      });
      delete assignParams.AppID;
      this.smsClientService[inputAction](assignParams, (err, response) => {
        // 请求异常返回，打印异常信息
        if (err) {
          return reject(err);
        }
        // 请求正常返回，打印response对象
        resolve(response);
      });
    });
  }
  // 发送短信
  SendSms(inputParams = {}) {
    const { defaultParams } = this.config;
    // 获取默认参数
    const actionDefaultParams = defaultParams.SendSms;
    // 检测入参
    assert(actionDefaultParams.SignName || inputParams.SignName, 'SignName should exists');
    assert(actionDefaultParams.TemplateId || inputParams.TemplateId, 'TemplateId should exists');
    assert(inputParams.PhoneNumberSet, 'PhoneNumberSet should exists');
    return this.promisify('SendSms', inputParams);
  }
  // 拉取回执状态
  PullSmsSendStatus(inputParams = {}) {
    return this.promisify('PullSmsSendStatus', inputParams);
  }
  // 统计短信发送数据
  SendStatusStatistics(inputParams = {}) {
    // 检测入参
    assert(inputParams.BeginTime, 'BeginTime should exists');
    assert(inputParams.EndTime, 'EndTime should exists');
    return this.promisify('SendStatusStatistics', inputParams);
  }
  // 申请短信模板
  AddSmsTemplate(inputParams = {}) {
    // 检测入参
    assert(inputParams.TemplateName, 'TemplateName should exists');
    assert(inputParams.TemplateContent, 'TemplateContent should exists');
    assert(inputParams.Remark, 'Remark should exists');
    return this.promisify('SendStatusStatistics', inputParams);
  }
}

const createSms = function(config, app) {
  // 检查入参
  assert(config.AppID, 'config.AppID should exists');
  assert(config.credential.secretId, 'config.credential.secretId should exists');
  assert(config.credential.secretKey, 'config.credential.secretKey should exists');
  const client = new TencentCloudSMSService(config, app);

  return client;
};

module.exports = app => {
  app.addSingleton('tencentCloudSms', createSms);
};
