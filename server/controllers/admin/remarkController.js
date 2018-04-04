const adminService = require('./../../services/adminService');
const adminCode = require('./../../codes/admin');

module.exports = {
  async getRemark ( ctx ) {
    const title = '多赞管理台';
    const user = ctx.session.username;
    await ctx.render('admin/remarkManage.ejs', {
      title,
      user
    })
  },

  //登录
  async getRemarkList ( ctx ) {
    let result = {
      code: 0,
      data: [],
      count: 0
    };

    let data = ctx.request.body,
      username = data.username ? data.username : '',
      type = data.type === 'good' ? 'G' : 'W',
      status = data.status ? data.status : '',
      page = data.page !== '' ? parseInt(data.page) - 1 : 0,
      eachPageNum = data.eachPageNum || 10;

    page = parseInt(page)*parseInt(eachPageNum);

    let dataPromise = adminService.getRemarkList(username, type, status, page, eachPageNum);
    let countPromise = adminService.getRemarkListCount(username, type, status);

    let promiseData = await Promise.all([dataPromise, countPromise]);
    result.data = promiseData[0];
    result.count = promiseData[1];

    ctx.body = result;
  },
  async enabledRemark(ctx){
    let result = {
      code: 0,
      msg: '修改评论状态成功'
    };
    let data = ctx.request.body,
      remarkID = data.remarkID;
    remarkID = "'" + remarkID.join("','") + "'";
    let re = await adminService.enabledRemark(remarkID);
    ctx.body = result;

  },
  async disabledRemark(ctx){
    let result = {
      code: 0,
      msg: '修改评论状态'
    };
    let data = ctx.request.body,
      remarkID = data.remarkID;
    remarkID = "'" + remarkID.join("','") + "'";
    let re = await adminService.disabledRemark(remarkID);
    ctx.body = result;
  },
};