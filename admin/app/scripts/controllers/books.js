'use strict';

angular.module('adminApp')
  .controller('BooksCtrl', function ($scope, Books) {
  $scope.books = Books.query();

  $scope.addBook = function(){
    if ($scope.addBookForm.$valid) {
      Books.create($scope.book, function(book){
        $scope.books.push(book);
      });
      $scope.book = {};
    }
  };

  $scope.removeBook = function(book){
    var index = $scope.books.indexOf(book);
    if (index < 0) { return false; }

    Books.remove({'bookId': $scope.books[index].bookId}, function(){
      $scope.books.splice(index, 1);
    });
  };
});
