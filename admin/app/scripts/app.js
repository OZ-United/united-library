'use strict';

angular.module('adminApp', ['ngResource', 'ja.isbn', 'ui.bootstrap'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/users', {
        templateUrl: 'views/users.html',
        controller: 'UsersCtrl'
      })
      .when('/books', {
        templateUrl: 'views/books.html',
        controller: 'BooksCtrl'
      })
      .when('/rents', {
        templateUrl: 'views/rents.html',
        controller: 'RentsCtrl'
      })
      .when('/books/:bookId', {
        templateUrl: 'views/books/bookId.html',
        controller: 'BooksBookidCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
