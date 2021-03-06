'use strict';

angular.module('adminApp')
.controller('BooksBookidCtrl', function ($scope, Users, Rents, $routeParams, $location, book, BookCopy) {
  $scope.book = book;

  $scope.openRent = function (bookCopy) {
    $scope.rentBook = true;
    $scope.rentUsers = $scope.rentUsers || Users.query();
    $scope.rentCopy = {
      'bookId': $scope.book.bookId,
      'bookCopyId': bookCopy.bookCopyId,
      'limit': 1000
    };

    $scope.reservations = $scope.reservations || Rents.query({status: 'reserved', book: $scope.book.bookId, 'limit': 1000});
  };

  $scope.clearRent = function(rent) {
    rent.rentId = undefined;
  };

  $scope.closeRent = function () {
    $scope.rentBook = false;
  };

  $scope.save = function () {
    Rents.create($scope.rentCopy, function(rent){
      console.log(rent);
      $scope.rentBook = false;
      $location.path('/rents/' + rent.rentId);
    });
  };

  $scope.returnBook = function(bookCopy) {
    var rentId = bookCopy.rents[bookCopy.rents.length - 1];
    Rents.returnBook({'rentId': rentId}, function(){
      $location.path('/rents');
    });
  };

  $scope.openEdit = function (book) {
    $scope.editBook = true;
    $scope.edit = angular.copy(book);
    delete $scope.edit.copies;
    console.log($scope.edit);
  };

  $scope.closeEdit = function () {
    $scope.editBook = false;
  };

  $scope.saveEdit = function(edit) {
    console.log(edit);
    edit.$update(function(book){
      $scope.book = book;
      $scope.closeEdit();
    });
  };

  $scope.minDate = new Date().setDate(new Date().getDate() + 1);

  $scope.updateCopy = function(copy){

    BookCopy.update(copy, function(){
      copy.changed = false;
    });
  };

});
