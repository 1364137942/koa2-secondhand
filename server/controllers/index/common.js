/**
 * Created by alizjli on 2017/12/19.
 */
module.exports = {
  /**
   * 校验用户是否登录
   * @param  {obejct} ctx 上下文对象
   */
  checkLogin(ctx, next) {
    let result = {
      code: -1,
      msg: '请先登录',
    };
    let session = ctx.session;
    if( session && session.isLogin === true) {
      result.msg = ' login success';
      result.code = 0;
    }
    if(result.code === -1){
      ctx.redirect('/userController/login');
    }
    return next();
  },
  checkLoginApi(ctx, next){
    let result = {
      code: -1,
      msg: '请先登录',
    };
    let session = ctx.session;
    if( session && session.isLogin === true) {
      result.msg = ' login success';
      result.code = 0;
    }
    if(result.code === -1){
      ctx.body = result;
      return;
    }
    return next();
  },
  getSession(ctx){
    let session = ctx.session;
    if( session && session.isLogin === true) {
      return session;
    }else{
      return false;
    }
  }
};