const dbUtils = require('../../utils/db-util');


const table = 't_goods';

const goodsModel = {
  async getGoodsList(FGoodName, FType, page, eachPageNum){
    let _sql = `SELECT ${table}.*,t_user.FUserName,t_good_type.FShowName as FTypeName, DATEDIFF(FOutDate,now()) as FOutDay  from ${table} 
      join t_user on ${table}.FEmail = t_user.FEmail
      join t_good_type on ${table}.FType = t_good_type.FKey
       where 1 = 1`;
    _sql += await this.getGoodsCon(FGoodName, FType);

    if(page !== "" && eachPageNum !== ""){
      _sql += ` order by ${table}.FGoodID desc limit ${page}, ${eachPageNum} `;
    }
    let result = await dbUtils.query( _sql );
    if ( Array.isArray(result) && result.length > 0 ) {
      return result;
    } else {
      return [];
    }
  },

  async getGoodsListCount(FGoodName, FType){
    let _sql = `SELECT count(FGoodID) as num from ${table} 
      join t_user on ${table}.FEmail = t_user.FEmail
      join t_good_type on ${table}.FType = t_good_type.FKey
       where t_good_type.FStatus = 1`;

    _sql += await this.getGoodsCon(FGoodName, FType);
    let result = await dbUtils.query( _sql );
    if ( Array.isArray(result) && result.length > 0 ) {
      return result[0].num;
    } else {
      return 0;
    }
  },

  async getGoodsCon(FGoodName = '', FType = ''){
    let _sql = ` and ${table}.FStatus = 1 and FEnable = 1`;
    if(FGoodName !== ''){
      _sql += ` and FGoodName like "%${FGoodName}%"`;
    }
    if(FType !== '' && FType !== 'all'){
      _sql += ` and ${table}.FType = "${FType}"`;
    }
    return _sql;
  },

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
  async getHotGoods(){
    let _sql = `select * from ${table} where FEnable = 1 and FStatus = 1 order by FClick,FUpdateTime desc limit 3`;
    return dbUtils.query(_sql);
  },
  async addGood(email, goodName, goodType, saleDate, price, imageUrl, desc, now, old){
    let FOutDate = await dbUtils.query(`select date_add(curdate(),interval ${saleDate} day) as date`);
    let re = await dbUtils.insertData(table, {
      FEmail: email,
      FGoodName: goodName,
      FGoodImg: imageUrl,
      FPrice: price,
      FType: goodType,
      FDesc: desc,
      FSaleDate: now,
      FOutDate: FOutDate[0].date,
      FCreateTime: now,
      FOld: old,
    });
    return re;
  },
  async modifyGood(goodID, email, goodName, goodType, saleDate, price, imageUrl, desc, now, old){
    let FOutDate = await dbUtils.query(`select DATE_FORMAT(date_add(curdate(),interval ${saleDate} day), '%Y-%m-%d') as date`);
    let _sql = `update ${table} set FEmail='${email}', FGoodName='${goodName}', FGoodImg='${imageUrl}',FType='${goodType}', FPrice='${price}',FDesc='${desc}',FSaleDate='${now}',FOutDate='${FOutDate[0].date}',FOld='${old}' where FGoodID = '${goodID}' limit 1`;
    return await dbUtils.query(_sql);
  },
  async test(){
    let FOutDate = await dbUtils.query(`select date_add(curdate(),interval 2 day) as date`);
  },
  async getGoodDetail(FGoodID){
    let _sql = `select FGoodID,FGoodName,FGoodImg,FPrice,FType,FDesc,datediff(FOutDate, FSaleDate)  as FSaleDay ,DATE_FORMAT(FOutDate,'%Y-%m-%d') as FOutDate,FClick,FOld from ${table} where FGoodID = ${FGoodID} and FEnable = 1 and FStatus = 1 limit 1`;
    return await dbUtils.query(_sql);
  }

};


module.exports = goodsModel;
