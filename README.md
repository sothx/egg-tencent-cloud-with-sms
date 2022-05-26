# egg-tencent-cloud-with-sms

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-tencent-cloud-with-sms.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-tencent-cloud-with-sms
[travis-image]: https://img.shields.io/travis/eggjs/egg-tencent-cloud-with-sms.svg?style=flat-square
[travis-url]: https://travis-ci.org/eggjs/egg-tencent-cloud-with-sms
[codecov-image]: https://img.shields.io/codecov/c/github/eggjs/egg-tencent-cloud-with-sms.svg?style=flat-square
[codecov-url]: https://codecov.io/github/eggjs/egg-tencent-cloud-with-sms?branch=master
[david-image]: https://img.shields.io/david/eggjs/egg-tencent-cloud-with-sms.svg?style=flat-square
[david-url]: https://david-dm.org/eggjs/egg-tencent-cloud-with-sms
[snyk-image]: https://snyk.io/test/npm/egg-tencent-cloud-with-sms/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-tencent-cloud-with-sms
[download-image]: https://img.shields.io/npm/dm/egg-tencent-cloud-with-sms.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-tencent-cloud-with-sms

<!--
Description here.
-->

## 依赖说明

### 依赖的 egg 版本

egg-tencent-cloud-with-sms 版本 | egg 1.x
--- | ---
1.x | 😁
0.x | ❌


## 安装插件

```bash
# use npm
$ npm i egg-tencent-cloud-with-sms --save
# use yarn
$ yarn add egg-tencent-cloud-with-sms
```

## 开启插件

```js
// {app_root}/config/plugin.js
exports.tencentCloudSms = {
  enable: true,
  package: 'egg-tencent-cloud-with-sms',
};
```

## 使用场景

- 可以使 Egg.js 快速集成腾讯云短信

## 详细配置

### 插件配置

```js
// {app_root}/config/config.default.js
exports.tencentCloudSms = {
    client: {
      // 短信应用AppID,SmsSdkAppId的简写，实例方法没传入AppID的情况下会取全局的AppID作为SmsSdkAppId的值。
      AppID: '1234567890',
      /* 必填：腾讯云账户密钥对secretId，secretKey。
      * 这里采用的是从环境变量读取的方式，需要在环境变量中先设置这两个值。
      * 你也可以直接在代码中写死密钥对，但是小心不要将代码复制、上传或者分享给他人，
      * 以免泄露密钥对危及你的财产安全。
      * SecretId、SecretKey 查询: https://console.cloud.tencent.com/cam/capi */
      credential: {
        secretId: 'xxxxxxxxxxxxxxxxxxxxxxxxxxx',
        secretKey: 'yyyyyyyyyyyyyyyyyyyyyyyy',
      },
  }
};
```

### 插件方法

```js
// 发送短信
this.app.tencentCloudSms.SendSms({
          /* 短信签名内容: 使用 UTF-8 编码，必须填写已审核通过的签名 */
        // 签名信息可前往 [国内短信](https://console.cloud.tencent.com/smsv2/csms-sign) 或 [国际/港澳台短信](https://console.cloud.tencent.com/smsv2/isms-sign) 的签名管理查看
        SignName: 'xxxxx', // 必填
        /* 短信应用ID: 短信SmsSdkAppId在 [短信控制台] 添加应用后生成的实际SmsSdkAppId，示例如1400006666 */
        // 应用 ID 可前往 [短信控制台](https://console.cloud.tencent.com/smsv2/app-manage) 查看
        AppID: '1234567890', //(可选) SmsSdkAppId的值，不配置则取默认配置的AppID作为值
         /* 模板 ID: 必须填写已审核通过的模板 ID */
        // 模板 ID 可前往 [国内短信](https://console.cloud.tencent.com/smsv2/csms-template) 或 [国际/港澳台短信](https://console.cloud.tencent.com/smsv2/isms-template) 的正文模板管理查看
        TemplateId: '1234567',  // 必填
        /* 模板参数: 模板参数的个数需要与 TemplateId 对应模板的变量个数保持一致，若无模板参数，则设置为空 */
        TemplateParamSet: ['2223','5'], // 必填
        /* 下发手机号码，采用 e.164 标准，+[国家或地区码][手机号]
        * 示例如：+8613711112222， 其中前面有一个+号 ，86为国家码，13711112222为手机号，最多不要超过200个手机号*/
        PhoneNumberSet: ['+86159123456789'] // 必填，需要发送的短信的手机号集合
})
```

