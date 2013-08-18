'use strict';

angular.module('adminApp')
  .controller('RentsCtrl', function ($scope, Rents) {
  $scope.rents = Rents.query();


});
