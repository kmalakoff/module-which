import assert from 'assert';

// @ts-ignore
import which, { whichAll } from 'module-which';

describe('exports .ts', () => {
  it('defaults', () => {
    assert.equal(typeof which, 'function');
    assert.equal(typeof whichAll, 'function');
  });
});
