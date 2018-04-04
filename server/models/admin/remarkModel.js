const dbUtils = require('../../utils/db-util')
const table = 't_remark';

const remarkModel = {
  async getRemarkList(FUserName, type, status, page, eachPageNum){
    let fields = `${table}.*,DATE_FORMAT(${table}.FCreateTime, '%Y-%m-%d %H:%i:%s') as FCreateTime, t_user.FUserName`;
    let join = `join t_user on t_user.FEmail = ${table}.FEmail `;
    if(type === 'G'){
      fields += `,t_goods.FGoodName,t_goods.FGoodID`;
      join += `join t_goods on concat('G',t_goods.FGoodID) = ${table}.FItemID`
    }else{
      fields += `,t_wants.FGoodName,t_wants.FWantID`;
      join += `join t_wants on concat('W',t_wants.FWantID) = ${table}.FItemID`
    }
    let _sql = `select ${fields} from ${table} ${join} where 1=1`;

    _sql += await this.getRemarkCon(FUserName, status);

    if(page !== "" && eachPageNum !== ""){
      _sql += ` order by ${table}.FRemarkID desc limit ${page}, ${eachPageNum} `;
    }
    let result = await dbUtils.query( _sql );
    if ( Array.isArray(result) && result.length > 0 ) {
      return result;
    } else {
      return [];
    }
  },

  async getRemarkListCount(FUserName, type, status){

    let fields = `count(FRemarkID) as num`;
    let join = `join t_user on t_user.FEmail = ${table}.FEmail `;
    if(type === 'G'){
      join += `join t_goods on concat('G',t_goods.FGoodID) = ${table}.FItemID`
    }else{
      join += `join t_wants on concat('W',t_wants.FWantID) = ${table}.FItemID`
    }
    let _sql = `select ${fields} from ${table} ${join} where 1=1`;

    _sql += await this.getRemarkCon(FUserName, status);
    let result = await dbUtils.query( _sql );
    if ( Array.isArray(result) && result.length > 0 ) {
      return result[0].num;
    } else {
      return 0;
    }
  },

  async getRemarkCon(FUserName = '', status = ''){
    let _sql = '';
    if(FUserName !== ''){
        _sql += ` and (FUserName like "%${FUserName}%" or ${table}.FEmail like "%${FUserName}%")`;
    }
    if(status === '-1'){
      _sql += ` and ${table}.FStatus = "0"`;
    }else if(status === '1'){
      _sql += ` and ${table}.FStatus = "1"`;
    }
    return _sql;
  },

  async enabledRemark(remarkID){
    let _sql = `update ${table} set FStatus = 1 where FRemarkID in (${remarkID})`;
    return await dbUtils.query( _sql );
  },
  async disabledRemark(remarkID){
    let _sql = `update ${table} set FStatus = 0 where FRemarkID in (${remarkID})`;
    return await dbUtils.query( _sql );
  }
};


module.exports = remarkModel;
