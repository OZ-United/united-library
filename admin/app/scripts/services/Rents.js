'use strict';

angular.module('adminApp')
.factory('Rents', function ($resource) {
  return $resource('http://united-library.dev/rents/:rentId', { rentId: '@rentId' }, {
    'create' : { method: 'POST', params: { } },
    'query'   : { method: 'GET', params: { }, isArray: true },
    'remove'  : { method: 'DELETE', params: { } },
    'delete'  : { method: 'DELETE', params: { } }
  });
});
