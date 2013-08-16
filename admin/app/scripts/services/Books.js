'use strict';

angular.module('adminApp')
.factory('Books', function ($resource) {
  return $resource('http://united-library.dev/books/:bookId:action', { bookId: '@bookId' }, {
    'create' : { method: 'POST', params: { } },
    'query'   : { method: 'GET', params: { }, isArray: true },
    'get'   : { method: 'GET', params: { } },
    'update'  : { method: 'PUT', params: { } },
    'remove'  : { method: 'DELETE', params: { } },
    'delete'  : { method: 'DELETE', params: { } },
    'rent'    : { method: 'POST', params: { 'action': 'rent'} },
  });
});
