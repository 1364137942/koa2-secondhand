/**
 * 管理员商品管理子路由
 */

const router = require('koa-router')()
const testManage = require('../../controllers/admin/testController');
const common = require('../../controllers/admin/common');

module.exports = router
  .get( '/uploadPage',common.checkLogin, testManage.uploadPage )
  .post( '/uploadFile',common.checkLogin, testManage.uploadFile );
