/**
 * 管理员商品管理子路由
 */

const router = require('koa-router')()
const goodsManage = require('../../controllers/admin/goodsManageController');
const common = require('../../controllers/admin/common');

module.exports = router
  .get( '/getGoods',common.checkLogin, goodsManage.getGoods )
  .post( '/getGoodsList',common.checkLogin, goodsManage.getGoodsList )
  .post( '/disabledGoods',common.checkLogin, goodsManage.disabledGoods )
  .post( '/enabledGoods',common.checkLogin, goodsManage.enabledGoods )
  .post( '/offGoods',common.checkLogin, goodsManage.offGoods )
  .post( '/onGoods',common.checkLogin, goodsManage.onGoods );
