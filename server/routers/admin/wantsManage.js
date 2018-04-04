/**
 * 管理员商品管理子路由
 */

const router = require('koa-router')()
const wantsManage = require('../../controllers/admin/wantsManageController');
const common = require('../../controllers/admin/common');

module.exports = router
  .get( '/getWants',common.checkLogin, wantsManage.getWants )
  .post( '/getWantsList',common.checkLoginApi, wantsManage.getWantsList )
  .post( '/onWants',common.checkLoginApi, wantsManage.onWants )
  .post( '/offWants',common.checkLoginApi, wantsManage.offWants )
  .post( '/enabledWants',common.checkLoginApi, wantsManage.enabledWants )
  .post( '/disabledWants',common.checkLoginApi, wantsManage.disabledWants );
