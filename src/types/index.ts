export enum LogLevel {
  SILENT = 'silent',
  VERBOSE = 'verbose',
  SELECTIVE = 'selective',
}

export enum Externalize {
  ALL = 'all',
  PEER = 'peer',
  NONE = 'none',
}

export enum OutputFormats {
  ES = 'es',
  CJS = 'cjs',
  IIFE = 'iife',
  UMD = 'umd',
}

export type CommonOptions = {
  config: string;
  emit: LogLevel;
};

export type DevOptions = {
  htmlTemplatePath?: string;
};

export interface BuildOptions extends CommonOptions {
  srcRoot?: string; // Defaults to "src"
  input?: string; // Defaults to "index.*"
  external?: Externalize | string[]; // Defaults to "all"
  globals?: Record<string, string>;
  outDir?: string;
  rollupConfig?: string;
  watch?: boolean;
  dev?: DevOptions;
  outputFormats?: OutputFormats[];
}
