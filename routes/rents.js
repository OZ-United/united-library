
/*
 * RENTS
 */

var RentModel = require('../models/Rent.js');
var error = require('../lib/error');

exports.query = function(req, res, next){
  RentModel
    .find({})
    .populate('user book')
    .exec(function(err, rents){
    if (err) { return next(err); }
    res.json(rents);
  });
};

exports.get = function(req, res, next){
  RentModel.findById(req.params.rentId, function(err, rent){
    if (err) { return next(err); }
    res.json(rent);
  });
};

exports.create = function(req, res, next){
  var rent = new RentModel({});
  console.log(rent);
  rent.rentBook(req.body.bookCopyId, req.body.bookId, req.body.userId, function(err, rent){
    if (err) { return next(err); }
    console.log(rent);
    res.json(rent);
  });
};

exports.update = function(req, res, next){
  res.send(200);
};

exports.reserve = function(req, res, next){
  res.send(200);
};

