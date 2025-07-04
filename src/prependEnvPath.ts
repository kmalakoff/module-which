import envPathKey from 'env-path-key';
import path from 'path';
import prepend from 'path-string-prepend';
import url from 'url';
import modulePaths from './modulePaths.cjs';

const __dirname = path.dirname(typeof __filename === 'undefined' ? url.fileURLToPath(import.meta.url) : __filename);
const binPath = path.join(__dirname, '..', '..', 'node_modules', '.bin');

import type { PrependResult, WhichOptions } from './types.ts';

export default function prependPath(options: WhichOptions = {}): PrependResult {
  const env = options.env || process.env;
  const pathKey = envPathKey({ env }) || '';

  let envPath: string = env[pathKey] || '';
  const paths = modulePaths();
  for (let i = 1; i < paths.length; i++) {
    envPath = prepend(envPath, path.join(paths[i], '.bin')) as string;
  }
  envPath = prepend(envPath, binPath) as string;

  return { envPath, pathKey };
}
