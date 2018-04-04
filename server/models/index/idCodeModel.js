const dbUtils = require('../../utils/db-util');


const table = 't_idcode';

const idCodeModel = {
  /**
   *
   * @param FEmail
   * @param FIdCode
   * @param FExpireTime
   * @returns {Promise.<*>}
   */
  async insertOrUpdateIdCode(FEmail, FIdCode, FExpireTime ) {
    let _sql = `insert into ${table} set FEmail = '${FEmail}', FIdCode = '${FIdCode}', FExpireTime = '${FExpireTime}'
                on duplicate key update FIdCode = '${FIdCode}', FExpireTime = '${FExpireTime}'`;
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

  async setIdCodeOutDate(FEmail, FExpireDate){
    let _sql = `update ${table} set FExpireTime = '${FExpireDate}' where FEmail = '${FEmail}' limit 1`;
    return await dbUtils.query(_sql);
  }
};


module.exports = idCodeModel;
