const dbUtils = require('../../utils/db-util');


const table = 't_wants';

const wantsModel = {
  async getWantsList(FGoodName, FType, page, eachPageNum){
    let _sql = `SELECT ${table}.*,t_user.FUserName,t_good_type.FShowName as FTypeName, DATEDIFF(FOutDate,now()) as FOutDay  from ${table} 
      join t_user on ${table}.FEmail = t_user.FEmail
      join t_good_type on ${table}.FType = t_good_type.FKey
       where 1 = 1`;
    _sql += await this.getWantsCon(FGoodName, FType);
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

  async getWantsListCount(FGoodName, FType){
    let _sql = `SELECT count(FWantID) as num from ${table} 
      join t_user on ${table}.FEmail = t_user.FEmail
      join t_good_type on ${table}.FType = t_good_type.FKey
       where t_good_type.FStatus = 1`;

    _sql += await this.getWantsCon(FGoodName, FType);
    let result = await dbUtils.query( _sql );
    if ( Array.isArray(result) && result.length > 0 ) {
      return result[0].num;
    } else {
      return 0;
    }
  },

  async getWantsCon(FGoodName = '', FType = ''){
    let _sql = ` and ${table}.FStatus = 1 and FEnable = 1`;
    if(FGoodName !== ''){
      _sql += ` and FGoodName like "%${FGoodName}%"`;
    }
    if(FType !== '' && FType !== 'all'){
      _sql += ` and ${table}.FType = "${FType}"`;
    }
    return _sql;
  },

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
  },
  async getWantDetail(FWantID){
    let _sql = `select FWantID,FGoodName,FType,FDesc,datediff(FOutDate, FSaleDate)  as FSaleDay ,DATE_FORMAT(FOutDate,'%Y-%m-%d') as FOutDate,FOld from ${table} where FWantID = ${FWantID} and FEnable = 1 and FStatus = 1 limit 1`;
    return await dbUtils.query(_sql);
  },
  async addWant(email, goodName, goodType, saleDate, desc, now, old){
    let FOutDate = await dbUtils.query(`select date_add(curdate(),interval ${saleDate} day) as date`);
    let re = await dbUtils.insertData(table, {
      FEmail: email,
      FGoodName: goodName,
      FType: goodType,
      FDesc: desc,
      FSaleDate: now,
      FOutDate: FOutDate[0].date,
      FCreateTime: now,
      FOld: old,
    });
    return re;
  },
  async modifyWant(wantID, email, goodName, goodType, saleDate, desc, now, old){
    let FOutDate = await dbUtils.query(`select DATE_FORMAT(date_add(curdate(),interval ${saleDate} day), '%Y-%m-%d') as date`);
    let _sql = `update ${table} set FEmail='${email}', FGoodName='${goodName}',FType='${goodType}',FDesc='${desc}',FSaleDate='${now}',FOutDate='${FOutDate[0].date}',FOld='${old}' where FWantID = '${wantID}' and FEnable = 1 and FStatus = 1 limit 1`;
    return await dbUtils.query(_sql);
  },

};


module.exports = wantsModel;
