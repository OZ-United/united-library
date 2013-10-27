'use strict';

describe('Controller: RentsRentidCtrl', function () {

  // load the controller's module
  beforeEach(module('dashboardApp'));

  var RentsRentidCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RentsRentidCtrl = $controller('RentsRentidCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
