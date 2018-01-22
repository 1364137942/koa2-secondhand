/**
 * Created by alizjli on 2017/12/19.
 */

const idCodeModel = require('../models/index/idCodeModel');
const userModel = require('../models/index/userModel');
const goodsModel = require('../models/index/goodsModel');

const {getNowFormatDate} = require('../common/commonFunction');

const indexService = {
  async insertOrUpdateIdCode(FEmail, FIdCode, FExpireTime){
    return await idCodeModel.insertOrUpdateIdCode(FEmail, FIdCode, FExpireTime);
  },
  async checkIdCode(FEmail, FIdCode){
    let re = await idCodeModel.getIdCode(FEmail, FIdCode);
    if(Array.isArray(re) && re.length > 0){
      let expireTime = new Date(re[0].FExpireTime);
      let date = new Date()
          nowTime = date.getTime();
      if(nowTime < expireTime.getTime()){
        return 0
      }else{
        return -1
      }
    }else{
      return -2;
    }
  },
  async checkEmailExist(FEmail){
    return await userModel.checkEmailExist(FEmail);
  },
  async addUserInfo(FEmail, FUsername, FPassword, FStudentId, FStudentName, FAcademy){
    return await userModel.addUserInfo(FEmail, FUsername, FPassword, FStudentId, FStudentName, FAcademy);
  },
  async setIdCodeOutDate(FEmail, FExpireDate){
    return await idCodeModel.setIdCodeOutDate(FEmail, FExpireDate);
  },

  //登录
  async login(FEmail, FPassword){
    return await userModel.getUserInfo(FEmail, FPassword);
  },
  //忘记密码
  async forgetPassword(FEmail, FPassword){
    return await userModel.updatePassword(FEmail, FPassword);
  },
  //得到用户信息
  async getUserInfo(FEmail){
    return await userModel.getUserInfo(FEmail);
  },

  async updateUserInfo(FEmail, FUsername, FPhone, FQQ){
    return await userModel.updateUserInfo(FEmail, FUsername, FPhone, FQQ)
  },

  //用户商品管理
  async getUserGoodsList(FEmail, FStatus, page, eachPageNum){
    return await goodsModel.getUserGoodsList(FEmail, FStatus, page, eachPageNum);
  },
  async getUserGoodsListCount(FEmail, FStatus){
    let re = await goodsModel.getUserGoodsList(FEmail, FStatus);
    return re[0].count;
  },
  async deleteGood(FGoodID, FEmail){
    let re = await goodsModel.deleteGood(FGoodID, FEmail);
    if(re.affectedRows == 1){
      return true;
    }else{
      return false;
    }
  },
  async getGoodInfo(FGoodID, FEmail){
    return await goodsModel.getGoodInfo(FGoodID, FEmail);
  }




};

module.exports = indexService;