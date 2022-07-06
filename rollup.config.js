import { readdirSync } from 'fs';
import typescript from '@rollup/plugin-typescript';

const input = readdirSync('./src')
  .filter((f) => f !== 'helpers.ts' && f.endsWith('.ts'))
  .map((f) => 'src/' + f);

function configure(format, input) {
  const output =
    format === 'esm'
      ? {
          format,
          dir: 'dist',
          entryFileNames: '[name].mjs',
          chunkFileNames: '[name]-[hash].mjs',
          sourcemap: true,
        }
      : format === 'cjs'
      ? {
          format,
          dir: 'dist',
          entryFileNames: '[name].cjs.js',
          chunkFileNames: '[name]-[hash].cjs.js',
          sourcemap: true,
          exports: 'auto',
        }
      : format === 'umd'
      ? {
          format,
          name: input.endsWith('relative.ts')
            ? 'relativeURI'
            : input.endsWith('resolve-uri.ts')
            ? 'resolveURI'
            : () => {
                throw new Error(`unexpected input file "${input}"`);
              },
          dir: 'dist',
          entryFileNames: '[name].umd.js',
          sourcemap: true,
          exports: 'named',
        }
      : () => {
          throw new Error(`unknown format "${format}"`);
        };
  return {
    input,
    output,
    plugins: [
      typescript({
        tsconfig: './tsconfig.build.json',
        tslib: './throw-when-needed',
      }),
    ],
    watch: {
      include: 'src/**',
    },
  };
}

export default [
  configure('esm', input),
  configure('cjs', input),
  ...input.map((f) => configure('umd', f)),
];
