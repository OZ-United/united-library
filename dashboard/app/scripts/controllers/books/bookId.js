'use strict';

angular.module('dashboardApp')
.controller('BooksBookidCtrl', function ($scope, Rents, $routeParams, $location, book, Auth) {
  $scope.book = book;
  $scope.Auth = Auth;

  if (Auth.isLoggedIn()) {
    var userId = Auth.getUser().userId;

    Rents.query({book: $scope.book.bookId, user: userId, status: 'reserved'}, function(reservations){
      for (var i=0; i<reservations.length; i++){
        if (reservations[i].user.userId === userId) {
          $scope.reserved = true;
          break;
        }
      }
    });

    Rents.query({book: $scope.book.bookId, user: userId, status: 'rented'}, function(reservations){
      for (var i=0; i<reservations.length; i++){
        if (reservations[i].user.userId === userId) {
          $scope.rented = true;
          break;
        }
      }
    });
  }

  $scope.reserveBook = function() {
    var payload = {
      'bookId': $routeParams.bookId,
      'userId': Auth.getUser().userId
    };
    Rents.reserveBook(payload, function(){
      $location.path('/reservations');
    });
  };

});
