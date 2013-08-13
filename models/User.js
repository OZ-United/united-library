var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var error = require('../lib/error');
var crypto = require('crypto');

var UserModelSchema = new Schema({
  email: { type: String, index: { unique: true, sparse: true }, lowercase: true, trim: true},
  password: { type: String, required: true },
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

UserModelSchema.virtual('gravatar').get(function(){
  var hash = crypto.createHash('md5').update(this.email || 'ozunited@antala.sk').digest('hex');
  return 'http://gravatar.com/avatar/' + hash + '?s=50&d=mm';
});

UserModelSchema.path('password').set(function(v) {
  var hash = crypto.createHash('md5').update(v).digest('hex');
  return hash;
});

UserModelSchema.methods.auth = function(password){
  var hash = crypto.createHash('md5').update(password).digest('hex');
  console.log(this.password);
  console.log(hash);
  return this.password == hash;
};

UserModelSchema.pre('remove', function(next){
  next();
});

module.exports = mongoose.model('UserModel', UserModelSchema);