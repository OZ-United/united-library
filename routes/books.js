
/*
 * BOOKS
 */

var BookModel = require('../models/Book.js');
var error = require('../lib/error');
var _ = require('underscore');

exports.book = function(req, res, next){
  BookModel.findById(req.params.bookId, function(err, book){
    if (err) { return next(err); }
    if (! book) { return next(new error.NotFound('Book does not exist.')); }

    req.book = book;
    next();
  });
};

exports.query = function(req, res, next){
  BookModel.find(function(err, books){
    if (err) { return next(err); }
    res.json(books);
  });
};

exports.get = function(req, res, next){
  var book = req.book;
  res.json(book);
};

exports.create = function(req, res, next){
  var book = new BookModel(req.body);
  book.createCopies();
  book.setImage(book.cover, function(err, book){
    if (err) { return next(err); }
  
    book.save(function(err, book){
      console.log(err);
      if (err) {
        if (err.code == 11000 || err.code == 11001) {
          return next(new error.DuplicateIndex('Book already exists.'));
        }
        else {
          return next(err);
        }
      }

      console.log(book);
      res.json(book);
    });

  });
};

exports.remove = function(req, res, next){

  var book = req.book;

  book.remove(function(err, book){
    if (err) return next(err);
    res.send(204);
  });
};

exports.update = function(req, res, next){
  
  var book = req.book;
  book = _.extend(book, req.body);
  book.createCopies();

  book.setImage(book.cover, function(err, book){
    if (err) { return next(err); }
  
    book.save(function(err, book){
      if (err) {
        if (err.code == 11000 || err.code == 11001) {
          return next(new error.DuplicateIndex('Book already exists.'));
        }
        else {
          return next(err);
        }
      }
      console.log(book);
      res.json(book);
    });
  });
};
