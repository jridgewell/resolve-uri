const { readFileSync, mkdirSync, writeFileSync } = require('fs');
const { posix, win32 } = require('path');
const { cwd, chdir } = require('process');
const prettier = require('prettier');
const prettierConfig = require('./prettier.config.js');

/** @type {function(string, string=): string} */
const resolve = /** @type {any} */ (require('@jridgewell/resolve-uri-latest'));

/** @type {function(string, string): string} */
const relative = /** @type {any} */ (require('@jridgewell/resolve-uri-latest/relative'));

let buffer = [];

/**
 * @param {string | undefined} url
 */
function getOrigin(url) {
  let index = 0;
  if (!url) return '';
  if (url.startsWith('C:')) return '';
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

/**
 * @param {string | undefined} url
 */
function getProtocol(url) {
  if (!url) return '';
  if (url.startsWith('file:')) return 'file:';
  if (url.startsWith('https://')) return 'https:';
  return '';
}

/**
 * @param {string | undefined} base
 * @param {string} input
 */
function getPath(base, input) {
  const origin = getOrigin(input);
  if (origin) {
    if (origin.startsWith('//')) return new URL('https:' + input).pathname;
    return new URL(input).pathname;
  }

  if (!base) {
    if (input.startsWith('C:')) {
      return toWindows(resolve('file:///' + toPosix(input)).slice('file:///'.length));
    }
    if (input.includes('\\')) {
      return toWindows(resolve(toPosix(input)));
    }
    return resolve(input);
  }

  const bOrigin = getOrigin(base);
  if (bOrigin) {
    if (input.startsWith('C:')) {
      if (bOrigin === 'file://') {
        input = 'file:///' + input;
      } else {
        input = input.slice('C:'.length);
      }
    }
    input = input.replace(/\\\\/g, '/');
    if (bOrigin.startsWith('//')) return new URL(input, 'https:' + base).pathname;
    return new URL(input, base).pathname;
  }

  if (input.startsWith('C:')) {
    return toWindows(new URL('file:///' + toPosix(input)).href.slice('file:///'.length));
  }

  if (base.startsWith('C:')) {
    return toWindows(new URL(toPosix(input), 'file:///' + toPosix(base)).href.slice('file:///'.length));
  }

  if (!base.includes('\\') && !input.includes('\\')) {
    return resolve(input, base);
  }
  base = toPosix(base);
  input = toPosix(input);
  return toWindows(resolve(input, base));
}

/**
 * @param {string | undefined} input
 */
function getQuery(input) {
  if (input === undefined) return '';
  const q = /\?[^#]*/.exec(input);
  return q ? q[0] : '';
}

/**
 * @param {string | undefined} input
 */
function getHash(input) {
  if (input === undefined) return '';
  const h = /#.*/.exec(input);
  return h ? h[0] : '';
}

/**
 * @param {string} input
 */
function toPosix(input) {
  return input.replace(/\\{1,2}/g, '/');
}

/**
 * @param {string} input
 */
function toWindows(input) {
  return input.replace(/\//g, '\\\\');
}

/**
 * @param {string | undefined} base
 * @param {string} input
 */
function normalizeBasePath(base, input) {
  if (!base && !input) return '';
  if (base === undefined) return '';
  const strip = base.replace(/[?#].*/, '');

  if (strip.startsWith('file:')) return new URL(strip).href;
  if (strip.startsWith('https://')) return new URL(strip).href;
  if (strip.startsWith('//')) return new URL('https:' + strip).href.slice('https:'.length);

  let b = strip.includes('\\') ? win32.normalize(strip).replace(/\\/g, '/') : posix.normalize(strip);
  if (b === './' || b === '.') {
    if (/^[?#]/.test(input || base)) return '';
    return '.';
  }
  if (b.endsWith('../')) b = b.slice(0, -1);
  if (!b.startsWith('.') && strip.startsWith('.')) b = './' + b;
  return strip.includes('\\') ? b.replace(/\//g, '\\\\') : b;
}

/**
 * @param {string | undefined} base
 * @param {'scheme' | 'host' | 'path' | 'query' | 'hash'} level
 * @return {string}
 */
function extractLeft(base, level) {
  if (base === undefined) return '';
  switch (level) {
    case 'scheme':
      return getProtocol(base);
    case 'host':
      return getOrigin(base);
    case 'path':
      return extractLeft(base, 'host') + getPath(base, base);
    case 'query':
      return extractLeft(base, 'path') + getQuery(base);
    case 'hash':
      return extractLeft(base, 'query') + getHash(base);
  }
  throw new Error('unimplemented ' + level);
}

/**
 * @param {string | undefined} base
 * @param {'scheme' | 'host' | 'path' | 'query' | 'hash'} level
 * @return {string}
 */
function extractRight(base, level) {
  if (base === undefined) return '';
  if (base.startsWith('file:')) base = base.replace(/file:\/{0,3}/, 'file:///');
  const right = base.slice(extractLeft(base, level).length);
  if (right.startsWith('///')) return right.slice(1);
  return right;
}

/**
 * @param {string} name
 * @param {() => void} fn
 */
function dir(name, fn) {
  const old = cwd();
  const dir = name.replace(/ /g, '-');
  try {
    mkdirSync(dir);
  } catch {
    /**/
  }
  chdir(dir);
  fn();
  chdir(old);
}

/**
 * @param {string} name
 * @param {string} importStatement
 * @param {() => void} fn
 */
function file(name, importStatement, fn) {
  buffer = [importStatement, `const assert = require('assert');\n`];

  const outer = posix.relative(__dirname, cwd());
  describe(outer, () => {
    describe(name, fn);
  });

  writeFileSync(
    `${name.replace(/ /g, '-')}.test.js`,
    prettier.format(
      buffer.join('\n'),
      /** @type {any} */ ({
        ...prettierConfig,
        parser: 'babel',
      })
    )
  );
}

/**
 * @param {string} name
 * @param {() => void} fn
 */
function describe(name, fn) {
  buffer.push(`describe(\`${name.replace(/`/g, '\\`')}\`, () => {`);
  fn();
  buffer.push(`});\n`);
}

/**
 * @param {string} name
 * @param {string} fnBody
 */
function it(name, fnBody) {
  buffer.push(`it(\`${name.replace(/`/g, '\\`')}\`, () => {
    ${fnBody}
  });\n`);
}

chdir(__dirname);

/**
 * @param {string} importStatement
 * @param {(base: string|undefined) => void} suite
 */
function testCases(importStatement, suite) {
  file('without base', importStatement, () => {
    suite(undefined);
    suite('');
  });

  file('with absolute base', importStatement, () => {
    suite('https://foo.com');
    suite('https://foo.com/');
    suite('https://foo.com/file');
    suite('https://foo.com/dir/');
    suite('https://foo.com/dir/file');
    suite('https://foo.com/..');
    suite('https://foo.com/../');
    suite('https://foo.com/dir/..');
    suite('https://foo.com/file?baseQuery');
    suite('https://foo.com/file?baseQuery#baseHash');
    suite('https://foo.com/file#baseHash');

    suite('https://g');
    suite('https://g/');
    suite('https://g/file');
    suite('https://g/dir/');
    suite('https://g/dir/file');
    suite('https://g/..');
    suite('https://g/../');
    suite('https://g/dir/..');
    suite('https://g/file?baseQuery');
    suite('https://g/file?baseQuery#baseHash');
    suite('https://g/file#baseHash');

    suite('file:///foo');
    suite('file:///foo/');
    suite('file:///foo/file');
    suite('file:///foo/dir/');
    suite('file:///foo/dir/file');
    suite('file:///foo/..');
    suite('file:///foo/../');
    suite('file:///foo/dir/..');
    suite('file:///foo/file?baseQuery');
    suite('file:///foo/file?baseQuery#baseHash');
    suite('file:///foo/file#baseHash');

    suite('file://foo');
    suite('file://foo/');
    suite('file://foo/file');
    suite('file://foo/dir/');
    suite('file://foo/dir/file');
    suite('file://foo/..');
    suite('file://foo/../');
    suite('file://foo/dir/..');
    suite('file://foo/file?baseQuery');
    suite('file://foo/file?baseQuery#baseHash');
    suite('file://foo/file#baseHash');

    suite('file:/foo');
    suite('file:/foo/');
    suite('file:/foo/file');
    suite('file:/foo/dir/');
    suite('file:/foo/dir/file');
    suite('file:/foo/..');
    suite('file:/foo/../');
    suite('file:/foo/dir/..');
    suite('file:/foo/file?baseQuery');
    suite('file:/foo/file?baseQuery#baseHash');
    suite('file:/foo/file#baseHash');

    suite('file:foo');
    suite('file:foo/');
    suite('file:foo/file');
    suite('file:foo/dir/');
    suite('file:foo/dir/file');
    suite('file:foo/..');
    suite('file:foo/../');
    suite('file:foo/dir/..');
    suite('file:foo/file?baseQuery');
    suite('file:foo/file?baseQuery#baseHash');
    suite('file:foo/file#baseHash');
    suite('file:foo/file?baseQuery');
    suite('file:foo/file?baseQuery#baseHash');
    suite('file:foo/file#baseHash');
    suite('file:file?baseQuery');
    suite('file:file?baseQuery#baseHash');
    suite('file:file#baseHash');
    suite('file:?baseQuery');
    suite('file:?baseQuery#baseHash');
    suite('file:#baseHash');
  });

  file('with protocol relative base', importStatement, () => {
    suite('//foo.com');
    suite('//foo.com/');
    suite('//foo.com/file');
    suite('//foo.com/dir/');
    suite('//foo.com/dir/file');
    suite('//foo.com/..');
    suite('//foo.com/../');
    suite('//foo.com/dir/..');
    suite('//foo.com/file?baseQuery');
    suite('//foo.com/file?baseQuery#baseHash');
    suite('//foo.com/file#baseHash');

    suite('//g');
    suite('//g/');
    suite('//g/file');
    suite('//g/dir/');
    suite('//g/dir/file');
    suite('//g/..');
    suite('//g/../');
    suite('//g/dir/..');
    suite('//g/file?baseQuery');
    suite('//g/file?baseQuery#baseHash');
    suite('//g/file#baseHash');
  });

  file('with absolute path base', importStatement, () => {
    suite('/');
    suite('/root');
    suite('/root/');
    suite('/root/file');
    suite('/root/dir/');
    suite('/..');
    suite('/../');
    suite('/root/..');
    suite('/root/../');
    suite('/root?baseQuery');
    suite('/root?baseQuery#baseHash');
    suite('/root#baseHash');
  });

  file('with relative path base', importStatement, () => {
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
    suite('file?baseQuery');
    suite('file?baseQuery#baseHash');
    suite('file#baseHash');
  });

  file('with query base', importStatement, () => {
    suite('?baseQuery');
    suite('?baseQuery#baseHash');
  });

  file('with hash base', importStatement, () => {
    suite('#baseHash');
  });
}

dir('resolve', () => {
  const importStatement = `const resolve = require('../..');`;

  /**
   * @param {string | undefined} base
   */
  function resolveSuite(base) {
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

          it('returns input with query', () => {
            const base = ${init};
            const input = 'https://absolute.com/main.js.map?input';
            const resolved = resolve(input, base);
            assert.strictEqual(resolved, 'https://absolute.com/main.js.map?input');
          });

          it('normalizes input path', () => {
            const base = ${init};
            const input = 'https://absolute.com/foo/./bar/../main.js.map';
            const resolved = resolve(input, base);
            assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
          });

          it('normalizes input path with query', () => {
            const base = ${init};
            const input = 'https://absolute.com/foo/./bar/../main.js.map?input!webpack://foo/./bar';
            const resolved = resolve(input, base);
            assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map?input!webpack://foo/./bar');
          });

          it('normalizes pathless input', () => {
            const base = ${init};
            const input = 'https://absolute.com';
            const resolved = resolve(input, base);
            assert.strictEqual(resolved, 'https://absolute.com/');
          });

          it('normalizes pathless input with query', () => {
            const base = ${init};
            const input = 'https://absolute.com?input';
            const resolved = resolve(input, base);
            assert.strictEqual(resolved, 'https://absolute.com/?input');
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

          it('normalizes file protocol 1 with query', () => {
            const base = ${init};
            const input = 'file:///root/main.js.map?input';
            const resolved = resolve(input, base);
            assert.strictEqual(resolved, 'file:///root/main.js.map?input');
          });

          it('normalizes file protocol 2 with query', () => {
            const base = ${init};
            const input = 'file://root/main.js.map?input';
            const resolved = resolve(input, base);
            assert.strictEqual(resolved, 'file://root/main.js.map?input');
          });

          it('normalizes file protocol 2.5 with query', () => {
            const base = ${init};
            const input = 'file://root?input';
            const resolved = resolve(input, base);
            assert.strictEqual(resolved, 'file://root/?input');
          });

          it('normalizes file protocol 3 with query', () => {
            const base = ${init};
            const input = 'file:/root/main.js.map?input';
            const resolved = resolve(input, base);
            assert.strictEqual(resolved, 'file:///root/main.js.map?input');
          });

          it('normalizes file protocol 4 with query', () => {
            const base = ${init};
            const input = 'file:root/main.js.map?input';
            const resolved = resolve(input, base);
            assert.strictEqual(resolved, 'file:///root/main.js.map?input');
          });
        });

        describe('with protocol relative input', () => {
          it('resolves relative to the base protocol', () => {
            const base = ${init};
            const input = '//protocol-relative.com/main.js.map';
            const resolved = resolve(input, base);
            assert.strictEqual(resolved, '${getProtocol(base)}//protocol-relative.com/main.js.map');
          });

          it('resolves relative to the base protocol with query', () => {
            const base = ${init};
            const input = '//protocol-relative.com/main.js.map?input';
            const resolved = resolve(input, base);
            assert.strictEqual(resolved, '${getProtocol(base)}//protocol-relative.com/main.js.map?input');
          });

          it('normalizes input path', () => {
            const base = ${init};
            const input = '//protocol-relative.com/foo/./bar/../main.js.map';
            const resolved = resolve(input, base);
            assert.strictEqual(resolved, '${getProtocol(base)}//protocol-relative.com/foo/main.js.map');
          });

          it('normalizes input path with query', () => {
            const base = ${init};
            const input = '//protocol-relative.com/foo/./bar/../main.js.map?input!webpack://foo/./bar';
            const resolved = resolve(input, base);
            assert.strictEqual(resolved, '${getProtocol(base)}//protocol-relative.com/foo/main.js.map?input!webpack://foo/./bar');
          });

          it('normalizes pathless input', () => {
            const base = ${init};
            const input = '//protocol-relative.com';
            const resolved = resolve(input, base);
            assert.strictEqual(resolved, '${getProtocol(base)}//protocol-relative.com/');
          });

          it('normalizes pathless input with query', () => {
            const base = ${init};
            const input = '//protocol-relative.com?input';
            const resolved = resolve(input, base);
            assert.strictEqual(resolved, '${getProtocol(base)}//protocol-relative.com/?input');
          });

          it('normalizes current directory', () => {
            const base = ${init};
            const input = '//protocol-relative.com/./main.js.map';
            const resolved = resolve(input, base);
            assert.strictEqual(resolved, '${getProtocol(base)}//protocol-relative.com/main.js.map');
          });

          it('normalizes too many parent accessors', () => {
            const base = ${init};
            const input = '//protocol-relative.com/../main.js.map';
            const resolved = resolve(input, base);
            assert.strictEqual(resolved, '${getProtocol(base)}//protocol-relative.com/main.js.map');
          });

          it('normalizes too many parent accessors, late', () => {
            const base = ${init};
            const input = '//protocol-relative.com/foo/../../main.js.map';
            const resolved = resolve(input, base);
            assert.strictEqual(resolved, '${getProtocol(base)}//protocol-relative.com/main.js.map');
          });
        });

        describe('with absolute path input', () => {
          it('remains absolute path', () => {
            const base = ${init};
            const input = '/assets/main.js.map';
            const resolved = resolve(input, base);
            assert.strictEqual(resolved, '${getOrigin(base)}${getPath(base, '/assets/main.js.map')}');
          });

          it('remains absolute path with query', () => {
            const base = ${init};
            const input = '/assets/main.js.map?input';
            const resolved = resolve(input, base);
            assert.strictEqual(resolved, '${getOrigin(base)}${getPath(base, '/assets/main.js.map')}?input');
          });

          it('trims to root', () => {
            const base = ${init};
            const input = '/';
            const resolved = resolve(input, base);
            assert.strictEqual(resolved, '${getOrigin(base)}${getPath(base, '/')}');
          });

          it('normalizes input path', () => {
            const base = ${init};
            const input = '/foo/./bar/../main.js.map';
            const resolved = resolve(input, base);
            assert.strictEqual(resolved, '${getOrigin(base)}${getPath(base, '/foo/main.js.map')}');
          });

          it('normalizes current directory', () => {
            const base = ${init};
            const input = '/./main.js.map';
            const resolved = resolve(input, base);
            assert.strictEqual(resolved, '${getOrigin(base)}${getPath(base, '/main.js.map')}');
          });

          it('normalizes too many parent accessors', () => {
            const base = ${init};
            const input = '/../../../main.js.map';
            const resolved = resolve(input, base);
            assert.strictEqual(resolved, '${getOrigin(base)}${getPath(base, '/main.js.map')}');
          });

          it('normalizes too many parent accessors with query 1', () => {
            const base = ${init};
            const input = '/../../../?input';
            const resolved = resolve(input, base);
            assert.strictEqual(resolved, '${getOrigin(base)}${getPath(base, '/')}?input');
          });

          it('normalizes too many parent accessors with query 2', () => {
            const base = ${init};
            const input = '/../../..?input';
            const resolved = resolve(input, base);
            assert.strictEqual(resolved, '${getOrigin(base)}${getPath(base, '/')}?input');
          });

          it('normalizes too many parent accessors, late', () => {
            const base = ${init};
            const input = '/foo/../../../main.js.map';
            const resolved = resolve(input, base);
            assert.strictEqual(resolved, '${getOrigin(base)}${getPath(base, '/main.js.map')}');
          });
        });

        describe('with leading dot relative input', () => {
          it('resolves relative to current directory', () => {
            const base = ${init};
            const input = './bar/main.js.map';
            const resolved = resolve(input, base);
            assert.strictEqual(resolved, '${getOrigin(base)}${getPath(base, './bar/main.js.map')}');
          });

          it('resolves relative to current directory with query', () => {
            const base = ${init};
            const input = './bar/main.js.map?input';
            const resolved = resolve(input, base);
            assert.strictEqual(resolved, '${getOrigin(base)}${getPath(base, './bar/main.js.map')}?input');
          });

          it('resolves relative to parent directory', () => {
            const base = ${init};
            const input = '../bar/main.js.map';
            const resolved = resolve(input, base);
            assert.strictEqual(resolved, '${getOrigin(base)}${getPath(base, '../bar/main.js.map')}');
          });

          it('resolves relative to parent directory with query', () => {
            const base = ${init};
            const input = '../bar/main.js.map?input';
            const resolved = resolve(input, base);
            assert.strictEqual(resolved, '${getOrigin(base)}${getPath(base, '../bar/main.js.map')}?input');
          });

          it('resolves relative to parent multiple directory', () => {
            const base = ${init};
            const input = '../../../bar/main.js.map';
            const resolved = resolve(input, base);
            assert.strictEqual(resolved, '${getOrigin(base)}${getPath(base, '../../../bar/main.js.map')}');
          });

          it('resolves relative to parent multiple directory with query 1', () => {
            const base = ${init};
            const input = '../../../?input';
            const resolved = resolve(input, base);
            assert.strictEqual(resolved, '${getOrigin(base)}${getPath(base, '../../../')}?input');
          });

          it('resolves relative to parent multiple directory with query 2', () => {
            const base = ${init};
            const input = '../../..?input';
            const resolved = resolve(input, base);
            assert.strictEqual(resolved, '${getOrigin(base)}${getPath(base, '../../..')}?input');
          });

          it('normalizes input path', () => {
            const base = ${init};
            const input = './foo/./bar/../main.js.map';
            const resolved = resolve(input, base);
            assert.strictEqual(resolved, '${getOrigin(base)}${getPath(base, './foo/./bar/../main.js.map')}');
          });
        });

        describe('with relative path input', () => {
          it('resolves relative to current directory', () => {
            const base = ${init};
            const input = 'bar/main.js.map';
            const resolved = resolve(input, base);
            assert.strictEqual(resolved, '${getOrigin(base)}${getPath(base, 'bar/main.js.map')}');
          });

          it('resolves relative to current directory with query', () => {
            const base = ${init};
            const input = 'bar/main.js.map?input';
            const resolved = resolve(input, base);
            assert.strictEqual(resolved, '${getOrigin(base)}${getPath(base, 'bar/main.js.map')}?input');
          });

          it('resolves relative to parent multiple directory, later', () => {
            const base = ${init};
            const input = 'foo/../../../bar/main.js.map';
            const resolved = resolve(input, base);
            assert.strictEqual(resolved, '${getOrigin(base)}${getPath(base, 'foo/../../../bar/main.js.map')}');
          });

          it('normalizes input path', () => {
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

        describe('with query input', () => {
          it('resolves relative to path', () => {
            const base = ${init};
            const input = '?input';
            const resolved = resolve(input, base);
            assert.strictEqual(resolved, '${normalizeBasePath(base, '?input')}?input');
          });
        });

        describe('with hash input', () => {
          it('resolves relative to path', () => {
            const base = ${init};
            const input = '#input';
            const resolved = resolve(input, base);
            assert.strictEqual(resolved, '${normalizeBasePath(base, '#input')}${getQuery(base)}#input');
          });
        });

        describe('empty input', () => {
          it('normalizes base', () => {
            const base = ${init};
            const input = '';
            const resolved = resolve(input, base);
            assert.strictEqual(resolved, '${normalizeBasePath(base, '')}${getQuery(base)}${getHash(base)}');
          });
        });
      });
    `);
  }

  testCases(importStatement, resolveSuite);

  file('readme', importStatement, () => {
    const readme = readFileSync(`${__dirname}/../README.md`, 'utf8');
    const tables = extractTables(readme);

    /** @param {string} markdown */
    function extractTables(markdown) {
      const regex = /(\|.*)\n\|\s*---.*\n((\|.*\n)*)/g;
      let tables = [];
      let match;
      while ((match = regex.exec(markdown))) {
        const head = match[1].split('\n')[0];
        const headers = head
          .split('|')
          .map((s) => s.trim())
          .slice(1, -1);

        /** @type {Record<string, string>[]} */
        const table = [];
        tables.push(table);
        const body = match[2].split('\n').slice(0, -1);
        for (const row of body) {
          const data = row
            .split('|')
            .map((s) => s.trim())
            .slice(1, -1);

          /** @type {Record<string, string>} */
          const obj = {};
          data.forEach((d, i) => (obj[headers[i]] = d));
          table.push(obj);
        }
      }
      return tables;
    }

    /** @param {string} str */
    function escape(str) {
      return str.replace(/\\/g, '\\\\');
    }

    buffer.push(`const _any_ = 'https://foo/';`);
    buffer.push(`const _rest_ = 'foo';`);

    for (let i = 0; i < tables.length; i++) {
      const table = tables[i];
      describe(`table ${i}`, () => {
        for (let j = 0; j < table.length; j++) {
          const row = table[j];
          it(
            `input = ${escape(row.Input)}, base = ${escape(row.Base)}`,
            `
              const input = ${escape(row.Input)};
              const base = ${escape(row.Base)};
              const expected = ${escape(row.Resolution)};
              assert.strictEqual(resolve(input, base), expected);
            `
          );
        }
      });
    }
  });
});

dir('relative', () => {
  const importStatement = `const relative = require('../../relative');`;

  /**
   * @param {string | undefined} base
   */
  function relativeSuite(base) {
    if (base === undefined) return;

    const baseInit = JSON.stringify(base);
    describe(`base = ${baseInit}`, () => {
      if (base) {
        describe('with absolute input', () => {
          if (getProtocol(base)) {
            const input = `${extractLeft(base, 'host')}/nested/file.js`;

            it(
              'returns relative path to same-host input',
              `
                const base = ${baseInit};
                const input = ${JSON.stringify(input)};
                const rel = relative(base, input);
                assert.strictEqual(rel, ${JSON.stringify(relative(getPath(base, base), getPath(base, input)))});
              `
            );

            it(
              'returns relative path to same-host input with query',
              `
                const base = ${baseInit};
                const input = ${JSON.stringify(input + '?input')};
                const rel = relative(base, input);
                assert.strictEqual(rel, ${JSON.stringify(relative(getPath(base, base), getPath(base, input)) + '?input')});
              `
            );

            if (getQuery(base)) {
              it(
                'returns query when same-host and same-path',
                `
                  const base = ${baseInit};
                  const input = ${JSON.stringify(extractLeft(base, 'path') + '?input')};
                  const rel = relative(base, input);
                  assert.strictEqual(rel, ${JSON.stringify('?input')});
                `
              );

              it(
                'returns query and hash when same-host and same-path',
                `
                  const base = ${baseInit};
                  const input = ${JSON.stringify(extractLeft(base, 'path') + '?input#hash')};
                  const rel = relative(base, input);
                  assert.strictEqual(rel, ${JSON.stringify('?input#hash')});
                `
              );

              it(
                'returns query when same-host, same-path, and same-query',
                `
                  const base = ${baseInit};
                  const input = ${JSON.stringify(extractLeft(base, 'query'))};
                  const rel = relative(base, input);
                  assert.strictEqual(rel, ${JSON.stringify(getQuery(base))});
                `
              );
            }

            if (getHash(base)) {
              it(
                'returns hash when same-host, same-path, and same-query',
                `
                  const base = ${baseInit};
                  const input = ${JSON.stringify(extractLeft(base, 'query') + '#hash')};
                  const rel = relative(base, input);
                  assert.strictEqual(rel, ${JSON.stringify('#hash')});
                `
              );

              it(
                'returns hash when same-host, same-path, same-query, and same hash',
                `
                  const base = ${baseInit};
                  const input = ${JSON.stringify(extractLeft(base, 'hash'))};
                  const rel = relative(base, input);
                  assert.strictEqual(rel, ${JSON.stringify(getHash(base))});
                `
              );
            }
          }

          if (getProtocol(base) === 'https:') {
            const input = `https://input.com/nested/file.js`;
            it(
              'returns scheme-relative to input',
              `
                const base = ${baseInit};
                const input = ${JSON.stringify(input)};
                const rel = relative(base, input);
                assert.strictEqual(rel, ${JSON.stringify(extractRight(input, 'scheme'))});
              `
            );
          } else {
            const input = `https://input.com/nested/file.js`;
            it(
              'normalizes absolute input',
              `
                const base = ${baseInit};
                const input = ${JSON.stringify(input)};
                const rel = relative(base, input);
                assert.strictEqual(rel, ${JSON.stringify(input)});
              `
            );
          }
        });
      } else {
        {
          const input = `https://input.com/nested/file.js`;
          it(
          'normalizes absolute input',
          `
            const base = ${baseInit};
            const input = ${JSON.stringify(input)};
            const rel = relative(base, input);
            assert.strictEqual(rel, ${JSON.stringify(input)});
          `
          );
        }

        {
          const input = `//input.com/nested/file.js`;
          it(
          'normalizes scheme-relative input',
          `
            const base = ${baseInit};
            const input = ${JSON.stringify(input)};
            const rel = relative(base, input);
            assert.strictEqual(rel, ${JSON.stringify(input)});
          `
          );
        }

        {
          const input = `/nested/file.js`;
          it(
          'normalizes absolute path input',
          `
            const base = ${baseInit};
            const input = ${JSON.stringify(input)};
            const rel = relative(base, input);
            assert.strictEqual(rel, ${JSON.stringify(input)});
          `
          );
        }

        {
          const input = `nested/file.js`;
          it(
          'normalizes relative path input',
          `
            const base = ${baseInit};
            const input = ${JSON.stringify(input)};
            const rel = relative(base, input);
            assert.strictEqual(rel, ${JSON.stringify(input)});
          `
          );
        }

        {
          const input = `?query`;
          it(
          'normalizes query path input',
          `
            const base = ${baseInit};
            const input = ${JSON.stringify(input)};
            const rel = relative(base, input);
            assert.strictEqual(rel, ${JSON.stringify(input)});
          `
          );
        }

        {
          const input = `?query#hash`;
          it(
          'normalizes query hash path input',
          `
            const base = ${baseInit};
            const input = ${JSON.stringify(input)};
            const rel = relative(base, input);
            assert.strictEqual(rel, ${JSON.stringify(input)});
          `
          );
        }

        {
          const input = `#hash`;
          it(
          'normalizes hash path input',
          `
            const base = ${baseInit};
            const input = ${JSON.stringify(input)};
            const rel = relative(base, input);
            assert.strictEqual(rel, ${JSON.stringify(input)});
          `
          );
        }
      }
    });
  }

  testCases(importStatement, relativeSuite);
});
