/**
 * Created by alizjli on 2017/12/19.
 */
const adminCode = require('./../../codes/admin');
module.exports = {
  /**
   * 校验用户是否登录
   * @param  {obejct} ctx 上下文对象
   */
  checkLogin(ctx, next) {
    let result = {
      code: -1,
      msg: adminCode.FAIL_USER_NO_LOGIN,
    };
    let session = ctx.session
    if( session && session.isLogin === true  ) {
      result.msg = 'admin login success';
      result.code = 0;
    }
    return next();

    // if(result.code === -1){
    //     ctx.redirect('/admin/loginPage');
    // }
  }
};