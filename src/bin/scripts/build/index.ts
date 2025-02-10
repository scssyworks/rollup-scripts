import type { ArgumentsCamelCase } from 'yargs';
import type { BuildOptions } from '../../../types/index.js';

export function build(args: ArgumentsCamelCase<BuildOptions>) {
  console.log('build', args);
}
