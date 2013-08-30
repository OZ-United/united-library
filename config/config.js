var path = require('path');
var rootPath = path.normalize(__dirname + '/..');

module.exports = {
  development: {
    db: 'localhost/united-library-dev',
    port: 3003,
    root: rootPath,
    app: {
        name: 'United Library - Development'
    }
  },
  test: {
    db: 'localhost/united-library-test',
    port: 3003,
    root: rootPath,
    app: {
        name: 'United Library - Test'
    }
  },
  production: {
    db: 'localhost/united-library',
    port: 3003,
    root: rootPath,
    app: {
        name: 'United Library - Production'
    }
  }
};