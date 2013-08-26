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
      '    <img ng-src="{{cover}}" alt="cover" ng-show="cover"/>' +
      '  </div>' +
      '</div>' +
      '</section>',
    restrict: 'E',
    scope: {
      'cover': '='
    },
    controller: function($scope, $element) {

      $scope.image = {};

      var dropTextOK = 'Select an image';
      var dropTextFAIL = 'Only images are allowed!';
      $scope.dropText = dropTextOK;
      var MAX_WIDTH = 100;
      var MAX_HEIGHT = 100;

      var dropbox = $element.find('#dropbox')[0];
      dropbox.addEventListener('click', function() {
        $element.find('input[type=file]')[0].click();
      }, false);

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
            console.log(dataUrl);
            $scope.cover = dataUrl;
          }
        );

        var fd = new FormData();
        fd.append('image', file);
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/upload');

        xhr.upload.onprogress = function(e) {
          if (e.lengthComputable) {
            var percentage = (e.loaded / e.total) * 100;
            console.log(percentage + '%');
          }
        };

        xhr.onerror = function() {
          console.error('An error occurred while submitting the form.', this.statusText);
        };

        xhr.onload = function(e) {

          if (this.status === 200) {
            var data = JSON.parse(e.target.responseText);
            console.log(data);

            $scope.$apply(function(){
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
        $scope.dropText = dropTextOK;
        $scope.dropClass = '';

        if (element.files.length) {
          $scope.files = [];
          $scope.dataUrl = '';
        }

        var file = element.files[0];

        upload(file);
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
          upload(file);
        }
        else {
          $scope.dropText = dropTextFAIL;
          $scope.dropClass = 'dropbox-not-available';
        }
      }, false);
    }
  };
});
