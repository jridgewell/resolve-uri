const { readFileSync, writeFileSync } = require('fs');
const { posix, win32 } = require('path');
const prettier = require('prettier');
const prettierConfig = require('./prettier.config.js');
const resolve = require('@jridgewell/resolve-uri-latest');

let buffer;

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

function getProtocol(url) {
  if (!url) return '';
  if (url.startsWith('file:')) return 'file:';
  if (url.startsWith('https://')) return 'https:';
  return '';
}

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

function toPosix(input) {
  return input.replace(/\\{1,2}/g, '/');
}

function toWindows(input) {
  return input.replace(/\//g, '\\\\');
}

function normalizeBase(base) {
  if (base.startsWith('file:')) return new URL(base).href;
  if (base.startsWith('https://')) return new URL(base).href;
  if (base.startsWith('//')) {
    return new URL('https:' + base).href.slice('https:'.length);
  }
  let b = base.includes('\\') ? win32.normalize(base).replace(/\\/g, '/') : posix.normalize(base);
  if (b === './') return '.';
  if (b.endsWith('../')) b = b.slice(0, -1);
  if (!b.startsWith('.') && base.startsWith('.')) b = './' + b;
  return base.includes('\\') ? b.replace(/\//g, '\\\\') : b;
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
            assert.strictEqual(resolved, '${getProtocol(base)}//protocol-relative.com/main.js.map');
          });

          it('normalizes input', () => {
            const base = ${init};
            const input = '//protocol-relative.com/foo/./bar/../main.js.map';
            const resolved = resolve(input, base);
            assert.strictEqual(resolved, '${getProtocol(base)}//protocol-relative.com/foo/main.js.map');
          });

          it('normalizes pathless input', () => {
            const base = ${init};
            const input = '//protocol-relative.com';
            const resolved = resolve(input, base);
            assert.strictEqual(resolved, '${getProtocol(base)}//protocol-relative.com/');
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

          it('trims to root', () => {
            const base = ${init};
            const input = '/';
            const resolved = resolve(input, base);
            assert.strictEqual(resolved, '${getOrigin(base)}${getPath(base, '/')}');
          });

          it('normalizes input', () => {
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

          it('normalizes too many parent accessors, late', () => {
            const base = ${init};
            const input = '/foo/../../../main.js.map';
            const resolved = resolve(input, base);
            assert.strictEqual(resolved, '${getOrigin(base)}${getPath(base, '/main.js.map')}');
          });
        });

        describe('with absolute Windows path input', () => {
          it('remains absolute path', () => {
            const base = ${init};
            const input = 'C:\\\\assets\\\\main.js.map';
            const resolved = resolve(input, base);
            assert.strictEqual(resolved, '${getOrigin(base)}${getPath(base, 'C:\\\\assets\\\\main.js.map')}');
          });

          it('trims to root', () => {
            const base = ${init};
            const input = 'C:\\\\';
            const resolved = resolve(input, base);
            assert.strictEqual(resolved, '${getOrigin(base)}${getPath(base, 'C:\\\\')}');
          });

          it('normalizes input', () => {
            const base = ${init};
            const input = 'C:\\\\foo\\\\.\\\\bar\\\\..\\\\main.js.map';
            const resolved = resolve(input, base);
            assert.strictEqual(resolved, '${getOrigin(base)}${getPath(base, 'C:\\\\foo\\\\main.js.map')}');
          });

          it('normalizes current directory', () => {
            const base = ${init};
            const input = 'C:\\\\.\\\\main.js.map';
            const resolved = resolve(input, base);
            assert.strictEqual(resolved, '${getOrigin(base)}${getPath(base, 'C:\\\\main.js.map')}');
          });

          it('normalizes too many parent accessors', () => {
            const base = ${init};
            const input = 'C:\\\\..\\\\..\\\\..\\\\main.js.map';
            const resolved = resolve(input, base);
            assert.strictEqual(resolved, '${getOrigin(base)}${getPath(base, 'C:\\\\main.js.map')}');
          });

          it('normalizes too many parent accessors, late', () => {
            const base = ${init};
            const input = 'C:\\\\foo\\\\..\\\\..\\\\..\\\\main.js.map';
            const resolved = resolve(input, base);
            assert.strictEqual(resolved, '${getOrigin(base)}${getPath(base, 'C:\\\\main.js.map')}');
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

        describe('with leading dot relative Windows input', () => {
          it('resolves relative to current directory', () => {
            const base = ${init};
            const input = '.\\\\bar\\\\main.js.map';
            const resolved = resolve(input, base);
            assert.strictEqual(resolved, '${getOrigin(base)}${getPath(base, '.\\\\bar\\\\main.js.map')}');
          });

          it('resolves relative to parent directory', () => {
            const base = ${init};
            const input = '..\\\\bar\\\\main.js.map';
            const resolved = resolve(input, base);
            assert.strictEqual(resolved, '${getOrigin(base)}${getPath(base, '..\\\\bar\\\\main.js.map')}');
          });

          it('resolves relative to parent multiple directory', () => {
            const base = ${init};
            const input = '..\\\\..\\\\..\\\\bar\\\\main.js.map';
            const resolved = resolve(input, base);
            assert.strictEqual(resolved, '${getOrigin(base)}${getPath(base, '..\\\\..\\\\..\\\\bar\\\\main.js.map')}');
          });

          it('normalizes input', () => {
            const base = ${init};
            const input = '.\\\\foo\\\\.\\\\bar\\\\..\\\\main.js.map';
            const resolved = resolve(input, base);
            assert.strictEqual(resolved, '${getOrigin(base)}${getPath(base, '.\\\\foo\\\\.\\\\bar\\\\..\\\\main.js.map')}');
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

        describe('with relative Windows input', () => {
          it('resolves relative to current directory', () => {
            const base = ${init};
            const input = 'bar\\\\main.js.map';
            const resolved = resolve(input, base);
            assert.strictEqual(resolved, '${getOrigin(base)}${getPath(base, 'bar\\\\main.js.map')}');
          });

          it('resolves relative to parent multiple directory, later', () => {
            const base = ${init};
            const input = 'foo\\\\..\\\\..\\\\..\\\\bar\\\\main.js.map';
            const resolved = resolve(input, base);
            assert.strictEqual(resolved, '${getOrigin(base)}${getPath(base, 'foo\\\\..\\\\..\\\\..\\\\bar\\\\main.js.map')}');
          });

          it('normalizes input', () => {
            const base = ${init};
            const input = 'foo\\\\.\\\\bar\\\\..\\\\main.js.map';
            const resolved = resolve(input, base);
            assert.strictEqual(resolved, '${getOrigin(base)}${getPath(base, 'foo\\\\.\\\\bar\\\\..\\\\main.js.map')}');
          });

          it('resolves node_module scope as path', () => {
            const base = ${init};
            const input = 'node_modules\\\\@babel\\\\runtime\\\\helpers\\\\esm\\\\arrayLikeToArray.js';
            const resolved = resolve(input, base);
            assert.strictEqual(resolved, '${getOrigin(base)}${getPath(base, 'node_modules\\\\@babel\\\\runtime\\\\helpers\\\\esm\\\\arrayLikeToArray.js')}');
          });

          it('resolves package scope as path', () => {
            const base = ${init};
            const input = '@babel\\\\runtime\\\\helpers\\\\esm\\\\arrayLikeToArray.js';
            const resolved = resolve(input, base);
            assert.strictEqual(resolved, '${getOrigin(base)}${getPath(base, '@babel\\\\runtime\\\\helpers\\\\esm\\\\arrayLikeToArray.js')}');
          });
        });

        describe('empty input', () => {
          it('normalizes base', () => {
            const base = ${init};
            const input = '';
            const resolved = resolve(input, base);
            assert.strictEqual(resolved, '${base ? normalizeBase(base) : ''}');
          });
        });
      });
    `);
}

function describe(name, fn) {
  buffer = [`const resolve = require('../');`, `const assert = require('assert');\n`, `describe('${name}', () => {`];

  fn();

  buffer.push(`});`);

  writeFileSync(
    `${__dirname}/${name.replace(/ /g, '-')}.test.js`,
    prettier.format(buffer.join('\n'), {
      ...prettierConfig,
      parser: 'babel',
    })
  );
}

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

  suite('https://g');
  suite('https://g/');
  suite('https://g/file');
  suite('https://g/dir/');
  suite('https://g/dir/file');
  suite('https://g/..');
  suite('https://g/../');
  suite('https://g/dir/..');

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

  suite('//g');
  suite('//g/');
  suite('//g/file');
  suite('//g/dir/');
  suite('//g/dir/file');
  suite('//g/..');
  suite('//g/../');
  suite('//g/dir/..');
});

describe('with absolute path base', () => {
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

describe('with absolute Windows path base', () => {
  suite('C:\\');
  suite('C:\\root');
  suite('C:\\root\\');
  suite('C:\\root\\file');
  suite('C:\\root\\dir\\');
  suite('C:\\..');
  suite('C:\\..\\');
  suite('C:\\root\\..');
  suite('C:\\root\\..\\');
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

describe('with relative Windows base', () => {
  suite('dir\\');
  suite('dir\\file');
  suite('deep\\dir\\');
  suite('.\\file');
  suite('.\\dir\\');
  suite('.\\deep\\file');
  suite('.\\deep\\dir\\');
  suite('..\\file');
  suite('..\\dir\\');
  suite('..\\deep\\file');
  suite('..\\deep\\dir\\');
  suite('..\\');
  suite('dir\\..');
  suite('deep\\..\\');
  suite('.\\..');
  suite('.\\..\\');
  suite('.\\deep\\..');
  suite('.\\deep\\..\\');
  suite('..\\..');
  suite('..\\..\\');
  suite('..\\deep\\..');
  suite('..\\deep\\..\\');
});

describe('readme', () => {
  const readme = readFileSync(`${__dirname}/../README.md`, 'utf8');
  const tables = extractTables(readme);

  function extractTables(markdown) {
    const regex = /(\|.*)\n\|\s*\---.*\n((\|.*\n)*)/g;
    let tables = [];
    let match;
    while ((match = regex.exec(markdown))) {
      const head = match[1].split('\n')[0];
      const headers = head
        .split('|')
        .map((s) => s.trim())
        .slice(1, -1);

      const table = [];
      tables.push(table);
      const body = match[2].split('\n').slice(0, -1);
      for (const row of body) {
        const data = row
          .split('|')
          .map((s) => s.trim())
          .slice(1, -1);

        const obj = {};
        data.forEach((d, i) => (obj[headers[i]] = d));
        table.push(obj);
      }
    }
    return tables;
  }

  function escape(str) {
    return str.replace(/\\/g, '\\\\');
  }

  buffer.push(`const _any_ = 'https://foo/';`);
  buffer.push(`const _rest_ = 'foo';`);

  for (let i = 0; i < tables.length; i++) {
    const table = tables[i];
    buffer.push(`describe('table ${i}', () => {`);
    for (let j = 0; j < table.length; j++) {
      const row = table[j];
      buffer.push(`
        it('input = ${escape(row.Input)}, base = ${escape(row.Base)}', () => {
          const input = ${escape(row.Input)};
          const base = ${escape(row.Base)};
          const expected = ${escape(row.Resolution)};

          assert.strictEqual(resolve(input, base), expected);
        });
      `);
    }
    buffer.push('})');
  }
});
