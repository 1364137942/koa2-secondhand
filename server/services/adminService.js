/**
 * Created by alizjli on 2017/12/19.
 */

const adminModel = require('../models/admin/adminModel');
const userModel = require('../models/admin/userModel');
const wantsModel = require('../models/admin/wantsModel');
const goodsModel = require('../models/admin/goodsModel');
const noticeModel = require('../models/admin/noticeModel');
const adminCode = require('./../codes/admin');
const {getNowFormatDate} = require('../common/commonFunction');

const adminService = {
  async login(user, password){
    let result = {
      code: 0,
      msg: 'admin login success'
    };

    let existOne  = await adminModel.getExistOne(user, password);
    if ( !existOne  ) {
      result.code = -1;
      result.msg = adminCode.ERROR_ADMIN;
    }
    return result;
  },

  async getAllUser(type, page, eachPageNum){
    let re = await userModel.getAllUser(type, page, eachPageNum);
    return re;
  },
  async getAllUserCount(type){
    let re = await userModel.getAllUserCount(type);
    return re;
  },
  async blackUser(userID){
    let re = await userModel.blackUser(userID);
    return re;
  },
  async whiteUser(userID){
    let re = await userModel.whiteUser(userID);
    return re;
  },

  async getUserGoods(userID, page, eachPageNum){
    let re = await goodsModel.getUserGoods(userID, page, eachPageNum);
    return re;
  },
  async getUserGoodsCount(userID){
    let re = await goodsModel.getUserGoodsCount(userID);
    return re;
  },
  async offGoods(goodID){
    let re = await goodsModel.offGoods(goodID);
    if(re.changedRows && re.changedRows == 1){
      return true
    }else{
      return false;
    }
  },
  async onGoods(goodID){
    let re = await goodsModel.onGoods(goodID);
    if(re.changedRows && re.changedRows == 1){
      return true
    }else{
      return false;
    }
  },
  async disabledGoods(goodID){
    let re = await goodsModel.disabledGoods(goodID);
    if(re.changedRows && re.changedRows == 1){
      return true
    }else{
      return false;
    }
  },
  async enabledGoods(goodID){
    let re = await goodsModel.enabledGoods(goodID);
    if(re.changedRows && re.changedRows == 1){
      return true
    }else{
      return false;
    }
  },
  //求购管理
  async getUserWants(userID, page, eachPageNum){
    let re = await wantsModel.getUserWants(userID, page, eachPageNum);
    return re;
  },
  async getUserWantsCount(userID){
    let re = await wantsModel.getUserWantsCount(userID);
    return re;
  },
  async enabledWants(wantID){
    let re = await wantsModel.enabledWants(wantID);
    if(re.changedRows && re.changedRows == 1){
      return true
    }else{
      return false;
    }
  },
  async disabledWants(wantID){
    let re = await wantsModel.disabledWants(wantID);
    if(re.changedRows && re.changedRows == 1){
      return true
    }else{
      return false;
    }
  },
  async sendNotice(email, title, content){
    let now = await getNowFormatDate();
    return await noticeModel.addNotice(email, title, content, now);
  },
  async getAllNotice(){
    return await noticeModel.getAllNotice();
  }



};

module.exports = adminService;