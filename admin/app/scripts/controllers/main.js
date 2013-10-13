'use strict';

angular.module('adminApp')
.controller('MainCtrl', function ($scope, Books) {

  $scope.books = Books.topRented({limit: 10});

});
