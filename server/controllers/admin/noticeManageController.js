const adminService = require('./../../services/adminService');

module.exports = {
  //发消息
  async sendNotice(ctx){
    let result = {
      code: 0,
      msg: 'sendNotice success'
    };
    let data = ctx.request.body,
      email = data.email,
      title = data.title,
      content = data.content;

    let re = await adminService.sendNotice(email, title, content);
    if(re == false){
      result.code = -1;
      result.msg = 'sendNotice fail'
    }
    ctx.body = result;
  },

};