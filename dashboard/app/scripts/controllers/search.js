'use strict';

angular.module('dashboardApp')
.controller('SearchCtrl', function ($scope, $routeParams, $rootScope, books) {
  $scope.books = books;

  $rootScope.query = '';
});
