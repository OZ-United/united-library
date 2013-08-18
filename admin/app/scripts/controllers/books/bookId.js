'use strict';

angular.module('adminApp')
.controller('BooksBookidCtrl', function ($scope, Books, Users, Rents, $routeParams, $location) {
  $scope.book = Books.get({'bookId': $routeParams.bookId});

  $scope.open = function (bookCopy) {
    $scope.rentBook = true;
    $scope.users = Users.query();
    $scope.rentCopy = {
      'bookId': $scope.book.bookId,
      'bookCopyId': bookCopy.bookCopyId
    };
  };

  $scope.close = function () {
    $scope.rentBook = false;
  };

  $scope.save = function () {
    Rents.create($scope.rentCopy, function(rent){
      console.log(rent);
      $scope.rentBook = false;
      $location.path('/rents/' + rent.rentId);
    });
  };

  $scope.opts = {
    backdropFade: true,
    dialogFade: true
  };

  $scope.returnBook = function(bookCopy) {
    var rentId = bookCopy.rents[bookCopy.rents.length - 1];
    Rents.returnBook({'rentId': rentId}, function(){
      $location.path('/rents');
    });
  };
});
