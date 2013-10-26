'use strict';

angular.module('dashboardApp')
.controller('MainCtrl', function ($scope, Books) {

  $scope.books = Books.topRented({limit: 10});
});
