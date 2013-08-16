var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var error = require('../lib/error');

var RentModelSchema = new Schema({
  status: { type: String, default: 'reserved' },
  book: { type: Schema.Types.ObjectId, ref: 'BookModel', required: true },
  user: { type: Schema.Types.ObjectId, ref: 'UserModel', required: true },

  reservation: {
    reservationDate: { type: Date, default: Date.now, index: true },
  },
  rent: {
    startDate: { type: Date, index: true },
    endDate: { type: Date, index: true },
    returnDate: { type: Date, index: true },
    bookCopy: { type: Schema.Types.ObjectId, ref: 'BookCopyModel' },
  }
},{
  toObject:  { virtuals: true },
  toJSON:    { virtuals: true }
});

RentModelSchema.virtual('rentId').get(function(){
  return this.id;
});

RentModelSchema.methods.reserveBook = function(bookId, userId){
  this.status = 'reserved';
  this.book = bookId;
  this.user = userId;
};

RentModelSchema.methods.rentBook = function(bookCopyId, bookId, userId, endDate){
  this.status = 'rented';
  this.book = this.book || bookId;
  this.user = this.user || userId;
  this.rent.startDate = Date.now();
  this.rent.endDate = endDate || (Date.now() + 1000 * 60 * 60 * 24 * 30);
  this.rent.bookCopy = bookCopyId;
};

RentModelSchema.methods.returnBook = function(bookCopyId, userId, endDate){
  this.status = 'returned';
  this.rent.returnDate = Date.now();
};

module.exports = mongoose.model('RentModel', RentModelSchema);