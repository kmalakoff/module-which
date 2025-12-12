import assert from 'assert';
import which from 'module-which';
import path from 'path';
import Pinkie from 'pinkie-promise';
import url from 'url';

const __dirname = path.dirname(typeof __filename !== 'undefined' ? __filename : url.fileURLToPath(import.meta.url));
const nodeModules = path.join(__dirname, '..', '..', 'node_modules');

describe('which', () => {
  (() => {
    // patch and restore promise
    if (typeof global === 'undefined') return;
    const globalPromise = global.Promise;
    before(() => {
      global.Promise = Pinkie;
    });
    after(() => {
      global.Promise = globalPromise;
    });
  })();

  it('finds which', (done) => {
    which('which', (err, cmd) => {
      if (err) {
        done(err);
        return;
      }
      assert.equal(cmd.indexOf(path.join(nodeModules, '.bin', 'which')), 0);
      done();
    });
  });

  it('finds which (promise)', async () => {
    const cmd = await which('which');
    assert.equal(cmd.indexOf(path.join(nodeModules, '.bin', 'which')), 0);
  });
});
