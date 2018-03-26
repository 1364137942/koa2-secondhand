const indexService = require('./../../services/indexService');
const commonFunction = require('../../common/commonFunction');
const {CustomError} = require('../../utils/Error');
const common = require('../../controllers/index/common');
module.exports = {
  async test(ctx){
    let result = {
      code: 0,
      data: [],
      count: 0
    };
    await indexService.test();
    ctx.body = result;
  },
  async getGoodsList(ctx){
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

    let dataPromise = indexService.getGoodsList(goodName, type, page, eachPageNum);
    let countPromise = indexService.getGoodsListCount(goodName, type);

    let promiseData = await Promise.all([dataPromise, countPromise]);
    result.data = promiseData[0];
    result.count = promiseData[1];
    ctx.body = result;
  },
  async getUserGoodList(ctx){
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
      result.data = await indexService.getUserGoodsList(session.email, status, page, eachPageNum);
      result.count = await indexService.getUserGoodsListCount(session.email, status);
    }else{
      result.code = -1;
    }
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

  async updateUserGoodStatus(ctx){
    let result = {
      code: 0,
      msg: '商品状态修改成功'
    };
    try{
      let data = ctx.request.body,
        goodID = data.goodID;
        status = data.status;

      let session = common.getSession(ctx);
      let userEmail = '';
      if(session !== false){
        userEmail = session.email;
      }
      let re = await indexService.getGoodInfo(goodID, userEmail);
      if(!(Array.isArray(re) && re.length > 0)){
        throw new CustomError('商品信息不存在');
      }
      let now = await commonFunction.getNowFormatDate();
      let updateRe = await indexService.updateGoodStatus(goodID, userEmail, status, now);
      if(updateRe === false){
        throw new CustomError('商品信息状态更新失败');
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
  async getHotGoods(ctx){
    let result = {
      code: 0,
      msg: '获取热门商品成功',
      data: []
    }
    let re = await indexService.getHotGoods();
    if(Array.isArray(re)){
      result.data = re;
    }
    ctx.body = result;
  },
  async getUserGoodsInfo(ctx){
    let result = {
      code: 0,
      msg: '获取商品信息成功',
      data: ''
    };
    let data = ctx.query,
        goodID = data.goodID;
    let email = ctx.session.email;
    let data = await indexService.getGoodInfo(goodID, email);
    if(Array.isArray(data) && data.length > 0){
      result.data = data[0];
    }else{
      result.code = -1;
      result.msg = '获取商品信息失败';
    }
    ctx.body = result;
  },
  async editGood(ctx){
    const title = '编辑商品';
    const goodID = ctx.query.goodID ? ctx.query.goodID : '';
    const goodType = JSON.stringify(await indexService.getGoodType());
    let session = common.getSession(ctx);
    let username = '';
    if(session !== false){
      username = session.username;
    }
    await ctx.render('index/editGood.ejs', {
      title,
      goodType,
      goodID,
      username
    })
  },
  async addGood(ctx){
    let result = {
      code: 0,
      msg: '发布商品成功'
    };
    let data = ctx.request.body,
        goodName = data.goodName,
        goodTpe = data.goodType,
        saleDate = data.saleDate,
        price = data.price,
        imageUrl = data.imageUrl,
        desc = data.desc,
        old = data.old;
    let session = common.getSession(ctx);
    let email = '';
    if(session !== false){
      email = session.email;
      let now = await commonFunction.getNowFormatDate();
      //封面可选择不传，默认显示网站套图
      //todo
      if(imageUrl === ''){
        imageUrl = '';
      }
      let addRe = await indexService.addGood(email, goodName, goodTpe, saleDate, price, imageUrl, desc, now, old);
    }else{
      result.code = -1;
      result.msg = '请先登录！';
    }

    ctx.body = result;
  },
  async modifyGood(ctx){
    let result = {
      code: 0,
      msg: '修改商品成功'
    };
    let data = ctx.request.body,
      goodID = data.goodID,
      goodName = data.goodName,
      goodTpe = data.goodType,
      saleDate = data.saleDate,
      price = data.price,
      imageUrl = data.imageUrl,
      desc = data.desc,
      old = data.old;
    //todo
    // let email = ctx.session.email;
    let session = common.getSession(ctx);
    let email = '';
    if(session !== false) {
      email = session.email;
      let now = await commonFunction.getNowFormatDate();
      //封面可选择不传，默认显示网站套图
      //todo
      if(imageUrl === ''){
        imageUrl = '';
      }
      let addRe = await indexService.modifyGood(goodID, email, goodName, goodTpe, saleDate, price, imageUrl, desc, now, old);
    }else{
      result.code = -1;
      result.msg = '请先登录！';
    }

    ctx.body = result;
  },
  async goodDetail(ctx){
    const title = '商品详情';
    let goodID = ctx.query.goodID;
    let session = common.getSession(ctx);
    let username = '';
    if(session !== false){
      username = session.username;
    }
    await ctx.render('index/goodDetail.ejs', {
      title,
      goodID,
      username
    })
  },
  async getGoodDetail(ctx){
    let result = {
      code: 0,
      data: {}
    };
    let goodID = ctx.request.body.goodID;
    let detail = await indexService.getGoodDetail(goodID);
    if(Array.isArray(detail) && detail.length > 0){
      result.data = detail[0];
    }else{
      result.code = -1;
    }
    ctx.body = result;
  }




};