'use strict';

angular.module('adminApp')
.controller('UsersUseridCtrl', function ($scope, Users, $routeParams, $location, user) {
  $scope.user = user;

  $scope.updateUser = function(user){
    if ($scope.updateUserForm.$valid) {
      Users.update(user, function(user){
        $location.path('/users');
      });
      $scope.user = {};
    }
  };

  $scope.setPassword = function(password){
    if ($scope.setPasswordForm.$valid) {
      Users.update({'password': password, 'userId': $routeParams.userId}, function(password){
        $location.path('/users');
      });
      $scope.password = {};
    }
  };

  $scope.removeUser = function(user){
    Users.remove({'userId': user.userId}, function(){
      $location.path('/users');
    });
  };
});
