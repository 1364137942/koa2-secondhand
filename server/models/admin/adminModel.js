const dbUtils = require('../../utils/db-util');


const table = 't_admin';

const adminModel = {
  /**
   * 查找一个存在用户的数据
   * @param  {obejct} options 查找条件参数
   * @return {object|null}        查找结果
   */
  async getExistOne(user, password ) {
    let _sql = `
    SELECT * from ${table}
      where FUser="${user}" and FPassword="${password}"
      limit 1`;
    let result = await dbUtils.query( _sql );
    if ( Array.isArray(result) && result.length > 0 ) {
      result = result[0]
    } else {
      result = null
    }
    return result
  },
};


module.exports = adminModel
