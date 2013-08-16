'use strict';

angular.module('adminApp')
.controller('BooksBookidCtrl', function ($scope, Books, $routeParams) {
  $scope.book = Books.get({'bookId': $routeParams.bookId});
});
