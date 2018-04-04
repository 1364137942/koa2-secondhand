const router = require('koa-router')()
const goodController = require('../../controllers/index/goodsController');
const common = require('../../controllers/index/common');

module.exports = router
  .get( '/editGood', common.checkLogin, goodController.editGood )
  .post( '/addGood',common.checkLoginApi, goodController.addGood )
  .get( '/goodDetail', goodController.goodDetail )
  .post( '/getGoodDetail', goodController.getGoodDetail )
  .get( '/getHotGoods', goodController.getHotGoods )
  .post( '/getGoodsList', goodController.getGoodsList )
  .post( '/modifyGood',common.checkLoginApi, goodController.modifyGood )
  .post( '/getUserGoodList',common.checkLoginApi, goodController.getUserGoodList )
  .post( '/updateUserGoodStatus',common.checkLoginApi, goodController.updateUserGoodStatus )
