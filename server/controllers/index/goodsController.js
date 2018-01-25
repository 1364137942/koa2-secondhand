const indexService = require('./../../services/indexService');
const commonFunction = require('../../common/commonFunction');
const {CustomError} = require('../../utils/Error');
module.exports = {
  async getUserGoods(ctx){
    let result = {
      code: 0,
      data: [],
      count: 0
    };
    let data = ctx.query,
        eachPageNum = data.eachPageNum !== '' ? data.eachPageNum : 20,
        page = data.page !== '' ? data.page : 1,
        status = data.status;
    page = (page - 1) * eachPageNum;
    let email = ctx.session.email;

    result.data = await indexService.getUserGoodsList(email, status, page, eachPageNum);
    result.count = await indexService.getUserGoodsListCount(email, status);
    ctx.body = result;
  },

  async deleteGood(ctx){
    let result = {
      code: 0,
      msg: '删除商品成功'
    };
    let data = ctx.query,
        goodID = data.goodID;
    let email = ctx.session.email;
    let re = await indexService.deleteGood(goodID, email);
    if(re === false){
      result.code = -1;
      result.msg = '删除商品失败'
    }
    ctx.body = result;
  },

  async updateUserGoodStatus(ctx){
    let result = {
      code: 0,
      msg: '商品下架成功'
    };
    try{
      let data = ctx.query,
        goodID = data.goodID;
        status = data.status;
      if(parseInt(status) === 1){
        result.msg = '商品上架成功'
      }
      let email = ctx.session.email;
      let re = await indexService.getGoodInfo(goodID, email);
      if(!(Array.isArray(re) && re.length > 0)){
        throw new CustomError('商品信息不存在');
      }
      let updateRe = await indexService.updateGoodStatus(goodID, email, status);
      if(updateRe === false){
        throw new CustomError('商品信息状态更新失败');
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
  async getHotsGoods(){
    let result = {
      code: 0,
      msg: '获取热门商品成功',
      data: []
    }
    let re = await indexService.getHotGoods();
    if(Array.isArray(re)){
      result.data = re;
    }
    ctx.body = result;
  },
  async getUserGoodsInfo(ctx){
    let result = {
      code: 0,
      msg: '获取商品信息成功',
      data: ''
    };
    let data = ctx.query,
        goodID = data.goodID;
    let email = ctx.session.email;
    let data = await indexService.getGoodInfo(goodID, email);
    if(Array.isArray(data) && data.length > 0){
      result.data = data[0];
    }else{
      result.code = -1;
      result.msg = '获取商品信息失败';
    }
    ctx.body = result;
  }


};