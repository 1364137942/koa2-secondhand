const adminService = require('./../../services/adminService');

module.exports = {
  //得到用户所有商品
  async getUserGoods(ctx){
    let result = {
      code: 0,
      data: [],
      count: 0
    };
    let data = ctx.request.body,
      userID = data.userID,
      page = data.page !== '' ? parseInt(data.page) - 1 : 0,
      eachPageNum = data.eachPageNum || 10;

    page = parseInt(page)*parseInt(eachPageNum);

    let dataPromise = adminService.getUserGoods(userID, page, eachPageNum);
    let countPromise = adminService.getUserGoodsCount(userID);

    let promiseData = await Promise.all([dataPromise, countPromise]);
    result.data = promiseData[0];
    result.count = promiseData[1];

    ctx.body = result;
  },
  //商品置为无效
  async disabledGoods(ctx){
    let result = {
      code: 0,
      msg: 'disable goods success'
    };
    let data = ctx.query,
      goodID = data.goodID;
    let re = await adminService.disabledGoods(goodID);
    if(re == false){
      result.code = -1;
      result.msg = 'disable goods fail';
    }
    ctx.body = result;
  },
  //商品置为有效
  async enabledGoods(ctx){
    let result = {
      code: 0,
      msg: 'enable goods success'
    };
    let data = ctx.query,
      goodID = data.goodID;
    let re = await adminService.enabledGoods(goodID);
    if(re == false){
      result.code = -1;
      result.msg = 'enable goods fail';
    }
    ctx.body = result;
  },
  //下架商品
  async offGoods(ctx){
    let result = {
      code: 0,
      msg: 'off goods success'
    };
    let data = ctx.query,
      goodID = data.goodID;
    let re = await adminService.offGoods(goodID);
    if(re == false){
      result.code = -1;
      result.msg = 'off goods fail';
    }
    ctx.body = result;
  },
  //上架商品
  async onGoods(ctx){
    let result = {
      code: 0,
      msg: 'on goods success'
    };
    let data = ctx.query,
      goodID = data.goodID;
    let re = await adminService.onGoods(goodID);
    if(re == false){
      result.code = -1;
      result.msg = 'on goods fail';
    }
    ctx.body = result;
  },
  async getUser ( ctx ) {
    let result = {
      code: 0,
      data: [],
      count: 0
    };
    let data = ctx.request.body,
        type = data.type || 'white',
        page = data.page !== '' ? parseInt(data.page) - 1 : 0,
        eachPageNum = data.eachPageNum || 10;

    page = parseInt(page)*parseInt(eachPageNum);

    let dataPromise = adminService.getAllUser(type, page, eachPageNum);
    let countPromise = adminService.getAllUserCount(type);

    let promiseData = await Promise.all([dataPromise, countPromise]);
    result.data = promiseData[0];
    result.count = promiseData[1];

    ctx.body = result;
  }
};