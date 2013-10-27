'use strict';

angular.module('dashboardApp')
.controller('BooksBookidCtrl', function ($scope, Rents, $routeParams, $location, book) {
  $scope.book = book;

  $scope.returnBook = function(bookCopy) {
    var rentId = bookCopy.rents[bookCopy.rents.length - 1];
    Rents.returnBook({'rentId': rentId}, function(){
      $location.path('/rents');
    });
  };

});
