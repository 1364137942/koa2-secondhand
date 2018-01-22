/**
 * Created by alizjli on 2018/1/22.
 */
const util = require('util')

let AbstractError = function (msg, constr) {
  Error.captureStackTrace(this, constr || this);
  this.message = msg || 'Error'
};
util.inherits(AbstractError, Error);
AbstractError.prototype.name = 'Abstract Error';

let CustomError = function (msg) {
  CustomError.super_.call(this, msg, this.constructor);
};
util.inherits(CustomError, AbstractError);
CustomError.prototype.message = 'Custom Error';
CustomError.prototype.name = 'CustomError';

module.exports = {
  CustomError
};