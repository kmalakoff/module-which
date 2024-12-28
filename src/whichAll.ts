import Queue from 'queue-cb';
import which from './which.js';

function worker(commands, options, callback) {
  const results = {};
  const queue = new Queue();
  commands.forEach((name) => {
    queue.defer((cb) =>
      which(name, options, (err, result) => {
        if (err) return cb(err);
        results[name] = result;
        cb();
      })
    );
  });
  queue.await((err) => {
    if (err) return callback(err);
    callback(
      null,
      commands.map((name) => results[name])
    );
  });
}

import type { WhichCallback, WhichOptions } from './types.js';

export default function whichAll(commands: string[], options?: WhichOptions | WhichCallback, callback?: WhichCallback): undefined | Promise<string> {
  if (typeof options === 'function') {
    callback = options as WhichCallback;
    options = {};
  }
  options = options || {};

  if (typeof callback === 'function') return worker(commands, options, callback) as undefined;
  return new Promise((resolve, reject) => {
    worker(commands, options, (err, restore) => {
      err ? reject(err) : resolve(restore);
    });
  });
}
