var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var error = require('../lib/error');

var RentModelSchema = new Schema({
  status: { type: String, default: 'reservation' },
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

RentModelSchema.virtual("rentId").get(function(){
  return this.id;
});


module.exports = mongoose.model('RentModel', RentModelSchema);