/**
 * Created by alizjli on 2017/12/19.
 */

const idCodeModel = require('../models/index/idCodeModel');
const userModel = require('../models/index/userModel');
const goodsModel = require('../models/index/goodsModel');
const goodTypeModel = require('../models/index/goodTypeModel');
const wantsModel = require('../models/index/wantsModel');
const readNoticeModel = require('../models/index/readNoticeModel');


const indexService = {
  async test(){
    return await goodsModel.test();
  },
  async getUserInfoByGoodID(FGoodID){
    let re = await userModel.getUserInfoByGoodID(FGoodID);
    if(Array.isArray(re) && re.length > 0){
      return re[0];
    }else{
      return false;
    }
  },
  async getUserInfoByWantID(FWantID){
    let re = await userModel.getUserInfoByWantID(FWantID);
    if(Array.isArray(re) && re.length > 0){
      return re[0];
    }else{
      return false;
    }
  },
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
  },

  async updateGoodStatus(FGoodID, FEmail, FStatus){
    let re = await goodsModel.updateGoodStatus(FGoodID, FEmail, FStatus);
    if(re.affectedRows == 1){
      return true;
    }else{
      return false;
    }

  },

  async getHotGoods(){
    return await goodsModel.getHotGoods();
  },
  async getWantsList(FGoodName, FType, page, eachPageNum){
    return await wantsModel.getWantsList(FGoodName, FType, page, eachPageNum);
  },
  async getWantsListCount(FGoodName, FType){
    return await wantsModel.getWantsListCount(FGoodName, FType);
  },
  //用户求购管理
  async getUserWantsList(FEmail, FStatus, page, eachPageNum){
    return await wantsModel.getUserWantsList(FEmail, FStatus, page, eachPageNum);
  },
  async getUserWantsListCount(FEmail, FStatus){
    let re = await wantsModel.getUserWantsList(FEmail, FStatus);
    return re[0].count;
  },
  async deleteWant(FWantID, FEmail){
    let re = await wantsModel.deleteWant(FWantID, FEmail);
    if(parseInt(re.affectedRows) === 1){
      return true;
    }else{
      return false;
    }
  },
  async getWantInfo(FWantID, FEmail){
    return await wantsModel.getWantInfo(FWantID, FEmail);
  },
  async updateGoodStatus(FWantID, FEmail, FStatus){
    let re = await wantsModel.updateWantStatus(FWantID, FEmail, FStatus);
    if(parseInt(re.affectedRows) === 1){
      return true;
    }else{
      return false;
    }

  },

  //通知管理
  async getNoticeList(FEmail, page, eachPageNum){
    return await readNoticeModel.getNoticeList(FEmail, page, eachPageNum);
  },
  async getNoticeList(FEmail){
    let re = await readNoticeModel.getNoticeList(FEmail);
    return re[0].count;
  },
  async getNewNotice(FEmail){
    let re = await readNoticeModel.getNewNotice(FEmail);
    let num = 0;
    if(Array.isArray(re) && re.length > 0){
      num = re[0].num;
    }
    return num;
  },
  async readNotice(FEmail){
    let re = await readNoticeModel.readNotice(FEmail);
    return re;
  },

  async getGoodsList(goodName, type, page, eachPageNum){
    return await goodsModel.getGoodsList(goodName, type, page, eachPageNum);
  },
  async getGoodsListCount(goodName, type){
    return await goodsModel.getGoodsListCount(goodName, type);
  },
  async getGoodType(){
    return await goodTypeModel.getGoodType();
  },
  async addGood(email, goodName, goodType, saleDate, price, imageUrl, desc, now, old){
    return await goodsModel.addGood(email, goodName, goodType, saleDate, price, imageUrl, desc, now, old);
  },
  async modifyGood(goodID, email, goodName, goodType, saleDate, price, imageUrl, desc, now, old){
    return await goodsModel.modifyGood(goodID, email, goodName, goodType, saleDate, price, imageUrl, desc, now, old);
  },
  async getGoodDetail(goodID){
    return await goodsModel.getGoodDetail(goodID);
  },
  async getWantDetail(FWantID){
    return await wantsModel.getWantDetail(FWantID);
  },
  async addWant(email, goodName, goodTpe, saleDate, desc, now, old){
    return await wantsModel.addWant(email, goodName, goodTpe, saleDate, desc, now, old);
  },
  async modifyWant(wantID, email, goodName, goodType, saleDate, desc, now, old){
    return await wantsModel.modifyWant(wantID, email, goodName, goodType, saleDate, desc, now, old);
  },

};

module.exports = indexService;