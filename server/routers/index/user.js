const router = require('koa-router')()
const user = require('../../controllers/index/userController');

module.exports = router
  .post( '/register', user.register )
  .post( '/sendIdCode', user.sendIdCode)
  .post( '/login', user.login)
  .post( '/forgetPass', user.forgetPass)
  .get( '/login', user.logOut)
  .get( '/login', user.loginPage);
