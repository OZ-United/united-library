var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var BookCopyModel = require('../models/BookCopy.js');
var error = require('../lib/error');
var fs = require('fs-extra');
var path = require('path');

var BookCopyModelSchema = BookCopyModel.schema;

var BookModelSchema = new Schema({
  isbn: {
    isbn10: {type: String, trim: true, index: { unique: true, sparse: true }},
    isbn13: {type: String, trim: true, index: { unique: true, sparse: true }}
  },
  title: {type: String, required: true, index: true, trim: true},
  author: {type: String, index: true, trim: true},
  publisher: {type: String, trim: true},
  cover: {type: String, trim: true},
  language: {type: String, default: 'sk', trim: true},
  year: {type: Number, trim: true},
  quantity: {type: Number, default: 1, trim: true},
  copies: [BookCopyModelSchema],
},{
  toObject:  { virtuals: true },
  toJSON:    { virtuals: true }
});

BookModelSchema.virtual('bookId').get(function(){
  return this.id;
});

BookModelSchema.methods.createCopies = function(){
  for (var i=this.copies.length; i<this.quantity; i++) {
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
  return this.cover && (this.cover.split('/').indexOf('tmp') > -1);
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

BookModelSchema.statics.getTopRented = function(query, cb){
  var limit = Number(query.limit) || 10;

  mongoose.model('RentModel').aggregate([
    {
      $project: { book: '$book' }
    },
    {
      $group : {
        _id: '$book',
        count : { $sum : 1 }
      }
    },
    {
      $project: {
        _id: 0,
        book: '$_id',
        count: 1
      }
    },
    {
      $sort: { count: -1 }
    },
    {
      $limit : limit
    }
  ],
  function(err, books){
    if (err) { return cb(err); }
    mongoose.model('BookModel').populate(books, { path: 'book' }, function(err, books){
      if (err) { return cb(err); }
      return cb(null, books);
    });
  });
};

BookModelSchema.pre('remove', function(next){
  this.removeImage(function(err, book){
    next();
  });
});


module.exports = mongoose.model('BookModel', BookModelSchema);