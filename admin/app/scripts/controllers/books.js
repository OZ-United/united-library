'use strict';

angular.module('adminApp')
  .controller('BooksCtrl', function ($scope, Books) {

  $scope.book = {};
  $scope.books = Books.query();

  $scope.addBook = function(){
    if ($scope.addBookForm.$valid) {
      Books.create($scope.book, function(book){
        $scope.books.push(book);
        $scope.newBook = false;
      });
      $scope.book = {};
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
});
