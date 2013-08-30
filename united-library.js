
/**
 * Module dependencies.
 */

var env = process.env.ENV || 'development';
var config = require('./config/config')[env];
var express = require('express');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');
var ltld = require('local-tld-update');

var app = express();

// express
require('./config/express')(app, config);

// mongodb
mongoose.connect(config.db);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Mongo connection error:'));
db.once('open', function callback () {
  console.log('Mongo connection opened');
});

// routes
require('./config/routes')(app);

// cron jobs
require('./config/cron')(app);

var server = http.createServer(app);
server.listen((config.port || 0), function(){
  console.log('Express server listening on port ' + server.address().port);
  ltld.update(config.app.tld, server.address().port);
});