```js
  // 拉取回执状态
this.app.tencentCloudSms.PullSmsSendStatus({
  // 短信应用ID: 短信SdkAppId在 [短信控制台] 添加应用后生成的实际SdkAppId，示例如1400006666
  AppID: "1234567890",
  // 拉取最大条数，最多100条
  Limit: 10,
})
```

```js
  // 统计短信发送数据
this.app.tencentCloudSms.SendStatusStatistics({
    // 短信应用ID: 短信SdkAppId在 [短信控制台] 添加应用后生成的实际SdkAppId，示例如1400006666
    AppID: "1234567890",
    // 拉取最大条数，最多100条
    Limit: 10,
    // 偏移量 注：目前固定设置为0
    Offset: 0,
    // 开始时间，yyyymmddhh 需要拉取的起始时间，精确到小时
    BeginTime: "2019122400",
    // 结束时间，yyyymmddhh 需要拉取的截止时间，精确到小时
    // 注：EndTime 必须大于 BeginTime
    EndTime: "2019122523",
})

```

```js
  // 申请短信模板
this.app.tencentCloudSms.AddSmsTemplate({
  /* 模板名称 */
  TemplateName: "腾讯云",
  /* 模板内容 */
  TemplateContent: "{1}为您的登录验证码，请于{2}分钟内填写，如非本人操作，请忽略本短信。",
  /* 短信类型：0表示普通短信, 1表示营销短信 */
  SmsType: 0,
  /* 是否国际/港澳台短信：0：表示国内短信; 1：表示国际/港澳台短信 */
  International: 0,
  /* 模板备注：例如申请原因，使用场景等 */
  Remark: "xxx",
})
```

请到 [config/config.default.js](config/config.default.js) 查看详细配置项说明。

## 代码示例

```js
// 向用户发送短信
  async sendSMS() {
    const ctx = this.ctx;
    let sendSmsResponse
    try {
      sendSmsResponse = await this.app.tencentCloudSms.SendSms({
        /* 短信签名内容: 使用 UTF-8 编码，必须填写已审核通过的签名 */
        // 签名信息可前往 [国内短信](https://console.cloud.tencent.com/smsv2/csms-sign) 或 [国际/港澳台短信](https://console.cloud.tencent.com/smsv2/isms-sign) 的签名管理查看
        SignName: 'xxxxx', // 必填
        /* 短信应用ID: 短信SmsSdkAppId在 [短信控制台] 添加应用后生成的实际SmsSdkAppId，示例如1400006666 */
        // 应用 ID 可前往 [短信控制台](https://console.cloud.tencent.com/smsv2/app-manage) 查看
        AppID: '1234567890', //(可选) SmsSdkAppId的值，不配置则取默认配置的AppID作为值
         /* 模板 ID: 必须填写已审核通过的模板 ID */
        // 模板 ID 可前往 [国内短信](https://console.cloud.tencent.com/smsv2/csms-template) 或 [国际/港澳台短信](https://console.cloud.tencent.com/smsv2/isms-template) 的正文模板管理查看
        TemplateId: '1234567',  // 必填
        /* 模板参数: 模板参数的个数需要与 TemplateId 对应模板的变量个数保持一致，若无模板参数，则设置为空 */
        TemplateParamSet: ['2223','5'], // 必填
        /* 下发手机号码，采用 e.164 标准，+[国家或地区码][手机号]
        * 示例如：+8613711112222， 其中前面有一个+号 ，86为国家码，13711112222为手机号，最多不要超过200个手机号*/
        PhoneNumberSet: ['+8615912345678'] // 必填，需要发送的短信的手机号集合
      })
    } catch (err) {
      sendSmsResponse = err
      console.log(err, 'err')
    }
    ctx.status = 200;
    ctx.body = sendSmS;
  }
```

## 提问 & 支持

Please open an issue [here](https://github.com/sothx/egg-tencent-cloud-with-sms/issues).

## License

[MIT](LICENSE)
