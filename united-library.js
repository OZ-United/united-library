
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');
var ltld = require('local-tld-update');

var app = express();

// all environments
app.set('port', process.env.PORT || 0);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('./middleware/error')());

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

/**
 * MONGODB CONNECTION
 */

mongoose.connect('mongodb://localhost/united-library');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Mongo connection error:'));
db.once('open', function callback () {
  console.log('Mongo connection opened');
});

/**
 * HTTP SERVER AND ROUTES
 */

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

var routes = require('./routes');
var users = require('./routes/users');

app.get('/', routes.index);

app.get('/users', users.query);
app.post('/users', users.create);
app.post('/users/auth', users.auth);
app.put('/users/:userId', users.update);
app.delete('/users/:userId', users.remove);

var server = http.createServer(app);
server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + server.address().port);
  ltld.update('united-library', server.address().port);
});
