const adminService = require('./../../services/adminService');

module.exports = {
  async getWants(ctx){
    const title = '求购管理';
    const user = ctx.session.username;
    const goodType = JSON.stringify([{
        'FKey': 'all',
        'FShowName': '全部',
        'FStatus': 1
      }].concat(
      await adminService.getAllType())
    );
    await ctx.render('admin/wantsManage.ejs', {
      title,
      user,
      goodType
    })
  },

  //得到用户所有求购
  async getWantsList(ctx){
    let result = {
      code: 0,
      data: [],
      count: 0
    };
    let data = ctx.request.body,
      username = data.username ? data.username : '',
      goodName = data.goodName ? data.goodName : '',
      type = data.type ? data.type : '',
      status = data.status ? data.status : '',
      page = data.page !== '' ? parseInt(data.page) - 1 : 0,
      eachPageNum = data.eachPageNum || 10;

    page = parseInt(page)*parseInt(eachPageNum);

    let dataPromise = adminService.getWantsList(username, goodName, type, status, page, eachPageNum);
    let countPromise = adminService.getWantsListCount(username, goodName, type, status);

    let promiseData = await Promise.all([dataPromise, countPromise]);
    result.data = promiseData[0];
    result.count = promiseData[1];

    ctx.body = result;
  },
  //商品置为无效
  async disabledWants(ctx){
    let result = {
      code: 0,
      msg: '商品删除成功'
    };
    let data = ctx.request.body,
      wantID = data.wantID;
    wantID = "'" + wantID.join("','") + "'";
    let re = await adminService.disabledWants(wantID);
    ctx.body = result;
  },
  //商品置为有效
  async enabledWants(ctx){
    let result = {
      code: 0,
      msg: '商品撤销成功'
    };
    let data = ctx.request.body,
      wantID = data.wantID;
    wantID = "'" + wantID.join("','") + "'";
    let re = await adminService.enabledWants(wantID);
    ctx.body = result;
  },
  //下架商品
  async offWants(ctx){
    let result = {
      code: 0,
      msg: '下架商品成功'
    };
    let data = ctx.request.body,
      wantID = data.wantID;
    wantID = "'" + wantID.join("','") + "'";
    let re = await adminService.offWants(wantID);
    ctx.body = result;
  },
  //上架商品
  async onWants(ctx){
    let result = {
      code: 0,
      msg: '上架商品成功'
    };
    let data = ctx.request.body,
      wantID = data.wantID;
    wantID = "'" + wantID.join("','") + "'";
    let re = await adminService.onWants(wantID);
    ctx.body = result;
  },
};