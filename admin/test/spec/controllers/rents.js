'use strict';

describe('Controller: RentsCtrl', function () {

  // load the controller's module
  beforeEach(module('adminApp'));

  var RentsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RentsCtrl = $controller('RentsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
