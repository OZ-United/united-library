'use strict';

angular.module('dashboardApp')
.controller('RegisterCtrl', function ($scope, Auth, $location) {

  $scope.auth = function(user) {
    Auth.register(user).then(function(user){
      console.log(user);
      $location.path('/');
    },
    function(){
      $scope.error = 'Nepodarilo sa zaregistrovať';
    });
  };
});
