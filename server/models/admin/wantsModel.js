const dbUtils = require('../../utils/db-util')
const table = 't_wants';

const wantsModel = {
  async getWantsList(FUserName, FGoodName, FType, status, page, eachPageNum){
    let _sql = `SELECT ${table}.*,t_user.FUserName,t_good_type.FShowName as FTypeName  from ${table} 
      join t_user on ${table}.FEmail = t_user.FEmail
      join t_good_type on ${table}.FType = t_good_type.FKey
       where 1=1`;
    _sql += await this.getWantsCon(FUserName, FGoodName, FType, status);

    if(page !== "" && eachPageNum !== ""){
      _sql += ` order by ${table}.FWantID desc limit ${page}, ${eachPageNum} `;
    }
    let result = await dbUtils.query( _sql );
    if ( Array.isArray(result) && result.length > 0 ) {
      return result;
    } else {
      return [];
    }
  },

  async getWantsListCount(FUserName, FGoodName, FType, status){
    let _sql = `SELECT count(FWantID) as num from ${table} 
      join t_user on ${table}.FEmail = t_user.FEmail
      join t_good_type on ${table}.FType = t_good_type.FKey
       where t_good_type.FStatus = 1`;

    _sql += await this.getWantsCon(FUserName, FGoodName, FType, status);
    let result = await dbUtils.query( _sql );
    if ( Array.isArray(result) && result.length > 0 ) {
      return result[0].num;
    } else {
      return 0;
    }
  },

  async getWantsCon(FUserName = '', FGoodName = '', FType = '', status = ''){
    let _sql = '';
    if(FUserName !== ''){
      _sql += ` and (FUserName like "%${FUserName}%" or t_user.FEmail like "%${FUserName}%")`;
    }
    if(FGoodName !== ''){
      _sql += ` and (FGoodName like "%${FGoodName}%" or FWantID = "%${FGoodName}%")`;
    }
    if(FType !== '' && FType !== 'all'){
      _sql += ` and ${table}.FType = "${FType}"`;
    }
    if(status === '-1'){
      _sql += ` and ${table}.FEnable = "0"`;
    }else if(status === '0' || status === '1'){
      _sql += ` and ${table}.FStatus = "${status}" and ${table}.FEnable = "1"`;
    }
    return _sql;
  },
  async disabledWants(FWantID){
    let _sql = `update ${table} set FStatus = 0,FEnable = 0 where FWantID in (${FWantID})`;
    return await dbUtils.query( _sql );
  },
  async enabledWants(FWantID){
    let _sql = `update ${table} set FEnable = 1 where FWantID in (${FWantID})`;
    return await dbUtils.query( _sql );
  },
  async offWants(FWantID){
    let _sql = `update ${table} set FStatus = 0 where FWantID in (${FWantID})`;
    return await dbUtils.query( _sql );
  },
  async onWants(FWantID){
    let _sql = `update ${table} set FStatus = 1 where FWantID in (${FWantID})`;
    return await dbUtils.query( _sql );
  },
};


module.exports = wantsModel;
