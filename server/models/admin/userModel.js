const dbUtils = require('../../utils/db-util')
const table = 't_user';

const userModel = {
  async getAllUser(type, page = "", eachPageNum = ""){
    let _sql = `SELECT FEmail,FAcademy,FAvatar,FIsBlack,FPhone,FQQ,FStudentID,FStudentName,FUserID,FUserName from ${table}`;
    if(type === 'white'){
      _sql += ` where FIsBlack = "0"`;
    }else{
      _sql += ` where FIsBlack = "1"`;
    }
    if(page !== "" && eachPageNum !== ""){
      _sql += `order by FUserID desc limit ${page}, ${eachPageNum} `;
    }
    let result = await dbUtils.query( _sql );
    if ( Array.isArray(result) && result.length > 0 ) {
      return result;
    } else {
      return [];
    }
  },
  async getAllUserCount(type){
    let _sql = `SELECT count(FUserID) as count from ${table}`;
    if(type === 'white'){
      _sql += ` where FIsBlack = "0"`;
    }else{
      _sql += ` where FIsBlack = "1"`;
    }
    let result = await dbUtils.query( _sql );
    if ( Array.isArray(result) && result.length > 0 ) {
      return result[0].count;
    } else {
      return 0;
    }
  },

  async blackUser(userID){
    let _sql = `UPDATE ${table} set FIsBlack = 1 where FUserID in (${userID})`;
    return await dbUtils.query(_sql);
  },
  async whiteUser(userID){
    let _sql = `UPDATE ${table} set FIsBlack = 0 where FUserID in (${userID})`;
    return await dbUtils.query(_sql);
  },

  
};


module.exports = userModel;
