'use strict';

describe('Directive: draganddrop', function () {
  beforeEach(module('adminApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<draganddrop></draganddrop>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the draganddrop directive');
  }));
});
