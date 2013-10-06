
/*
 * USERS
 */

var UserModel = require('../models/User.js');
var error = require('../lib/error');
var _ = require('underscore');

exports.user = function(req, res, next){
  UserModel.findById(req.params.userId, function(err, user){
    if (err) { return next(err); }
    if (! user) { return next(new error.NotFound('User does not exist.')); }

    req.user = user;
    next();
  });
};

exports.me = function(req, res, next){
  UserModel.findById(req.get('userId'), function(err, user){
    if (err) { return next(err); }
    if (! user) { return next(new error.NotFound('User does not exist.')); }

    res.json(user);
  });
};

exports.query = function(req, res, next){
  console.log(req.query);
  var page = req.query.page || 1;
  var limit = req.query.limit || 100;

  UserModel.find(_.omit(req.query, 'page', 'limit'))
    .skip((page - 1) * limit)
    .limit(limit)
    .sort('name')
    .exec(function(err, users){
      if (err) { return next(err); }
      res.json(users);
    });
};

exports.get = function(req, res, next){
  res.json(req.user);
};

exports.create = function(req, res, next){
  var user = new UserModel(req.body);

  user.save(function(err, user){
    if (err) {
      if (err.code == 11000 || err.code == 11001) {
        return next(new error.DuplicateIndex('User with this login already exists.'));
      }
      else {
        return next(err);
      }
    }
    console.log(user);
    res.json(user);

    req.user = user;
    next();
  });
};

exports.remove = function(req, res, next){
  
  var user = req.user;

  user.remove(function(err, user){
    if (err) return next(err);
    res.send(204);
  });
};

exports.update = function(req, res, next){
  
  var user = req.user;
  user = _.extend(user, req.body);

  user.save(function(err, user){
    if (err) {
      if (err.code == 11000 || err.code == 11001) {
        return next(new error.DuplicateIndex('User with this login already exists.'));
      }
      else {
        return next(err);
      }
    }
    console.log(user);
    res.json(user);
  });
};

exports.setPassword = function(req, res, next){
  var user = req.user;

  user.password = req.body.password;
  user.save(function(err, user){
    if (err) {
      if (err.code == 11000 || err.code == 11001) {
        return next(new error.DuplicateIndex('User with this login already exists.'));
      }
      else {
        return next(err);
      }
    }
    res.send(204);
  });
};

exports.auth = function(req, res, next){

  UserModel.findOne({'email': req.body.email}, function(err, user){
    if (err) { return next(err); }
    if (! user) { return next(new error.Unauthorized('User does not exist.')); }
    if (! user.authenticate(req.body.password)) { return next(new error.Forbidden()); }
    if (! user.admin) { return next(new error.Forbidden()); }

    res.json(_.pick(user, 'userId','email', 'name', 'admin', 'hash', 'gravatar'));
  });
};