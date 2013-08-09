
/*
 * USERS
 */

var UserModel = require('../models/User.js');
var error = require('../lib/error');

exports.query = function(req, res, next){
  UserModel.find(function(err, users){
    if (err) { return next(error); }
    res.json(users);
  });
};

exports.create = function(req, res, next){
  var user = {};
  user.password = req.body.password;
  user.email = req.body.email;
  user.phone = req.body.phone;
  user.name = req.body.name;
  user.admin = req.body.admin;

  new UserModel(user).save(function(err, user){
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

exports.remove = function(req, res, next){
  UserModel.findById(req.params.userId, function(err, user){
    if (err) { return next(error); }
    if (! user) { return next(new error.NotFound('User does not exist.')); }

    user.remove(function(err, user){
      if (err) return next(err);
      res.send(204);
    });
  });
};

exports.update = function(req, res, next){
  UserModel.findById(req.params.userId, function(err, user){
    if (err) { return next(error); }
    if (! user) { return next(new error.NotFound('User does not exist.')); }

    user.password = req.body.password;
    user.name = req.body.name;
    user.phone = req.body.phone;
    user.email = req.body.email;
    user.admin = req.body.admin;

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
  });
};

exports.auth = function(req, res, next){
  UserModel.findOne({'login': req.body.login}, function(err, user){
    if (err) { return next(error); }
    if (! user) { return next(new error.NotFound('User does not exist.')); }

    if (user.auth(req.body.password)){
      res.json(user);
    }
    else {
      return next(new error.NotFound('User does not exist.'));
    }
  });
};