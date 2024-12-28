import path from 'path';
import url from 'url';
import envPathKey from 'env-path-key';
import moduleRoot from 'module-root-sync';
import prepend from 'path-string-prepend';
import which from 'which';

const __dirname = path.dirname(typeof __filename !== 'undefined' ? __filename : url.fileURLToPath(import.meta.url));
let root = null;

const NODES = ['node', 'node.exe', 'node.cmd'];

function worker(command, options, callback) {
  if (!root) root = moduleRoot(__dirname);
  const cwd = options.cwd || process.cwd();
  const env = options.env || process.env;
  const pathKey = envPathKey(env) || '';
  let envPath = env[pathKey] || '';
  envPath = prepend(envPath, path.resolve(cwd, 'node_modules', '.bin'));
  envPath = prepend(envPath, path.resolve(root, '..', '.bin'));

  if (NODES.indexOf(path.basename(command).toLowerCase()) >= 0) {
    if (env.NODE || env.npm_node_execpath) return callback(null, env.NODE || env.npm_node_execpath);
  }

  // look up the full path
  which(command, { path: envPath }, (err, found) => {
    err ? callback(err) : callback(null, found);
  });
}

import type { WhichCallback, WhichOptions } from './types.js';

export default function moduleWhich(command: string, options?: WhichOptions | WhichCallback, callback?: WhichCallback): undefined | Promise<string> {
  if (typeof options === 'function') {
    callback = options as WhichCallback;
    options = {};
  }
  options = options || {};

  if (typeof callback === 'function') return worker(command, options, callback) as undefined;
  return new Promise((resolve, reject) => {
    worker(command, options, (err, restore) => {
      err ? reject(err) : resolve(restore);
    });
  });
}
