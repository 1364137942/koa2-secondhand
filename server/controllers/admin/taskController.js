const adminService = require('./../../services/adminService');
const commonFunction = require('../../common/commonFunction');
//定时任务
module.exports = {
  //定时下架商品
  async sendMail(ctx){
    await commonFunction.sendMail();
    ctx.body = '';
  }

};