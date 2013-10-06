'use strict';

angular.module('adminApp')
.controller('SearchCtrl', function ($scope, $routeParams, $rootScope, books) {
  $scope.books = books;

  $rootScope.query = '';
});
