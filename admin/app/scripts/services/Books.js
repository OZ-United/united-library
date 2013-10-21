'use strict';

angular.module('adminApp')
.factory('Books', function ($resource, Auth) {
  return $resource((window.host || '') + '/books/:bookId:action', { }, {
    'create' : { method: 'POST', params: { }, headers: Auth.getCradentials() },
    'query'   : { method: 'GET', params: { }, headers: Auth.getCradentials(), isArray: true },
    'topRented': { method: 'GET', params: { 'action': 'topRented' }, headers: Auth.getCradentials(), isArray: true },
    'get'   : { method: 'GET', params: { bookId: '@bookId' }, headers: Auth.getCradentials() },
    'update'  : { method: 'PUT', params: { bookId: '@bookId' }, headers: Auth.getCradentials() },
    'remove'  : { method: 'DELETE', params: { bookId: '@bookId' }, headers: Auth.getCradentials() },
    'delete'  : { method: 'DELETE', params: { bookId: '@bookId' }, headers: Auth.getCradentials() },
    'rent'    : { method: 'POST', params: { bookId: '@bookId', 'action': 'rent'}, headers: Auth.getCradentials() },
  });
});
