'use strict';

angular.module('dashboardApp')
  .controller('BooksCtrl', function ($scope, Books, $routeParams, books) {

  $scope.books = books;

  $scope.query = function(){
    if (!$scope.mayQuery) {
      return false;
    }

    var query = {page: $scope.page + 1};
    query = angular.extend(query, $routeParams);
    console.log(query);
    Books.query(query,
      function(books){
        if (!books.length) {
          $scope.mayQuery = false;
        }
        $scope.books = $scope.books.concat(books);
        $scope.page += 1;
      },
      function(error){

    });
  };

  $scope.page = 1;
  $scope.mayQuery = true;
});
