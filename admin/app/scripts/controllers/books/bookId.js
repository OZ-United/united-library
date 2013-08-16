'use strict';

angular.module('adminApp')
.controller('BooksBookidCtrl', function ($scope, Books, $routeParams) {
  $scope.book = Books.get({'bookId': $routeParams.bookId});

  $scope.open = function () {
    $scope.shouldBeOpen = true;
  };

  $scope.close = function () {
    $scope.closeMsg = 'I was closed at: ' + new Date();
    $scope.shouldBeOpen = false;
  };

  $scope.opts = {
    backdropFade: true,
    dialogFade:true
  };
});
