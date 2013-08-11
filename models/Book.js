var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var error = require('../lib/error');

var BookModelSchema = new Schema({
  isbn: {
    isbn10: {type: String},
    isbn13: {type: String}
  },
  title: {type: String, required: true},
  author: {type: String},
  publisher: {type: String},
  cover: {type: String},
  year: {type: Number},
  quantity: {type: Number},
  copies: [BookCopyModelSchema],
},{
  toObject:  { virtuals: true },
  toJSON:    { virtuals: true }
});

BookModelSchema.virtual("bookId").get(function(){
  return this.id;
});


module.exports = mongoose.model('BookModel', BookModelSchema);