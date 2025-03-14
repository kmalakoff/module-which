import assert from 'assert';
import path from 'path';
import url from 'url';
import Pinkie from 'pinkie-promise';

// @ts-ignore
import which from 'module-which';

const __dirname = path.dirname(typeof __filename !== 'undefined' ? __filename : url.fileURLToPath(import.meta.url));
const nodeModules = path.join(__dirname, '..', '..', 'node_modules');

describe('which', () => {
  (() => {
    // patch and restore promise
    // @ts-ignore
    let rootPromise: Promise;
    before(() => {
      rootPromise = global.Promise;
      // @ts-ignore
      global.Promise = Pinkie;
    });
    after(() => {
      global.Promise = rootPromise;
    });
  })();

  it('finds which', (done) => {
    which('which', (err, cmd) => {
      if (err) return done(err.message);
      assert.equal(cmd.indexOf(path.join(nodeModules, '.bin', 'which')), 0);
      done();
    });
  });

  it('finds which (promise)', async () => {
    const cmd = await which('which');
    assert.equal(cmd.indexOf(path.join(nodeModules, '.bin', 'which')), 0);
  });
});
