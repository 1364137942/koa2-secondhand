const router = require('koa-router')()
const remarkController = require('../../controllers/index/remarkController');
const common = require('../../controllers/index/common');

module.exports = router
  .post( '/gerRemarkList', remarkController.gerRemarkList )
  .post( '/addRemark', common.checkLoginApi, remarkController.addRemark );