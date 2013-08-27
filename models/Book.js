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

BookModelSchema.methods.setCover = function(cover, cb){
  var book = this;
  if (cover !== book.cover) {
    book.removeImage(function(err, book){
      if (err) return cb(err);
      book.setImage(cover, function(err, book){
        if (err) return cb(err);
        return cb(undefined, book);
      });
    });
  }
  else {
    return cb(undefined, book);
  }
};

BookModelSchema.methods.setImage = function(cover, cb){
  var book = this;
  if (!cover) {
    return cb(undefined, book);
  }

  var dir = path.join(process.cwd(), 'public');
  var fs = require('fs-extra');

  var tmp_path = cover;
  var res_path = '/img/' + cover.split('/').pop();
  book.cover = res_path;

  fs.copy(path.join(dir, 'tmp', cover.split('/').pop()), path.join(dir, 'img', cover.split('/').pop()), function(err){
    if (err) cb(err);
    return cb(undefined, book);
  });
};

BookModelSchema.methods.removeImage = function(cb){
  var book = this;
  if (!book.cover) {
    return cb(undefined, book);
  }

  var dir = path.join(process.cwd(), 'public');
  var fs = require('fs-extra');

  book.cover = undefined;
  fs.unlink(path.join(dir, 'img', book.cover.split('/').pop()), function (err) {
    if (err) return cb(err);
      return cb(undefined, book);
  });
};

BookModelSchema.pre('save', function(next){
  if (this.isNew) {
    for (var i=0; i<this.quantity; i++) {
      this.copies.push({});
    }
    console.log(this.copies);
  }
  next();
});

BookModelSchema.pre('save', function(next){
  var book = this;
  if (this.isNew) {
    this.setImage(book.cover, function(err, book){
      if (err) { return next(err); }
      next();
    });
  }
  else {
    this.setCover(book.newCover, function(err, book){
      if (err) { return next(err); }
      next();
    });
  }
});

BookModelSchema.pre('remove', function(next){
  this.removeImage(function(err, book){
    next();
  });
});


module.exports = mongoose.model('BookModel', BookModelSchema);