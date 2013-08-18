'use strict';

angular.module('adminApp')
.factory('Rents', function ($resource) {
  return $resource((window.host || '') + '/rents/:rentId/:action', { rentId: '@rentId' }, {
    'create' : { method: 'POST', params: { } },
    'update' : { method: 'PUT', params: {  } },
    'returnBook' : { method: 'POST', params: { action: 'returnBook' } },
    'query'   : { method: 'GET', params: { }, isArray: true },
    'remove'  : { method: 'DELETE', params: { } },
    'delete'  : { method: 'DELETE', params: { } }
  });
});
