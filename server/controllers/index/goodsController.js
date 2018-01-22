const indexService = require('./../../services/indexService');
const commonFunction = require('../../common/commonFunction');
module.exports = {
  async getUserGoods(ctx){
    let result = {
      code: 0,
      data: [],
      count: 0
    };
    let data = ctx.query,
        eachPageNum = data.eachPageNum !== '' ? data.eachPageNum : 20,
        page = data.page !== '' ? data.page : 1,
        status = data.status;
    page = (page - 1) * eachPageNum;
    let email = ctx.session.email;

    result.data = await indexService.getUserGoodsList(email, status, page, eachPageNum);
    result.count = await indexService.getUserGoodsListCount(email, status);
    ctx.body = result;
  },

  async deleteGood(ctx){
    let result = {
      code: 0,
      msg: '删除商品成功'
    };
    let data = ctx.query,
        goodID = data.goodID;
    let email = ctx.session.email;
    let re = await indexService.deleteGood(goodID, email);
    if(re === false){
      result.code = -1;
      result.msg = '删除商品失败'
    }
    ctx.body = result;
  },

  async onShelfUserGood(ctx){
    let result = {
      code: 0,
      msg: '商品上架成功'
    };
    let data = ctx.query,
      goodID = data.goodID;
    let email = ctx.session.email;
    let re = await indexService.getGoodInfo(goodID, email);
    if(re === false){
      result.code = -1;
      result.msg = '商品上架失败'
    }
    ctx.body = result;
  }


};