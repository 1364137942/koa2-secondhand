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
    // let data = ctx.request.body,
    //   userID = data.userID,
    //   page = data.page !== '' ? parseInt(data.page) - 1 : 0,
    //   eachPageNum = data.eachPageNum || 10;
    //
    // page = parseInt(page)*parseInt(eachPageNum);
    //
    // let dataPromise = adminService.getWants(userID, page, eachPageNum);
    // let countPromise = adminService.getWantsCount(userID);
    //
    // let promiseData = await Promise.all([dataPromise, countPromise]);
    // result.data = promiseData[0];
    // result.count = promiseData[1];

    ctx.body = result;
  },
  //置用户求购有效
  async enabledWants(ctx){
    let result = {
      code: 0,
      msg: 'enable wants success'
    };
    let data = ctx.query,
      wantID = data.wantID;
    let re = await adminService.enabledWants(wantID);
    if(re == false){
      result.code = -1;
      result.msg = 'enable wants fail';
    }
    ctx.body = result;
  },
  //置用户求购无效
  async disabledWants(ctx){
    let result = {
      code: 0,
      msg: 'disable wants success'
    };
    let data = ctx.query,
      wantID = data.wantID;
    let re = await adminService.disabledWants(wantID);
    if(re == false){
      result.code = -1;
      result.msg = 'disable wants fail';
    }
    ctx.body = result;
  }
};