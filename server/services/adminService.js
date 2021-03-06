/**
 * Created by alizjli on 2017/12/19.
 */

const adminModel = require('../models/admin/adminModel');
const userModel = require('../models/admin/userModel');
const wantsModel = require('../models/admin/wantsModel');
const goodsModel = require('../models/admin/goodsModel');
const goodTypeModel = require('../models/admin/goodTypeModel');
const remarkModel = require('../models/admin/remarkModel');
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
    return await goodTypeModel.getGoodType();
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
  async getWantsList(userName, goodName, type, status, page, eachPageNum){
    return await wantsModel.getWantsList(userName, goodName, type, status, page, eachPageNum)
  },
  async getWantsListCount(userName, title, type, status){
    return await wantsModel.getWantsListCount(userName, title, type, status);
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
  async offWants(wantID){
    let re = await wantsModel.offWants(wantID);
    return true;
  },
  async onWants(wantID){
    let re = await wantsModel.onWants(wantID);
    return true;
  },
  async getShouldDownGoods(){
    return await goodsModel.getShouldDownGoods();
  },
  async getShouldDownWants(){
    return await wantsModel.getShouldDownWants();
  },

  async getRemarkList(username, type, status, page, eachPageNum){
    return await remarkModel.getRemarkList(username, type, status, page, eachPageNum)
  },
  async getRemarkListCount(username, type, status){
    return await remarkModel.getRemarkListCount(username, type, status)
  },
  async enabledRemark(remarkID){
    return remarkModel.enabledRemark(remarkID);
  },
  async disabledRemark(remarkID){
    return remarkModel.disabledRemark(remarkID);
  }



};

module.exports = adminService;