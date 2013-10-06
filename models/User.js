var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var error = require('../lib/error');
var crypto = require('crypto');

var UserModelSchema = new Schema({
  email: { type: String, required: true, index: { unique: true, sparse: true }, lowercase: true, trim: true},
  hash: { type: String, required: true },
  salt: String,
  name: { type: String },
  phone: { type: String },
  admin: { type: Boolean, default: false }
},{
  toObject:  { virtuals: true },
  toJSON:    { virtuals: true }
});

UserModelSchema.virtual('userId').get(function(){
  return this.id;
});

UserModelSchema.virtual('password').set(function(password) {
  this._password = password;
  this.salt = this.makeSalt();
  this.hash = this.encryptPassword(password);
}).get(function() {
  return this._password;
});

UserModelSchema.virtual('gravatar').get(function(){
  var hash = crypto.createHash('md5').update(this.email || 'ozunited@antala.sk').digest('hex');
  return 'http://gravatar.com/avatar/' + hash + '?s=50&d=mm';
});


UserModelSchema.methods = {
  /**
   * Authenticate - check if the passwords are the same
   *
   * @param {String} plainText
   * @return {Boolean}
   * @api public
   */
  authenticate: function(plainText) {
    return this.encryptPassword(plainText) === this.hash;
  },

  /**
   * Make salt
   *
   * @return {String}
   * @api public
   */
  makeSalt: function() {
    return Math.round((new Date().valueOf() * Math.random())) + '';
  },

  /**
   * Encrypt password
   *
   * @param {String} password
   * @return {String}
   * @api public
   */
  encryptPassword: function(password) {
    if (!password || !this.salt) return '';
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
  }
};


module.exports = mongoose.model('UserModel', UserModelSchema);