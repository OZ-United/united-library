'use strict';

angular.module('adminApp')
.controller('ReservationsCtrl', function ($scope, Rents, $location, $routeParams, Auth, reservations) {

  $scope.reservations = reservations;

  $scope.query = function(){
    if (!$scope.mayQuery) {
      return false;
    }

    var query = {page: $scope.page + 1};
    query = angular.extend(query, $routeParams, {status: 'reserved'});
    console.log(query);
    Rents.query(query,
      function(reservations){
        if (!reservations.length) {
          $scope.mayQuery = false;
        }
        $scope.reservations = $scope.reservations.concat(reservations);
        $scope.page += 1;
      },
      function(error){

    });
  };

  $scope.page = 1;
  $scope.mayQuery = true;
});
