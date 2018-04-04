const adminService = require('./../../services/adminService');
const commonFunction = require('../../common/commonFunction');
//定时任务
module.exports = {
  //定时下架商品
  async crontabDown(ctx){

    let goodList = await adminService.getShouldDownGoods();
    if(Array.isArray(goodList) && goodList.length > 0){
      goodList.forEach(async (item, i) => {
        let receiver = item.FEmail,
            title = '多赞商品管理定时下架商品通知邮件',
            content = '尊敬的用户您好！由于您发布的二手商品（'+item.FGoodName+'）所设置的下架时间已到，如果该商品已处理成功，可以不予理会，若需要重新上架，请到多赞二手商城做相应的操作，谢谢！';
        await commonFunction.sendMail(receiver, title, content);
      })
    }
    let wantsList = await adminService.getShouldDownWants();
    if(Array.isArray(wantsList) && wantsList.length > 0){
      wantsList.forEach(async (item, i) => {
        let receiver = item.FEmail,
          title = '多赞商品管理定时下架商品通知邮件',
          content = '尊敬的用户您好！由于您发布的二手信息（'+item.FGoodName+'）所设置的下架时间已到，如果该商品已处理成功，可以不予理会，若需要重新上架，请到多赞二手商城做相应的操作，谢谢！';
        await commonFunction.sendMail(receiver, title, content);
      })
    }

    ctx.body = '';
  }

};