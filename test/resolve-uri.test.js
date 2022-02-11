const resolve = require('../');

const assert = require('assert');

describe('resolve', () => {
  describe('without base', () => {
    describe(`base = undefined`, () => {
      describe('with absolute input', () => {
        it('returns input', () => {
          const base = undefined;
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes input', () => {
          const base = undefined;
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
        });

        it('normalizes pathless input', () => {
          const base = undefined;
          const input = 'https://absolute.com';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/');
        });

        it('normalizes current directory', () => {
          const base = undefined;
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = undefined;
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = undefined;
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes file protocol', () => {
          const base = undefined;
          const input = 'file:///root/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///root/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        it('resolves relative to the base protocol', () => {
          const base = undefined;
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });

        it('normalizes input', () => {
          const base = undefined;
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/foo/main.js.map');
        });

        it('normalizes pathless input', () => {
          const base = undefined;
          const input = '//protocol-relative.com';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/');
        });

        it('normalizes current directory', () => {
          const base = undefined;
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = undefined;
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = undefined;
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        it('remains absolute path', () => {
          const base = undefined;
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/assets/main.js.map');
        });

        it('trims to root', () => {
          const base = undefined;
          const input = '/';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/');
        });

        it('normalizes input', () => {
          const base = undefined;
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/foo/main.js.map');
        });

        it('normalizes current directory', () => {
          const base = undefined;
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = undefined;
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = undefined;
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        it('resolves relative to current directory', () => {
          const base = undefined;
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, './bar/main.js.map');
        });

        it('resolves relative to parent directory', () => {
          const base = undefined;
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../bar/main.js.map');
        });

        it('resolves relative to parent multiple directory', () => {
          const base = undefined;
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../../../bar/main.js.map');
        });

        it('normalizes input', () => {
          const base = undefined;
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, './foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        it('resolves relative to current directory', () => {
          const base = undefined;
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'bar/main.js.map');
        });

        it('resolves relative to parent multiple directory, later', () => {
          const base = undefined;
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../../bar/main.js.map');
        });

        it('normalizes input', () => {
          const base = undefined;
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'foo/main.js.map');
        });

        it('resolves node_module scope as path', () => {
          const base = undefined;
          const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
          const resolved = resolve(input, base);
          assert.strictEqual(
            resolved,
            'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js'
          );
        });

        it('resolves package scope as path', () => {
          const base = undefined;
          const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '@babel/runtime/helpers/esm/arrayLikeToArray.js');
        });
      });

      describe('empty input', () => {
        it('normalizes base', () => {
          const base = undefined;
          const input = '';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '');
        });
      });
    });

    describe(`base = ""`, () => {
      describe('with absolute input', () => {
        it('returns input', () => {
          const base = '';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes input', () => {
          const base = '';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
        });

        it('normalizes pathless input', () => {
          const base = '';
          const input = 'https://absolute.com';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/');
        });

        it('normalizes current directory', () => {
          const base = '';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = '';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = '';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes file protocol', () => {
          const base = '';
          const input = 'file:///root/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///root/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        it('resolves relative to the base protocol', () => {
          const base = '';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });

        it('normalizes input', () => {
          const base = '';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/foo/main.js.map');
        });

        it('normalizes pathless input', () => {
          const base = '';
          const input = '//protocol-relative.com';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/');
        });

        it('normalizes current directory', () => {
          const base = '';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = '';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = '';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        it('remains absolute path', () => {
          const base = '';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/assets/main.js.map');
        });

        it('trims to root', () => {
          const base = '';
          const input = '/';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/');
        });

        it('normalizes input', () => {
          const base = '';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/foo/main.js.map');
        });

        it('normalizes current directory', () => {
          const base = '';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = '';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = '';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        it('resolves relative to current directory', () => {
          const base = '';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, './bar/main.js.map');
        });

        it('resolves relative to parent directory', () => {
          const base = '';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../bar/main.js.map');
        });

        it('resolves relative to parent multiple directory', () => {
          const base = '';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../../../bar/main.js.map');
        });

        it('normalizes input', () => {
          const base = '';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, './foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        it('resolves relative to current directory', () => {
          const base = '';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'bar/main.js.map');
        });

        it('resolves relative to parent multiple directory, later', () => {
          const base = '';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../../bar/main.js.map');
        });

        it('normalizes input', () => {
          const base = '';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'foo/main.js.map');
        });

        it('resolves node_module scope as path', () => {
          const base = '';
          const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
          const resolved = resolve(input, base);
          assert.strictEqual(
            resolved,
            'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js'
          );
        });

        it('resolves package scope as path', () => {
          const base = '';
          const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '@babel/runtime/helpers/esm/arrayLikeToArray.js');
        });
      });

      describe('empty input', () => {
        it('normalizes base', () => {
          const base = '';
          const input = '';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '');
        });
      });
    });
  });

  describe('with absolute base', () => {
    describe(`base = "https://foo.com"`, () => {
      describe('with absolute input', () => {
        it('returns input', () => {
          const base = 'https://foo.com';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes input', () => {
          const base = 'https://foo.com';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
        });

        it('normalizes pathless input', () => {
          const base = 'https://foo.com';
          const input = 'https://absolute.com';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/');
        });

        it('normalizes current directory', () => {
          const base = 'https://foo.com';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = 'https://foo.com';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = 'https://foo.com';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes file protocol', () => {
          const base = 'https://foo.com';
          const input = 'file:///root/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///root/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        it('resolves relative to the base protocol', () => {
          const base = 'https://foo.com';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://protocol-relative.com/main.js.map');
        });

        it('normalizes input', () => {
          const base = 'https://foo.com';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://protocol-relative.com/foo/main.js.map');
        });

        it('normalizes pathless input', () => {
          const base = 'https://foo.com';
          const input = '//protocol-relative.com';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://protocol-relative.com/');
        });

        it('normalizes current directory', () => {
          const base = 'https://foo.com';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://protocol-relative.com/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = 'https://foo.com';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://protocol-relative.com/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = 'https://foo.com';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        it('remains absolute path', () => {
          const base = 'https://foo.com';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://foo.com/assets/main.js.map');
        });

        it('trims to root', () => {
          const base = 'https://foo.com';
          const input = '/';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://foo.com/');
        });

        it('normalizes input', () => {
          const base = 'https://foo.com';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://foo.com/foo/main.js.map');
        });

        it('normalizes current directory', () => {
          const base = 'https://foo.com';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://foo.com/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = 'https://foo.com';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://foo.com/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = 'https://foo.com';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://foo.com/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        it('resolves relative to current directory', () => {
          const base = 'https://foo.com';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://foo.com/bar/main.js.map');
        });

        it('resolves relative to parent directory', () => {
          const base = 'https://foo.com';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://foo.com/bar/main.js.map');
        });

        it('resolves relative to parent multiple directory', () => {
          const base = 'https://foo.com';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://foo.com/bar/main.js.map');
        });

        it('normalizes input', () => {
          const base = 'https://foo.com';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://foo.com/foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        it('resolves relative to current directory', () => {
          const base = 'https://foo.com';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://foo.com/bar/main.js.map');
        });

        it('resolves relative to parent multiple directory, later', () => {
          const base = 'https://foo.com';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://foo.com/bar/main.js.map');
        });

        it('normalizes input', () => {
          const base = 'https://foo.com';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://foo.com/foo/main.js.map');
        });

        it('resolves node_module scope as path', () => {
          const base = 'https://foo.com';
          const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
          const resolved = resolve(input, base);
          assert.strictEqual(
            resolved,
            'https://foo.com/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js'
          );
        });

        it('resolves package scope as path', () => {
          const base = 'https://foo.com';
          const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
          const resolved = resolve(input, base);
          assert.strictEqual(
            resolved,
            'https://foo.com/@babel/runtime/helpers/esm/arrayLikeToArray.js'
          );
        });
      });

      describe('empty input', () => {
        it('normalizes base', () => {
          const base = 'https://foo.com';
          const input = '';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://foo.com/');
        });
      });
    });

    describe(`base = "https://foo.com/"`, () => {
      describe('with absolute input', () => {
        it('returns input', () => {
          const base = 'https://foo.com/';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes input', () => {
          const base = 'https://foo.com/';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
        });

        it('normalizes pathless input', () => {
          const base = 'https://foo.com/';
          const input = 'https://absolute.com';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/');
        });

        it('normalizes current directory', () => {
          const base = 'https://foo.com/';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = 'https://foo.com/';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = 'https://foo.com/';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes file protocol', () => {
          const base = 'https://foo.com/';
          const input = 'file:///root/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///root/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        it('resolves relative to the base protocol', () => {
          const base = 'https://foo.com/';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://protocol-relative.com/main.js.map');
        });

        it('normalizes input', () => {
          const base = 'https://foo.com/';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://protocol-relative.com/foo/main.js.map');
        });

        it('normalizes pathless input', () => {
          const base = 'https://foo.com/';
          const input = '//protocol-relative.com';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://protocol-relative.com/');
        });

        it('normalizes current directory', () => {
          const base = 'https://foo.com/';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://protocol-relative.com/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = 'https://foo.com/';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://protocol-relative.com/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = 'https://foo.com/';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        it('remains absolute path', () => {
          const base = 'https://foo.com/';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://foo.com/assets/main.js.map');
        });

        it('trims to root', () => {
          const base = 'https://foo.com/';
          const input = '/';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://foo.com/');
        });

        it('normalizes input', () => {
          const base = 'https://foo.com/';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://foo.com/foo/main.js.map');
        });

        it('normalizes current directory', () => {
          const base = 'https://foo.com/';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://foo.com/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = 'https://foo.com/';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://foo.com/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = 'https://foo.com/';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://foo.com/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        it('resolves relative to current directory', () => {
          const base = 'https://foo.com/';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://foo.com/bar/main.js.map');
        });

        it('resolves relative to parent directory', () => {
          const base = 'https://foo.com/';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://foo.com/bar/main.js.map');
        });

        it('resolves relative to parent multiple directory', () => {
          const base = 'https://foo.com/';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://foo.com/bar/main.js.map');
        });

        it('normalizes input', () => {
          const base = 'https://foo.com/';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://foo.com/foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        it('resolves relative to current directory', () => {
          const base = 'https://foo.com/';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://foo.com/bar/main.js.map');
        });

        it('resolves relative to parent multiple directory, later', () => {
          const base = 'https://foo.com/';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://foo.com/bar/main.js.map');
        });

        it('normalizes input', () => {
          const base = 'https://foo.com/';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://foo.com/foo/main.js.map');
        });

        it('resolves node_module scope as path', () => {
          const base = 'https://foo.com/';
          const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
          const resolved = resolve(input, base);
          assert.strictEqual(
            resolved,
            'https://foo.com/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js'
          );
        });

        it('resolves package scope as path', () => {
          const base = 'https://foo.com/';
          const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
          const resolved = resolve(input, base);
          assert.strictEqual(
            resolved,
            'https://foo.com/@babel/runtime/helpers/esm/arrayLikeToArray.js'
          );
        });
      });

      describe('empty input', () => {
        it('normalizes base', () => {
          const base = 'https://foo.com/';
          const input = '';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://foo.com/');
        });
      });
    });

    describe(`base = "https://foo.com/file"`, () => {
      describe('with absolute input', () => {
        it('returns input', () => {
          const base = 'https://foo.com/file';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes input', () => {
          const base = 'https://foo.com/file';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
        });

        it('normalizes pathless input', () => {
          const base = 'https://foo.com/file';
          const input = 'https://absolute.com';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/');
        });

        it('normalizes current directory', () => {
          const base = 'https://foo.com/file';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = 'https://foo.com/file';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = 'https://foo.com/file';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes file protocol', () => {
          const base = 'https://foo.com/file';
          const input = 'file:///root/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///root/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        it('resolves relative to the base protocol', () => {
          const base = 'https://foo.com/file';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://protocol-relative.com/main.js.map');
        });

        it('normalizes input', () => {
          const base = 'https://foo.com/file';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://protocol-relative.com/foo/main.js.map');
        });

        it('normalizes pathless input', () => {
          const base = 'https://foo.com/file';
          const input = '//protocol-relative.com';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://protocol-relative.com/');
        });

        it('normalizes current directory', () => {
          const base = 'https://foo.com/file';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://protocol-relative.com/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = 'https://foo.com/file';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://protocol-relative.com/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = 'https://foo.com/file';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        it('remains absolute path', () => {
          const base = 'https://foo.com/file';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://foo.com/assets/main.js.map');
        });

        it('trims to root', () => {
          const base = 'https://foo.com/file';
          const input = '/';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://foo.com/');
        });

        it('normalizes input', () => {
          const base = 'https://foo.com/file';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://foo.com/foo/main.js.map');
        });

        it('normalizes current directory', () => {
          const base = 'https://foo.com/file';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://foo.com/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = 'https://foo.com/file';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://foo.com/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = 'https://foo.com/file';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://foo.com/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        it('resolves relative to current directory', () => {
          const base = 'https://foo.com/file';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://foo.com/bar/main.js.map');
        });

        it('resolves relative to parent directory', () => {
          const base = 'https://foo.com/file';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://foo.com/bar/main.js.map');
        });

        it('resolves relative to parent multiple directory', () => {
          const base = 'https://foo.com/file';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://foo.com/bar/main.js.map');
        });

        it('normalizes input', () => {
          const base = 'https://foo.com/file';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://foo.com/foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        it('resolves relative to current directory', () => {
          const base = 'https://foo.com/file';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://foo.com/bar/main.js.map');
        });

        it('resolves relative to parent multiple directory, later', () => {
          const base = 'https://foo.com/file';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://foo.com/bar/main.js.map');
        });

        it('normalizes input', () => {
          const base = 'https://foo.com/file';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://foo.com/foo/main.js.map');
        });

        it('resolves node_module scope as path', () => {
          const base = 'https://foo.com/file';
          const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
          const resolved = resolve(input, base);
          assert.strictEqual(
            resolved,
            'https://foo.com/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js'
          );
        });

        it('resolves package scope as path', () => {
          const base = 'https://foo.com/file';
          const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
          const resolved = resolve(input, base);
          assert.strictEqual(
            resolved,
            'https://foo.com/@babel/runtime/helpers/esm/arrayLikeToArray.js'
          );
        });
      });

      describe('empty input', () => {
        it('normalizes base', () => {
          const base = 'https://foo.com/file';
          const input = '';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://foo.com/file');
        });
      });
    });

    describe(`base = "https://foo.com/dir/"`, () => {
      describe('with absolute input', () => {
        it('returns input', () => {
          const base = 'https://foo.com/dir/';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes input', () => {
          const base = 'https://foo.com/dir/';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
        });

        it('normalizes pathless input', () => {
          const base = 'https://foo.com/dir/';
          const input = 'https://absolute.com';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/');
        });

        it('normalizes current directory', () => {
          const base = 'https://foo.com/dir/';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = 'https://foo.com/dir/';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = 'https://foo.com/dir/';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes file protocol', () => {
          const base = 'https://foo.com/dir/';
          const input = 'file:///root/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///root/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        it('resolves relative to the base protocol', () => {
          const base = 'https://foo.com/dir/';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://protocol-relative.com/main.js.map');
        });

        it('normalizes input', () => {
          const base = 'https://foo.com/dir/';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://protocol-relative.com/foo/main.js.map');
        });

        it('normalizes pathless input', () => {
          const base = 'https://foo.com/dir/';
          const input = '//protocol-relative.com';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://protocol-relative.com/');
        });

        it('normalizes current directory', () => {
          const base = 'https://foo.com/dir/';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://protocol-relative.com/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = 'https://foo.com/dir/';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://protocol-relative.com/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = 'https://foo.com/dir/';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        it('remains absolute path', () => {
          const base = 'https://foo.com/dir/';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://foo.com/assets/main.js.map');
        });

        it('trims to root', () => {
          const base = 'https://foo.com/dir/';
          const input = '/';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://foo.com/');
        });

        it('normalizes input', () => {
          const base = 'https://foo.com/dir/';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://foo.com/foo/main.js.map');
        });

        it('normalizes current directory', () => {
          const base = 'https://foo.com/dir/';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://foo.com/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = 'https://foo.com/dir/';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://foo.com/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = 'https://foo.com/dir/';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://foo.com/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        it('resolves relative to current directory', () => {
          const base = 'https://foo.com/dir/';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://foo.com/dir/bar/main.js.map');
        });

        it('resolves relative to parent directory', () => {
          const base = 'https://foo.com/dir/';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://foo.com/bar/main.js.map');
        });

        it('resolves relative to parent multiple directory', () => {
          const base = 'https://foo.com/dir/';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://foo.com/bar/main.js.map');
        });

        it('normalizes input', () => {
          const base = 'https://foo.com/dir/';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://foo.com/dir/foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        it('resolves relative to current directory', () => {
          const base = 'https://foo.com/dir/';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://foo.com/dir/bar/main.js.map');
        });

        it('resolves relative to parent multiple directory, later', () => {
          const base = 'https://foo.com/dir/';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://foo.com/bar/main.js.map');
        });

        it('normalizes input', () => {
          const base = 'https://foo.com/dir/';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://foo.com/dir/foo/main.js.map');
        });

        it('resolves node_module scope as path', () => {
          const base = 'https://foo.com/dir/';
          const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
          const resolved = resolve(input, base);
          assert.strictEqual(
            resolved,
            'https://foo.com/dir/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js'
          );
        });

        it('resolves package scope as path', () => {
          const base = 'https://foo.com/dir/';
          const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
          const resolved = resolve(input, base);
          assert.strictEqual(
            resolved,
            'https://foo.com/dir/@babel/runtime/helpers/esm/arrayLikeToArray.js'
          );
        });
      });

      describe('empty input', () => {
        it('normalizes base', () => {
          const base = 'https://foo.com/dir/';
          const input = '';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://foo.com/dir/');
        });
      });
    });

    describe(`base = "https://foo.com/dir/file"`, () => {
      describe('with absolute input', () => {
        it('returns input', () => {
          const base = 'https://foo.com/dir/file';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes input', () => {
          const base = 'https://foo.com/dir/file';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
        });

        it('normalizes pathless input', () => {
          const base = 'https://foo.com/dir/file';
          const input = 'https://absolute.com';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/');
        });

        it('normalizes current directory', () => {
          const base = 'https://foo.com/dir/file';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = 'https://foo.com/dir/file';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = 'https://foo.com/dir/file';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes file protocol', () => {
          const base = 'https://foo.com/dir/file';
          const input = 'file:///root/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///root/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        it('resolves relative to the base protocol', () => {
          const base = 'https://foo.com/dir/file';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://protocol-relative.com/main.js.map');
        });

        it('normalizes input', () => {
          const base = 'https://foo.com/dir/file';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://protocol-relative.com/foo/main.js.map');
        });

        it('normalizes pathless input', () => {
          const base = 'https://foo.com/dir/file';
          const input = '//protocol-relative.com';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://protocol-relative.com/');
        });

        it('normalizes current directory', () => {
          const base = 'https://foo.com/dir/file';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://protocol-relative.com/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = 'https://foo.com/dir/file';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://protocol-relative.com/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = 'https://foo.com/dir/file';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        it('remains absolute path', () => {
          const base = 'https://foo.com/dir/file';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://foo.com/assets/main.js.map');
        });

        it('trims to root', () => {
          const base = 'https://foo.com/dir/file';
          const input = '/';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://foo.com/');
        });

        it('normalizes input', () => {
          const base = 'https://foo.com/dir/file';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://foo.com/foo/main.js.map');
        });

        it('normalizes current directory', () => {
          const base = 'https://foo.com/dir/file';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://foo.com/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = 'https://foo.com/dir/file';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://foo.com/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = 'https://foo.com/dir/file';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://foo.com/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        it('resolves relative to current directory', () => {
          const base = 'https://foo.com/dir/file';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://foo.com/dir/bar/main.js.map');
        });

        it('resolves relative to parent directory', () => {
          const base = 'https://foo.com/dir/file';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://foo.com/bar/main.js.map');
        });

        it('resolves relative to parent multiple directory', () => {
          const base = 'https://foo.com/dir/file';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://foo.com/bar/main.js.map');
        });

        it('normalizes input', () => {
          const base = 'https://foo.com/dir/file';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://foo.com/dir/foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        it('resolves relative to current directory', () => {
          const base = 'https://foo.com/dir/file';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://foo.com/dir/bar/main.js.map');
        });

        it('resolves relative to parent multiple directory, later', () => {
          const base = 'https://foo.com/dir/file';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://foo.com/bar/main.js.map');
        });

        it('normalizes input', () => {
          const base = 'https://foo.com/dir/file';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://foo.com/dir/foo/main.js.map');
        });

        it('resolves node_module scope as path', () => {
          const base = 'https://foo.com/dir/file';
          const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
          const resolved = resolve(input, base);
          assert.strictEqual(
            resolved,
            'https://foo.com/dir/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js'
          );
        });

        it('resolves package scope as path', () => {
          const base = 'https://foo.com/dir/file';
          const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
          const resolved = resolve(input, base);
          assert.strictEqual(
            resolved,
            'https://foo.com/dir/@babel/runtime/helpers/esm/arrayLikeToArray.js'
          );
        });
      });

      describe('empty input', () => {
        it('normalizes base', () => {
          const base = 'https://foo.com/dir/file';
          const input = '';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://foo.com/dir/file');
        });
      });
    });

    describe(`base = "https://foo.com/.."`, () => {
      describe('with absolute input', () => {
        it('returns input', () => {
          const base = 'https://foo.com/..';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes input', () => {
          const base = 'https://foo.com/..';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
        });

        it('normalizes pathless input', () => {
          const base = 'https://foo.com/..';
          const input = 'https://absolute.com';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/');
        });

        it('normalizes current directory', () => {
          const base = 'https://foo.com/..';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = 'https://foo.com/..';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = 'https://foo.com/..';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes file protocol', () => {
          const base = 'https://foo.com/..';
          const input = 'file:///root/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///root/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        it('resolves relative to the base protocol', () => {
          const base = 'https://foo.com/..';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://protocol-relative.com/main.js.map');
        });

        it('normalizes input', () => {
          const base = 'https://foo.com/..';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://protocol-relative.com/foo/main.js.map');
        });

        it('normalizes pathless input', () => {
          const base = 'https://foo.com/..';
          const input = '//protocol-relative.com';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://protocol-relative.com/');
        });

        it('normalizes current directory', () => {
          const base = 'https://foo.com/..';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://protocol-relative.com/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = 'https://foo.com/..';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://protocol-relative.com/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = 'https://foo.com/..';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        it('remains absolute path', () => {
          const base = 'https://foo.com/..';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://foo.com/assets/main.js.map');
        });

        it('trims to root', () => {
          const base = 'https://foo.com/..';
          const input = '/';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://foo.com/');
        });

        it('normalizes input', () => {
          const base = 'https://foo.com/..';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://foo.com/foo/main.js.map');
        });

        it('normalizes current directory', () => {
          const base = 'https://foo.com/..';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://foo.com/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = 'https://foo.com/..';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://foo.com/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = 'https://foo.com/..';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://foo.com/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        it('resolves relative to current directory', () => {
          const base = 'https://foo.com/..';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://foo.com/bar/main.js.map');
        });

        it('resolves relative to parent directory', () => {
          const base = 'https://foo.com/..';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://foo.com/bar/main.js.map');
        });

        it('resolves relative to parent multiple directory', () => {
          const base = 'https://foo.com/..';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://foo.com/bar/main.js.map');
        });

        it('normalizes input', () => {
          const base = 'https://foo.com/..';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://foo.com/foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        it('resolves relative to current directory', () => {
          const base = 'https://foo.com/..';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://foo.com/bar/main.js.map');
        });

        it('resolves relative to parent multiple directory, later', () => {
          const base = 'https://foo.com/..';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://foo.com/bar/main.js.map');
        });

        it('normalizes input', () => {
          const base = 'https://foo.com/..';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://foo.com/foo/main.js.map');
        });

        it('resolves node_module scope as path', () => {
          const base = 'https://foo.com/..';
          const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
          const resolved = resolve(input, base);
          assert.strictEqual(
            resolved,
            'https://foo.com/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js'
          );
        });

        it('resolves package scope as path', () => {
          const base = 'https://foo.com/..';
          const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
          const resolved = resolve(input, base);
          assert.strictEqual(
            resolved,
            'https://foo.com/@babel/runtime/helpers/esm/arrayLikeToArray.js'
          );
        });
      });

      describe('empty input', () => {
        it('normalizes base', () => {
          const base = 'https://foo.com/..';
          const input = '';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://foo.com/');
        });
      });
    });

    describe(`base = "https://foo.com/../"`, () => {
      describe('with absolute input', () => {
        it('returns input', () => {
          const base = 'https://foo.com/../';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes input', () => {
          const base = 'https://foo.com/../';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
        });

        it('normalizes pathless input', () => {
          const base = 'https://foo.com/../';
          const input = 'https://absolute.com';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/');
        });

        it('normalizes current directory', () => {
          const base = 'https://foo.com/../';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = 'https://foo.com/../';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = 'https://foo.com/../';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes file protocol', () => {
          const base = 'https://foo.com/../';
          const input = 'file:///root/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///root/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        it('resolves relative to the base protocol', () => {
          const base = 'https://foo.com/../';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://protocol-relative.com/main.js.map');
        });

        it('normalizes input', () => {
          const base = 'https://foo.com/../';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://protocol-relative.com/foo/main.js.map');
        });

        it('normalizes pathless input', () => {
          const base = 'https://foo.com/../';
          const input = '//protocol-relative.com';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://protocol-relative.com/');
        });

        it('normalizes current directory', () => {
          const base = 'https://foo.com/../';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://protocol-relative.com/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = 'https://foo.com/../';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://protocol-relative.com/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = 'https://foo.com/../';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        it('remains absolute path', () => {
          const base = 'https://foo.com/../';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://foo.com/assets/main.js.map');
        });

        it('trims to root', () => {
          const base = 'https://foo.com/../';
          const input = '/';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://foo.com/');
        });

        it('normalizes input', () => {
          const base = 'https://foo.com/../';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://foo.com/foo/main.js.map');
        });

        it('normalizes current directory', () => {
          const base = 'https://foo.com/../';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://foo.com/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = 'https://foo.com/../';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://foo.com/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = 'https://foo.com/../';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://foo.com/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        it('resolves relative to current directory', () => {
          const base = 'https://foo.com/../';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://foo.com/bar/main.js.map');
        });

        it('resolves relative to parent directory', () => {
          const base = 'https://foo.com/../';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://foo.com/bar/main.js.map');
        });

        it('resolves relative to parent multiple directory', () => {
          const base = 'https://foo.com/../';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://foo.com/bar/main.js.map');
        });

        it('normalizes input', () => {
          const base = 'https://foo.com/../';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://foo.com/foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        it('resolves relative to current directory', () => {
          const base = 'https://foo.com/../';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://foo.com/bar/main.js.map');
        });

        it('resolves relative to parent multiple directory, later', () => {
          const base = 'https://foo.com/../';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://foo.com/bar/main.js.map');
        });

        it('normalizes input', () => {
          const base = 'https://foo.com/../';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://foo.com/foo/main.js.map');
        });

        it('resolves node_module scope as path', () => {
          const base = 'https://foo.com/../';
          const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
          const resolved = resolve(input, base);
          assert.strictEqual(
            resolved,
            'https://foo.com/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js'
          );
        });

        it('resolves package scope as path', () => {
          const base = 'https://foo.com/../';
          const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
          const resolved = resolve(input, base);
          assert.strictEqual(
            resolved,
            'https://foo.com/@babel/runtime/helpers/esm/arrayLikeToArray.js'
          );
        });
      });

      describe('empty input', () => {
        it('normalizes base', () => {
          const base = 'https://foo.com/../';
          const input = '';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://foo.com/');
        });
      });
    });

    describe(`base = "https://foo.com/dir/.."`, () => {
      describe('with absolute input', () => {
        it('returns input', () => {
          const base = 'https://foo.com/dir/..';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes input', () => {
          const base = 'https://foo.com/dir/..';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
        });

        it('normalizes pathless input', () => {
          const base = 'https://foo.com/dir/..';
          const input = 'https://absolute.com';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/');
        });

        it('normalizes current directory', () => {
          const base = 'https://foo.com/dir/..';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = 'https://foo.com/dir/..';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = 'https://foo.com/dir/..';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes file protocol', () => {
          const base = 'https://foo.com/dir/..';
          const input = 'file:///root/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///root/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        it('resolves relative to the base protocol', () => {
          const base = 'https://foo.com/dir/..';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://protocol-relative.com/main.js.map');
        });

        it('normalizes input', () => {
          const base = 'https://foo.com/dir/..';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://protocol-relative.com/foo/main.js.map');
        });

        it('normalizes pathless input', () => {
          const base = 'https://foo.com/dir/..';
          const input = '//protocol-relative.com';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://protocol-relative.com/');
        });

        it('normalizes current directory', () => {
          const base = 'https://foo.com/dir/..';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://protocol-relative.com/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = 'https://foo.com/dir/..';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://protocol-relative.com/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = 'https://foo.com/dir/..';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        it('remains absolute path', () => {
          const base = 'https://foo.com/dir/..';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://foo.com/assets/main.js.map');
        });

        it('trims to root', () => {
          const base = 'https://foo.com/dir/..';
          const input = '/';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://foo.com/');
        });

        it('normalizes input', () => {
          const base = 'https://foo.com/dir/..';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://foo.com/foo/main.js.map');
        });

        it('normalizes current directory', () => {
          const base = 'https://foo.com/dir/..';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://foo.com/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = 'https://foo.com/dir/..';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://foo.com/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = 'https://foo.com/dir/..';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://foo.com/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        it('resolves relative to current directory', () => {
          const base = 'https://foo.com/dir/..';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://foo.com/bar/main.js.map');
        });

        it('resolves relative to parent directory', () => {
          const base = 'https://foo.com/dir/..';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://foo.com/bar/main.js.map');
        });

        it('resolves relative to parent multiple directory', () => {
          const base = 'https://foo.com/dir/..';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://foo.com/bar/main.js.map');
        });

        it('normalizes input', () => {
          const base = 'https://foo.com/dir/..';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://foo.com/foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        it('resolves relative to current directory', () => {
          const base = 'https://foo.com/dir/..';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://foo.com/bar/main.js.map');
        });

        it('resolves relative to parent multiple directory, later', () => {
          const base = 'https://foo.com/dir/..';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://foo.com/bar/main.js.map');
        });

        it('normalizes input', () => {
          const base = 'https://foo.com/dir/..';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://foo.com/foo/main.js.map');
        });

        it('resolves node_module scope as path', () => {
          const base = 'https://foo.com/dir/..';
          const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
          const resolved = resolve(input, base);
          assert.strictEqual(
            resolved,
            'https://foo.com/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js'
          );
        });

        it('resolves package scope as path', () => {
          const base = 'https://foo.com/dir/..';
          const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
          const resolved = resolve(input, base);
          assert.strictEqual(
            resolved,
            'https://foo.com/@babel/runtime/helpers/esm/arrayLikeToArray.js'
          );
        });
      });

      describe('empty input', () => {
        it('normalizes base', () => {
          const base = 'https://foo.com/dir/..';
          const input = '';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://foo.com/');
        });
      });
    });

    describe(`base = "file:///foo"`, () => {
      describe('with absolute input', () => {
        it('returns input', () => {
          const base = 'file:///foo';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes input', () => {
          const base = 'file:///foo';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
        });

        it('normalizes pathless input', () => {
          const base = 'file:///foo';
          const input = 'https://absolute.com';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/');
        });

        it('normalizes current directory', () => {
          const base = 'file:///foo';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = 'file:///foo';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = 'file:///foo';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes file protocol', () => {
          const base = 'file:///foo';
          const input = 'file:///root/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///root/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        it('resolves relative to the base protocol', () => {
          const base = 'file:///foo';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///main.js.map');
        });

        it('normalizes input', () => {
          const base = 'file:///foo';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///foo/main.js.map');
        });

        it('normalizes pathless input', () => {
          const base = 'file:///foo';
          const input = '//protocol-relative.com';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///');
        });

        it('normalizes current directory', () => {
          const base = 'file:///foo';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = 'file:///foo';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = 'file:///foo';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///main.js.map');
        });
      });

      describe('with absolute path input', () => {
        it('remains absolute path', () => {
          const base = 'file:///foo';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///assets/main.js.map');
        });

        it('trims to root', () => {
          const base = 'file:///foo';
          const input = '/';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///');
        });

        it('normalizes input', () => {
          const base = 'file:///foo';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///foo/main.js.map');
        });

        it('normalizes current directory', () => {
          const base = 'file:///foo';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = 'file:///foo';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = 'file:///foo';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        it('resolves relative to current directory', () => {
          const base = 'file:///foo';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///bar/main.js.map');
        });

        it('resolves relative to parent directory', () => {
          const base = 'file:///foo';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///bar/main.js.map');
        });

        it('resolves relative to parent multiple directory', () => {
          const base = 'file:///foo';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///bar/main.js.map');
        });

        it('normalizes input', () => {
          const base = 'file:///foo';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        it('resolves relative to current directory', () => {
          const base = 'file:///foo';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///bar/main.js.map');
        });

        it('resolves relative to parent multiple directory, later', () => {
          const base = 'file:///foo';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///bar/main.js.map');
        });

        it('normalizes input', () => {
          const base = 'file:///foo';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///foo/main.js.map');
        });

        it('resolves node_module scope as path', () => {
          const base = 'file:///foo';
          const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
          const resolved = resolve(input, base);
          assert.strictEqual(
            resolved,
            'file:///node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js'
          );
        });

        it('resolves package scope as path', () => {
          const base = 'file:///foo';
          const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///@babel/runtime/helpers/esm/arrayLikeToArray.js');
        });
      });

      describe('empty input', () => {
        it('normalizes base', () => {
          const base = 'file:///foo';
          const input = '';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///foo');
        });
      });
    });

    describe(`base = "file:///foo/"`, () => {
      describe('with absolute input', () => {
        it('returns input', () => {
          const base = 'file:///foo/';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes input', () => {
          const base = 'file:///foo/';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
        });

        it('normalizes pathless input', () => {
          const base = 'file:///foo/';
          const input = 'https://absolute.com';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/');
        });

        it('normalizes current directory', () => {
          const base = 'file:///foo/';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = 'file:///foo/';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = 'file:///foo/';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes file protocol', () => {
          const base = 'file:///foo/';
          const input = 'file:///root/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///root/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        it('resolves relative to the base protocol', () => {
          const base = 'file:///foo/';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///main.js.map');
        });

        it('normalizes input', () => {
          const base = 'file:///foo/';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///foo/main.js.map');
        });

        it('normalizes pathless input', () => {
          const base = 'file:///foo/';
          const input = '//protocol-relative.com';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///');
        });

        it('normalizes current directory', () => {
          const base = 'file:///foo/';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = 'file:///foo/';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = 'file:///foo/';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///main.js.map');
        });
      });

      describe('with absolute path input', () => {
        it('remains absolute path', () => {
          const base = 'file:///foo/';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///assets/main.js.map');
        });

        it('trims to root', () => {
          const base = 'file:///foo/';
          const input = '/';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///');
        });

        it('normalizes input', () => {
          const base = 'file:///foo/';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///foo/main.js.map');
        });

        it('normalizes current directory', () => {
          const base = 'file:///foo/';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = 'file:///foo/';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = 'file:///foo/';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        it('resolves relative to current directory', () => {
          const base = 'file:///foo/';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///foo/bar/main.js.map');
        });

        it('resolves relative to parent directory', () => {
          const base = 'file:///foo/';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///bar/main.js.map');
        });

        it('resolves relative to parent multiple directory', () => {
          const base = 'file:///foo/';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///bar/main.js.map');
        });

        it('normalizes input', () => {
          const base = 'file:///foo/';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///foo/foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        it('resolves relative to current directory', () => {
          const base = 'file:///foo/';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///foo/bar/main.js.map');
        });

        it('resolves relative to parent multiple directory, later', () => {
          const base = 'file:///foo/';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///bar/main.js.map');
        });

        it('normalizes input', () => {
          const base = 'file:///foo/';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///foo/foo/main.js.map');
        });

        it('resolves node_module scope as path', () => {
          const base = 'file:///foo/';
          const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
          const resolved = resolve(input, base);
          assert.strictEqual(
            resolved,
            'file:///foo/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js'
          );
        });

        it('resolves package scope as path', () => {
          const base = 'file:///foo/';
          const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
          const resolved = resolve(input, base);
          assert.strictEqual(
            resolved,
            'file:///foo/@babel/runtime/helpers/esm/arrayLikeToArray.js'
          );
        });
      });

      describe('empty input', () => {
        it('normalizes base', () => {
          const base = 'file:///foo/';
          const input = '';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///foo/');
        });
      });
    });

    describe(`base = "file:///foo/file"`, () => {
      describe('with absolute input', () => {
        it('returns input', () => {
          const base = 'file:///foo/file';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes input', () => {
          const base = 'file:///foo/file';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
        });

        it('normalizes pathless input', () => {
          const base = 'file:///foo/file';
          const input = 'https://absolute.com';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/');
        });

        it('normalizes current directory', () => {
          const base = 'file:///foo/file';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = 'file:///foo/file';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = 'file:///foo/file';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes file protocol', () => {
          const base = 'file:///foo/file';
          const input = 'file:///root/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///root/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        it('resolves relative to the base protocol', () => {
          const base = 'file:///foo/file';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///main.js.map');
        });

        it('normalizes input', () => {
          const base = 'file:///foo/file';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///foo/main.js.map');
        });

        it('normalizes pathless input', () => {
          const base = 'file:///foo/file';
          const input = '//protocol-relative.com';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///');
        });

        it('normalizes current directory', () => {
          const base = 'file:///foo/file';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = 'file:///foo/file';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = 'file:///foo/file';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///main.js.map');
        });
      });

      describe('with absolute path input', () => {
        it('remains absolute path', () => {
          const base = 'file:///foo/file';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///assets/main.js.map');
        });

        it('trims to root', () => {
          const base = 'file:///foo/file';
          const input = '/';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///');
        });

        it('normalizes input', () => {
          const base = 'file:///foo/file';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///foo/main.js.map');
        });

        it('normalizes current directory', () => {
          const base = 'file:///foo/file';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = 'file:///foo/file';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = 'file:///foo/file';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        it('resolves relative to current directory', () => {
          const base = 'file:///foo/file';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///foo/bar/main.js.map');
        });

        it('resolves relative to parent directory', () => {
          const base = 'file:///foo/file';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///bar/main.js.map');
        });

        it('resolves relative to parent multiple directory', () => {
          const base = 'file:///foo/file';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///bar/main.js.map');
        });

        it('normalizes input', () => {
          const base = 'file:///foo/file';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///foo/foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        it('resolves relative to current directory', () => {
          const base = 'file:///foo/file';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///foo/bar/main.js.map');
        });

        it('resolves relative to parent multiple directory, later', () => {
          const base = 'file:///foo/file';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///bar/main.js.map');
        });

        it('normalizes input', () => {
          const base = 'file:///foo/file';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///foo/foo/main.js.map');
        });

        it('resolves node_module scope as path', () => {
          const base = 'file:///foo/file';
          const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
          const resolved = resolve(input, base);
          assert.strictEqual(
            resolved,
            'file:///foo/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js'
          );
        });

        it('resolves package scope as path', () => {
          const base = 'file:///foo/file';
          const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
          const resolved = resolve(input, base);
          assert.strictEqual(
            resolved,
            'file:///foo/@babel/runtime/helpers/esm/arrayLikeToArray.js'
          );
        });
      });

      describe('empty input', () => {
        it('normalizes base', () => {
          const base = 'file:///foo/file';
          const input = '';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///foo/file');
        });
      });
    });

    describe(`base = "file:///foo/dir/"`, () => {
      describe('with absolute input', () => {
        it('returns input', () => {
          const base = 'file:///foo/dir/';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes input', () => {
          const base = 'file:///foo/dir/';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
        });

        it('normalizes pathless input', () => {
          const base = 'file:///foo/dir/';
          const input = 'https://absolute.com';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/');
        });

        it('normalizes current directory', () => {
          const base = 'file:///foo/dir/';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = 'file:///foo/dir/';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = 'file:///foo/dir/';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes file protocol', () => {
          const base = 'file:///foo/dir/';
          const input = 'file:///root/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///root/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        it('resolves relative to the base protocol', () => {
          const base = 'file:///foo/dir/';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///main.js.map');
        });

        it('normalizes input', () => {
          const base = 'file:///foo/dir/';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///foo/main.js.map');
        });

        it('normalizes pathless input', () => {
          const base = 'file:///foo/dir/';
          const input = '//protocol-relative.com';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///');
        });

        it('normalizes current directory', () => {
          const base = 'file:///foo/dir/';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = 'file:///foo/dir/';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = 'file:///foo/dir/';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///main.js.map');
        });
      });

      describe('with absolute path input', () => {
        it('remains absolute path', () => {
          const base = 'file:///foo/dir/';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///assets/main.js.map');
        });

        it('trims to root', () => {
          const base = 'file:///foo/dir/';
          const input = '/';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///');
        });

        it('normalizes input', () => {
          const base = 'file:///foo/dir/';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///foo/main.js.map');
        });

        it('normalizes current directory', () => {
          const base = 'file:///foo/dir/';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = 'file:///foo/dir/';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = 'file:///foo/dir/';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        it('resolves relative to current directory', () => {
          const base = 'file:///foo/dir/';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///foo/dir/bar/main.js.map');
        });

        it('resolves relative to parent directory', () => {
          const base = 'file:///foo/dir/';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///foo/bar/main.js.map');
        });

        it('resolves relative to parent multiple directory', () => {
          const base = 'file:///foo/dir/';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///bar/main.js.map');
        });

        it('normalizes input', () => {
          const base = 'file:///foo/dir/';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///foo/dir/foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        it('resolves relative to current directory', () => {
          const base = 'file:///foo/dir/';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///foo/dir/bar/main.js.map');
        });

        it('resolves relative to parent multiple directory, later', () => {
          const base = 'file:///foo/dir/';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///bar/main.js.map');
        });

        it('normalizes input', () => {
          const base = 'file:///foo/dir/';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///foo/dir/foo/main.js.map');
        });

        it('resolves node_module scope as path', () => {
          const base = 'file:///foo/dir/';
          const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
          const resolved = resolve(input, base);
          assert.strictEqual(
            resolved,
            'file:///foo/dir/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js'
          );
        });

        it('resolves package scope as path', () => {
          const base = 'file:///foo/dir/';
          const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
          const resolved = resolve(input, base);
          assert.strictEqual(
            resolved,
            'file:///foo/dir/@babel/runtime/helpers/esm/arrayLikeToArray.js'
          );
        });
      });

      describe('empty input', () => {
        it('normalizes base', () => {
          const base = 'file:///foo/dir/';
          const input = '';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///foo/dir/');
        });
      });
    });

    describe(`base = "file:///foo/dir/file"`, () => {
      describe('with absolute input', () => {
        it('returns input', () => {
          const base = 'file:///foo/dir/file';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes input', () => {
          const base = 'file:///foo/dir/file';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
        });

        it('normalizes pathless input', () => {
          const base = 'file:///foo/dir/file';
          const input = 'https://absolute.com';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/');
        });

        it('normalizes current directory', () => {
          const base = 'file:///foo/dir/file';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = 'file:///foo/dir/file';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = 'file:///foo/dir/file';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes file protocol', () => {
          const base = 'file:///foo/dir/file';
          const input = 'file:///root/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///root/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        it('resolves relative to the base protocol', () => {
          const base = 'file:///foo/dir/file';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///main.js.map');
        });

        it('normalizes input', () => {
          const base = 'file:///foo/dir/file';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///foo/main.js.map');
        });

        it('normalizes pathless input', () => {
          const base = 'file:///foo/dir/file';
          const input = '//protocol-relative.com';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///');
        });

        it('normalizes current directory', () => {
          const base = 'file:///foo/dir/file';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = 'file:///foo/dir/file';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = 'file:///foo/dir/file';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///main.js.map');
        });
      });

      describe('with absolute path input', () => {
        it('remains absolute path', () => {
          const base = 'file:///foo/dir/file';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///assets/main.js.map');
        });

        it('trims to root', () => {
          const base = 'file:///foo/dir/file';
          const input = '/';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///');
        });

        it('normalizes input', () => {
          const base = 'file:///foo/dir/file';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///foo/main.js.map');
        });

        it('normalizes current directory', () => {
          const base = 'file:///foo/dir/file';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = 'file:///foo/dir/file';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = 'file:///foo/dir/file';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        it('resolves relative to current directory', () => {
          const base = 'file:///foo/dir/file';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///foo/dir/bar/main.js.map');
        });

        it('resolves relative to parent directory', () => {
          const base = 'file:///foo/dir/file';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///foo/bar/main.js.map');
        });

        it('resolves relative to parent multiple directory', () => {
          const base = 'file:///foo/dir/file';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///bar/main.js.map');
        });

        it('normalizes input', () => {
          const base = 'file:///foo/dir/file';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///foo/dir/foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        it('resolves relative to current directory', () => {
          const base = 'file:///foo/dir/file';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///foo/dir/bar/main.js.map');
        });

        it('resolves relative to parent multiple directory, later', () => {
          const base = 'file:///foo/dir/file';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///bar/main.js.map');
        });

        it('normalizes input', () => {
          const base = 'file:///foo/dir/file';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///foo/dir/foo/main.js.map');
        });

        it('resolves node_module scope as path', () => {
          const base = 'file:///foo/dir/file';
          const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
          const resolved = resolve(input, base);
          assert.strictEqual(
            resolved,
            'file:///foo/dir/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js'
          );
        });

        it('resolves package scope as path', () => {
          const base = 'file:///foo/dir/file';
          const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
          const resolved = resolve(input, base);
          assert.strictEqual(
            resolved,
            'file:///foo/dir/@babel/runtime/helpers/esm/arrayLikeToArray.js'
          );
        });
      });

      describe('empty input', () => {
        it('normalizes base', () => {
          const base = 'file:///foo/dir/file';
          const input = '';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///foo/dir/file');
        });
      });
    });

    describe(`base = "file:///foo/.."`, () => {
      describe('with absolute input', () => {
        it('returns input', () => {
          const base = 'file:///foo/..';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes input', () => {
          const base = 'file:///foo/..';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
        });

        it('normalizes pathless input', () => {
          const base = 'file:///foo/..';
          const input = 'https://absolute.com';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/');
        });

        it('normalizes current directory', () => {
          const base = 'file:///foo/..';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = 'file:///foo/..';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = 'file:///foo/..';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes file protocol', () => {
          const base = 'file:///foo/..';
          const input = 'file:///root/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///root/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        it('resolves relative to the base protocol', () => {
          const base = 'file:///foo/..';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///main.js.map');
        });

        it('normalizes input', () => {
          const base = 'file:///foo/..';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///foo/main.js.map');
        });

        it('normalizes pathless input', () => {
          const base = 'file:///foo/..';
          const input = '//protocol-relative.com';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///');
        });

        it('normalizes current directory', () => {
          const base = 'file:///foo/..';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = 'file:///foo/..';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = 'file:///foo/..';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///main.js.map');
        });
      });

      describe('with absolute path input', () => {
        it('remains absolute path', () => {
          const base = 'file:///foo/..';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///assets/main.js.map');
        });

        it('trims to root', () => {
          const base = 'file:///foo/..';
          const input = '/';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///');
        });

        it('normalizes input', () => {
          const base = 'file:///foo/..';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///foo/main.js.map');
        });

        it('normalizes current directory', () => {
          const base = 'file:///foo/..';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = 'file:///foo/..';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = 'file:///foo/..';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        it('resolves relative to current directory', () => {
          const base = 'file:///foo/..';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///bar/main.js.map');
        });

        it('resolves relative to parent directory', () => {
          const base = 'file:///foo/..';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///bar/main.js.map');
        });

        it('resolves relative to parent multiple directory', () => {
          const base = 'file:///foo/..';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///bar/main.js.map');
        });

        it('normalizes input', () => {
          const base = 'file:///foo/..';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        it('resolves relative to current directory', () => {
          const base = 'file:///foo/..';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///bar/main.js.map');
        });

        it('resolves relative to parent multiple directory, later', () => {
          const base = 'file:///foo/..';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///bar/main.js.map');
        });

        it('normalizes input', () => {
          const base = 'file:///foo/..';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///foo/main.js.map');
        });

        it('resolves node_module scope as path', () => {
          const base = 'file:///foo/..';
          const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
          const resolved = resolve(input, base);
          assert.strictEqual(
            resolved,
            'file:///node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js'
          );
        });

        it('resolves package scope as path', () => {
          const base = 'file:///foo/..';
          const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///@babel/runtime/helpers/esm/arrayLikeToArray.js');
        });
      });

      describe('empty input', () => {
        it('normalizes base', () => {
          const base = 'file:///foo/..';
          const input = '';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///');
        });
      });
    });

    describe(`base = "file:///foo/../"`, () => {
      describe('with absolute input', () => {
        it('returns input', () => {
          const base = 'file:///foo/../';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes input', () => {
          const base = 'file:///foo/../';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
        });

        it('normalizes pathless input', () => {
          const base = 'file:///foo/../';
          const input = 'https://absolute.com';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/');
        });

        it('normalizes current directory', () => {
          const base = 'file:///foo/../';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = 'file:///foo/../';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = 'file:///foo/../';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes file protocol', () => {
          const base = 'file:///foo/../';
          const input = 'file:///root/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///root/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        it('resolves relative to the base protocol', () => {
          const base = 'file:///foo/../';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///main.js.map');
        });

        it('normalizes input', () => {
          const base = 'file:///foo/../';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///foo/main.js.map');
        });

        it('normalizes pathless input', () => {
          const base = 'file:///foo/../';
          const input = '//protocol-relative.com';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///');
        });

        it('normalizes current directory', () => {
          const base = 'file:///foo/../';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = 'file:///foo/../';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = 'file:///foo/../';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///main.js.map');
        });
      });

      describe('with absolute path input', () => {
        it('remains absolute path', () => {
          const base = 'file:///foo/../';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///assets/main.js.map');
        });

        it('trims to root', () => {
          const base = 'file:///foo/../';
          const input = '/';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///');
        });

        it('normalizes input', () => {
          const base = 'file:///foo/../';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///foo/main.js.map');
        });

        it('normalizes current directory', () => {
          const base = 'file:///foo/../';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = 'file:///foo/../';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = 'file:///foo/../';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        it('resolves relative to current directory', () => {
          const base = 'file:///foo/../';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///bar/main.js.map');
        });

        it('resolves relative to parent directory', () => {
          const base = 'file:///foo/../';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///bar/main.js.map');
        });

        it('resolves relative to parent multiple directory', () => {
          const base = 'file:///foo/../';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///bar/main.js.map');
        });

        it('normalizes input', () => {
          const base = 'file:///foo/../';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        it('resolves relative to current directory', () => {
          const base = 'file:///foo/../';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///bar/main.js.map');
        });

        it('resolves relative to parent multiple directory, later', () => {
          const base = 'file:///foo/../';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///bar/main.js.map');
        });

        it('normalizes input', () => {
          const base = 'file:///foo/../';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///foo/main.js.map');
        });

        it('resolves node_module scope as path', () => {
          const base = 'file:///foo/../';
          const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
          const resolved = resolve(input, base);
          assert.strictEqual(
            resolved,
            'file:///node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js'
          );
        });

        it('resolves package scope as path', () => {
          const base = 'file:///foo/../';
          const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///@babel/runtime/helpers/esm/arrayLikeToArray.js');
        });
      });

      describe('empty input', () => {
        it('normalizes base', () => {
          const base = 'file:///foo/../';
          const input = '';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///');
        });
      });
    });

    describe(`base = "file:///foo/dir/.."`, () => {
      describe('with absolute input', () => {
        it('returns input', () => {
          const base = 'file:///foo/dir/..';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes input', () => {
          const base = 'file:///foo/dir/..';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
        });

        it('normalizes pathless input', () => {
          const base = 'file:///foo/dir/..';
          const input = 'https://absolute.com';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/');
        });

        it('normalizes current directory', () => {
          const base = 'file:///foo/dir/..';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = 'file:///foo/dir/..';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = 'file:///foo/dir/..';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes file protocol', () => {
          const base = 'file:///foo/dir/..';
          const input = 'file:///root/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///root/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        it('resolves relative to the base protocol', () => {
          const base = 'file:///foo/dir/..';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///main.js.map');
        });

        it('normalizes input', () => {
          const base = 'file:///foo/dir/..';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///foo/main.js.map');
        });

        it('normalizes pathless input', () => {
          const base = 'file:///foo/dir/..';
          const input = '//protocol-relative.com';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///');
        });

        it('normalizes current directory', () => {
          const base = 'file:///foo/dir/..';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = 'file:///foo/dir/..';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = 'file:///foo/dir/..';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///main.js.map');
        });
      });

      describe('with absolute path input', () => {
        it('remains absolute path', () => {
          const base = 'file:///foo/dir/..';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///assets/main.js.map');
        });

        it('trims to root', () => {
          const base = 'file:///foo/dir/..';
          const input = '/';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///');
        });

        it('normalizes input', () => {
          const base = 'file:///foo/dir/..';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///foo/main.js.map');
        });

        it('normalizes current directory', () => {
          const base = 'file:///foo/dir/..';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = 'file:///foo/dir/..';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = 'file:///foo/dir/..';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        it('resolves relative to current directory', () => {
          const base = 'file:///foo/dir/..';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///foo/bar/main.js.map');
        });

        it('resolves relative to parent directory', () => {
          const base = 'file:///foo/dir/..';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///bar/main.js.map');
        });

        it('resolves relative to parent multiple directory', () => {
          const base = 'file:///foo/dir/..';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///bar/main.js.map');
        });

        it('normalizes input', () => {
          const base = 'file:///foo/dir/..';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///foo/foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        it('resolves relative to current directory', () => {
          const base = 'file:///foo/dir/..';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///foo/bar/main.js.map');
        });

        it('resolves relative to parent multiple directory, later', () => {
          const base = 'file:///foo/dir/..';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///bar/main.js.map');
        });

        it('normalizes input', () => {
          const base = 'file:///foo/dir/..';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///foo/foo/main.js.map');
        });

        it('resolves node_module scope as path', () => {
          const base = 'file:///foo/dir/..';
          const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
          const resolved = resolve(input, base);
          assert.strictEqual(
            resolved,
            'file:///foo/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js'
          );
        });

        it('resolves package scope as path', () => {
          const base = 'file:///foo/dir/..';
          const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
          const resolved = resolve(input, base);
          assert.strictEqual(
            resolved,
            'file:///foo/@babel/runtime/helpers/esm/arrayLikeToArray.js'
          );
        });
      });

      describe('empty input', () => {
        it('normalizes base', () => {
          const base = 'file:///foo/dir/..';
          const input = '';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///foo/');
        });
      });
    });
  });

  describe('with protocol relative base', () => {
    describe(`base = "//foo.com"`, () => {
      describe('with absolute input', () => {
        it('returns input', () => {
          const base = '//foo.com';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes input', () => {
          const base = '//foo.com';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
        });

        it('normalizes pathless input', () => {
          const base = '//foo.com';
          const input = 'https://absolute.com';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/');
        });

        it('normalizes current directory', () => {
          const base = '//foo.com';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = '//foo.com';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = '//foo.com';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes file protocol', () => {
          const base = '//foo.com';
          const input = 'file:///root/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///root/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        it('resolves relative to the base protocol', () => {
          const base = '//foo.com';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });

        it('normalizes input', () => {
          const base = '//foo.com';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/foo/main.js.map');
        });

        it('normalizes pathless input', () => {
          const base = '//foo.com';
          const input = '//protocol-relative.com';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/');
        });

        it('normalizes current directory', () => {
          const base = '//foo.com';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = '//foo.com';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = '//foo.com';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        it('remains absolute path', () => {
          const base = '//foo.com';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//foo.com/assets/main.js.map');
        });

        it('trims to root', () => {
          const base = '//foo.com';
          const input = '/';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//foo.com/');
        });

        it('normalizes input', () => {
          const base = '//foo.com';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//foo.com/foo/main.js.map');
        });

        it('normalizes current directory', () => {
          const base = '//foo.com';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//foo.com/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = '//foo.com';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//foo.com/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = '//foo.com';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//foo.com/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        it('resolves relative to current directory', () => {
          const base = '//foo.com';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//foo.com/bar/main.js.map');
        });

        it('resolves relative to parent directory', () => {
          const base = '//foo.com';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//foo.com/bar/main.js.map');
        });

        it('resolves relative to parent multiple directory', () => {
          const base = '//foo.com';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//foo.com/bar/main.js.map');
        });

        it('normalizes input', () => {
          const base = '//foo.com';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//foo.com/foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        it('resolves relative to current directory', () => {
          const base = '//foo.com';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//foo.com/bar/main.js.map');
        });

        it('resolves relative to parent multiple directory, later', () => {
          const base = '//foo.com';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//foo.com/bar/main.js.map');
        });

        it('normalizes input', () => {
          const base = '//foo.com';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//foo.com/foo/main.js.map');
        });

        it('resolves node_module scope as path', () => {
          const base = '//foo.com';
          const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
          const resolved = resolve(input, base);
          assert.strictEqual(
            resolved,
            '//foo.com/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js'
          );
        });

        it('resolves package scope as path', () => {
          const base = '//foo.com';
          const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//foo.com/@babel/runtime/helpers/esm/arrayLikeToArray.js');
        });
      });

      describe('empty input', () => {
        it('normalizes base', () => {
          const base = '//foo.com';
          const input = '';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//foo.com/');
        });
      });
    });

    describe(`base = "//foo.com/"`, () => {
      describe('with absolute input', () => {
        it('returns input', () => {
          const base = '//foo.com/';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes input', () => {
          const base = '//foo.com/';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
        });

        it('normalizes pathless input', () => {
          const base = '//foo.com/';
          const input = 'https://absolute.com';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/');
        });

        it('normalizes current directory', () => {
          const base = '//foo.com/';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = '//foo.com/';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = '//foo.com/';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes file protocol', () => {
          const base = '//foo.com/';
          const input = 'file:///root/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///root/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        it('resolves relative to the base protocol', () => {
          const base = '//foo.com/';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });

        it('normalizes input', () => {
          const base = '//foo.com/';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/foo/main.js.map');
        });

        it('normalizes pathless input', () => {
          const base = '//foo.com/';
          const input = '//protocol-relative.com';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/');
        });

        it('normalizes current directory', () => {
          const base = '//foo.com/';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = '//foo.com/';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = '//foo.com/';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        it('remains absolute path', () => {
          const base = '//foo.com/';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//foo.com/assets/main.js.map');
        });

        it('trims to root', () => {
          const base = '//foo.com/';
          const input = '/';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//foo.com/');
        });

        it('normalizes input', () => {
          const base = '//foo.com/';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//foo.com/foo/main.js.map');
        });

        it('normalizes current directory', () => {
          const base = '//foo.com/';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//foo.com/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = '//foo.com/';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//foo.com/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = '//foo.com/';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//foo.com/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        it('resolves relative to current directory', () => {
          const base = '//foo.com/';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//foo.com/bar/main.js.map');
        });

        it('resolves relative to parent directory', () => {
          const base = '//foo.com/';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//foo.com/bar/main.js.map');
        });

        it('resolves relative to parent multiple directory', () => {
          const base = '//foo.com/';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//foo.com/bar/main.js.map');
        });

        it('normalizes input', () => {
          const base = '//foo.com/';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//foo.com/foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        it('resolves relative to current directory', () => {
          const base = '//foo.com/';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//foo.com/bar/main.js.map');
        });

        it('resolves relative to parent multiple directory, later', () => {
          const base = '//foo.com/';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//foo.com/bar/main.js.map');
        });

        it('normalizes input', () => {
          const base = '//foo.com/';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//foo.com/foo/main.js.map');
        });

        it('resolves node_module scope as path', () => {
          const base = '//foo.com/';
          const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
          const resolved = resolve(input, base);
          assert.strictEqual(
            resolved,
            '//foo.com/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js'
          );
        });

        it('resolves package scope as path', () => {
          const base = '//foo.com/';
          const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//foo.com/@babel/runtime/helpers/esm/arrayLikeToArray.js');
        });
      });

      describe('empty input', () => {
        it('normalizes base', () => {
          const base = '//foo.com/';
          const input = '';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//foo.com/');
        });
      });
    });

    describe(`base = "//foo.com/file"`, () => {
      describe('with absolute input', () => {
        it('returns input', () => {
          const base = '//foo.com/file';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes input', () => {
          const base = '//foo.com/file';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
        });

        it('normalizes pathless input', () => {
          const base = '//foo.com/file';
          const input = 'https://absolute.com';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/');
        });

        it('normalizes current directory', () => {
          const base = '//foo.com/file';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = '//foo.com/file';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = '//foo.com/file';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes file protocol', () => {
          const base = '//foo.com/file';
          const input = 'file:///root/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///root/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        it('resolves relative to the base protocol', () => {
          const base = '//foo.com/file';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });

        it('normalizes input', () => {
          const base = '//foo.com/file';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/foo/main.js.map');
        });

        it('normalizes pathless input', () => {
          const base = '//foo.com/file';
          const input = '//protocol-relative.com';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/');
        });

        it('normalizes current directory', () => {
          const base = '//foo.com/file';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = '//foo.com/file';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = '//foo.com/file';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        it('remains absolute path', () => {
          const base = '//foo.com/file';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//foo.com/assets/main.js.map');
        });

        it('trims to root', () => {
          const base = '//foo.com/file';
          const input = '/';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//foo.com/');
        });

        it('normalizes input', () => {
          const base = '//foo.com/file';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//foo.com/foo/main.js.map');
        });

        it('normalizes current directory', () => {
          const base = '//foo.com/file';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//foo.com/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = '//foo.com/file';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//foo.com/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = '//foo.com/file';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//foo.com/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        it('resolves relative to current directory', () => {
          const base = '//foo.com/file';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//foo.com/bar/main.js.map');
        });

        it('resolves relative to parent directory', () => {
          const base = '//foo.com/file';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//foo.com/bar/main.js.map');
        });

        it('resolves relative to parent multiple directory', () => {
          const base = '//foo.com/file';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//foo.com/bar/main.js.map');
        });

        it('normalizes input', () => {
          const base = '//foo.com/file';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//foo.com/foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        it('resolves relative to current directory', () => {
          const base = '//foo.com/file';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//foo.com/bar/main.js.map');
        });

        it('resolves relative to parent multiple directory, later', () => {
          const base = '//foo.com/file';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//foo.com/bar/main.js.map');
        });

        it('normalizes input', () => {
          const base = '//foo.com/file';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//foo.com/foo/main.js.map');
        });

        it('resolves node_module scope as path', () => {
          const base = '//foo.com/file';
          const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
          const resolved = resolve(input, base);
          assert.strictEqual(
            resolved,
            '//foo.com/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js'
          );
        });

        it('resolves package scope as path', () => {
          const base = '//foo.com/file';
          const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//foo.com/@babel/runtime/helpers/esm/arrayLikeToArray.js');
        });
      });

      describe('empty input', () => {
        it('normalizes base', () => {
          const base = '//foo.com/file';
          const input = '';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//foo.com/file');
        });
      });
    });

    describe(`base = "//foo.com/dir/"`, () => {
      describe('with absolute input', () => {
        it('returns input', () => {
          const base = '//foo.com/dir/';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes input', () => {
          const base = '//foo.com/dir/';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
        });

        it('normalizes pathless input', () => {
          const base = '//foo.com/dir/';
          const input = 'https://absolute.com';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/');
        });

        it('normalizes current directory', () => {
          const base = '//foo.com/dir/';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = '//foo.com/dir/';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = '//foo.com/dir/';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes file protocol', () => {
          const base = '//foo.com/dir/';
          const input = 'file:///root/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///root/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        it('resolves relative to the base protocol', () => {
          const base = '//foo.com/dir/';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });

        it('normalizes input', () => {
          const base = '//foo.com/dir/';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/foo/main.js.map');
        });

        it('normalizes pathless input', () => {
          const base = '//foo.com/dir/';
          const input = '//protocol-relative.com';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/');
        });

        it('normalizes current directory', () => {
          const base = '//foo.com/dir/';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = '//foo.com/dir/';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = '//foo.com/dir/';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        it('remains absolute path', () => {
          const base = '//foo.com/dir/';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//foo.com/assets/main.js.map');
        });

        it('trims to root', () => {
          const base = '//foo.com/dir/';
          const input = '/';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//foo.com/');
        });

        it('normalizes input', () => {
          const base = '//foo.com/dir/';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//foo.com/foo/main.js.map');
        });

        it('normalizes current directory', () => {
          const base = '//foo.com/dir/';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//foo.com/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = '//foo.com/dir/';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//foo.com/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = '//foo.com/dir/';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//foo.com/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        it('resolves relative to current directory', () => {
          const base = '//foo.com/dir/';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//foo.com/dir/bar/main.js.map');
        });

        it('resolves relative to parent directory', () => {
          const base = '//foo.com/dir/';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//foo.com/bar/main.js.map');
        });

        it('resolves relative to parent multiple directory', () => {
          const base = '//foo.com/dir/';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//foo.com/bar/main.js.map');
        });

        it('normalizes input', () => {
          const base = '//foo.com/dir/';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//foo.com/dir/foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        it('resolves relative to current directory', () => {
          const base = '//foo.com/dir/';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//foo.com/dir/bar/main.js.map');
        });

        it('resolves relative to parent multiple directory, later', () => {
          const base = '//foo.com/dir/';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//foo.com/bar/main.js.map');
        });

        it('normalizes input', () => {
          const base = '//foo.com/dir/';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//foo.com/dir/foo/main.js.map');
        });

        it('resolves node_module scope as path', () => {
          const base = '//foo.com/dir/';
          const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
          const resolved = resolve(input, base);
          assert.strictEqual(
            resolved,
            '//foo.com/dir/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js'
          );
        });

        it('resolves package scope as path', () => {
          const base = '//foo.com/dir/';
          const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
          const resolved = resolve(input, base);
          assert.strictEqual(
            resolved,
            '//foo.com/dir/@babel/runtime/helpers/esm/arrayLikeToArray.js'
          );
        });
      });

      describe('empty input', () => {
        it('normalizes base', () => {
          const base = '//foo.com/dir/';
          const input = '';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//foo.com/dir/');
        });
      });
    });

    describe(`base = "//foo.com/dir/file"`, () => {
      describe('with absolute input', () => {
        it('returns input', () => {
          const base = '//foo.com/dir/file';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes input', () => {
          const base = '//foo.com/dir/file';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
        });

        it('normalizes pathless input', () => {
          const base = '//foo.com/dir/file';
          const input = 'https://absolute.com';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/');
        });

        it('normalizes current directory', () => {
          const base = '//foo.com/dir/file';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = '//foo.com/dir/file';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = '//foo.com/dir/file';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes file protocol', () => {
          const base = '//foo.com/dir/file';
          const input = 'file:///root/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///root/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        it('resolves relative to the base protocol', () => {
          const base = '//foo.com/dir/file';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });

        it('normalizes input', () => {
          const base = '//foo.com/dir/file';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/foo/main.js.map');
        });

        it('normalizes pathless input', () => {
          const base = '//foo.com/dir/file';
          const input = '//protocol-relative.com';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/');
        });

        it('normalizes current directory', () => {
          const base = '//foo.com/dir/file';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = '//foo.com/dir/file';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = '//foo.com/dir/file';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        it('remains absolute path', () => {
          const base = '//foo.com/dir/file';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//foo.com/assets/main.js.map');
        });

        it('trims to root', () => {
          const base = '//foo.com/dir/file';
          const input = '/';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//foo.com/');
        });

        it('normalizes input', () => {
          const base = '//foo.com/dir/file';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//foo.com/foo/main.js.map');
        });

        it('normalizes current directory', () => {
          const base = '//foo.com/dir/file';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//foo.com/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = '//foo.com/dir/file';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//foo.com/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = '//foo.com/dir/file';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//foo.com/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        it('resolves relative to current directory', () => {
          const base = '//foo.com/dir/file';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//foo.com/dir/bar/main.js.map');
        });

        it('resolves relative to parent directory', () => {
          const base = '//foo.com/dir/file';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//foo.com/bar/main.js.map');
        });

        it('resolves relative to parent multiple directory', () => {
          const base = '//foo.com/dir/file';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//foo.com/bar/main.js.map');
        });

        it('normalizes input', () => {
          const base = '//foo.com/dir/file';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//foo.com/dir/foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        it('resolves relative to current directory', () => {
          const base = '//foo.com/dir/file';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//foo.com/dir/bar/main.js.map');
        });

        it('resolves relative to parent multiple directory, later', () => {
          const base = '//foo.com/dir/file';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//foo.com/bar/main.js.map');
        });

        it('normalizes input', () => {
          const base = '//foo.com/dir/file';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//foo.com/dir/foo/main.js.map');
        });

        it('resolves node_module scope as path', () => {
          const base = '//foo.com/dir/file';
          const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
          const resolved = resolve(input, base);
          assert.strictEqual(
            resolved,
            '//foo.com/dir/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js'
          );
        });

        it('resolves package scope as path', () => {
          const base = '//foo.com/dir/file';
          const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
          const resolved = resolve(input, base);
          assert.strictEqual(
            resolved,
            '//foo.com/dir/@babel/runtime/helpers/esm/arrayLikeToArray.js'
          );
        });
      });

      describe('empty input', () => {
        it('normalizes base', () => {
          const base = '//foo.com/dir/file';
          const input = '';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//foo.com/dir/file');
        });
      });
    });

    describe(`base = "//foo.com/.."`, () => {
      describe('with absolute input', () => {
        it('returns input', () => {
          const base = '//foo.com/..';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes input', () => {
          const base = '//foo.com/..';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
        });

        it('normalizes pathless input', () => {
          const base = '//foo.com/..';
          const input = 'https://absolute.com';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/');
        });

        it('normalizes current directory', () => {
          const base = '//foo.com/..';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = '//foo.com/..';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = '//foo.com/..';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes file protocol', () => {
          const base = '//foo.com/..';
          const input = 'file:///root/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///root/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        it('resolves relative to the base protocol', () => {
          const base = '//foo.com/..';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });

        it('normalizes input', () => {
          const base = '//foo.com/..';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/foo/main.js.map');
        });

        it('normalizes pathless input', () => {
          const base = '//foo.com/..';
          const input = '//protocol-relative.com';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/');
        });

        it('normalizes current directory', () => {
          const base = '//foo.com/..';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = '//foo.com/..';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = '//foo.com/..';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        it('remains absolute path', () => {
          const base = '//foo.com/..';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//foo.com/assets/main.js.map');
        });

        it('trims to root', () => {
          const base = '//foo.com/..';
          const input = '/';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//foo.com/');
        });

        it('normalizes input', () => {
          const base = '//foo.com/..';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//foo.com/foo/main.js.map');
        });

        it('normalizes current directory', () => {
          const base = '//foo.com/..';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//foo.com/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = '//foo.com/..';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//foo.com/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = '//foo.com/..';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//foo.com/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        it('resolves relative to current directory', () => {
          const base = '//foo.com/..';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//foo.com/bar/main.js.map');
        });

        it('resolves relative to parent directory', () => {
          const base = '//foo.com/..';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//foo.com/bar/main.js.map');
        });

        it('resolves relative to parent multiple directory', () => {
          const base = '//foo.com/..';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//foo.com/bar/main.js.map');
        });

        it('normalizes input', () => {
          const base = '//foo.com/..';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//foo.com/foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        it('resolves relative to current directory', () => {
          const base = '//foo.com/..';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//foo.com/bar/main.js.map');
        });

        it('resolves relative to parent multiple directory, later', () => {
          const base = '//foo.com/..';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//foo.com/bar/main.js.map');
        });

        it('normalizes input', () => {
          const base = '//foo.com/..';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//foo.com/foo/main.js.map');
        });

        it('resolves node_module scope as path', () => {
          const base = '//foo.com/..';
          const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
          const resolved = resolve(input, base);
          assert.strictEqual(
            resolved,
            '//foo.com/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js'
          );
        });

        it('resolves package scope as path', () => {
          const base = '//foo.com/..';
          const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//foo.com/@babel/runtime/helpers/esm/arrayLikeToArray.js');
        });
      });

      describe('empty input', () => {
        it('normalizes base', () => {
          const base = '//foo.com/..';
          const input = '';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//foo.com/');
        });
      });
    });

    describe(`base = "//foo.com/../"`, () => {
      describe('with absolute input', () => {
        it('returns input', () => {
          const base = '//foo.com/../';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes input', () => {
          const base = '//foo.com/../';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
        });

        it('normalizes pathless input', () => {
          const base = '//foo.com/../';
          const input = 'https://absolute.com';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/');
        });

        it('normalizes current directory', () => {
          const base = '//foo.com/../';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = '//foo.com/../';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = '//foo.com/../';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes file protocol', () => {
          const base = '//foo.com/../';
          const input = 'file:///root/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///root/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        it('resolves relative to the base protocol', () => {
          const base = '//foo.com/../';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });

        it('normalizes input', () => {
          const base = '//foo.com/../';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/foo/main.js.map');
        });

        it('normalizes pathless input', () => {
          const base = '//foo.com/../';
          const input = '//protocol-relative.com';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/');
        });

        it('normalizes current directory', () => {
          const base = '//foo.com/../';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = '//foo.com/../';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = '//foo.com/../';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        it('remains absolute path', () => {
          const base = '//foo.com/../';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//foo.com/assets/main.js.map');
        });

        it('trims to root', () => {
          const base = '//foo.com/../';
          const input = '/';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//foo.com/');
        });

        it('normalizes input', () => {
          const base = '//foo.com/../';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//foo.com/foo/main.js.map');
        });

        it('normalizes current directory', () => {
          const base = '//foo.com/../';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//foo.com/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = '//foo.com/../';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//foo.com/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = '//foo.com/../';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//foo.com/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        it('resolves relative to current directory', () => {
          const base = '//foo.com/../';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//foo.com/bar/main.js.map');
        });

        it('resolves relative to parent directory', () => {
          const base = '//foo.com/../';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//foo.com/bar/main.js.map');
        });

        it('resolves relative to parent multiple directory', () => {
          const base = '//foo.com/../';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//foo.com/bar/main.js.map');
        });

        it('normalizes input', () => {
          const base = '//foo.com/../';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//foo.com/foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        it('resolves relative to current directory', () => {
          const base = '//foo.com/../';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//foo.com/bar/main.js.map');
        });

        it('resolves relative to parent multiple directory, later', () => {
          const base = '//foo.com/../';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//foo.com/bar/main.js.map');
        });

        it('normalizes input', () => {
          const base = '//foo.com/../';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//foo.com/foo/main.js.map');
        });

        it('resolves node_module scope as path', () => {
          const base = '//foo.com/../';
          const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
          const resolved = resolve(input, base);
          assert.strictEqual(
            resolved,
            '//foo.com/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js'
          );
        });

        it('resolves package scope as path', () => {
          const base = '//foo.com/../';
          const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//foo.com/@babel/runtime/helpers/esm/arrayLikeToArray.js');
        });
      });

      describe('empty input', () => {
        it('normalizes base', () => {
          const base = '//foo.com/../';
          const input = '';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//foo.com/');
        });
      });
    });

    describe(`base = "//foo.com/dir/.."`, () => {
      describe('with absolute input', () => {
        it('returns input', () => {
          const base = '//foo.com/dir/..';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes input', () => {
          const base = '//foo.com/dir/..';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
        });

        it('normalizes pathless input', () => {
          const base = '//foo.com/dir/..';
          const input = 'https://absolute.com';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/');
        });

        it('normalizes current directory', () => {
          const base = '//foo.com/dir/..';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = '//foo.com/dir/..';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = '//foo.com/dir/..';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes file protocol', () => {
          const base = '//foo.com/dir/..';
          const input = 'file:///root/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///root/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        it('resolves relative to the base protocol', () => {
          const base = '//foo.com/dir/..';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });

        it('normalizes input', () => {
          const base = '//foo.com/dir/..';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/foo/main.js.map');
        });

        it('normalizes pathless input', () => {
          const base = '//foo.com/dir/..';
          const input = '//protocol-relative.com';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/');
        });

        it('normalizes current directory', () => {
          const base = '//foo.com/dir/..';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = '//foo.com/dir/..';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = '//foo.com/dir/..';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        it('remains absolute path', () => {
          const base = '//foo.com/dir/..';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//foo.com/assets/main.js.map');
        });

        it('trims to root', () => {
          const base = '//foo.com/dir/..';
          const input = '/';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//foo.com/');
        });

        it('normalizes input', () => {
          const base = '//foo.com/dir/..';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//foo.com/foo/main.js.map');
        });

        it('normalizes current directory', () => {
          const base = '//foo.com/dir/..';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//foo.com/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = '//foo.com/dir/..';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//foo.com/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = '//foo.com/dir/..';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//foo.com/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        it('resolves relative to current directory', () => {
          const base = '//foo.com/dir/..';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//foo.com/bar/main.js.map');
        });

        it('resolves relative to parent directory', () => {
          const base = '//foo.com/dir/..';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//foo.com/bar/main.js.map');
        });

        it('resolves relative to parent multiple directory', () => {
          const base = '//foo.com/dir/..';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//foo.com/bar/main.js.map');
        });

        it('normalizes input', () => {
          const base = '//foo.com/dir/..';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//foo.com/foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        it('resolves relative to current directory', () => {
          const base = '//foo.com/dir/..';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//foo.com/bar/main.js.map');
        });

        it('resolves relative to parent multiple directory, later', () => {
          const base = '//foo.com/dir/..';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//foo.com/bar/main.js.map');
        });

        it('normalizes input', () => {
          const base = '//foo.com/dir/..';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//foo.com/foo/main.js.map');
        });

        it('resolves node_module scope as path', () => {
          const base = '//foo.com/dir/..';
          const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
          const resolved = resolve(input, base);
          assert.strictEqual(
            resolved,
            '//foo.com/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js'
          );
        });

        it('resolves package scope as path', () => {
          const base = '//foo.com/dir/..';
          const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//foo.com/@babel/runtime/helpers/esm/arrayLikeToArray.js');
        });
      });

      describe('empty input', () => {
        it('normalizes base', () => {
          const base = '//foo.com/dir/..';
          const input = '';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//foo.com/');
        });
      });
    });
  });

  describe('with path absolute base', () => {
    describe(`base = "/"`, () => {
      describe('with absolute input', () => {
        it('returns input', () => {
          const base = '/';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes input', () => {
          const base = '/';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
        });

        it('normalizes pathless input', () => {
          const base = '/';
          const input = 'https://absolute.com';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/');
        });

        it('normalizes current directory', () => {
          const base = '/';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = '/';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = '/';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes file protocol', () => {
          const base = '/';
          const input = 'file:///root/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///root/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        it('resolves relative to the base protocol', () => {
          const base = '/';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });

        it('normalizes input', () => {
          const base = '/';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/foo/main.js.map');
        });

        it('normalizes pathless input', () => {
          const base = '/';
          const input = '//protocol-relative.com';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/');
        });

        it('normalizes current directory', () => {
          const base = '/';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = '/';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = '/';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        it('remains absolute path', () => {
          const base = '/';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/assets/main.js.map');
        });

        it('trims to root', () => {
          const base = '/';
          const input = '/';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/');
        });

        it('normalizes input', () => {
          const base = '/';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/foo/main.js.map');
        });

        it('normalizes current directory', () => {
          const base = '/';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = '/';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = '/';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        it('resolves relative to current directory', () => {
          const base = '/';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/bar/main.js.map');
        });

        it('resolves relative to parent directory', () => {
          const base = '/';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/bar/main.js.map');
        });

        it('resolves relative to parent multiple directory', () => {
          const base = '/';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/bar/main.js.map');
        });

        it('normalizes input', () => {
          const base = '/';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        it('resolves relative to current directory', () => {
          const base = '/';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/bar/main.js.map');
        });

        it('resolves relative to parent multiple directory, later', () => {
          const base = '/';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/bar/main.js.map');
        });

        it('normalizes input', () => {
          const base = '/';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/foo/main.js.map');
        });

        it('resolves node_module scope as path', () => {
          const base = '/';
          const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
          const resolved = resolve(input, base);
          assert.strictEqual(
            resolved,
            '/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js'
          );
        });

        it('resolves package scope as path', () => {
          const base = '/';
          const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/@babel/runtime/helpers/esm/arrayLikeToArray.js');
        });
      });

      describe('empty input', () => {
        it('normalizes base', () => {
          const base = '/';
          const input = '';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/');
        });
      });
    });

    describe(`base = "/root"`, () => {
      describe('with absolute input', () => {
        it('returns input', () => {
          const base = '/root';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes input', () => {
          const base = '/root';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
        });

        it('normalizes pathless input', () => {
          const base = '/root';
          const input = 'https://absolute.com';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/');
        });

        it('normalizes current directory', () => {
          const base = '/root';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = '/root';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = '/root';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes file protocol', () => {
          const base = '/root';
          const input = 'file:///root/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///root/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        it('resolves relative to the base protocol', () => {
          const base = '/root';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });

        it('normalizes input', () => {
          const base = '/root';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/foo/main.js.map');
        });

        it('normalizes pathless input', () => {
          const base = '/root';
          const input = '//protocol-relative.com';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/');
        });

        it('normalizes current directory', () => {
          const base = '/root';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = '/root';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = '/root';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        it('remains absolute path', () => {
          const base = '/root';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/assets/main.js.map');
        });

        it('trims to root', () => {
          const base = '/root';
          const input = '/';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/');
        });

        it('normalizes input', () => {
          const base = '/root';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/foo/main.js.map');
        });

        it('normalizes current directory', () => {
          const base = '/root';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = '/root';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = '/root';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        it('resolves relative to current directory', () => {
          const base = '/root';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/bar/main.js.map');
        });

        it('resolves relative to parent directory', () => {
          const base = '/root';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/bar/main.js.map');
        });

        it('resolves relative to parent multiple directory', () => {
          const base = '/root';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/bar/main.js.map');
        });

        it('normalizes input', () => {
          const base = '/root';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        it('resolves relative to current directory', () => {
          const base = '/root';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/bar/main.js.map');
        });

        it('resolves relative to parent multiple directory, later', () => {
          const base = '/root';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/bar/main.js.map');
        });

        it('normalizes input', () => {
          const base = '/root';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/foo/main.js.map');
        });

        it('resolves node_module scope as path', () => {
          const base = '/root';
          const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
          const resolved = resolve(input, base);
          assert.strictEqual(
            resolved,
            '/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js'
          );
        });

        it('resolves package scope as path', () => {
          const base = '/root';
          const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/@babel/runtime/helpers/esm/arrayLikeToArray.js');
        });
      });

      describe('empty input', () => {
        it('normalizes base', () => {
          const base = '/root';
          const input = '';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/root');
        });
      });
    });

    describe(`base = "/root/"`, () => {
      describe('with absolute input', () => {
        it('returns input', () => {
          const base = '/root/';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes input', () => {
          const base = '/root/';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
        });

        it('normalizes pathless input', () => {
          const base = '/root/';
          const input = 'https://absolute.com';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/');
        });

        it('normalizes current directory', () => {
          const base = '/root/';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = '/root/';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = '/root/';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes file protocol', () => {
          const base = '/root/';
          const input = 'file:///root/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///root/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        it('resolves relative to the base protocol', () => {
          const base = '/root/';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });

        it('normalizes input', () => {
          const base = '/root/';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/foo/main.js.map');
        });

        it('normalizes pathless input', () => {
          const base = '/root/';
          const input = '//protocol-relative.com';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/');
        });

        it('normalizes current directory', () => {
          const base = '/root/';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = '/root/';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = '/root/';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        it('remains absolute path', () => {
          const base = '/root/';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/assets/main.js.map');
        });

        it('trims to root', () => {
          const base = '/root/';
          const input = '/';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/');
        });

        it('normalizes input', () => {
          const base = '/root/';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/foo/main.js.map');
        });

        it('normalizes current directory', () => {
          const base = '/root/';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = '/root/';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = '/root/';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        it('resolves relative to current directory', () => {
          const base = '/root/';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/root/bar/main.js.map');
        });

        it('resolves relative to parent directory', () => {
          const base = '/root/';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/bar/main.js.map');
        });

        it('resolves relative to parent multiple directory', () => {
          const base = '/root/';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/bar/main.js.map');
        });

        it('normalizes input', () => {
          const base = '/root/';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/root/foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        it('resolves relative to current directory', () => {
          const base = '/root/';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/root/bar/main.js.map');
        });

        it('resolves relative to parent multiple directory, later', () => {
          const base = '/root/';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/bar/main.js.map');
        });

        it('normalizes input', () => {
          const base = '/root/';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/root/foo/main.js.map');
        });

        it('resolves node_module scope as path', () => {
          const base = '/root/';
          const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
          const resolved = resolve(input, base);
          assert.strictEqual(
            resolved,
            '/root/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js'
          );
        });

        it('resolves package scope as path', () => {
          const base = '/root/';
          const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/root/@babel/runtime/helpers/esm/arrayLikeToArray.js');
        });
      });

      describe('empty input', () => {
        it('normalizes base', () => {
          const base = '/root/';
          const input = '';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/root/');
        });
      });
    });

    describe(`base = "/root/file"`, () => {
      describe('with absolute input', () => {
        it('returns input', () => {
          const base = '/root/file';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes input', () => {
          const base = '/root/file';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
        });

        it('normalizes pathless input', () => {
          const base = '/root/file';
          const input = 'https://absolute.com';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/');
        });

        it('normalizes current directory', () => {
          const base = '/root/file';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = '/root/file';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = '/root/file';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes file protocol', () => {
          const base = '/root/file';
          const input = 'file:///root/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///root/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        it('resolves relative to the base protocol', () => {
          const base = '/root/file';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });

        it('normalizes input', () => {
          const base = '/root/file';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/foo/main.js.map');
        });

        it('normalizes pathless input', () => {
          const base = '/root/file';
          const input = '//protocol-relative.com';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/');
        });

        it('normalizes current directory', () => {
          const base = '/root/file';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = '/root/file';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = '/root/file';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        it('remains absolute path', () => {
          const base = '/root/file';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/assets/main.js.map');
        });

        it('trims to root', () => {
          const base = '/root/file';
          const input = '/';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/');
        });

        it('normalizes input', () => {
          const base = '/root/file';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/foo/main.js.map');
        });

        it('normalizes current directory', () => {
          const base = '/root/file';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = '/root/file';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = '/root/file';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        it('resolves relative to current directory', () => {
          const base = '/root/file';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/root/bar/main.js.map');
        });

        it('resolves relative to parent directory', () => {
          const base = '/root/file';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/bar/main.js.map');
        });

        it('resolves relative to parent multiple directory', () => {
          const base = '/root/file';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/bar/main.js.map');
        });

        it('normalizes input', () => {
          const base = '/root/file';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/root/foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        it('resolves relative to current directory', () => {
          const base = '/root/file';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/root/bar/main.js.map');
        });

        it('resolves relative to parent multiple directory, later', () => {
          const base = '/root/file';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/bar/main.js.map');
        });

        it('normalizes input', () => {
          const base = '/root/file';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/root/foo/main.js.map');
        });

        it('resolves node_module scope as path', () => {
          const base = '/root/file';
          const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
          const resolved = resolve(input, base);
          assert.strictEqual(
            resolved,
            '/root/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js'
          );
        });

        it('resolves package scope as path', () => {
          const base = '/root/file';
          const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/root/@babel/runtime/helpers/esm/arrayLikeToArray.js');
        });
      });

      describe('empty input', () => {
        it('normalizes base', () => {
          const base = '/root/file';
          const input = '';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/root/file');
        });
      });
    });

    describe(`base = "/root/dir/"`, () => {
      describe('with absolute input', () => {
        it('returns input', () => {
          const base = '/root/dir/';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes input', () => {
          const base = '/root/dir/';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
        });

        it('normalizes pathless input', () => {
          const base = '/root/dir/';
          const input = 'https://absolute.com';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/');
        });

        it('normalizes current directory', () => {
          const base = '/root/dir/';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = '/root/dir/';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = '/root/dir/';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes file protocol', () => {
          const base = '/root/dir/';
          const input = 'file:///root/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///root/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        it('resolves relative to the base protocol', () => {
          const base = '/root/dir/';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });

        it('normalizes input', () => {
          const base = '/root/dir/';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/foo/main.js.map');
        });

        it('normalizes pathless input', () => {
          const base = '/root/dir/';
          const input = '//protocol-relative.com';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/');
        });

        it('normalizes current directory', () => {
          const base = '/root/dir/';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = '/root/dir/';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = '/root/dir/';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        it('remains absolute path', () => {
          const base = '/root/dir/';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/assets/main.js.map');
        });

        it('trims to root', () => {
          const base = '/root/dir/';
          const input = '/';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/');
        });

        it('normalizes input', () => {
          const base = '/root/dir/';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/foo/main.js.map');
        });

        it('normalizes current directory', () => {
          const base = '/root/dir/';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = '/root/dir/';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = '/root/dir/';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        it('resolves relative to current directory', () => {
          const base = '/root/dir/';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/root/dir/bar/main.js.map');
        });

        it('resolves relative to parent directory', () => {
          const base = '/root/dir/';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/root/bar/main.js.map');
        });

        it('resolves relative to parent multiple directory', () => {
          const base = '/root/dir/';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/bar/main.js.map');
        });

        it('normalizes input', () => {
          const base = '/root/dir/';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/root/dir/foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        it('resolves relative to current directory', () => {
          const base = '/root/dir/';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/root/dir/bar/main.js.map');
        });

        it('resolves relative to parent multiple directory, later', () => {
          const base = '/root/dir/';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/bar/main.js.map');
        });

        it('normalizes input', () => {
          const base = '/root/dir/';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/root/dir/foo/main.js.map');
        });

        it('resolves node_module scope as path', () => {
          const base = '/root/dir/';
          const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
          const resolved = resolve(input, base);
          assert.strictEqual(
            resolved,
            '/root/dir/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js'
          );
        });

        it('resolves package scope as path', () => {
          const base = '/root/dir/';
          const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/root/dir/@babel/runtime/helpers/esm/arrayLikeToArray.js');
        });
      });

      describe('empty input', () => {
        it('normalizes base', () => {
          const base = '/root/dir/';
          const input = '';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/root/dir/');
        });
      });
    });

    describe(`base = "/.."`, () => {
      describe('with absolute input', () => {
        it('returns input', () => {
          const base = '/..';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes input', () => {
          const base = '/..';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
        });

        it('normalizes pathless input', () => {
          const base = '/..';
          const input = 'https://absolute.com';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/');
        });

        it('normalizes current directory', () => {
          const base = '/..';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = '/..';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = '/..';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes file protocol', () => {
          const base = '/..';
          const input = 'file:///root/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///root/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        it('resolves relative to the base protocol', () => {
          const base = '/..';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });

        it('normalizes input', () => {
          const base = '/..';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/foo/main.js.map');
        });

        it('normalizes pathless input', () => {
          const base = '/..';
          const input = '//protocol-relative.com';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/');
        });

        it('normalizes current directory', () => {
          const base = '/..';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = '/..';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = '/..';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        it('remains absolute path', () => {
          const base = '/..';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/assets/main.js.map');
        });

        it('trims to root', () => {
          const base = '/..';
          const input = '/';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/');
        });

        it('normalizes input', () => {
          const base = '/..';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/foo/main.js.map');
        });

        it('normalizes current directory', () => {
          const base = '/..';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = '/..';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = '/..';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        it('resolves relative to current directory', () => {
          const base = '/..';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/bar/main.js.map');
        });

        it('resolves relative to parent directory', () => {
          const base = '/..';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/bar/main.js.map');
        });

        it('resolves relative to parent multiple directory', () => {
          const base = '/..';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/bar/main.js.map');
        });

        it('normalizes input', () => {
          const base = '/..';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        it('resolves relative to current directory', () => {
          const base = '/..';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/bar/main.js.map');
        });

        it('resolves relative to parent multiple directory, later', () => {
          const base = '/..';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/bar/main.js.map');
        });

        it('normalizes input', () => {
          const base = '/..';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/foo/main.js.map');
        });

        it('resolves node_module scope as path', () => {
          const base = '/..';
          const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
          const resolved = resolve(input, base);
          assert.strictEqual(
            resolved,
            '/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js'
          );
        });

        it('resolves package scope as path', () => {
          const base = '/..';
          const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/@babel/runtime/helpers/esm/arrayLikeToArray.js');
        });
      });

      describe('empty input', () => {
        it('normalizes base', () => {
          const base = '/..';
          const input = '';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/');
        });
      });
    });

    describe(`base = "/../"`, () => {
      describe('with absolute input', () => {
        it('returns input', () => {
          const base = '/../';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes input', () => {
          const base = '/../';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
        });

        it('normalizes pathless input', () => {
          const base = '/../';
          const input = 'https://absolute.com';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/');
        });

        it('normalizes current directory', () => {
          const base = '/../';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = '/../';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = '/../';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes file protocol', () => {
          const base = '/../';
          const input = 'file:///root/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///root/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        it('resolves relative to the base protocol', () => {
          const base = '/../';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });

        it('normalizes input', () => {
          const base = '/../';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/foo/main.js.map');
        });

        it('normalizes pathless input', () => {
          const base = '/../';
          const input = '//protocol-relative.com';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/');
        });

        it('normalizes current directory', () => {
          const base = '/../';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = '/../';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = '/../';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        it('remains absolute path', () => {
          const base = '/../';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/assets/main.js.map');
        });

        it('trims to root', () => {
          const base = '/../';
          const input = '/';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/');
        });

        it('normalizes input', () => {
          const base = '/../';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/foo/main.js.map');
        });

        it('normalizes current directory', () => {
          const base = '/../';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = '/../';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = '/../';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        it('resolves relative to current directory', () => {
          const base = '/../';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/bar/main.js.map');
        });

        it('resolves relative to parent directory', () => {
          const base = '/../';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/bar/main.js.map');
        });

        it('resolves relative to parent multiple directory', () => {
          const base = '/../';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/bar/main.js.map');
        });

        it('normalizes input', () => {
          const base = '/../';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        it('resolves relative to current directory', () => {
          const base = '/../';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/bar/main.js.map');
        });

        it('resolves relative to parent multiple directory, later', () => {
          const base = '/../';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/bar/main.js.map');
        });

        it('normalizes input', () => {
          const base = '/../';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/foo/main.js.map');
        });

        it('resolves node_module scope as path', () => {
          const base = '/../';
          const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
          const resolved = resolve(input, base);
          assert.strictEqual(
            resolved,
            '/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js'
          );
        });

        it('resolves package scope as path', () => {
          const base = '/../';
          const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/@babel/runtime/helpers/esm/arrayLikeToArray.js');
        });
      });

      describe('empty input', () => {
        it('normalizes base', () => {
          const base = '/../';
          const input = '';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/');
        });
      });
    });

    describe(`base = "/root/.."`, () => {
      describe('with absolute input', () => {
        it('returns input', () => {
          const base = '/root/..';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes input', () => {
          const base = '/root/..';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
        });

        it('normalizes pathless input', () => {
          const base = '/root/..';
          const input = 'https://absolute.com';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/');
        });

        it('normalizes current directory', () => {
          const base = '/root/..';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = '/root/..';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = '/root/..';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes file protocol', () => {
          const base = '/root/..';
          const input = 'file:///root/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///root/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        it('resolves relative to the base protocol', () => {
          const base = '/root/..';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });

        it('normalizes input', () => {
          const base = '/root/..';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/foo/main.js.map');
        });

        it('normalizes pathless input', () => {
          const base = '/root/..';
          const input = '//protocol-relative.com';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/');
        });

        it('normalizes current directory', () => {
          const base = '/root/..';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = '/root/..';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = '/root/..';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        it('remains absolute path', () => {
          const base = '/root/..';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/assets/main.js.map');
        });

        it('trims to root', () => {
          const base = '/root/..';
          const input = '/';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/');
        });

        it('normalizes input', () => {
          const base = '/root/..';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/foo/main.js.map');
        });

        it('normalizes current directory', () => {
          const base = '/root/..';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = '/root/..';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = '/root/..';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        it('resolves relative to current directory', () => {
          const base = '/root/..';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/bar/main.js.map');
        });

        it('resolves relative to parent directory', () => {
          const base = '/root/..';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/bar/main.js.map');
        });

        it('resolves relative to parent multiple directory', () => {
          const base = '/root/..';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/bar/main.js.map');
        });

        it('normalizes input', () => {
          const base = '/root/..';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        it('resolves relative to current directory', () => {
          const base = '/root/..';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/bar/main.js.map');
        });

        it('resolves relative to parent multiple directory, later', () => {
          const base = '/root/..';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/bar/main.js.map');
        });

        it('normalizes input', () => {
          const base = '/root/..';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/foo/main.js.map');
        });

        it('resolves node_module scope as path', () => {
          const base = '/root/..';
          const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
          const resolved = resolve(input, base);
          assert.strictEqual(
            resolved,
            '/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js'
          );
        });

        it('resolves package scope as path', () => {
          const base = '/root/..';
          const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/@babel/runtime/helpers/esm/arrayLikeToArray.js');
        });
      });

      describe('empty input', () => {
        it('normalizes base', () => {
          const base = '/root/..';
          const input = '';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/');
        });
      });
    });

    describe(`base = "/root/../"`, () => {
      describe('with absolute input', () => {
        it('returns input', () => {
          const base = '/root/../';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes input', () => {
          const base = '/root/../';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
        });

        it('normalizes pathless input', () => {
          const base = '/root/../';
          const input = 'https://absolute.com';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/');
        });

        it('normalizes current directory', () => {
          const base = '/root/../';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = '/root/../';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = '/root/../';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes file protocol', () => {
          const base = '/root/../';
          const input = 'file:///root/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///root/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        it('resolves relative to the base protocol', () => {
          const base = '/root/../';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });

        it('normalizes input', () => {
          const base = '/root/../';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/foo/main.js.map');
        });

        it('normalizes pathless input', () => {
          const base = '/root/../';
          const input = '//protocol-relative.com';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/');
        });

        it('normalizes current directory', () => {
          const base = '/root/../';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = '/root/../';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = '/root/../';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        it('remains absolute path', () => {
          const base = '/root/../';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/assets/main.js.map');
        });

        it('trims to root', () => {
          const base = '/root/../';
          const input = '/';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/');
        });

        it('normalizes input', () => {
          const base = '/root/../';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/foo/main.js.map');
        });

        it('normalizes current directory', () => {
          const base = '/root/../';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = '/root/../';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = '/root/../';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        it('resolves relative to current directory', () => {
          const base = '/root/../';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/bar/main.js.map');
        });

        it('resolves relative to parent directory', () => {
          const base = '/root/../';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/bar/main.js.map');
        });

        it('resolves relative to parent multiple directory', () => {
          const base = '/root/../';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/bar/main.js.map');
        });

        it('normalizes input', () => {
          const base = '/root/../';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        it('resolves relative to current directory', () => {
          const base = '/root/../';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/bar/main.js.map');
        });

        it('resolves relative to parent multiple directory, later', () => {
          const base = '/root/../';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/bar/main.js.map');
        });

        it('normalizes input', () => {
          const base = '/root/../';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/foo/main.js.map');
        });

        it('resolves node_module scope as path', () => {
          const base = '/root/../';
          const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
          const resolved = resolve(input, base);
          assert.strictEqual(
            resolved,
            '/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js'
          );
        });

        it('resolves package scope as path', () => {
          const base = '/root/../';
          const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/@babel/runtime/helpers/esm/arrayLikeToArray.js');
        });
      });

      describe('empty input', () => {
        it('normalizes base', () => {
          const base = '/root/../';
          const input = '';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/');
        });
      });
    });
  });

  describe('with relative base', () => {
    describe(`base = "file"`, () => {
      describe('with absolute input', () => {
        it('returns input', () => {
          const base = 'file';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes input', () => {
          const base = 'file';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
        });

        it('normalizes pathless input', () => {
          const base = 'file';
          const input = 'https://absolute.com';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/');
        });

        it('normalizes current directory', () => {
          const base = 'file';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = 'file';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = 'file';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes file protocol', () => {
          const base = 'file';
          const input = 'file:///root/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///root/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        it('resolves relative to the base protocol', () => {
          const base = 'file';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });

        it('normalizes input', () => {
          const base = 'file';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/foo/main.js.map');
        });

        it('normalizes pathless input', () => {
          const base = 'file';
          const input = '//protocol-relative.com';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/');
        });

        it('normalizes current directory', () => {
          const base = 'file';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = 'file';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = 'file';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        it('remains absolute path', () => {
          const base = 'file';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/assets/main.js.map');
        });

        it('trims to root', () => {
          const base = 'file';
          const input = '/';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/');
        });

        it('normalizes input', () => {
          const base = 'file';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/foo/main.js.map');
        });

        it('normalizes current directory', () => {
          const base = 'file';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = 'file';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = 'file';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        it('resolves relative to current directory', () => {
          const base = 'file';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'bar/main.js.map');
        });

        it('resolves relative to parent directory', () => {
          const base = 'file';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../bar/main.js.map');
        });

        it('resolves relative to parent multiple directory', () => {
          const base = 'file';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../../../bar/main.js.map');
        });

        it('normalizes input', () => {
          const base = 'file';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        it('resolves relative to current directory', () => {
          const base = 'file';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'bar/main.js.map');
        });

        it('resolves relative to parent multiple directory, later', () => {
          const base = 'file';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../../bar/main.js.map');
        });

        it('normalizes input', () => {
          const base = 'file';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'foo/main.js.map');
        });

        it('resolves node_module scope as path', () => {
          const base = 'file';
          const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
          const resolved = resolve(input, base);
          assert.strictEqual(
            resolved,
            'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js'
          );
        });

        it('resolves package scope as path', () => {
          const base = 'file';
          const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '@babel/runtime/helpers/esm/arrayLikeToArray.js');
        });
      });

      describe('empty input', () => {
        it('normalizes base', () => {
          const base = 'file';
          const input = '';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file');
        });
      });
    });

    describe(`base = "dir/"`, () => {
      describe('with absolute input', () => {
        it('returns input', () => {
          const base = 'dir/';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes input', () => {
          const base = 'dir/';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
        });

        it('normalizes pathless input', () => {
          const base = 'dir/';
          const input = 'https://absolute.com';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/');
        });

        it('normalizes current directory', () => {
          const base = 'dir/';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = 'dir/';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = 'dir/';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes file protocol', () => {
          const base = 'dir/';
          const input = 'file:///root/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///root/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        it('resolves relative to the base protocol', () => {
          const base = 'dir/';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });

        it('normalizes input', () => {
          const base = 'dir/';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/foo/main.js.map');
        });

        it('normalizes pathless input', () => {
          const base = 'dir/';
          const input = '//protocol-relative.com';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/');
        });

        it('normalizes current directory', () => {
          const base = 'dir/';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = 'dir/';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = 'dir/';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        it('remains absolute path', () => {
          const base = 'dir/';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/assets/main.js.map');
        });

        it('trims to root', () => {
          const base = 'dir/';
          const input = '/';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/');
        });

        it('normalizes input', () => {
          const base = 'dir/';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/foo/main.js.map');
        });

        it('normalizes current directory', () => {
          const base = 'dir/';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = 'dir/';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = 'dir/';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        it('resolves relative to current directory', () => {
          const base = 'dir/';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'dir/bar/main.js.map');
        });

        it('resolves relative to parent directory', () => {
          const base = 'dir/';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'bar/main.js.map');
        });

        it('resolves relative to parent multiple directory', () => {
          const base = 'dir/';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../../bar/main.js.map');
        });

        it('normalizes input', () => {
          const base = 'dir/';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'dir/foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        it('resolves relative to current directory', () => {
          const base = 'dir/';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'dir/bar/main.js.map');
        });

        it('resolves relative to parent multiple directory, later', () => {
          const base = 'dir/';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../bar/main.js.map');
        });

        it('normalizes input', () => {
          const base = 'dir/';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'dir/foo/main.js.map');
        });

        it('resolves node_module scope as path', () => {
          const base = 'dir/';
          const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
          const resolved = resolve(input, base);
          assert.strictEqual(
            resolved,
            'dir/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js'
          );
        });

        it('resolves package scope as path', () => {
          const base = 'dir/';
          const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'dir/@babel/runtime/helpers/esm/arrayLikeToArray.js');
        });
      });

      describe('empty input', () => {
        it('normalizes base', () => {
          const base = 'dir/';
          const input = '';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'dir/');
        });
      });
    });

    describe(`base = "dir/file"`, () => {
      describe('with absolute input', () => {
        it('returns input', () => {
          const base = 'dir/file';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes input', () => {
          const base = 'dir/file';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
        });

        it('normalizes pathless input', () => {
          const base = 'dir/file';
          const input = 'https://absolute.com';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/');
        });

        it('normalizes current directory', () => {
          const base = 'dir/file';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = 'dir/file';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = 'dir/file';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes file protocol', () => {
          const base = 'dir/file';
          const input = 'file:///root/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///root/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        it('resolves relative to the base protocol', () => {
          const base = 'dir/file';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });

        it('normalizes input', () => {
          const base = 'dir/file';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/foo/main.js.map');
        });

        it('normalizes pathless input', () => {
          const base = 'dir/file';
          const input = '//protocol-relative.com';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/');
        });

        it('normalizes current directory', () => {
          const base = 'dir/file';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = 'dir/file';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = 'dir/file';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        it('remains absolute path', () => {
          const base = 'dir/file';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/assets/main.js.map');
        });

        it('trims to root', () => {
          const base = 'dir/file';
          const input = '/';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/');
        });

        it('normalizes input', () => {
          const base = 'dir/file';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/foo/main.js.map');
        });

        it('normalizes current directory', () => {
          const base = 'dir/file';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = 'dir/file';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = 'dir/file';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        it('resolves relative to current directory', () => {
          const base = 'dir/file';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'dir/bar/main.js.map');
        });

        it('resolves relative to parent directory', () => {
          const base = 'dir/file';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'bar/main.js.map');
        });

        it('resolves relative to parent multiple directory', () => {
          const base = 'dir/file';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../../bar/main.js.map');
        });

        it('normalizes input', () => {
          const base = 'dir/file';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'dir/foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        it('resolves relative to current directory', () => {
          const base = 'dir/file';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'dir/bar/main.js.map');
        });

        it('resolves relative to parent multiple directory, later', () => {
          const base = 'dir/file';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../bar/main.js.map');
        });

        it('normalizes input', () => {
          const base = 'dir/file';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'dir/foo/main.js.map');
        });

        it('resolves node_module scope as path', () => {
          const base = 'dir/file';
          const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
          const resolved = resolve(input, base);
          assert.strictEqual(
            resolved,
            'dir/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js'
          );
        });

        it('resolves package scope as path', () => {
          const base = 'dir/file';
          const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'dir/@babel/runtime/helpers/esm/arrayLikeToArray.js');
        });
      });

      describe('empty input', () => {
        it('normalizes base', () => {
          const base = 'dir/file';
          const input = '';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'dir/file');
        });
      });
    });

    describe(`base = "deep/dir/"`, () => {
      describe('with absolute input', () => {
        it('returns input', () => {
          const base = 'deep/dir/';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes input', () => {
          const base = 'deep/dir/';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
        });

        it('normalizes pathless input', () => {
          const base = 'deep/dir/';
          const input = 'https://absolute.com';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/');
        });

        it('normalizes current directory', () => {
          const base = 'deep/dir/';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = 'deep/dir/';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = 'deep/dir/';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes file protocol', () => {
          const base = 'deep/dir/';
          const input = 'file:///root/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///root/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        it('resolves relative to the base protocol', () => {
          const base = 'deep/dir/';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });

        it('normalizes input', () => {
          const base = 'deep/dir/';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/foo/main.js.map');
        });

        it('normalizes pathless input', () => {
          const base = 'deep/dir/';
          const input = '//protocol-relative.com';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/');
        });

        it('normalizes current directory', () => {
          const base = 'deep/dir/';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = 'deep/dir/';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = 'deep/dir/';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        it('remains absolute path', () => {
          const base = 'deep/dir/';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/assets/main.js.map');
        });

        it('trims to root', () => {
          const base = 'deep/dir/';
          const input = '/';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/');
        });

        it('normalizes input', () => {
          const base = 'deep/dir/';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/foo/main.js.map');
        });

        it('normalizes current directory', () => {
          const base = 'deep/dir/';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = 'deep/dir/';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = 'deep/dir/';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        it('resolves relative to current directory', () => {
          const base = 'deep/dir/';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'deep/dir/bar/main.js.map');
        });

        it('resolves relative to parent directory', () => {
          const base = 'deep/dir/';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'deep/bar/main.js.map');
        });

        it('resolves relative to parent multiple directory', () => {
          const base = 'deep/dir/';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../bar/main.js.map');
        });

        it('normalizes input', () => {
          const base = 'deep/dir/';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'deep/dir/foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        it('resolves relative to current directory', () => {
          const base = 'deep/dir/';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'deep/dir/bar/main.js.map');
        });

        it('resolves relative to parent multiple directory, later', () => {
          const base = 'deep/dir/';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'bar/main.js.map');
        });

        it('normalizes input', () => {
          const base = 'deep/dir/';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'deep/dir/foo/main.js.map');
        });

        it('resolves node_module scope as path', () => {
          const base = 'deep/dir/';
          const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
          const resolved = resolve(input, base);
          assert.strictEqual(
            resolved,
            'deep/dir/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js'
          );
        });

        it('resolves package scope as path', () => {
          const base = 'deep/dir/';
          const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'deep/dir/@babel/runtime/helpers/esm/arrayLikeToArray.js');
        });
      });

      describe('empty input', () => {
        it('normalizes base', () => {
          const base = 'deep/dir/';
          const input = '';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'deep/dir/');
        });
      });
    });

    describe(`base = "./file"`, () => {
      describe('with absolute input', () => {
        it('returns input', () => {
          const base = './file';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes input', () => {
          const base = './file';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
        });

        it('normalizes pathless input', () => {
          const base = './file';
          const input = 'https://absolute.com';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/');
        });

        it('normalizes current directory', () => {
          const base = './file';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = './file';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = './file';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes file protocol', () => {
          const base = './file';
          const input = 'file:///root/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///root/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        it('resolves relative to the base protocol', () => {
          const base = './file';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });

        it('normalizes input', () => {
          const base = './file';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/foo/main.js.map');
        });

        it('normalizes pathless input', () => {
          const base = './file';
          const input = '//protocol-relative.com';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/');
        });

        it('normalizes current directory', () => {
          const base = './file';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = './file';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = './file';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        it('remains absolute path', () => {
          const base = './file';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/assets/main.js.map');
        });

        it('trims to root', () => {
          const base = './file';
          const input = '/';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/');
        });

        it('normalizes input', () => {
          const base = './file';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/foo/main.js.map');
        });

        it('normalizes current directory', () => {
          const base = './file';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = './file';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = './file';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        it('resolves relative to current directory', () => {
          const base = './file';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, './bar/main.js.map');
        });

        it('resolves relative to parent directory', () => {
          const base = './file';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../bar/main.js.map');
        });

        it('resolves relative to parent multiple directory', () => {
          const base = './file';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../../../bar/main.js.map');
        });

        it('normalizes input', () => {
          const base = './file';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, './foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        it('resolves relative to current directory', () => {
          const base = './file';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, './bar/main.js.map');
        });

        it('resolves relative to parent multiple directory, later', () => {
          const base = './file';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../../bar/main.js.map');
        });

        it('normalizes input', () => {
          const base = './file';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, './foo/main.js.map');
        });

        it('resolves node_module scope as path', () => {
          const base = './file';
          const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
          const resolved = resolve(input, base);
          assert.strictEqual(
            resolved,
            './node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js'
          );
        });

        it('resolves package scope as path', () => {
          const base = './file';
          const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, './@babel/runtime/helpers/esm/arrayLikeToArray.js');
        });
      });

      describe('empty input', () => {
        it('normalizes base', () => {
          const base = './file';
          const input = '';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, './file');
        });
      });
    });

    describe(`base = "./dir/"`, () => {
      describe('with absolute input', () => {
        it('returns input', () => {
          const base = './dir/';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes input', () => {
          const base = './dir/';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
        });

        it('normalizes pathless input', () => {
          const base = './dir/';
          const input = 'https://absolute.com';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/');
        });

        it('normalizes current directory', () => {
          const base = './dir/';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = './dir/';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = './dir/';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes file protocol', () => {
          const base = './dir/';
          const input = 'file:///root/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///root/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        it('resolves relative to the base protocol', () => {
          const base = './dir/';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });

        it('normalizes input', () => {
          const base = './dir/';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/foo/main.js.map');
        });

        it('normalizes pathless input', () => {
          const base = './dir/';
          const input = '//protocol-relative.com';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/');
        });

        it('normalizes current directory', () => {
          const base = './dir/';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = './dir/';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = './dir/';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        it('remains absolute path', () => {
          const base = './dir/';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/assets/main.js.map');
        });

        it('trims to root', () => {
          const base = './dir/';
          const input = '/';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/');
        });

        it('normalizes input', () => {
          const base = './dir/';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/foo/main.js.map');
        });

        it('normalizes current directory', () => {
          const base = './dir/';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = './dir/';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = './dir/';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        it('resolves relative to current directory', () => {
          const base = './dir/';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, './dir/bar/main.js.map');
        });

        it('resolves relative to parent directory', () => {
          const base = './dir/';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, './bar/main.js.map');
        });

        it('resolves relative to parent multiple directory', () => {
          const base = './dir/';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../../bar/main.js.map');
        });

        it('normalizes input', () => {
          const base = './dir/';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, './dir/foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        it('resolves relative to current directory', () => {
          const base = './dir/';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, './dir/bar/main.js.map');
        });

        it('resolves relative to parent multiple directory, later', () => {
          const base = './dir/';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../bar/main.js.map');
        });

        it('normalizes input', () => {
          const base = './dir/';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, './dir/foo/main.js.map');
        });

        it('resolves node_module scope as path', () => {
          const base = './dir/';
          const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
          const resolved = resolve(input, base);
          assert.strictEqual(
            resolved,
            './dir/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js'
          );
        });

        it('resolves package scope as path', () => {
          const base = './dir/';
          const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, './dir/@babel/runtime/helpers/esm/arrayLikeToArray.js');
        });
      });

      describe('empty input', () => {
        it('normalizes base', () => {
          const base = './dir/';
          const input = '';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, './dir/');
        });
      });
    });

    describe(`base = "./deep/file"`, () => {
      describe('with absolute input', () => {
        it('returns input', () => {
          const base = './deep/file';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes input', () => {
          const base = './deep/file';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
        });

        it('normalizes pathless input', () => {
          const base = './deep/file';
          const input = 'https://absolute.com';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/');
        });

        it('normalizes current directory', () => {
          const base = './deep/file';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = './deep/file';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = './deep/file';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes file protocol', () => {
          const base = './deep/file';
          const input = 'file:///root/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///root/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        it('resolves relative to the base protocol', () => {
          const base = './deep/file';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });

        it('normalizes input', () => {
          const base = './deep/file';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/foo/main.js.map');
        });

        it('normalizes pathless input', () => {
          const base = './deep/file';
          const input = '//protocol-relative.com';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/');
        });

        it('normalizes current directory', () => {
          const base = './deep/file';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = './deep/file';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = './deep/file';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        it('remains absolute path', () => {
          const base = './deep/file';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/assets/main.js.map');
        });

        it('trims to root', () => {
          const base = './deep/file';
          const input = '/';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/');
        });

        it('normalizes input', () => {
          const base = './deep/file';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/foo/main.js.map');
        });

        it('normalizes current directory', () => {
          const base = './deep/file';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = './deep/file';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = './deep/file';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        it('resolves relative to current directory', () => {
          const base = './deep/file';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, './deep/bar/main.js.map');
        });

        it('resolves relative to parent directory', () => {
          const base = './deep/file';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, './bar/main.js.map');
        });

        it('resolves relative to parent multiple directory', () => {
          const base = './deep/file';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../../bar/main.js.map');
        });

        it('normalizes input', () => {
          const base = './deep/file';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, './deep/foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        it('resolves relative to current directory', () => {
          const base = './deep/file';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, './deep/bar/main.js.map');
        });

        it('resolves relative to parent multiple directory, later', () => {
          const base = './deep/file';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../bar/main.js.map');
        });

        it('normalizes input', () => {
          const base = './deep/file';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, './deep/foo/main.js.map');
        });

        it('resolves node_module scope as path', () => {
          const base = './deep/file';
          const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
          const resolved = resolve(input, base);
          assert.strictEqual(
            resolved,
            './deep/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js'
          );
        });

        it('resolves package scope as path', () => {
          const base = './deep/file';
          const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, './deep/@babel/runtime/helpers/esm/arrayLikeToArray.js');
        });
      });

      describe('empty input', () => {
        it('normalizes base', () => {
          const base = './deep/file';
          const input = '';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, './deep/file');
        });
      });
    });

    describe(`base = "./deep/dir/"`, () => {
      describe('with absolute input', () => {
        it('returns input', () => {
          const base = './deep/dir/';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes input', () => {
          const base = './deep/dir/';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
        });

        it('normalizes pathless input', () => {
          const base = './deep/dir/';
          const input = 'https://absolute.com';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/');
        });

        it('normalizes current directory', () => {
          const base = './deep/dir/';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = './deep/dir/';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = './deep/dir/';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes file protocol', () => {
          const base = './deep/dir/';
          const input = 'file:///root/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///root/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        it('resolves relative to the base protocol', () => {
          const base = './deep/dir/';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });

        it('normalizes input', () => {
          const base = './deep/dir/';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/foo/main.js.map');
        });

        it('normalizes pathless input', () => {
          const base = './deep/dir/';
          const input = '//protocol-relative.com';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/');
        });

        it('normalizes current directory', () => {
          const base = './deep/dir/';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = './deep/dir/';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = './deep/dir/';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        it('remains absolute path', () => {
          const base = './deep/dir/';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/assets/main.js.map');
        });

        it('trims to root', () => {
          const base = './deep/dir/';
          const input = '/';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/');
        });

        it('normalizes input', () => {
          const base = './deep/dir/';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/foo/main.js.map');
        });

        it('normalizes current directory', () => {
          const base = './deep/dir/';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = './deep/dir/';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = './deep/dir/';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        it('resolves relative to current directory', () => {
          const base = './deep/dir/';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, './deep/dir/bar/main.js.map');
        });

        it('resolves relative to parent directory', () => {
          const base = './deep/dir/';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, './deep/bar/main.js.map');
        });

        it('resolves relative to parent multiple directory', () => {
          const base = './deep/dir/';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../bar/main.js.map');
        });

        it('normalizes input', () => {
          const base = './deep/dir/';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, './deep/dir/foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        it('resolves relative to current directory', () => {
          const base = './deep/dir/';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, './deep/dir/bar/main.js.map');
        });

        it('resolves relative to parent multiple directory, later', () => {
          const base = './deep/dir/';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, './bar/main.js.map');
        });

        it('normalizes input', () => {
          const base = './deep/dir/';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, './deep/dir/foo/main.js.map');
        });

        it('resolves node_module scope as path', () => {
          const base = './deep/dir/';
          const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
          const resolved = resolve(input, base);
          assert.strictEqual(
            resolved,
            './deep/dir/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js'
          );
        });

        it('resolves package scope as path', () => {
          const base = './deep/dir/';
          const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, './deep/dir/@babel/runtime/helpers/esm/arrayLikeToArray.js');
        });
      });

      describe('empty input', () => {
        it('normalizes base', () => {
          const base = './deep/dir/';
          const input = '';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, './deep/dir/');
        });
      });
    });

    describe(`base = "../file"`, () => {
      describe('with absolute input', () => {
        it('returns input', () => {
          const base = '../file';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes input', () => {
          const base = '../file';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
        });

        it('normalizes pathless input', () => {
          const base = '../file';
          const input = 'https://absolute.com';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/');
        });

        it('normalizes current directory', () => {
          const base = '../file';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = '../file';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = '../file';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes file protocol', () => {
          const base = '../file';
          const input = 'file:///root/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///root/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        it('resolves relative to the base protocol', () => {
          const base = '../file';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });

        it('normalizes input', () => {
          const base = '../file';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/foo/main.js.map');
        });

        it('normalizes pathless input', () => {
          const base = '../file';
          const input = '//protocol-relative.com';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/');
        });

        it('normalizes current directory', () => {
          const base = '../file';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = '../file';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = '../file';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        it('remains absolute path', () => {
          const base = '../file';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/assets/main.js.map');
        });

        it('trims to root', () => {
          const base = '../file';
          const input = '/';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/');
        });

        it('normalizes input', () => {
          const base = '../file';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/foo/main.js.map');
        });

        it('normalizes current directory', () => {
          const base = '../file';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = '../file';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = '../file';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        it('resolves relative to current directory', () => {
          const base = '../file';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../bar/main.js.map');
        });

        it('resolves relative to parent directory', () => {
          const base = '../file';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../../bar/main.js.map');
        });

        it('resolves relative to parent multiple directory', () => {
          const base = '../file';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../../../../bar/main.js.map');
        });

        it('normalizes input', () => {
          const base = '../file';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        it('resolves relative to current directory', () => {
          const base = '../file';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../bar/main.js.map');
        });

        it('resolves relative to parent multiple directory, later', () => {
          const base = '../file';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../../../bar/main.js.map');
        });

        it('normalizes input', () => {
          const base = '../file';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../foo/main.js.map');
        });

        it('resolves node_module scope as path', () => {
          const base = '../file';
          const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
          const resolved = resolve(input, base);
          assert.strictEqual(
            resolved,
            '../node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js'
          );
        });

        it('resolves package scope as path', () => {
          const base = '../file';
          const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../@babel/runtime/helpers/esm/arrayLikeToArray.js');
        });
      });

      describe('empty input', () => {
        it('normalizes base', () => {
          const base = '../file';
          const input = '';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../file');
        });
      });
    });

    describe(`base = "../dir/"`, () => {
      describe('with absolute input', () => {
        it('returns input', () => {
          const base = '../dir/';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes input', () => {
          const base = '../dir/';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
        });

        it('normalizes pathless input', () => {
          const base = '../dir/';
          const input = 'https://absolute.com';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/');
        });

        it('normalizes current directory', () => {
          const base = '../dir/';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = '../dir/';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = '../dir/';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes file protocol', () => {
          const base = '../dir/';
          const input = 'file:///root/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///root/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        it('resolves relative to the base protocol', () => {
          const base = '../dir/';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });

        it('normalizes input', () => {
          const base = '../dir/';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/foo/main.js.map');
        });

        it('normalizes pathless input', () => {
          const base = '../dir/';
          const input = '//protocol-relative.com';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/');
        });

        it('normalizes current directory', () => {
          const base = '../dir/';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = '../dir/';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = '../dir/';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        it('remains absolute path', () => {
          const base = '../dir/';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/assets/main.js.map');
        });

        it('trims to root', () => {
          const base = '../dir/';
          const input = '/';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/');
        });

        it('normalizes input', () => {
          const base = '../dir/';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/foo/main.js.map');
        });

        it('normalizes current directory', () => {
          const base = '../dir/';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = '../dir/';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = '../dir/';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        it('resolves relative to current directory', () => {
          const base = '../dir/';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../dir/bar/main.js.map');
        });

        it('resolves relative to parent directory', () => {
          const base = '../dir/';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../bar/main.js.map');
        });

        it('resolves relative to parent multiple directory', () => {
          const base = '../dir/';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../../../bar/main.js.map');
        });

        it('normalizes input', () => {
          const base = '../dir/';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../dir/foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        it('resolves relative to current directory', () => {
          const base = '../dir/';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../dir/bar/main.js.map');
        });

        it('resolves relative to parent multiple directory, later', () => {
          const base = '../dir/';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../../bar/main.js.map');
        });

        it('normalizes input', () => {
          const base = '../dir/';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../dir/foo/main.js.map');
        });

        it('resolves node_module scope as path', () => {
          const base = '../dir/';
          const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
          const resolved = resolve(input, base);
          assert.strictEqual(
            resolved,
            '../dir/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js'
          );
        });

        it('resolves package scope as path', () => {
          const base = '../dir/';
          const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../dir/@babel/runtime/helpers/esm/arrayLikeToArray.js');
        });
      });

      describe('empty input', () => {
        it('normalizes base', () => {
          const base = '../dir/';
          const input = '';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../dir/');
        });
      });
    });

    describe(`base = "../deep/file"`, () => {
      describe('with absolute input', () => {
        it('returns input', () => {
          const base = '../deep/file';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes input', () => {
          const base = '../deep/file';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
        });

        it('normalizes pathless input', () => {
          const base = '../deep/file';
          const input = 'https://absolute.com';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/');
        });

        it('normalizes current directory', () => {
          const base = '../deep/file';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = '../deep/file';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = '../deep/file';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes file protocol', () => {
          const base = '../deep/file';
          const input = 'file:///root/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///root/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        it('resolves relative to the base protocol', () => {
          const base = '../deep/file';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });

        it('normalizes input', () => {
          const base = '../deep/file';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/foo/main.js.map');
        });

        it('normalizes pathless input', () => {
          const base = '../deep/file';
          const input = '//protocol-relative.com';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/');
        });

        it('normalizes current directory', () => {
          const base = '../deep/file';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = '../deep/file';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = '../deep/file';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        it('remains absolute path', () => {
          const base = '../deep/file';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/assets/main.js.map');
        });

        it('trims to root', () => {
          const base = '../deep/file';
          const input = '/';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/');
        });

        it('normalizes input', () => {
          const base = '../deep/file';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/foo/main.js.map');
        });

        it('normalizes current directory', () => {
          const base = '../deep/file';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = '../deep/file';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = '../deep/file';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        it('resolves relative to current directory', () => {
          const base = '../deep/file';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../deep/bar/main.js.map');
        });

        it('resolves relative to parent directory', () => {
          const base = '../deep/file';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../bar/main.js.map');
        });

        it('resolves relative to parent multiple directory', () => {
          const base = '../deep/file';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../../../bar/main.js.map');
        });

        it('normalizes input', () => {
          const base = '../deep/file';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../deep/foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        it('resolves relative to current directory', () => {
          const base = '../deep/file';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../deep/bar/main.js.map');
        });

        it('resolves relative to parent multiple directory, later', () => {
          const base = '../deep/file';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../../bar/main.js.map');
        });

        it('normalizes input', () => {
          const base = '../deep/file';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../deep/foo/main.js.map');
        });

        it('resolves node_module scope as path', () => {
          const base = '../deep/file';
          const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
          const resolved = resolve(input, base);
          assert.strictEqual(
            resolved,
            '../deep/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js'
          );
        });

        it('resolves package scope as path', () => {
          const base = '../deep/file';
          const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../deep/@babel/runtime/helpers/esm/arrayLikeToArray.js');
        });
      });

      describe('empty input', () => {
        it('normalizes base', () => {
          const base = '../deep/file';
          const input = '';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../deep/file');
        });
      });
    });

    describe(`base = "../deep/dir/"`, () => {
      describe('with absolute input', () => {
        it('returns input', () => {
          const base = '../deep/dir/';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes input', () => {
          const base = '../deep/dir/';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
        });

        it('normalizes pathless input', () => {
          const base = '../deep/dir/';
          const input = 'https://absolute.com';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/');
        });

        it('normalizes current directory', () => {
          const base = '../deep/dir/';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = '../deep/dir/';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = '../deep/dir/';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes file protocol', () => {
          const base = '../deep/dir/';
          const input = 'file:///root/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///root/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        it('resolves relative to the base protocol', () => {
          const base = '../deep/dir/';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });

        it('normalizes input', () => {
          const base = '../deep/dir/';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/foo/main.js.map');
        });

        it('normalizes pathless input', () => {
          const base = '../deep/dir/';
          const input = '//protocol-relative.com';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/');
        });

        it('normalizes current directory', () => {
          const base = '../deep/dir/';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = '../deep/dir/';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = '../deep/dir/';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        it('remains absolute path', () => {
          const base = '../deep/dir/';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/assets/main.js.map');
        });

        it('trims to root', () => {
          const base = '../deep/dir/';
          const input = '/';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/');
        });

        it('normalizes input', () => {
          const base = '../deep/dir/';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/foo/main.js.map');
        });

        it('normalizes current directory', () => {
          const base = '../deep/dir/';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = '../deep/dir/';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = '../deep/dir/';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        it('resolves relative to current directory', () => {
          const base = '../deep/dir/';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../deep/dir/bar/main.js.map');
        });

        it('resolves relative to parent directory', () => {
          const base = '../deep/dir/';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../deep/bar/main.js.map');
        });

        it('resolves relative to parent multiple directory', () => {
          const base = '../deep/dir/';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../../bar/main.js.map');
        });

        it('normalizes input', () => {
          const base = '../deep/dir/';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../deep/dir/foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        it('resolves relative to current directory', () => {
          const base = '../deep/dir/';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../deep/dir/bar/main.js.map');
        });

        it('resolves relative to parent multiple directory, later', () => {
          const base = '../deep/dir/';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../bar/main.js.map');
        });

        it('normalizes input', () => {
          const base = '../deep/dir/';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../deep/dir/foo/main.js.map');
        });

        it('resolves node_module scope as path', () => {
          const base = '../deep/dir/';
          const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
          const resolved = resolve(input, base);
          assert.strictEqual(
            resolved,
            '../deep/dir/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js'
          );
        });

        it('resolves package scope as path', () => {
          const base = '../deep/dir/';
          const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
          const resolved = resolve(input, base);
          assert.strictEqual(
            resolved,
            '../deep/dir/@babel/runtime/helpers/esm/arrayLikeToArray.js'
          );
        });
      });

      describe('empty input', () => {
        it('normalizes base', () => {
          const base = '../deep/dir/';
          const input = '';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../deep/dir/');
        });
      });
    });

    describe(`base = ".."`, () => {
      describe('with absolute input', () => {
        it('returns input', () => {
          const base = '..';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes input', () => {
          const base = '..';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
        });

        it('normalizes pathless input', () => {
          const base = '..';
          const input = 'https://absolute.com';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/');
        });

        it('normalizes current directory', () => {
          const base = '..';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = '..';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = '..';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes file protocol', () => {
          const base = '..';
          const input = 'file:///root/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///root/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        it('resolves relative to the base protocol', () => {
          const base = '..';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });

        it('normalizes input', () => {
          const base = '..';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/foo/main.js.map');
        });

        it('normalizes pathless input', () => {
          const base = '..';
          const input = '//protocol-relative.com';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/');
        });

        it('normalizes current directory', () => {
          const base = '..';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = '..';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = '..';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        it('remains absolute path', () => {
          const base = '..';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/assets/main.js.map');
        });

        it('trims to root', () => {
          const base = '..';
          const input = '/';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/');
        });

        it('normalizes input', () => {
          const base = '..';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/foo/main.js.map');
        });

        it('normalizes current directory', () => {
          const base = '..';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = '..';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = '..';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        it('resolves relative to current directory', () => {
          const base = '..';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../bar/main.js.map');
        });

        it('resolves relative to parent directory', () => {
          const base = '..';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../../bar/main.js.map');
        });

        it('resolves relative to parent multiple directory', () => {
          const base = '..';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../../../../bar/main.js.map');
        });

        it('normalizes input', () => {
          const base = '..';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        it('resolves relative to current directory', () => {
          const base = '..';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../bar/main.js.map');
        });

        it('resolves relative to parent multiple directory, later', () => {
          const base = '..';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../../../bar/main.js.map');
        });

        it('normalizes input', () => {
          const base = '..';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../foo/main.js.map');
        });

        it('resolves node_module scope as path', () => {
          const base = '..';
          const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
          const resolved = resolve(input, base);
          assert.strictEqual(
            resolved,
            '../node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js'
          );
        });

        it('resolves package scope as path', () => {
          const base = '..';
          const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../@babel/runtime/helpers/esm/arrayLikeToArray.js');
        });
      });

      describe('empty input', () => {
        it('normalizes base', () => {
          const base = '..';
          const input = '';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '..');
        });
      });
    });

    describe(`base = "../"`, () => {
      describe('with absolute input', () => {
        it('returns input', () => {
          const base = '../';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes input', () => {
          const base = '../';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
        });

        it('normalizes pathless input', () => {
          const base = '../';
          const input = 'https://absolute.com';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/');
        });

        it('normalizes current directory', () => {
          const base = '../';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = '../';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = '../';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes file protocol', () => {
          const base = '../';
          const input = 'file:///root/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///root/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        it('resolves relative to the base protocol', () => {
          const base = '../';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });

        it('normalizes input', () => {
          const base = '../';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/foo/main.js.map');
        });

        it('normalizes pathless input', () => {
          const base = '../';
          const input = '//protocol-relative.com';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/');
        });

        it('normalizes current directory', () => {
          const base = '../';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = '../';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = '../';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        it('remains absolute path', () => {
          const base = '../';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/assets/main.js.map');
        });

        it('trims to root', () => {
          const base = '../';
          const input = '/';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/');
        });

        it('normalizes input', () => {
          const base = '../';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/foo/main.js.map');
        });

        it('normalizes current directory', () => {
          const base = '../';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = '../';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = '../';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        it('resolves relative to current directory', () => {
          const base = '../';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../bar/main.js.map');
        });

        it('resolves relative to parent directory', () => {
          const base = '../';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../../bar/main.js.map');
        });

        it('resolves relative to parent multiple directory', () => {
          const base = '../';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../../../../bar/main.js.map');
        });

        it('normalizes input', () => {
          const base = '../';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        it('resolves relative to current directory', () => {
          const base = '../';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../bar/main.js.map');
        });

        it('resolves relative to parent multiple directory, later', () => {
          const base = '../';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../../../bar/main.js.map');
        });

        it('normalizes input', () => {
          const base = '../';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../foo/main.js.map');
        });

        it('resolves node_module scope as path', () => {
          const base = '../';
          const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
          const resolved = resolve(input, base);
          assert.strictEqual(
            resolved,
            '../node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js'
          );
        });

        it('resolves package scope as path', () => {
          const base = '../';
          const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../@babel/runtime/helpers/esm/arrayLikeToArray.js');
        });
      });

      describe('empty input', () => {
        it('normalizes base', () => {
          const base = '../';
          const input = '';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '..');
        });
      });
    });

    describe(`base = "dir/.."`, () => {
      describe('with absolute input', () => {
        it('returns input', () => {
          const base = 'dir/..';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes input', () => {
          const base = 'dir/..';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
        });

        it('normalizes pathless input', () => {
          const base = 'dir/..';
          const input = 'https://absolute.com';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/');
        });

        it('normalizes current directory', () => {
          const base = 'dir/..';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = 'dir/..';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = 'dir/..';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes file protocol', () => {
          const base = 'dir/..';
          const input = 'file:///root/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///root/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        it('resolves relative to the base protocol', () => {
          const base = 'dir/..';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });

        it('normalizes input', () => {
          const base = 'dir/..';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/foo/main.js.map');
        });

        it('normalizes pathless input', () => {
          const base = 'dir/..';
          const input = '//protocol-relative.com';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/');
        });

        it('normalizes current directory', () => {
          const base = 'dir/..';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = 'dir/..';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = 'dir/..';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        it('remains absolute path', () => {
          const base = 'dir/..';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/assets/main.js.map');
        });

        it('trims to root', () => {
          const base = 'dir/..';
          const input = '/';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/');
        });

        it('normalizes input', () => {
          const base = 'dir/..';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/foo/main.js.map');
        });

        it('normalizes current directory', () => {
          const base = 'dir/..';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = 'dir/..';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = 'dir/..';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        it('resolves relative to current directory', () => {
          const base = 'dir/..';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'bar/main.js.map');
        });

        it('resolves relative to parent directory', () => {
          const base = 'dir/..';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../bar/main.js.map');
        });

        it('resolves relative to parent multiple directory', () => {
          const base = 'dir/..';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../../../bar/main.js.map');
        });

        it('normalizes input', () => {
          const base = 'dir/..';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        it('resolves relative to current directory', () => {
          const base = 'dir/..';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'bar/main.js.map');
        });

        it('resolves relative to parent multiple directory, later', () => {
          const base = 'dir/..';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../../bar/main.js.map');
        });

        it('normalizes input', () => {
          const base = 'dir/..';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'foo/main.js.map');
        });

        it('resolves node_module scope as path', () => {
          const base = 'dir/..';
          const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
          const resolved = resolve(input, base);
          assert.strictEqual(
            resolved,
            'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js'
          );
        });

        it('resolves package scope as path', () => {
          const base = 'dir/..';
          const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '@babel/runtime/helpers/esm/arrayLikeToArray.js');
        });
      });

      describe('empty input', () => {
        it('normalizes base', () => {
          const base = 'dir/..';
          const input = '';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '.');
        });
      });
    });

    describe(`base = "deep/../"`, () => {
      describe('with absolute input', () => {
        it('returns input', () => {
          const base = 'deep/../';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes input', () => {
          const base = 'deep/../';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
        });

        it('normalizes pathless input', () => {
          const base = 'deep/../';
          const input = 'https://absolute.com';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/');
        });

        it('normalizes current directory', () => {
          const base = 'deep/../';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = 'deep/../';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = 'deep/../';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes file protocol', () => {
          const base = 'deep/../';
          const input = 'file:///root/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///root/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        it('resolves relative to the base protocol', () => {
          const base = 'deep/../';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });

        it('normalizes input', () => {
          const base = 'deep/../';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/foo/main.js.map');
        });

        it('normalizes pathless input', () => {
          const base = 'deep/../';
          const input = '//protocol-relative.com';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/');
        });

        it('normalizes current directory', () => {
          const base = 'deep/../';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = 'deep/../';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = 'deep/../';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        it('remains absolute path', () => {
          const base = 'deep/../';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/assets/main.js.map');
        });

        it('trims to root', () => {
          const base = 'deep/../';
          const input = '/';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/');
        });

        it('normalizes input', () => {
          const base = 'deep/../';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/foo/main.js.map');
        });

        it('normalizes current directory', () => {
          const base = 'deep/../';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = 'deep/../';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = 'deep/../';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        it('resolves relative to current directory', () => {
          const base = 'deep/../';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'bar/main.js.map');
        });

        it('resolves relative to parent directory', () => {
          const base = 'deep/../';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../bar/main.js.map');
        });

        it('resolves relative to parent multiple directory', () => {
          const base = 'deep/../';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../../../bar/main.js.map');
        });

        it('normalizes input', () => {
          const base = 'deep/../';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        it('resolves relative to current directory', () => {
          const base = 'deep/../';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'bar/main.js.map');
        });

        it('resolves relative to parent multiple directory, later', () => {
          const base = 'deep/../';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../../bar/main.js.map');
        });

        it('normalizes input', () => {
          const base = 'deep/../';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'foo/main.js.map');
        });

        it('resolves node_module scope as path', () => {
          const base = 'deep/../';
          const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
          const resolved = resolve(input, base);
          assert.strictEqual(
            resolved,
            'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js'
          );
        });

        it('resolves package scope as path', () => {
          const base = 'deep/../';
          const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '@babel/runtime/helpers/esm/arrayLikeToArray.js');
        });
      });

      describe('empty input', () => {
        it('normalizes base', () => {
          const base = 'deep/../';
          const input = '';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '.');
        });
      });
    });

    describe(`base = "./.."`, () => {
      describe('with absolute input', () => {
        it('returns input', () => {
          const base = './..';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes input', () => {
          const base = './..';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
        });

        it('normalizes pathless input', () => {
          const base = './..';
          const input = 'https://absolute.com';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/');
        });

        it('normalizes current directory', () => {
          const base = './..';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = './..';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = './..';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes file protocol', () => {
          const base = './..';
          const input = 'file:///root/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///root/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        it('resolves relative to the base protocol', () => {
          const base = './..';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });

        it('normalizes input', () => {
          const base = './..';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/foo/main.js.map');
        });

        it('normalizes pathless input', () => {
          const base = './..';
          const input = '//protocol-relative.com';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/');
        });

        it('normalizes current directory', () => {
          const base = './..';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = './..';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = './..';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        it('remains absolute path', () => {
          const base = './..';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/assets/main.js.map');
        });

        it('trims to root', () => {
          const base = './..';
          const input = '/';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/');
        });

        it('normalizes input', () => {
          const base = './..';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/foo/main.js.map');
        });

        it('normalizes current directory', () => {
          const base = './..';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = './..';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = './..';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        it('resolves relative to current directory', () => {
          const base = './..';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../bar/main.js.map');
        });

        it('resolves relative to parent directory', () => {
          const base = './..';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../../bar/main.js.map');
        });

        it('resolves relative to parent multiple directory', () => {
          const base = './..';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../../../../bar/main.js.map');
        });

        it('normalizes input', () => {
          const base = './..';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        it('resolves relative to current directory', () => {
          const base = './..';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../bar/main.js.map');
        });

        it('resolves relative to parent multiple directory, later', () => {
          const base = './..';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../../../bar/main.js.map');
        });

        it('normalizes input', () => {
          const base = './..';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../foo/main.js.map');
        });

        it('resolves node_module scope as path', () => {
          const base = './..';
          const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
          const resolved = resolve(input, base);
          assert.strictEqual(
            resolved,
            '../node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js'
          );
        });

        it('resolves package scope as path', () => {
          const base = './..';
          const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../@babel/runtime/helpers/esm/arrayLikeToArray.js');
        });
      });

      describe('empty input', () => {
        it('normalizes base', () => {
          const base = './..';
          const input = '';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '..');
        });
      });
    });

    describe(`base = "./../"`, () => {
      describe('with absolute input', () => {
        it('returns input', () => {
          const base = './../';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes input', () => {
          const base = './../';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
        });

        it('normalizes pathless input', () => {
          const base = './../';
          const input = 'https://absolute.com';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/');
        });

        it('normalizes current directory', () => {
          const base = './../';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = './../';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = './../';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes file protocol', () => {
          const base = './../';
          const input = 'file:///root/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///root/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        it('resolves relative to the base protocol', () => {
          const base = './../';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });

        it('normalizes input', () => {
          const base = './../';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/foo/main.js.map');
        });

        it('normalizes pathless input', () => {
          const base = './../';
          const input = '//protocol-relative.com';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/');
        });

        it('normalizes current directory', () => {
          const base = './../';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = './../';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = './../';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        it('remains absolute path', () => {
          const base = './../';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/assets/main.js.map');
        });

        it('trims to root', () => {
          const base = './../';
          const input = '/';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/');
        });

        it('normalizes input', () => {
          const base = './../';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/foo/main.js.map');
        });

        it('normalizes current directory', () => {
          const base = './../';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = './../';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = './../';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        it('resolves relative to current directory', () => {
          const base = './../';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../bar/main.js.map');
        });

        it('resolves relative to parent directory', () => {
          const base = './../';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../../bar/main.js.map');
        });

        it('resolves relative to parent multiple directory', () => {
          const base = './../';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../../../../bar/main.js.map');
        });

        it('normalizes input', () => {
          const base = './../';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        it('resolves relative to current directory', () => {
          const base = './../';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../bar/main.js.map');
        });

        it('resolves relative to parent multiple directory, later', () => {
          const base = './../';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../../../bar/main.js.map');
        });

        it('normalizes input', () => {
          const base = './../';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../foo/main.js.map');
        });

        it('resolves node_module scope as path', () => {
          const base = './../';
          const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
          const resolved = resolve(input, base);
          assert.strictEqual(
            resolved,
            '../node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js'
          );
        });

        it('resolves package scope as path', () => {
          const base = './../';
          const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../@babel/runtime/helpers/esm/arrayLikeToArray.js');
        });
      });

      describe('empty input', () => {
        it('normalizes base', () => {
          const base = './../';
          const input = '';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '..');
        });
      });
    });

    describe(`base = "./deep/.."`, () => {
      describe('with absolute input', () => {
        it('returns input', () => {
          const base = './deep/..';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes input', () => {
          const base = './deep/..';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
        });

        it('normalizes pathless input', () => {
          const base = './deep/..';
          const input = 'https://absolute.com';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/');
        });

        it('normalizes current directory', () => {
          const base = './deep/..';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = './deep/..';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = './deep/..';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes file protocol', () => {
          const base = './deep/..';
          const input = 'file:///root/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///root/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        it('resolves relative to the base protocol', () => {
          const base = './deep/..';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });

        it('normalizes input', () => {
          const base = './deep/..';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/foo/main.js.map');
        });

        it('normalizes pathless input', () => {
          const base = './deep/..';
          const input = '//protocol-relative.com';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/');
        });

        it('normalizes current directory', () => {
          const base = './deep/..';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = './deep/..';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = './deep/..';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        it('remains absolute path', () => {
          const base = './deep/..';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/assets/main.js.map');
        });

        it('trims to root', () => {
          const base = './deep/..';
          const input = '/';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/');
        });

        it('normalizes input', () => {
          const base = './deep/..';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/foo/main.js.map');
        });

        it('normalizes current directory', () => {
          const base = './deep/..';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = './deep/..';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = './deep/..';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        it('resolves relative to current directory', () => {
          const base = './deep/..';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, './bar/main.js.map');
        });

        it('resolves relative to parent directory', () => {
          const base = './deep/..';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../bar/main.js.map');
        });

        it('resolves relative to parent multiple directory', () => {
          const base = './deep/..';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../../../bar/main.js.map');
        });

        it('normalizes input', () => {
          const base = './deep/..';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, './foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        it('resolves relative to current directory', () => {
          const base = './deep/..';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, './bar/main.js.map');
        });

        it('resolves relative to parent multiple directory, later', () => {
          const base = './deep/..';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../../bar/main.js.map');
        });

        it('normalizes input', () => {
          const base = './deep/..';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, './foo/main.js.map');
        });

        it('resolves node_module scope as path', () => {
          const base = './deep/..';
          const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
          const resolved = resolve(input, base);
          assert.strictEqual(
            resolved,
            './node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js'
          );
        });

        it('resolves package scope as path', () => {
          const base = './deep/..';
          const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, './@babel/runtime/helpers/esm/arrayLikeToArray.js');
        });
      });

      describe('empty input', () => {
        it('normalizes base', () => {
          const base = './deep/..';
          const input = '';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '.');
        });
      });
    });

    describe(`base = "./deep/../"`, () => {
      describe('with absolute input', () => {
        it('returns input', () => {
          const base = './deep/../';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes input', () => {
          const base = './deep/../';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
        });

        it('normalizes pathless input', () => {
          const base = './deep/../';
          const input = 'https://absolute.com';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/');
        });

        it('normalizes current directory', () => {
          const base = './deep/../';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = './deep/../';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = './deep/../';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes file protocol', () => {
          const base = './deep/../';
          const input = 'file:///root/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///root/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        it('resolves relative to the base protocol', () => {
          const base = './deep/../';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });

        it('normalizes input', () => {
          const base = './deep/../';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/foo/main.js.map');
        });

        it('normalizes pathless input', () => {
          const base = './deep/../';
          const input = '//protocol-relative.com';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/');
        });

        it('normalizes current directory', () => {
          const base = './deep/../';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = './deep/../';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = './deep/../';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        it('remains absolute path', () => {
          const base = './deep/../';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/assets/main.js.map');
        });

        it('trims to root', () => {
          const base = './deep/../';
          const input = '/';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/');
        });

        it('normalizes input', () => {
          const base = './deep/../';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/foo/main.js.map');
        });

        it('normalizes current directory', () => {
          const base = './deep/../';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = './deep/../';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = './deep/../';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        it('resolves relative to current directory', () => {
          const base = './deep/../';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, './bar/main.js.map');
        });

        it('resolves relative to parent directory', () => {
          const base = './deep/../';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../bar/main.js.map');
        });

        it('resolves relative to parent multiple directory', () => {
          const base = './deep/../';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../../../bar/main.js.map');
        });

        it('normalizes input', () => {
          const base = './deep/../';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, './foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        it('resolves relative to current directory', () => {
          const base = './deep/../';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, './bar/main.js.map');
        });

        it('resolves relative to parent multiple directory, later', () => {
          const base = './deep/../';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../../bar/main.js.map');
        });

        it('normalizes input', () => {
          const base = './deep/../';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, './foo/main.js.map');
        });

        it('resolves node_module scope as path', () => {
          const base = './deep/../';
          const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
          const resolved = resolve(input, base);
          assert.strictEqual(
            resolved,
            './node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js'
          );
        });

        it('resolves package scope as path', () => {
          const base = './deep/../';
          const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, './@babel/runtime/helpers/esm/arrayLikeToArray.js');
        });
      });

      describe('empty input', () => {
        it('normalizes base', () => {
          const base = './deep/../';
          const input = '';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '.');
        });
      });
    });

    describe(`base = "../.."`, () => {
      describe('with absolute input', () => {
        it('returns input', () => {
          const base = '../..';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes input', () => {
          const base = '../..';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
        });

        it('normalizes pathless input', () => {
          const base = '../..';
          const input = 'https://absolute.com';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/');
        });

        it('normalizes current directory', () => {
          const base = '../..';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = '../..';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = '../..';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes file protocol', () => {
          const base = '../..';
          const input = 'file:///root/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///root/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        it('resolves relative to the base protocol', () => {
          const base = '../..';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });

        it('normalizes input', () => {
          const base = '../..';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/foo/main.js.map');
        });

        it('normalizes pathless input', () => {
          const base = '../..';
          const input = '//protocol-relative.com';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/');
        });

        it('normalizes current directory', () => {
          const base = '../..';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = '../..';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = '../..';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        it('remains absolute path', () => {
          const base = '../..';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/assets/main.js.map');
        });

        it('trims to root', () => {
          const base = '../..';
          const input = '/';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/');
        });

        it('normalizes input', () => {
          const base = '../..';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/foo/main.js.map');
        });

        it('normalizes current directory', () => {
          const base = '../..';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = '../..';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = '../..';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        it('resolves relative to current directory', () => {
          const base = '../..';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../../bar/main.js.map');
        });

        it('resolves relative to parent directory', () => {
          const base = '../..';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../../../bar/main.js.map');
        });

        it('resolves relative to parent multiple directory', () => {
          const base = '../..';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../../../../../bar/main.js.map');
        });

        it('normalizes input', () => {
          const base = '../..';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../../foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        it('resolves relative to current directory', () => {
          const base = '../..';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../../bar/main.js.map');
        });

        it('resolves relative to parent multiple directory, later', () => {
          const base = '../..';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../../../../bar/main.js.map');
        });

        it('normalizes input', () => {
          const base = '../..';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../../foo/main.js.map');
        });

        it('resolves node_module scope as path', () => {
          const base = '../..';
          const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
          const resolved = resolve(input, base);
          assert.strictEqual(
            resolved,
            '../../node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js'
          );
        });

        it('resolves package scope as path', () => {
          const base = '../..';
          const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../../@babel/runtime/helpers/esm/arrayLikeToArray.js');
        });
      });

      describe('empty input', () => {
        it('normalizes base', () => {
          const base = '../..';
          const input = '';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../..');
        });
      });
    });

    describe(`base = "../../"`, () => {
      describe('with absolute input', () => {
        it('returns input', () => {
          const base = '../../';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes input', () => {
          const base = '../../';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
        });

        it('normalizes pathless input', () => {
          const base = '../../';
          const input = 'https://absolute.com';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/');
        });

        it('normalizes current directory', () => {
          const base = '../../';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = '../../';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = '../../';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes file protocol', () => {
          const base = '../../';
          const input = 'file:///root/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///root/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        it('resolves relative to the base protocol', () => {
          const base = '../../';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });

        it('normalizes input', () => {
          const base = '../../';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/foo/main.js.map');
        });

        it('normalizes pathless input', () => {
          const base = '../../';
          const input = '//protocol-relative.com';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/');
        });

        it('normalizes current directory', () => {
          const base = '../../';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = '../../';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = '../../';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        it('remains absolute path', () => {
          const base = '../../';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/assets/main.js.map');
        });

        it('trims to root', () => {
          const base = '../../';
          const input = '/';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/');
        });

        it('normalizes input', () => {
          const base = '../../';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/foo/main.js.map');
        });

        it('normalizes current directory', () => {
          const base = '../../';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = '../../';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = '../../';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        it('resolves relative to current directory', () => {
          const base = '../../';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../../bar/main.js.map');
        });

        it('resolves relative to parent directory', () => {
          const base = '../../';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../../../bar/main.js.map');
        });

        it('resolves relative to parent multiple directory', () => {
          const base = '../../';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../../../../../bar/main.js.map');
        });

        it('normalizes input', () => {
          const base = '../../';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../../foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        it('resolves relative to current directory', () => {
          const base = '../../';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../../bar/main.js.map');
        });

        it('resolves relative to parent multiple directory, later', () => {
          const base = '../../';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../../../../bar/main.js.map');
        });

        it('normalizes input', () => {
          const base = '../../';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../../foo/main.js.map');
        });

        it('resolves node_module scope as path', () => {
          const base = '../../';
          const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
          const resolved = resolve(input, base);
          assert.strictEqual(
            resolved,
            '../../node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js'
          );
        });

        it('resolves package scope as path', () => {
          const base = '../../';
          const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../../@babel/runtime/helpers/esm/arrayLikeToArray.js');
        });
      });

      describe('empty input', () => {
        it('normalizes base', () => {
          const base = '../../';
          const input = '';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../..');
        });
      });
    });

    describe(`base = "../deep/.."`, () => {
      describe('with absolute input', () => {
        it('returns input', () => {
          const base = '../deep/..';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes input', () => {
          const base = '../deep/..';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
        });

        it('normalizes pathless input', () => {
          const base = '../deep/..';
          const input = 'https://absolute.com';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/');
        });

        it('normalizes current directory', () => {
          const base = '../deep/..';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = '../deep/..';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = '../deep/..';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes file protocol', () => {
          const base = '../deep/..';
          const input = 'file:///root/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///root/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        it('resolves relative to the base protocol', () => {
          const base = '../deep/..';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });

        it('normalizes input', () => {
          const base = '../deep/..';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/foo/main.js.map');
        });

        it('normalizes pathless input', () => {
          const base = '../deep/..';
          const input = '//protocol-relative.com';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/');
        });

        it('normalizes current directory', () => {
          const base = '../deep/..';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = '../deep/..';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = '../deep/..';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        it('remains absolute path', () => {
          const base = '../deep/..';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/assets/main.js.map');
        });

        it('trims to root', () => {
          const base = '../deep/..';
          const input = '/';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/');
        });

        it('normalizes input', () => {
          const base = '../deep/..';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/foo/main.js.map');
        });

        it('normalizes current directory', () => {
          const base = '../deep/..';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = '../deep/..';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = '../deep/..';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        it('resolves relative to current directory', () => {
          const base = '../deep/..';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../bar/main.js.map');
        });

        it('resolves relative to parent directory', () => {
          const base = '../deep/..';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../../bar/main.js.map');
        });

        it('resolves relative to parent multiple directory', () => {
          const base = '../deep/..';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../../../../bar/main.js.map');
        });

        it('normalizes input', () => {
          const base = '../deep/..';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        it('resolves relative to current directory', () => {
          const base = '../deep/..';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../bar/main.js.map');
        });

        it('resolves relative to parent multiple directory, later', () => {
          const base = '../deep/..';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../../../bar/main.js.map');
        });

        it('normalizes input', () => {
          const base = '../deep/..';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../foo/main.js.map');
        });

        it('resolves node_module scope as path', () => {
          const base = '../deep/..';
          const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
          const resolved = resolve(input, base);
          assert.strictEqual(
            resolved,
            '../node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js'
          );
        });

        it('resolves package scope as path', () => {
          const base = '../deep/..';
          const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../@babel/runtime/helpers/esm/arrayLikeToArray.js');
        });
      });

      describe('empty input', () => {
        it('normalizes base', () => {
          const base = '../deep/..';
          const input = '';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '..');
        });
      });
    });

    describe(`base = "../deep/../"`, () => {
      describe('with absolute input', () => {
        it('returns input', () => {
          const base = '../deep/../';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes input', () => {
          const base = '../deep/../';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
        });

        it('normalizes pathless input', () => {
          const base = '../deep/../';
          const input = 'https://absolute.com';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/');
        });

        it('normalizes current directory', () => {
          const base = '../deep/../';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = '../deep/../';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = '../deep/../';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
        });

        it('normalizes file protocol', () => {
          const base = '../deep/../';
          const input = 'file:///root/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, 'file:///root/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        it('resolves relative to the base protocol', () => {
          const base = '../deep/../';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });

        it('normalizes input', () => {
          const base = '../deep/../';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/foo/main.js.map');
        });

        it('normalizes pathless input', () => {
          const base = '../deep/../';
          const input = '//protocol-relative.com';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/');
        });

        it('normalizes current directory', () => {
          const base = '../deep/../';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = '../deep/../';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = '../deep/../';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        it('remains absolute path', () => {
          const base = '../deep/../';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/assets/main.js.map');
        });

        it('trims to root', () => {
          const base = '../deep/../';
          const input = '/';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/');
        });

        it('normalizes input', () => {
          const base = '../deep/../';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/foo/main.js.map');
        });

        it('normalizes current directory', () => {
          const base = '../deep/../';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/main.js.map');
        });

        it('normalizes too many parent accessors', () => {
          const base = '../deep/../';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/main.js.map');
        });

        it('normalizes too many parent accessors, late', () => {
          const base = '../deep/../';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        it('resolves relative to current directory', () => {
          const base = '../deep/../';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../bar/main.js.map');
        });

        it('resolves relative to parent directory', () => {
          const base = '../deep/../';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../../bar/main.js.map');
        });

        it('resolves relative to parent multiple directory', () => {
          const base = '../deep/../';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../../../../bar/main.js.map');
        });

        it('normalizes input', () => {
          const base = '../deep/../';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        it('resolves relative to current directory', () => {
          const base = '../deep/../';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../bar/main.js.map');
        });

        it('resolves relative to parent multiple directory, later', () => {
          const base = '../deep/../';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../../../bar/main.js.map');
        });

        it('normalizes input', () => {
          const base = '../deep/../';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../foo/main.js.map');
        });

        it('resolves node_module scope as path', () => {
          const base = '../deep/../';
          const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
          const resolved = resolve(input, base);
          assert.strictEqual(
            resolved,
            '../node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js'
          );
        });

        it('resolves package scope as path', () => {
          const base = '../deep/../';
          const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '../@babel/runtime/helpers/esm/arrayLikeToArray.js');
        });
      });

      describe('empty input', () => {
        it('normalizes base', () => {
          const base = '../deep/../';
          const input = '';
          const resolved = resolve(input, base);
          assert.strictEqual(resolved, '..');
        });
      });
    });
  });
});
