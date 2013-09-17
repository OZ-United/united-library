'use strict';

angular.module('adminApp')
.factory('Search', function ($resource) {
  return $resource((window.host || '') + '/search', { q: '@q' }, {
    'query'   : { method: 'GET', params: { }, isArray: true },
  });
});
