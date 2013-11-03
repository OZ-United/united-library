'use strict';

angular.module('dashboardApp')
.controller('RentsCtrl', function ($scope, Rents, $location, $routeParams, Auth, rents) {
  $scope.rents = rents;

  $scope.returnBook = function(rent){
    Rents.returnBook({'rentId': rent.rentId}, function(res){
      console.log(res);
      rent.status = res.status;
      rent.rent.returnDate = res.rent.returnDate;
    });
  };

  $scope.getStyle = function(rent){
    if (rent.rent && (new Date(rent.rent.endDate) < new Date() && !rent.rent.returnDate)) {
      return 'warning';
    }
  };

  $scope.query = function(){
    if (!$scope.mayQuery) {
      return false;
    }

    var query = {page: $scope.page + 1};
    query = angular.extend(query, $routeParams, {user: Auth.getUser().userId});
    console.log(query);
    Rents.query(query,
      function(rents){
        if (!rents.length) {
          $scope.mayQuery = false;
        }
        $scope.rents = $scope.rents.concat(rents);
        $scope.page += 1;
      },
      function(error){

    });
  };

  $scope.page = 1;
  $scope.mayQuery = true;
});
