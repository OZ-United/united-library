'use strict';

angular.module('dashboardApp')
.controller('BooksBookidCtrl', function ($scope, Rents, $routeParams, $location, book, Auth) {
  $scope.book = book;
  $scope.Auth = Auth;

  $scope.returnBook = function(bookCopy) {
    var rentId = bookCopy.rents[bookCopy.rents.length - 1];
    Rents.returnBook({'rentId': rentId}, function(){
      $location.path('/rents');
    });
  };

  $scope.reserveBook = function() {
    var payload = {
      'bookId': $routeParams.bookId,
      'userId': Auth.getUser().userId
    };
    Rents.reserveBook(payload, function(){
      $location.path('/rents');
    });
  };

});
