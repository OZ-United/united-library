'use strict';

angular.module('dashboardApp')
.factory('Auth', function ($q, $http, $rootScope) {
  var STORAGE_ID = 'united-library';
  $rootScope.user = JSON.parse(localStorage.getItem(STORAGE_ID) || '{}');

  return {
    login: function (user) {
      var deferred = $q.defer();

      $http.post((window.host || '') + '/auth', user)
        .success(function(res){
          $rootScope.user = res;
          localStorage.setItem(STORAGE_ID, JSON.stringify(res));
          deferred.resolve(res);
        })
        .error(function(){
          deferred.reject();
        });

      return deferred.promise;
    },
    getCradentials: function() {
      return {
        'userId': $rootScope.user.userId,
        'hash': $rootScope.user.hash
      };
    },
    getUser: function() {
      return $rootScope.user;
    },
    isLoggedIn: function() {
      return ($rootScope.user.hash && $rootScope.user.hash.length) ? true : false;
    },
    logout: function() {
      $rootScope.user = {};
      localStorage.setItem(STORAGE_ID, JSON.stringify('{}'));
      return true;
    }
  };
});
