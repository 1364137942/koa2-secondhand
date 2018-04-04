/**
 * 管理员用户子路由
 */

const router = require('koa-router')();
const admin = require('../../controllers/admin/adminController');
const common = require('../../controllers/admin/common');

module.exports = router
  .get('/loginPage', admin.loginPage)
  .get('/logOut', admin.logOut)
  .post('/uploadFile', admin.uploadFile)
  .post('/login', admin.login);
