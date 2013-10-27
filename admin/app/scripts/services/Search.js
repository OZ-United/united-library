'use strict';

angular.module('adminApp')
.factory('Search', function ($resource, Auth) {
  return $resource((window.host || '') + '/search', { q: '@q' }, {
    'query'   : { method: 'GET', params: { }, headers: Auth.getCradentials(), isArray: true },
  });
});
