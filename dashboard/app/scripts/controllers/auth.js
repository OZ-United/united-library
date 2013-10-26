'use strict';

angular.module('dashboardApp')
.controller('AuthCtrl', function ($scope, Auth, $location) {
  $scope.auth = function(user) {
    Auth.login(user).then(function(user){
      console.log(user);
      $location.path('/');
    },
    function(){
      $scope.error = true;
    });
  };
});
