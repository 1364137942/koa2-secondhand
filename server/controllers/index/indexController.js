const commonFunction = require('../../common/commonFunction');
const common = require('../../controllers/index/common');
module.exports = {
  async index(ctx){
    const title = '多赞二手商城';
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