'use strict';

angular.module('adminApp')
.controller('BooksBookidCtrl', function ($scope, Books, Users, $routeParams) {
  $scope.book = Books.get({'bookId': $routeParams.bookId});
  $scope.users = Users.query();

  $scope.open = function (bookCopy) {
    $scope.rentBook = true;
    $scope.rentCopy = {
      'bookId': $scope.book.bookId,
      'bookCopyId': bookCopy.bookCopyId
    };
  };

  $scope.close = function () {
    $scope.rentBook = false;
  };

  $scope.opts = {
    backdropFade: true,
    dialogFade: true
  };
});
