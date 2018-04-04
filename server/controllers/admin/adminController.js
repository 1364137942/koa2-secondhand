const validator = require('validator');
const adminService = require('./../../services/adminService');
const adminCode = require('./../../codes/admin');
const common = require('./common');
const commonFunction = require('../../common/commonFunction');
const {login} = require('./../../utils/loginSchool');

const {inspect} = require('util');
const path = require('path');
const os = require('os');
const fs = require('fs');
const Busboy = require('busboy');
module.exports = {
  async uploadFile(ctx){
    let serverFilePath = path.join(process.cwd(), 'static/image' )
    result = await uploadFile( ctx, {
      fileType: 'img',
      path: serverFilePath
    });
    console.log(result);
    ctx.body = result
  },

  //后台管理员登录界面
  async loginPage ( ctx ) {
    const title = '多赞管理台';
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
  },


};

function uploadFile( ctx, options) {
  let req = ctx.req
  let res = ctx.res
  let busboy = new Busboy({headers: req.headers})

  // 获取类型
  let fileType = options.fileType || 'common'
  let filePath = path.join( options.path,  fileType)
  let mkdirResult = mkdirsSync( filePath )

  return new Promise((resolve, reject) => {
    console.log('文件上传中...')
    let result = {
      errno: -1,
      data: []
    };

    // 解析请求文件事件
    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
      let fileName = Math.random().toString(16).substr(2) + '.' + getSuffixName(filename)
      let _uploadFilePath = path.join( filePath, fileName )
      let saveTo = path.join(_uploadFilePath)

      // 文件保存到制定路径
      file.pipe(fs.createWriteStream(saveTo))

      // 文件写入事件结束
      file.on('end', function() {
        result.errno = 0;
        result.data.push(`//${ctx.host}/image/${fileType}/${fileName}`);

        console.log('文件上传成功！')
        resolve(result)
      })
    })

    // 解析结束事件
    busboy.on('finish', function( ) {
      console.log('文件上结束')
      resolve(result)
    })

    // 解析错误事件
    busboy.on('error', function(err) {
      console.log('文件上出错')
      reject(result)
    })

    req.pipe(busboy)
  })

}
/**
 * 同步创建文件目录
 * @param  {string} dirname 目录绝对地址
 * @return {boolean}        创建目录结果
 */
function mkdirsSync( dirname ) {
  if (fs.existsSync( dirname )) {
    return true
  } else {
    if (mkdirsSync( path.dirname(dirname)) ) {
      fs.mkdirSync( dirname )
      return true
    }
  }
}

/**
 * 获取上传文件的后缀名
 * @param  {string} fileName 获取上传文件的后缀名
 * @return {string}          文件后缀名
 */
function getSuffixName( fileName ) {
  let nameList = fileName.split('.')
  return nameList[nameList.length - 1]
}