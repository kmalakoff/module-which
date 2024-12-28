// remove NODE_OPTIONS from ts-dev-stack
delete process.env.NODE_OPTIONS;

// biome-ignore lint/suspicious/noShadowRestrictedNames: <explanation>
import Promise from 'pinkie-promise';

import assert from 'assert';
import path from 'path';
import url from 'url';
import moduleRoot from 'module-root-sync';

// @ts-ignore
import { whichAll } from 'module-which';

const __dirname = path.dirname(typeof __filename !== 'undefined' ? __filename : url.fileURLToPath(import.meta.url));
const _root = moduleRoot(__dirname);

describe('whichAll', () => {
  const root = typeof global !== 'undefined' ? global : window;
  let rootPromise: Promise;
  before(() => {
    rootPromise = root.Promise;
    root.Promise = Promise;
  });
  after(() => {
    root.Promise = rootPromise;
  });

  it('finds biome twice', (done) => {
    const root = moduleRoot(__dirname);
    whichAll(['biome', 'biome'], (err, commands) => {
      if (err) return done(err);
      assert.equal(commands[0], path.join(root, 'node_modules', '.bin', 'biome'));
      assert.equal(commands[1], path.join(root, 'node_modules', '.bin', 'biome'));
      done();
    });
  });
  it('finds biome twice (promise)', async () => {
    const root = moduleRoot(__dirname);
    const commands = await whichAll(['biome', 'biome']);
    assert.equal(commands[0], path.join(root, 'node_modules', '.bin', 'biome'));
    assert.equal(commands[1], path.join(root, 'node_modules', '.bin', 'biome'));
  });
});
