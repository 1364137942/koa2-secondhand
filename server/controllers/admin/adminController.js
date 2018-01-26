const validator = require('validator');
const adminService = require('./../../services/adminService');
const adminCode = require('./../../codes/admin');
const common = require('./common');
const commonFunction = require('../../common/commonFunction');

const {login} = require('./../../utils/loginSchool');
module.exports = {
  async indexPage ( ctx ) {
    let user = await login('20141002496', '230639');
    console.log(user);
    const title = 'admin page';
    await ctx.render('admin', {
      title,
    });
  },
  //后台管理员登录界面
  async loginPage ( ctx ) {
    const title = '管理员登录';
    await ctx.render('admin/adminLogin.ejs', {
      title,
    })
  },

  //登录
  async login ( ctx ) {
    let result = {
      code: 0,
      msg: 'success'
    };

    let formData = ctx.request.body,
        user = formData.user,
        password = formData.password;

    //前端数据校验
    if(validator.isEmpty(user)){
      result.code = -1;
      result.msg = adminCode.ERROR_USER_EMPTY;
    }
    if(validator.isEmpty(password)){
      result.code = -1;
      result.msg = adminCode.ERROR_PASSWORD_EMPTY;
    }

    password = await commonFunction.md5(password);
    result = await adminService.login(user, password);
    //登录成功，写入session
    if(result.code === 0){
      let session = ctx.session;
      session.isLogin = true;
      session.username = user;
    }
    ctx.body = result;
  },

  async logOut(ctx){
    ctx.session = null;
    ctx.redirect('/admin/loginPage');
  }

};