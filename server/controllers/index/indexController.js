const indexService = require('./../../services/indexService');
const commonFunction = require('../../common/commonFunction');
const {CustomError} = require('../../utils/Error');
const common = require('../../controllers/index/common');
module.exports = {
  async index(ctx){
    const title = '主页';
    let session = common.getSession(ctx);
    let username = '';
    if(session !== false){
      username = session.username;
    }
    await ctx.render('index/index.ejs', {
      title,
      username
    });
  },
};