'use strict';

angular.module('adminApp')
.directive('infinitescroll', [ '$window', function ($window) {
  return {
    link: function (scope, element, attrs) {
      var offset = parseInt(attrs.threshold) || 0;
      var e = element[0];

      window.onscroll = function () {
          console.log(scope.$eval(attrs.canload), e.scrollTop + e.offsetHeight, e.scrollHeight - offset, e.scrollTop + e.offsetHeight >= e.scrollHeight - offset);
          if (scope.$eval(attrs.canload) && e.scrollTop + e.offsetHeight >= e.scrollHeight - offset) {
            console.log('eval');
            scope.$apply(attrs.infinitescroll);
          }
      };
    }
  };
}]);
