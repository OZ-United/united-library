'use strict';

angular.module('dashboardApp')
.factory('Books', function ($resource, Auth) {
  return $resource((window.host || '') + '/books/:bookId:action', { }, {
    'query'   : { method: 'GET', params: { }, headers: Auth.getCradentials(), isArray: true },
    'topRented': { method: 'GET', params: { 'action': 'topRented' }, headers: Auth.getCradentials(), isArray: true },
    'get'   : { method: 'GET', params: { bookId: '@bookId' }, headers: Auth.getCradentials() },
    'rent'    : { method: 'POST', params: { bookId: '@bookId', 'action': 'rent'}, headers: Auth.getCradentials() },
  });
});
