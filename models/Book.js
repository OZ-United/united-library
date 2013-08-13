var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var BookCopyModel = require('../models/BookCopy.js');
var error = require('../lib/error');

var BookCopyModelSchema = BookCopyModel.schema;

var BookModelSchema = new Schema({
  isbn: {
    isbn10: {type: String, index: { unique: true, sparse: true }},
    isbn13: {type: String, index: { unique: true, sparse: true }}
  },
  title: {type: String, required: true},
  author: {type: String},
  publisher: {type: String},
  cover: {type: String},
  year: {type: Number},
  quantity: {type: Number, default: 1},
  copies: [BookCopyModelSchema],
},{
  toObject:  { virtuals: true },
  toJSON:    { virtuals: true }
});

BookModelSchema.virtual('bookId').get(function(){
  return this.id;
});


BookModelSchema.pre('save', function(next){
  if (this.isNew) {
    for (var i=0; i<this.quantity; i++) {
      this.copies.push({});
    }
    console.log(this.copies);
  }
  next();
});

BookModelSchema.pre('remove', function(next){
  next();
});


module.exports = mongoose.model('BookModel', BookModelSchema);