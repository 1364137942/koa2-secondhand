/**
 * Created by alizjli on 2017/12/20.
 */
const rp = require('request-promise');
const loginUrl = 'http://xg.gdufs.edu.cn/pkmslogin.form';
const redirectUrl = 'http://auth.gdufs.edu.cn/wps/myportal';
let login = async function (username, password) {
  let options = {
    method: 'POST',
    uri: loginUrl,
    form: {
      "username": username,
      "password": password,
      "login-form-type": 'pwd'
    },
    resolveWithFullResponse: true
  };
  let headers = rp(options).then((response) => {
    return response.headers['set-cookie'];
  });
  let cookie = await Promise.all([headers]);

  let redirectOptions = {
    method: 'GET',
    uri: redirectUrl,
    headers: {
      'User-Agent': `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36`,
      Cookie: cookie[0], //这里是登陆后得到的cookie,(重点)
    }
  };
  let response = rp(redirectOptions).then(response => {
    return response
  });
  let body = await Promise.all([response]);
  console.log(body);
  let name = body[0].match(/([\u4e00-\u9fa5]{1,}),[\u4e00-\u9fa5]{1,},.*欢迎使用校园信息门户/);
  //\u3001 顿号
  let academy = body[0].match(/align="left">&nbsp;([\u3001|\u4e00-\u9fa5]{1,})<\/td>/);
  if(name && academy) {
    return {
      name: name[1],
      academy: academy[1]
    }
  }
  return false;
};

