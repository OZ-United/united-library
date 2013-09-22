'use strict';

angular.module('adminApp')
.controller('SearchCtrl', function ($scope, $routeParams, Search) {
  $scope.books = Search.query($routeParams);
});
