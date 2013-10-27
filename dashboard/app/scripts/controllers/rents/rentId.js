'use strict';

angular.module('dashboardApp')
.controller('RentsRentidCtrl', function ($scope, Rents, rent, $location) {
  $scope.rent = rent;

  $scope.returnBook = function(rent){
    Rents.returnBook({'rentId': rent.rentId}, function(){
      $location.path('/rents');
    });
  };
});
