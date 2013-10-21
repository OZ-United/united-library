'use strict';

angular.module('adminApp', ['ngRoute', 'ngResource', 'ja.isbn', 'ui.bootstrap'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/users', {
        templateUrl: 'views/users.html',
        controller: 'UsersCtrl',
        resolve: {
          users: function($q, $route, Users, Auth){
            var deferred = $q.defer();
            if (!Auth.isLoggedIn()) { return deferred.reject(); }

            Users.query($route.current.params,
              function(users){
                console.log(users);
                deferred.resolve(users);
              },
              function(){
                deferred.reject();
              }
            );

            return deferred.promise;
          }
        }
      })
      .when('/books', {
        templateUrl: 'views/books.html',
        controller: 'BooksCtrl',
        resolve: {
          books: function($q, $route, Books, Auth){
            var deferred = $q.defer();
            if (!Auth.isLoggedIn()) { return deferred.reject(); }
            Books.query($route.current.params,
              function(books){
                console.log(books);
                deferred.resolve(books);
              },
              function(){
                deferred.reject();
              }
            );

            return deferred.promise;
          }
        }
      })
      .when('/rents', {
        templateUrl: 'views/rents.html',
        controller: 'RentsCtrl',
        resolve: {
          rents: function($q, $route, Rents, Auth){
            var deferred = $q.defer();
            if (!Auth.isLoggedIn()) { return deferred.reject(); }
            Rents.query($route.current.params,
              function(rents){
                console.log(rents);
                deferred.resolve(rents);
              },
              function(){
                deferred.reject();
              }
            );

            return deferred.promise;
          }
        }
      })
      .when('/books/:bookId', {
        templateUrl: 'views/books/bookId.html',
        controller: 'BooksBookidCtrl',
        resolve: {
          book: function($q, $route, Books, Auth){
            var deferred = $q.defer();
            if (!Auth.isLoggedIn()) { return deferred.reject(); }
            Books.get({'bookId': $route.current.params.bookId},
              function(book){
                console.log(book);
                deferred.resolve(book);
              },
              function(){
                deferred.reject();
              }
            );

            return deferred.promise;
          }
        }
      })
      .when('/users/:userId', {
        templateUrl: 'views/users/userId.html',
        controller: 'UsersUseridCtrl',
        resolve: {
          user: function($q, $route, Users, Auth){
            var deferred = $q.defer();
            if (!Auth.isLoggedIn()) { return deferred.reject(); }
            Users.get({'userId': $route.current.params.userId},
              function(user){
                console.log(user);
                deferred.resolve(user);
              },
              function(){
                deferred.reject();
              }
            );

            return deferred.promise;
          }
        }
      })
      .when('/rents/:rentId', {
        templateUrl: 'views/rents/rentId.html',
        controller: 'RentsRentidCtrl',
        resolve: {
          rent: function($q, $route, Rents, Auth){
            var deferred = $q.defer();
            if (!Auth.isLoggedIn()) { return deferred.reject(); }
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
      .when('/search', {
        templateUrl: 'views/search.html',
        controller: 'SearchCtrl',
        resolve: {
          books: function($q, $route, Search, Auth){
            var deferred = $q.defer();
            if (!Auth.isLoggedIn()) { return deferred.reject(); }
            Search.query($route.current.params,
              function(books){
                console.log(books);
                deferred.resolve(books);
              },
              function(){
                deferred.reject();
              }
            );

            return deferred.promise;
          }
        }
      })
      .when('/auth', {
        templateUrl: 'views/auth.html',
        controller: 'AuthCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .run(function($rootScope, $location, Auth){
    $rootScope.modalOpts = {
      backdropFade: true,
      dialogFade: true
    };

    $rootScope.search = function(query) {
      $location.url('search?q=' + query);
    };

    $rootScope.signout = function() {
      Auth.logout();
      $location.path( '/' );
    };

    $rootScope.$on('$routeChangeStart', function(event, next, current) {
      console.log(next.templateUrl);
      console.log(Auth.isLoggedIn());
      if ( !Auth.isLoggedIn() ) {
        if ( next.templateUrl !== 'views/auth.html' ) {
          $location.path( '/auth' );
        }
      }
      else {
        if ( next.templateUrl === 'views/auth.html' ) {
          $location.path( '/' );
        }
      }
    });
  });
