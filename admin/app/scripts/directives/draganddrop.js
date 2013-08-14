'use strict';

angular.module('adminApp')
.directive('draganddrop', function ($q) {
  return {
    template:
      '<section class="ddupload">' +
      '<input type="file" ng-model="logo" name="logo" accept="image/*" required id="logo" onchange="angular.element(this).scope().setFiles(this)" ng-cloak/>' +
      '<div id="dropbox" class="dropbox" ng-class="dropClass">' +
      '  <span class="dropText">{{dropText}}</span>' +
      '  <div>' +
      '    <img ng-src="{{image.dataUrl}}" alt="image" ng-show="image.dataUrl"/>' +
      '  </div>' +
      '</div>' +
      '</section>',
    restrict: 'E',
    scope: {
      'done': '&'
    },
    controller: function($scope) {

      $scope.image = {};

      var readAsDataURL = function(file){
        var deferred = $q.defer();

        var reader = new FileReader();
        reader.onload = function(e) {
          deferred.resolve(e.target.result);
          $scope.$apply();
        };
        reader.readAsDataURL(file);

        return deferred.promise;
      };

      $scope.setFiles = function(element) {
          if (element.files.length) {
            $scope.files = [];
            $scope.dataUrl = '';
          }

          var file = element.files[0];
          readAsDataURL(file).then(
            function(dataUrl){
              console.log(dataUrl);
              $scope.image.dataUrl = dataUrl;
              $scope.done({dataUrl: dataUrl});
            }
          );

          $scope.$apply();
      };
    }
  };
});
