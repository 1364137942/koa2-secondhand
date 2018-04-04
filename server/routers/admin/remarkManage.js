/**
 * 管理员用户子路由
 */

const router = require('koa-router')();
const remarkController = require('../../controllers/admin/remarkController');
const common = require('../../controllers/admin/common');

module.exports = router
  .get('/getRemark', common.checkLogin, remarkController.getRemark)
  .post('/getRemarkList', common.checkLoginApi, remarkController.getRemarkList)
  .post('/enabledRemark', common.checkLoginApi, remarkController.enabledRemark)
  .post('/disabledRemark', common.checkLoginApi, remarkController.disabledRemark)
