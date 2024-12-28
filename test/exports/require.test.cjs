const assert = require('assert');
const which = require('module-which');

describe('exports .cjs', () => {
  it('defaults', () => {
    assert.equal(typeof which, 'function');
    assert.equal(typeof which.whichAll, 'function');
  });
});
