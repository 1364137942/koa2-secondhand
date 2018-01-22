const crypto=require('crypto');
const md5=crypto.createHash("md5");

let md = function(str){
    md5.update(str);
    str = md5.digest('hex');
    return str.toUpperCase();
  };

