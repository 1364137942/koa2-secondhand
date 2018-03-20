const dbUtils = require('../../utils/db-util');


const table = 't_good_type';

const goodTypeModel = {
  async getGoodType(){
    let _sql = `SELECT ${table}.* from ${table} where FStatus = 1`;
    let result = await dbUtils.query( _sql );
    if ( Array.isArray(result) && result.length > 0 ) {
      return result;
    } else {
      return [];
    }
  },


};


module.exports = goodTypeModel;
