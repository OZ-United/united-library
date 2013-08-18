'use strict';

angular.module('adminApp')
.controller('RentsRentidCtrl', function ($scope, Rents, rent, $location) {
  $scope.rent = rent;

  $scope.rentHistory = Rents.query({'bookId': rent.book.bookId});

  $scope.returnBook = function(rent){
    Rents.returnBook({'rentId': rent.rentId}, function(){
      $location.path('/rents');
    });
  };
});
