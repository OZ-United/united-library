'use strict';

angular.module('adminApp')
.factory('Books', function ($resource) {
  return $resource('http://united-library.dev/books/:bookId', { bookId: '@bookId' }, {
    'create' : { method: 'POST', params: { } },
    'query'   : { method: 'GET', params: { }, isArray: true },
    'update'  : { method: 'PUT', params: { } },
    'remove'  : { method: 'DELETE', params: { } },
    'delete'  : { method: 'DELETE', params: { } }
  });
});