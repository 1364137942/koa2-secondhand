const dbUtils = require('../../utils/db-util')
const table = 't_goods';

const goodsModel = {
  async getUserGoods(FUserID, page = "", eachPageNum = ""){
    let _sql = `SELECT ${table}.* from ${table} 
      join t_user on ${table}.FEmail = t_user.FEmail
       where t_user.FUserID = ${FUserID}`;

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

  async getUserGoodsCount(FUserID){
    let _sql = `SELECT count(*) as num from ${table} 
      join t_user on ${table}.FEmail = t_user.FEmail
       where t_user.FUserID = ${FUserID}`;
    let result = await dbUtils.query( _sql );
    if ( Array.isArray(result) && result.length > 0 ) {
      return result[0].num;
    } else {
      return 0;
    }
  },
  async offGoods(FGoodsID){
    let _sql = `update ${table} set FStatus = 0 where FGoodID = ${FGoodsID} limit 1`;
    return await dbUtils.query( _sql );
  },
  async onGoods(FGoodsID){
    let _sql = `update ${table} set FStatus = 1 where FGoodID = ${FGoodsID} limit 1`;
    return await dbUtils.query( _sql );
  },
  async disabledGoods(FGoodsID){
    let _sql = `update ${table} set FStatus = 0,FEnable = 0 where FGoodID = ${FGoodsID} limit 1`;
    return await dbUtils.query( _sql );
  },
  async enabledGoods(FGoodsID){
    let _sql = `update ${table} set FEnable = 1 where FGoodID = ${FGoodsID} limit 1`;
    return await dbUtils.query( _sql );
  },
};


module.exports = goodsModel;
