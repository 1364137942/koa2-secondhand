/**
 * 管理员用户子路由
 */

const router = require('koa-router')();
const admin = require('../../controllers/admin/adminController');
const common = require('../../controllers/admin/common');

module.exports = router
  .get( '/',common.checkLogin, admin.indexPage )
  .get( '/indexPage',common.checkLogin, admin.indexPage )
  .get('/loginPage', admin.loginPage)
  .get('/logOut', admin.logOut)
  .post('/login', admin.login);
