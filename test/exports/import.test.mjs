import assert from 'assert';
import which, { prependEnvPath } from 'module-which';

describe('exports .mjs', () => {
  it('defaults', () => {
    assert.equal(typeof which, 'function');
    assert.equal(typeof prependEnvPath, 'function');
  });
});
