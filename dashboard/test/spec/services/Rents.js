'use strict';

describe('Service: Rents', function () {

  // load the service's module
  beforeEach(module('dashboardApp'));

  // instantiate service
  var Rents;
  beforeEach(inject(function (_Rents_) {
    Rents = _Rents_;
  }));

  it('should do something', function () {
    expect(!!Rents).toBe(true);
  });

});
