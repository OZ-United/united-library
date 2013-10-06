'use strict';

angular.module('adminApp')
.controller('MainCtrl', function ($scope, Auth, $location) {
  $scope.auth = function(user) {
    Auth.login(user).then(function(user){
      console.log(user);
      $location.path('/books');
    });
  };
});
