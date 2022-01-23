import resolve from '../src/resolve-uri';
import { test, describe } from './setup';

describe('resolve', () => {
  describe('without base', () => {
    describe(`base = undefined`, () => {
      describe('with absolute input', () => {
        test('returns input', (t) => {
          const base = undefined;
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = undefined;
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/foo/main.js.map');
        });

        test('normalizes pathless input', (t) => {
          const base = undefined;
          const input = 'https://absolute.com';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/');
        });

        test('normalizes current directory', (t) => {
          const base = undefined;
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = undefined;
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = undefined;
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        test('resolves relative to the base protocol', (t) => {
          const base = undefined;
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = undefined;
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/foo/main.js.map');
        });

        test('normalizes pathless input', (t) => {
          const base = undefined;
          const input = '//protocol-relative.com';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/');
        });

        test('normalizes current directory', (t) => {
          const base = undefined;
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = undefined;
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = undefined;
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        test('remains absolute path', (t) => {
          const base = undefined;
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/assets/main.js.map');
        });

        test('trims to root', (t) => {
          const base = undefined;
          const input = '/';
          const resolved = resolve(input, base);
          t.is(resolved, '/');
        });

        test('normalizes input', (t) => {
          const base = undefined;
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/foo/main.js.map');
        });

        test('normalizes current directory', (t) => {
          const base = undefined;
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = undefined;
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = undefined;
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        test('resolves relative to current directory', (t) => {
          const base = undefined;
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, './bar/main.js.map');
        });

        test('resolves relative to parent directory', (t) => {
          const base = undefined;
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '../bar/main.js.map');
        });

        test('resolves relative to parent multiple directory', (t) => {
          const base = undefined;
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '../../../bar/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = undefined;
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, './foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        test('resolves relative to current directory', (t) => {
          const base = undefined;
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'bar/main.js.map');
        });

        test('resolves relative to parent multiple directory, later', (t) => {
          const base = undefined;
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '../../bar/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = undefined;
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'foo/main.js.map');
        });
      });
    });

    describe(`base = ""`, () => {
      describe('with absolute input', () => {
        test('returns input', (t) => {
          const base = '';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = '';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/foo/main.js.map');
        });

        test('normalizes pathless input', (t) => {
          const base = '';
          const input = 'https://absolute.com';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/');
        });

        test('normalizes current directory', (t) => {
          const base = '';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = '';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = '';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        test('resolves relative to the base protocol', (t) => {
          const base = '';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = '';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/foo/main.js.map');
        });

        test('normalizes pathless input', (t) => {
          const base = '';
          const input = '//protocol-relative.com';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/');
        });

        test('normalizes current directory', (t) => {
          const base = '';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = '';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = '';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        test('remains absolute path', (t) => {
          const base = '';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/assets/main.js.map');
        });

        test('trims to root', (t) => {
          const base = '';
          const input = '/';
          const resolved = resolve(input, base);
          t.is(resolved, '/');
        });

        test('normalizes input', (t) => {
          const base = '';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/foo/main.js.map');
        });

        test('normalizes current directory', (t) => {
          const base = '';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = '';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = '';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        test('resolves relative to current directory', (t) => {
          const base = '';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, './bar/main.js.map');
        });

        test('resolves relative to parent directory', (t) => {
          const base = '';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '../bar/main.js.map');
        });

        test('resolves relative to parent multiple directory', (t) => {
          const base = '';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '../../../bar/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = '';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, './foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        test('resolves relative to current directory', (t) => {
          const base = '';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'bar/main.js.map');
        });

        test('resolves relative to parent multiple directory, later', (t) => {
          const base = '';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '../../bar/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = '';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'foo/main.js.map');
        });
      });
    });
  });

  describe('with absolute base', () => {
    describe(`base = "https://foo.com"`, () => {
      describe('with absolute input', () => {
        test('returns input', (t) => {
          const base = 'https://foo.com';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = 'https://foo.com';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/foo/main.js.map');
        });

        test('normalizes pathless input', (t) => {
          const base = 'https://foo.com';
          const input = 'https://absolute.com';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/');
        });

        test('normalizes current directory', (t) => {
          const base = 'https://foo.com';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = 'https://foo.com';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = 'https://foo.com';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        test('resolves relative to the base protocol', (t) => {
          const base = 'https://foo.com';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://protocol-relative.com/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = 'https://foo.com';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://protocol-relative.com/foo/main.js.map');
        });

        test('normalizes pathless input', (t) => {
          const base = 'https://foo.com';
          const input = '//protocol-relative.com';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://protocol-relative.com/');
        });

        test('normalizes current directory', (t) => {
          const base = 'https://foo.com';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = 'https://foo.com';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = 'https://foo.com';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        test('remains absolute path', (t) => {
          const base = 'https://foo.com';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://foo.com/assets/main.js.map');
        });

        test('trims to root', (t) => {
          const base = 'https://foo.com';
          const input = '/';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://foo.com/');
        });

        test('normalizes input', (t) => {
          const base = 'https://foo.com';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://foo.com/foo/main.js.map');
        });

        test('normalizes current directory', (t) => {
          const base = 'https://foo.com';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://foo.com/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = 'https://foo.com';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://foo.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = 'https://foo.com';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://foo.com/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        test('resolves relative to current directory', (t) => {
          const base = 'https://foo.com';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://foo.com/bar/main.js.map');
        });

        test('resolves relative to parent directory', (t) => {
          const base = 'https://foo.com';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://foo.com/bar/main.js.map');
        });

        test('resolves relative to parent multiple directory', (t) => {
          const base = 'https://foo.com';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://foo.com/bar/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = 'https://foo.com';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://foo.com/foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        test('resolves relative to current directory', (t) => {
          const base = 'https://foo.com';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://foo.com/bar/main.js.map');
        });

        test('resolves relative to parent multiple directory, later', (t) => {
          const base = 'https://foo.com';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://foo.com/bar/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = 'https://foo.com';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://foo.com/foo/main.js.map');
        });
      });
    });

    describe(`base = "https://foo.com/"`, () => {
      describe('with absolute input', () => {
        test('returns input', (t) => {
          const base = 'https://foo.com/';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = 'https://foo.com/';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/foo/main.js.map');
        });

        test('normalizes pathless input', (t) => {
          const base = 'https://foo.com/';
          const input = 'https://absolute.com';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/');
        });

        test('normalizes current directory', (t) => {
          const base = 'https://foo.com/';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = 'https://foo.com/';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = 'https://foo.com/';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        test('resolves relative to the base protocol', (t) => {
          const base = 'https://foo.com/';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://protocol-relative.com/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = 'https://foo.com/';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://protocol-relative.com/foo/main.js.map');
        });

        test('normalizes pathless input', (t) => {
          const base = 'https://foo.com/';
          const input = '//protocol-relative.com';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://protocol-relative.com/');
        });

        test('normalizes current directory', (t) => {
          const base = 'https://foo.com/';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = 'https://foo.com/';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = 'https://foo.com/';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        test('remains absolute path', (t) => {
          const base = 'https://foo.com/';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://foo.com/assets/main.js.map');
        });

        test('trims to root', (t) => {
          const base = 'https://foo.com/';
          const input = '/';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://foo.com/');
        });

        test('normalizes input', (t) => {
          const base = 'https://foo.com/';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://foo.com/foo/main.js.map');
        });

        test('normalizes current directory', (t) => {
          const base = 'https://foo.com/';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://foo.com/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = 'https://foo.com/';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://foo.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = 'https://foo.com/';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://foo.com/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        test('resolves relative to current directory', (t) => {
          const base = 'https://foo.com/';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://foo.com/bar/main.js.map');
        });

        test('resolves relative to parent directory', (t) => {
          const base = 'https://foo.com/';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://foo.com/bar/main.js.map');
        });

        test('resolves relative to parent multiple directory', (t) => {
          const base = 'https://foo.com/';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://foo.com/bar/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = 'https://foo.com/';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://foo.com/foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        test('resolves relative to current directory', (t) => {
          const base = 'https://foo.com/';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://foo.com/bar/main.js.map');
        });

        test('resolves relative to parent multiple directory, later', (t) => {
          const base = 'https://foo.com/';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://foo.com/bar/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = 'https://foo.com/';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://foo.com/foo/main.js.map');
        });
      });
    });

    describe(`base = "https://foo.com/file"`, () => {
      describe('with absolute input', () => {
        test('returns input', (t) => {
          const base = 'https://foo.com/file';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = 'https://foo.com/file';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/foo/main.js.map');
        });

        test('normalizes pathless input', (t) => {
          const base = 'https://foo.com/file';
          const input = 'https://absolute.com';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/');
        });

        test('normalizes current directory', (t) => {
          const base = 'https://foo.com/file';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = 'https://foo.com/file';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = 'https://foo.com/file';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        test('resolves relative to the base protocol', (t) => {
          const base = 'https://foo.com/file';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://protocol-relative.com/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = 'https://foo.com/file';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://protocol-relative.com/foo/main.js.map');
        });

        test('normalizes pathless input', (t) => {
          const base = 'https://foo.com/file';
          const input = '//protocol-relative.com';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://protocol-relative.com/');
        });

        test('normalizes current directory', (t) => {
          const base = 'https://foo.com/file';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = 'https://foo.com/file';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = 'https://foo.com/file';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        test('remains absolute path', (t) => {
          const base = 'https://foo.com/file';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://foo.com/assets/main.js.map');
        });

        test('trims to root', (t) => {
          const base = 'https://foo.com/file';
          const input = '/';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://foo.com/');
        });

        test('normalizes input', (t) => {
          const base = 'https://foo.com/file';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://foo.com/foo/main.js.map');
        });

        test('normalizes current directory', (t) => {
          const base = 'https://foo.com/file';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://foo.com/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = 'https://foo.com/file';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://foo.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = 'https://foo.com/file';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://foo.com/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        test('resolves relative to current directory', (t) => {
          const base = 'https://foo.com/file';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://foo.com/bar/main.js.map');
        });

        test('resolves relative to parent directory', (t) => {
          const base = 'https://foo.com/file';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://foo.com/bar/main.js.map');
        });

        test('resolves relative to parent multiple directory', (t) => {
          const base = 'https://foo.com/file';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://foo.com/bar/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = 'https://foo.com/file';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://foo.com/foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        test('resolves relative to current directory', (t) => {
          const base = 'https://foo.com/file';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://foo.com/bar/main.js.map');
        });

        test('resolves relative to parent multiple directory, later', (t) => {
          const base = 'https://foo.com/file';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://foo.com/bar/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = 'https://foo.com/file';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://foo.com/foo/main.js.map');
        });
      });
    });

    describe(`base = "https://foo.com/dir/"`, () => {
      describe('with absolute input', () => {
        test('returns input', (t) => {
          const base = 'https://foo.com/dir/';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = 'https://foo.com/dir/';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/foo/main.js.map');
        });

        test('normalizes pathless input', (t) => {
          const base = 'https://foo.com/dir/';
          const input = 'https://absolute.com';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/');
        });

        test('normalizes current directory', (t) => {
          const base = 'https://foo.com/dir/';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = 'https://foo.com/dir/';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = 'https://foo.com/dir/';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        test('resolves relative to the base protocol', (t) => {
          const base = 'https://foo.com/dir/';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://protocol-relative.com/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = 'https://foo.com/dir/';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://protocol-relative.com/foo/main.js.map');
        });

        test('normalizes pathless input', (t) => {
          const base = 'https://foo.com/dir/';
          const input = '//protocol-relative.com';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://protocol-relative.com/');
        });

        test('normalizes current directory', (t) => {
          const base = 'https://foo.com/dir/';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = 'https://foo.com/dir/';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = 'https://foo.com/dir/';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        test('remains absolute path', (t) => {
          const base = 'https://foo.com/dir/';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://foo.com/assets/main.js.map');
        });

        test('trims to root', (t) => {
          const base = 'https://foo.com/dir/';
          const input = '/';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://foo.com/');
        });

        test('normalizes input', (t) => {
          const base = 'https://foo.com/dir/';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://foo.com/foo/main.js.map');
        });

        test('normalizes current directory', (t) => {
          const base = 'https://foo.com/dir/';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://foo.com/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = 'https://foo.com/dir/';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://foo.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = 'https://foo.com/dir/';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://foo.com/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        test('resolves relative to current directory', (t) => {
          const base = 'https://foo.com/dir/';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://foo.com/dir/bar/main.js.map');
        });

        test('resolves relative to parent directory', (t) => {
          const base = 'https://foo.com/dir/';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://foo.com/bar/main.js.map');
        });

        test('resolves relative to parent multiple directory', (t) => {
          const base = 'https://foo.com/dir/';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://foo.com/bar/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = 'https://foo.com/dir/';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://foo.com/dir/foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        test('resolves relative to current directory', (t) => {
          const base = 'https://foo.com/dir/';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://foo.com/dir/bar/main.js.map');
        });

        test('resolves relative to parent multiple directory, later', (t) => {
          const base = 'https://foo.com/dir/';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://foo.com/bar/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = 'https://foo.com/dir/';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://foo.com/dir/foo/main.js.map');
        });
      });
    });

    describe(`base = "https://foo.com/dir/file"`, () => {
      describe('with absolute input', () => {
        test('returns input', (t) => {
          const base = 'https://foo.com/dir/file';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = 'https://foo.com/dir/file';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/foo/main.js.map');
        });

        test('normalizes pathless input', (t) => {
          const base = 'https://foo.com/dir/file';
          const input = 'https://absolute.com';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/');
        });

        test('normalizes current directory', (t) => {
          const base = 'https://foo.com/dir/file';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = 'https://foo.com/dir/file';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = 'https://foo.com/dir/file';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        test('resolves relative to the base protocol', (t) => {
          const base = 'https://foo.com/dir/file';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://protocol-relative.com/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = 'https://foo.com/dir/file';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://protocol-relative.com/foo/main.js.map');
        });

        test('normalizes pathless input', (t) => {
          const base = 'https://foo.com/dir/file';
          const input = '//protocol-relative.com';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://protocol-relative.com/');
        });

        test('normalizes current directory', (t) => {
          const base = 'https://foo.com/dir/file';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = 'https://foo.com/dir/file';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = 'https://foo.com/dir/file';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        test('remains absolute path', (t) => {
          const base = 'https://foo.com/dir/file';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://foo.com/assets/main.js.map');
        });

        test('trims to root', (t) => {
          const base = 'https://foo.com/dir/file';
          const input = '/';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://foo.com/');
        });

        test('normalizes input', (t) => {
          const base = 'https://foo.com/dir/file';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://foo.com/foo/main.js.map');
        });

        test('normalizes current directory', (t) => {
          const base = 'https://foo.com/dir/file';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://foo.com/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = 'https://foo.com/dir/file';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://foo.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = 'https://foo.com/dir/file';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://foo.com/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        test('resolves relative to current directory', (t) => {
          const base = 'https://foo.com/dir/file';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://foo.com/dir/bar/main.js.map');
        });

        test('resolves relative to parent directory', (t) => {
          const base = 'https://foo.com/dir/file';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://foo.com/bar/main.js.map');
        });

        test('resolves relative to parent multiple directory', (t) => {
          const base = 'https://foo.com/dir/file';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://foo.com/bar/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = 'https://foo.com/dir/file';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://foo.com/dir/foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        test('resolves relative to current directory', (t) => {
          const base = 'https://foo.com/dir/file';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://foo.com/dir/bar/main.js.map');
        });

        test('resolves relative to parent multiple directory, later', (t) => {
          const base = 'https://foo.com/dir/file';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://foo.com/bar/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = 'https://foo.com/dir/file';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://foo.com/dir/foo/main.js.map');
        });
      });
    });

    describe(`base = "https://foo.com/.."`, () => {
      describe('with absolute input', () => {
        test('returns input', (t) => {
          const base = 'https://foo.com/..';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = 'https://foo.com/..';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/foo/main.js.map');
        });

        test('normalizes pathless input', (t) => {
          const base = 'https://foo.com/..';
          const input = 'https://absolute.com';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/');
        });

        test('normalizes current directory', (t) => {
          const base = 'https://foo.com/..';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = 'https://foo.com/..';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = 'https://foo.com/..';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        test('resolves relative to the base protocol', (t) => {
          const base = 'https://foo.com/..';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://protocol-relative.com/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = 'https://foo.com/..';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://protocol-relative.com/foo/main.js.map');
        });

        test('normalizes pathless input', (t) => {
          const base = 'https://foo.com/..';
          const input = '//protocol-relative.com';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://protocol-relative.com/');
        });

        test('normalizes current directory', (t) => {
          const base = 'https://foo.com/..';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = 'https://foo.com/..';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = 'https://foo.com/..';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        test('remains absolute path', (t) => {
          const base = 'https://foo.com/..';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://foo.com/assets/main.js.map');
        });

        test('trims to root', (t) => {
          const base = 'https://foo.com/..';
          const input = '/';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://foo.com/');
        });

        test('normalizes input', (t) => {
          const base = 'https://foo.com/..';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://foo.com/foo/main.js.map');
        });

        test('normalizes current directory', (t) => {
          const base = 'https://foo.com/..';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://foo.com/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = 'https://foo.com/..';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://foo.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = 'https://foo.com/..';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://foo.com/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        test('resolves relative to current directory', (t) => {
          const base = 'https://foo.com/..';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://foo.com/bar/main.js.map');
        });

        test('resolves relative to parent directory', (t) => {
          const base = 'https://foo.com/..';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://foo.com/bar/main.js.map');
        });

        test('resolves relative to parent multiple directory', (t) => {
          const base = 'https://foo.com/..';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://foo.com/bar/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = 'https://foo.com/..';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://foo.com/foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        test('resolves relative to current directory', (t) => {
          const base = 'https://foo.com/..';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://foo.com/bar/main.js.map');
        });

        test('resolves relative to parent multiple directory, later', (t) => {
          const base = 'https://foo.com/..';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://foo.com/bar/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = 'https://foo.com/..';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://foo.com/foo/main.js.map');
        });
      });
    });

    describe(`base = "https://foo.com/../"`, () => {
      describe('with absolute input', () => {
        test('returns input', (t) => {
          const base = 'https://foo.com/../';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = 'https://foo.com/../';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/foo/main.js.map');
        });

        test('normalizes pathless input', (t) => {
          const base = 'https://foo.com/../';
          const input = 'https://absolute.com';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/');
        });

        test('normalizes current directory', (t) => {
          const base = 'https://foo.com/../';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = 'https://foo.com/../';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = 'https://foo.com/../';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        test('resolves relative to the base protocol', (t) => {
          const base = 'https://foo.com/../';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://protocol-relative.com/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = 'https://foo.com/../';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://protocol-relative.com/foo/main.js.map');
        });

        test('normalizes pathless input', (t) => {
          const base = 'https://foo.com/../';
          const input = '//protocol-relative.com';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://protocol-relative.com/');
        });

        test('normalizes current directory', (t) => {
          const base = 'https://foo.com/../';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = 'https://foo.com/../';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = 'https://foo.com/../';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        test('remains absolute path', (t) => {
          const base = 'https://foo.com/../';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://foo.com/assets/main.js.map');
        });

        test('trims to root', (t) => {
          const base = 'https://foo.com/../';
          const input = '/';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://foo.com/');
        });

        test('normalizes input', (t) => {
          const base = 'https://foo.com/../';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://foo.com/foo/main.js.map');
        });

        test('normalizes current directory', (t) => {
          const base = 'https://foo.com/../';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://foo.com/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = 'https://foo.com/../';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://foo.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = 'https://foo.com/../';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://foo.com/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        test('resolves relative to current directory', (t) => {
          const base = 'https://foo.com/../';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://foo.com/bar/main.js.map');
        });

        test('resolves relative to parent directory', (t) => {
          const base = 'https://foo.com/../';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://foo.com/bar/main.js.map');
        });

        test('resolves relative to parent multiple directory', (t) => {
          const base = 'https://foo.com/../';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://foo.com/bar/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = 'https://foo.com/../';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://foo.com/foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        test('resolves relative to current directory', (t) => {
          const base = 'https://foo.com/../';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://foo.com/bar/main.js.map');
        });

        test('resolves relative to parent multiple directory, later', (t) => {
          const base = 'https://foo.com/../';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://foo.com/bar/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = 'https://foo.com/../';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://foo.com/foo/main.js.map');
        });
      });
    });

    describe(`base = "https://foo.com/dir/.."`, () => {
      describe('with absolute input', () => {
        test('returns input', (t) => {
          const base = 'https://foo.com/dir/..';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = 'https://foo.com/dir/..';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/foo/main.js.map');
        });

        test('normalizes pathless input', (t) => {
          const base = 'https://foo.com/dir/..';
          const input = 'https://absolute.com';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/');
        });

        test('normalizes current directory', (t) => {
          const base = 'https://foo.com/dir/..';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = 'https://foo.com/dir/..';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = 'https://foo.com/dir/..';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        test('resolves relative to the base protocol', (t) => {
          const base = 'https://foo.com/dir/..';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://protocol-relative.com/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = 'https://foo.com/dir/..';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://protocol-relative.com/foo/main.js.map');
        });

        test('normalizes pathless input', (t) => {
          const base = 'https://foo.com/dir/..';
          const input = '//protocol-relative.com';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://protocol-relative.com/');
        });

        test('normalizes current directory', (t) => {
          const base = 'https://foo.com/dir/..';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = 'https://foo.com/dir/..';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = 'https://foo.com/dir/..';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        test('remains absolute path', (t) => {
          const base = 'https://foo.com/dir/..';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://foo.com/assets/main.js.map');
        });

        test('trims to root', (t) => {
          const base = 'https://foo.com/dir/..';
          const input = '/';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://foo.com/');
        });

        test('normalizes input', (t) => {
          const base = 'https://foo.com/dir/..';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://foo.com/foo/main.js.map');
        });

        test('normalizes current directory', (t) => {
          const base = 'https://foo.com/dir/..';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://foo.com/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = 'https://foo.com/dir/..';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://foo.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = 'https://foo.com/dir/..';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://foo.com/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        test('resolves relative to current directory', (t) => {
          const base = 'https://foo.com/dir/..';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://foo.com/bar/main.js.map');
        });

        test('resolves relative to parent directory', (t) => {
          const base = 'https://foo.com/dir/..';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://foo.com/bar/main.js.map');
        });

        test('resolves relative to parent multiple directory', (t) => {
          const base = 'https://foo.com/dir/..';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://foo.com/bar/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = 'https://foo.com/dir/..';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://foo.com/foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        test('resolves relative to current directory', (t) => {
          const base = 'https://foo.com/dir/..';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://foo.com/bar/main.js.map');
        });

        test('resolves relative to parent multiple directory, later', (t) => {
          const base = 'https://foo.com/dir/..';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://foo.com/bar/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = 'https://foo.com/dir/..';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://foo.com/foo/main.js.map');
        });
      });
    });
  });

  describe('with protocol relative base', () => {
    describe(`base = "//foo.com"`, () => {
      describe('with absolute input', () => {
        test('returns input', (t) => {
          const base = '//foo.com';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = '//foo.com';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/foo/main.js.map');
        });

        test('normalizes pathless input', (t) => {
          const base = '//foo.com';
          const input = 'https://absolute.com';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/');
        });

        test('normalizes current directory', (t) => {
          const base = '//foo.com';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = '//foo.com';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = '//foo.com';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        test('resolves relative to the base protocol', (t) => {
          const base = '//foo.com';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = '//foo.com';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/foo/main.js.map');
        });

        test('normalizes pathless input', (t) => {
          const base = '//foo.com';
          const input = '//protocol-relative.com';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/');
        });

        test('normalizes current directory', (t) => {
          const base = '//foo.com';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = '//foo.com';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = '//foo.com';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        test('remains absolute path', (t) => {
          const base = '//foo.com';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//foo.com/assets/main.js.map');
        });

        test('trims to root', (t) => {
          const base = '//foo.com';
          const input = '/';
          const resolved = resolve(input, base);
          t.is(resolved, '//foo.com/');
        });

        test('normalizes input', (t) => {
          const base = '//foo.com';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//foo.com/foo/main.js.map');
        });

        test('normalizes current directory', (t) => {
          const base = '//foo.com';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//foo.com/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = '//foo.com';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//foo.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = '//foo.com';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//foo.com/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        test('resolves relative to current directory', (t) => {
          const base = '//foo.com';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//foo.com/bar/main.js.map');
        });

        test('resolves relative to parent directory', (t) => {
          const base = '//foo.com';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//foo.com/bar/main.js.map');
        });

        test('resolves relative to parent multiple directory', (t) => {
          const base = '//foo.com';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//foo.com/bar/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = '//foo.com';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//foo.com/foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        test('resolves relative to current directory', (t) => {
          const base = '//foo.com';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//foo.com/bar/main.js.map');
        });

        test('resolves relative to parent multiple directory, later', (t) => {
          const base = '//foo.com';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//foo.com/bar/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = '//foo.com';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//foo.com/foo/main.js.map');
        });
      });
    });

    describe(`base = "//foo.com/"`, () => {
      describe('with absolute input', () => {
        test('returns input', (t) => {
          const base = '//foo.com/';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = '//foo.com/';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/foo/main.js.map');
        });

        test('normalizes pathless input', (t) => {
          const base = '//foo.com/';
          const input = 'https://absolute.com';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/');
        });

        test('normalizes current directory', (t) => {
          const base = '//foo.com/';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = '//foo.com/';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = '//foo.com/';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        test('resolves relative to the base protocol', (t) => {
          const base = '//foo.com/';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = '//foo.com/';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/foo/main.js.map');
        });

        test('normalizes pathless input', (t) => {
          const base = '//foo.com/';
          const input = '//protocol-relative.com';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/');
        });

        test('normalizes current directory', (t) => {
          const base = '//foo.com/';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = '//foo.com/';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = '//foo.com/';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        test('remains absolute path', (t) => {
          const base = '//foo.com/';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//foo.com/assets/main.js.map');
        });

        test('trims to root', (t) => {
          const base = '//foo.com/';
          const input = '/';
          const resolved = resolve(input, base);
          t.is(resolved, '//foo.com/');
        });

        test('normalizes input', (t) => {
          const base = '//foo.com/';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//foo.com/foo/main.js.map');
        });

        test('normalizes current directory', (t) => {
          const base = '//foo.com/';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//foo.com/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = '//foo.com/';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//foo.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = '//foo.com/';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//foo.com/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        test('resolves relative to current directory', (t) => {
          const base = '//foo.com/';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//foo.com/bar/main.js.map');
        });

        test('resolves relative to parent directory', (t) => {
          const base = '//foo.com/';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//foo.com/bar/main.js.map');
        });

        test('resolves relative to parent multiple directory', (t) => {
          const base = '//foo.com/';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//foo.com/bar/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = '//foo.com/';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//foo.com/foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        test('resolves relative to current directory', (t) => {
          const base = '//foo.com/';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//foo.com/bar/main.js.map');
        });

        test('resolves relative to parent multiple directory, later', (t) => {
          const base = '//foo.com/';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//foo.com/bar/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = '//foo.com/';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//foo.com/foo/main.js.map');
        });
      });
    });

    describe(`base = "//foo.com/file"`, () => {
      describe('with absolute input', () => {
        test('returns input', (t) => {
          const base = '//foo.com/file';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = '//foo.com/file';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/foo/main.js.map');
        });

        test('normalizes pathless input', (t) => {
          const base = '//foo.com/file';
          const input = 'https://absolute.com';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/');
        });

        test('normalizes current directory', (t) => {
          const base = '//foo.com/file';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = '//foo.com/file';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = '//foo.com/file';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        test('resolves relative to the base protocol', (t) => {
          const base = '//foo.com/file';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = '//foo.com/file';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/foo/main.js.map');
        });

        test('normalizes pathless input', (t) => {
          const base = '//foo.com/file';
          const input = '//protocol-relative.com';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/');
        });

        test('normalizes current directory', (t) => {
          const base = '//foo.com/file';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = '//foo.com/file';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = '//foo.com/file';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        test('remains absolute path', (t) => {
          const base = '//foo.com/file';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//foo.com/assets/main.js.map');
        });

        test('trims to root', (t) => {
          const base = '//foo.com/file';
          const input = '/';
          const resolved = resolve(input, base);
          t.is(resolved, '//foo.com/');
        });

        test('normalizes input', (t) => {
          const base = '//foo.com/file';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//foo.com/foo/main.js.map');
        });

        test('normalizes current directory', (t) => {
          const base = '//foo.com/file';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//foo.com/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = '//foo.com/file';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//foo.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = '//foo.com/file';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//foo.com/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        test('resolves relative to current directory', (t) => {
          const base = '//foo.com/file';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//foo.com/bar/main.js.map');
        });

        test('resolves relative to parent directory', (t) => {
          const base = '//foo.com/file';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//foo.com/bar/main.js.map');
        });

        test('resolves relative to parent multiple directory', (t) => {
          const base = '//foo.com/file';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//foo.com/bar/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = '//foo.com/file';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//foo.com/foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        test('resolves relative to current directory', (t) => {
          const base = '//foo.com/file';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//foo.com/bar/main.js.map');
        });

        test('resolves relative to parent multiple directory, later', (t) => {
          const base = '//foo.com/file';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//foo.com/bar/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = '//foo.com/file';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//foo.com/foo/main.js.map');
        });
      });
    });

    describe(`base = "//foo.com/dir/"`, () => {
      describe('with absolute input', () => {
        test('returns input', (t) => {
          const base = '//foo.com/dir/';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = '//foo.com/dir/';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/foo/main.js.map');
        });

        test('normalizes pathless input', (t) => {
          const base = '//foo.com/dir/';
          const input = 'https://absolute.com';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/');
        });

        test('normalizes current directory', (t) => {
          const base = '//foo.com/dir/';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = '//foo.com/dir/';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = '//foo.com/dir/';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        test('resolves relative to the base protocol', (t) => {
          const base = '//foo.com/dir/';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = '//foo.com/dir/';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/foo/main.js.map');
        });

        test('normalizes pathless input', (t) => {
          const base = '//foo.com/dir/';
          const input = '//protocol-relative.com';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/');
        });

        test('normalizes current directory', (t) => {
          const base = '//foo.com/dir/';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = '//foo.com/dir/';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = '//foo.com/dir/';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        test('remains absolute path', (t) => {
          const base = '//foo.com/dir/';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//foo.com/assets/main.js.map');
        });

        test('trims to root', (t) => {
          const base = '//foo.com/dir/';
          const input = '/';
          const resolved = resolve(input, base);
          t.is(resolved, '//foo.com/');
        });

        test('normalizes input', (t) => {
          const base = '//foo.com/dir/';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//foo.com/foo/main.js.map');
        });

        test('normalizes current directory', (t) => {
          const base = '//foo.com/dir/';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//foo.com/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = '//foo.com/dir/';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//foo.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = '//foo.com/dir/';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//foo.com/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        test('resolves relative to current directory', (t) => {
          const base = '//foo.com/dir/';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//foo.com/dir/bar/main.js.map');
        });

        test('resolves relative to parent directory', (t) => {
          const base = '//foo.com/dir/';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//foo.com/bar/main.js.map');
        });

        test('resolves relative to parent multiple directory', (t) => {
          const base = '//foo.com/dir/';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//foo.com/bar/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = '//foo.com/dir/';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//foo.com/dir/foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        test('resolves relative to current directory', (t) => {
          const base = '//foo.com/dir/';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//foo.com/dir/bar/main.js.map');
        });

        test('resolves relative to parent multiple directory, later', (t) => {
          const base = '//foo.com/dir/';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//foo.com/bar/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = '//foo.com/dir/';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//foo.com/dir/foo/main.js.map');
        });
      });
    });

    describe(`base = "//foo.com/dir/file"`, () => {
      describe('with absolute input', () => {
        test('returns input', (t) => {
          const base = '//foo.com/dir/file';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = '//foo.com/dir/file';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/foo/main.js.map');
        });

        test('normalizes pathless input', (t) => {
          const base = '//foo.com/dir/file';
          const input = 'https://absolute.com';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/');
        });

        test('normalizes current directory', (t) => {
          const base = '//foo.com/dir/file';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = '//foo.com/dir/file';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = '//foo.com/dir/file';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        test('resolves relative to the base protocol', (t) => {
          const base = '//foo.com/dir/file';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = '//foo.com/dir/file';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/foo/main.js.map');
        });

        test('normalizes pathless input', (t) => {
          const base = '//foo.com/dir/file';
          const input = '//protocol-relative.com';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/');
        });

        test('normalizes current directory', (t) => {
          const base = '//foo.com/dir/file';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = '//foo.com/dir/file';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = '//foo.com/dir/file';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        test('remains absolute path', (t) => {
          const base = '//foo.com/dir/file';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//foo.com/assets/main.js.map');
        });

        test('trims to root', (t) => {
          const base = '//foo.com/dir/file';
          const input = '/';
          const resolved = resolve(input, base);
          t.is(resolved, '//foo.com/');
        });

        test('normalizes input', (t) => {
          const base = '//foo.com/dir/file';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//foo.com/foo/main.js.map');
        });

        test('normalizes current directory', (t) => {
          const base = '//foo.com/dir/file';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//foo.com/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = '//foo.com/dir/file';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//foo.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = '//foo.com/dir/file';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//foo.com/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        test('resolves relative to current directory', (t) => {
          const base = '//foo.com/dir/file';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//foo.com/dir/bar/main.js.map');
        });

        test('resolves relative to parent directory', (t) => {
          const base = '//foo.com/dir/file';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//foo.com/bar/main.js.map');
        });

        test('resolves relative to parent multiple directory', (t) => {
          const base = '//foo.com/dir/file';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//foo.com/bar/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = '//foo.com/dir/file';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//foo.com/dir/foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        test('resolves relative to current directory', (t) => {
          const base = '//foo.com/dir/file';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//foo.com/dir/bar/main.js.map');
        });

        test('resolves relative to parent multiple directory, later', (t) => {
          const base = '//foo.com/dir/file';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//foo.com/bar/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = '//foo.com/dir/file';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//foo.com/dir/foo/main.js.map');
        });
      });
    });

    describe(`base = "//foo.com/.."`, () => {
      describe('with absolute input', () => {
        test('returns input', (t) => {
          const base = '//foo.com/..';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = '//foo.com/..';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/foo/main.js.map');
        });

        test('normalizes pathless input', (t) => {
          const base = '//foo.com/..';
          const input = 'https://absolute.com';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/');
        });

        test('normalizes current directory', (t) => {
          const base = '//foo.com/..';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = '//foo.com/..';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = '//foo.com/..';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        test('resolves relative to the base protocol', (t) => {
          const base = '//foo.com/..';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = '//foo.com/..';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/foo/main.js.map');
        });

        test('normalizes pathless input', (t) => {
          const base = '//foo.com/..';
          const input = '//protocol-relative.com';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/');
        });

        test('normalizes current directory', (t) => {
          const base = '//foo.com/..';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = '//foo.com/..';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = '//foo.com/..';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        test('remains absolute path', (t) => {
          const base = '//foo.com/..';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//foo.com/assets/main.js.map');
        });

        test('trims to root', (t) => {
          const base = '//foo.com/..';
          const input = '/';
          const resolved = resolve(input, base);
          t.is(resolved, '//foo.com/');
        });

        test('normalizes input', (t) => {
          const base = '//foo.com/..';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//foo.com/foo/main.js.map');
        });

        test('normalizes current directory', (t) => {
          const base = '//foo.com/..';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//foo.com/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = '//foo.com/..';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//foo.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = '//foo.com/..';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//foo.com/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        test('resolves relative to current directory', (t) => {
          const base = '//foo.com/..';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//foo.com/bar/main.js.map');
        });

        test('resolves relative to parent directory', (t) => {
          const base = '//foo.com/..';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//foo.com/bar/main.js.map');
        });

        test('resolves relative to parent multiple directory', (t) => {
          const base = '//foo.com/..';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//foo.com/bar/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = '//foo.com/..';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//foo.com/foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        test('resolves relative to current directory', (t) => {
          const base = '//foo.com/..';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//foo.com/bar/main.js.map');
        });

        test('resolves relative to parent multiple directory, later', (t) => {
          const base = '//foo.com/..';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//foo.com/bar/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = '//foo.com/..';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//foo.com/foo/main.js.map');
        });
      });
    });

    describe(`base = "//foo.com/../"`, () => {
      describe('with absolute input', () => {
        test('returns input', (t) => {
          const base = '//foo.com/../';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = '//foo.com/../';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/foo/main.js.map');
        });

        test('normalizes pathless input', (t) => {
          const base = '//foo.com/../';
          const input = 'https://absolute.com';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/');
        });

        test('normalizes current directory', (t) => {
          const base = '//foo.com/../';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = '//foo.com/../';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = '//foo.com/../';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        test('resolves relative to the base protocol', (t) => {
          const base = '//foo.com/../';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = '//foo.com/../';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/foo/main.js.map');
        });

        test('normalizes pathless input', (t) => {
          const base = '//foo.com/../';
          const input = '//protocol-relative.com';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/');
        });

        test('normalizes current directory', (t) => {
          const base = '//foo.com/../';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = '//foo.com/../';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = '//foo.com/../';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        test('remains absolute path', (t) => {
          const base = '//foo.com/../';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//foo.com/assets/main.js.map');
        });

        test('trims to root', (t) => {
          const base = '//foo.com/../';
          const input = '/';
          const resolved = resolve(input, base);
          t.is(resolved, '//foo.com/');
        });

        test('normalizes input', (t) => {
          const base = '//foo.com/../';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//foo.com/foo/main.js.map');
        });

        test('normalizes current directory', (t) => {
          const base = '//foo.com/../';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//foo.com/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = '//foo.com/../';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//foo.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = '//foo.com/../';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//foo.com/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        test('resolves relative to current directory', (t) => {
          const base = '//foo.com/../';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//foo.com/bar/main.js.map');
        });

        test('resolves relative to parent directory', (t) => {
          const base = '//foo.com/../';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//foo.com/bar/main.js.map');
        });

        test('resolves relative to parent multiple directory', (t) => {
          const base = '//foo.com/../';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//foo.com/bar/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = '//foo.com/../';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//foo.com/foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        test('resolves relative to current directory', (t) => {
          const base = '//foo.com/../';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//foo.com/bar/main.js.map');
        });

        test('resolves relative to parent multiple directory, later', (t) => {
          const base = '//foo.com/../';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//foo.com/bar/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = '//foo.com/../';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//foo.com/foo/main.js.map');
        });
      });
    });

    describe(`base = "//foo.com/dir/.."`, () => {
      describe('with absolute input', () => {
        test('returns input', (t) => {
          const base = '//foo.com/dir/..';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = '//foo.com/dir/..';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/foo/main.js.map');
        });

        test('normalizes pathless input', (t) => {
          const base = '//foo.com/dir/..';
          const input = 'https://absolute.com';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/');
        });

        test('normalizes current directory', (t) => {
          const base = '//foo.com/dir/..';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = '//foo.com/dir/..';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = '//foo.com/dir/..';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        test('resolves relative to the base protocol', (t) => {
          const base = '//foo.com/dir/..';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = '//foo.com/dir/..';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/foo/main.js.map');
        });

        test('normalizes pathless input', (t) => {
          const base = '//foo.com/dir/..';
          const input = '//protocol-relative.com';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/');
        });

        test('normalizes current directory', (t) => {
          const base = '//foo.com/dir/..';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = '//foo.com/dir/..';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = '//foo.com/dir/..';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        test('remains absolute path', (t) => {
          const base = '//foo.com/dir/..';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//foo.com/assets/main.js.map');
        });

        test('trims to root', (t) => {
          const base = '//foo.com/dir/..';
          const input = '/';
          const resolved = resolve(input, base);
          t.is(resolved, '//foo.com/');
        });

        test('normalizes input', (t) => {
          const base = '//foo.com/dir/..';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//foo.com/foo/main.js.map');
        });

        test('normalizes current directory', (t) => {
          const base = '//foo.com/dir/..';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//foo.com/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = '//foo.com/dir/..';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//foo.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = '//foo.com/dir/..';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//foo.com/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        test('resolves relative to current directory', (t) => {
          const base = '//foo.com/dir/..';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//foo.com/bar/main.js.map');
        });

        test('resolves relative to parent directory', (t) => {
          const base = '//foo.com/dir/..';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//foo.com/bar/main.js.map');
        });

        test('resolves relative to parent multiple directory', (t) => {
          const base = '//foo.com/dir/..';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//foo.com/bar/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = '//foo.com/dir/..';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//foo.com/foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        test('resolves relative to current directory', (t) => {
          const base = '//foo.com/dir/..';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//foo.com/bar/main.js.map');
        });

        test('resolves relative to parent multiple directory, later', (t) => {
          const base = '//foo.com/dir/..';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//foo.com/bar/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = '//foo.com/dir/..';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//foo.com/foo/main.js.map');
        });
      });
    });
  });

  describe('with path absolute base', () => {
    describe(`base = "/"`, () => {
      describe('with absolute input', () => {
        test('returns input', (t) => {
          const base = '/';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = '/';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/foo/main.js.map');
        });

        test('normalizes pathless input', (t) => {
          const base = '/';
          const input = 'https://absolute.com';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/');
        });

        test('normalizes current directory', (t) => {
          const base = '/';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = '/';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = '/';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        test('resolves relative to the base protocol', (t) => {
          const base = '/';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = '/';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/foo/main.js.map');
        });

        test('normalizes pathless input', (t) => {
          const base = '/';
          const input = '//protocol-relative.com';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/');
        });

        test('normalizes current directory', (t) => {
          const base = '/';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = '/';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = '/';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        test('remains absolute path', (t) => {
          const base = '/';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/assets/main.js.map');
        });

        test('trims to root', (t) => {
          const base = '/';
          const input = '/';
          const resolved = resolve(input, base);
          t.is(resolved, '/');
        });

        test('normalizes input', (t) => {
          const base = '/';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/foo/main.js.map');
        });

        test('normalizes current directory', (t) => {
          const base = '/';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = '/';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = '/';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        test('resolves relative to current directory', (t) => {
          const base = '/';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/bar/main.js.map');
        });

        test('resolves relative to parent directory', (t) => {
          const base = '/';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/bar/main.js.map');
        });

        test('resolves relative to parent multiple directory', (t) => {
          const base = '/';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/bar/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = '/';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        test('resolves relative to current directory', (t) => {
          const base = '/';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/bar/main.js.map');
        });

        test('resolves relative to parent multiple directory, later', (t) => {
          const base = '/';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/bar/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = '/';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/foo/main.js.map');
        });
      });
    });

    describe(`base = "/root"`, () => {
      describe('with absolute input', () => {
        test('returns input', (t) => {
          const base = '/root';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = '/root';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/foo/main.js.map');
        });

        test('normalizes pathless input', (t) => {
          const base = '/root';
          const input = 'https://absolute.com';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/');
        });

        test('normalizes current directory', (t) => {
          const base = '/root';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = '/root';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = '/root';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        test('resolves relative to the base protocol', (t) => {
          const base = '/root';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = '/root';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/foo/main.js.map');
        });

        test('normalizes pathless input', (t) => {
          const base = '/root';
          const input = '//protocol-relative.com';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/');
        });

        test('normalizes current directory', (t) => {
          const base = '/root';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = '/root';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = '/root';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        test('remains absolute path', (t) => {
          const base = '/root';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/assets/main.js.map');
        });

        test('trims to root', (t) => {
          const base = '/root';
          const input = '/';
          const resolved = resolve(input, base);
          t.is(resolved, '/');
        });

        test('normalizes input', (t) => {
          const base = '/root';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/foo/main.js.map');
        });

        test('normalizes current directory', (t) => {
          const base = '/root';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = '/root';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = '/root';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        test('resolves relative to current directory', (t) => {
          const base = '/root';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/bar/main.js.map');
        });

        test('resolves relative to parent directory', (t) => {
          const base = '/root';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/bar/main.js.map');
        });

        test('resolves relative to parent multiple directory', (t) => {
          const base = '/root';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/bar/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = '/root';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        test('resolves relative to current directory', (t) => {
          const base = '/root';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/bar/main.js.map');
        });

        test('resolves relative to parent multiple directory, later', (t) => {
          const base = '/root';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/bar/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = '/root';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/foo/main.js.map');
        });
      });
    });

    describe(`base = "/root/"`, () => {
      describe('with absolute input', () => {
        test('returns input', (t) => {
          const base = '/root/';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = '/root/';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/foo/main.js.map');
        });

        test('normalizes pathless input', (t) => {
          const base = '/root/';
          const input = 'https://absolute.com';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/');
        });

        test('normalizes current directory', (t) => {
          const base = '/root/';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = '/root/';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = '/root/';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        test('resolves relative to the base protocol', (t) => {
          const base = '/root/';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = '/root/';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/foo/main.js.map');
        });

        test('normalizes pathless input', (t) => {
          const base = '/root/';
          const input = '//protocol-relative.com';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/');
        });

        test('normalizes current directory', (t) => {
          const base = '/root/';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = '/root/';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = '/root/';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        test('remains absolute path', (t) => {
          const base = '/root/';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/assets/main.js.map');
        });

        test('trims to root', (t) => {
          const base = '/root/';
          const input = '/';
          const resolved = resolve(input, base);
          t.is(resolved, '/');
        });

        test('normalizes input', (t) => {
          const base = '/root/';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/foo/main.js.map');
        });

        test('normalizes current directory', (t) => {
          const base = '/root/';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = '/root/';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = '/root/';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        test('resolves relative to current directory', (t) => {
          const base = '/root/';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/root/bar/main.js.map');
        });

        test('resolves relative to parent directory', (t) => {
          const base = '/root/';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/bar/main.js.map');
        });

        test('resolves relative to parent multiple directory', (t) => {
          const base = '/root/';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/bar/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = '/root/';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/root/foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        test('resolves relative to current directory', (t) => {
          const base = '/root/';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/root/bar/main.js.map');
        });

        test('resolves relative to parent multiple directory, later', (t) => {
          const base = '/root/';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/bar/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = '/root/';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/root/foo/main.js.map');
        });
      });
    });

    describe(`base = "/root/file"`, () => {
      describe('with absolute input', () => {
        test('returns input', (t) => {
          const base = '/root/file';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = '/root/file';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/foo/main.js.map');
        });

        test('normalizes pathless input', (t) => {
          const base = '/root/file';
          const input = 'https://absolute.com';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/');
        });

        test('normalizes current directory', (t) => {
          const base = '/root/file';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = '/root/file';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = '/root/file';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        test('resolves relative to the base protocol', (t) => {
          const base = '/root/file';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = '/root/file';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/foo/main.js.map');
        });

        test('normalizes pathless input', (t) => {
          const base = '/root/file';
          const input = '//protocol-relative.com';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/');
        });

        test('normalizes current directory', (t) => {
          const base = '/root/file';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = '/root/file';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = '/root/file';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        test('remains absolute path', (t) => {
          const base = '/root/file';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/assets/main.js.map');
        });

        test('trims to root', (t) => {
          const base = '/root/file';
          const input = '/';
          const resolved = resolve(input, base);
          t.is(resolved, '/');
        });

        test('normalizes input', (t) => {
          const base = '/root/file';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/foo/main.js.map');
        });

        test('normalizes current directory', (t) => {
          const base = '/root/file';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = '/root/file';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = '/root/file';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        test('resolves relative to current directory', (t) => {
          const base = '/root/file';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/root/bar/main.js.map');
        });

        test('resolves relative to parent directory', (t) => {
          const base = '/root/file';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/bar/main.js.map');
        });

        test('resolves relative to parent multiple directory', (t) => {
          const base = '/root/file';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/bar/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = '/root/file';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/root/foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        test('resolves relative to current directory', (t) => {
          const base = '/root/file';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/root/bar/main.js.map');
        });

        test('resolves relative to parent multiple directory, later', (t) => {
          const base = '/root/file';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/bar/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = '/root/file';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/root/foo/main.js.map');
        });
      });
    });

    describe(`base = "/root/dir/"`, () => {
      describe('with absolute input', () => {
        test('returns input', (t) => {
          const base = '/root/dir/';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = '/root/dir/';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/foo/main.js.map');
        });

        test('normalizes pathless input', (t) => {
          const base = '/root/dir/';
          const input = 'https://absolute.com';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/');
        });

        test('normalizes current directory', (t) => {
          const base = '/root/dir/';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = '/root/dir/';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = '/root/dir/';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        test('resolves relative to the base protocol', (t) => {
          const base = '/root/dir/';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = '/root/dir/';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/foo/main.js.map');
        });

        test('normalizes pathless input', (t) => {
          const base = '/root/dir/';
          const input = '//protocol-relative.com';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/');
        });

        test('normalizes current directory', (t) => {
          const base = '/root/dir/';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = '/root/dir/';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = '/root/dir/';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        test('remains absolute path', (t) => {
          const base = '/root/dir/';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/assets/main.js.map');
        });

        test('trims to root', (t) => {
          const base = '/root/dir/';
          const input = '/';
          const resolved = resolve(input, base);
          t.is(resolved, '/');
        });

        test('normalizes input', (t) => {
          const base = '/root/dir/';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/foo/main.js.map');
        });

        test('normalizes current directory', (t) => {
          const base = '/root/dir/';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = '/root/dir/';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = '/root/dir/';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        test('resolves relative to current directory', (t) => {
          const base = '/root/dir/';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/root/dir/bar/main.js.map');
        });

        test('resolves relative to parent directory', (t) => {
          const base = '/root/dir/';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/root/bar/main.js.map');
        });

        test('resolves relative to parent multiple directory', (t) => {
          const base = '/root/dir/';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/bar/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = '/root/dir/';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/root/dir/foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        test('resolves relative to current directory', (t) => {
          const base = '/root/dir/';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/root/dir/bar/main.js.map');
        });

        test('resolves relative to parent multiple directory, later', (t) => {
          const base = '/root/dir/';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/bar/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = '/root/dir/';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/root/dir/foo/main.js.map');
        });
      });
    });

    describe(`base = "/.."`, () => {
      describe('with absolute input', () => {
        test('returns input', (t) => {
          const base = '/..';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = '/..';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/foo/main.js.map');
        });

        test('normalizes pathless input', (t) => {
          const base = '/..';
          const input = 'https://absolute.com';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/');
        });

        test('normalizes current directory', (t) => {
          const base = '/..';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = '/..';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = '/..';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        test('resolves relative to the base protocol', (t) => {
          const base = '/..';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = '/..';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/foo/main.js.map');
        });

        test('normalizes pathless input', (t) => {
          const base = '/..';
          const input = '//protocol-relative.com';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/');
        });

        test('normalizes current directory', (t) => {
          const base = '/..';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = '/..';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = '/..';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        test('remains absolute path', (t) => {
          const base = '/..';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/assets/main.js.map');
        });

        test('trims to root', (t) => {
          const base = '/..';
          const input = '/';
          const resolved = resolve(input, base);
          t.is(resolved, '/');
        });

        test('normalizes input', (t) => {
          const base = '/..';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/foo/main.js.map');
        });

        test('normalizes current directory', (t) => {
          const base = '/..';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = '/..';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = '/..';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        test('resolves relative to current directory', (t) => {
          const base = '/..';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/bar/main.js.map');
        });

        test('resolves relative to parent directory', (t) => {
          const base = '/..';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/bar/main.js.map');
        });

        test('resolves relative to parent multiple directory', (t) => {
          const base = '/..';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/bar/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = '/..';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        test('resolves relative to current directory', (t) => {
          const base = '/..';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/bar/main.js.map');
        });

        test('resolves relative to parent multiple directory, later', (t) => {
          const base = '/..';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/bar/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = '/..';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/foo/main.js.map');
        });
      });
    });

    describe(`base = "/../"`, () => {
      describe('with absolute input', () => {
        test('returns input', (t) => {
          const base = '/../';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = '/../';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/foo/main.js.map');
        });

        test('normalizes pathless input', (t) => {
          const base = '/../';
          const input = 'https://absolute.com';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/');
        });

        test('normalizes current directory', (t) => {
          const base = '/../';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = '/../';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = '/../';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        test('resolves relative to the base protocol', (t) => {
          const base = '/../';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = '/../';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/foo/main.js.map');
        });

        test('normalizes pathless input', (t) => {
          const base = '/../';
          const input = '//protocol-relative.com';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/');
        });

        test('normalizes current directory', (t) => {
          const base = '/../';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = '/../';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = '/../';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        test('remains absolute path', (t) => {
          const base = '/../';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/assets/main.js.map');
        });

        test('trims to root', (t) => {
          const base = '/../';
          const input = '/';
          const resolved = resolve(input, base);
          t.is(resolved, '/');
        });

        test('normalizes input', (t) => {
          const base = '/../';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/foo/main.js.map');
        });

        test('normalizes current directory', (t) => {
          const base = '/../';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = '/../';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = '/../';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        test('resolves relative to current directory', (t) => {
          const base = '/../';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/bar/main.js.map');
        });

        test('resolves relative to parent directory', (t) => {
          const base = '/../';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/bar/main.js.map');
        });

        test('resolves relative to parent multiple directory', (t) => {
          const base = '/../';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/bar/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = '/../';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        test('resolves relative to current directory', (t) => {
          const base = '/../';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/bar/main.js.map');
        });

        test('resolves relative to parent multiple directory, later', (t) => {
          const base = '/../';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/bar/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = '/../';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/foo/main.js.map');
        });
      });
    });

    describe(`base = "/root/.."`, () => {
      describe('with absolute input', () => {
        test('returns input', (t) => {
          const base = '/root/..';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = '/root/..';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/foo/main.js.map');
        });

        test('normalizes pathless input', (t) => {
          const base = '/root/..';
          const input = 'https://absolute.com';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/');
        });

        test('normalizes current directory', (t) => {
          const base = '/root/..';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = '/root/..';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = '/root/..';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        test('resolves relative to the base protocol', (t) => {
          const base = '/root/..';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = '/root/..';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/foo/main.js.map');
        });

        test('normalizes pathless input', (t) => {
          const base = '/root/..';
          const input = '//protocol-relative.com';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/');
        });

        test('normalizes current directory', (t) => {
          const base = '/root/..';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = '/root/..';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = '/root/..';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        test('remains absolute path', (t) => {
          const base = '/root/..';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/assets/main.js.map');
        });

        test('trims to root', (t) => {
          const base = '/root/..';
          const input = '/';
          const resolved = resolve(input, base);
          t.is(resolved, '/');
        });

        test('normalizes input', (t) => {
          const base = '/root/..';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/foo/main.js.map');
        });

        test('normalizes current directory', (t) => {
          const base = '/root/..';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = '/root/..';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = '/root/..';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        test('resolves relative to current directory', (t) => {
          const base = '/root/..';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/bar/main.js.map');
        });

        test('resolves relative to parent directory', (t) => {
          const base = '/root/..';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/bar/main.js.map');
        });

        test('resolves relative to parent multiple directory', (t) => {
          const base = '/root/..';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/bar/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = '/root/..';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        test('resolves relative to current directory', (t) => {
          const base = '/root/..';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/bar/main.js.map');
        });

        test('resolves relative to parent multiple directory, later', (t) => {
          const base = '/root/..';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/bar/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = '/root/..';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/foo/main.js.map');
        });
      });
    });

    describe(`base = "/root/../"`, () => {
      describe('with absolute input', () => {
        test('returns input', (t) => {
          const base = '/root/../';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = '/root/../';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/foo/main.js.map');
        });

        test('normalizes pathless input', (t) => {
          const base = '/root/../';
          const input = 'https://absolute.com';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/');
        });

        test('normalizes current directory', (t) => {
          const base = '/root/../';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = '/root/../';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = '/root/../';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        test('resolves relative to the base protocol', (t) => {
          const base = '/root/../';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = '/root/../';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/foo/main.js.map');
        });

        test('normalizes pathless input', (t) => {
          const base = '/root/../';
          const input = '//protocol-relative.com';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/');
        });

        test('normalizes current directory', (t) => {
          const base = '/root/../';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = '/root/../';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = '/root/../';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        test('remains absolute path', (t) => {
          const base = '/root/../';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/assets/main.js.map');
        });

        test('trims to root', (t) => {
          const base = '/root/../';
          const input = '/';
          const resolved = resolve(input, base);
          t.is(resolved, '/');
        });

        test('normalizes input', (t) => {
          const base = '/root/../';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/foo/main.js.map');
        });

        test('normalizes current directory', (t) => {
          const base = '/root/../';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = '/root/../';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = '/root/../';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        test('resolves relative to current directory', (t) => {
          const base = '/root/../';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/bar/main.js.map');
        });

        test('resolves relative to parent directory', (t) => {
          const base = '/root/../';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/bar/main.js.map');
        });

        test('resolves relative to parent multiple directory', (t) => {
          const base = '/root/../';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/bar/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = '/root/../';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        test('resolves relative to current directory', (t) => {
          const base = '/root/../';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/bar/main.js.map');
        });

        test('resolves relative to parent multiple directory, later', (t) => {
          const base = '/root/../';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/bar/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = '/root/../';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/foo/main.js.map');
        });
      });
    });
  });

  describe('with relative base', () => {
    describe(`base = "file"`, () => {
      describe('with absolute input', () => {
        test('returns input', (t) => {
          const base = 'file';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = 'file';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/foo/main.js.map');
        });

        test('normalizes pathless input', (t) => {
          const base = 'file';
          const input = 'https://absolute.com';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/');
        });

        test('normalizes current directory', (t) => {
          const base = 'file';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = 'file';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = 'file';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        test('resolves relative to the base protocol', (t) => {
          const base = 'file';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = 'file';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/foo/main.js.map');
        });

        test('normalizes pathless input', (t) => {
          const base = 'file';
          const input = '//protocol-relative.com';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/');
        });

        test('normalizes current directory', (t) => {
          const base = 'file';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = 'file';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = 'file';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        test('remains absolute path', (t) => {
          const base = 'file';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/assets/main.js.map');
        });

        test('trims to root', (t) => {
          const base = 'file';
          const input = '/';
          const resolved = resolve(input, base);
          t.is(resolved, '/');
        });

        test('normalizes input', (t) => {
          const base = 'file';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/foo/main.js.map');
        });

        test('normalizes current directory', (t) => {
          const base = 'file';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = 'file';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = 'file';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        test('resolves relative to current directory', (t) => {
          const base = 'file';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'bar/main.js.map');
        });

        test('resolves relative to parent directory', (t) => {
          const base = 'file';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '../bar/main.js.map');
        });

        test('resolves relative to parent multiple directory', (t) => {
          const base = 'file';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '../../../bar/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = 'file';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        test('resolves relative to current directory', (t) => {
          const base = 'file';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'bar/main.js.map');
        });

        test('resolves relative to parent multiple directory, later', (t) => {
          const base = 'file';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '../../bar/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = 'file';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'foo/main.js.map');
        });
      });
    });

    describe(`base = "dir/"`, () => {
      describe('with absolute input', () => {
        test('returns input', (t) => {
          const base = 'dir/';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = 'dir/';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/foo/main.js.map');
        });

        test('normalizes pathless input', (t) => {
          const base = 'dir/';
          const input = 'https://absolute.com';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/');
        });

        test('normalizes current directory', (t) => {
          const base = 'dir/';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = 'dir/';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = 'dir/';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        test('resolves relative to the base protocol', (t) => {
          const base = 'dir/';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = 'dir/';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/foo/main.js.map');
        });

        test('normalizes pathless input', (t) => {
          const base = 'dir/';
          const input = '//protocol-relative.com';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/');
        });

        test('normalizes current directory', (t) => {
          const base = 'dir/';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = 'dir/';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = 'dir/';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        test('remains absolute path', (t) => {
          const base = 'dir/';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/assets/main.js.map');
        });

        test('trims to root', (t) => {
          const base = 'dir/';
          const input = '/';
          const resolved = resolve(input, base);
          t.is(resolved, '/');
        });

        test('normalizes input', (t) => {
          const base = 'dir/';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/foo/main.js.map');
        });

        test('normalizes current directory', (t) => {
          const base = 'dir/';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = 'dir/';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = 'dir/';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        test('resolves relative to current directory', (t) => {
          const base = 'dir/';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'dir/bar/main.js.map');
        });

        test('resolves relative to parent directory', (t) => {
          const base = 'dir/';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'bar/main.js.map');
        });

        test('resolves relative to parent multiple directory', (t) => {
          const base = 'dir/';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '../../bar/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = 'dir/';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'dir/foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        test('resolves relative to current directory', (t) => {
          const base = 'dir/';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'dir/bar/main.js.map');
        });

        test('resolves relative to parent multiple directory, later', (t) => {
          const base = 'dir/';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '../bar/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = 'dir/';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'dir/foo/main.js.map');
        });
      });
    });

    describe(`base = "dir/file"`, () => {
      describe('with absolute input', () => {
        test('returns input', (t) => {
          const base = 'dir/file';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = 'dir/file';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/foo/main.js.map');
        });

        test('normalizes pathless input', (t) => {
          const base = 'dir/file';
          const input = 'https://absolute.com';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/');
        });

        test('normalizes current directory', (t) => {
          const base = 'dir/file';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = 'dir/file';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = 'dir/file';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        test('resolves relative to the base protocol', (t) => {
          const base = 'dir/file';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = 'dir/file';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/foo/main.js.map');
        });

        test('normalizes pathless input', (t) => {
          const base = 'dir/file';
          const input = '//protocol-relative.com';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/');
        });

        test('normalizes current directory', (t) => {
          const base = 'dir/file';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = 'dir/file';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = 'dir/file';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        test('remains absolute path', (t) => {
          const base = 'dir/file';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/assets/main.js.map');
        });

        test('trims to root', (t) => {
          const base = 'dir/file';
          const input = '/';
          const resolved = resolve(input, base);
          t.is(resolved, '/');
        });

        test('normalizes input', (t) => {
          const base = 'dir/file';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/foo/main.js.map');
        });

        test('normalizes current directory', (t) => {
          const base = 'dir/file';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = 'dir/file';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = 'dir/file';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        test('resolves relative to current directory', (t) => {
          const base = 'dir/file';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'dir/bar/main.js.map');
        });

        test('resolves relative to parent directory', (t) => {
          const base = 'dir/file';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'bar/main.js.map');
        });

        test('resolves relative to parent multiple directory', (t) => {
          const base = 'dir/file';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '../../bar/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = 'dir/file';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'dir/foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        test('resolves relative to current directory', (t) => {
          const base = 'dir/file';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'dir/bar/main.js.map');
        });

        test('resolves relative to parent multiple directory, later', (t) => {
          const base = 'dir/file';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '../bar/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = 'dir/file';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'dir/foo/main.js.map');
        });
      });
    });

    describe(`base = "deep/dir/"`, () => {
      describe('with absolute input', () => {
        test('returns input', (t) => {
          const base = 'deep/dir/';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = 'deep/dir/';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/foo/main.js.map');
        });

        test('normalizes pathless input', (t) => {
          const base = 'deep/dir/';
          const input = 'https://absolute.com';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/');
        });

        test('normalizes current directory', (t) => {
          const base = 'deep/dir/';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = 'deep/dir/';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = 'deep/dir/';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        test('resolves relative to the base protocol', (t) => {
          const base = 'deep/dir/';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = 'deep/dir/';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/foo/main.js.map');
        });

        test('normalizes pathless input', (t) => {
          const base = 'deep/dir/';
          const input = '//protocol-relative.com';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/');
        });

        test('normalizes current directory', (t) => {
          const base = 'deep/dir/';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = 'deep/dir/';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = 'deep/dir/';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        test('remains absolute path', (t) => {
          const base = 'deep/dir/';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/assets/main.js.map');
        });

        test('trims to root', (t) => {
          const base = 'deep/dir/';
          const input = '/';
          const resolved = resolve(input, base);
          t.is(resolved, '/');
        });

        test('normalizes input', (t) => {
          const base = 'deep/dir/';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/foo/main.js.map');
        });

        test('normalizes current directory', (t) => {
          const base = 'deep/dir/';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = 'deep/dir/';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = 'deep/dir/';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        test('resolves relative to current directory', (t) => {
          const base = 'deep/dir/';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'deep/dir/bar/main.js.map');
        });

        test('resolves relative to parent directory', (t) => {
          const base = 'deep/dir/';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'deep/bar/main.js.map');
        });

        test('resolves relative to parent multiple directory', (t) => {
          const base = 'deep/dir/';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '../bar/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = 'deep/dir/';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'deep/dir/foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        test('resolves relative to current directory', (t) => {
          const base = 'deep/dir/';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'deep/dir/bar/main.js.map');
        });

        test('resolves relative to parent multiple directory, later', (t) => {
          const base = 'deep/dir/';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'bar/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = 'deep/dir/';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'deep/dir/foo/main.js.map');
        });
      });
    });

    describe(`base = "./file"`, () => {
      describe('with absolute input', () => {
        test('returns input', (t) => {
          const base = './file';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = './file';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/foo/main.js.map');
        });

        test('normalizes pathless input', (t) => {
          const base = './file';
          const input = 'https://absolute.com';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/');
        });

        test('normalizes current directory', (t) => {
          const base = './file';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = './file';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = './file';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        test('resolves relative to the base protocol', (t) => {
          const base = './file';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = './file';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/foo/main.js.map');
        });

        test('normalizes pathless input', (t) => {
          const base = './file';
          const input = '//protocol-relative.com';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/');
        });

        test('normalizes current directory', (t) => {
          const base = './file';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = './file';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = './file';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        test('remains absolute path', (t) => {
          const base = './file';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/assets/main.js.map');
        });

        test('trims to root', (t) => {
          const base = './file';
          const input = '/';
          const resolved = resolve(input, base);
          t.is(resolved, '/');
        });

        test('normalizes input', (t) => {
          const base = './file';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/foo/main.js.map');
        });

        test('normalizes current directory', (t) => {
          const base = './file';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = './file';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = './file';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        test('resolves relative to current directory', (t) => {
          const base = './file';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, './bar/main.js.map');
        });

        test('resolves relative to parent directory', (t) => {
          const base = './file';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '../bar/main.js.map');
        });

        test('resolves relative to parent multiple directory', (t) => {
          const base = './file';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '../../../bar/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = './file';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, './foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        test('resolves relative to current directory', (t) => {
          const base = './file';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, './bar/main.js.map');
        });

        test('resolves relative to parent multiple directory, later', (t) => {
          const base = './file';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '../../bar/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = './file';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, './foo/main.js.map');
        });
      });
    });

    describe(`base = "./dir/"`, () => {
      describe('with absolute input', () => {
        test('returns input', (t) => {
          const base = './dir/';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = './dir/';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/foo/main.js.map');
        });

        test('normalizes pathless input', (t) => {
          const base = './dir/';
          const input = 'https://absolute.com';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/');
        });

        test('normalizes current directory', (t) => {
          const base = './dir/';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = './dir/';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = './dir/';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        test('resolves relative to the base protocol', (t) => {
          const base = './dir/';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = './dir/';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/foo/main.js.map');
        });

        test('normalizes pathless input', (t) => {
          const base = './dir/';
          const input = '//protocol-relative.com';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/');
        });

        test('normalizes current directory', (t) => {
          const base = './dir/';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = './dir/';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = './dir/';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        test('remains absolute path', (t) => {
          const base = './dir/';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/assets/main.js.map');
        });

        test('trims to root', (t) => {
          const base = './dir/';
          const input = '/';
          const resolved = resolve(input, base);
          t.is(resolved, '/');
        });

        test('normalizes input', (t) => {
          const base = './dir/';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/foo/main.js.map');
        });

        test('normalizes current directory', (t) => {
          const base = './dir/';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = './dir/';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = './dir/';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        test('resolves relative to current directory', (t) => {
          const base = './dir/';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, './dir/bar/main.js.map');
        });

        test('resolves relative to parent directory', (t) => {
          const base = './dir/';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, './bar/main.js.map');
        });

        test('resolves relative to parent multiple directory', (t) => {
          const base = './dir/';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '../../bar/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = './dir/';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, './dir/foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        test('resolves relative to current directory', (t) => {
          const base = './dir/';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, './dir/bar/main.js.map');
        });

        test('resolves relative to parent multiple directory, later', (t) => {
          const base = './dir/';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '../bar/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = './dir/';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, './dir/foo/main.js.map');
        });
      });
    });

    describe(`base = "./deep/file"`, () => {
      describe('with absolute input', () => {
        test('returns input', (t) => {
          const base = './deep/file';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = './deep/file';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/foo/main.js.map');
        });

        test('normalizes pathless input', (t) => {
          const base = './deep/file';
          const input = 'https://absolute.com';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/');
        });

        test('normalizes current directory', (t) => {
          const base = './deep/file';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = './deep/file';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = './deep/file';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        test('resolves relative to the base protocol', (t) => {
          const base = './deep/file';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = './deep/file';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/foo/main.js.map');
        });

        test('normalizes pathless input', (t) => {
          const base = './deep/file';
          const input = '//protocol-relative.com';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/');
        });

        test('normalizes current directory', (t) => {
          const base = './deep/file';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = './deep/file';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = './deep/file';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        test('remains absolute path', (t) => {
          const base = './deep/file';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/assets/main.js.map');
        });

        test('trims to root', (t) => {
          const base = './deep/file';
          const input = '/';
          const resolved = resolve(input, base);
          t.is(resolved, '/');
        });

        test('normalizes input', (t) => {
          const base = './deep/file';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/foo/main.js.map');
        });

        test('normalizes current directory', (t) => {
          const base = './deep/file';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = './deep/file';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = './deep/file';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        test('resolves relative to current directory', (t) => {
          const base = './deep/file';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, './deep/bar/main.js.map');
        });

        test('resolves relative to parent directory', (t) => {
          const base = './deep/file';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, './bar/main.js.map');
        });

        test('resolves relative to parent multiple directory', (t) => {
          const base = './deep/file';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '../../bar/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = './deep/file';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, './deep/foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        test('resolves relative to current directory', (t) => {
          const base = './deep/file';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, './deep/bar/main.js.map');
        });

        test('resolves relative to parent multiple directory, later', (t) => {
          const base = './deep/file';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '../bar/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = './deep/file';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, './deep/foo/main.js.map');
        });
      });
    });

    describe(`base = "./deep/dir/"`, () => {
      describe('with absolute input', () => {
        test('returns input', (t) => {
          const base = './deep/dir/';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = './deep/dir/';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/foo/main.js.map');
        });

        test('normalizes pathless input', (t) => {
          const base = './deep/dir/';
          const input = 'https://absolute.com';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/');
        });

        test('normalizes current directory', (t) => {
          const base = './deep/dir/';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = './deep/dir/';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = './deep/dir/';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        test('resolves relative to the base protocol', (t) => {
          const base = './deep/dir/';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = './deep/dir/';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/foo/main.js.map');
        });

        test('normalizes pathless input', (t) => {
          const base = './deep/dir/';
          const input = '//protocol-relative.com';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/');
        });

        test('normalizes current directory', (t) => {
          const base = './deep/dir/';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = './deep/dir/';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = './deep/dir/';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        test('remains absolute path', (t) => {
          const base = './deep/dir/';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/assets/main.js.map');
        });

        test('trims to root', (t) => {
          const base = './deep/dir/';
          const input = '/';
          const resolved = resolve(input, base);
          t.is(resolved, '/');
        });

        test('normalizes input', (t) => {
          const base = './deep/dir/';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/foo/main.js.map');
        });

        test('normalizes current directory', (t) => {
          const base = './deep/dir/';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = './deep/dir/';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = './deep/dir/';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        test('resolves relative to current directory', (t) => {
          const base = './deep/dir/';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, './deep/dir/bar/main.js.map');
        });

        test('resolves relative to parent directory', (t) => {
          const base = './deep/dir/';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, './deep/bar/main.js.map');
        });

        test('resolves relative to parent multiple directory', (t) => {
          const base = './deep/dir/';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '../bar/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = './deep/dir/';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, './deep/dir/foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        test('resolves relative to current directory', (t) => {
          const base = './deep/dir/';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, './deep/dir/bar/main.js.map');
        });

        test('resolves relative to parent multiple directory, later', (t) => {
          const base = './deep/dir/';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, './bar/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = './deep/dir/';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, './deep/dir/foo/main.js.map');
        });
      });
    });

    describe(`base = "../file"`, () => {
      describe('with absolute input', () => {
        test('returns input', (t) => {
          const base = '../file';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = '../file';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/foo/main.js.map');
        });

        test('normalizes pathless input', (t) => {
          const base = '../file';
          const input = 'https://absolute.com';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/');
        });

        test('normalizes current directory', (t) => {
          const base = '../file';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = '../file';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = '../file';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        test('resolves relative to the base protocol', (t) => {
          const base = '../file';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = '../file';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/foo/main.js.map');
        });

        test('normalizes pathless input', (t) => {
          const base = '../file';
          const input = '//protocol-relative.com';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/');
        });

        test('normalizes current directory', (t) => {
          const base = '../file';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = '../file';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = '../file';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        test('remains absolute path', (t) => {
          const base = '../file';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/assets/main.js.map');
        });

        test('trims to root', (t) => {
          const base = '../file';
          const input = '/';
          const resolved = resolve(input, base);
          t.is(resolved, '/');
        });

        test('normalizes input', (t) => {
          const base = '../file';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/foo/main.js.map');
        });

        test('normalizes current directory', (t) => {
          const base = '../file';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = '../file';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = '../file';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        test('resolves relative to current directory', (t) => {
          const base = '../file';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '../bar/main.js.map');
        });

        test('resolves relative to parent directory', (t) => {
          const base = '../file';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '../../bar/main.js.map');
        });

        test('resolves relative to parent multiple directory', (t) => {
          const base = '../file';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '../../../../bar/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = '../file';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '../foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        test('resolves relative to current directory', (t) => {
          const base = '../file';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '../bar/main.js.map');
        });

        test('resolves relative to parent multiple directory, later', (t) => {
          const base = '../file';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '../../../bar/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = '../file';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '../foo/main.js.map');
        });
      });
    });

    describe(`base = "../dir/"`, () => {
      describe('with absolute input', () => {
        test('returns input', (t) => {
          const base = '../dir/';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = '../dir/';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/foo/main.js.map');
        });

        test('normalizes pathless input', (t) => {
          const base = '../dir/';
          const input = 'https://absolute.com';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/');
        });

        test('normalizes current directory', (t) => {
          const base = '../dir/';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = '../dir/';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = '../dir/';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        test('resolves relative to the base protocol', (t) => {
          const base = '../dir/';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = '../dir/';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/foo/main.js.map');
        });

        test('normalizes pathless input', (t) => {
          const base = '../dir/';
          const input = '//protocol-relative.com';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/');
        });

        test('normalizes current directory', (t) => {
          const base = '../dir/';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = '../dir/';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = '../dir/';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        test('remains absolute path', (t) => {
          const base = '../dir/';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/assets/main.js.map');
        });

        test('trims to root', (t) => {
          const base = '../dir/';
          const input = '/';
          const resolved = resolve(input, base);
          t.is(resolved, '/');
        });

        test('normalizes input', (t) => {
          const base = '../dir/';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/foo/main.js.map');
        });

        test('normalizes current directory', (t) => {
          const base = '../dir/';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = '../dir/';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = '../dir/';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        test('resolves relative to current directory', (t) => {
          const base = '../dir/';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '../dir/bar/main.js.map');
        });

        test('resolves relative to parent directory', (t) => {
          const base = '../dir/';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '../bar/main.js.map');
        });

        test('resolves relative to parent multiple directory', (t) => {
          const base = '../dir/';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '../../../bar/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = '../dir/';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '../dir/foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        test('resolves relative to current directory', (t) => {
          const base = '../dir/';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '../dir/bar/main.js.map');
        });

        test('resolves relative to parent multiple directory, later', (t) => {
          const base = '../dir/';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '../../bar/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = '../dir/';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '../dir/foo/main.js.map');
        });
      });
    });

    describe(`base = "../deep/file"`, () => {
      describe('with absolute input', () => {
        test('returns input', (t) => {
          const base = '../deep/file';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = '../deep/file';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/foo/main.js.map');
        });

        test('normalizes pathless input', (t) => {
          const base = '../deep/file';
          const input = 'https://absolute.com';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/');
        });

        test('normalizes current directory', (t) => {
          const base = '../deep/file';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = '../deep/file';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = '../deep/file';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        test('resolves relative to the base protocol', (t) => {
          const base = '../deep/file';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = '../deep/file';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/foo/main.js.map');
        });

        test('normalizes pathless input', (t) => {
          const base = '../deep/file';
          const input = '//protocol-relative.com';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/');
        });

        test('normalizes current directory', (t) => {
          const base = '../deep/file';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = '../deep/file';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = '../deep/file';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        test('remains absolute path', (t) => {
          const base = '../deep/file';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/assets/main.js.map');
        });

        test('trims to root', (t) => {
          const base = '../deep/file';
          const input = '/';
          const resolved = resolve(input, base);
          t.is(resolved, '/');
        });

        test('normalizes input', (t) => {
          const base = '../deep/file';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/foo/main.js.map');
        });

        test('normalizes current directory', (t) => {
          const base = '../deep/file';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = '../deep/file';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = '../deep/file';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        test('resolves relative to current directory', (t) => {
          const base = '../deep/file';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '../deep/bar/main.js.map');
        });

        test('resolves relative to parent directory', (t) => {
          const base = '../deep/file';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '../bar/main.js.map');
        });

        test('resolves relative to parent multiple directory', (t) => {
          const base = '../deep/file';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '../../../bar/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = '../deep/file';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '../deep/foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        test('resolves relative to current directory', (t) => {
          const base = '../deep/file';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '../deep/bar/main.js.map');
        });

        test('resolves relative to parent multiple directory, later', (t) => {
          const base = '../deep/file';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '../../bar/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = '../deep/file';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '../deep/foo/main.js.map');
        });
      });
    });

    describe(`base = "../deep/dir/"`, () => {
      describe('with absolute input', () => {
        test('returns input', (t) => {
          const base = '../deep/dir/';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = '../deep/dir/';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/foo/main.js.map');
        });

        test('normalizes pathless input', (t) => {
          const base = '../deep/dir/';
          const input = 'https://absolute.com';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/');
        });

        test('normalizes current directory', (t) => {
          const base = '../deep/dir/';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = '../deep/dir/';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = '../deep/dir/';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        test('resolves relative to the base protocol', (t) => {
          const base = '../deep/dir/';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = '../deep/dir/';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/foo/main.js.map');
        });

        test('normalizes pathless input', (t) => {
          const base = '../deep/dir/';
          const input = '//protocol-relative.com';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/');
        });

        test('normalizes current directory', (t) => {
          const base = '../deep/dir/';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = '../deep/dir/';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = '../deep/dir/';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        test('remains absolute path', (t) => {
          const base = '../deep/dir/';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/assets/main.js.map');
        });

        test('trims to root', (t) => {
          const base = '../deep/dir/';
          const input = '/';
          const resolved = resolve(input, base);
          t.is(resolved, '/');
        });

        test('normalizes input', (t) => {
          const base = '../deep/dir/';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/foo/main.js.map');
        });

        test('normalizes current directory', (t) => {
          const base = '../deep/dir/';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = '../deep/dir/';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = '../deep/dir/';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        test('resolves relative to current directory', (t) => {
          const base = '../deep/dir/';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '../deep/dir/bar/main.js.map');
        });

        test('resolves relative to parent directory', (t) => {
          const base = '../deep/dir/';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '../deep/bar/main.js.map');
        });

        test('resolves relative to parent multiple directory', (t) => {
          const base = '../deep/dir/';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '../../bar/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = '../deep/dir/';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '../deep/dir/foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        test('resolves relative to current directory', (t) => {
          const base = '../deep/dir/';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '../deep/dir/bar/main.js.map');
        });

        test('resolves relative to parent multiple directory, later', (t) => {
          const base = '../deep/dir/';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '../bar/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = '../deep/dir/';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '../deep/dir/foo/main.js.map');
        });
      });
    });

    describe(`base = ".."`, () => {
      describe('with absolute input', () => {
        test('returns input', (t) => {
          const base = '..';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = '..';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/foo/main.js.map');
        });

        test('normalizes pathless input', (t) => {
          const base = '..';
          const input = 'https://absolute.com';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/');
        });

        test('normalizes current directory', (t) => {
          const base = '..';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = '..';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = '..';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        test('resolves relative to the base protocol', (t) => {
          const base = '..';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = '..';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/foo/main.js.map');
        });

        test('normalizes pathless input', (t) => {
          const base = '..';
          const input = '//protocol-relative.com';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/');
        });

        test('normalizes current directory', (t) => {
          const base = '..';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = '..';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = '..';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        test('remains absolute path', (t) => {
          const base = '..';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/assets/main.js.map');
        });

        test('trims to root', (t) => {
          const base = '..';
          const input = '/';
          const resolved = resolve(input, base);
          t.is(resolved, '/');
        });

        test('normalizes input', (t) => {
          const base = '..';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/foo/main.js.map');
        });

        test('normalizes current directory', (t) => {
          const base = '..';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = '..';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = '..';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        test('resolves relative to current directory', (t) => {
          const base = '..';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '../bar/main.js.map');
        });

        test('resolves relative to parent directory', (t) => {
          const base = '..';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '../../bar/main.js.map');
        });

        test('resolves relative to parent multiple directory', (t) => {
          const base = '..';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '../../../../bar/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = '..';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '../foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        test('resolves relative to current directory', (t) => {
          const base = '..';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '../bar/main.js.map');
        });

        test('resolves relative to parent multiple directory, later', (t) => {
          const base = '..';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '../../../bar/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = '..';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '../foo/main.js.map');
        });
      });
    });

    describe(`base = "../"`, () => {
      describe('with absolute input', () => {
        test('returns input', (t) => {
          const base = '../';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = '../';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/foo/main.js.map');
        });

        test('normalizes pathless input', (t) => {
          const base = '../';
          const input = 'https://absolute.com';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/');
        });

        test('normalizes current directory', (t) => {
          const base = '../';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = '../';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = '../';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        test('resolves relative to the base protocol', (t) => {
          const base = '../';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = '../';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/foo/main.js.map');
        });

        test('normalizes pathless input', (t) => {
          const base = '../';
          const input = '//protocol-relative.com';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/');
        });

        test('normalizes current directory', (t) => {
          const base = '../';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = '../';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = '../';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        test('remains absolute path', (t) => {
          const base = '../';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/assets/main.js.map');
        });

        test('trims to root', (t) => {
          const base = '../';
          const input = '/';
          const resolved = resolve(input, base);
          t.is(resolved, '/');
        });

        test('normalizes input', (t) => {
          const base = '../';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/foo/main.js.map');
        });

        test('normalizes current directory', (t) => {
          const base = '../';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = '../';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = '../';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        test('resolves relative to current directory', (t) => {
          const base = '../';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '../bar/main.js.map');
        });

        test('resolves relative to parent directory', (t) => {
          const base = '../';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '../../bar/main.js.map');
        });

        test('resolves relative to parent multiple directory', (t) => {
          const base = '../';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '../../../../bar/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = '../';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '../foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        test('resolves relative to current directory', (t) => {
          const base = '../';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '../bar/main.js.map');
        });

        test('resolves relative to parent multiple directory, later', (t) => {
          const base = '../';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '../../../bar/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = '../';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '../foo/main.js.map');
        });
      });
    });

    describe(`base = "dir/.."`, () => {
      describe('with absolute input', () => {
        test('returns input', (t) => {
          const base = 'dir/..';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = 'dir/..';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/foo/main.js.map');
        });

        test('normalizes pathless input', (t) => {
          const base = 'dir/..';
          const input = 'https://absolute.com';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/');
        });

        test('normalizes current directory', (t) => {
          const base = 'dir/..';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = 'dir/..';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = 'dir/..';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        test('resolves relative to the base protocol', (t) => {
          const base = 'dir/..';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = 'dir/..';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/foo/main.js.map');
        });

        test('normalizes pathless input', (t) => {
          const base = 'dir/..';
          const input = '//protocol-relative.com';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/');
        });

        test('normalizes current directory', (t) => {
          const base = 'dir/..';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = 'dir/..';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = 'dir/..';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        test('remains absolute path', (t) => {
          const base = 'dir/..';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/assets/main.js.map');
        });

        test('trims to root', (t) => {
          const base = 'dir/..';
          const input = '/';
          const resolved = resolve(input, base);
          t.is(resolved, '/');
        });

        test('normalizes input', (t) => {
          const base = 'dir/..';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/foo/main.js.map');
        });

        test('normalizes current directory', (t) => {
          const base = 'dir/..';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = 'dir/..';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = 'dir/..';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        test('resolves relative to current directory', (t) => {
          const base = 'dir/..';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'bar/main.js.map');
        });

        test('resolves relative to parent directory', (t) => {
          const base = 'dir/..';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '../bar/main.js.map');
        });

        test('resolves relative to parent multiple directory', (t) => {
          const base = 'dir/..';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '../../../bar/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = 'dir/..';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        test('resolves relative to current directory', (t) => {
          const base = 'dir/..';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'bar/main.js.map');
        });

        test('resolves relative to parent multiple directory, later', (t) => {
          const base = 'dir/..';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '../../bar/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = 'dir/..';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'foo/main.js.map');
        });
      });
    });

    describe(`base = "deep/../"`, () => {
      describe('with absolute input', () => {
        test('returns input', (t) => {
          const base = 'deep/../';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = 'deep/../';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/foo/main.js.map');
        });

        test('normalizes pathless input', (t) => {
          const base = 'deep/../';
          const input = 'https://absolute.com';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/');
        });

        test('normalizes current directory', (t) => {
          const base = 'deep/../';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = 'deep/../';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = 'deep/../';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        test('resolves relative to the base protocol', (t) => {
          const base = 'deep/../';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = 'deep/../';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/foo/main.js.map');
        });

        test('normalizes pathless input', (t) => {
          const base = 'deep/../';
          const input = '//protocol-relative.com';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/');
        });

        test('normalizes current directory', (t) => {
          const base = 'deep/../';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = 'deep/../';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = 'deep/../';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        test('remains absolute path', (t) => {
          const base = 'deep/../';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/assets/main.js.map');
        });

        test('trims to root', (t) => {
          const base = 'deep/../';
          const input = '/';
          const resolved = resolve(input, base);
          t.is(resolved, '/');
        });

        test('normalizes input', (t) => {
          const base = 'deep/../';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/foo/main.js.map');
        });

        test('normalizes current directory', (t) => {
          const base = 'deep/../';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = 'deep/../';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = 'deep/../';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        test('resolves relative to current directory', (t) => {
          const base = 'deep/../';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'bar/main.js.map');
        });

        test('resolves relative to parent directory', (t) => {
          const base = 'deep/../';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '../bar/main.js.map');
        });

        test('resolves relative to parent multiple directory', (t) => {
          const base = 'deep/../';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '../../../bar/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = 'deep/../';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        test('resolves relative to current directory', (t) => {
          const base = 'deep/../';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'bar/main.js.map');
        });

        test('resolves relative to parent multiple directory, later', (t) => {
          const base = 'deep/../';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '../../bar/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = 'deep/../';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'foo/main.js.map');
        });
      });
    });

    describe(`base = "./.."`, () => {
      describe('with absolute input', () => {
        test('returns input', (t) => {
          const base = './..';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = './..';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/foo/main.js.map');
        });

        test('normalizes pathless input', (t) => {
          const base = './..';
          const input = 'https://absolute.com';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/');
        });

        test('normalizes current directory', (t) => {
          const base = './..';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = './..';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = './..';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        test('resolves relative to the base protocol', (t) => {
          const base = './..';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = './..';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/foo/main.js.map');
        });

        test('normalizes pathless input', (t) => {
          const base = './..';
          const input = '//protocol-relative.com';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/');
        });

        test('normalizes current directory', (t) => {
          const base = './..';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = './..';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = './..';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        test('remains absolute path', (t) => {
          const base = './..';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/assets/main.js.map');
        });

        test('trims to root', (t) => {
          const base = './..';
          const input = '/';
          const resolved = resolve(input, base);
          t.is(resolved, '/');
        });

        test('normalizes input', (t) => {
          const base = './..';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/foo/main.js.map');
        });

        test('normalizes current directory', (t) => {
          const base = './..';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = './..';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = './..';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        test('resolves relative to current directory', (t) => {
          const base = './..';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '../bar/main.js.map');
        });

        test('resolves relative to parent directory', (t) => {
          const base = './..';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '../../bar/main.js.map');
        });

        test('resolves relative to parent multiple directory', (t) => {
          const base = './..';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '../../../../bar/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = './..';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '../foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        test('resolves relative to current directory', (t) => {
          const base = './..';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '../bar/main.js.map');
        });

        test('resolves relative to parent multiple directory, later', (t) => {
          const base = './..';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '../../../bar/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = './..';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '../foo/main.js.map');
        });
      });
    });

    describe(`base = "./../"`, () => {
      describe('with absolute input', () => {
        test('returns input', (t) => {
          const base = './../';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = './../';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/foo/main.js.map');
        });

        test('normalizes pathless input', (t) => {
          const base = './../';
          const input = 'https://absolute.com';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/');
        });

        test('normalizes current directory', (t) => {
          const base = './../';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = './../';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = './../';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        test('resolves relative to the base protocol', (t) => {
          const base = './../';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = './../';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/foo/main.js.map');
        });

        test('normalizes pathless input', (t) => {
          const base = './../';
          const input = '//protocol-relative.com';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/');
        });

        test('normalizes current directory', (t) => {
          const base = './../';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = './../';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = './../';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        test('remains absolute path', (t) => {
          const base = './../';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/assets/main.js.map');
        });

        test('trims to root', (t) => {
          const base = './../';
          const input = '/';
          const resolved = resolve(input, base);
          t.is(resolved, '/');
        });

        test('normalizes input', (t) => {
          const base = './../';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/foo/main.js.map');
        });

        test('normalizes current directory', (t) => {
          const base = './../';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = './../';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = './../';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        test('resolves relative to current directory', (t) => {
          const base = './../';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '../bar/main.js.map');
        });

        test('resolves relative to parent directory', (t) => {
          const base = './../';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '../../bar/main.js.map');
        });

        test('resolves relative to parent multiple directory', (t) => {
          const base = './../';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '../../../../bar/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = './../';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '../foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        test('resolves relative to current directory', (t) => {
          const base = './../';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '../bar/main.js.map');
        });

        test('resolves relative to parent multiple directory, later', (t) => {
          const base = './../';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '../../../bar/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = './../';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '../foo/main.js.map');
        });
      });
    });

    describe(`base = "./deep/.."`, () => {
      describe('with absolute input', () => {
        test('returns input', (t) => {
          const base = './deep/..';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = './deep/..';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/foo/main.js.map');
        });

        test('normalizes pathless input', (t) => {
          const base = './deep/..';
          const input = 'https://absolute.com';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/');
        });

        test('normalizes current directory', (t) => {
          const base = './deep/..';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = './deep/..';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = './deep/..';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        test('resolves relative to the base protocol', (t) => {
          const base = './deep/..';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = './deep/..';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/foo/main.js.map');
        });

        test('normalizes pathless input', (t) => {
          const base = './deep/..';
          const input = '//protocol-relative.com';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/');
        });

        test('normalizes current directory', (t) => {
          const base = './deep/..';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = './deep/..';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = './deep/..';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        test('remains absolute path', (t) => {
          const base = './deep/..';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/assets/main.js.map');
        });

        test('trims to root', (t) => {
          const base = './deep/..';
          const input = '/';
          const resolved = resolve(input, base);
          t.is(resolved, '/');
        });

        test('normalizes input', (t) => {
          const base = './deep/..';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/foo/main.js.map');
        });

        test('normalizes current directory', (t) => {
          const base = './deep/..';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = './deep/..';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = './deep/..';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        test('resolves relative to current directory', (t) => {
          const base = './deep/..';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, './bar/main.js.map');
        });

        test('resolves relative to parent directory', (t) => {
          const base = './deep/..';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '../bar/main.js.map');
        });

        test('resolves relative to parent multiple directory', (t) => {
          const base = './deep/..';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '../../../bar/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = './deep/..';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, './foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        test('resolves relative to current directory', (t) => {
          const base = './deep/..';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, './bar/main.js.map');
        });

        test('resolves relative to parent multiple directory, later', (t) => {
          const base = './deep/..';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '../../bar/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = './deep/..';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, './foo/main.js.map');
        });
      });
    });

    describe(`base = "./deep/../"`, () => {
      describe('with absolute input', () => {
        test('returns input', (t) => {
          const base = './deep/../';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = './deep/../';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/foo/main.js.map');
        });

        test('normalizes pathless input', (t) => {
          const base = './deep/../';
          const input = 'https://absolute.com';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/');
        });

        test('normalizes current directory', (t) => {
          const base = './deep/../';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = './deep/../';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = './deep/../';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        test('resolves relative to the base protocol', (t) => {
          const base = './deep/../';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = './deep/../';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/foo/main.js.map');
        });

        test('normalizes pathless input', (t) => {
          const base = './deep/../';
          const input = '//protocol-relative.com';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/');
        });

        test('normalizes current directory', (t) => {
          const base = './deep/../';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = './deep/../';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = './deep/../';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        test('remains absolute path', (t) => {
          const base = './deep/../';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/assets/main.js.map');
        });

        test('trims to root', (t) => {
          const base = './deep/../';
          const input = '/';
          const resolved = resolve(input, base);
          t.is(resolved, '/');
        });

        test('normalizes input', (t) => {
          const base = './deep/../';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/foo/main.js.map');
        });

        test('normalizes current directory', (t) => {
          const base = './deep/../';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = './deep/../';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = './deep/../';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        test('resolves relative to current directory', (t) => {
          const base = './deep/../';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, './bar/main.js.map');
        });

        test('resolves relative to parent directory', (t) => {
          const base = './deep/../';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '../bar/main.js.map');
        });

        test('resolves relative to parent multiple directory', (t) => {
          const base = './deep/../';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '../../../bar/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = './deep/../';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, './foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        test('resolves relative to current directory', (t) => {
          const base = './deep/../';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, './bar/main.js.map');
        });

        test('resolves relative to parent multiple directory, later', (t) => {
          const base = './deep/../';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '../../bar/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = './deep/../';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, './foo/main.js.map');
        });
      });
    });

    describe(`base = "../.."`, () => {
      describe('with absolute input', () => {
        test('returns input', (t) => {
          const base = '../..';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = '../..';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/foo/main.js.map');
        });

        test('normalizes pathless input', (t) => {
          const base = '../..';
          const input = 'https://absolute.com';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/');
        });

        test('normalizes current directory', (t) => {
          const base = '../..';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = '../..';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = '../..';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        test('resolves relative to the base protocol', (t) => {
          const base = '../..';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = '../..';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/foo/main.js.map');
        });

        test('normalizes pathless input', (t) => {
          const base = '../..';
          const input = '//protocol-relative.com';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/');
        });

        test('normalizes current directory', (t) => {
          const base = '../..';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = '../..';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = '../..';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        test('remains absolute path', (t) => {
          const base = '../..';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/assets/main.js.map');
        });

        test('trims to root', (t) => {
          const base = '../..';
          const input = '/';
          const resolved = resolve(input, base);
          t.is(resolved, '/');
        });

        test('normalizes input', (t) => {
          const base = '../..';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/foo/main.js.map');
        });

        test('normalizes current directory', (t) => {
          const base = '../..';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = '../..';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = '../..';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        test('resolves relative to current directory', (t) => {
          const base = '../..';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '../../bar/main.js.map');
        });

        test('resolves relative to parent directory', (t) => {
          const base = '../..';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '../../../bar/main.js.map');
        });

        test('resolves relative to parent multiple directory', (t) => {
          const base = '../..';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '../../../../../bar/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = '../..';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '../../foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        test('resolves relative to current directory', (t) => {
          const base = '../..';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '../../bar/main.js.map');
        });

        test('resolves relative to parent multiple directory, later', (t) => {
          const base = '../..';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '../../../../bar/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = '../..';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '../../foo/main.js.map');
        });
      });
    });

    describe(`base = "../../"`, () => {
      describe('with absolute input', () => {
        test('returns input', (t) => {
          const base = '../../';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = '../../';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/foo/main.js.map');
        });

        test('normalizes pathless input', (t) => {
          const base = '../../';
          const input = 'https://absolute.com';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/');
        });

        test('normalizes current directory', (t) => {
          const base = '../../';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = '../../';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = '../../';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        test('resolves relative to the base protocol', (t) => {
          const base = '../../';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = '../../';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/foo/main.js.map');
        });

        test('normalizes pathless input', (t) => {
          const base = '../../';
          const input = '//protocol-relative.com';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/');
        });

        test('normalizes current directory', (t) => {
          const base = '../../';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = '../../';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = '../../';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        test('remains absolute path', (t) => {
          const base = '../../';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/assets/main.js.map');
        });

        test('trims to root', (t) => {
          const base = '../../';
          const input = '/';
          const resolved = resolve(input, base);
          t.is(resolved, '/');
        });

        test('normalizes input', (t) => {
          const base = '../../';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/foo/main.js.map');
        });

        test('normalizes current directory', (t) => {
          const base = '../../';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = '../../';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = '../../';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        test('resolves relative to current directory', (t) => {
          const base = '../../';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '../../bar/main.js.map');
        });

        test('resolves relative to parent directory', (t) => {
          const base = '../../';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '../../../bar/main.js.map');
        });

        test('resolves relative to parent multiple directory', (t) => {
          const base = '../../';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '../../../../../bar/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = '../../';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '../../foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        test('resolves relative to current directory', (t) => {
          const base = '../../';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '../../bar/main.js.map');
        });

        test('resolves relative to parent multiple directory, later', (t) => {
          const base = '../../';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '../../../../bar/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = '../../';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '../../foo/main.js.map');
        });
      });
    });

    describe(`base = "../deep/.."`, () => {
      describe('with absolute input', () => {
        test('returns input', (t) => {
          const base = '../deep/..';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = '../deep/..';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/foo/main.js.map');
        });

        test('normalizes pathless input', (t) => {
          const base = '../deep/..';
          const input = 'https://absolute.com';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/');
        });

        test('normalizes current directory', (t) => {
          const base = '../deep/..';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = '../deep/..';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = '../deep/..';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        test('resolves relative to the base protocol', (t) => {
          const base = '../deep/..';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = '../deep/..';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/foo/main.js.map');
        });

        test('normalizes pathless input', (t) => {
          const base = '../deep/..';
          const input = '//protocol-relative.com';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/');
        });

        test('normalizes current directory', (t) => {
          const base = '../deep/..';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = '../deep/..';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = '../deep/..';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        test('remains absolute path', (t) => {
          const base = '../deep/..';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/assets/main.js.map');
        });

        test('trims to root', (t) => {
          const base = '../deep/..';
          const input = '/';
          const resolved = resolve(input, base);
          t.is(resolved, '/');
        });

        test('normalizes input', (t) => {
          const base = '../deep/..';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/foo/main.js.map');
        });

        test('normalizes current directory', (t) => {
          const base = '../deep/..';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = '../deep/..';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = '../deep/..';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        test('resolves relative to current directory', (t) => {
          const base = '../deep/..';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '../bar/main.js.map');
        });

        test('resolves relative to parent directory', (t) => {
          const base = '../deep/..';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '../../bar/main.js.map');
        });

        test('resolves relative to parent multiple directory', (t) => {
          const base = '../deep/..';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '../../../../bar/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = '../deep/..';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '../foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        test('resolves relative to current directory', (t) => {
          const base = '../deep/..';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '../bar/main.js.map');
        });

        test('resolves relative to parent multiple directory, later', (t) => {
          const base = '../deep/..';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '../../../bar/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = '../deep/..';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '../foo/main.js.map');
        });
      });
    });

    describe(`base = "../deep/../"`, () => {
      describe('with absolute input', () => {
        test('returns input', (t) => {
          const base = '../deep/../';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = '../deep/../';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/foo/main.js.map');
        });

        test('normalizes pathless input', (t) => {
          const base = '../deep/../';
          const input = 'https://absolute.com';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/');
        });

        test('normalizes current directory', (t) => {
          const base = '../deep/../';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = '../deep/../';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = '../deep/../';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, 'https://absolute.com/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        test('resolves relative to the base protocol', (t) => {
          const base = '../deep/../';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = '../deep/../';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/foo/main.js.map');
        });

        test('normalizes pathless input', (t) => {
          const base = '../deep/../';
          const input = '//protocol-relative.com';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/');
        });

        test('normalizes current directory', (t) => {
          const base = '../deep/../';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = '../deep/../';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = '../deep/../';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '//protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        test('remains absolute path', (t) => {
          const base = '../deep/../';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/assets/main.js.map');
        });

        test('trims to root', (t) => {
          const base = '../deep/../';
          const input = '/';
          const resolved = resolve(input, base);
          t.is(resolved, '/');
        });

        test('normalizes input', (t) => {
          const base = '../deep/../';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/foo/main.js.map');
        });

        test('normalizes current directory', (t) => {
          const base = '../deep/../';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/main.js.map');
        });

        test('normalizes too many parent accessors', (t) => {
          const base = '../deep/../';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/main.js.map');
        });

        test('normalizes too many parent accessors, late', (t) => {
          const base = '../deep/../';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        test('resolves relative to current directory', (t) => {
          const base = '../deep/../';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '../bar/main.js.map');
        });

        test('resolves relative to parent directory', (t) => {
          const base = '../deep/../';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '../../bar/main.js.map');
        });

        test('resolves relative to parent multiple directory', (t) => {
          const base = '../deep/../';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '../../../../bar/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = '../deep/../';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '../foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        test('resolves relative to current directory', (t) => {
          const base = '../deep/../';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '../bar/main.js.map');
        });

        test('resolves relative to parent multiple directory, later', (t) => {
          const base = '../deep/../';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '../../../bar/main.js.map');
        });

        test('normalizes input', (t) => {
          const base = '../deep/../';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          t.is(resolved, '../foo/main.js.map');
        });
      });
    });
  });
});
