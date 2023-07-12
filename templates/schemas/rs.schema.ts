export type RsSchema = {
  srcRoot: string;
  input?: string;
  outputFormats: ('es' | 'esm' | 'cjs' | 'umd' | 'iife')[];
  globals?: {
    [propType: string]: string;
  };
  external?: string[] | 'all' | 'peer' | 'none';
  outDir?: string;
  rollupConfig?: string;
};
