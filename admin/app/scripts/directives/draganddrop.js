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
      var MAX_WIDTH = 100;
      var MAX_HEIGHT = 100;
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

      var readAsDataURL = function(file){
        var deferred = $q.defer();

        var reader = new FileReader();
        reader.onload = function(e) {
          var fileDataUrl = e.target.result;

          var tempImg = new Image();
          tempImg.onload = function(){
            var tempW = tempImg.width;
            var tempH = tempImg.height;
            console.log(tempW, tempH);
            if (tempW > tempH) {
              if (tempW > MAX_WIDTH) {
                tempH *= MAX_WIDTH / tempW;
                tempW = MAX_WIDTH;
                console.log(tempW, tempH);
              }
            }
            else {
              if (tempH > MAX_HEIGHT) {
                tempW *= MAX_HEIGHT / tempH;
                tempH = MAX_HEIGHT;
              }
            }

            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');
            canvas.width = tempW;
            canvas.height = tempH;
            ctx.drawImage(tempImg, 0, 0, tempW, tempH);

            var dataURL = canvas.toDataURL('image/png');
            deferred.resolve(dataURL);
            $scope.$apply();
          };
          tempImg.src = fileDataUrl;
        };
        reader.readAsDataURL(file);

        return deferred.promise;
      };

      var upload = function(file) {
        readAsDataURL(file).then(
          function(dataUrl){
            $scope.dataUrl = dataUrl;
          }
        );

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
          $scope.files = [];
          $scope.dataUrl = '';
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
          $scope.files = [];
          $scope.dataUrl = '';
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
