declare module 'which' {
  interface WhichOptions {
    path: string;
    pathExt?: string;
  }
  function which(cmd: string, options: WhichOptions, callback: (err: Error | null, found: string) => void): void;
  namespace which {
    function sync(cmd: string, options?: WhichOptions): string | null;
  }
  export = which;
}
