const { readFileSync, mkdirSync, writeFileSync } = require('fs');
const { posix, win32 } = require('path');
const { cwd, chdir } = require('process');
const prettier = require('prettier');
const prettierConfig = require('./prettier.config.js');

/** @type {function(string, string=): string} */
const resolve = /** @type {any} */ (require('@jridgewell/resolve-uri-latest'));

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
 * @param {string} fn
 */
function it(name, fn) {
  buffer.push(`it(\`${name.replace(/`/g, '\\`')}\`, ${fn});\n`);
}

chdir(__dirname);

dir('resolve', () => {
  const importStatement = `const resolve = require('@jridgewell/resolve-uri');`;
  file('without base', importStatement, () => {
    resolveSuite(undefined);
    resolveSuite('');
  });

  file('with absolute base', importStatement, () => {
    resolveSuite('https://foo.com');
    resolveSuite('https://foo.com/');
    resolveSuite('https://foo.com/file');
    resolveSuite('https://foo.com/dir/');
    resolveSuite('https://foo.com/dir/file');
    resolveSuite('https://foo.com/..');
    resolveSuite('https://foo.com/../');
    resolveSuite('https://foo.com/dir/..');
    resolveSuite('https://foo.com/file?baseQuery');
    resolveSuite('https://foo.com/file?baseQuery#baseHash');
    resolveSuite('https://foo.com/file#baseHash');

    resolveSuite('https://g');
    resolveSuite('https://g/');
    resolveSuite('https://g/file');
    resolveSuite('https://g/dir/');
    resolveSuite('https://g/dir/file');
    resolveSuite('https://g/..');
    resolveSuite('https://g/../');
    resolveSuite('https://g/dir/..');
    resolveSuite('https://g/file?baseQuery');
    resolveSuite('https://g/file?baseQuery#baseHash');
    resolveSuite('https://g/file#baseHash');

    resolveSuite('file:///foo');
    resolveSuite('file:///foo/');
    resolveSuite('file:///foo/file');
    resolveSuite('file:///foo/dir/');
    resolveSuite('file:///foo/dir/file');
    resolveSuite('file:///foo/..');
    resolveSuite('file:///foo/../');
    resolveSuite('file:///foo/dir/..');
    resolveSuite('file:///foo/file?baseQuery');
    resolveSuite('file:///foo/file?baseQuery#baseHash');
    resolveSuite('file:///foo/file#baseHash');

    resolveSuite('file://foo');
    resolveSuite('file://foo/');
    resolveSuite('file://foo/file');
    resolveSuite('file://foo/dir/');
    resolveSuite('file://foo/dir/file');
    resolveSuite('file://foo/..');
    resolveSuite('file://foo/../');
    resolveSuite('file://foo/dir/..');
    resolveSuite('file://foo/file?baseQuery');
    resolveSuite('file://foo/file?baseQuery#baseHash');
    resolveSuite('file://foo/file#baseHash');

    resolveSuite('file:/foo');
    resolveSuite('file:/foo/');
    resolveSuite('file:/foo/file');
    resolveSuite('file:/foo/dir/');
    resolveSuite('file:/foo/dir/file');
    resolveSuite('file:/foo/..');
    resolveSuite('file:/foo/../');
    resolveSuite('file:/foo/dir/..');
    resolveSuite('file:/foo/file?baseQuery');
    resolveSuite('file:/foo/file?baseQuery#baseHash');
    resolveSuite('file:/foo/file#baseHash');

    resolveSuite('file:foo');
    resolveSuite('file:foo/');
    resolveSuite('file:foo/file');
    resolveSuite('file:foo/dir/');
    resolveSuite('file:foo/dir/file');
    resolveSuite('file:foo/..');
    resolveSuite('file:foo/../');
    resolveSuite('file:foo/dir/..');
    resolveSuite('file:foo/file?baseQuery');
    resolveSuite('file:foo/file?baseQuery#baseHash');
    resolveSuite('file:foo/file#baseHash');
    resolveSuite('file:foo/file?baseQuery');
    resolveSuite('file:foo/file?baseQuery#baseHash');
    resolveSuite('file:foo/file#baseHash');
    resolveSuite('file:file?baseQuery');
    resolveSuite('file:file?baseQuery#baseHash');
    resolveSuite('file:file#baseHash');
    resolveSuite('file:?baseQuery');
    resolveSuite('file:?baseQuery#baseHash');
    resolveSuite('file:#baseHash');
  });

  file('with protocol relative base', importStatement, () => {
    resolveSuite('//foo.com');
    resolveSuite('//foo.com/');
    resolveSuite('//foo.com/file');
    resolveSuite('//foo.com/dir/');
    resolveSuite('//foo.com/dir/file');
    resolveSuite('//foo.com/..');
    resolveSuite('//foo.com/../');
    resolveSuite('//foo.com/dir/..');
    resolveSuite('//foo.com/file?baseQuery');
    resolveSuite('//foo.com/file?baseQuery#baseHash');
    resolveSuite('//foo.com/file#baseHash');

    resolveSuite('//g');
    resolveSuite('//g/');
    resolveSuite('//g/file');
    resolveSuite('//g/dir/');
    resolveSuite('//g/dir/file');
    resolveSuite('//g/..');
    resolveSuite('//g/../');
    resolveSuite('//g/dir/..');
    resolveSuite('//g/file?baseQuery');
    resolveSuite('//g/file?baseQuery#baseHash');
    resolveSuite('//g/file#baseHash');
  });

  file('with absolute path base', importStatement, () => {
    resolveSuite('/');
    resolveSuite('/root');
    resolveSuite('/root/');
    resolveSuite('/root/file');
    resolveSuite('/root/dir/');
    resolveSuite('/..');
    resolveSuite('/../');
    resolveSuite('/root/..');
    resolveSuite('/root/../');
    resolveSuite('/root?baseQuery');
    resolveSuite('/root?baseQuery#baseHash');
    resolveSuite('/root#baseHash');
  });

  file('with relative path base', importStatement, () => {
    resolveSuite('file');
    resolveSuite('dir/');
    resolveSuite('dir/file');
    resolveSuite('deep/dir/');
    resolveSuite('./file');
    resolveSuite('./dir/');
    resolveSuite('./deep/file');
    resolveSuite('./deep/dir/');
    resolveSuite('../file');
    resolveSuite('../dir/');
    resolveSuite('../deep/file');
    resolveSuite('../deep/dir/');
    resolveSuite('..');
    resolveSuite('../');
    resolveSuite('dir/..');
    resolveSuite('deep/../');
    resolveSuite('./..');
    resolveSuite('./../');
    resolveSuite('./deep/..');
    resolveSuite('./deep/../');
    resolveSuite('../..');
    resolveSuite('../../');
    resolveSuite('../deep/..');
    resolveSuite('../deep/../');
    resolveSuite('file?baseQuery');
    resolveSuite('file?baseQuery#baseHash');
    resolveSuite('file#baseHash');
  });

  file('with query base', importStatement, () => {
    resolveSuite('?baseQuery');
    resolveSuite('?baseQuery#baseHash');
  });

  file('with hash base', importStatement, () => {
    resolveSuite('#baseHash');
  });

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
            `() => {
            const input = ${escape(row.Input)};
            const base = ${escape(row.Base)};
            const expected = ${escape(row.Resolution)};
            assert.strictEqual(resolve(input, base), expected);
          }`
          );
        }
      });
    }
  });
});
