const router = require('koa-router')()
const userController = require('../../controllers/index/userController');
const common = require('../../controllers/index/common');

module.exports = router
  .post( '/register', userController.register )
  .get( '/register', userController.registerPage )
  .post( '/sendIdCode', userController.sendIdCode)
  .post( '/login', userController.login)
  .post( '/forgetPass', userController.forgetPass)
  .get( '/logOut', userController.logOut)
  .get( '/login', userController.loginPage)
  .post( '/getUserInfoByGoodID', common.checkLoginApi, userController.getUserInfoByGoodID)
  .post( '/getUserInfoByWantID', common.checkLoginApi, userController.getUserInfoByWantID)
  .get( '/userCenter', common.checkLogin, userController.userCenter)
  .post( '/getUserInfo', common.checkLoginApi, userController.getUserInfo)
  .post( '/modifyUserInfo', common.checkLoginApi, userController.modifyUserInfo)
