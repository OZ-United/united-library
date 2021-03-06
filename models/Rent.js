var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var error = require('../lib/error');
var _ = require('underscore');

var RentModelSchema = new Schema({
  status: { type: String, default: 'reserved' },
  book: { type: Schema.Types.ObjectId, ref: 'BookModel', required: true, index: true },
  bookCopy: { type: Schema.Types.ObjectId, ref: 'BookCopyModel', index: true },
  user: { type: Schema.Types.ObjectId, ref: 'UserModel', required: true, index: true },

  reservation: {
    reservationDate: { type: Date, default: Date.now, index: true },
  },
  rent: {
    startDate: { type: Date, index: true },
    endDate: { type: Date, index: true },
    returnDate: { type: Date, index: true }
  }
},{
  toObject:  { virtuals: true },
  toJSON:    { virtuals: true }
});

RentModelSchema.virtual('rentId').get(function(){
  return this.id;
});

RentModelSchema.methods.reserveBook = function(payload, cb){
  this.status = 'reserved';
  this.book = payload.bookId;
  this.user = payload.userId;

  console.log(this);
  return this.save(cb);
};

RentModelSchema.methods.rentBook = function(payload, cb){
  this.status = 'rented';
  this.book = payload.bookId;
  this.user = payload.userId;
  this.bookCopy = payload.bookCopyId;
  this.rent.startDate = Date.now();
  this.rent.endDate = payload.endDate ? new Date(payload.endDate) : Date.now() + 1000 * 60 * 60 * 24 * 30;

  console.log(this);
  return this.save(cb);
};

RentModelSchema.methods.returnBook = function(cb){
  this.status = 'available';
  this.rent.returnDate = Date.now();

  return this.save(cb);
};


RentModelSchema.pre('save', function (next) {

  var bookId = this.book;
  var bookCopyId = this.bookCopy;
  var rentId = this.rentId;
  var status = this.status;

  if (bookCopyId) {
    mongoose.model('BookModel').findById(bookId, function(err, book){
      if (err) { return next(err); }

      bookCopy = book.copies.id(bookCopyId);
      if (bookCopy.status !== 'available' && status == 'rented') {
        return next(new error.HttpResponseError('Book is not available.'));
      }
      bookCopy.status = status;
      bookCopy.rents.addToSet(rentId);

      book.save(function(err, book){
        if (err) { return next(err); }
        next();
      });
    });
  }
  else {
    next();
  }
  
});

module.exports = mongoose.model('RentModel', RentModelSchema);