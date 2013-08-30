/**
* Generic require login routing middleware
*/
exports.requiresLogin = function(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.redirect('/login');
  }
  next();
};

/**
* User authorizations routing middleware
*/
exports.user = {
  hasAuthorization: function(req, res, next) {
    if (req.profile.id != req.user.id) {
      return res.redirect('/users/' + req.profile.id);
    }
    next();
  }
};

/**
* Book authorizations routing middleware
*/
exports.book = {
  hasAuthorization: function(req, res, next) {
    if (req.book.user.id != req.user.id) {
      return res.redirect('/books/' + req.book.id);
    }
    next();
  }
};

/**
* Rent authorizations routing middleware
*/
exports.rent = {
  hasAuthorization: function(req, res, next) {
    if (req.rent.user.id != req.user.id) {
      return res.redirect('/rents/' + req.rent.id);
    }
    next();
  }
};