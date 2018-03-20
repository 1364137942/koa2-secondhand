const adminService = require('./../../services/adminService');
const {inspect} = require('util');
const path = require('path');
const os = require('os');
const fs = require('fs');
const Busboy = require('busboy');
const dbUnit = require('../../utils/db-util');
//定时任务
module.exports = {
  //定时下架商品
  async uploadPage(ctx){
    const title = '文件上传测试';
    console.log();
    await ctx.render('uploadPage.ejs', {
      title,
    })
  },
  async uploadFile(ctx){

    let serverFilePath = path.join(process.cwd(), 'static/image' )

    result = await uploadFile( ctx, {
      fileType: 'album',
      path: serverFilePath
    });
    console.log(123);
    ctx.body = result
  },
  async test(ctx){
    let _sql = `select wf_workflow.* ,
     wf_arc.transition_id,wf_arc.place_id,wf_arc.direction,wf_arc.arc_type,
     wf_place.place_type,wf_place.place_name
     from wf_workflow 
      join wf_place on wf_workflow.workflow_id = wf_place.workflow_id
      join wf_transition on wf_workflow.workflow_id = wf_transition.workflow_id 
      join wf_arc on wf_transition.workflow_id = wf_arc.workflow_id and wf_transition.transition_id = wf_arc.transition_id and wf_place.place_id = wf_arc.place_id
      where wf_workflow.workflow_id = '3' `
    let re = await dbUnit.query(_sql);

    let placeNum = 6;
    let arr = [];
    for(let i = 0; i<placeNum; i++) {
      arr[i] = [];
      for(let j = 0; j<placeNum; j++) {
        arr[i][j] = 0;
      }
    }
    let placeAcr = {};
    let transitionArcType = {};

    re.forEach(function(item){
      if(!placeAcr[item.transition_id]){
        placeAcr[item.transition_id] = {
          IN: [],
          OUT: [],
        };
        transitionArcType[item.transition_id] = 'SEQ';
      }
      placeAcr[item.transition_id][item.direction].push(item.place_id);
      if(item.arc_type !== 'SEQ'){
        transitionArcType[item.transition_id] = item.arc_type;
      }
    });
    for(let key in placeAcr){
      let transitionId = key;
      let val = placeAcr[key];
      val.IN.forEach(function(i){
        val.OUT.forEach(function(j){
          arr[i-1][j-1] = transitionId;
        })
      })
    }
    for(let i = 0; i<placeNum; i++) {
      str = '';
      for(let j = 0; j<placeNum; j++) {
        str += arr[i][j] + ' ';
      }
      console.log(str);
    }
    console.log(transitionArcType);


    ctx.body = re;
    }
  }


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
      success: false,
      message: '',
      data: null
    }

    // 解析请求文件事件
    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
      let fileName = Math.random().toString(16).substr(2) + '.' + getSuffixName(filename)
      let _uploadFilePath = path.join( filePath, fileName )
      let saveTo = path.join(_uploadFilePath)

      // 文件保存到制定路径
      file.pipe(fs.createWriteStream(saveTo))

      // 文件写入事件结束
      file.on('end', function() {
        result.success = true
        result.message = '文件上传成功'
        result.data = {
          pictureUrl: `//${ctx.host}/image/${fileType}/${fileName}`
        }
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

