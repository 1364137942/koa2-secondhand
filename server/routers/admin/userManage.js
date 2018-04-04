/**
 * 管理员用户子路由
 */

const router = require('koa-router')()
const userManage = require('../../controllers/admin/userManageController');
const common = require('../../controllers/admin/common');

module.exports = router
  .get('/getUser',common.checkLogin, userManage.getUser)
  .post( '/getUserList',common.checkLoginApi, userManage.getUserList )
  .post( '/whiteUser',common.checkLoginApi, userManage.whiteUser )
  .post( '/blackUser',common.checkLoginApi, userManage.blackUser );
