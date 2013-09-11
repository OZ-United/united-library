'use strict';

angular.module('adminApp')
  .controller('UsersCtrl', function ($scope, Users, $routeParams) {
  $scope.users = Users.query($routeParams);

  $scope.addUser = function(){
    if ($scope.addUserForm.$valid) {
      Users.create($scope.user, function(user){
        $scope.users.push(user);
        $scope.close();
      });
      $scope.user = {};
    }
  };

  $scope.open = function() {
    $scope.newUser = true;
  };

  $scope.close = function() {
    $scope.newUser = false;
  };
});
