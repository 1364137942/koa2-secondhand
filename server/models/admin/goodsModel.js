const dbUtils = require('../../utils/db-util')
const table = 't_goods';

const goodsModel = {
  async getGoodsList(FUserName, FGoodName, FType, status, page, eachPageNum){
    let _sql = `SELECT ${table}.*,t_user.FUserName,t_good_type.FShowName as FTypeName  from ${table} 
      join t_user on ${table}.FEmail = t_user.FEmail
      join t_good_type on ${table}.FType = t_good_type.FKey
       where 1=1`;
    _sql += await this.getGoodsCon(FUserName, FGoodName, FType, status);

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

  async getGoodsListCount(FUserName, FGoodName, FType, status){
    let _sql = `SELECT count(FGoodID) as num from ${table} 
      join t_user on ${table}.FEmail = t_user.FEmail
      join t_good_type on ${table}.FType = t_good_type.FKey
       where t_good_type.FStatus = 1`;

    _sql += await this.getGoodsCon(FUserName, FGoodName, FType, status);
    let result = await dbUtils.query( _sql );
    if ( Array.isArray(result) && result.length > 0 ) {
      return result[0].num;
    } else {
      return 0;
    }
  },

  async getGoodsCon(FUserName = '', FGoodName = '', FType = '', status = ''){
    let _sql = '';
    if(FUserName !== ''){
        _sql += ` and (FUserName like "%${FUserName}%" or t_user.FEmail like "%${FUserName}%")`;
    }
    if(FGoodName !== ''){
      _sql += ` and (FGoodName like "%${FGoodName}%" or FGoodID = "%${FGoodName}%")`;
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
  async offGoods(FGoodsID){
    let _sql = `update ${table} set FStatus = 0 where FGoodID in (${FGoodsID})`;
    console.log(_sql);
    return await dbUtils.query( _sql );
  },
  async onGoods(FGoodsID){
    let _sql = `update ${table} set FStatus = 1 where FGoodID in (${FGoodsID})`;
    return await dbUtils.query( _sql );
  },
  async disabledGoods(FGoodsID){
    let _sql = `update ${table} set FStatus = 0,FEnable = 0 where FGoodID in(${FGoodsID})`;
    return await dbUtils.query( _sql );
  },
  async enabledGoods(FGoodsID){
    let _sql = `update ${table} set FEnable = 1 where FGoodID in(${FGoodsID})`;
    return await dbUtils.query( _sql );
  },
};


module.exports = goodsModel;
