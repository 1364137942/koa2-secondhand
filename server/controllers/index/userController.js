const indexService = require('./../../services/indexService');
const commonFunction = require('../../common/commonFunction');
const {CustomError} = require('../../utils/Error');
const common = require('../../controllers/index/common');
module.exports = {
  async getUserInfoByGoodID(ctx){
    let result = {
      code: 0,
      data: {}
    };
    let data = ctx.request.body,
      goodID = data.goodID;
    let re = await indexService.getUserInfoByGoodID(goodID);
    if(re === false){
      result.code = -1;
    }else{
      result.data = re;
    }
    ctx.body = result;
  },
  async getUserInfoByWantID(ctx){
    let result = {
      code: 0,
      data: {}
    };
    let data = ctx.request.body,
      wantID = data.wantID;
    let re = await indexService.getUserInfoByWantID(wantID);
    if(re === false){
      result.code = -1;
    }else{
      result.data = re;
    }
    ctx.body = result;
  },
  async sendIdCode(ctx){
    let result = {
      code: 0,
      msg: '发送验证码成功'
    };
    let data = ctx.request.body,
        email = data.email;
    let date = new Date(),
        time = date.getTime() + 2*3600*1000;
    let expireDate = await commonFunction.getNowFormatDate(time);
    let idCode = await commonFunction.getRandomNum(4);
    let addIdCodeRe = await indexService.insertOrUpdateIdCode(email, idCode, expireDate);
    if(!(addIdCodeRe == true && await commonFunction.sendMail(email, '验证码', idCode))){
        result.code = -1;
        result.msg = '发送验证码失败'
    }

    ctx.body = result;
  },
  async registerPage(ctx){
    const title = '多赞二手商城';
    await ctx.render('index/registerPage.ejs', {
      title,
    })

  },
  async register ( ctx ) {
    let result = {
      code: 0,
      msg: 'register success'
    };
    let data = ctx.request.body,
        email = data.email,
        studentId = data.studentId,
        studentPass = data.studentPass,
        password = await commonFunction.md5(data.password),
        idCode = data.idCode,
        username = data.username;
    //先校验验证码
    try{
      let checkIdCode = await indexService.checkIdCode(email, idCode);
      if(checkIdCode == -2){
        throw new CustomError('请选择发送邮箱验证码');
      }
      if(checkIdCode == -1){
        throw new CustomError('验证码已过期');
      }
      // await indexService.setIdCodeOutDate(email, await commonFunction.getNowFormatDate(1000));

      //验证码通过，校验邮箱是否已注册
      let checkEmailExist = await indexService.checkEmailExist(email);

      if(checkEmailExist == true){
        throw new CustomError('邮箱已存在');
      }
      //校验学生身份证信息
      let studentInfo = await commonFunction.gdufsLogin(studentId, studentPass);
      if(studentInfo == false) {
        throw new CustomError('学生信息实名认证失败');
      }
      console.log(studentInfo);
      let studentName = studentInfo.name,
        academy = studentInfo.academy;
      let addUserInfo = await indexService.addUserInfo(email, username, password, studentId, studentName, academy);
      if(addUserInfo == false){
        throw new CustomError('用户注册失败，请稍后再试');
      }
    }catch(e){
      result.code = -1;
      if(e.name == 'CustomError'){
        result.msg = e.message;
      }else{
        result.msg = '系统错误';
        throw Error(e);
      }
    }
    ctx.body = result;
  },

  async login (ctx){
    let result = {
      code: 0,
      msg: '登录成功'
    };
    let data = ctx.request.body,
        email = data.email,
        password = await commonFunction.md5(data.password);
    let loginRe = await indexService.login(email, password);
    if(Array.isArray(loginRe) && loginRe.length >0){
      let session = ctx.session;
      session.isLogin = true;
      session.email = email;
      session.userID = loginRe[0].FUserID;
      session.username = loginRe[0].FUserName;
    }else{
      result.code = -1;
      result.msg = '登录失败'
    }
    ctx.body = result;
  },
  async logOut(ctx){
    ctx.session = null;
    ctx.redirect('/userController/login');
  },
  async loginPage(ctx){
    const title = '多赞二手商城';
    await ctx.render('index/loginPage.ejs', {
      title,
    })
  },
  async forgetPass(ctx){
    let result = {
      code: 0,
      msg: '重置密码成功'
    };
    try{
      let data = ctx.request.body,
          email = data.email,
          idCode = data.idCode,
          password = await commonFunction.md5(data.password);
      let checkIdCode = await indexService.checkIdCode(email, idCode);
      if(checkIdCode == -2){
        throw new CustomError('请选择发送邮箱验证码');
      }

      if(checkIdCode == -1){
        throw new CustomError('验证码已过期');
      }
      await indexService.setIdCodeOutDate(email, await commonFunction.getNowFormatDate(1000));
      let resetRe = await indexService.forgetPassword(email, password);
      if(resetRe.affectedRows < 0){
        throw new CustomError('修改密码失败');
      }


    }catch(e){
      result.code = -1;
      if(e.name == 'CustomError'){
        result.msg = e.message;
      }else{
        result.msg = '系统错误';
        throw Error(e);
      }
    }

    ctx.body = result;

  },

  async getUserInfo(ctx){
    let result = {
      code: 0,
      data: {}
    };
    let session = common.getSession(ctx);
    if(session !== false){
      let userInfo = await indexService.getUserInfo(session.email);
      result.data = userInfo[0];
    }else{
      result.code = -1;
    }
    ctx.body = result;

  },

  async modifyUserInfo(ctx){
    let result = {
      code: 0,
      msg: 'modify userInfo success'
    };

    let data = ctx.request.body,
        username = data.username,
        phone = data.phone,
        avatar = data.avatar,
        qq = data.qq;
    let session = common.getSession(ctx);
    if(session !== false){
      let updateRe = await indexService.updateUserInfo(session.email, username, phone, qq, avatar);
    }else{
      result.code = -1;
    }
    ctx.body = result;
  },
  async userCenter(ctx){
    const title = '多赞二手商城';
    let session = common.getSession(ctx);
    let username = '';
    if(session !== false){
      username = session.username;
    }
    await ctx.render('index/userCenter.ejs', {
      title,
      username
    })
  }

};