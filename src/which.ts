import path from 'path';
import which from 'which';
import prependEnvPath from './prependEnvPath.ts';

const NODES = ['node', 'node.exe', 'node.cmd'];

function worker(command, options, callback) {
  if (NODES.indexOf(path.basename(command).toLowerCase()) >= 0) {
    const env = options.env || process.env;
    if (env.NODE || env.npm_node_execpath) return callback(null, env.NODE || env.npm_node_execpath);
  }

  // look up the full path
  const { envPath } = prependEnvPath(options);
  which(command, { path: envPath }, (err, found) => {
    err ? callback(err) : callback(null, found);
  });
}

import type { WhichCallback, WhichOptions } from './types.ts';

export default function moduleWhich(command: string, callback: WhichCallback): void;
export default function moduleWhich(command: string, options: WhichOptions, callback: WhichCallback): void;
export default function moduleWhich(command: string, options?: WhichOptions): Promise<string>;
export default function moduleWhich(command: string, options?: WhichOptions | WhichCallback, callback?: WhichCallback): void | Promise<string> {
  if (typeof options === 'function') {
    callback = options as WhichCallback;
    options = {};
  }
  options = options || {};

  if (typeof callback === 'function') return worker(command, options, callback);
  return new Promise((resolve, reject) => worker(command, options, (err, restore) => (err ? reject(err) : resolve(restore))));
}
