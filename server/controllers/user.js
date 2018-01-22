const userInfoService = require('./../services/user-info');
const userCode = require('./../codes/user')

module.exports = {
  /**
   * 注册操作
   * @param   {obejct} ctx 上下文对象
   */
  async signUp( ctx ) {
    let result = {
      code: 0,
      msg: 'success',
    };
    let formData = ctx.request.body;

    let validateResult = userInfoService.validatorSignUp( formData );
    if ( validateResult.code === -1 ) {
      result = validateResult;
      ctx.body = result;
      return
    }

    let existOne  = await userInfoService.getExistOne(formData)

    if ( existOne  ) {
      if ( existOne .name === formData.userName ) {
        result.msg = userCode.FAIL_USER_NAME_IS_EXIST
        ctx.body = result;
        return
      }
      if ( existOne .email === formData.email ) {
        result.msg = userCode.FAIL_EMAIL_IS_EXIST
        ctx.body = result;
        return
      }
    }

    let userResult = await userInfoService.create({
      email: formData.email,
      password: formData.password,
      username: formData.username
    });


    if ( userResult && userResult.insertId * 1 > 0) {
      result.msg = 'success';
    } else {
      result.code = -1;
      result.msg = userCode.ERROR_SYS;
    }

    ctx.body = result
  },

}