'use strict';

angular.module('dashboardApp')
.factory('Rents', function ($resource, Auth) {
  return $resource((window.host || '') + '/rents/:rentId/:action', { rentId: '@rentId' }, {
    'get' : { method: 'GET', params: { }, headers: Auth.getCradentials() },
    'create' : { method: 'POST', params: { }, headers: Auth.getCradentials() },
    'returnBook' : { method: 'POST', params: { action: 'returnBook' }, headers: Auth.getCradentials() },
    'query'   : { method: 'GET', params: { }, headers: Auth.getCradentials(), isArray: true },
  });
});
