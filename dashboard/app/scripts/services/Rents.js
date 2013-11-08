'use strict';

angular.module('dashboardApp')
.factory('Rents', function ($resource, Auth) {
  return $resource((window.host || '') + '/rents/:rentId/:action', { rentId: '@rentId' }, {
    'get' : { method: 'GET', params: { }, headers: Auth.getCradentials() },
    'create' : { method: 'POST', params: { }, headers: Auth.getCradentials() },
    'reserveBook' : { method: 'POST', params: { action: 'reserveBook' }, headers: Auth.getCradentials() },
    'returnBook' : { method: 'POST', params: { action: 'returnBook' }, headers: Auth.getCradentials() },
    'query'   : { method: 'GET', params: { }, headers: Auth.getCradentials(), isArray: true },
    'cancelReservation': { method: 'DELETE', params: { action: 'reservation' }, headers: Auth.getCradentials(), isArray: true },
  });
});
