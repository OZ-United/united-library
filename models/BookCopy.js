var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var error = require('../lib/error');

var BookCopyModelSchema = new Schema({
  date: { type: Date, default: Date.now, index: true },
  status: { type: String, default: 'available', required: true, index: true },
},{
  toObject:  { virtuals: true },
  toJSON:    { virtuals: true }
});

BookCopyModelSchema.virtual('bookCopyId').get(function(){
  return this.id;
});

BookCopyModelSchema.pre('save', function (next) {
  if ('invalid' == this.name) return next(new error.HttpResponseError('Invalid Book Copy'));
  next();
});


module.exports = mongoose.model('BookCopyModel', BookCopyModelSchema);