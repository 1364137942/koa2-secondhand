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
const noticeManage = require('./admin/noticeManage');
const task = require('./admin/task');
const test = require('./admin/test');


router.use('/admin', admin.routes(), admin.allowedMethods());
router.use('/userManage', userManage.routes(), userManage.allowedMethods());
router.use('/goodsManage', goodsManage.routes(), goodsManage.allowedMethods());
router.use('/wantsManage', wantsManage.routes(), wantsManage.allowedMethods());
router.use('/noticeManage', noticeManage.routes(), noticeManage.allowedMethods());
router.use('/task', task.routes(), task.allowedMethods());
router.use('/test', test.routes(), test.allowedMethods());

//用户前台
const user = require('./index/user');
const goodsController = require('./index/goodsController');
router.use('/user', user.routes(), user.allowedMethods());
router.use('/goodsController', goodsController.routes(), goodsController.allowedMethods());


router.use('/error', error.routes(), error.allowedMethods())



module.exports = router


