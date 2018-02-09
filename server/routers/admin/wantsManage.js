/**
 * 管理员商品管理子路由
 */

const router = require('koa-router')()
const wantsManage = require('../../controllers/admin/wantsManageController');
const common = require('../../controllers/admin/common');

module.exports = router
  .get( '/getWants',common.checkLogin, wantsManage.getWants )
  .post( '/getWantsList',common.checkLogin, wantsManage.getWantsList )
  .post( '/onWants',common.checkLogin, wantsManage.onWants )
  .post( '/offWants',common.checkLogin, wantsManage.offWants )
  .post( '/enabledWants',common.checkLogin, wantsManage.enabledWants )
  .post( '/disabledWants',common.checkLogin, wantsManage.disabledWants );
