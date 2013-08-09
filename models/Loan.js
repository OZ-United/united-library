var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var error = require('../lib/error');

var LoanModelSchema = new Schema({
  status: { type: String, default: 'reserved' },
  startDate: { type: Date, default: Date.now, index: true },
  endDate: { type: Date, default: Date.now, index: true },
  bookCopy: { type: Schema.Types.ObjectId, ref: 'BookCopyModel', required: true },
  user: { type: Schema.Types.ObjectId, ref: 'UserModel', required: true }
},{
  toObject:  { virtuals: true },
  toJSON:    { virtuals: true }
});

LoanModelSchema.virtual("loanId").get(function(){
  return this.id;
});


module.exports = mongoose.model('LoanModel', MessageModelSchema);