const indexService = require('./../../services/indexService');
const commonFunction = require('../../common/commonFunction');
const {CustomError} = require('../../utils/Error');
module.exports = {
  async getUserWants(ctx){
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

    result.data = await indexService.getUserWantsList(email, status, page, eachPageNum);
    result.count = await indexService.getUserWantsListCount(email, status);
    ctx.body = result;
  },

  async deleteWant(ctx){
    let result = {
      code: 0,
      msg: '删除求购商品成功'
    };
    let data = ctx.query,
      wantID = data.wantID;
    let email = ctx.session.email;
    let re = await indexService.deleteWant(wantID, email);
    if(re === false){
      result.code = -1;
      result.msg = '删除求购商品失败'
    }
    ctx.body = result;
  },

  async updateUserGoodStatus(ctx){
    let result = {
      code: 0,
      msg: '信息下架成功'
    };
    try{
      let data = ctx.query,
        wantID = data.wantID;
        status = data.status;

      if(parseInt(status) === 1){
        result.msg = '信息上架成功'
      }
      let email = ctx.session.email;
      let re = await indexService.getWantInfo(wantID, email);
      if(!(Array.isArray(re) && re.length > 0)){
        throw new CustomError('信息不存在');
      }
      let updateRe = await indexService.updateWantStatus(wantID, email, status);
      if(updateRe === false){
        throw new CustomError('信息状态更新失败');
      }
    }catch(e){
      result.code = -1;
      if(e.name == 'CustomError'){
        result.msg = e.message;
      }else{
        result.msg = '系统错误';
        throw Error(e);
      }
    }


    ctx.body = result;
  }


};