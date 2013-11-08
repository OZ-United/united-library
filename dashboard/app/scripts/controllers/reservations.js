'use strict';

angular.module('dashboardApp')
.controller('ReservationsCtrl', function ($scope, Rents, $location, $routeParams, Auth, reservations) {

  $scope.reservations = reservations;

  $scope.query = function(){
    if (!$scope.mayQuery) {
      return false;
    }

    var query = {page: $scope.page + 1};
    query = angular.extend(query, $routeParams, {user: Auth.getUser().userId, status: 'reserved'});
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

  $scope.cancelReservation = function(reservation, index){

    Rents.cancelReservation({rentId: reservation.rentId}, function(){
      $scope.reservations.splice(index, 1);
    });
  };
});
