const indexService = require('./../../services/indexService');
const commonFunction = require('../../common/commonFunction');
const {CustomError} = require('../../utils/Error');
const common = require('../../controllers/index/common');
module.exports = {
  async gerRemarkList(ctx){
    let result = {
      code: 0,
      data: [],
      count: 0
    };
    let session = common.getSession(ctx);
    let userEmail = '';
    if(session !== false){
      userEmail = session.email;
    }
    try{
      let data = ctx.request.body,
        page = data.page !== '' ? parseInt(data.page) - 1 : 0,
        eachPageNum = data.eachPageNum || 10,
        itemID = data.itemID || 10,
        itemType = data.itemType == 'good' ? 'good' : 'want';

      let itemInfo = '',
          isShowContactInfo = false;
      if(itemType === 'good'){
        itemInfo = await indexService.getGoodInfo(itemID, userEmail);
        itemID = 'G'+itemID;
      }else{
        itemInfo = await indexService.getWantInfo(itemID, userEmail);
        itemID = 'W'+itemID;
      }
      if(Array.isArray(itemInfo) && itemInfo.length > 0){
        isShowContactInfo = true;
      }

      page = parseInt(page)*parseInt(eachPageNum);

      let dataPromise = indexService.getRemarkList(page, eachPageNum, isShowContactInfo, itemID);
      let countPromise = indexService.getRemarkListCount(itemID);

      let promiseData = await Promise.all([dataPromise, countPromise]);
      result.data = promiseData[0];
      result.count = promiseData[1];


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
  async addRemark(ctx){
    let result = {
      code: 0,
      msg: '发布评论成功'
    };
    let data = ctx.request.body,
      price = data.price ? data.price : '',
      itemID = data.itemID,
      remark = data.remark;
    let session = common.getSession(ctx);
    let email = '';
    if(session !== false){
      email = session.email;
      let now = commonFunction.getNowFormatDate();
      let addRe = await indexService.addRemark(email, price, itemID, remark, now);
    }else{
      result.code = -1;
      result.msg = '请先登录！';
    }
    ctx.body = result;

  }
};