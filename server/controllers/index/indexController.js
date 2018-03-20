const indexService = require('./../../services/indexService');
const commonFunction = require('../../common/commonFunction');
const {CustomError} = require('../../utils/Error');
module.exports = {
  async index(ctx){
    const title = '主页';
    await ctx.render('index/index.ejs', {
      title,
    });
  },
  async user(ctx){
    const title = 'SecondHand';
    let type = ctx.query.type === 'login' ? 'login' : 'register';
    await ctx.render('index/registerAndLogin.ejs', {
      title,
      type
    });
  }
};