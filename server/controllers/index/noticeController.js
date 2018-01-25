const indexService = require('./../../services/indexService');
const commonFunction = require('../../common/commonFunction');
const {CustomError} = require('../../utils/Error');
module.exports = {
  async getNotice(ctx){
    let result = {
      code: 0,
      data: [],
      count: 0
    };
    let data = ctx.query,
        eachPageNum = data.eachPageNum !== '' ? data.eachPageNum : 20,
        page = data.page !== '' ? data.page : 1;
    page = (page - 1) * eachPageNum;
    let email = ctx.session.email;

    result.data = await indexService.getNoticeList(email, page, eachPageNum);
    result.count = await indexService.getNoticeListCount(email);
    ctx.body = result;
  },

  async getNewNotice(ctx){
    let result = {
      code: 0,
      msg: '成功得到未读通知',
      num: 0
    };
    let email = ctx.session.email;
    let re = await indexService.getNewNotice(email);
    if(re === false){
      result.code = -1;
      result.msg = '得到未读通知失败'
    }
    ctx.body = result;
  },

  async readNotice(ctx){
    let result = {
      code: 0,
      msg: 'success'
    };
    let email = ctx.session.email;
    await indexService.readNotice(email);
    ctx.body = result;
  },

};