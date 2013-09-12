'use strict';

angular.module('adminApp')
  .controller('BooksCtrl', function ($scope, Books, $routeParams) {

  $scope.book = {};
  $scope.books = Books.query($routeParams);

  $scope.addBook = function(){
    if ($scope.addBookForm.$valid) {
      Books.create($scope.book, function(book){
        $scope.books.push(book);
        $scope.newBook = false;
        $scope.book = {};
      });
    }
  };

  $scope.setCover = function(dataUrl){
    console.log('setCover');
    $scope.book.cover = dataUrl;
    console.log($scope.book);
  };

  $scope.open = function() {
    $scope.newBook = true;
  };

  $scope.close = function () {
    $scope.newBook = false;
  };

  $scope.page = 1;
  $scope.query = function(){
    var query = {page: $scope.page + 1};
    query = angular.extend(query, $routeParams);
    console.log(query);
    Books.query(query,
      function(books){
        $scope.books = $scope.books.concat(books);
        $scope.page += 1;
      },
      function(error){

    });
  };
});
