'use strict';

angular.module('adminApp')
.controller('SearchCtrl', function ($scope, $routeParams, Search, $rootScope) {
  $scope.books = Search.query($routeParams);

  $rootScope.query = '';
});
