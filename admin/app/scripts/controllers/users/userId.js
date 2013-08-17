'use strict';

angular.module('adminApp')
.controller('UsersUseridCtrl', function ($scope, Users, $routeParams, $location) {
  $scope.user = Users.get($routeParams);

  $scope.updateUser = function(){
    if ($scope.updateUserForm.$valid) {
      Users.update($scope.user, function(user){
        $location.path('/users');
      });
      $scope.user = {};
    }
  };
});
