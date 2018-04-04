/**
 * 管理员商品管理子路由
 */

const router = require('koa-router')()
const taskManage = require('../../controllers/admin/taskController');

module.exports = router
  .post( '/crontabDown',taskManage.crontabDown );
