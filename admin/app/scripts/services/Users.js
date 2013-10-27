'use strict';

angular.module('adminApp')
.factory('Users', function ($resource, Auth) {
  return $resource((window.host || '') + '/users/:userId', { userId: '@userId' }, {
    'get' : { method: 'GET', params: { }, headers: Auth.getCradentials() },
    'create' : { method: 'POST', params: { }, headers: Auth.getCradentials() },
    'query'   : { method: 'GET', params: { }, headers: Auth.getCradentials(), isArray: true },
    'update'  : { method: 'PUT', params: { }, headers: Auth.getCradentials() },
    'setPassword'  : { method: 'PUT', params: { }, headers: Auth.getCradentials() },
    'remove'  : { method: 'DELETE', params: { }, headers: Auth.getCradentials() },
    'delete'  : { method: 'DELETE', params: { }, headers: Auth.getCradentials() }
  });
});
