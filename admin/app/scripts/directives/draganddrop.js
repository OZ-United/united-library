'use strict';

angular.module('adminApp')
.directive('draganddrop', function ($q, $timeout) {
  return {
    template:
      '<section class="ddupload">' +
      '<input type="file" ng-model="logo" name="logo" accept="image/*" id="logo" onchange="angular.element(this).scope().setFiles(this)" ng-cloak/>' +
      '<div id="dropbox" class="dropbox" ng-class="dropClass">' +
      '  <span class="icon-remove dropbox-remove" ng-show="cover" ng-click="removeCover()"></span>' +
      '  <span class="icon-picture dropbox-add" ng-hide="cover"></span>' +
      '  <div class="dropbox-image" ng-show="cover">' +
      '    <img ng-src="{{cover}}" alt="cover"/>' +
      '  </div>' +
      '  <div class="dropbox-progress" ng-style="progressStyle" ng-hide="cover"></div>' +
      '</div>' +
      '</section>',
    restrict: 'E',
    scope: {
      'cover': '='
    },
    controller: function($scope, $element) {

      $scope.image = {};
      $scope.progressStyle = {'width': 0};

      var dropbox = $element.find('#dropbox')[0];
      dropbox.addEventListener('click', function() {
        $element.find('input[type=file]')[0].click();
      }, false);

      $scope.removeCover = function() {
        $scope.cover = undefined;
      };

      var showError = function(){
        $scope.$apply(function(){
          $scope.cover = undefined;
          $scope.dropClass = 'dropbox-not-available';
          $scope.progressStyle.width = 0;

          $timeout(function(){
            $scope.dropClass = '';
          }, 500);
        });
      };

      var upload = function(file) {

        $scope.cover = undefined;
        $scope.progressStyle.width = 0;
        $scope.$apply();
        var fd = new FormData();
        fd.append('image', file);
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/upload');

        xhr.upload.onprogress = function(e) {
          if (e.lengthComputable) {
            var percentage = (e.loaded / e.total) * 100;
            console.log(percentage + '%');
            $scope.progressStyle.width = percentage + '%';
            $scope.$apply();
          }
        };

        xhr.onerror = function() {
          console.error('An error occurred while submitting the form.', this.statusText);
          showError();
        };

        xhr.onload = function(e) {

          if (this.status === 200) {
            var data = JSON.parse(e.target.responseText);
            console.log(data);


            $scope.$apply(function(){
              $scope.progressStyle.width = '100%';
              $scope.cover = data.image;
            });
          }
          else {
            xhr.onerror();
          }

        };

        xhr.send(fd);
      };

      $scope.setFiles = function(element) {
        $scope.inputEl = element;
        $scope.dropClass = '';
        $scope.progressStyle.width = 0;

        if (element.files.length) {
          var file = element.files[0];
          upload(file);
        }
      };


      var dragEnterLeave = function(evt) {
        evt.stopPropagation();
        evt.preventDefault();

        $scope.$apply(function(){
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
          $scope.dropClass = ok ? 'dropbox-over' : 'dropbox-not-available';
        });
      }, false);

      dropbox.addEventListener('drop', function(evt) {
        evt.stopPropagation();
        evt.preventDefault();
        $scope.$apply(function(){
          $scope.removeCover();
          $scope.dropClass = '';
        });

        var files = evt.dataTransfer.files;

        if (files.length) {
          $scope.cover = undefined;
        }

        var file = files[0];

        if (file.type.match(/image/g)) {
          upload(file);
        }
        else {
          showError();
        }
      }, false);
    }
  };
});
