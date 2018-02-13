const router = require('koa-router')()
const goodController = require('../../controllers/index/goodsController');

module.exports = router
  .get( '/editGood', goodController.editGood )
  .post( '/getGoodsList', goodController.getGoodsList );
