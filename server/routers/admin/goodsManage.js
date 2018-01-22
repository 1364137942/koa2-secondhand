/**
 * 管理员商品管理子路由
 */

const router = require('koa-router')()
const goodsManage = require('../../controllers/admin/goodsManageController');
const common = require('../../controllers/admin/common');

module.exports = router
  .post( '/getUserGoods',common.checkLogin, goodsManage.getUserGoods )
  .get( '/disabledGoods',common.checkLogin, goodsManage.disabledGoods )
  .get( '/enabledGoods',common.checkLogin, goodsManage.enabledGoods )
  .get( '/offGoods',common.checkLogin, goodsManage.offGoods )
  .get( '/onGoods',common.checkLogin, goodsManage.onGoods );
