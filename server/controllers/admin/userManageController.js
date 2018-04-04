const adminService = require('./../../services/adminService');

module.exports = {

  async getUser(ctx){
    const title = '多赞管理台';
    const user = ctx.session.username;
    await ctx.render('admin/userManage.ejs', {
      title,
      user
    })
  },
  async getUserList ( ctx ) {
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
  },
  async blackUser(ctx){
    let result = {
      code: 0,
      msg: 'black user success'
    };
    let data = ctx.request.body,
        userID = data.userID;
    let idIn = '';
    idIn = "'" + userID.split(',').join("','") + "'";
    let re = await adminService.blackUser(idIn);
    ctx.body = result;
  },
  async whiteUser(ctx){
      let result = {
        code: 0,
        msg: 'white user success'
      };
      let data = ctx.request.body,
        userID = data.userID;
      let idIn = '';
      idIn = "'" + userID.split(',').join("','") + "'";
      let re = await adminService.whiteUser(idIn);
      ctx.body = result;
    }
};