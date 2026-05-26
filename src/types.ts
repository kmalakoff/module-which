export interface WhichOptions {
  cwd?: string;
  env?: NodeJS.ProcessEnv;
  root?: string;
}

export type WhichCallback = (err?: Error | null, resolved?: string) => void;

export interface PrependResult {
  envPath: string;
  pathKey: string;
}
