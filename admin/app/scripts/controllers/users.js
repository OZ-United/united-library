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

  $scope.page = 1;
  $scope.query = function(){
    var query = {page: $scope.page + 1};
    query = angular.extend(query, $routeParams);
    console.log(query);
    Users.query(query,
      function(users){
        $scope.users = $scope.users.concat(users);
        $scope.page += 1;
      },
      function(error){

    });
  };
});
