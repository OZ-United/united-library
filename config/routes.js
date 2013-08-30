module.exports = function(app, auth) {

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

  var routes = require('../routes');
  app.get('/', routes.index);
  app.post('/upload', routes.upload);

  var users = require('../routes/users');
  app.get('/users', users.query);
  app.post('/users', users.create);
  app.post('/users/auth', users.auth);
  app.get('/users/:userId', users.get);
  app.put('/users/:userId', users.update);
  app.del('/users/:userId', users.remove);

  app.param('userId', users.user);

  var books = require('../routes/books');
  app.get('/books', books.query);
  app.get('/books/:bookId', books.get);
  app.post('/books', books.create);
  app.put('/books/:bookId', books.update);
  app.del('/books/:bookId', books.remove);

  app.param('bookId', books.book);

  var rents = require('../routes/rents');
  app.get('/rents', rents.query);
  app.get('/rents/:rentId', rents.get);
  app.post('/rents', rents.create);
  app.put('/rents/:rentId/', rents.update);
  app.post('/rents/:rentId/returnBook', rents.returnBook);
  // app.post('/books/:bookId/reserve', rents.reserveBook);
};