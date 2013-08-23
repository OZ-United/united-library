'use strict';

angular.module('adminApp')
  .controller('RentsCtrl', function ($scope, Rents, $location, $routeParams) {
  $scope.rents = Rents.query($routeParams);

  $scope.returnBook = function(rent){
    Rents.returnBook({'rentId': rent.rentId}, function(res){
      console.log(res);
      rent.status = res.status;
      rent.rent.returnDate = res.rent.returnDate;
    });
  };
});
