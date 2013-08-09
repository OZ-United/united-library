'use strict';

angular.module('adminApp')
.factory('Users', function ($resource) {
  return $resource('http://united-library.dev/users/:userId', { userId: '@userId' }, {
    'create' : { method: 'POST', params: { } },
    'query'   : { method: 'GET', params: { }, isArray: true },
    'update'  : { method: 'PUT', params: { } },
    'remove'  : { method: 'DELETE', params: { } },
    'delete'  : { method: 'DELETE', params: { } }
  });
});
