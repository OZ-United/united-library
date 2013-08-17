'use strict';

angular.module('adminApp')
.controller('RentsRentidCtrl', function ($scope, Rents, $routeParams) {
  $scope.rent = Rents.get($routeParams);

  $scope.returnBook = function(rent){
    Rents.returnBook({'rentId': rent.rentId});
  };
});
