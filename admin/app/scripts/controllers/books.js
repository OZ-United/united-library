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

  // $scope.removeBook = function(book){
  //   var index = $scope.books.indexOf(book);
  //   if (index < 0) { return false; }

  //   Books.remove({'bookId': $scope.books[index].bookId}, function(){
  //     $scope.books.splice(index, 1);
  //   });
  // };

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

  $scope.opts = {
    backdropFade: true,
    dialogFade: true
  };
});
