'use strict';

angular.module('adminApp')
.factory('Rents', function ($resource, Auth) {
  return $resource((window.host || '') + '/rents/:rentId/:action', { rentId: '@rentId' }, {
    'get' : { method: 'GET', params: { }, headers: Auth.getCradentials() },
    'create' : { method: 'POST', params: { }, headers: Auth.getCradentials() },
    'update' : { method: 'PUT', params: { }, headers: Auth.getCradentials() },
    'returnBook' : { method: 'POST', params: { action: 'returnBook' }, headers: Auth.getCradentials() },
    'query'   : { method: 'GET', params: { }, headers: Auth.getCradentials(), isArray: true },
    'remove'  : { method: 'DELETE', params: { }, headers: Auth.getCradentials() },
    'delete'  : { method: 'DELETE', params: { }, headers: Auth.getCradentials() }
  });
});
