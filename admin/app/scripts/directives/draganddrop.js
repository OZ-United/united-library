'use strict';

angular.module('adminApp')
.directive('draganddrop', function ($q) {
  return {
    template:
      '<section class="ddupload">' +
      '<input type="file" ng-model="logo" name="logo" accept="image/*" id="logo" onchange="angular.element(this).scope().setFiles(this)" ng-cloak/>' +
      '<div id="dropbox" class="dropbox" ng-class="dropClass">' +
      '  <span class="dropbox-text">{{dropText}}</span>' +
      '  <div>' +
      '    <img ng-src="{{image.dataUrl}}" alt="image" ng-show="image.dataUrl"/>' +
      '  </div>' +
      '</div>' +
      '</section>',
    restrict: 'E',
    scope: {
      'done': '&'
    },
    controller: function($scope, $element) {

      $scope.image = {};

      var dropTextOK = 'Select an image';
      var dropTextFAIL = 'Only images are allowed!';
      $scope.dropText = dropTextOK;

      var dropbox = $element.find('#dropbox')[0];
      dropbox.addEventListener('click', function() {
        $element.find('input[type=file]')[0].click();
      }, false);

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
        $scope.dropText = dropTextOK;
        $scope.dropClass = '';

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


      var dragEnterLeave = function(evt) {
        evt.stopPropagation();
        evt.preventDefault();

        $scope.$apply(function(){
          $scope.dropText = dropTextOK;
          $scope.dropClass = '';
        });
      };

      dropbox.addEventListener('dragenter', dragEnterLeave, false);
      dropbox.addEventListener('dragleave', dragEnterLeave, false);
      dropbox.addEventListener('dragover', function(evt) {
        evt.stopPropagation();
        evt.preventDefault();
        var ok = evt.dataTransfer && evt.dataTransfer.types && evt.dataTransfer.types.indexOf('Files') >= 0;
        $scope.$apply(function(){
          $scope.dropText = ok ? dropTextOK : dropTextFAIL;
          $scope.dropClass = ok ? 'dropbox-over' : 'dropbox-not-available';
        });
      }, false);

      dropbox.addEventListener('drop', function(evt) {
        evt.stopPropagation();
        evt.preventDefault();
        $scope.$apply(function(){
          $scope.dropText = dropTextOK;
          $scope.dropClass = '';
        });

        var files = evt.dataTransfer.files;

        if (files.length) {
          $scope.files = [];
          $scope.dataUrl = '';
        }

        var file = files[0];
        if (file.type.match(/image/g)) {
          readAsDataURL(file).then(
            function(dataUrl){
              console.log(dataUrl);
              $scope.image.dataUrl = dataUrl;
              $scope.done({dataUrl: dataUrl});
            }
          );
        }
        else {
          $scope.dropText = dropTextFAIL;
          $scope.dropClass = 'dropbox-not-available';
        }

        $scope.$apply();
      }, false);
    }
  };
});
