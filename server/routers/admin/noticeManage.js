/**
 * 管理员商品管理子路由
 */

const router = require('koa-router')()
const noticeManage = require('../../controllers/admin/noticeManageController');
const common = require('../../controllers/admin/common');

module.exports = router
  .post( '/sendNotice',common.checkLogin, noticeManage.sendNotice );
