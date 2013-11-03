var Email = require('../lib/email');

exports.rentBook = function(req, res, next){
  var rent = req.rent;

  rent.populate('user').populate('book', function(err, rent){
    if (err) return;
    Email.rentBook(rent);
  });
};

exports.reserveBook = function(req, res, next){
  var rent = req.rent;

  rent.populate('user').populate('book', function(err, rent){
    if (err) return;
    Email.reserveBook(rent);
  });
};

exports.returnBook = function(req, res, next){
  var rent = req.rent;

  rent.populate('user').populate('book', function(err, rent){
    if (err) return;
    Email.returnBook(rent);
  });
};

exports.registerUser = function(req, res, next){
  var user = req.user;
  Email.registerUser(user);
};