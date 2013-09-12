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

  $scope.getStyle = function(rent){
    if (new Date(rent.rent.endDate) < new Date() && !rent.rent.returnDate) {
      return 'warning';
    }
  };

  $scope.page = 1;
  $scope.query = function(){
    var query = {page: $scope.page + 1};
    query = angular.extend(query, $routeParams);
    console.log(query);
    Rents.query(query,
      function(rents){
        $scope.rents = $scope.rents.concat(rents);
        $scope.page += 1;
      },
      function(error){

    });
  };
});
