const dbUtils = require('../../utils/db-util');


const table = 't_wants';

const wantsModel = {
  async getUserWantsList(FEmail, FStatus, page = '', eachPageNum = ''){
    let _limit = '',
        _fields = '*';
        _defaultRetrun = [];
    if(page !== "" && eachPageNum !== ''){
      _limit = ` order by ${table}.FWantID desc limit ${page}, ${eachPageNum} `;
      _fields = 'count(FWantID) as count';
      _defaultRetrun = 0;
    }
    let _sql = `SELECT ${_fields} from ${table} where FEmail = ${FEmail} and FEnable = '1' and FStatus = '${FStatus}'`;

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
  async deleteWant(FWantID, FEmail){
    let _sql = `update ${table} set FEnable = 0 where FWantID = '${FWantID}' and FEmail = '${FEmail}' and FEnable = '1' limit 1`;
    return dbUtils.query(_sql);
  },
  async getWantInfo(FWantID, FEmail){
    let _sql = `select * from ${table} where FWantID = '${FWantID}' and FEmail = '${FEmail}' and FEnable = '1' limit 1`;
    return dbUtils.query(_sql);
  },
  async updateWantStatus(FWantID, FEmail, FStatus){
    let _sql = `update ${table} set FStatus = '${FStatus}' where FWantID = '${FWantID}' and FEmail = '${FEmail}' limit 1`;
    return dbUtils.query(_sql);
  }

};


module.exports = wantsModel;
