const adminService = require('./../../services/adminService');

module.exports = {
  //商品管理
  async getGoods(ctx){
    const title = '商品管理';
    const user = ctx.session.username;
    const goodType = JSON.stringify([{
      'FKey': 'all',
      'FShowName': '全部',
      'FStatus': 1
    }].concat(
      await adminService.getAllType())
    );
    await ctx.render('admin/goodsManage.ejs', {
      title,
      user,
      goodType
    })
  },
  //得到商品
  async getGoodsList(ctx){
    let result = {
      code: 0,
      data: [],
      count: 0
    };
    // let data = ctx.request.body,
    //   username = data.username ? data.username : '',
    //   goodName = data.goodName ? data.goodName : '',
    //   type = data.type ? data.type : '',
    //   status = data.status ? data.status : '',
    //   page = data.page !== '' ? parseInt(data.page) - 1 : 0,
    //   eachPageNum = data.eachPageNum || 10;
    //
    // page = parseInt(page)*parseInt(eachPageNum);
    //
    // let dataPromise = adminService.getGoodsList(username, goodName, type, status, page, eachPageNum);
    // let countPromise = adminService.getGoodsListCount(username, goodName, type, status);
    //
    // let promiseData = await Promise.all([dataPromise, countPromise]);
    // result.data = promiseData[0];
    // result.count = promiseData[1];

    ctx.body = result;
  },
  //商品置为无效
  async disabledGoods(ctx){
    let result = {
      code: 0,
      msg: '商品删除成功'
    };
    let data = ctx.request.body,
      goodID = data.goodID;
    goodID = "'" + goodID.join("','") + "'";
    let re = await adminService.disabledGoods(goodID);
    ctx.body = result;
  },
  //商品置为有效
  async enabledGoods(ctx){
    let result = {
      code: 0,
      msg: '商品撤销成功'
    };
    let data = ctx.request.body,
      goodID = data.goodID;
    goodID = "'" + goodID.join("','") + "'";
    let re = await adminService.enabledGoods(goodID);
    ctx.body = result;
  },
  //下架商品
  async offGoods(ctx){
    let result = {
      code: 0,
      msg: '下架商品成功'
    };
    let data = ctx.request.body,
      goodID = data.goodID;
    goodID = "'" + goodID.join("','") + "'";
    let re = await adminService.offGoods(goodID);
    ctx.body = result;
  },
  //上架商品
  async onGoods(ctx){
    let result = {
      code: 0,
      msg: '上架商品成功'
    };
    let data = ctx.request.body,
      goodID = data.goodID;
    goodID = "'" + goodID.join("','") + "'";
    let re = await adminService.onGoods(goodID);
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