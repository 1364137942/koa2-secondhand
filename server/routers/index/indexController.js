const router = require('koa-router')()
const indexController = require('../../controllers/index/indexController');
module.exports = router
  .get( '/', indexController.index )
  .get( '/index', indexController.index );
