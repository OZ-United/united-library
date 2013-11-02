
/*
 * RENTS
 */

var RentModel = require('../models/Rent.js');
var error = require('../lib/error');
var _ = require('underscore');

exports.rent = function(req, res, next){
  RentModel.findById(req.params.rentId, function(err, rent){
    if (err) { return next(err); }
    if (! rent) { return next(new error.NotFound('Rent does not exist.')); }

    req.rent = rent;
    next();
  });
};

exports.query = function(req, res, next){
  console.log(req.query);
  var page = req.query.page || 1;
  var limit = req.query.limit || 100;

  var query = _.omit(req.query, 'page', 'limit', 'status');
  query.status = req.query.status || { $not: /reserved/ };

  RentModel
    .find(query)
    .populate('user book', 'bookId author title cover userId name email gravatar')
    .skip((page - 1) * limit)
    .limit(limit)
    .sort('-reservation.reservationDate -rent.startDate')
    .exec(function(err, rents){
      if (err) { return next(err); }
      res.json(rents);
    });
};

exports.get = function(req, res, next){
  var rent = req.rent;
  rent.populate('user book', function(err, rent){
    if (err) { return next(err); }
    res.json(rent);
  });
};

exports.create = function(req, res, next){
  var rent = req.rent || new RentModel({});
  
  rent.rentBook(req.body, function(err, rent){
    if (err) { return next(err); }
    console.log(rent);
    res.json(rent);
    req.rent = rent;
    return next();
  });
};

exports.remove = function(req, res, next){
  var rent = req.rent;

  rent.remove(function(err, rent){
    if (err) return next(err);
    res.send(204);
  });
};

exports.update = function(req, res, next){
  var rent = req.rent;
  res.send(404);
};

exports.reserveBook = function(req, res, next){
  var rent = new RentModel({});
  
  rent.reserveBook(req.body, function(err, rent){
    if (err) { return next(err); }
    console.log(rent);
    res.json(rent);
    req.rent = rent;
    return next();
  });
};

exports.returnBook = function(req, res, next){
  var rent = req.rent;
  rent.returnBook(function(err, rent){
    if (err) { return next(err); }
    res.json(rent);
    return next();
  });
};

