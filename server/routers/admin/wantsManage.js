/**
 * 管理员商品管理子路由
 */

const router = require('koa-router')()
const wantsManage = require('../../controllers/admin/wantsManageController');
const common = require('../../controllers/admin/common');

module.exports = router
  .get( '/getWants',common.checkLogin, wantsManage.getWants )
  .post( '/getWantsList',common.checkLogin, wantsManage.getWantsList )
  .get( '/enabledWants',common.checkLogin, wantsManage.enabledWants )
  .get( '/disabledWants',common.checkLogin, wantsManage.disabledWants );
