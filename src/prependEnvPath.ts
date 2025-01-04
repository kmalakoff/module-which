import path from 'path';
import url from 'url';
import envPathKey from 'env-path-key';
import moduleRoot from 'module-root-sync';
import prepend from 'path-string-prepend';
import modulePaths from './modulePaths.cjs';

const __dirname = path.dirname(typeof __filename === 'undefined' ? url.fileURLToPath(import.meta.url) : __filename);
const root = moduleRoot(__dirname);

import type { PrependResult, WhichOptions } from './types';

export default function prependPath(options: WhichOptions = {}): PrependResult {
  const env = options.env || process.env;
  const pathKey = envPathKey(env) || '';
  let envPath = env[pathKey] || '';

  const paths = modulePaths();

  for (let i = 1; i < paths.length; i++) {
    envPath = prepend(envPath, path.join(paths[i], '.bin'));
  }
  envPath = prepend(envPath, path.join(root, 'node_modules', '.bin'));

  return { envPath, pathKey };
}
