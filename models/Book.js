var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var BookCopyModel = require('../models/BookCopy.js');
var error = require('../lib/error');
var fs = require('fs-extra');
var path = require('path');

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

BookModelSchema.methods.createCopies = function(){
  for (var i=this.copies.length; i<=this.quantity; i++) {
    this.copies.push({});
  }
};

// BookModelSchema.methods.setCover = function(cover, cb){
//   var book = this;
//   if (cover !== book.cover) {
//     book.removeImage(function(err, book){
//       if (err) return cb(err);
//       book.setImage(cover, function(err, book){
//         if (err) return cb(err);
//         return cb(undefined, book);
//       });
//     });
//   }
//   else {
//     return cb(undefined, book);
//   }
// };

BookModelSchema.methods.isTmp = function(){
  return this.coverr && (this.cover.split('/').indexOf('tmp') > -1);
};

BookModelSchema.methods.setImage = function(cover, cb){
  var book = this;
  if (!cover || !book.isTmp()) {
    return cb(undefined, book);
  }

  var dir = path.join(process.cwd(), 'public');

  var tmp_path = cover;
  var res_path = '/img/' + cover.split('/').pop();
  book.cover = res_path;

  fs.copy(path.join(dir, 'tmp', cover.split('/').pop()), path.join(dir, 'img', cover.split('/').pop()), function(err){
    if (err) return cb(err);
    return cb(undefined, book);
  });
};

BookModelSchema.methods.removeImage = function(cb){
  var book = this;
  if (!book.cover) {
    return cb(undefined, book);
  }

  var dir = path.join(process.cwd(), 'public');

  fs.unlink(path.join(dir, 'img', book.cover.split('/').pop()), function (err) {
    if (err) return cb(err);
      book.cover = undefined;
      return cb(undefined, book);
  });
};


BookModelSchema.pre('remove', function(next){
  this.removeImage(function(err, book){
    next();
  });
});


module.exports = mongoose.model('BookModel', BookModelSchema);