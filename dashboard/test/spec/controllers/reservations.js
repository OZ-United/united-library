'use strict';

describe('Controller: ReservationsCtrl', function () {

  // load the controller's module
  beforeEach(module('dashboardApp'));

  var ReservationsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ReservationsCtrl = $controller('ReservationsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
