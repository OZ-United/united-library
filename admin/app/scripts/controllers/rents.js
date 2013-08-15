'use strict';

angular.module('adminApp')
  .controller('RentsCtrl', function ($scope, Rents) {
  $scope.rents = Rents.query();


  $scope.removeRent = function(rent){
    var index = $scope.rents.indexOf(rent);
    if (index < 0) { return false; }

    Rents.remove({'rentId': $scope.rents[index].rentId}, function(){
      $scope.rents.splice(index, 1);
    });
  };
});
