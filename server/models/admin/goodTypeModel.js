const dbUtils = require('../../utils/db-util');


const table = 't_good_type';

const goodTypeModel = {
 async getAllType(){
   let _sql = `select * from ${table} where FStatus = 1`;
   return await dbUtils.query( _sql );
 }
};


module.exports = goodTypeModel
