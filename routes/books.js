
/*
 * BOOKS
 */

var BookModel = require('../models/Book.js');
var error = require('../lib/error');

exports.query = function(req, res, next){
  BookModel.find(function(err, books){
    if (err) { return next(err); }
    res.json(books);
  });
};

exports.get = function(req, res, next){
  BookModel.findById(req.params.bookId, function(err, book){
    if (err) { return next(err); }
    res.json(book);
  });
};

exports.create = function(req, res, next){
  var book = new BookModel(req.body);
  book.createCopies();

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
};

exports.remove = function(req, res, next){
  BookModel.findById(req.params.bookId, function(err, book){
    if (err) { return next(err); }
    if (! book) { return next(new error.NotFound('Book does not exist.')); }

    book.remove(function(err, book){
      if (err) return next(err);
      res.send(204);
    });
  });
};

exports.update = function(req, res, next){
  BookModel.findById(req.params.bookId, function(err, book){
    if (err) { return next(err); }
    if (! book) { return next(new error.NotFound('Book does not exist.')); }

    book.title = req.body.title;
    book.isbn.isbn10 = req.body.isbn ? req.body.isbn.isbn10 : undefined;
    book.isbn.isbn13 = req.body.isbn ? req.body.isbn.isbn13 : undefined;
    book.author = req.body.author;
    book.publisher = req.body.publisher;
    book._cover = req.body.cover;
    book.year = req.body.year;
    book.year = req.body.year;
    book.quantity = req.body.quantity;

    book.save(req.body, function(err, book){
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
