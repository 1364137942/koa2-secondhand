const dbUtils = require('../../utils/db-util');


const table = 't_remark';

const remarkModel = {
  async getRemarkList(page, eachPageNum, isShowContactInfo, itemID){
    let fields = `${table}.FRemarkID,${table}.FPrice,${table}.FRemark,DATE_FORMAT(FCreateTime, '%Y-%m-%d %H:%i:%s') as FCreateTime,t_user.FUserName,t_user.FAvatar`;
    if(isShowContactInfo){
      fields += `,t_user.FQQ,t_user.FPhone,t_user.FEmail, '1' as showContactInfo`;
    }

    let _sql = `select ${fields} from ${table} 
          join t_user on t_user.FEmail = ${table}.FEmail
          where FItemID = '${itemID}' and FStatus = 1`;
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

  async getRemarkListCount(itemID){
    let _sql = `SELECT count(FRemarkID) as num from ${table} 
      join t_user on ${table}.FEmail = t_user.FEmail
      where FItemID = '${itemID}' and FStatus = 1`;

    let result = await dbUtils.query( _sql );
    if ( Array.isArray(result) && result.length > 0 ) {
      return result[0].num;
    } else {
      return 0;
    }
  },

  async addRemark(email, price, itemID, remark, now){
    let re = await dbUtils.insertData(table, {
      FEmail: email,
      FPrice: price,
      FItemID: itemID,
      FRemark: remark,
      FCreateTime: now
    });
    return re;
  },


};


module.exports = remarkModel;
