'use strict';

describe('Controller: BooksBookidCtrl', function () {

  // load the controller's module
  beforeEach(module('dashboardApp'));

  var BooksBookidCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BooksBookidCtrl = $controller('BooksBookidCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
