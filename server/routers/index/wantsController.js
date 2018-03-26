const router = require('koa-router')()
const wantsController = require('../../controllers/index/wantsController');
const common = require('../../controllers/index/common');

module.exports = router
  .get( '/index', wantsController.index )
  .post( '/getWantsList', wantsController.getWantsList )
  .get( '/wantDetail', wantsController.wantDetail )
  .post( '/getWantDetail', wantsController.getWantDetail)
  .get( '/editWant', common.checkLogin, wantsController.editWant)
  .post( '/addWant', common.checkLoginApi, wantsController.addWant)
  .post( '/modifyWant',common.checkLoginApi,  wantsController.modifyWant)
  .post( '/getWantUserList',common.checkLoginApi,  wantsController.getWantUserList)
  .post( '/updateUserWantStatus',common.checkLoginApi,  wantsController.updateUserWantStatus)
