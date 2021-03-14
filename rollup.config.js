import typescript from '@rollup/plugin-typescript';

function configure(esm) {
  return {
    input: 'src/resolve-uri.ts',
    output: esm
      ? { format: 'es', dir: 'dist', entryFileNames: '[name].mjs', sourcemap: true }
      : { format: 'umd', name: 'resolveURI', dir: 'dist', entryFileNames: '[name].umd.js', sourcemap: true },
    plugins: [
      typescript({ tsconfig: './tsconfig.build.json' }),
    ],
    watch: {
      include: 'src/**',
    },
  };
}

export default [configure(false), configure(true)];
