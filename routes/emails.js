var Email = require('../lib/email');

exports.rentBook = function(req, res, next){
  var rent = req.rent;

  rent.populate('user').populate('book', function(err, rent){
    if (err) return;
    Email.rentBook(rent);
  });
};

exports.returnBook = function(req, res, next){
  var rent = req.rent;

  rent.populate('user').populate('book', function(err, rent){
    if (err) return;
    Email.returnBook(rent);
  });
};