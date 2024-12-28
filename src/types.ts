export interface WhichOptions {
  cwd?: string;
  env?: NodeJS.ProcessEnv;
}

export type WhichCallback = (err?: Error, resolved?: string) => void;
