const fs = require('fs');
const { normalize } = require('path');
const prettier = require('prettier');

const buffer = [
  `import resolve from '../src/resolve-uri';`,
  `import { test, describe } from './setup';\n`,
];
function describe(name, fn) {
  buffer.push(`
    describe('${name}', () => {`);

  fn();

  buffer.push(`
    });
  `);
}

function getOrigin(url) {
  let index = 0;
  if (!url) return '';
  if (url.startsWith('https://')) {
    index = url.indexOf('/', 'https://'.length);
  } else if (url.startsWith('//')) {
    index = url.indexOf('/', '//'.length);
  } else {
    return '';
  }
  if (index === -1) return url;
  return url.slice(0, index);
}

function getProtocol(url) {
  if (!url) return '';
  if (url.startsWith('https://')) return 'https:';
  return '';
}

function getPath(base, input) {
  let b = base;
  const origin = getOrigin(b);
  if (origin) b = b.slice(origin.length);
  b = normalize(b || '');
  b = b.replace(/(^|\/)((?!\/|(?<=(^|\/))\.\.(?=(\/|$))).)*$/, '$1');
  if (b && !b.endsWith('/')) b += '/';
  let relative = normalize(b + input);
  if (origin) {
    relative = relative.replace(/^(\.{1,2}\/)+/, '/');
    if (!relative.startsWith('/')) relative = '/' + relative;
  } else if (!relative.startsWith('.') && (base || input).startsWith('.')) {
    return './' + relative;
  }
  return relative;
}

function normalizeBase(base) {
  if (base.startsWith('https://')) return new URL(base).href;
  if (base.startsWith('//')) {
    return new URL('https:' + base).href.slice('https:'.length);
  }
  let b = normalize(base);
  if (b === './') return '.';
  if (b.endsWith('../')) b = b.slice(0, -1);
  return b.startsWith('.') || !base.startsWith('.') ? b : `./${b}`;
}

