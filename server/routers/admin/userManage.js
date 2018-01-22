/**
 * 管理员用户子路由
 */

const router = require('koa-router')()
const userManage = require('../../controllers/admin/userManageController');
const common = require('../../controllers/admin/common');

module.exports = router
  .post( '/getUser',common.checkLogin, userManage.getUser )
  .post( '/whiteUser',common.checkLogin, userManage.whiteUser )
  .post( '/blackUser',common.checkLogin, userManage.blackUser );
