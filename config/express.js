var path = require('path');
var express = require('express');

module.exports = function(app, config) {

  // all environments
  app.set('views', path.join(config.root, 'views'));
  app.set('view engine', 'ejs');
  app.engine('html', require('ejs').renderFile);
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser({
    uploadDir: path.join(config.root, 'public', 'tmp'),
    keepExtensions: true,
    limit: '5mb'
  }));
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(config.root, 'public')));
  app.use(require('../middleware/error')());

  // development only
  if ('development' == app.get('env')) {
    app.use(express.errorHandler());
  }
};