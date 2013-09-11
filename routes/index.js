
/*
 * GET home page.
 */

var ejs = require('ejs');
var path = require('path');
var error = require('../lib/error');
var Email = require('../lib/email');
var RentModel = require('../models/Rent.js');


exports.index = function(req, res){
  res.render('index');
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