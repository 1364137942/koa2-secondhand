const dbUtils = require('../../utils/db-util');
const table = 't_notice';

const noticeModel = {
  async addNotice(FEmail, FTitle, FContent, now){
    await dbUtils.transStart();
    let _sql1 = `insert into ${table} set FEmail = '${FEmail}', FTitle = '${FTitle}', FContent = '${FContent}', FCreateTime = '${now}'`;
    let result1 = await dbUtils.query( _sql1 );
    if(result1.affectedRows == 1 && FEmail != '*'){
      let _sql2 = `insert into t_read_notice set FEmail = '${FEmail}', FNoticeID = '${result1.insertId}', FIsRead = '0', FCreateTime = '${now}'`;
      console.log(_sql2);
      let result2 = await dbUtils.query( _sql2 );
      if(result2.affectedRows == 1){
        await dbUtils.commit();
        return true;
      }
    }else if(result1.affectedRows == 1){
      await dbUtils.commit();
      return true;
    }
    await dbUtils.rollback();
    return false;
  },
}


module.exports = noticeModel;
