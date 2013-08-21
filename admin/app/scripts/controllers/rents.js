'use strict';

angular.module('adminApp')
  .controller('RentsCtrl', function ($scope, Rents, $location) {
  $scope.rents = Rents.query();

  $scope.returnBook = function(rent){
    Rents.returnBook({'rentId': rent.rentId}, function(res){
      console.log(res);
      rent.status = res.status;
      rent.rent.returnDate = res.rent.returnDate;
    });
  };
});
