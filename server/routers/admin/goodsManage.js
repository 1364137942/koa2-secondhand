/**
 * 管理员商品管理子路由
 */

const router = require('koa-router')()
const goodsManage = require('../../controllers/admin/goodsManageController');
const common = require('../../controllers/admin/common');

module.exports = router
  .get( '/getGoods',common.checkLogin, goodsManage.getGoods )
  .post( '/getGoodsList',common.checkLoginApi, goodsManage.getGoodsList )
  .post( '/disabledGoods',common.checkLoginApi, goodsManage.disabledGoods )
  .post( '/enabledGoods',common.checkLoginApi, goodsManage.enabledGoods )
  .post( '/offGoods',common.checkLoginApi, goodsManage.offGoods )
  .post( '/onGoods',common.checkLoginApi, goodsManage.onGoods );
