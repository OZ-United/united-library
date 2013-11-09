'use strict';

angular.module('adminApp')
.factory('BookCopy', function ($resource, Auth) {
  return $resource((window.host || '') + '/bookCopies/:bookCopyId', { }, {
    'update'  : { method: 'PUT', params: { bookCopyId: '@bookCopyId' }, headers: Auth.getCradentials() }
  });
});
