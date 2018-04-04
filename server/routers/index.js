/**
 * 整合所有子路由
 */

const router = require('koa-router')()

const error = require('./error');

//后台管理
const admin = require('./admin/admin');
const userManage = require('./admin/userManage');
const goodsManage = require('./admin/goodsManage');
const wantsManage = require('./admin/wantsManage');
const remarkManage = require('./admin/remarkManage');
const task = require('./admin/task');


router.use('/admin', admin.routes(), admin.allowedMethods());
router.use('/userManage', userManage.routes(), userManage.allowedMethods());
router.use('/goodsManage', goodsManage.routes(), goodsManage.allowedMethods());
router.use('/wantsManage', wantsManage.routes(), wantsManage.allowedMethods());
router.use('/remarkManage', remarkManage.routes(), remarkManage.allowedMethods());
router.use('/task', task.routes(), task.allowedMethods());


//用户前台
const userController = require('./index/userController');
const goodsController = require('./index/goodsController');
const indexController = require('./index/indexController');
const wantsController = require('./index/wantsController');
const remarkController = require('./index/remarkController');
router.use('/userController', userController.routes(), userController.allowedMethods());
router.use('/goodsController', goodsController.routes(), goodsController.allowedMethods());
router.use('/indexController', indexController.routes(), indexController.allowedMethods());
router.use('/wantsController', wantsController.routes(), wantsController.allowedMethods());
router.use('/remarkController', remarkController.routes(), remarkController.allowedMethods());


router.use('/error', error.routes(), error.allowedMethods())



module.exports = router


