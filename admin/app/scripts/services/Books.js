'use strict';

angular.module('adminApp')
.factory('Books', function ($resource) {
  return $resource((window.host || '') + '/books/:bookId:action', { }, {
    'create' : { method: 'POST', params: { } },
    'query'   : { method: 'GET', params: { }, isArray: true },
    'topRented': { method: 'GET', params: { 'action': 'topRented' }, isArray: true },
    'get'   : { method: 'GET', params: { bookId: '@bookId' } },
    'update'  : { method: 'PUT', params: { bookId: '@bookId' } },
    'remove'  : { method: 'DELETE', params: { bookId: '@bookId' } },
    'delete'  : { method: 'DELETE', params: { bookId: '@bookId' } },
    'rent'    : { method: 'POST', params: { bookId: '@bookId', 'action': 'rent'} },
  });
});
