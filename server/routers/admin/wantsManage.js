/**
 * 管理员商品管理子路由
 */

const router = require('koa-router')()
const wantsManage = require('../../controllers/admin/wantsManageController');
const common = require('../../controllers/admin/common');

module.exports = router
  .post( '/getUserWants',common.checkLogin, wantsManage.getUserWants )
  .get( '/enabledWants',common.checkLogin, wantsManage.enabledWants )
  .get( '/disabledWants',common.checkLogin, wantsManage.disabledWants );
