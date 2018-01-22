/**
 * Created by alizjli on 2017/12/19.
 */
const crypto=require('crypto');
const globalConfig = require('../common/globalConfig');
const nodeMailer = require('nodemailer');
const rp = require('request-promise');

module.exports = {
  async md5(str){
    var md5=crypto.createHash("md5");
    md5.update(str);
    str = md5.digest('hex');
    return str.toUpperCase();
  },
  async getNowFormatDate(time = '') {
    let date = new Date();
    if(time != ''){
      date.setTime(time);
    }
    let seperator1 = "-";
    let seperator2 = ":";
    let month = date.getMonth() + 1;
    let strDate = date.getDate();
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    let currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
      + " " + date.getHours() + seperator2 + date.getMinutes()
      + seperator2 + date.getSeconds();
    return currentdate;
  },
  async sendMail(receiver, title, content){
    //发送邮件
    let transporter = nodeMailer.createTransport(globalConfig.email);
    let option = {
      from:"1364137942@qq.com",
      to:receiver
    };
    option.subject = title;
    option.html= content;
    try{
      await transporter.sendMail(option);
      return true;
    }catch(e){
      return e.message;
    }
  },

  async getRandomNum(n){
    let chars = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    let res = "";
    for(let i = 0; i < n ; i ++) {
      let id = Math.ceil(Math.random()*35);
      res += chars[id];
    }
    return res;
  },

  async gdufsLogin(username, password) {
    let options = {
      method: 'POST',
      uri: globalConfig.gdufsLogin.loginUrl,
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
      uri: globalConfig.gdufsLogin.redirectUrl,
      headers: {
        'User-Agent': `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36`,
        Cookie: cookie[0], //这里是登陆后得到的cookie,(重点)
      }
    };
    let response = rp(redirectOptions).then(response => {
      return response
    });
    let body = await Promise.all([response]);
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
  }

};