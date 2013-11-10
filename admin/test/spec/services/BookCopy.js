'use strict';

describe('Service: BookCopy', function () {

  // load the service's module
  beforeEach(module('adminApp'));

  // instantiate service
  var BookCopy;
  beforeEach(inject(function (_BookCopy_) {
    BookCopy = _BookCopy_;
  }));

  it('should do something', function () {
    expect(!!BookCopy).toBe(true);
  });

});
