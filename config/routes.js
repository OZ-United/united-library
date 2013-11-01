module.exports = function(app, auth) {

  // cors
  app.all('/*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
  });

  var emails = require('../routes/emails');

  // index
  var routes = require('../routes');
  app.get('/', routes.index);
  app.get('/reminders', routes.sendReminders);
  app.get('/tickets', routes.sendTickets);
  app.get('/import/:filename', routes.importBooks);
  app.post('/upload', routes.upload);

  // users
  var users = require('../routes/users');
  app.get('/users', users.hasAuthorization, users.isAdmin, users.query);
  app.post('/users', users.create, emails.registerUser);
  app.get('/users/me', users.hasAuthorization, users.me);
  app.get('/users/:userId', users.hasAuthorization, users.isAdmin, users.get);
  app.put('/users/:userId', users.hasAuthorization, users.isAdmin, users.update);
  app.put('/users/:userId', users.hasAuthorization, users.isAdmin, users.setPassword);
  app.post('/auth', users.auth);

  app.del('/users/:userId', users.hasAuthorization, users.isAdmin, users.remove);

  app.param('userId', users.user);

  // books
  var books = require('../routes/books');
  app.get('/books', books.query);
  app.get('/books/topRented', books.getTopRented);
  app.get('/books/:bookId', books.get);
  app.post('/books', users.hasAuthorization, users.isAdmin, books.create);
  app.put('/books/:bookId', users.hasAuthorization, users.isAdmin, books.update);
  app.del('/books/:bookId', users.hasAuthorization, users.isAdmin, books.remove);

  app.param('bookId', books.book);

  // rents
  var rents = require('../routes/rents');
  app.get('/rents', users.hasAuthorization, users.isMe, rents.query);
  app.get('/rents/:rentId', users.hasAuthorization, users.isMe, rents.get);
  app.post('/rents', users.hasAuthorization, users.isAdmin, rents.create, emails.rentBook);
  app.post('/rents/reserveBook', users.hasAuthorization,rents.reserveBook, emails.reserveBook);
  app.post('/rents/:rentId', users.hasAuthorization, users.isAdmin, rents.create, emails.rentBook);
  app.put('/rents/:rentId', users.hasAuthorization, users.isAdmin, rents.update);
  app.del('/rents/:rentId', users.hasAuthorization, users.isAdmin, rents.remove);
  app.post('/rents/:rentId/returnBook', users.hasAuthorization, users.isAdmin, rents.returnBook, emails.returnBook);
  
  app.param('rentId', rents.rent);

  //search
  app.get('/search', books.search);
};