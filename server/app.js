const path = require('path');
const Koa = require('koa');
const convert = require('koa-convert');
const views = require('koa-views');
const koaStatic = require('koa-static');
const bodyParser = require('koa-bodyparser');
const koaLogger = require('koa-logger');
const session = require('koa-session-minimal');
const MysqlStore = require('koa-mysql-session');
const logUtil = require('./utils/logUtil');
const fs = require('fs');

const serve = require('koa-static');


const config = require('./../config');
const routers = require('./routers/index');
const mount = require('koa-mount')
const nunjucks = require('nunjucks')

const app = new Koa();
app.use(mount('/static', serve(__dirname + '/output')));
app.use(views(__dirname + '/views', {
  map: {
    njk: 'nunjucks'
  }
}));

app.use(async (ctx, next) => {
  let manifest = await fs.readFileSync(path.resolve(__dirname, '../static/output/dist/manifest.json'))
  ctx.state = {
    static: JSON.parse(manifest.toString())
  }
  await next()
});
// logger
app.use(async (ctx, next) => {
  //响应开始时间
  const start = new Date();
  //响应间隔时间
  let ms;
  try {
    //开始进入到下一个中间件
    await next();

    ms = new Date() - start;
    //记录响应日志
    logUtil.logResponse(ctx, ms);

  } catch (error) {

    ms = new Date() - start;
    //记录异常日志
    logUtil.logError(ctx, error, ms);
    let result = {};
    result.code = -1;
    result.msg = '系统错误';
    ctx.body = result;
  }
});
// session存储配置
const sessionMysqlConfig= {
  user: config.database.USERNAME,
  password: config.database.PASSWORD,
  database: config.database.DATABASE,
  host: config.database.HOST,
}

// 配置session中间件
app.use(session({
  key: 'USER_SID',
  store: new MysqlStore(sessionMysqlConfig)
}))

// 配置控制台日志中间件
app.use(koaLogger())

// 配置ctx.body解析中间件
app.use(bodyParser())

// 配置静态资源加载中间件
app.use(koaStatic(
  path.join(__dirname , './../static')
))

// 配置服务端模板渲染引擎中间件
app.use(views(path.join(__dirname, './views'), {
  extension: 'ejs'
}))

// 初始化路由中间件
app.use(routers.routes()).use(routers.allowedMethods())

//处理404错误
app.use(async (ctx, next) => {
  await next();
  if(parseInt(ctx.response.status) === 404){
    if(ctx.request.method === 'GET'){
      ctx.redirect('/error');
    }else{
      ctx.body = {'code': -1, msg: '请求路径不存在'};
    }
  }
});
// 监听启动端口
app.listen( config.port )
console.log(`the server is start at port ${config.port}`)
