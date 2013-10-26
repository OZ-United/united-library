'use strict';

angular.module('dashboardApp', ['ngRoute', 'ngResource'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/profile', {
        templateUrl: 'views/profile.html',
        controller: 'ProfileCtrl'
      })
      .when('/rents', {
        templateUrl: 'views/rents.html',
        controller: 'RentsCtrl'
      })
      .when('/books', {
        templateUrl: 'views/books.html',
        controller: 'BooksCtrl',
        resolve: {
          books: function($q, $route, Books, Auth){
            var deferred = $q.defer();
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
      .when('/search', {
        templateUrl: 'views/search.html',
        controller: 'SearchCtrl',
        resolve: {
          books: function($q, $route, Search, Auth){
            var deferred = $q.defer();
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
      // if ( !Auth.isLoggedIn() ) {
      //   if ( next.templateUrl !== 'views/auth.html' ) {
      //     $location.path( '/auth' );
      //   }
      // }
      // else {
      //   if ( next.templateUrl === 'views/auth.html' ) {
      //     $location.path( '/' );
      //   }
      // }
    });
  });
