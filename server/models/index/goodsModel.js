const dbUtils = require('../../utils/db-util');


const table = 't_goods';

const goodsModel = {
  async getUserGoodsList(FEmail, FStatus, page = '', eachPageNum = ''){
    let _limit = '',
        _fields = '*';
        _defaultRetrun = [];
    if(page !== "" && eachPageNum !== ''){
      _limit = ` order by ${table}.FGoodID desc limit ${page}, ${eachPageNum} `;
      _fields = 'count(FGoodID) as count';
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
  async deleteGood(FGoodID, FEmail){
    let _sql = `update ${table} set FEnable = 0 where FGoodID = '${FGoodID}' and FEmail = '${FEmail}' limit 1`;
    return dbUtils.query(_sql);
  },
  async getGoodInfo(FGoodID, FEmail){
    let _sql = `select * from ${table} where FGoodID = '${FGoodID}' and FEmail = '${FEmail}' limit 1`;
    
  }

};


module.exports = goodsModel;
