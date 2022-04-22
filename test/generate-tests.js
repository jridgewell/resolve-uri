/* eslint-env node */
/* eslint-disable @typescript-eslint/no-var-requires */

const { writeFileSync } = require('fs');
const { normalize } = require('path');
const prettier = require('prettier');
const prettierConfig = require('./prettier.config.js');

const buffer = [
  `const resolve = require('../');\n`,
  `const assert = require('assert');`
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
  if (url.startsWith('file://') && !url.startsWith('file:///')) {
    index = url.indexOf('/', 'file://'.length);
  } else if (url.startsWith('file:')) {
    return 'file://';
  } else if (url.startsWith('https://')) {
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
  if (url.startsWith('file:')) return 'file:';
  if (url.startsWith('https://')) return 'https:';
  return '';
}

function getPath(base, input) {
  let b = base;
  const origin = getOrigin(b);
  if (origin) {
    if (b.startsWith(origin)) {
      b = b.slice(origin.length);
    } else {
      // file:/foo or file:foo
      b = b.replace(/file:\/*/, '');
    }
  }
  b = normalize(b || '');
  if (base?.endsWith('/..')) b += '/';
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
  if (base.startsWith('file:')) return new URL(base).href;
  if (base.startsWith('https://')) return new URL(base).href;
  if (base.startsWith('//')) {
    return new URL('https:' + base).href.slice('https:'.length);
  }
  let b = normalize(base);
  if (b === './') return '.';
  if (b.endsWith('../')) b = b.slice(0, -1);
  return b.startsWith('.') || !base.startsWith('.') ? b : `./${b}`;
}

function maybeDropHost(host, base) {
  // if (base?.startsWith('file://')) return '';
  return host;
}

function suite(base) {
  const init = JSON.stringify(base);
  buffer.push(`
      describe(\`base = ${init}\`, () => {
        describe('with absolute input', () => {
          it('returns input', () => {
            const base = ${init};
            const input = 'https://absolute.com/main.js.map';
            const resolved = resolve(input, base);
            assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
          });

          it('normalizes input', () => {
            const base = ${init};
            const input = 'https://absolute.com/foo/./bar/../main.js.map';
            const resolved = resolve(input, base);
            assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
          });

          it('normalizes pathless input', () => {
            const base = ${init};
            const input = 'https://absolute.com';
            const resolved = resolve(input, base);
            assert.strictEqual(resolved, 'https://absolute.com/');
          });

          it('normalizes current directory', () => {
            const base = ${init};
            const input = 'https://absolute.com/./main.js.map';
            const resolved = resolve(input, base);
            assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
          });

          it('normalizes too many parent accessors', () => {
            const base = ${init};
            const input = 'https://absolute.com/../../../main.js.map';
            const resolved = resolve(input, base);
            assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
          });

          it('normalizes too many parent accessors, late', () => {
            const base = ${init};
            const input = 'https://absolute.com/foo/../../../main.js.map';
            const resolved = resolve(input, base);
            assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
          });

          it('normalizes file protocol 1', () => {
            const base = ${init};
            const input = 'file:///root/main.js.map';
            const resolved = resolve(input, base);
            assert.strictEqual(resolved, 'file:///root/main.js.map');
          });

          it('normalizes file protocol 2', () => {
            const base = ${init};
            const input = 'file://root/main.js.map';
            const resolved = resolve(input, base);
            assert.strictEqual(resolved, 'file://root/main.js.map');
          });

          it('normalizes file protocol 2.5', () => {
            const base = ${init};
            const input = 'file://root';
            const resolved = resolve(input, base);
            assert.strictEqual(resolved, 'file://root/');
          });

          it('normalizes file protocol 3', () => {
            const base = ${init};
            const input = 'file:/root/main.js.map';
            const resolved = resolve(input, base);
            assert.strictEqual(resolved, 'file:///root/main.js.map');
          });

          it('normalizes file protocol 4', () => {
            const base = ${init};
            const input = 'file:root/main.js.map';
            const resolved = resolve(input, base);
            assert.strictEqual(resolved, 'file:///root/main.js.map');
          });

          it('normalizes windows file 1', () => {
            const base = ${init};
            const input = 'file:///C:/root/main.js.map';
            const resolved = resolve(input, base);
            assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
          });

          it('normalizes windows file 2', () => {
            const base = ${init};
            const input = 'file://C:/root/main.js.map';
            const resolved = resolve(input, base);
            assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
          });

          it('normalizes windows file 3', () => {
            const base = ${init};
            const input = 'file:/C:/root/main.js.map';
            const resolved = resolve(input, base);
            assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
          });

          it('normalizes windows file 4', () => {
            const base = ${init};
            const input = 'file:C:/root/main.js.map';
            const resolved = resolve(input, base);
            assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
          });
        });

        describe('with protocol relative input', () => {
          it('resolves relative to the base protocol', () => {
            const base = ${init};
            const input = '//protocol-relative.com/main.js.map';
            const resolved = resolve(input, base);
            assert.strictEqual(resolved, '${getProtocol(base)}//${maybeDropHost('protocol-relative.com', base)}/main.js.map');
          });

          it('normalizes input', () => {
            const base = ${init};
            const input = '//protocol-relative.com/foo/./bar/../main.js.map';
            const resolved = resolve(input, base);
            assert.strictEqual(resolved, '${getProtocol(base)}//${maybeDropHost('protocol-relative.com', base)}/foo/main.js.map');
          });

          it('normalizes pathless input', () => {
            const base = ${init};
            const input = '//protocol-relative.com';
            const resolved = resolve(input, base);
            assert.strictEqual(resolved, '${getProtocol(base)}//${maybeDropHost('protocol-relative.com', base)}/');
          });

          it('normalizes current directory', () => {
            const base = ${init};
            const input = '//protocol-relative.com/./main.js.map';
            const resolved = resolve(input, base);
            assert.strictEqual(resolved, '${getProtocol(base)}//${maybeDropHost('protocol-relative.com', base)}/main.js.map');
          });

          it('normalizes too many parent accessors', () => {
            const base = ${init};
            const input = '//protocol-relative.com/../main.js.map';
            const resolved = resolve(input, base);
            assert.strictEqual(resolved, '${getProtocol(base)}//${maybeDropHost('protocol-relative.com', base)}/main.js.map');
          });

          it('normalizes too many parent accessors, late', () => {
            const base = ${init};
            const input = '//protocol-relative.com/foo/../../main.js.map';
            const resolved = resolve(input, base);
            assert.strictEqual(resolved, '${getProtocol(base)}//${maybeDropHost('protocol-relative.com', base)}/main.js.map');
          });
        });

        describe('with absolute path input', () => {
          it('remains absolute path', () => {
            const base = ${init};
            const input = '/assets/main.js.map';
            const resolved = resolve(input, base);
            assert.strictEqual(resolved, '${getOrigin(base)}/assets/main.js.map');
          });

          it('trims to root', () => {
            const base = ${init};
            const input = '/';
            const resolved = resolve(input, base);
            assert.strictEqual(resolved, '${getOrigin(base)}/');
          });

          it('normalizes input', () => {
            const base = ${init};
            const input = '/foo/./bar/../main.js.map';
            const resolved = resolve(input, base);
            assert.strictEqual(resolved, '${getOrigin(base)}/foo/main.js.map');
          });

          it('normalizes current directory', () => {
            const base = ${init};
            const input = '/./main.js.map';
            const resolved = resolve(input, base);
            assert.strictEqual(resolved, '${getOrigin(base)}/main.js.map');
          });

          it('normalizes too many parent accessors', () => {
            const base = ${init};
            const input = '/../../../main.js.map';
            const resolved = resolve(input, base);
            assert.strictEqual(resolved, '${getOrigin(base)}/main.js.map');
          });

          it('normalizes too many parent accessors, late', () => {
            const base = ${init};
            const input = '/foo/../../../main.js.map';
            const resolved = resolve(input, base);
            assert.strictEqual(resolved, '${getOrigin(base)}/main.js.map');
          });
        });

        describe('with leading dot relative input', () => {
          it('resolves relative to current directory', () => {
            const base = ${init};
            const input = './bar/main.js.map';
            const resolved = resolve(input, base);
            assert.strictEqual(resolved, '${getOrigin(base)}${getPath(base, './bar/main.js.map')}');
          });

          it('resolves relative to parent directory', () => {
            const base = ${init};
            const input = '../bar/main.js.map';
            const resolved = resolve(input, base);
            assert.strictEqual(resolved, '${getOrigin(base)}${getPath(base, '../bar/main.js.map')}');
          });

          it('resolves relative to parent multiple directory', () => {
            const base = ${init};
            const input = '../../../bar/main.js.map';
            const resolved = resolve(input, base);
            assert.strictEqual(resolved, '${getOrigin(base)}${getPath(base, '../../../bar/main.js.map')}');
          });

          it('normalizes input', () => {
            const base = ${init};
            const input = './foo/./bar/../main.js.map';
            const resolved = resolve(input, base);
            assert.strictEqual(resolved, '${getOrigin(base)}${getPath(base, './foo/./bar/../main.js.map')}');
          });
        });

        describe('with relative input', () => {
          it('resolves relative to current directory', () => {
            const base = ${init};
            const input = 'bar/main.js.map';
            const resolved = resolve(input, base);
            assert.strictEqual(resolved, '${getOrigin(base)}${getPath(base, 'bar/main.js.map')}');
          });

          it('resolves relative to parent multiple directory, later', () => {
            const base = ${init};
            const input = 'foo/../../../bar/main.js.map';
            const resolved = resolve(input, base);
            assert.strictEqual(resolved, '${getOrigin(base)}${getPath(base, 'foo/../../../bar/main.js.map')}');
          });

          it('normalizes input', () => {
            const base = ${init};
            const input = 'foo/./bar/../main.js.map';
            const resolved = resolve(input, base);
            assert.strictEqual(resolved, '${getOrigin(base)}${getPath(base, 'foo/./bar/../main.js.map')}');
          });

          it('resolves node_module scope as path', () => {
            const base = ${init};
            const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
            const resolved = resolve(input, base);
            assert.strictEqual(resolved, '${getOrigin(base)}${getPath(base, 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js')}');
          });

          it('resolves package scope as path', () => {
            const base = ${init};
            const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
            const resolved = resolve(input, base);
            assert.strictEqual(resolved, '${getOrigin(base)}${getPath(base, '@babel/runtime/helpers/esm/arrayLikeToArray.js')}');
          });
        });

        describe('empty input', () => {
          it('normalizes base', () => {
            const base = ${init};
            const input = '';
            const resolved = resolve(input, base);
            assert.strictEqual(resolved, '${base ? normalizeBase(base || '.') : ''}');
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

    suite('file:///foo');
    suite('file:///foo/');
    suite('file:///foo/file');
    suite('file:///foo/dir/');
    suite('file:///foo/dir/file');
    suite('file:///foo/..');
    suite('file:///foo/../');
    suite('file:///foo/dir/..');

    suite('file://foo');
    suite('file://foo/');
    suite('file://foo/file');
    suite('file://foo/dir/');
    suite('file://foo/dir/file');
    suite('file://foo/..');
    suite('file://foo/../');
    suite('file://foo/dir/..');

    suite('file:/foo');
    suite('file:/foo/');
    suite('file:/foo/file');
    suite('file:/foo/dir/');
    suite('file:/foo/dir/file');
    suite('file:/foo/..');
    suite('file:/foo/../');
    suite('file:/foo/dir/..');

    suite('file:foo');
    suite('file:foo/');
    suite('file:foo/file');
    suite('file:foo/dir/');
    suite('file:foo/dir/file');
    suite('file:foo/..');
    suite('file:foo/../');
    suite('file:foo/dir/..');
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

writeFileSync(
  `${__dirname}/resolve-uri.test.js`,
  prettier.format(buffer.join('\n'), {
    ...prettierConfig,
    parser: 'babel',
  }),
);
