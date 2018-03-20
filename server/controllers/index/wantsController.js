const indexService = require('./../../services/indexService');
const commonFunction = require('../../common/commonFunction');
const {CustomError} = require('../../utils/Error');
module.exports = {
  async index(ctx){
    const title = '求购商品页';
    await ctx.render('index/wantsList.ejs', {
      title,
    });
  },
  async wantDetail(ctx){
    const title = 'SecondHand';
    let wantID = ctx.query.wantID;
    await ctx.render('index/wantDetail.ejs', {
      title,
      wantID
    })
  },
  async getWantDetail(ctx){
    let result = {
      code: 0,
      data: {}
    };
    let wantID = ctx.request.body.wantID;
    let detail = await indexService.getWantDetail(wantID);
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
    await ctx.render('index/editWant.ejs', {
      title,
      goodType,
      wantID
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
    let email = '136123@qq.com';
    let now = await commonFunction.getNowFormatDate();

    let addRe = await indexService.addWant(email, goodName, goodTpe, saleDate, desc, now, old);
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
    let email = '136123@qq.com';
    let now = await commonFunction.getNowFormatDate();

    let addRe = await indexService.modifyWant(wantID, email, goodName, goodType, saleDate, desc, now, old);
    ctx.body = result;
  },


};