import assert from 'assert';
import which, { whichAll } from 'module-which';

describe('exports .mjs', () => {
  it('defaults', () => {
    assert.equal(typeof which, 'function');
    assert.equal(typeof whichAll, 'function');
  });
});
