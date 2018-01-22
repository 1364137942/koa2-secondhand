/**
 * 管理员商品管理子路由
 */

const router = require('koa-router')()
const taskManage = require('../../controllers/admin/taskController');
const common = require('../../controllers/admin/common');

module.exports = router
  .post( '/sendMail',common.checkLogin, taskManage.sendMail );
