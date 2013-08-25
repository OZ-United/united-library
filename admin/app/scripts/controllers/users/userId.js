'use strict';

angular.module('adminApp')
.controller('UsersUseridCtrl', function ($scope, Users, $routeParams, $location) {
  $scope.user = Users.get($routeParams, function(){
    $scope.user.password = undefined;
  });

  $scope.updateUser = function(user){
    if ($scope.updateUserForm.$valid) {
      Users.update(user, function(user){
        $location.path('/users');
      });
      $scope.user = {};
    }
  };

  $scope.removeUser = function(user){
    Users.remove({'userId': user.userId}, function(){
      $location.path('/users');
    });
  };
});
