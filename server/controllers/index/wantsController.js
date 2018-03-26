const indexService = require('./../../services/indexService');
const commonFunction = require('../../common/commonFunction');
const {CustomError} = require('../../utils/Error');
const common = require('../../controllers/index/common');
module.exports = {
  async index(ctx){
    const title = '求购商品页';
    let session = common.getSession(ctx);
    let username = '';
    if(session !== false){
      username = session.username;
    }
    await ctx.render('index/wantsList.ejs', {
      title,
      username
    });
  },
  async wantDetail(ctx){
    const title = 'SecondHand';
    let wantID = ctx.query.wantID;
    let session = common.getSession(ctx);
    let username = '';
    if(session !== false) {
      username = session.username;
    }
    await ctx.render('index/wantDetail.ejs', {
      title,
      wantID,
      username
    })
  },
  async getWantDetail(ctx){
    let result = {
      code: 0,
      data: {}
    };
    let wantID = ctx.request.body.wantID;
    let session = common.getSession(ctx);
    let userEmail = '';
    if(session !== false) {
      userEmail = session.email;
    }
    let detail = await indexService.getWantDetail(wantID, userEmail);
    if(Array.isArray(detail) && detail.length > 0){
      result.data = detail[0];
    }else{
      result.code = -1;
    }
    ctx.body = result;

  },
  async getWantsList(ctx){
    let result = {
      code: 0,
      data: [],
      count: 0
    };
    let data = ctx.request.body,
      goodName = data.searchGoodName ? data.searchGoodName : '',
      type = data.searchType ? data.searchType : '',
      page = data.page !== '' ? parseInt(data.page) - 1 : 0,
      eachPageNum = data.eachPageNum || 10;

    page = parseInt(page)*parseInt(eachPageNum);
    result.data = await indexService.getWantsList(goodName, type, page, eachPageNum);
    result.count = await indexService.getWantsListCount(goodName, type);
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

  async updateUserWantStatus(ctx){
    let result = {
      code: 0,
      msg: '求购信息状态修改成功'
    };
    try{
      let data = ctx.request.body,
        wantID = data.wantID;
        status = data.status;

      let session = common.getSession(ctx);
      let userEmail = '';
      if(session !== false){
        userEmail = session.email;
      }
      let re = await indexService.getWantInfo(wantID, userEmail);
      if(!(Array.isArray(re) && re.length > 0)){
        throw new CustomError('求购信息不存在');
      }
      let now = await commonFunction.getNowFormatDate();
      let updateRe = await indexService.updateWantStatus(wantID, userEmail, status, now);
      if(updateRe === false){
        throw new CustomError('求购信息状态更新失败');
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
  },

  async getUserWantsInfo(ctx){
    let result = {
      code: 0,
      msg: '获取求购信息成功',
      data: ''
    };
    let data = ctx.query,
        wantID = data.wantID;
    let email = ctx.session.email;
    let data = await indexService.getWantInfo(wantID, email);
    if(Array.isArray(data) && data.length > 0){
      result.data = data[0];
    }else{
      result.code = -1;
      result.msg = '获取求购信息失败';
    }
    ctx.body = result;
  },
  async editWant(ctx){
    const title = 'SecondHand';
    const wantID = ctx.query.wantID ? ctx.query.wantID : '';
    const goodType = JSON.stringify(await indexService.getGoodType());
    let session = common.getSession(ctx);
    let username = '';
    if(session !== false) {
      username = session.username;
    }
    await ctx.render('index/editWant.ejs', {
      title,
      goodType,
      wantID,
      username
    })
  },
  async addWant(ctx){
    let result = {
      code: 0,
      msg: '发布商品成功'
    };
    let data = ctx.request.body,
      goodName = data.goodName,
      goodTpe = data.goodType,
      saleDate = data.saleDate,
      desc = data.desc,
      old = data.old;
    //todo
    // let email = ctx.session.email;
    let session = common.getSession(ctx);
    let userEmail = '';
    if(session !== false) {
      userEmail = session.email;
      let now = await commonFunction.getNowFormatDate();
      let addRe = await indexService.addWant(userEmail, goodName, goodTpe, saleDate, desc, now, old);
    }else{
      result.code = -1;
      result.msg = '请先登录！';
    }

    ctx.body = result;
  },
  async modifyWant(ctx){
    let result = {
      code: 0,
      msg: '修改商品成功'
    };
    let data = ctx.request.body,
      wantID = data.wantID,
      goodName = data.goodName,
      goodType = data.goodType,
      saleDate = data.saleDate,
      desc = data.desc,
      old = data.old;
    //todo
    // let email = ctx.session.email;
    let userEmail = '';
    if(session !== false) {
      userEmail = session.email;
      let now = await commonFunction.getNowFormatDate();
      let addRe = await indexService.modifyWant(wantID, userEmail, goodName, goodType, saleDate, desc, now, old);
    }else{
      result.code = -1;
      result.msg = '请先登录！';
    }


    ctx.body = result;
  },
  async getWantUserList(ctx){

    let result = {
      code: 0,
      data: [],
      count: 0
    };
    let data = ctx.request.body,
      eachPageNum = data.eachPageNum !== '' ? data.eachPageNum : 20,
      page = data.page !== '' ? data.page : 1,
      status = parseInt(data.status) === 1 ?  1 : 0;
    page = (page - 1) * eachPageNum;
    let session = common.getSession(ctx);
    if(session !== false){
      result.data = await indexService.getUserWantsList(session.email, status, page, eachPageNum);
      result.count = await indexService.getUserWantsListCount(session.email, status);
    }else{
      result.code = -1;
    }
    ctx.body = result;
  }

};