function suite(base) {
  const init = JSON.stringify(base);
  buffer.push(`
      describe(\`base = ${init}\`, () => {
        describe('with absolute input', () => {
          test('returns input', (t) => {
            const base = ${init};
            const input = 'https://absolute.com/main.js.map';
            const resolved = resolve(input, base);
            t.is(resolved, 'https://absolute.com/main.js.map');
          });

          test('normalizes input', (t) => {
            const base = ${init};
            const input = 'https://absolute.com/foo/./bar/../main.js.map';
            const resolved = resolve(input, base);
            t.is(resolved, 'https://absolute.com/foo/main.js.map');
          });

          test('normalizes pathless input', (t) => {
            const base = ${init};
            const input = 'https://absolute.com';
            const resolved = resolve(input, base);
            t.is(resolved, 'https://absolute.com/');
          });

          test('normalizes current directory', (t) => {
            const base = ${init};
            const input = 'https://absolute.com/./main.js.map';
            const resolved = resolve(input, base);
            t.is(resolved, 'https://absolute.com/main.js.map');
          });

          test('normalizes too many parent accessors', (t) => {
            const base = ${init};
            const input = 'https://absolute.com/../../../main.js.map';
            const resolved = resolve(input, base);
            t.is(resolved, 'https://absolute.com/main.js.map');
          });

          test('normalizes too many parent accessors, late', (t) => {
            const base = ${init};
            const input = 'https://absolute.com/foo/../../../main.js.map';
            const resolved = resolve(input, base);
            t.is(resolved, 'https://absolute.com/main.js.map');
          });
        });

        describe('with protocol relative input', () => {
          test('resolves relative to the base protocol', (t) => {
            const base = ${init};
            const input = '//protocol-relative.com/main.js.map';
            const resolved = resolve(input, base);
            t.is(resolved, '${getProtocol(base)}//protocol-relative.com/main.js.map');
          });

          test('normalizes input', (t) => {
            const base = ${init};
            const input = '//protocol-relative.com/foo/./bar/../main.js.map';
            const resolved = resolve(input, base);
            t.is(resolved, '${getProtocol(base)}//protocol-relative.com/foo/main.js.map');
          });

          test('normalizes pathless input', (t) => {
            const base = ${init};
            const input = '//protocol-relative.com';
            const resolved = resolve(input, base);
            t.is(resolved, '${getProtocol(base)}//protocol-relative.com/');
          });

          test('normalizes current directory', (t) => {
            const base = ${init};
            const input = '//protocol-relative.com/./main.js.map';
            const resolved = resolve(input, base);
            t.is(resolved, '${getProtocol(base)}//protocol-relative.com/main.js.map');
          });

          test('normalizes too many parent accessors', (t) => {
            const base = ${init};
            const input = '//protocol-relative.com/../main.js.map';
            const resolved = resolve(input, base);
            t.is(resolved, '${getProtocol(base)}//protocol-relative.com/main.js.map');
          });

          test('normalizes too many parent accessors, late', (t) => {
            const base = ${init};
            const input = '//protocol-relative.com/foo/../../main.js.map';
            const resolved = resolve(input, base);
            t.is(resolved, '${getProtocol(base)}//protocol-relative.com/main.js.map');
          });
        });

        describe('with absolute path input', () => {
          test('remains absolute path', (t) => {
            const base = ${init};
            const input = '/assets/main.js.map';
            const resolved = resolve(input, base);
            t.is(resolved, '${getOrigin(base)}/assets/main.js.map');
          });

          test('trims to root', (t) => {
            const base = ${init};
            const input = '/';
            const resolved = resolve(input, base);
            t.is(resolved, '${getOrigin(base)}/');
          });

          test('normalizes input', (t) => {
            const base = ${init};
            const input = '/foo/./bar/../main.js.map';
            const resolved = resolve(input, base);
            t.is(resolved, '${getOrigin(base)}/foo/main.js.map');
          });

          test('normalizes current directory', (t) => {
            const base = ${init};
            const input = '/./main.js.map';
            const resolved = resolve(input, base);
            t.is(resolved, '${getOrigin(base)}/main.js.map');
          });

          test('normalizes too many parent accessors', (t) => {
            const base = ${init};
            const input = '/../../../main.js.map';
            const resolved = resolve(input, base);
            t.is(resolved, '${getOrigin(base)}/main.js.map');
          });

          test('normalizes too many parent accessors, late', (t) => {
            const base = ${init};
            const input = '/foo/../../../main.js.map';
            const resolved = resolve(input, base);
            t.is(resolved, '${getOrigin(base)}/main.js.map');
          });
        });

        describe('with leading dot relative input', () => {
          test('resolves relative to current directory', (t) => {
            const base = ${init};
            const input = './bar/main.js.map';
            const resolved = resolve(input, base);
            t.is(resolved, '${getOrigin(base)}${getPath(base, './bar/main.js.map')}');
          });

          test('resolves relative to parent directory', (t) => {
            const base = ${init};
            const input = '../bar/main.js.map';
            const resolved = resolve(input, base);
            t.is(resolved, '${getOrigin(base)}${getPath(base, '../bar/main.js.map')}');
          });

          test('resolves relative to parent multiple directory', (t) => {
            const base = ${init};
            const input = '../../../bar/main.js.map';
            const resolved = resolve(input, base);
            t.is(resolved, '${getOrigin(base)}${getPath(base, '../../../bar/main.js.map')}');
          });

          test('normalizes input', (t) => {
            const base = ${init};
            const input = './foo/./bar/../main.js.map';
            const resolved = resolve(input, base);
            t.is(resolved, '${getOrigin(base)}${getPath(base, './foo/./bar/../main.js.map')}');
          });
        });

        describe('with relative input', () => {
          test('resolves relative to current directory', (t) => {
            const base = ${init};
            const input = 'bar/main.js.map';
            const resolved = resolve(input, base);
            t.is(resolved, '${getOrigin(base)}${getPath(base, 'bar/main.js.map')}');
          });

          test('resolves relative to parent multiple directory, later', (t) => {
            const base = ${init};
            const input = 'foo/../../../bar/main.js.map';
            const resolved = resolve(input, base);
            t.is(resolved, '${getOrigin(base)}${getPath(base, 'foo/../../../bar/main.js.map')}');
          });

          test('normalizes input', (t) => {
            const base = ${init};
            const input = 'foo/./bar/../main.js.map';
            const resolved = resolve(input, base);
            t.is(resolved, '${getOrigin(base)}${getPath(base, 'foo/./bar/../main.js.map')}');
          });
        });

        describe('empty input', () => {
          test('normalizes base', (t) => {
            const base = ${init};
            const input = '';
            const resolved = resolve(input, base);
            t.is(resolved, '${normalizeBase(base || '.', '')}');
          });
        });
      });
    `);
}

describe('resolve', () => {
  describe('without base', () => {
    suite(undefined);
    suite('');
  });

  describe('with absolute base', () => {
    suite('https://foo.com');
    suite('https://foo.com/');
    suite('https://foo.com/file');
    suite('https://foo.com/dir/');
    suite('https://foo.com/dir/file');
    suite('https://foo.com/..');
    suite('https://foo.com/../');
    suite('https://foo.com/dir/..');
  });

  describe('with protocol relative base', () => {
    suite('//foo.com');
    suite('//foo.com/');
    suite('//foo.com/file');
    suite('//foo.com/dir/');
    suite('//foo.com/dir/file');
    suite('//foo.com/..');
    suite('//foo.com/../');
    suite('//foo.com/dir/..');
  });

  describe('with path absolute base', () => {
    suite('/');
    suite('/root');
    suite('/root/');
    suite('/root/file');
    suite('/root/dir/');
    suite('/..');
    suite('/../');
    suite('/root/..');
    suite('/root/../');
  });

  describe('with relative base', () => {
    suite('file');
    suite('dir/');
    suite('dir/file');
    suite('deep/dir/');
    suite('./file');
    suite('./dir/');
    suite('./deep/file');
    suite('./deep/dir/');
    suite('../file');
    suite('../dir/');
    suite('../deep/file');
    suite('../deep/dir/');
    suite('..');
    suite('../');
    suite('dir/..');
    suite('deep/../');
    suite('./..');
    suite('./../');
    suite('./deep/..');
    suite('./deep/../');
    suite('../..');
    suite('../../');
    suite('../deep/..');
    suite('../deep/../');
  });
});

fs.writeFileSync(
  `${__dirname}/resolve-uri.test.ts`,
  prettier.format(buffer.join('\n'), {
    parser: 'babel',
  }),
);
