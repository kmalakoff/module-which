// remove NODE_OPTIONS from ts-dev-stack
delete process.env.NODE_OPTIONS;

// biome-ignore lint/suspicious/noShadowRestrictedNames: <explanation>
import Promise from 'pinkie-promise';

import assert from 'assert';
import path from 'path';
import url from 'url';
import moduleRoot from 'module-root-sync';

// @ts-ignore
import which from 'module-which';

const __dirname = path.dirname(typeof __filename !== 'undefined' ? __filename : url.fileURLToPath(import.meta.url));

describe('which', () => {
  const root = typeof global !== 'undefined' ? global : window;
  let rootPromise: Promise;
  before(() => {
    rootPromise = root.Promise;
    root.Promise = Promise;
  });
  after(() => {
    root.Promise = rootPromise;
  });

  it('finds biome', (done) => {
    which('biome', (err, biome) => {
      const root = moduleRoot(__dirname);
      if (err) return done(err);
      assert.equal(biome, path.join(root, 'node_modules', '.bin', 'biome'));
      done();
    });
  });

  it('finds biome (promise)', async () => {
    const root = moduleRoot(__dirname);
    const biome = await which('biome');
    assert.equal(biome, path.join(root, 'node_modules', '.bin', 'biome'));
  });
});
