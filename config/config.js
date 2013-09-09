var path = require('path');
var rootPath = path.normalize(__dirname + '/..');

module.exports = {
  development: {
    db: 'localhost/united-library-dev',
    port: 3003,
    root: rootPath,
    app: {
        name: 'United Library - Development',
        tld: 'united-library'
    },
    email: {
      address: 'kniznica.ozunited@gmail.com',
      password: process.env.EMAILPASS || 'kniznica'
    }
  },
  test: {
    db: 'localhost/united-library-test',
    port: 3003,
    root: rootPath,
    app: {
        name: 'United Library - Test',
        tld: 'united-library'
    },
    email: {
      address: 'kniznica.ozunited@gmail.com',
      password: process.env.EMAILPASS || 'kniznica'
    }
  },
  production: {
    db: 'localhost/united-library',
    port: 3003,
    root: rootPath,
    app: {
        name: 'United Library - Production',
        tld: 'united-library'
    },
    email: {
      address: 'kniznica.ozunited@gmail.com',
      password: process.env.EMAILPASS || 'kniznica'
    }
  }
};