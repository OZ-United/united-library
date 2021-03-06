var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var error = require('../lib/error');

var BookCopyModelSchema = new Schema({
  date: { type: Date, default: Date.now, index: true },
  status: { type: String, default: 'available', required: true, index: true },
  info: { type: String },
  rents: [{ type: Schema.Types.ObjectId, ref: 'RentModel' }]
},{
  toObject:  { virtuals: true },
  toJSON:    { virtuals: true }
});

BookCopyModelSchema.virtual('bookCopyId').get(function(){
  return this.id;
});

BookCopyModelSchema.pre('save', function (next) {
  next();
});


module.exports = mongoose.model('BookCopyModel', BookCopyModelSchema);