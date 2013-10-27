
/*
 * GET home page.
 */

var ejs = require('ejs');
var path = require('path');
var Q = require('q');
var error = require('../lib/error');
var Email = require('../lib/email');
var csv = require('../lib/import');
var RentModel = require('../models/Rent.js');
var BookModel = require('../models/Book.js');
var _ = require('underscore');


exports.index = function(req, res){
  console.log(req.query);
  var page = req.query.page || 1;
  var limit = req.query.limit || 1000;

  res.redirect('/dashboard');
};

exports.upload = function(req, res){
  var image = req.files.image;
  if (!image) {
    return next(new error.NotFound('No image uploaded!'));
  }
  res.json({'image': path.join('/', 'tmp', image.path.split('/').pop())});
};

exports.clearTmp = function(req, res){
  var dir = path.join(process.cwd(), 'public', 'tmp');
  var fs = require('fs');
  fs.readdir(dir, function(err, files){
    if (err) {
      console.log(err);
      return false;
    }

    var imgs = [];
    files.forEach(function(file){
      if (file !== '.gitignore') {
        imgs.push(file);
      }
    });

    var MAXAGE = 1000 * 60 * 60; // 1 hr
    var time = new Date().getTime();
    var remove = [];
    imgs.forEach(function(img){
      var age = time - fs.statSync(path.join(dir, img)).mtime.getTime();
      if (age > MAXAGE) {
        remove.push(img);
      }
    });

    remove.forEach(function(img){
      console.log('Removing tmp img', path.join(dir, img));
      fs.unlink(path.join(dir, img), function (err) {
        if (err) {
          console.log(err);
          return false;
        }
      });
    });
  });
};

exports.sendReminders = function(req, res){

  var tomorrow = new Date();
  var datomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  datomorrow.setDate(tomorrow.getDate() + 1);

  RentModel
    .find({
      'status': 'rented',
      'rent.endDate': {
        $gte: tomorrow,
        $lte: datomorrow
      }
    })
    .populate('user book')
    .exec(function(err, rents){
      if (err) { return next(err); }
      res && res.json(rents);
      Email.sendReminders(rents);
    });
};

exports.sendTickets = function(req, res){

  var now = new Date();

  RentModel
    .find({
      'status': 'rented',
      'rent.endDate': {
        $lte: now
      }
    })
    .populate('user book')
    .exec(function(err, rents){
      if (err) { return next(err); }
      res && res.json(rents);
      Email.sendTickets(rents);
    });
};

exports.importBooks = function(req, res){
  var filename = req.params.filename;

  Q.fcall(function(){
    var deferred = Q.defer();
    csv.parse(filename, function(error, data, count){
      if (error) {
        deferred.reject(new Error(error));
      } else {
        deferred.resolve(data);
      }
    });
    return deferred.promise;
  })
  .then(function(data){

    var deferred = Q.defer();
    var count = 0;

    data.forEach(function(bookObj){
      var book = new BookModel(bookObj);
      book.createCopies();
      console.log(book);

      book.save(function(err, book){
        count++;
        
        if (err) {
          console.log(err);
        }

        console.log(count);
        
        if (count === data.length) {
          deferred.resolve(data);
        }
      });
    });

    return deferred.promise;
  })
  .then(function(data){
    console.log('saved');
    res.json(data);
  });
};

