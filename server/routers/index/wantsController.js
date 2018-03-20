const router = require('koa-router')()
const wantsController = require('../../controllers/index/wantsController');

module.exports = router
  .get( '/index', wantsController.index )
  .post( '/getWantsList', wantsController.getWantsList )
  .get( '/wantDetail', wantsController.wantDetail )
  .post( '/getWantDetail', wantsController.getWantDetail)
  .get( '/editWant', wantsController.editWant)
  .post( '/addWant', wantsController.addWant)
  .post( '/modifyWant', wantsController.modifyWant)
