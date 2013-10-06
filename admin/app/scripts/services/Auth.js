'use strict';

angular.module('adminApp')
.factory('Auth', function ($q, $http, $rootScope) {
  var STORAGE_ID = 'united-library';
  var user = JSON.parse(localStorage.getItem(STORAGE_ID) || '{}');

  return {
    login: function (user) {
      var deferred = $q.defer();

      $http.post((window.host || '') + '/auth', user)
        .success(function(res){
          user = res;
          deferred.resolve(res);
        })
        .error(function(){
          deferred.reject();
        });

      return deferred.promise;
    },
    getUser: function() {
      return user;
    }
  };
});
