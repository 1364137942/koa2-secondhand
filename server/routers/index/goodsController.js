const router = require('koa-router')()
const goodController = require('../../controllers/index/goodsController');

module.exports = router
  .get( '/editGood', goodController.editGood )
  .post( '/addGood', goodController.addGood )
  .get( '/goodDetail', goodController.goodDetail )
  .post( '/getGoodDetail', goodController.getGoodDetail )
  .get( '/test', goodController.test )
  .get( '/getHotGoods', goodController.getHotGoods )
  .post( '/getGoodsList', goodController.getGoodsList )
  .post( '/modifyGood', goodController.modifyGood );
