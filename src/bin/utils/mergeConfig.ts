import type { ArgumentsCamelCase } from 'yargs';
import { LogLevel, type CommonOptions } from '../../types/index.js';
import fs from 'node:fs';
import { resolvePath } from 'rollup-scripts-utils';

export function mergeConfig<T extends CommonOptions>(
  handler: (args: ArgumentsCamelCase<T>) => void,
) {
  return (args: ArgumentsCamelCase<T>) => {
    // result config file
    try {
      const config = fs.readFileSync(resolvePath(args.config), {
        encoding: 'utf-8',
      });
      const options: T = JSON.parse(config);
      handler({ ...options, ...args }); // This will allow overriding config options with inline options
    } catch (e) {
      if (args.emit === LogLevel.VERBOSE) {
        console.error(e);
      }
      handler(args);
    }
  };
}
