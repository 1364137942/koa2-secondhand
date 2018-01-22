const validator = require('validator');
const adminService = require('./../services/adminService');
const adminCode = require('./../codes/admin');

/**
 * 校验用户是否登录
 * @param  {obejct} ctx 上下文对象
 */
const checkLogin = function(ctx) {
  let result = {
    code: -1,
    msg: adminCode.FAIL_USER_NO_LOGIN,
  };
  let session = ctx.session
  if( session && session.isLogin === true  ) {
    result.msg = 'admin login success';
    result.code = 0;
  }
  return result
};
module.exports = {
  async indexPage ( ctx ) {
    let isLogin = checkLogin(ctx);
    if(isLogin.code === 0){
      const title = 'admin page'
      await ctx.render('admin', {
        title,
      })
    }else{
      await ctx.redirect('/admin/loginPage')
    }
  },

  async loginPage ( ctx ) {
    const title = 'admin login page';
    await ctx.render('adminLogin', {
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