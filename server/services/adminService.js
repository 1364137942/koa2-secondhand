/**
 * Created by alizjli on 2017/12/19.
 */

const adminModel = require('../models/admin/adminModel');
const userModel = require('../models/admin/userModel');
const wantsModel = require('../models/admin/wantsModel');
const goodsModel = require('../models/admin/goodsModel');
const noticeModel = require('../models/admin/noticeModel');
const goodTypeModel = require('../models/admin/goodTypeModel');
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
    return await userModel.blackUser(userID);
  },
  async whiteUser(userID){
    return await userModel.whiteUser(userID);
  },
  async getAllType(){
    return await goodTypeModel.getAllType();
  },
  async getGoodsList(userName, goodName, type, status, page, eachPageNum){
    let re = await goodsModel.getGoodsList(userName, goodName, type, status, page, eachPageNum);
    return re;
  },
  async getGoodsListCount(userName, title, type, status){
    let re = await goodsModel.getGoodsListCount(userName, title, type, status);
    return re;
  },
  async offGoods(goodID){
    let re = await goodsModel.offGoods(goodID);
    return true;
  },
  async onGoods(goodID){
    let re = await goodsModel.onGoods(goodID);
    return true;
  },
  async disabledGoods(goodID){
    let re = await goodsModel.disabledGoods(goodID);
    return true;
  },
  async enabledGoods(goodID){
    let re = await goodsModel.enabledGoods(goodID);
    return true;
  },
  //求购管理
  async getWants(userID, page, eachPageNum){
    return await wantsModel.getWants(userID, page, eachPageNum);
  },
  async getWantsCount(userID){
    return await wantsModel.getWantsCount(userID);
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