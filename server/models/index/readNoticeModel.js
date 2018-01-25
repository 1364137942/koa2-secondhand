const dbUtils = require('../../utils/db-util');


const table = 't_read_notice';

const noticeModel = {
  async getNoticeList(FEmail, page = '', eachPageNum = ''){
    let _limit = '',
        _fields = '*';
        _defaultRetrun = [];
    if(page !== "" && eachPageNum !== ''){
      _limit = ` order by ${table}.FNoticeID desc limit ${page}, ${eachPageNum} `;
      _fields = 'count(FNoticeID) as count';
      _defaultRetrun = 0;
    }
    let _sql = `SELECT ${_fields} from ${table} where FEmail = '${FEmail}'`;

    if(page !== "" && eachPageNum !== ""){
      _sql += _limit;
    }
    let result = await dbUtils.query( _sql );
    if ( Array.isArray(result) && result.length > 0 ) {
      return result;
    } else {
      return _defaultRetrun;
    }
  },
  async getNewNotice(FEmail){
    let _sql = `select count(*) as num from ${table} where FEmail = '${FEmail}' and FIsRead = '0'`;
    return dbUtils.query(_sql);

  },
  async readNotice(FEmail){
    let _sql = `update ${table} set FIsRead = 1 where FEamil = '${FEmail}'`;
    return dbUtils.query(_sql);
  },

  async deleteGood(FGoodID, FEmail){
    let _sql = `update ${table} set FEnable = 0 where FGoodID = '${FGoodID}' and FEmail = '${FEmail}' and FEnable = '1' limit 1`;
    return dbUtils.query(_sql);
  },
  async getGoodInfo(FGoodID, FEmail){
    let _sql = `select * from ${table} where FGoodID = '${FGoodID}' and FEmail = '${FEmail}' and FEnable = '1' limit 1`;
    return dbUtils.query(_sql);
  },
  async updateGoodStatus(FGoodID, FEmail, FStatus){
    let _sql = `update ${table} set FStatus = '${FStatus}' where FGoodID = '${FGoodID}' and FEmail = '${FEmail}' limit 1`;
    return dbUtils.query(_sql);
  },
  async getHotsGoods(){
    let _sql = `select * from ${table} where FEnable = 1 and FStatus = 1 order by FClick,FUpdateTime desc limit 3`;
    return dbUtils.query(_sql);
  }

};


module.exports = noticeModel;
