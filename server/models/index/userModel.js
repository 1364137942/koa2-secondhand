const dbUtils = require('../../utils/db-util');


const table = 't_user';

const userModel = {
  async checkEmailExist(FEmail){
    let _sql = `select FUserID from ${table} where FEmail = '${FEmail}'`;
    let result = await dbUtils.query( _sql );
    if ( Array.isArray(result) && result.length > 0 ) {
      return true;
    } else {
      return false;
    }
  },
  async addUserInfo(FEmail, FUsername, FPassword, FStudentId, FStudentName, FAcademy){
    let _sql = `insert into ${table} set FEmail = '${FEmail}', FUsername = '${FUsername}', FPassword = '${FPassword}', FStudentId = '${FStudentId}',
                FStudentName = '${FStudentName}', FAcademy = '${FAcademy}'`;
    let result = await dbUtils.query( _sql );
    if ( result.affectedRows > 0 ) {
      return true;
    } else {
      return false;
    }
  },

  async getIdCode(FEmail, FIdCode){
    let _sql = `select FExpireTime from ${table} where FEmail = '${FEmail}' and FIdCode = '${FIdCode}'`;
    return await dbUtils.query(_sql);
  },

  async getUserInfo(FEmail, FPassword = ''){
    let _sql = `select FEmail,FUserName,FStudentID,FStudentName,FAcademy,FPhone,FQQ from ${table} where FEmail = '${FEmail}' and FIsBlack = 0`;
    console.log(_sql);
    if(FPassword != ''){
      _sql += ` and FPassword = '${FPassword}'`
    }
    return await dbUtils.query(_sql);
  },

  async updatePassword(FEmail, FPassword){
    let _sql = `update ${table} set FPassword = '${FPassword}' where FEmail = '${FEmail}' limit 1`;
    return await dbUtils.query(_sql);
  },

  async updateUserInfo(FEmail, FUsername, FPhone, FQQ){
    let _sql = `update ${table} set FUsername = '${FUsername}', FPhone = '${FPhone}', FQQ = '${FQQ}' where FEmail = '${FEmail}' and FIsBlack = 0 limit 1`;
    return await dbUtils.query(_sql);
  },
  async getUserInfoByGoodID(FGoodID){
    let _sql = `select ${table}.FEmail,FPhone,FQQ from ${table} join t_goods on t_goods.FEmail = ${table}.FEmail where FGoodID = '${FGoodID}' and FStatus = 1 and FEnable = 1`;
    return await dbUtils.query(_sql);
  },
  async getUserInfoByWantID(FWantID){
    let _sql = `select ${table}.FEmail,FPhone,FQQ from ${table} join t_wants on t_wants.FEmail = ${table}.FEmail where FWantID = '${FWantID}' and FStatus = 1 and FEnable = 1`;
    return await dbUtils.query(_sql);
  }
};


module.exports = userModel;
