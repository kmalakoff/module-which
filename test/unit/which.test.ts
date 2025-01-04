import assert from 'assert';
import path from 'path';
import url from 'url';
import moduleRoot from 'module-root-sync';
import Pinkie from 'pinkie-promise';

// @ts-ignore
import which from 'module-which';

const __dirname = path.dirname(typeof __filename !== 'undefined' ? __filename : url.fileURLToPath(import.meta.url));
const root = moduleRoot(__dirname);

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

  it('finds biome', (done) => {
    which('biome', (err, biome) => {
      if (err) return done(err);
      assert.equal(biome.indexOf(path.join(root, 'node_modules', '.bin', 'biome')), 0);
      done();
    });
  });

  it('finds biome (promise)', async () => {
    const biome = await which('biome');
    assert.equal(biome.indexOf(path.join(root, 'node_modules', '.bin', 'biome')), 0);
  });
});
