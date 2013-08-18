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
      .when('/users/:userId', {
        templateUrl: 'views/users/userId.html',
        controller: 'UsersUseridCtrl'
      })
      .when('/rents/:rentId', {
        templateUrl: 'views/rents/rentId.html',
        controller: 'RentsRentidCtrl',
        resolve: {
          rent: function($q, $route, Rents){
            var deferred = $q.defer();
            Rents.get({'rentId': $route.current.params.rentId},
              function(rent){
                console.log(rent);
                deferred.resolve(rent);
              },
              function(){
                deferred.reject();
              }
            );

            return deferred.promise;
          }
        }
      })
      .otherwise({
        redirectTo: '/'
      });
  });
