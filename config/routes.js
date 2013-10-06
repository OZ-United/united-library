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
  app.get('/users', users.query);
  app.post('/users', users.create, emails.registerUser);
  app.get('/users/me', users.me);
  app.get('/users/:userId', users.get);
  app.put('/users/:userId', users.update);
  app.put('/users/:userId', users.setPassword);
  app.post('/auth', users.auth);

  app.del('/users/:userId', users.remove);

  app.param('userId', users.user);

  // books
  var books = require('../routes/books');
  app.get('/books', books.query);
  app.get('/books/:bookId', books.get);
  app.post('/books', books.create);
  app.put('/books/:bookId', books.update);
  app.del('/books/:bookId', books.remove);

  app.param('bookId', books.book);

  // rents
  var rents = require('../routes/rents');
  app.get('/rents', rents.query);
  app.get('/rents/:rentId', rents.get);
  app.post('/rents', rents.create, emails.rentBook);
  app.put('/rents/:rentId/', rents.update);
  app.del('/rents/:rentId', rents.remove);
  app.post('/rents/:rentId/returnBook', rents.returnBook, emails.returnBook);
  
  app.param('rentId', rents.rent);

  //search
  app.get('/search', books.search);
};