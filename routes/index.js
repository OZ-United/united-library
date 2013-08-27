
/*
 * GET home page.
 */

var ejs = require('ejs');
var path = require('path');
var error = require('../lib/error');

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
      var age = time - fs.statSync(dir + img).mtime.getTime();
      if (age > MAXAGE) {
        remove.push(img);
      }
    });

    remove.forEach(function(img){
      console.log('Removing tmp img', dir + img);
      fs.unlink(dir + csv, function (err) {
        if (err) {
          console.log(err);
          return false;
        }
      });
    });
  });
};