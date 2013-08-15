
/*
 * RENTS
 */

var RentModel = require('../models/Rent.js');
var error = require('../lib/error');

exports.query = function(req, res, next){
  RentModel.find(function(err, rents){
    if (err) { return next(error); }
    res.json(rents);
  });
};

exports.get = function(req, res, next){
  RentModel.findById(req.params.rentId, function(err, rent){
    if (err) { return next(error); }
    res.json(rent);
  });
};

exports.rent = function(req, res, next){
  res.send(200);
};

exports.returned = function(req, res, next){
  res.send(200);
};

exports.canceled = function(req, res, next){
  res.send(200);
};