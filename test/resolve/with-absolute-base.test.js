const resolve = require('../..');
const assert = require('assert');

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

      it('normalizes file protocol 1', () => {
        const base = 'https://foo.com';
        const input = 'file:///root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 2', () => {
        const base = 'https://foo.com';
        const input = 'file://root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/main.js.map');
      });

      it('normalizes file protocol 2.5', () => {
        const base = 'https://foo.com';
        const input = 'file://root';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/');
      });

      it('normalizes file protocol 3', () => {
        const base = 'https://foo.com';
        const input = 'file:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 4', () => {
        const base = 'https://foo.com';
        const input = 'file:root/main.js.map';
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

      it('normalizes file protocol 1', () => {
        const base = 'https://foo.com/';
        const input = 'file:///root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 2', () => {
        const base = 'https://foo.com/';
        const input = 'file://root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/main.js.map');
      });

      it('normalizes file protocol 2.5', () => {
        const base = 'https://foo.com/';
        const input = 'file://root';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/');
      });

      it('normalizes file protocol 3', () => {
        const base = 'https://foo.com/';
        const input = 'file:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 4', () => {
        const base = 'https://foo.com/';
        const input = 'file:root/main.js.map';
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

      it('normalizes file protocol 1', () => {
        const base = 'https://foo.com/file';
        const input = 'file:///root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 2', () => {
        const base = 'https://foo.com/file';
        const input = 'file://root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/main.js.map');
      });

      it('normalizes file protocol 2.5', () => {
        const base = 'https://foo.com/file';
        const input = 'file://root';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/');
      });

      it('normalizes file protocol 3', () => {
        const base = 'https://foo.com/file';
        const input = 'file:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 4', () => {
        const base = 'https://foo.com/file';
        const input = 'file:root/main.js.map';
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

      it('normalizes file protocol 1', () => {
        const base = 'https://foo.com/dir/';
        const input = 'file:///root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 2', () => {
        const base = 'https://foo.com/dir/';
        const input = 'file://root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/main.js.map');
      });

      it('normalizes file protocol 2.5', () => {
        const base = 'https://foo.com/dir/';
        const input = 'file://root';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/');
      });

      it('normalizes file protocol 3', () => {
        const base = 'https://foo.com/dir/';
        const input = 'file:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 4', () => {
        const base = 'https://foo.com/dir/';
        const input = 'file:root/main.js.map';
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

      it('normalizes file protocol 1', () => {
        const base = 'https://foo.com/dir/file';
        const input = 'file:///root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 2', () => {
        const base = 'https://foo.com/dir/file';
        const input = 'file://root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/main.js.map');
      });

      it('normalizes file protocol 2.5', () => {
        const base = 'https://foo.com/dir/file';
        const input = 'file://root';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/');
      });

      it('normalizes file protocol 3', () => {
        const base = 'https://foo.com/dir/file';
        const input = 'file:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 4', () => {
        const base = 'https://foo.com/dir/file';
        const input = 'file:root/main.js.map';
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

      it('normalizes file protocol 1', () => {
        const base = 'https://foo.com/..';
        const input = 'file:///root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 2', () => {
        const base = 'https://foo.com/..';
        const input = 'file://root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/main.js.map');
      });

      it('normalizes file protocol 2.5', () => {
        const base = 'https://foo.com/..';
        const input = 'file://root';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/');
      });

      it('normalizes file protocol 3', () => {
        const base = 'https://foo.com/..';
        const input = 'file:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 4', () => {
        const base = 'https://foo.com/..';
        const input = 'file:root/main.js.map';
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

      it('normalizes file protocol 1', () => {
        const base = 'https://foo.com/../';
        const input = 'file:///root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 2', () => {
        const base = 'https://foo.com/../';
        const input = 'file://root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/main.js.map');
      });

      it('normalizes file protocol 2.5', () => {
        const base = 'https://foo.com/../';
        const input = 'file://root';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/');
      });

      it('normalizes file protocol 3', () => {
        const base = 'https://foo.com/../';
        const input = 'file:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 4', () => {
        const base = 'https://foo.com/../';
        const input = 'file:root/main.js.map';
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

      it('normalizes file protocol 1', () => {
        const base = 'https://foo.com/dir/..';
        const input = 'file:///root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 2', () => {
        const base = 'https://foo.com/dir/..';
        const input = 'file://root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/main.js.map');
      });

      it('normalizes file protocol 2.5', () => {
        const base = 'https://foo.com/dir/..';
        const input = 'file://root';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/');
      });

      it('normalizes file protocol 3', () => {
        const base = 'https://foo.com/dir/..';
        const input = 'file:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 4', () => {
        const base = 'https://foo.com/dir/..';
        const input = 'file:root/main.js.map';
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

  describe(`base = "https://g"`, () => {
    describe('with absolute input', () => {
      it('returns input', () => {
        const base = 'https://g';
        const input = 'https://absolute.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'https://g';
        const input = 'https://absolute.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = 'https://g';
        const input = 'https://absolute.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/');
      });

      it('normalizes current directory', () => {
        const base = 'https://g';
        const input = 'https://absolute.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'https://g';
        const input = 'https://absolute.com/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'https://g';
        const input = 'https://absolute.com/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes file protocol 1', () => {
        const base = 'https://g';
        const input = 'file:///root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 2', () => {
        const base = 'https://g';
        const input = 'file://root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/main.js.map');
      });

      it('normalizes file protocol 2.5', () => {
        const base = 'https://g';
        const input = 'file://root';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/');
      });

      it('normalizes file protocol 3', () => {
        const base = 'https://g';
        const input = 'file:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 4', () => {
        const base = 'https://g';
        const input = 'file:root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });
    });

    describe('with protocol relative input', () => {
      it('resolves relative to the base protocol', () => {
        const base = 'https://g';
        const input = '//protocol-relative.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://protocol-relative.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'https://g';
        const input = '//protocol-relative.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://protocol-relative.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = 'https://g';
        const input = '//protocol-relative.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://protocol-relative.com/');
      });

      it('normalizes current directory', () => {
        const base = 'https://g';
        const input = '//protocol-relative.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'https://g';
        const input = '//protocol-relative.com/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'https://g';
        const input = '//protocol-relative.com/foo/../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://protocol-relative.com/main.js.map');
      });
    });

    describe('with absolute path input', () => {
      it('remains absolute path', () => {
        const base = 'https://g';
        const input = '/assets/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://g/assets/main.js.map');
      });

      it('trims to root', () => {
        const base = 'https://g';
        const input = '/';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://g/');
      });

      it('normalizes input', () => {
        const base = 'https://g';
        const input = '/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://g/foo/main.js.map');
      });

      it('normalizes current directory', () => {
        const base = 'https://g';
        const input = '/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://g/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'https://g';
        const input = '/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://g/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'https://g';
        const input = '/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://g/main.js.map');
      });
    });

    describe('with leading dot relative input', () => {
      it('resolves relative to current directory', () => {
        const base = 'https://g';
        const input = './bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://g/bar/main.js.map');
      });

      it('resolves relative to parent directory', () => {
        const base = 'https://g';
        const input = '../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://g/bar/main.js.map');
      });

      it('resolves relative to parent multiple directory', () => {
        const base = 'https://g';
        const input = '../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://g/bar/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'https://g';
        const input = './foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://g/foo/main.js.map');
      });
    });

    describe('with relative input', () => {
      it('resolves relative to current directory', () => {
        const base = 'https://g';
        const input = 'bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://g/bar/main.js.map');
      });

      it('resolves relative to parent multiple directory, later', () => {
        const base = 'https://g';
        const input = 'foo/../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://g/bar/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'https://g';
        const input = 'foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://g/foo/main.js.map');
      });

      it('resolves node_module scope as path', () => {
        const base = 'https://g';
        const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(
          resolved,
          'https://g/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js'
        );
      });

      it('resolves package scope as path', () => {
        const base = 'https://g';
        const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://g/@babel/runtime/helpers/esm/arrayLikeToArray.js');
      });
    });

    describe('empty input', () => {
      it('normalizes base', () => {
        const base = 'https://g';
        const input = '';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://g/');
      });
    });
  });

  describe(`base = "https://g/"`, () => {
    describe('with absolute input', () => {
      it('returns input', () => {
        const base = 'https://g/';
        const input = 'https://absolute.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'https://g/';
        const input = 'https://absolute.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = 'https://g/';
        const input = 'https://absolute.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/');
      });

      it('normalizes current directory', () => {
        const base = 'https://g/';
        const input = 'https://absolute.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'https://g/';
        const input = 'https://absolute.com/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'https://g/';
        const input = 'https://absolute.com/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes file protocol 1', () => {
        const base = 'https://g/';
        const input = 'file:///root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 2', () => {
        const base = 'https://g/';
        const input = 'file://root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/main.js.map');
      });

      it('normalizes file protocol 2.5', () => {
        const base = 'https://g/';
        const input = 'file://root';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/');
      });

      it('normalizes file protocol 3', () => {
        const base = 'https://g/';
        const input = 'file:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 4', () => {
        const base = 'https://g/';
        const input = 'file:root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });
    });

    describe('with protocol relative input', () => {
      it('resolves relative to the base protocol', () => {
        const base = 'https://g/';
        const input = '//protocol-relative.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://protocol-relative.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'https://g/';
        const input = '//protocol-relative.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://protocol-relative.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = 'https://g/';
        const input = '//protocol-relative.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://protocol-relative.com/');
      });

      it('normalizes current directory', () => {
        const base = 'https://g/';
        const input = '//protocol-relative.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'https://g/';
        const input = '//protocol-relative.com/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'https://g/';
        const input = '//protocol-relative.com/foo/../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://protocol-relative.com/main.js.map');
      });
    });

    describe('with absolute path input', () => {
      it('remains absolute path', () => {
        const base = 'https://g/';
        const input = '/assets/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://g/assets/main.js.map');
      });

      it('trims to root', () => {
        const base = 'https://g/';
        const input = '/';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://g/');
      });

      it('normalizes input', () => {
        const base = 'https://g/';
        const input = '/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://g/foo/main.js.map');
      });

      it('normalizes current directory', () => {
        const base = 'https://g/';
        const input = '/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://g/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'https://g/';
        const input = '/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://g/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'https://g/';
        const input = '/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://g/main.js.map');
      });
    });

    describe('with leading dot relative input', () => {
      it('resolves relative to current directory', () => {
        const base = 'https://g/';
        const input = './bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://g/bar/main.js.map');
      });

      it('resolves relative to parent directory', () => {
        const base = 'https://g/';
        const input = '../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://g/bar/main.js.map');
      });

      it('resolves relative to parent multiple directory', () => {
        const base = 'https://g/';
        const input = '../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://g/bar/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'https://g/';
        const input = './foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://g/foo/main.js.map');
      });
    });

    describe('with relative input', () => {
      it('resolves relative to current directory', () => {
        const base = 'https://g/';
        const input = 'bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://g/bar/main.js.map');
      });

      it('resolves relative to parent multiple directory, later', () => {
        const base = 'https://g/';
        const input = 'foo/../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://g/bar/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'https://g/';
        const input = 'foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://g/foo/main.js.map');
      });

      it('resolves node_module scope as path', () => {
        const base = 'https://g/';
        const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(
          resolved,
          'https://g/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js'
        );
      });

      it('resolves package scope as path', () => {
        const base = 'https://g/';
        const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://g/@babel/runtime/helpers/esm/arrayLikeToArray.js');
      });
    });

    describe('empty input', () => {
      it('normalizes base', () => {
        const base = 'https://g/';
        const input = '';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://g/');
      });
    });
  });

  describe(`base = "https://g/file"`, () => {
    describe('with absolute input', () => {
      it('returns input', () => {
        const base = 'https://g/file';
        const input = 'https://absolute.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'https://g/file';
        const input = 'https://absolute.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = 'https://g/file';
        const input = 'https://absolute.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/');
      });

      it('normalizes current directory', () => {
        const base = 'https://g/file';
        const input = 'https://absolute.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'https://g/file';
        const input = 'https://absolute.com/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'https://g/file';
        const input = 'https://absolute.com/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes file protocol 1', () => {
        const base = 'https://g/file';
        const input = 'file:///root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 2', () => {
        const base = 'https://g/file';
        const input = 'file://root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/main.js.map');
      });

      it('normalizes file protocol 2.5', () => {
        const base = 'https://g/file';
        const input = 'file://root';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/');
      });

      it('normalizes file protocol 3', () => {
        const base = 'https://g/file';
        const input = 'file:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 4', () => {
        const base = 'https://g/file';
        const input = 'file:root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });
    });

    describe('with protocol relative input', () => {
      it('resolves relative to the base protocol', () => {
        const base = 'https://g/file';
        const input = '//protocol-relative.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://protocol-relative.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'https://g/file';
        const input = '//protocol-relative.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://protocol-relative.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = 'https://g/file';
        const input = '//protocol-relative.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://protocol-relative.com/');
      });

      it('normalizes current directory', () => {
        const base = 'https://g/file';
        const input = '//protocol-relative.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'https://g/file';
        const input = '//protocol-relative.com/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'https://g/file';
        const input = '//protocol-relative.com/foo/../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://protocol-relative.com/main.js.map');
      });
    });

    describe('with absolute path input', () => {
      it('remains absolute path', () => {
        const base = 'https://g/file';
        const input = '/assets/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://g/assets/main.js.map');
      });

      it('trims to root', () => {
        const base = 'https://g/file';
        const input = '/';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://g/');
      });

      it('normalizes input', () => {
        const base = 'https://g/file';
        const input = '/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://g/foo/main.js.map');
      });

      it('normalizes current directory', () => {
        const base = 'https://g/file';
        const input = '/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://g/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'https://g/file';
        const input = '/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://g/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'https://g/file';
        const input = '/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://g/main.js.map');
      });
    });

    describe('with leading dot relative input', () => {
      it('resolves relative to current directory', () => {
        const base = 'https://g/file';
        const input = './bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://g/bar/main.js.map');
      });

      it('resolves relative to parent directory', () => {
        const base = 'https://g/file';
        const input = '../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://g/bar/main.js.map');
      });

      it('resolves relative to parent multiple directory', () => {
        const base = 'https://g/file';
        const input = '../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://g/bar/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'https://g/file';
        const input = './foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://g/foo/main.js.map');
      });
    });

    describe('with relative input', () => {
      it('resolves relative to current directory', () => {
        const base = 'https://g/file';
        const input = 'bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://g/bar/main.js.map');
      });

      it('resolves relative to parent multiple directory, later', () => {
        const base = 'https://g/file';
        const input = 'foo/../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://g/bar/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'https://g/file';
        const input = 'foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://g/foo/main.js.map');
      });

      it('resolves node_module scope as path', () => {
        const base = 'https://g/file';
        const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(
          resolved,
          'https://g/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js'
        );
      });

      it('resolves package scope as path', () => {
        const base = 'https://g/file';
        const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://g/@babel/runtime/helpers/esm/arrayLikeToArray.js');
      });
    });

    describe('empty input', () => {
      it('normalizes base', () => {
        const base = 'https://g/file';
        const input = '';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://g/file');
      });
    });
  });

  describe(`base = "https://g/dir/"`, () => {
    describe('with absolute input', () => {
      it('returns input', () => {
        const base = 'https://g/dir/';
        const input = 'https://absolute.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'https://g/dir/';
        const input = 'https://absolute.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = 'https://g/dir/';
        const input = 'https://absolute.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/');
      });

      it('normalizes current directory', () => {
        const base = 'https://g/dir/';
        const input = 'https://absolute.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'https://g/dir/';
        const input = 'https://absolute.com/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'https://g/dir/';
        const input = 'https://absolute.com/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes file protocol 1', () => {
        const base = 'https://g/dir/';
        const input = 'file:///root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 2', () => {
        const base = 'https://g/dir/';
        const input = 'file://root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/main.js.map');
      });

      it('normalizes file protocol 2.5', () => {
        const base = 'https://g/dir/';
        const input = 'file://root';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/');
      });

      it('normalizes file protocol 3', () => {
        const base = 'https://g/dir/';
        const input = 'file:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 4', () => {
        const base = 'https://g/dir/';
        const input = 'file:root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });
    });

    describe('with protocol relative input', () => {
      it('resolves relative to the base protocol', () => {
        const base = 'https://g/dir/';
        const input = '//protocol-relative.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://protocol-relative.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'https://g/dir/';
        const input = '//protocol-relative.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://protocol-relative.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = 'https://g/dir/';
        const input = '//protocol-relative.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://protocol-relative.com/');
      });

      it('normalizes current directory', () => {
        const base = 'https://g/dir/';
        const input = '//protocol-relative.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'https://g/dir/';
        const input = '//protocol-relative.com/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'https://g/dir/';
        const input = '//protocol-relative.com/foo/../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://protocol-relative.com/main.js.map');
      });
    });

    describe('with absolute path input', () => {
      it('remains absolute path', () => {
        const base = 'https://g/dir/';
        const input = '/assets/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://g/assets/main.js.map');
      });

      it('trims to root', () => {
        const base = 'https://g/dir/';
        const input = '/';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://g/');
      });

      it('normalizes input', () => {
        const base = 'https://g/dir/';
        const input = '/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://g/foo/main.js.map');
      });

      it('normalizes current directory', () => {
        const base = 'https://g/dir/';
        const input = '/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://g/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'https://g/dir/';
        const input = '/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://g/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'https://g/dir/';
        const input = '/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://g/main.js.map');
      });
    });

    describe('with leading dot relative input', () => {
      it('resolves relative to current directory', () => {
        const base = 'https://g/dir/';
        const input = './bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://g/dir/bar/main.js.map');
      });

      it('resolves relative to parent directory', () => {
        const base = 'https://g/dir/';
        const input = '../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://g/bar/main.js.map');
      });

      it('resolves relative to parent multiple directory', () => {
        const base = 'https://g/dir/';
        const input = '../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://g/bar/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'https://g/dir/';
        const input = './foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://g/dir/foo/main.js.map');
      });
    });

    describe('with relative input', () => {
      it('resolves relative to current directory', () => {
        const base = 'https://g/dir/';
        const input = 'bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://g/dir/bar/main.js.map');
      });

      it('resolves relative to parent multiple directory, later', () => {
        const base = 'https://g/dir/';
        const input = 'foo/../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://g/bar/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'https://g/dir/';
        const input = 'foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://g/dir/foo/main.js.map');
      });

      it('resolves node_module scope as path', () => {
        const base = 'https://g/dir/';
        const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(
          resolved,
          'https://g/dir/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js'
        );
      });

      it('resolves package scope as path', () => {
        const base = 'https://g/dir/';
        const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(
          resolved,
          'https://g/dir/@babel/runtime/helpers/esm/arrayLikeToArray.js'
        );
      });
    });

    describe('empty input', () => {
      it('normalizes base', () => {
        const base = 'https://g/dir/';
        const input = '';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://g/dir/');
      });
    });
  });

  describe(`base = "https://g/dir/file"`, () => {
    describe('with absolute input', () => {
      it('returns input', () => {
        const base = 'https://g/dir/file';
        const input = 'https://absolute.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'https://g/dir/file';
        const input = 'https://absolute.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = 'https://g/dir/file';
        const input = 'https://absolute.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/');
      });

      it('normalizes current directory', () => {
        const base = 'https://g/dir/file';
        const input = 'https://absolute.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'https://g/dir/file';
        const input = 'https://absolute.com/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'https://g/dir/file';
        const input = 'https://absolute.com/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes file protocol 1', () => {
        const base = 'https://g/dir/file';
        const input = 'file:///root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 2', () => {
        const base = 'https://g/dir/file';
        const input = 'file://root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/main.js.map');
      });

      it('normalizes file protocol 2.5', () => {
        const base = 'https://g/dir/file';
        const input = 'file://root';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/');
      });

      it('normalizes file protocol 3', () => {
        const base = 'https://g/dir/file';
        const input = 'file:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 4', () => {
        const base = 'https://g/dir/file';
        const input = 'file:root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });
    });

    describe('with protocol relative input', () => {
      it('resolves relative to the base protocol', () => {
        const base = 'https://g/dir/file';
        const input = '//protocol-relative.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://protocol-relative.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'https://g/dir/file';
        const input = '//protocol-relative.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://protocol-relative.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = 'https://g/dir/file';
        const input = '//protocol-relative.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://protocol-relative.com/');
      });

      it('normalizes current directory', () => {
        const base = 'https://g/dir/file';
        const input = '//protocol-relative.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'https://g/dir/file';
        const input = '//protocol-relative.com/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'https://g/dir/file';
        const input = '//protocol-relative.com/foo/../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://protocol-relative.com/main.js.map');
      });
    });

    describe('with absolute path input', () => {
      it('remains absolute path', () => {
        const base = 'https://g/dir/file';
        const input = '/assets/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://g/assets/main.js.map');
      });

      it('trims to root', () => {
        const base = 'https://g/dir/file';
        const input = '/';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://g/');
      });

      it('normalizes input', () => {
        const base = 'https://g/dir/file';
        const input = '/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://g/foo/main.js.map');
      });

      it('normalizes current directory', () => {
        const base = 'https://g/dir/file';
        const input = '/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://g/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'https://g/dir/file';
        const input = '/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://g/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'https://g/dir/file';
        const input = '/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://g/main.js.map');
      });
    });

    describe('with leading dot relative input', () => {
      it('resolves relative to current directory', () => {
        const base = 'https://g/dir/file';
        const input = './bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://g/dir/bar/main.js.map');
      });

      it('resolves relative to parent directory', () => {
        const base = 'https://g/dir/file';
        const input = '../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://g/bar/main.js.map');
      });

      it('resolves relative to parent multiple directory', () => {
        const base = 'https://g/dir/file';
        const input = '../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://g/bar/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'https://g/dir/file';
        const input = './foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://g/dir/foo/main.js.map');
      });
    });

    describe('with relative input', () => {
      it('resolves relative to current directory', () => {
        const base = 'https://g/dir/file';
        const input = 'bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://g/dir/bar/main.js.map');
      });

      it('resolves relative to parent multiple directory, later', () => {
        const base = 'https://g/dir/file';
        const input = 'foo/../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://g/bar/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'https://g/dir/file';
        const input = 'foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://g/dir/foo/main.js.map');
      });

      it('resolves node_module scope as path', () => {
        const base = 'https://g/dir/file';
        const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(
          resolved,
          'https://g/dir/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js'
        );
      });

      it('resolves package scope as path', () => {
        const base = 'https://g/dir/file';
        const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(
          resolved,
          'https://g/dir/@babel/runtime/helpers/esm/arrayLikeToArray.js'
        );
      });
    });

    describe('empty input', () => {
      it('normalizes base', () => {
        const base = 'https://g/dir/file';
        const input = '';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://g/dir/file');
      });
    });
  });

  describe(`base = "https://g/.."`, () => {
    describe('with absolute input', () => {
      it('returns input', () => {
        const base = 'https://g/..';
        const input = 'https://absolute.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'https://g/..';
        const input = 'https://absolute.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = 'https://g/..';
        const input = 'https://absolute.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/');
      });

      it('normalizes current directory', () => {
        const base = 'https://g/..';
        const input = 'https://absolute.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'https://g/..';
        const input = 'https://absolute.com/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'https://g/..';
        const input = 'https://absolute.com/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes file protocol 1', () => {
        const base = 'https://g/..';
        const input = 'file:///root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 2', () => {
        const base = 'https://g/..';
        const input = 'file://root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/main.js.map');
      });

      it('normalizes file protocol 2.5', () => {
        const base = 'https://g/..';
        const input = 'file://root';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/');
      });

      it('normalizes file protocol 3', () => {
        const base = 'https://g/..';
        const input = 'file:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 4', () => {
        const base = 'https://g/..';
        const input = 'file:root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });
    });

    describe('with protocol relative input', () => {
      it('resolves relative to the base protocol', () => {
        const base = 'https://g/..';
        const input = '//protocol-relative.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://protocol-relative.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'https://g/..';
        const input = '//protocol-relative.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://protocol-relative.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = 'https://g/..';
        const input = '//protocol-relative.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://protocol-relative.com/');
      });

      it('normalizes current directory', () => {
        const base = 'https://g/..';
        const input = '//protocol-relative.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'https://g/..';
        const input = '//protocol-relative.com/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'https://g/..';
        const input = '//protocol-relative.com/foo/../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://protocol-relative.com/main.js.map');
      });
    });

    describe('with absolute path input', () => {
      it('remains absolute path', () => {
        const base = 'https://g/..';
        const input = '/assets/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://g/assets/main.js.map');
      });

      it('trims to root', () => {
        const base = 'https://g/..';
        const input = '/';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://g/');
      });

      it('normalizes input', () => {
        const base = 'https://g/..';
        const input = '/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://g/foo/main.js.map');
      });

      it('normalizes current directory', () => {
        const base = 'https://g/..';
        const input = '/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://g/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'https://g/..';
        const input = '/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://g/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'https://g/..';
        const input = '/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://g/main.js.map');
      });
    });

    describe('with leading dot relative input', () => {
      it('resolves relative to current directory', () => {
        const base = 'https://g/..';
        const input = './bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://g/bar/main.js.map');
      });

      it('resolves relative to parent directory', () => {
        const base = 'https://g/..';
        const input = '../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://g/bar/main.js.map');
      });

      it('resolves relative to parent multiple directory', () => {
        const base = 'https://g/..';
        const input = '../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://g/bar/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'https://g/..';
        const input = './foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://g/foo/main.js.map');
      });
    });

    describe('with relative input', () => {
      it('resolves relative to current directory', () => {
        const base = 'https://g/..';
        const input = 'bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://g/bar/main.js.map');
      });

      it('resolves relative to parent multiple directory, later', () => {
        const base = 'https://g/..';
        const input = 'foo/../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://g/bar/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'https://g/..';
        const input = 'foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://g/foo/main.js.map');
      });

      it('resolves node_module scope as path', () => {
        const base = 'https://g/..';
        const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(
          resolved,
          'https://g/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js'
        );
      });

      it('resolves package scope as path', () => {
        const base = 'https://g/..';
        const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://g/@babel/runtime/helpers/esm/arrayLikeToArray.js');
      });
    });

    describe('empty input', () => {
      it('normalizes base', () => {
        const base = 'https://g/..';
        const input = '';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://g/');
      });
    });
  });

  describe(`base = "https://g/../"`, () => {
    describe('with absolute input', () => {
      it('returns input', () => {
        const base = 'https://g/../';
        const input = 'https://absolute.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'https://g/../';
        const input = 'https://absolute.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = 'https://g/../';
        const input = 'https://absolute.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/');
      });

      it('normalizes current directory', () => {
        const base = 'https://g/../';
        const input = 'https://absolute.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'https://g/../';
        const input = 'https://absolute.com/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'https://g/../';
        const input = 'https://absolute.com/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes file protocol 1', () => {
        const base = 'https://g/../';
        const input = 'file:///root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 2', () => {
        const base = 'https://g/../';
        const input = 'file://root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/main.js.map');
      });

      it('normalizes file protocol 2.5', () => {
        const base = 'https://g/../';
        const input = 'file://root';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/');
      });

      it('normalizes file protocol 3', () => {
        const base = 'https://g/../';
        const input = 'file:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 4', () => {
        const base = 'https://g/../';
        const input = 'file:root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });
    });

    describe('with protocol relative input', () => {
      it('resolves relative to the base protocol', () => {
        const base = 'https://g/../';
        const input = '//protocol-relative.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://protocol-relative.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'https://g/../';
        const input = '//protocol-relative.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://protocol-relative.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = 'https://g/../';
        const input = '//protocol-relative.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://protocol-relative.com/');
      });

      it('normalizes current directory', () => {
        const base = 'https://g/../';
        const input = '//protocol-relative.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'https://g/../';
        const input = '//protocol-relative.com/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'https://g/../';
        const input = '//protocol-relative.com/foo/../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://protocol-relative.com/main.js.map');
      });
    });

    describe('with absolute path input', () => {
      it('remains absolute path', () => {
        const base = 'https://g/../';
        const input = '/assets/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://g/assets/main.js.map');
      });

      it('trims to root', () => {
        const base = 'https://g/../';
        const input = '/';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://g/');
      });

      it('normalizes input', () => {
        const base = 'https://g/../';
        const input = '/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://g/foo/main.js.map');
      });

      it('normalizes current directory', () => {
        const base = 'https://g/../';
        const input = '/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://g/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'https://g/../';
        const input = '/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://g/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'https://g/../';
        const input = '/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://g/main.js.map');
      });
    });

    describe('with leading dot relative input', () => {
      it('resolves relative to current directory', () => {
        const base = 'https://g/../';
        const input = './bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://g/bar/main.js.map');
      });

      it('resolves relative to parent directory', () => {
        const base = 'https://g/../';
        const input = '../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://g/bar/main.js.map');
      });

      it('resolves relative to parent multiple directory', () => {
        const base = 'https://g/../';
        const input = '../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://g/bar/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'https://g/../';
        const input = './foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://g/foo/main.js.map');
      });
    });

    describe('with relative input', () => {
      it('resolves relative to current directory', () => {
        const base = 'https://g/../';
        const input = 'bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://g/bar/main.js.map');
      });

      it('resolves relative to parent multiple directory, later', () => {
        const base = 'https://g/../';
        const input = 'foo/../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://g/bar/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'https://g/../';
        const input = 'foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://g/foo/main.js.map');
      });

      it('resolves node_module scope as path', () => {
        const base = 'https://g/../';
        const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(
          resolved,
          'https://g/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js'
        );
      });

      it('resolves package scope as path', () => {
        const base = 'https://g/../';
        const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://g/@babel/runtime/helpers/esm/arrayLikeToArray.js');
      });
    });

    describe('empty input', () => {
      it('normalizes base', () => {
        const base = 'https://g/../';
        const input = '';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://g/');
      });
    });
  });

  describe(`base = "https://g/dir/.."`, () => {
    describe('with absolute input', () => {
      it('returns input', () => {
        const base = 'https://g/dir/..';
        const input = 'https://absolute.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'https://g/dir/..';
        const input = 'https://absolute.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = 'https://g/dir/..';
        const input = 'https://absolute.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/');
      });

      it('normalizes current directory', () => {
        const base = 'https://g/dir/..';
        const input = 'https://absolute.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'https://g/dir/..';
        const input = 'https://absolute.com/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'https://g/dir/..';
        const input = 'https://absolute.com/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes file protocol 1', () => {
        const base = 'https://g/dir/..';
        const input = 'file:///root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 2', () => {
        const base = 'https://g/dir/..';
        const input = 'file://root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/main.js.map');
      });

      it('normalizes file protocol 2.5', () => {
        const base = 'https://g/dir/..';
        const input = 'file://root';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/');
      });

      it('normalizes file protocol 3', () => {
        const base = 'https://g/dir/..';
        const input = 'file:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 4', () => {
        const base = 'https://g/dir/..';
        const input = 'file:root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });
    });

    describe('with protocol relative input', () => {
      it('resolves relative to the base protocol', () => {
        const base = 'https://g/dir/..';
        const input = '//protocol-relative.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://protocol-relative.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'https://g/dir/..';
        const input = '//protocol-relative.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://protocol-relative.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = 'https://g/dir/..';
        const input = '//protocol-relative.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://protocol-relative.com/');
      });

      it('normalizes current directory', () => {
        const base = 'https://g/dir/..';
        const input = '//protocol-relative.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'https://g/dir/..';
        const input = '//protocol-relative.com/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'https://g/dir/..';
        const input = '//protocol-relative.com/foo/../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://protocol-relative.com/main.js.map');
      });
    });

    describe('with absolute path input', () => {
      it('remains absolute path', () => {
        const base = 'https://g/dir/..';
        const input = '/assets/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://g/assets/main.js.map');
      });

      it('trims to root', () => {
        const base = 'https://g/dir/..';
        const input = '/';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://g/');
      });

      it('normalizes input', () => {
        const base = 'https://g/dir/..';
        const input = '/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://g/foo/main.js.map');
      });

      it('normalizes current directory', () => {
        const base = 'https://g/dir/..';
        const input = '/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://g/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'https://g/dir/..';
        const input = '/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://g/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'https://g/dir/..';
        const input = '/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://g/main.js.map');
      });
    });

    describe('with leading dot relative input', () => {
      it('resolves relative to current directory', () => {
        const base = 'https://g/dir/..';
        const input = './bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://g/bar/main.js.map');
      });

      it('resolves relative to parent directory', () => {
        const base = 'https://g/dir/..';
        const input = '../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://g/bar/main.js.map');
      });

      it('resolves relative to parent multiple directory', () => {
        const base = 'https://g/dir/..';
        const input = '../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://g/bar/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'https://g/dir/..';
        const input = './foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://g/foo/main.js.map');
      });
    });

    describe('with relative input', () => {
      it('resolves relative to current directory', () => {
        const base = 'https://g/dir/..';
        const input = 'bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://g/bar/main.js.map');
      });

      it('resolves relative to parent multiple directory, later', () => {
        const base = 'https://g/dir/..';
        const input = 'foo/../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://g/bar/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'https://g/dir/..';
        const input = 'foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://g/foo/main.js.map');
      });

      it('resolves node_module scope as path', () => {
        const base = 'https://g/dir/..';
        const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(
          resolved,
          'https://g/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js'
        );
      });

      it('resolves package scope as path', () => {
        const base = 'https://g/dir/..';
        const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://g/@babel/runtime/helpers/esm/arrayLikeToArray.js');
      });
    });

    describe('empty input', () => {
      it('normalizes base', () => {
        const base = 'https://g/dir/..';
        const input = '';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://g/');
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

      it('normalizes file protocol 1', () => {
        const base = 'file:///foo';
        const input = 'file:///root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 2', () => {
        const base = 'file:///foo';
        const input = 'file://root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/main.js.map');
      });

      it('normalizes file protocol 2.5', () => {
        const base = 'file:///foo';
        const input = 'file://root';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/');
      });

      it('normalizes file protocol 3', () => {
        const base = 'file:///foo';
        const input = 'file:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 4', () => {
        const base = 'file:///foo';
        const input = 'file:root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });
    });

    describe('with protocol relative input', () => {
      it('resolves relative to the base protocol', () => {
        const base = 'file:///foo';
        const input = '//protocol-relative.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'file:///foo';
        const input = '//protocol-relative.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = 'file:///foo';
        const input = '//protocol-relative.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/');
      });

      it('normalizes current directory', () => {
        const base = 'file:///foo';
        const input = '//protocol-relative.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'file:///foo';
        const input = '//protocol-relative.com/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'file:///foo';
        const input = '//protocol-relative.com/foo/../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/main.js.map');
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

      it('normalizes file protocol 1', () => {
        const base = 'file:///foo/';
        const input = 'file:///root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 2', () => {
        const base = 'file:///foo/';
        const input = 'file://root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/main.js.map');
      });

      it('normalizes file protocol 2.5', () => {
        const base = 'file:///foo/';
        const input = 'file://root';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/');
      });

      it('normalizes file protocol 3', () => {
        const base = 'file:///foo/';
        const input = 'file:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 4', () => {
        const base = 'file:///foo/';
        const input = 'file:root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });
    });

    describe('with protocol relative input', () => {
      it('resolves relative to the base protocol', () => {
        const base = 'file:///foo/';
        const input = '//protocol-relative.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'file:///foo/';
        const input = '//protocol-relative.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = 'file:///foo/';
        const input = '//protocol-relative.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/');
      });

      it('normalizes current directory', () => {
        const base = 'file:///foo/';
        const input = '//protocol-relative.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'file:///foo/';
        const input = '//protocol-relative.com/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'file:///foo/';
        const input = '//protocol-relative.com/foo/../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/main.js.map');
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
        assert.strictEqual(resolved, 'file:///foo/@babel/runtime/helpers/esm/arrayLikeToArray.js');
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

      it('normalizes file protocol 1', () => {
        const base = 'file:///foo/file';
        const input = 'file:///root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 2', () => {
        const base = 'file:///foo/file';
        const input = 'file://root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/main.js.map');
      });

      it('normalizes file protocol 2.5', () => {
        const base = 'file:///foo/file';
        const input = 'file://root';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/');
      });

      it('normalizes file protocol 3', () => {
        const base = 'file:///foo/file';
        const input = 'file:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 4', () => {
        const base = 'file:///foo/file';
        const input = 'file:root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });
    });

    describe('with protocol relative input', () => {
      it('resolves relative to the base protocol', () => {
        const base = 'file:///foo/file';
        const input = '//protocol-relative.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'file:///foo/file';
        const input = '//protocol-relative.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = 'file:///foo/file';
        const input = '//protocol-relative.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/');
      });

      it('normalizes current directory', () => {
        const base = 'file:///foo/file';
        const input = '//protocol-relative.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'file:///foo/file';
        const input = '//protocol-relative.com/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'file:///foo/file';
        const input = '//protocol-relative.com/foo/../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/main.js.map');
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
        assert.strictEqual(resolved, 'file:///foo/@babel/runtime/helpers/esm/arrayLikeToArray.js');
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

      it('normalizes file protocol 1', () => {
        const base = 'file:///foo/dir/';
        const input = 'file:///root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 2', () => {
        const base = 'file:///foo/dir/';
        const input = 'file://root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/main.js.map');
      });

      it('normalizes file protocol 2.5', () => {
        const base = 'file:///foo/dir/';
        const input = 'file://root';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/');
      });

      it('normalizes file protocol 3', () => {
        const base = 'file:///foo/dir/';
        const input = 'file:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 4', () => {
        const base = 'file:///foo/dir/';
        const input = 'file:root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });
    });

    describe('with protocol relative input', () => {
      it('resolves relative to the base protocol', () => {
        const base = 'file:///foo/dir/';
        const input = '//protocol-relative.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'file:///foo/dir/';
        const input = '//protocol-relative.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = 'file:///foo/dir/';
        const input = '//protocol-relative.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/');
      });

      it('normalizes current directory', () => {
        const base = 'file:///foo/dir/';
        const input = '//protocol-relative.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'file:///foo/dir/';
        const input = '//protocol-relative.com/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'file:///foo/dir/';
        const input = '//protocol-relative.com/foo/../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/main.js.map');
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

      it('normalizes file protocol 1', () => {
        const base = 'file:///foo/dir/file';
        const input = 'file:///root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 2', () => {
        const base = 'file:///foo/dir/file';
        const input = 'file://root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/main.js.map');
      });

      it('normalizes file protocol 2.5', () => {
        const base = 'file:///foo/dir/file';
        const input = 'file://root';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/');
      });

      it('normalizes file protocol 3', () => {
        const base = 'file:///foo/dir/file';
        const input = 'file:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 4', () => {
        const base = 'file:///foo/dir/file';
        const input = 'file:root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });
    });

    describe('with protocol relative input', () => {
      it('resolves relative to the base protocol', () => {
        const base = 'file:///foo/dir/file';
        const input = '//protocol-relative.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'file:///foo/dir/file';
        const input = '//protocol-relative.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = 'file:///foo/dir/file';
        const input = '//protocol-relative.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/');
      });

      it('normalizes current directory', () => {
        const base = 'file:///foo/dir/file';
        const input = '//protocol-relative.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'file:///foo/dir/file';
        const input = '//protocol-relative.com/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'file:///foo/dir/file';
        const input = '//protocol-relative.com/foo/../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/main.js.map');
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

      it('normalizes file protocol 1', () => {
        const base = 'file:///foo/..';
        const input = 'file:///root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 2', () => {
        const base = 'file:///foo/..';
        const input = 'file://root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/main.js.map');
      });

      it('normalizes file protocol 2.5', () => {
        const base = 'file:///foo/..';
        const input = 'file://root';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/');
      });

      it('normalizes file protocol 3', () => {
        const base = 'file:///foo/..';
        const input = 'file:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 4', () => {
        const base = 'file:///foo/..';
        const input = 'file:root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });
    });

    describe('with protocol relative input', () => {
      it('resolves relative to the base protocol', () => {
        const base = 'file:///foo/..';
        const input = '//protocol-relative.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'file:///foo/..';
        const input = '//protocol-relative.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = 'file:///foo/..';
        const input = '//protocol-relative.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/');
      });

      it('normalizes current directory', () => {
        const base = 'file:///foo/..';
        const input = '//protocol-relative.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'file:///foo/..';
        const input = '//protocol-relative.com/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'file:///foo/..';
        const input = '//protocol-relative.com/foo/../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/main.js.map');
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

      it('normalizes file protocol 1', () => {
        const base = 'file:///foo/../';
        const input = 'file:///root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 2', () => {
        const base = 'file:///foo/../';
        const input = 'file://root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/main.js.map');
      });

      it('normalizes file protocol 2.5', () => {
        const base = 'file:///foo/../';
        const input = 'file://root';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/');
      });

      it('normalizes file protocol 3', () => {
        const base = 'file:///foo/../';
        const input = 'file:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 4', () => {
        const base = 'file:///foo/../';
        const input = 'file:root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });
    });

    describe('with protocol relative input', () => {
      it('resolves relative to the base protocol', () => {
        const base = 'file:///foo/../';
        const input = '//protocol-relative.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'file:///foo/../';
        const input = '//protocol-relative.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = 'file:///foo/../';
        const input = '//protocol-relative.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/');
      });

      it('normalizes current directory', () => {
        const base = 'file:///foo/../';
        const input = '//protocol-relative.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'file:///foo/../';
        const input = '//protocol-relative.com/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'file:///foo/../';
        const input = '//protocol-relative.com/foo/../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/main.js.map');
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

      it('normalizes file protocol 1', () => {
        const base = 'file:///foo/dir/..';
        const input = 'file:///root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 2', () => {
        const base = 'file:///foo/dir/..';
        const input = 'file://root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/main.js.map');
      });

      it('normalizes file protocol 2.5', () => {
        const base = 'file:///foo/dir/..';
        const input = 'file://root';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/');
      });

      it('normalizes file protocol 3', () => {
        const base = 'file:///foo/dir/..';
        const input = 'file:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 4', () => {
        const base = 'file:///foo/dir/..';
        const input = 'file:root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });
    });

    describe('with protocol relative input', () => {
      it('resolves relative to the base protocol', () => {
        const base = 'file:///foo/dir/..';
        const input = '//protocol-relative.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'file:///foo/dir/..';
        const input = '//protocol-relative.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = 'file:///foo/dir/..';
        const input = '//protocol-relative.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/');
      });

      it('normalizes current directory', () => {
        const base = 'file:///foo/dir/..';
        const input = '//protocol-relative.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'file:///foo/dir/..';
        const input = '//protocol-relative.com/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'file:///foo/dir/..';
        const input = '//protocol-relative.com/foo/../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/main.js.map');
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
        assert.strictEqual(resolved, 'file:///foo/@babel/runtime/helpers/esm/arrayLikeToArray.js');
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

  describe(`base = "file://foo"`, () => {
    describe('with absolute input', () => {
      it('returns input', () => {
        const base = 'file://foo';
        const input = 'https://absolute.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'file://foo';
        const input = 'https://absolute.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = 'file://foo';
        const input = 'https://absolute.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/');
      });

      it('normalizes current directory', () => {
        const base = 'file://foo';
        const input = 'https://absolute.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'file://foo';
        const input = 'https://absolute.com/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'file://foo';
        const input = 'https://absolute.com/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes file protocol 1', () => {
        const base = 'file://foo';
        const input = 'file:///root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 2', () => {
        const base = 'file://foo';
        const input = 'file://root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/main.js.map');
      });

      it('normalizes file protocol 2.5', () => {
        const base = 'file://foo';
        const input = 'file://root';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/');
      });

      it('normalizes file protocol 3', () => {
        const base = 'file://foo';
        const input = 'file:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 4', () => {
        const base = 'file://foo';
        const input = 'file:root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });
    });

    describe('with protocol relative input', () => {
      it('resolves relative to the base protocol', () => {
        const base = 'file://foo';
        const input = '//protocol-relative.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'file://foo';
        const input = '//protocol-relative.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = 'file://foo';
        const input = '//protocol-relative.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/');
      });

      it('normalizes current directory', () => {
        const base = 'file://foo';
        const input = '//protocol-relative.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'file://foo';
        const input = '//protocol-relative.com/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'file://foo';
        const input = '//protocol-relative.com/foo/../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/main.js.map');
      });
    });

    describe('with absolute path input', () => {
      it('remains absolute path', () => {
        const base = 'file://foo';
        const input = '/assets/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://foo/assets/main.js.map');
      });

      it('trims to root', () => {
        const base = 'file://foo';
        const input = '/';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://foo/');
      });

      it('normalizes input', () => {
        const base = 'file://foo';
        const input = '/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://foo/foo/main.js.map');
      });

      it('normalizes current directory', () => {
        const base = 'file://foo';
        const input = '/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://foo/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'file://foo';
        const input = '/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://foo/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'file://foo';
        const input = '/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://foo/main.js.map');
      });
    });

    describe('with leading dot relative input', () => {
      it('resolves relative to current directory', () => {
        const base = 'file://foo';
        const input = './bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://foo/bar/main.js.map');
      });

      it('resolves relative to parent directory', () => {
        const base = 'file://foo';
        const input = '../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://foo/bar/main.js.map');
      });

      it('resolves relative to parent multiple directory', () => {
        const base = 'file://foo';
        const input = '../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://foo/bar/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'file://foo';
        const input = './foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://foo/foo/main.js.map');
      });
    });

    describe('with relative input', () => {
      it('resolves relative to current directory', () => {
        const base = 'file://foo';
        const input = 'bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://foo/bar/main.js.map');
      });

      it('resolves relative to parent multiple directory, later', () => {
        const base = 'file://foo';
        const input = 'foo/../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://foo/bar/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'file://foo';
        const input = 'foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://foo/foo/main.js.map');
      });

      it('resolves node_module scope as path', () => {
        const base = 'file://foo';
        const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(
          resolved,
          'file://foo/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js'
        );
      });

      it('resolves package scope as path', () => {
        const base = 'file://foo';
        const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://foo/@babel/runtime/helpers/esm/arrayLikeToArray.js');
      });
    });

    describe('empty input', () => {
      it('normalizes base', () => {
        const base = 'file://foo';
        const input = '';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://foo/');
      });
    });
  });

  describe(`base = "file://foo/"`, () => {
    describe('with absolute input', () => {
      it('returns input', () => {
        const base = 'file://foo/';
        const input = 'https://absolute.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'file://foo/';
        const input = 'https://absolute.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = 'file://foo/';
        const input = 'https://absolute.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/');
      });

      it('normalizes current directory', () => {
        const base = 'file://foo/';
        const input = 'https://absolute.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'file://foo/';
        const input = 'https://absolute.com/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'file://foo/';
        const input = 'https://absolute.com/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes file protocol 1', () => {
        const base = 'file://foo/';
        const input = 'file:///root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 2', () => {
        const base = 'file://foo/';
        const input = 'file://root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/main.js.map');
      });

      it('normalizes file protocol 2.5', () => {
        const base = 'file://foo/';
        const input = 'file://root';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/');
      });

      it('normalizes file protocol 3', () => {
        const base = 'file://foo/';
        const input = 'file:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 4', () => {
        const base = 'file://foo/';
        const input = 'file:root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });
    });

    describe('with protocol relative input', () => {
      it('resolves relative to the base protocol', () => {
        const base = 'file://foo/';
        const input = '//protocol-relative.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'file://foo/';
        const input = '//protocol-relative.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = 'file://foo/';
        const input = '//protocol-relative.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/');
      });

      it('normalizes current directory', () => {
        const base = 'file://foo/';
        const input = '//protocol-relative.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'file://foo/';
        const input = '//protocol-relative.com/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'file://foo/';
        const input = '//protocol-relative.com/foo/../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/main.js.map');
      });
    });

    describe('with absolute path input', () => {
      it('remains absolute path', () => {
        const base = 'file://foo/';
        const input = '/assets/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://foo/assets/main.js.map');
      });

      it('trims to root', () => {
        const base = 'file://foo/';
        const input = '/';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://foo/');
      });

      it('normalizes input', () => {
        const base = 'file://foo/';
        const input = '/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://foo/foo/main.js.map');
      });

      it('normalizes current directory', () => {
        const base = 'file://foo/';
        const input = '/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://foo/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'file://foo/';
        const input = '/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://foo/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'file://foo/';
        const input = '/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://foo/main.js.map');
      });
    });

    describe('with leading dot relative input', () => {
      it('resolves relative to current directory', () => {
        const base = 'file://foo/';
        const input = './bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://foo/bar/main.js.map');
      });

      it('resolves relative to parent directory', () => {
        const base = 'file://foo/';
        const input = '../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://foo/bar/main.js.map');
      });

      it('resolves relative to parent multiple directory', () => {
        const base = 'file://foo/';
        const input = '../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://foo/bar/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'file://foo/';
        const input = './foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://foo/foo/main.js.map');
      });
    });

    describe('with relative input', () => {
      it('resolves relative to current directory', () => {
        const base = 'file://foo/';
        const input = 'bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://foo/bar/main.js.map');
      });

      it('resolves relative to parent multiple directory, later', () => {
        const base = 'file://foo/';
        const input = 'foo/../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://foo/bar/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'file://foo/';
        const input = 'foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://foo/foo/main.js.map');
      });

      it('resolves node_module scope as path', () => {
        const base = 'file://foo/';
        const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(
          resolved,
          'file://foo/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js'
        );
      });

      it('resolves package scope as path', () => {
        const base = 'file://foo/';
        const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://foo/@babel/runtime/helpers/esm/arrayLikeToArray.js');
      });
    });

    describe('empty input', () => {
      it('normalizes base', () => {
        const base = 'file://foo/';
        const input = '';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://foo/');
      });
    });
  });

  describe(`base = "file://foo/file"`, () => {
    describe('with absolute input', () => {
      it('returns input', () => {
        const base = 'file://foo/file';
        const input = 'https://absolute.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'file://foo/file';
        const input = 'https://absolute.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = 'file://foo/file';
        const input = 'https://absolute.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/');
      });

      it('normalizes current directory', () => {
        const base = 'file://foo/file';
        const input = 'https://absolute.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'file://foo/file';
        const input = 'https://absolute.com/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'file://foo/file';
        const input = 'https://absolute.com/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes file protocol 1', () => {
        const base = 'file://foo/file';
        const input = 'file:///root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 2', () => {
        const base = 'file://foo/file';
        const input = 'file://root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/main.js.map');
      });

      it('normalizes file protocol 2.5', () => {
        const base = 'file://foo/file';
        const input = 'file://root';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/');
      });

      it('normalizes file protocol 3', () => {
        const base = 'file://foo/file';
        const input = 'file:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 4', () => {
        const base = 'file://foo/file';
        const input = 'file:root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });
    });

    describe('with protocol relative input', () => {
      it('resolves relative to the base protocol', () => {
        const base = 'file://foo/file';
        const input = '//protocol-relative.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'file://foo/file';
        const input = '//protocol-relative.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = 'file://foo/file';
        const input = '//protocol-relative.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/');
      });

      it('normalizes current directory', () => {
        const base = 'file://foo/file';
        const input = '//protocol-relative.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'file://foo/file';
        const input = '//protocol-relative.com/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'file://foo/file';
        const input = '//protocol-relative.com/foo/../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/main.js.map');
      });
    });

    describe('with absolute path input', () => {
      it('remains absolute path', () => {
        const base = 'file://foo/file';
        const input = '/assets/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://foo/assets/main.js.map');
      });

      it('trims to root', () => {
        const base = 'file://foo/file';
        const input = '/';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://foo/');
      });

      it('normalizes input', () => {
        const base = 'file://foo/file';
        const input = '/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://foo/foo/main.js.map');
      });

      it('normalizes current directory', () => {
        const base = 'file://foo/file';
        const input = '/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://foo/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'file://foo/file';
        const input = '/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://foo/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'file://foo/file';
        const input = '/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://foo/main.js.map');
      });
    });

    describe('with leading dot relative input', () => {
      it('resolves relative to current directory', () => {
        const base = 'file://foo/file';
        const input = './bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://foo/bar/main.js.map');
      });

      it('resolves relative to parent directory', () => {
        const base = 'file://foo/file';
        const input = '../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://foo/bar/main.js.map');
      });

      it('resolves relative to parent multiple directory', () => {
        const base = 'file://foo/file';
        const input = '../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://foo/bar/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'file://foo/file';
        const input = './foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://foo/foo/main.js.map');
      });
    });

    describe('with relative input', () => {
      it('resolves relative to current directory', () => {
        const base = 'file://foo/file';
        const input = 'bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://foo/bar/main.js.map');
      });

      it('resolves relative to parent multiple directory, later', () => {
        const base = 'file://foo/file';
        const input = 'foo/../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://foo/bar/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'file://foo/file';
        const input = 'foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://foo/foo/main.js.map');
      });

      it('resolves node_module scope as path', () => {
        const base = 'file://foo/file';
        const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(
          resolved,
          'file://foo/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js'
        );
      });

      it('resolves package scope as path', () => {
        const base = 'file://foo/file';
        const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://foo/@babel/runtime/helpers/esm/arrayLikeToArray.js');
      });
    });

    describe('empty input', () => {
      it('normalizes base', () => {
        const base = 'file://foo/file';
        const input = '';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://foo/file');
      });
    });
  });

  describe(`base = "file://foo/dir/"`, () => {
    describe('with absolute input', () => {
      it('returns input', () => {
        const base = 'file://foo/dir/';
        const input = 'https://absolute.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'file://foo/dir/';
        const input = 'https://absolute.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = 'file://foo/dir/';
        const input = 'https://absolute.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/');
      });

      it('normalizes current directory', () => {
        const base = 'file://foo/dir/';
        const input = 'https://absolute.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'file://foo/dir/';
        const input = 'https://absolute.com/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'file://foo/dir/';
        const input = 'https://absolute.com/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes file protocol 1', () => {
        const base = 'file://foo/dir/';
        const input = 'file:///root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 2', () => {
        const base = 'file://foo/dir/';
        const input = 'file://root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/main.js.map');
      });

      it('normalizes file protocol 2.5', () => {
        const base = 'file://foo/dir/';
        const input = 'file://root';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/');
      });

      it('normalizes file protocol 3', () => {
        const base = 'file://foo/dir/';
        const input = 'file:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 4', () => {
        const base = 'file://foo/dir/';
        const input = 'file:root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });
    });

    describe('with protocol relative input', () => {
      it('resolves relative to the base protocol', () => {
        const base = 'file://foo/dir/';
        const input = '//protocol-relative.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'file://foo/dir/';
        const input = '//protocol-relative.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = 'file://foo/dir/';
        const input = '//protocol-relative.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/');
      });

      it('normalizes current directory', () => {
        const base = 'file://foo/dir/';
        const input = '//protocol-relative.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'file://foo/dir/';
        const input = '//protocol-relative.com/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'file://foo/dir/';
        const input = '//protocol-relative.com/foo/../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/main.js.map');
      });
    });

    describe('with absolute path input', () => {
      it('remains absolute path', () => {
        const base = 'file://foo/dir/';
        const input = '/assets/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://foo/assets/main.js.map');
      });

      it('trims to root', () => {
        const base = 'file://foo/dir/';
        const input = '/';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://foo/');
      });

      it('normalizes input', () => {
        const base = 'file://foo/dir/';
        const input = '/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://foo/foo/main.js.map');
      });

      it('normalizes current directory', () => {
        const base = 'file://foo/dir/';
        const input = '/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://foo/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'file://foo/dir/';
        const input = '/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://foo/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'file://foo/dir/';
        const input = '/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://foo/main.js.map');
      });
    });

    describe('with leading dot relative input', () => {
      it('resolves relative to current directory', () => {
        const base = 'file://foo/dir/';
        const input = './bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://foo/dir/bar/main.js.map');
      });

      it('resolves relative to parent directory', () => {
        const base = 'file://foo/dir/';
        const input = '../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://foo/bar/main.js.map');
      });

      it('resolves relative to parent multiple directory', () => {
        const base = 'file://foo/dir/';
        const input = '../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://foo/bar/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'file://foo/dir/';
        const input = './foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://foo/dir/foo/main.js.map');
      });
    });

    describe('with relative input', () => {
      it('resolves relative to current directory', () => {
        const base = 'file://foo/dir/';
        const input = 'bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://foo/dir/bar/main.js.map');
      });

      it('resolves relative to parent multiple directory, later', () => {
        const base = 'file://foo/dir/';
        const input = 'foo/../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://foo/bar/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'file://foo/dir/';
        const input = 'foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://foo/dir/foo/main.js.map');
      });

      it('resolves node_module scope as path', () => {
        const base = 'file://foo/dir/';
        const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(
          resolved,
          'file://foo/dir/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js'
        );
      });

      it('resolves package scope as path', () => {
        const base = 'file://foo/dir/';
        const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(
          resolved,
          'file://foo/dir/@babel/runtime/helpers/esm/arrayLikeToArray.js'
        );
      });
    });

    describe('empty input', () => {
      it('normalizes base', () => {
        const base = 'file://foo/dir/';
        const input = '';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://foo/dir/');
      });
    });
  });

  describe(`base = "file://foo/dir/file"`, () => {
    describe('with absolute input', () => {
      it('returns input', () => {
        const base = 'file://foo/dir/file';
        const input = 'https://absolute.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'file://foo/dir/file';
        const input = 'https://absolute.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = 'file://foo/dir/file';
        const input = 'https://absolute.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/');
      });

      it('normalizes current directory', () => {
        const base = 'file://foo/dir/file';
        const input = 'https://absolute.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'file://foo/dir/file';
        const input = 'https://absolute.com/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'file://foo/dir/file';
        const input = 'https://absolute.com/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes file protocol 1', () => {
        const base = 'file://foo/dir/file';
        const input = 'file:///root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 2', () => {
        const base = 'file://foo/dir/file';
        const input = 'file://root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/main.js.map');
      });

      it('normalizes file protocol 2.5', () => {
        const base = 'file://foo/dir/file';
        const input = 'file://root';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/');
      });

      it('normalizes file protocol 3', () => {
        const base = 'file://foo/dir/file';
        const input = 'file:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 4', () => {
        const base = 'file://foo/dir/file';
        const input = 'file:root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });
    });

    describe('with protocol relative input', () => {
      it('resolves relative to the base protocol', () => {
        const base = 'file://foo/dir/file';
        const input = '//protocol-relative.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'file://foo/dir/file';
        const input = '//protocol-relative.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = 'file://foo/dir/file';
        const input = '//protocol-relative.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/');
      });

      it('normalizes current directory', () => {
        const base = 'file://foo/dir/file';
        const input = '//protocol-relative.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'file://foo/dir/file';
        const input = '//protocol-relative.com/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'file://foo/dir/file';
        const input = '//protocol-relative.com/foo/../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/main.js.map');
      });
    });

    describe('with absolute path input', () => {
      it('remains absolute path', () => {
        const base = 'file://foo/dir/file';
        const input = '/assets/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://foo/assets/main.js.map');
      });

      it('trims to root', () => {
        const base = 'file://foo/dir/file';
        const input = '/';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://foo/');
      });

      it('normalizes input', () => {
        const base = 'file://foo/dir/file';
        const input = '/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://foo/foo/main.js.map');
      });

      it('normalizes current directory', () => {
        const base = 'file://foo/dir/file';
        const input = '/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://foo/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'file://foo/dir/file';
        const input = '/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://foo/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'file://foo/dir/file';
        const input = '/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://foo/main.js.map');
      });
    });

    describe('with leading dot relative input', () => {
      it('resolves relative to current directory', () => {
        const base = 'file://foo/dir/file';
        const input = './bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://foo/dir/bar/main.js.map');
      });

      it('resolves relative to parent directory', () => {
        const base = 'file://foo/dir/file';
        const input = '../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://foo/bar/main.js.map');
      });

      it('resolves relative to parent multiple directory', () => {
        const base = 'file://foo/dir/file';
        const input = '../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://foo/bar/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'file://foo/dir/file';
        const input = './foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://foo/dir/foo/main.js.map');
      });
    });

    describe('with relative input', () => {
      it('resolves relative to current directory', () => {
        const base = 'file://foo/dir/file';
        const input = 'bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://foo/dir/bar/main.js.map');
      });

      it('resolves relative to parent multiple directory, later', () => {
        const base = 'file://foo/dir/file';
        const input = 'foo/../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://foo/bar/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'file://foo/dir/file';
        const input = 'foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://foo/dir/foo/main.js.map');
      });

      it('resolves node_module scope as path', () => {
        const base = 'file://foo/dir/file';
        const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(
          resolved,
          'file://foo/dir/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js'
        );
      });

      it('resolves package scope as path', () => {
        const base = 'file://foo/dir/file';
        const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(
          resolved,
          'file://foo/dir/@babel/runtime/helpers/esm/arrayLikeToArray.js'
        );
      });
    });

    describe('empty input', () => {
      it('normalizes base', () => {
        const base = 'file://foo/dir/file';
        const input = '';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://foo/dir/file');
      });
    });
  });

  describe(`base = "file://foo/.."`, () => {
    describe('with absolute input', () => {
      it('returns input', () => {
        const base = 'file://foo/..';
        const input = 'https://absolute.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'file://foo/..';
        const input = 'https://absolute.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = 'file://foo/..';
        const input = 'https://absolute.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/');
      });

      it('normalizes current directory', () => {
        const base = 'file://foo/..';
        const input = 'https://absolute.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'file://foo/..';
        const input = 'https://absolute.com/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'file://foo/..';
        const input = 'https://absolute.com/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes file protocol 1', () => {
        const base = 'file://foo/..';
        const input = 'file:///root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 2', () => {
        const base = 'file://foo/..';
        const input = 'file://root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/main.js.map');
      });

      it('normalizes file protocol 2.5', () => {
        const base = 'file://foo/..';
        const input = 'file://root';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/');
      });

      it('normalizes file protocol 3', () => {
        const base = 'file://foo/..';
        const input = 'file:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 4', () => {
        const base = 'file://foo/..';
        const input = 'file:root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });
    });

    describe('with protocol relative input', () => {
      it('resolves relative to the base protocol', () => {
        const base = 'file://foo/..';
        const input = '//protocol-relative.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'file://foo/..';
        const input = '//protocol-relative.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = 'file://foo/..';
        const input = '//protocol-relative.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/');
      });

      it('normalizes current directory', () => {
        const base = 'file://foo/..';
        const input = '//protocol-relative.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'file://foo/..';
        const input = '//protocol-relative.com/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'file://foo/..';
        const input = '//protocol-relative.com/foo/../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/main.js.map');
      });
    });

    describe('with absolute path input', () => {
      it('remains absolute path', () => {
        const base = 'file://foo/..';
        const input = '/assets/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://foo/assets/main.js.map');
      });

      it('trims to root', () => {
        const base = 'file://foo/..';
        const input = '/';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://foo/');
      });

      it('normalizes input', () => {
        const base = 'file://foo/..';
        const input = '/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://foo/foo/main.js.map');
      });

      it('normalizes current directory', () => {
        const base = 'file://foo/..';
        const input = '/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://foo/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'file://foo/..';
        const input = '/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://foo/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'file://foo/..';
        const input = '/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://foo/main.js.map');
      });
    });

    describe('with leading dot relative input', () => {
      it('resolves relative to current directory', () => {
        const base = 'file://foo/..';
        const input = './bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://foo/bar/main.js.map');
      });

      it('resolves relative to parent directory', () => {
        const base = 'file://foo/..';
        const input = '../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://foo/bar/main.js.map');
      });

      it('resolves relative to parent multiple directory', () => {
        const base = 'file://foo/..';
        const input = '../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://foo/bar/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'file://foo/..';
        const input = './foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://foo/foo/main.js.map');
      });
    });

    describe('with relative input', () => {
      it('resolves relative to current directory', () => {
        const base = 'file://foo/..';
        const input = 'bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://foo/bar/main.js.map');
      });

      it('resolves relative to parent multiple directory, later', () => {
        const base = 'file://foo/..';
        const input = 'foo/../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://foo/bar/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'file://foo/..';
        const input = 'foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://foo/foo/main.js.map');
      });

      it('resolves node_module scope as path', () => {
        const base = 'file://foo/..';
        const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(
          resolved,
          'file://foo/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js'
        );
      });

      it('resolves package scope as path', () => {
        const base = 'file://foo/..';
        const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://foo/@babel/runtime/helpers/esm/arrayLikeToArray.js');
      });
    });

    describe('empty input', () => {
      it('normalizes base', () => {
        const base = 'file://foo/..';
        const input = '';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://foo/');
      });
    });
  });

  describe(`base = "file://foo/../"`, () => {
    describe('with absolute input', () => {
      it('returns input', () => {
        const base = 'file://foo/../';
        const input = 'https://absolute.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'file://foo/../';
        const input = 'https://absolute.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = 'file://foo/../';
        const input = 'https://absolute.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/');
      });

      it('normalizes current directory', () => {
        const base = 'file://foo/../';
        const input = 'https://absolute.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'file://foo/../';
        const input = 'https://absolute.com/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'file://foo/../';
        const input = 'https://absolute.com/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes file protocol 1', () => {
        const base = 'file://foo/../';
        const input = 'file:///root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 2', () => {
        const base = 'file://foo/../';
        const input = 'file://root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/main.js.map');
      });

      it('normalizes file protocol 2.5', () => {
        const base = 'file://foo/../';
        const input = 'file://root';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/');
      });

      it('normalizes file protocol 3', () => {
        const base = 'file://foo/../';
        const input = 'file:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 4', () => {
        const base = 'file://foo/../';
        const input = 'file:root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });
    });

    describe('with protocol relative input', () => {
      it('resolves relative to the base protocol', () => {
        const base = 'file://foo/../';
        const input = '//protocol-relative.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'file://foo/../';
        const input = '//protocol-relative.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = 'file://foo/../';
        const input = '//protocol-relative.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/');
      });

      it('normalizes current directory', () => {
        const base = 'file://foo/../';
        const input = '//protocol-relative.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'file://foo/../';
        const input = '//protocol-relative.com/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'file://foo/../';
        const input = '//protocol-relative.com/foo/../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/main.js.map');
      });
    });

    describe('with absolute path input', () => {
      it('remains absolute path', () => {
        const base = 'file://foo/../';
        const input = '/assets/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://foo/assets/main.js.map');
      });

      it('trims to root', () => {
        const base = 'file://foo/../';
        const input = '/';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://foo/');
      });

      it('normalizes input', () => {
        const base = 'file://foo/../';
        const input = '/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://foo/foo/main.js.map');
      });

      it('normalizes current directory', () => {
        const base = 'file://foo/../';
        const input = '/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://foo/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'file://foo/../';
        const input = '/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://foo/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'file://foo/../';
        const input = '/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://foo/main.js.map');
      });
    });

    describe('with leading dot relative input', () => {
      it('resolves relative to current directory', () => {
        const base = 'file://foo/../';
        const input = './bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://foo/bar/main.js.map');
      });

      it('resolves relative to parent directory', () => {
        const base = 'file://foo/../';
        const input = '../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://foo/bar/main.js.map');
      });

      it('resolves relative to parent multiple directory', () => {
        const base = 'file://foo/../';
        const input = '../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://foo/bar/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'file://foo/../';
        const input = './foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://foo/foo/main.js.map');
      });
    });

    describe('with relative input', () => {
      it('resolves relative to current directory', () => {
        const base = 'file://foo/../';
        const input = 'bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://foo/bar/main.js.map');
      });

      it('resolves relative to parent multiple directory, later', () => {
        const base = 'file://foo/../';
        const input = 'foo/../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://foo/bar/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'file://foo/../';
        const input = 'foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://foo/foo/main.js.map');
      });

      it('resolves node_module scope as path', () => {
        const base = 'file://foo/../';
        const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(
          resolved,
          'file://foo/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js'
        );
      });

      it('resolves package scope as path', () => {
        const base = 'file://foo/../';
        const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://foo/@babel/runtime/helpers/esm/arrayLikeToArray.js');
      });
    });

    describe('empty input', () => {
      it('normalizes base', () => {
        const base = 'file://foo/../';
        const input = '';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://foo/');
      });
    });
  });

  describe(`base = "file://foo/dir/.."`, () => {
    describe('with absolute input', () => {
      it('returns input', () => {
        const base = 'file://foo/dir/..';
        const input = 'https://absolute.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'file://foo/dir/..';
        const input = 'https://absolute.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = 'file://foo/dir/..';
        const input = 'https://absolute.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/');
      });

      it('normalizes current directory', () => {
        const base = 'file://foo/dir/..';
        const input = 'https://absolute.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'file://foo/dir/..';
        const input = 'https://absolute.com/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'file://foo/dir/..';
        const input = 'https://absolute.com/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes file protocol 1', () => {
        const base = 'file://foo/dir/..';
        const input = 'file:///root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 2', () => {
        const base = 'file://foo/dir/..';
        const input = 'file://root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/main.js.map');
      });

      it('normalizes file protocol 2.5', () => {
        const base = 'file://foo/dir/..';
        const input = 'file://root';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/');
      });

      it('normalizes file protocol 3', () => {
        const base = 'file://foo/dir/..';
        const input = 'file:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 4', () => {
        const base = 'file://foo/dir/..';
        const input = 'file:root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });
    });

    describe('with protocol relative input', () => {
      it('resolves relative to the base protocol', () => {
        const base = 'file://foo/dir/..';
        const input = '//protocol-relative.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'file://foo/dir/..';
        const input = '//protocol-relative.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = 'file://foo/dir/..';
        const input = '//protocol-relative.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/');
      });

      it('normalizes current directory', () => {
        const base = 'file://foo/dir/..';
        const input = '//protocol-relative.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'file://foo/dir/..';
        const input = '//protocol-relative.com/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'file://foo/dir/..';
        const input = '//protocol-relative.com/foo/../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/main.js.map');
      });
    });

    describe('with absolute path input', () => {
      it('remains absolute path', () => {
        const base = 'file://foo/dir/..';
        const input = '/assets/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://foo/assets/main.js.map');
      });

      it('trims to root', () => {
        const base = 'file://foo/dir/..';
        const input = '/';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://foo/');
      });

      it('normalizes input', () => {
        const base = 'file://foo/dir/..';
        const input = '/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://foo/foo/main.js.map');
      });

      it('normalizes current directory', () => {
        const base = 'file://foo/dir/..';
        const input = '/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://foo/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'file://foo/dir/..';
        const input = '/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://foo/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'file://foo/dir/..';
        const input = '/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://foo/main.js.map');
      });
    });

    describe('with leading dot relative input', () => {
      it('resolves relative to current directory', () => {
        const base = 'file://foo/dir/..';
        const input = './bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://foo/bar/main.js.map');
      });

      it('resolves relative to parent directory', () => {
        const base = 'file://foo/dir/..';
        const input = '../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://foo/bar/main.js.map');
      });

      it('resolves relative to parent multiple directory', () => {
        const base = 'file://foo/dir/..';
        const input = '../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://foo/bar/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'file://foo/dir/..';
        const input = './foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://foo/foo/main.js.map');
      });
    });

    describe('with relative input', () => {
      it('resolves relative to current directory', () => {
        const base = 'file://foo/dir/..';
        const input = 'bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://foo/bar/main.js.map');
      });

      it('resolves relative to parent multiple directory, later', () => {
        const base = 'file://foo/dir/..';
        const input = 'foo/../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://foo/bar/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'file://foo/dir/..';
        const input = 'foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://foo/foo/main.js.map');
      });

      it('resolves node_module scope as path', () => {
        const base = 'file://foo/dir/..';
        const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(
          resolved,
          'file://foo/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js'
        );
      });

      it('resolves package scope as path', () => {
        const base = 'file://foo/dir/..';
        const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://foo/@babel/runtime/helpers/esm/arrayLikeToArray.js');
      });
    });

    describe('empty input', () => {
      it('normalizes base', () => {
        const base = 'file://foo/dir/..';
        const input = '';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://foo/');
      });
    });
  });

  describe(`base = "file:/foo"`, () => {
    describe('with absolute input', () => {
      it('returns input', () => {
        const base = 'file:/foo';
        const input = 'https://absolute.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'file:/foo';
        const input = 'https://absolute.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = 'file:/foo';
        const input = 'https://absolute.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/');
      });

      it('normalizes current directory', () => {
        const base = 'file:/foo';
        const input = 'https://absolute.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'file:/foo';
        const input = 'https://absolute.com/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'file:/foo';
        const input = 'https://absolute.com/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes file protocol 1', () => {
        const base = 'file:/foo';
        const input = 'file:///root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 2', () => {
        const base = 'file:/foo';
        const input = 'file://root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/main.js.map');
      });

      it('normalizes file protocol 2.5', () => {
        const base = 'file:/foo';
        const input = 'file://root';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/');
      });

      it('normalizes file protocol 3', () => {
        const base = 'file:/foo';
        const input = 'file:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 4', () => {
        const base = 'file:/foo';
        const input = 'file:root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });
    });

    describe('with protocol relative input', () => {
      it('resolves relative to the base protocol', () => {
        const base = 'file:/foo';
        const input = '//protocol-relative.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'file:/foo';
        const input = '//protocol-relative.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = 'file:/foo';
        const input = '//protocol-relative.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/');
      });

      it('normalizes current directory', () => {
        const base = 'file:/foo';
        const input = '//protocol-relative.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'file:/foo';
        const input = '//protocol-relative.com/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'file:/foo';
        const input = '//protocol-relative.com/foo/../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/main.js.map');
      });
    });

    describe('with absolute path input', () => {
      it('remains absolute path', () => {
        const base = 'file:/foo';
        const input = '/assets/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///assets/main.js.map');
      });

      it('trims to root', () => {
        const base = 'file:/foo';
        const input = '/';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///');
      });

      it('normalizes input', () => {
        const base = 'file:/foo';
        const input = '/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///foo/main.js.map');
      });

      it('normalizes current directory', () => {
        const base = 'file:/foo';
        const input = '/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'file:/foo';
        const input = '/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'file:/foo';
        const input = '/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///main.js.map');
      });
    });

    describe('with leading dot relative input', () => {
      it('resolves relative to current directory', () => {
        const base = 'file:/foo';
        const input = './bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///bar/main.js.map');
      });

      it('resolves relative to parent directory', () => {
        const base = 'file:/foo';
        const input = '../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///bar/main.js.map');
      });

      it('resolves relative to parent multiple directory', () => {
        const base = 'file:/foo';
        const input = '../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///bar/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'file:/foo';
        const input = './foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///foo/main.js.map');
      });
    });

    describe('with relative input', () => {
      it('resolves relative to current directory', () => {
        const base = 'file:/foo';
        const input = 'bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///bar/main.js.map');
      });

      it('resolves relative to parent multiple directory, later', () => {
        const base = 'file:/foo';
        const input = 'foo/../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///bar/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'file:/foo';
        const input = 'foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///foo/main.js.map');
      });

      it('resolves node_module scope as path', () => {
        const base = 'file:/foo';
        const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(
          resolved,
          'file:///node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js'
        );
      });

      it('resolves package scope as path', () => {
        const base = 'file:/foo';
        const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///@babel/runtime/helpers/esm/arrayLikeToArray.js');
      });
    });

    describe('empty input', () => {
      it('normalizes base', () => {
        const base = 'file:/foo';
        const input = '';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///foo');
      });
    });
  });

  describe(`base = "file:/foo/"`, () => {
    describe('with absolute input', () => {
      it('returns input', () => {
        const base = 'file:/foo/';
        const input = 'https://absolute.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'file:/foo/';
        const input = 'https://absolute.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = 'file:/foo/';
        const input = 'https://absolute.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/');
      });

      it('normalizes current directory', () => {
        const base = 'file:/foo/';
        const input = 'https://absolute.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'file:/foo/';
        const input = 'https://absolute.com/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'file:/foo/';
        const input = 'https://absolute.com/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes file protocol 1', () => {
        const base = 'file:/foo/';
        const input = 'file:///root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 2', () => {
        const base = 'file:/foo/';
        const input = 'file://root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/main.js.map');
      });

      it('normalizes file protocol 2.5', () => {
        const base = 'file:/foo/';
        const input = 'file://root';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/');
      });

      it('normalizes file protocol 3', () => {
        const base = 'file:/foo/';
        const input = 'file:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 4', () => {
        const base = 'file:/foo/';
        const input = 'file:root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });
    });

    describe('with protocol relative input', () => {
      it('resolves relative to the base protocol', () => {
        const base = 'file:/foo/';
        const input = '//protocol-relative.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'file:/foo/';
        const input = '//protocol-relative.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = 'file:/foo/';
        const input = '//protocol-relative.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/');
      });

      it('normalizes current directory', () => {
        const base = 'file:/foo/';
        const input = '//protocol-relative.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'file:/foo/';
        const input = '//protocol-relative.com/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'file:/foo/';
        const input = '//protocol-relative.com/foo/../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/main.js.map');
      });
    });

    describe('with absolute path input', () => {
      it('remains absolute path', () => {
        const base = 'file:/foo/';
        const input = '/assets/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///assets/main.js.map');
      });

      it('trims to root', () => {
        const base = 'file:/foo/';
        const input = '/';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///');
      });

      it('normalizes input', () => {
        const base = 'file:/foo/';
        const input = '/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///foo/main.js.map');
      });

      it('normalizes current directory', () => {
        const base = 'file:/foo/';
        const input = '/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'file:/foo/';
        const input = '/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'file:/foo/';
        const input = '/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///main.js.map');
      });
    });

    describe('with leading dot relative input', () => {
      it('resolves relative to current directory', () => {
        const base = 'file:/foo/';
        const input = './bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///foo/bar/main.js.map');
      });

      it('resolves relative to parent directory', () => {
        const base = 'file:/foo/';
        const input = '../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///bar/main.js.map');
      });

      it('resolves relative to parent multiple directory', () => {
        const base = 'file:/foo/';
        const input = '../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///bar/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'file:/foo/';
        const input = './foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///foo/foo/main.js.map');
      });
    });

    describe('with relative input', () => {
      it('resolves relative to current directory', () => {
        const base = 'file:/foo/';
        const input = 'bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///foo/bar/main.js.map');
      });

      it('resolves relative to parent multiple directory, later', () => {
        const base = 'file:/foo/';
        const input = 'foo/../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///bar/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'file:/foo/';
        const input = 'foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///foo/foo/main.js.map');
      });

      it('resolves node_module scope as path', () => {
        const base = 'file:/foo/';
        const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(
          resolved,
          'file:///foo/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js'
        );
      });

      it('resolves package scope as path', () => {
        const base = 'file:/foo/';
        const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///foo/@babel/runtime/helpers/esm/arrayLikeToArray.js');
      });
    });

    describe('empty input', () => {
      it('normalizes base', () => {
        const base = 'file:/foo/';
        const input = '';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///foo/');
      });
    });
  });

  describe(`base = "file:/foo/file"`, () => {
    describe('with absolute input', () => {
      it('returns input', () => {
        const base = 'file:/foo/file';
        const input = 'https://absolute.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'file:/foo/file';
        const input = 'https://absolute.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = 'file:/foo/file';
        const input = 'https://absolute.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/');
      });

      it('normalizes current directory', () => {
        const base = 'file:/foo/file';
        const input = 'https://absolute.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'file:/foo/file';
        const input = 'https://absolute.com/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'file:/foo/file';
        const input = 'https://absolute.com/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes file protocol 1', () => {
        const base = 'file:/foo/file';
        const input = 'file:///root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 2', () => {
        const base = 'file:/foo/file';
        const input = 'file://root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/main.js.map');
      });

      it('normalizes file protocol 2.5', () => {
        const base = 'file:/foo/file';
        const input = 'file://root';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/');
      });

      it('normalizes file protocol 3', () => {
        const base = 'file:/foo/file';
        const input = 'file:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 4', () => {
        const base = 'file:/foo/file';
        const input = 'file:root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });
    });

    describe('with protocol relative input', () => {
      it('resolves relative to the base protocol', () => {
        const base = 'file:/foo/file';
        const input = '//protocol-relative.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'file:/foo/file';
        const input = '//protocol-relative.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = 'file:/foo/file';
        const input = '//protocol-relative.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/');
      });

      it('normalizes current directory', () => {
        const base = 'file:/foo/file';
        const input = '//protocol-relative.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'file:/foo/file';
        const input = '//protocol-relative.com/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'file:/foo/file';
        const input = '//protocol-relative.com/foo/../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/main.js.map');
      });
    });

    describe('with absolute path input', () => {
      it('remains absolute path', () => {
        const base = 'file:/foo/file';
        const input = '/assets/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///assets/main.js.map');
      });

      it('trims to root', () => {
        const base = 'file:/foo/file';
        const input = '/';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///');
      });

      it('normalizes input', () => {
        const base = 'file:/foo/file';
        const input = '/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///foo/main.js.map');
      });

      it('normalizes current directory', () => {
        const base = 'file:/foo/file';
        const input = '/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'file:/foo/file';
        const input = '/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'file:/foo/file';
        const input = '/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///main.js.map');
      });
    });

    describe('with leading dot relative input', () => {
      it('resolves relative to current directory', () => {
        const base = 'file:/foo/file';
        const input = './bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///foo/bar/main.js.map');
      });

      it('resolves relative to parent directory', () => {
        const base = 'file:/foo/file';
        const input = '../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///bar/main.js.map');
      });

      it('resolves relative to parent multiple directory', () => {
        const base = 'file:/foo/file';
        const input = '../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///bar/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'file:/foo/file';
        const input = './foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///foo/foo/main.js.map');
      });
    });

    describe('with relative input', () => {
      it('resolves relative to current directory', () => {
        const base = 'file:/foo/file';
        const input = 'bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///foo/bar/main.js.map');
      });

      it('resolves relative to parent multiple directory, later', () => {
        const base = 'file:/foo/file';
        const input = 'foo/../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///bar/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'file:/foo/file';
        const input = 'foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///foo/foo/main.js.map');
      });

      it('resolves node_module scope as path', () => {
        const base = 'file:/foo/file';
        const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(
          resolved,
          'file:///foo/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js'
        );
      });

      it('resolves package scope as path', () => {
        const base = 'file:/foo/file';
        const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///foo/@babel/runtime/helpers/esm/arrayLikeToArray.js');
      });
    });

    describe('empty input', () => {
      it('normalizes base', () => {
        const base = 'file:/foo/file';
        const input = '';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///foo/file');
      });
    });
  });

  describe(`base = "file:/foo/dir/"`, () => {
    describe('with absolute input', () => {
      it('returns input', () => {
        const base = 'file:/foo/dir/';
        const input = 'https://absolute.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'file:/foo/dir/';
        const input = 'https://absolute.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = 'file:/foo/dir/';
        const input = 'https://absolute.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/');
      });

      it('normalizes current directory', () => {
        const base = 'file:/foo/dir/';
        const input = 'https://absolute.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'file:/foo/dir/';
        const input = 'https://absolute.com/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'file:/foo/dir/';
        const input = 'https://absolute.com/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes file protocol 1', () => {
        const base = 'file:/foo/dir/';
        const input = 'file:///root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 2', () => {
        const base = 'file:/foo/dir/';
        const input = 'file://root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/main.js.map');
      });

      it('normalizes file protocol 2.5', () => {
        const base = 'file:/foo/dir/';
        const input = 'file://root';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/');
      });

      it('normalizes file protocol 3', () => {
        const base = 'file:/foo/dir/';
        const input = 'file:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 4', () => {
        const base = 'file:/foo/dir/';
        const input = 'file:root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });
    });

    describe('with protocol relative input', () => {
      it('resolves relative to the base protocol', () => {
        const base = 'file:/foo/dir/';
        const input = '//protocol-relative.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'file:/foo/dir/';
        const input = '//protocol-relative.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = 'file:/foo/dir/';
        const input = '//protocol-relative.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/');
      });

      it('normalizes current directory', () => {
        const base = 'file:/foo/dir/';
        const input = '//protocol-relative.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'file:/foo/dir/';
        const input = '//protocol-relative.com/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'file:/foo/dir/';
        const input = '//protocol-relative.com/foo/../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/main.js.map');
      });
    });

    describe('with absolute path input', () => {
      it('remains absolute path', () => {
        const base = 'file:/foo/dir/';
        const input = '/assets/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///assets/main.js.map');
      });

      it('trims to root', () => {
        const base = 'file:/foo/dir/';
        const input = '/';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///');
      });

      it('normalizes input', () => {
        const base = 'file:/foo/dir/';
        const input = '/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///foo/main.js.map');
      });

      it('normalizes current directory', () => {
        const base = 'file:/foo/dir/';
        const input = '/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'file:/foo/dir/';
        const input = '/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'file:/foo/dir/';
        const input = '/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///main.js.map');
      });
    });

    describe('with leading dot relative input', () => {
      it('resolves relative to current directory', () => {
        const base = 'file:/foo/dir/';
        const input = './bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///foo/dir/bar/main.js.map');
      });

      it('resolves relative to parent directory', () => {
        const base = 'file:/foo/dir/';
        const input = '../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///foo/bar/main.js.map');
      });

      it('resolves relative to parent multiple directory', () => {
        const base = 'file:/foo/dir/';
        const input = '../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///bar/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'file:/foo/dir/';
        const input = './foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///foo/dir/foo/main.js.map');
      });
    });

    describe('with relative input', () => {
      it('resolves relative to current directory', () => {
        const base = 'file:/foo/dir/';
        const input = 'bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///foo/dir/bar/main.js.map');
      });

      it('resolves relative to parent multiple directory, later', () => {
        const base = 'file:/foo/dir/';
        const input = 'foo/../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///bar/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'file:/foo/dir/';
        const input = 'foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///foo/dir/foo/main.js.map');
      });

      it('resolves node_module scope as path', () => {
        const base = 'file:/foo/dir/';
        const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(
          resolved,
          'file:///foo/dir/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js'
        );
      });

      it('resolves package scope as path', () => {
        const base = 'file:/foo/dir/';
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
        const base = 'file:/foo/dir/';
        const input = '';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///foo/dir/');
      });
    });
  });

  describe(`base = "file:/foo/dir/file"`, () => {
    describe('with absolute input', () => {
      it('returns input', () => {
        const base = 'file:/foo/dir/file';
        const input = 'https://absolute.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'file:/foo/dir/file';
        const input = 'https://absolute.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = 'file:/foo/dir/file';
        const input = 'https://absolute.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/');
      });

      it('normalizes current directory', () => {
        const base = 'file:/foo/dir/file';
        const input = 'https://absolute.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'file:/foo/dir/file';
        const input = 'https://absolute.com/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'file:/foo/dir/file';
        const input = 'https://absolute.com/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes file protocol 1', () => {
        const base = 'file:/foo/dir/file';
        const input = 'file:///root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 2', () => {
        const base = 'file:/foo/dir/file';
        const input = 'file://root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/main.js.map');
      });

      it('normalizes file protocol 2.5', () => {
        const base = 'file:/foo/dir/file';
        const input = 'file://root';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/');
      });

      it('normalizes file protocol 3', () => {
        const base = 'file:/foo/dir/file';
        const input = 'file:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 4', () => {
        const base = 'file:/foo/dir/file';
        const input = 'file:root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });
    });

    describe('with protocol relative input', () => {
      it('resolves relative to the base protocol', () => {
        const base = 'file:/foo/dir/file';
        const input = '//protocol-relative.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'file:/foo/dir/file';
        const input = '//protocol-relative.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = 'file:/foo/dir/file';
        const input = '//protocol-relative.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/');
      });

      it('normalizes current directory', () => {
        const base = 'file:/foo/dir/file';
        const input = '//protocol-relative.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'file:/foo/dir/file';
        const input = '//protocol-relative.com/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'file:/foo/dir/file';
        const input = '//protocol-relative.com/foo/../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/main.js.map');
      });
    });

    describe('with absolute path input', () => {
      it('remains absolute path', () => {
        const base = 'file:/foo/dir/file';
        const input = '/assets/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///assets/main.js.map');
      });

      it('trims to root', () => {
        const base = 'file:/foo/dir/file';
        const input = '/';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///');
      });

      it('normalizes input', () => {
        const base = 'file:/foo/dir/file';
        const input = '/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///foo/main.js.map');
      });

      it('normalizes current directory', () => {
        const base = 'file:/foo/dir/file';
        const input = '/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'file:/foo/dir/file';
        const input = '/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'file:/foo/dir/file';
        const input = '/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///main.js.map');
      });
    });

    describe('with leading dot relative input', () => {
      it('resolves relative to current directory', () => {
        const base = 'file:/foo/dir/file';
        const input = './bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///foo/dir/bar/main.js.map');
      });

      it('resolves relative to parent directory', () => {
        const base = 'file:/foo/dir/file';
        const input = '../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///foo/bar/main.js.map');
      });

      it('resolves relative to parent multiple directory', () => {
        const base = 'file:/foo/dir/file';
        const input = '../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///bar/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'file:/foo/dir/file';
        const input = './foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///foo/dir/foo/main.js.map');
      });
    });

    describe('with relative input', () => {
      it('resolves relative to current directory', () => {
        const base = 'file:/foo/dir/file';
        const input = 'bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///foo/dir/bar/main.js.map');
      });

      it('resolves relative to parent multiple directory, later', () => {
        const base = 'file:/foo/dir/file';
        const input = 'foo/../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///bar/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'file:/foo/dir/file';
        const input = 'foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///foo/dir/foo/main.js.map');
      });

      it('resolves node_module scope as path', () => {
        const base = 'file:/foo/dir/file';
        const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(
          resolved,
          'file:///foo/dir/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js'
        );
      });

      it('resolves package scope as path', () => {
        const base = 'file:/foo/dir/file';
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
        const base = 'file:/foo/dir/file';
        const input = '';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///foo/dir/file');
      });
    });
  });

  describe(`base = "file:/foo/.."`, () => {
    describe('with absolute input', () => {
      it('returns input', () => {
        const base = 'file:/foo/..';
        const input = 'https://absolute.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'file:/foo/..';
        const input = 'https://absolute.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = 'file:/foo/..';
        const input = 'https://absolute.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/');
      });

      it('normalizes current directory', () => {
        const base = 'file:/foo/..';
        const input = 'https://absolute.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'file:/foo/..';
        const input = 'https://absolute.com/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'file:/foo/..';
        const input = 'https://absolute.com/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes file protocol 1', () => {
        const base = 'file:/foo/..';
        const input = 'file:///root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 2', () => {
        const base = 'file:/foo/..';
        const input = 'file://root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/main.js.map');
      });

      it('normalizes file protocol 2.5', () => {
        const base = 'file:/foo/..';
        const input = 'file://root';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/');
      });

      it('normalizes file protocol 3', () => {
        const base = 'file:/foo/..';
        const input = 'file:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 4', () => {
        const base = 'file:/foo/..';
        const input = 'file:root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });
    });

    describe('with protocol relative input', () => {
      it('resolves relative to the base protocol', () => {
        const base = 'file:/foo/..';
        const input = '//protocol-relative.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'file:/foo/..';
        const input = '//protocol-relative.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = 'file:/foo/..';
        const input = '//protocol-relative.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/');
      });

      it('normalizes current directory', () => {
        const base = 'file:/foo/..';
        const input = '//protocol-relative.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'file:/foo/..';
        const input = '//protocol-relative.com/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'file:/foo/..';
        const input = '//protocol-relative.com/foo/../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/main.js.map');
      });
    });

    describe('with absolute path input', () => {
      it('remains absolute path', () => {
        const base = 'file:/foo/..';
        const input = '/assets/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///assets/main.js.map');
      });

      it('trims to root', () => {
        const base = 'file:/foo/..';
        const input = '/';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///');
      });

      it('normalizes input', () => {
        const base = 'file:/foo/..';
        const input = '/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///foo/main.js.map');
      });

      it('normalizes current directory', () => {
        const base = 'file:/foo/..';
        const input = '/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'file:/foo/..';
        const input = '/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'file:/foo/..';
        const input = '/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///main.js.map');
      });
    });

    describe('with leading dot relative input', () => {
      it('resolves relative to current directory', () => {
        const base = 'file:/foo/..';
        const input = './bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///bar/main.js.map');
      });

      it('resolves relative to parent directory', () => {
        const base = 'file:/foo/..';
        const input = '../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///bar/main.js.map');
      });

      it('resolves relative to parent multiple directory', () => {
        const base = 'file:/foo/..';
        const input = '../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///bar/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'file:/foo/..';
        const input = './foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///foo/main.js.map');
      });
    });

    describe('with relative input', () => {
      it('resolves relative to current directory', () => {
        const base = 'file:/foo/..';
        const input = 'bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///bar/main.js.map');
      });

      it('resolves relative to parent multiple directory, later', () => {
        const base = 'file:/foo/..';
        const input = 'foo/../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///bar/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'file:/foo/..';
        const input = 'foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///foo/main.js.map');
      });

      it('resolves node_module scope as path', () => {
        const base = 'file:/foo/..';
        const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(
          resolved,
          'file:///node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js'
        );
      });

      it('resolves package scope as path', () => {
        const base = 'file:/foo/..';
        const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///@babel/runtime/helpers/esm/arrayLikeToArray.js');
      });
    });

    describe('empty input', () => {
      it('normalizes base', () => {
        const base = 'file:/foo/..';
        const input = '';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///');
      });
    });
  });

  describe(`base = "file:/foo/../"`, () => {
    describe('with absolute input', () => {
      it('returns input', () => {
        const base = 'file:/foo/../';
        const input = 'https://absolute.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'file:/foo/../';
        const input = 'https://absolute.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = 'file:/foo/../';
        const input = 'https://absolute.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/');
      });

      it('normalizes current directory', () => {
        const base = 'file:/foo/../';
        const input = 'https://absolute.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'file:/foo/../';
        const input = 'https://absolute.com/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'file:/foo/../';
        const input = 'https://absolute.com/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes file protocol 1', () => {
        const base = 'file:/foo/../';
        const input = 'file:///root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 2', () => {
        const base = 'file:/foo/../';
        const input = 'file://root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/main.js.map');
      });

      it('normalizes file protocol 2.5', () => {
        const base = 'file:/foo/../';
        const input = 'file://root';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/');
      });

      it('normalizes file protocol 3', () => {
        const base = 'file:/foo/../';
        const input = 'file:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 4', () => {
        const base = 'file:/foo/../';
        const input = 'file:root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });
    });

    describe('with protocol relative input', () => {
      it('resolves relative to the base protocol', () => {
        const base = 'file:/foo/../';
        const input = '//protocol-relative.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'file:/foo/../';
        const input = '//protocol-relative.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = 'file:/foo/../';
        const input = '//protocol-relative.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/');
      });

      it('normalizes current directory', () => {
        const base = 'file:/foo/../';
        const input = '//protocol-relative.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'file:/foo/../';
        const input = '//protocol-relative.com/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'file:/foo/../';
        const input = '//protocol-relative.com/foo/../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/main.js.map');
      });
    });

    describe('with absolute path input', () => {
      it('remains absolute path', () => {
        const base = 'file:/foo/../';
        const input = '/assets/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///assets/main.js.map');
      });

      it('trims to root', () => {
        const base = 'file:/foo/../';
        const input = '/';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///');
      });

      it('normalizes input', () => {
        const base = 'file:/foo/../';
        const input = '/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///foo/main.js.map');
      });

      it('normalizes current directory', () => {
        const base = 'file:/foo/../';
        const input = '/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'file:/foo/../';
        const input = '/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'file:/foo/../';
        const input = '/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///main.js.map');
      });
    });

    describe('with leading dot relative input', () => {
      it('resolves relative to current directory', () => {
        const base = 'file:/foo/../';
        const input = './bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///bar/main.js.map');
      });

      it('resolves relative to parent directory', () => {
        const base = 'file:/foo/../';
        const input = '../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///bar/main.js.map');
      });

      it('resolves relative to parent multiple directory', () => {
        const base = 'file:/foo/../';
        const input = '../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///bar/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'file:/foo/../';
        const input = './foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///foo/main.js.map');
      });
    });

    describe('with relative input', () => {
      it('resolves relative to current directory', () => {
        const base = 'file:/foo/../';
        const input = 'bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///bar/main.js.map');
      });

      it('resolves relative to parent multiple directory, later', () => {
        const base = 'file:/foo/../';
        const input = 'foo/../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///bar/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'file:/foo/../';
        const input = 'foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///foo/main.js.map');
      });

      it('resolves node_module scope as path', () => {
        const base = 'file:/foo/../';
        const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(
          resolved,
          'file:///node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js'
        );
      });

      it('resolves package scope as path', () => {
        const base = 'file:/foo/../';
        const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///@babel/runtime/helpers/esm/arrayLikeToArray.js');
      });
    });

    describe('empty input', () => {
      it('normalizes base', () => {
        const base = 'file:/foo/../';
        const input = '';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///');
      });
    });
  });

  describe(`base = "file:/foo/dir/.."`, () => {
    describe('with absolute input', () => {
      it('returns input', () => {
        const base = 'file:/foo/dir/..';
        const input = 'https://absolute.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'file:/foo/dir/..';
        const input = 'https://absolute.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = 'file:/foo/dir/..';
        const input = 'https://absolute.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/');
      });

      it('normalizes current directory', () => {
        const base = 'file:/foo/dir/..';
        const input = 'https://absolute.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'file:/foo/dir/..';
        const input = 'https://absolute.com/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'file:/foo/dir/..';
        const input = 'https://absolute.com/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes file protocol 1', () => {
        const base = 'file:/foo/dir/..';
        const input = 'file:///root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 2', () => {
        const base = 'file:/foo/dir/..';
        const input = 'file://root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/main.js.map');
      });

      it('normalizes file protocol 2.5', () => {
        const base = 'file:/foo/dir/..';
        const input = 'file://root';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/');
      });

      it('normalizes file protocol 3', () => {
        const base = 'file:/foo/dir/..';
        const input = 'file:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 4', () => {
        const base = 'file:/foo/dir/..';
        const input = 'file:root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });
    });

    describe('with protocol relative input', () => {
      it('resolves relative to the base protocol', () => {
        const base = 'file:/foo/dir/..';
        const input = '//protocol-relative.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'file:/foo/dir/..';
        const input = '//protocol-relative.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = 'file:/foo/dir/..';
        const input = '//protocol-relative.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/');
      });

      it('normalizes current directory', () => {
        const base = 'file:/foo/dir/..';
        const input = '//protocol-relative.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'file:/foo/dir/..';
        const input = '//protocol-relative.com/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'file:/foo/dir/..';
        const input = '//protocol-relative.com/foo/../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/main.js.map');
      });
    });

    describe('with absolute path input', () => {
      it('remains absolute path', () => {
        const base = 'file:/foo/dir/..';
        const input = '/assets/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///assets/main.js.map');
      });

      it('trims to root', () => {
        const base = 'file:/foo/dir/..';
        const input = '/';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///');
      });

      it('normalizes input', () => {
        const base = 'file:/foo/dir/..';
        const input = '/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///foo/main.js.map');
      });

      it('normalizes current directory', () => {
        const base = 'file:/foo/dir/..';
        const input = '/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'file:/foo/dir/..';
        const input = '/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'file:/foo/dir/..';
        const input = '/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///main.js.map');
      });
    });

    describe('with leading dot relative input', () => {
      it('resolves relative to current directory', () => {
        const base = 'file:/foo/dir/..';
        const input = './bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///foo/bar/main.js.map');
      });

      it('resolves relative to parent directory', () => {
        const base = 'file:/foo/dir/..';
        const input = '../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///bar/main.js.map');
      });

      it('resolves relative to parent multiple directory', () => {
        const base = 'file:/foo/dir/..';
        const input = '../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///bar/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'file:/foo/dir/..';
        const input = './foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///foo/foo/main.js.map');
      });
    });

    describe('with relative input', () => {
      it('resolves relative to current directory', () => {
        const base = 'file:/foo/dir/..';
        const input = 'bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///foo/bar/main.js.map');
      });

      it('resolves relative to parent multiple directory, later', () => {
        const base = 'file:/foo/dir/..';
        const input = 'foo/../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///bar/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'file:/foo/dir/..';
        const input = 'foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///foo/foo/main.js.map');
      });

      it('resolves node_module scope as path', () => {
        const base = 'file:/foo/dir/..';
        const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(
          resolved,
          'file:///foo/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js'
        );
      });

      it('resolves package scope as path', () => {
        const base = 'file:/foo/dir/..';
        const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///foo/@babel/runtime/helpers/esm/arrayLikeToArray.js');
      });
    });

    describe('empty input', () => {
      it('normalizes base', () => {
        const base = 'file:/foo/dir/..';
        const input = '';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///foo/');
      });
    });
  });

  describe(`base = "file:foo"`, () => {
    describe('with absolute input', () => {
      it('returns input', () => {
        const base = 'file:foo';
        const input = 'https://absolute.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'file:foo';
        const input = 'https://absolute.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = 'file:foo';
        const input = 'https://absolute.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/');
      });

      it('normalizes current directory', () => {
        const base = 'file:foo';
        const input = 'https://absolute.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'file:foo';
        const input = 'https://absolute.com/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'file:foo';
        const input = 'https://absolute.com/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes file protocol 1', () => {
        const base = 'file:foo';
        const input = 'file:///root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 2', () => {
        const base = 'file:foo';
        const input = 'file://root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/main.js.map');
      });

      it('normalizes file protocol 2.5', () => {
        const base = 'file:foo';
        const input = 'file://root';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/');
      });

      it('normalizes file protocol 3', () => {
        const base = 'file:foo';
        const input = 'file:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 4', () => {
        const base = 'file:foo';
        const input = 'file:root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });
    });

    describe('with protocol relative input', () => {
      it('resolves relative to the base protocol', () => {
        const base = 'file:foo';
        const input = '//protocol-relative.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'file:foo';
        const input = '//protocol-relative.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = 'file:foo';
        const input = '//protocol-relative.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/');
      });

      it('normalizes current directory', () => {
        const base = 'file:foo';
        const input = '//protocol-relative.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'file:foo';
        const input = '//protocol-relative.com/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'file:foo';
        const input = '//protocol-relative.com/foo/../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/main.js.map');
      });
    });

    describe('with absolute path input', () => {
      it('remains absolute path', () => {
        const base = 'file:foo';
        const input = '/assets/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///assets/main.js.map');
      });

      it('trims to root', () => {
        const base = 'file:foo';
        const input = '/';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///');
      });

      it('normalizes input', () => {
        const base = 'file:foo';
        const input = '/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///foo/main.js.map');
      });

      it('normalizes current directory', () => {
        const base = 'file:foo';
        const input = '/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'file:foo';
        const input = '/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'file:foo';
        const input = '/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///main.js.map');
      });
    });

    describe('with leading dot relative input', () => {
      it('resolves relative to current directory', () => {
        const base = 'file:foo';
        const input = './bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///bar/main.js.map');
      });

      it('resolves relative to parent directory', () => {
        const base = 'file:foo';
        const input = '../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///bar/main.js.map');
      });

      it('resolves relative to parent multiple directory', () => {
        const base = 'file:foo';
        const input = '../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///bar/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'file:foo';
        const input = './foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///foo/main.js.map');
      });
    });

    describe('with relative input', () => {
      it('resolves relative to current directory', () => {
        const base = 'file:foo';
        const input = 'bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///bar/main.js.map');
      });

      it('resolves relative to parent multiple directory, later', () => {
        const base = 'file:foo';
        const input = 'foo/../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///bar/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'file:foo';
        const input = 'foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///foo/main.js.map');
      });

      it('resolves node_module scope as path', () => {
        const base = 'file:foo';
        const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(
          resolved,
          'file:///node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js'
        );
      });

      it('resolves package scope as path', () => {
        const base = 'file:foo';
        const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///@babel/runtime/helpers/esm/arrayLikeToArray.js');
      });
    });

    describe('empty input', () => {
      it('normalizes base', () => {
        const base = 'file:foo';
        const input = '';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///foo');
      });
    });
  });

  describe(`base = "file:foo/"`, () => {
    describe('with absolute input', () => {
      it('returns input', () => {
        const base = 'file:foo/';
        const input = 'https://absolute.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'file:foo/';
        const input = 'https://absolute.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = 'file:foo/';
        const input = 'https://absolute.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/');
      });

      it('normalizes current directory', () => {
        const base = 'file:foo/';
        const input = 'https://absolute.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'file:foo/';
        const input = 'https://absolute.com/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'file:foo/';
        const input = 'https://absolute.com/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes file protocol 1', () => {
        const base = 'file:foo/';
        const input = 'file:///root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 2', () => {
        const base = 'file:foo/';
        const input = 'file://root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/main.js.map');
      });

      it('normalizes file protocol 2.5', () => {
        const base = 'file:foo/';
        const input = 'file://root';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/');
      });

      it('normalizes file protocol 3', () => {
        const base = 'file:foo/';
        const input = 'file:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 4', () => {
        const base = 'file:foo/';
        const input = 'file:root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });
    });

    describe('with protocol relative input', () => {
      it('resolves relative to the base protocol', () => {
        const base = 'file:foo/';
        const input = '//protocol-relative.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'file:foo/';
        const input = '//protocol-relative.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = 'file:foo/';
        const input = '//protocol-relative.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/');
      });

      it('normalizes current directory', () => {
        const base = 'file:foo/';
        const input = '//protocol-relative.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'file:foo/';
        const input = '//protocol-relative.com/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'file:foo/';
        const input = '//protocol-relative.com/foo/../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/main.js.map');
      });
    });

    describe('with absolute path input', () => {
      it('remains absolute path', () => {
        const base = 'file:foo/';
        const input = '/assets/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///assets/main.js.map');
      });

      it('trims to root', () => {
        const base = 'file:foo/';
        const input = '/';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///');
      });

      it('normalizes input', () => {
        const base = 'file:foo/';
        const input = '/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///foo/main.js.map');
      });

      it('normalizes current directory', () => {
        const base = 'file:foo/';
        const input = '/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'file:foo/';
        const input = '/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'file:foo/';
        const input = '/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///main.js.map');
      });
    });

    describe('with leading dot relative input', () => {
      it('resolves relative to current directory', () => {
        const base = 'file:foo/';
        const input = './bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///foo/bar/main.js.map');
      });

      it('resolves relative to parent directory', () => {
        const base = 'file:foo/';
        const input = '../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///bar/main.js.map');
      });

      it('resolves relative to parent multiple directory', () => {
        const base = 'file:foo/';
        const input = '../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///bar/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'file:foo/';
        const input = './foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///foo/foo/main.js.map');
      });
    });

    describe('with relative input', () => {
      it('resolves relative to current directory', () => {
        const base = 'file:foo/';
        const input = 'bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///foo/bar/main.js.map');
      });

      it('resolves relative to parent multiple directory, later', () => {
        const base = 'file:foo/';
        const input = 'foo/../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///bar/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'file:foo/';
        const input = 'foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///foo/foo/main.js.map');
      });

      it('resolves node_module scope as path', () => {
        const base = 'file:foo/';
        const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(
          resolved,
          'file:///foo/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js'
        );
      });

      it('resolves package scope as path', () => {
        const base = 'file:foo/';
        const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///foo/@babel/runtime/helpers/esm/arrayLikeToArray.js');
      });
    });

    describe('empty input', () => {
      it('normalizes base', () => {
        const base = 'file:foo/';
        const input = '';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///foo/');
      });
    });
  });

  describe(`base = "file:foo/file"`, () => {
    describe('with absolute input', () => {
      it('returns input', () => {
        const base = 'file:foo/file';
        const input = 'https://absolute.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'file:foo/file';
        const input = 'https://absolute.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = 'file:foo/file';
        const input = 'https://absolute.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/');
      });

      it('normalizes current directory', () => {
        const base = 'file:foo/file';
        const input = 'https://absolute.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'file:foo/file';
        const input = 'https://absolute.com/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'file:foo/file';
        const input = 'https://absolute.com/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes file protocol 1', () => {
        const base = 'file:foo/file';
        const input = 'file:///root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 2', () => {
        const base = 'file:foo/file';
        const input = 'file://root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/main.js.map');
      });

      it('normalizes file protocol 2.5', () => {
        const base = 'file:foo/file';
        const input = 'file://root';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/');
      });

      it('normalizes file protocol 3', () => {
        const base = 'file:foo/file';
        const input = 'file:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 4', () => {
        const base = 'file:foo/file';
        const input = 'file:root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });
    });

    describe('with protocol relative input', () => {
      it('resolves relative to the base protocol', () => {
        const base = 'file:foo/file';
        const input = '//protocol-relative.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'file:foo/file';
        const input = '//protocol-relative.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = 'file:foo/file';
        const input = '//protocol-relative.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/');
      });

      it('normalizes current directory', () => {
        const base = 'file:foo/file';
        const input = '//protocol-relative.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'file:foo/file';
        const input = '//protocol-relative.com/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'file:foo/file';
        const input = '//protocol-relative.com/foo/../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/main.js.map');
      });
    });

    describe('with absolute path input', () => {
      it('remains absolute path', () => {
        const base = 'file:foo/file';
        const input = '/assets/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///assets/main.js.map');
      });

      it('trims to root', () => {
        const base = 'file:foo/file';
        const input = '/';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///');
      });

      it('normalizes input', () => {
        const base = 'file:foo/file';
        const input = '/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///foo/main.js.map');
      });

      it('normalizes current directory', () => {
        const base = 'file:foo/file';
        const input = '/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'file:foo/file';
        const input = '/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'file:foo/file';
        const input = '/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///main.js.map');
      });
    });

    describe('with leading dot relative input', () => {
      it('resolves relative to current directory', () => {
        const base = 'file:foo/file';
        const input = './bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///foo/bar/main.js.map');
      });

      it('resolves relative to parent directory', () => {
        const base = 'file:foo/file';
        const input = '../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///bar/main.js.map');
      });

      it('resolves relative to parent multiple directory', () => {
        const base = 'file:foo/file';
        const input = '../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///bar/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'file:foo/file';
        const input = './foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///foo/foo/main.js.map');
      });
    });

    describe('with relative input', () => {
      it('resolves relative to current directory', () => {
        const base = 'file:foo/file';
        const input = 'bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///foo/bar/main.js.map');
      });

      it('resolves relative to parent multiple directory, later', () => {
        const base = 'file:foo/file';
        const input = 'foo/../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///bar/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'file:foo/file';
        const input = 'foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///foo/foo/main.js.map');
      });

      it('resolves node_module scope as path', () => {
        const base = 'file:foo/file';
        const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(
          resolved,
          'file:///foo/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js'
        );
      });

      it('resolves package scope as path', () => {
        const base = 'file:foo/file';
        const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///foo/@babel/runtime/helpers/esm/arrayLikeToArray.js');
      });
    });

    describe('empty input', () => {
      it('normalizes base', () => {
        const base = 'file:foo/file';
        const input = '';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///foo/file');
      });
    });
  });

  describe(`base = "file:foo/dir/"`, () => {
    describe('with absolute input', () => {
      it('returns input', () => {
        const base = 'file:foo/dir/';
        const input = 'https://absolute.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'file:foo/dir/';
        const input = 'https://absolute.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = 'file:foo/dir/';
        const input = 'https://absolute.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/');
      });

      it('normalizes current directory', () => {
        const base = 'file:foo/dir/';
        const input = 'https://absolute.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'file:foo/dir/';
        const input = 'https://absolute.com/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'file:foo/dir/';
        const input = 'https://absolute.com/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes file protocol 1', () => {
        const base = 'file:foo/dir/';
        const input = 'file:///root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 2', () => {
        const base = 'file:foo/dir/';
        const input = 'file://root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/main.js.map');
      });

      it('normalizes file protocol 2.5', () => {
        const base = 'file:foo/dir/';
        const input = 'file://root';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/');
      });

      it('normalizes file protocol 3', () => {
        const base = 'file:foo/dir/';
        const input = 'file:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 4', () => {
        const base = 'file:foo/dir/';
        const input = 'file:root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });
    });

    describe('with protocol relative input', () => {
      it('resolves relative to the base protocol', () => {
        const base = 'file:foo/dir/';
        const input = '//protocol-relative.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'file:foo/dir/';
        const input = '//protocol-relative.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = 'file:foo/dir/';
        const input = '//protocol-relative.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/');
      });

      it('normalizes current directory', () => {
        const base = 'file:foo/dir/';
        const input = '//protocol-relative.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'file:foo/dir/';
        const input = '//protocol-relative.com/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'file:foo/dir/';
        const input = '//protocol-relative.com/foo/../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/main.js.map');
      });
    });

    describe('with absolute path input', () => {
      it('remains absolute path', () => {
        const base = 'file:foo/dir/';
        const input = '/assets/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///assets/main.js.map');
      });

      it('trims to root', () => {
        const base = 'file:foo/dir/';
        const input = '/';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///');
      });

      it('normalizes input', () => {
        const base = 'file:foo/dir/';
        const input = '/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///foo/main.js.map');
      });

      it('normalizes current directory', () => {
        const base = 'file:foo/dir/';
        const input = '/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'file:foo/dir/';
        const input = '/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'file:foo/dir/';
        const input = '/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///main.js.map');
      });
    });

    describe('with leading dot relative input', () => {
      it('resolves relative to current directory', () => {
        const base = 'file:foo/dir/';
        const input = './bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///foo/dir/bar/main.js.map');
      });

      it('resolves relative to parent directory', () => {
        const base = 'file:foo/dir/';
        const input = '../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///foo/bar/main.js.map');
      });

      it('resolves relative to parent multiple directory', () => {
        const base = 'file:foo/dir/';
        const input = '../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///bar/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'file:foo/dir/';
        const input = './foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///foo/dir/foo/main.js.map');
      });
    });

    describe('with relative input', () => {
      it('resolves relative to current directory', () => {
        const base = 'file:foo/dir/';
        const input = 'bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///foo/dir/bar/main.js.map');
      });

      it('resolves relative to parent multiple directory, later', () => {
        const base = 'file:foo/dir/';
        const input = 'foo/../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///bar/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'file:foo/dir/';
        const input = 'foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///foo/dir/foo/main.js.map');
      });

      it('resolves node_module scope as path', () => {
        const base = 'file:foo/dir/';
        const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(
          resolved,
          'file:///foo/dir/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js'
        );
      });

      it('resolves package scope as path', () => {
        const base = 'file:foo/dir/';
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
        const base = 'file:foo/dir/';
        const input = '';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///foo/dir/');
      });
    });
  });

  describe(`base = "file:foo/dir/file"`, () => {
    describe('with absolute input', () => {
      it('returns input', () => {
        const base = 'file:foo/dir/file';
        const input = 'https://absolute.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'file:foo/dir/file';
        const input = 'https://absolute.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = 'file:foo/dir/file';
        const input = 'https://absolute.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/');
      });

      it('normalizes current directory', () => {
        const base = 'file:foo/dir/file';
        const input = 'https://absolute.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'file:foo/dir/file';
        const input = 'https://absolute.com/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'file:foo/dir/file';
        const input = 'https://absolute.com/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes file protocol 1', () => {
        const base = 'file:foo/dir/file';
        const input = 'file:///root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 2', () => {
        const base = 'file:foo/dir/file';
        const input = 'file://root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/main.js.map');
      });

      it('normalizes file protocol 2.5', () => {
        const base = 'file:foo/dir/file';
        const input = 'file://root';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/');
      });

      it('normalizes file protocol 3', () => {
        const base = 'file:foo/dir/file';
        const input = 'file:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 4', () => {
        const base = 'file:foo/dir/file';
        const input = 'file:root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });
    });

    describe('with protocol relative input', () => {
      it('resolves relative to the base protocol', () => {
        const base = 'file:foo/dir/file';
        const input = '//protocol-relative.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'file:foo/dir/file';
        const input = '//protocol-relative.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = 'file:foo/dir/file';
        const input = '//protocol-relative.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/');
      });

      it('normalizes current directory', () => {
        const base = 'file:foo/dir/file';
        const input = '//protocol-relative.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'file:foo/dir/file';
        const input = '//protocol-relative.com/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'file:foo/dir/file';
        const input = '//protocol-relative.com/foo/../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/main.js.map');
      });
    });

    describe('with absolute path input', () => {
      it('remains absolute path', () => {
        const base = 'file:foo/dir/file';
        const input = '/assets/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///assets/main.js.map');
      });

      it('trims to root', () => {
        const base = 'file:foo/dir/file';
        const input = '/';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///');
      });

      it('normalizes input', () => {
        const base = 'file:foo/dir/file';
        const input = '/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///foo/main.js.map');
      });

      it('normalizes current directory', () => {
        const base = 'file:foo/dir/file';
        const input = '/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'file:foo/dir/file';
        const input = '/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'file:foo/dir/file';
        const input = '/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///main.js.map');
      });
    });

    describe('with leading dot relative input', () => {
      it('resolves relative to current directory', () => {
        const base = 'file:foo/dir/file';
        const input = './bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///foo/dir/bar/main.js.map');
      });

      it('resolves relative to parent directory', () => {
        const base = 'file:foo/dir/file';
        const input = '../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///foo/bar/main.js.map');
      });

      it('resolves relative to parent multiple directory', () => {
        const base = 'file:foo/dir/file';
        const input = '../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///bar/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'file:foo/dir/file';
        const input = './foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///foo/dir/foo/main.js.map');
      });
    });

    describe('with relative input', () => {
      it('resolves relative to current directory', () => {
        const base = 'file:foo/dir/file';
        const input = 'bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///foo/dir/bar/main.js.map');
      });

      it('resolves relative to parent multiple directory, later', () => {
        const base = 'file:foo/dir/file';
        const input = 'foo/../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///bar/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'file:foo/dir/file';
        const input = 'foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///foo/dir/foo/main.js.map');
      });

      it('resolves node_module scope as path', () => {
        const base = 'file:foo/dir/file';
        const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(
          resolved,
          'file:///foo/dir/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js'
        );
      });

      it('resolves package scope as path', () => {
        const base = 'file:foo/dir/file';
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
        const base = 'file:foo/dir/file';
        const input = '';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///foo/dir/file');
      });
    });
  });

  describe(`base = "file:foo/.."`, () => {
    describe('with absolute input', () => {
      it('returns input', () => {
        const base = 'file:foo/..';
        const input = 'https://absolute.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'file:foo/..';
        const input = 'https://absolute.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = 'file:foo/..';
        const input = 'https://absolute.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/');
      });

      it('normalizes current directory', () => {
        const base = 'file:foo/..';
        const input = 'https://absolute.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'file:foo/..';
        const input = 'https://absolute.com/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'file:foo/..';
        const input = 'https://absolute.com/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes file protocol 1', () => {
        const base = 'file:foo/..';
        const input = 'file:///root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 2', () => {
        const base = 'file:foo/..';
        const input = 'file://root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/main.js.map');
      });

      it('normalizes file protocol 2.5', () => {
        const base = 'file:foo/..';
        const input = 'file://root';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/');
      });

      it('normalizes file protocol 3', () => {
        const base = 'file:foo/..';
        const input = 'file:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 4', () => {
        const base = 'file:foo/..';
        const input = 'file:root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });
    });

    describe('with protocol relative input', () => {
      it('resolves relative to the base protocol', () => {
        const base = 'file:foo/..';
        const input = '//protocol-relative.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'file:foo/..';
        const input = '//protocol-relative.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = 'file:foo/..';
        const input = '//protocol-relative.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/');
      });

      it('normalizes current directory', () => {
        const base = 'file:foo/..';
        const input = '//protocol-relative.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'file:foo/..';
        const input = '//protocol-relative.com/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'file:foo/..';
        const input = '//protocol-relative.com/foo/../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/main.js.map');
      });
    });

    describe('with absolute path input', () => {
      it('remains absolute path', () => {
        const base = 'file:foo/..';
        const input = '/assets/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///assets/main.js.map');
      });

      it('trims to root', () => {
        const base = 'file:foo/..';
        const input = '/';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///');
      });

      it('normalizes input', () => {
        const base = 'file:foo/..';
        const input = '/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///foo/main.js.map');
      });

      it('normalizes current directory', () => {
        const base = 'file:foo/..';
        const input = '/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'file:foo/..';
        const input = '/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'file:foo/..';
        const input = '/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///main.js.map');
      });
    });

    describe('with leading dot relative input', () => {
      it('resolves relative to current directory', () => {
        const base = 'file:foo/..';
        const input = './bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///bar/main.js.map');
      });

      it('resolves relative to parent directory', () => {
        const base = 'file:foo/..';
        const input = '../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///bar/main.js.map');
      });

      it('resolves relative to parent multiple directory', () => {
        const base = 'file:foo/..';
        const input = '../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///bar/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'file:foo/..';
        const input = './foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///foo/main.js.map');
      });
    });

    describe('with relative input', () => {
      it('resolves relative to current directory', () => {
        const base = 'file:foo/..';
        const input = 'bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///bar/main.js.map');
      });

      it('resolves relative to parent multiple directory, later', () => {
        const base = 'file:foo/..';
        const input = 'foo/../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///bar/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'file:foo/..';
        const input = 'foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///foo/main.js.map');
      });

      it('resolves node_module scope as path', () => {
        const base = 'file:foo/..';
        const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(
          resolved,
          'file:///node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js'
        );
      });

      it('resolves package scope as path', () => {
        const base = 'file:foo/..';
        const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///@babel/runtime/helpers/esm/arrayLikeToArray.js');
      });
    });

    describe('empty input', () => {
      it('normalizes base', () => {
        const base = 'file:foo/..';
        const input = '';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///');
      });
    });
  });

  describe(`base = "file:foo/../"`, () => {
    describe('with absolute input', () => {
      it('returns input', () => {
        const base = 'file:foo/../';
        const input = 'https://absolute.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'file:foo/../';
        const input = 'https://absolute.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = 'file:foo/../';
        const input = 'https://absolute.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/');
      });

      it('normalizes current directory', () => {
        const base = 'file:foo/../';
        const input = 'https://absolute.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'file:foo/../';
        const input = 'https://absolute.com/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'file:foo/../';
        const input = 'https://absolute.com/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes file protocol 1', () => {
        const base = 'file:foo/../';
        const input = 'file:///root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 2', () => {
        const base = 'file:foo/../';
        const input = 'file://root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/main.js.map');
      });

      it('normalizes file protocol 2.5', () => {
        const base = 'file:foo/../';
        const input = 'file://root';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/');
      });

      it('normalizes file protocol 3', () => {
        const base = 'file:foo/../';
        const input = 'file:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 4', () => {
        const base = 'file:foo/../';
        const input = 'file:root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });
    });

    describe('with protocol relative input', () => {
      it('resolves relative to the base protocol', () => {
        const base = 'file:foo/../';
        const input = '//protocol-relative.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'file:foo/../';
        const input = '//protocol-relative.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = 'file:foo/../';
        const input = '//protocol-relative.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/');
      });

      it('normalizes current directory', () => {
        const base = 'file:foo/../';
        const input = '//protocol-relative.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'file:foo/../';
        const input = '//protocol-relative.com/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'file:foo/../';
        const input = '//protocol-relative.com/foo/../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/main.js.map');
      });
    });

    describe('with absolute path input', () => {
      it('remains absolute path', () => {
        const base = 'file:foo/../';
        const input = '/assets/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///assets/main.js.map');
      });

      it('trims to root', () => {
        const base = 'file:foo/../';
        const input = '/';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///');
      });

      it('normalizes input', () => {
        const base = 'file:foo/../';
        const input = '/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///foo/main.js.map');
      });

      it('normalizes current directory', () => {
        const base = 'file:foo/../';
        const input = '/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'file:foo/../';
        const input = '/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'file:foo/../';
        const input = '/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///main.js.map');
      });
    });

    describe('with leading dot relative input', () => {
      it('resolves relative to current directory', () => {
        const base = 'file:foo/../';
        const input = './bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///bar/main.js.map');
      });

      it('resolves relative to parent directory', () => {
        const base = 'file:foo/../';
        const input = '../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///bar/main.js.map');
      });

      it('resolves relative to parent multiple directory', () => {
        const base = 'file:foo/../';
        const input = '../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///bar/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'file:foo/../';
        const input = './foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///foo/main.js.map');
      });
    });

    describe('with relative input', () => {
      it('resolves relative to current directory', () => {
        const base = 'file:foo/../';
        const input = 'bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///bar/main.js.map');
      });

      it('resolves relative to parent multiple directory, later', () => {
        const base = 'file:foo/../';
        const input = 'foo/../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///bar/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'file:foo/../';
        const input = 'foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///foo/main.js.map');
      });

      it('resolves node_module scope as path', () => {
        const base = 'file:foo/../';
        const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(
          resolved,
          'file:///node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js'
        );
      });

      it('resolves package scope as path', () => {
        const base = 'file:foo/../';
        const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///@babel/runtime/helpers/esm/arrayLikeToArray.js');
      });
    });

    describe('empty input', () => {
      it('normalizes base', () => {
        const base = 'file:foo/../';
        const input = '';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///');
      });
    });
  });

  describe(`base = "file:foo/dir/.."`, () => {
    describe('with absolute input', () => {
      it('returns input', () => {
        const base = 'file:foo/dir/..';
        const input = 'https://absolute.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'file:foo/dir/..';
        const input = 'https://absolute.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = 'file:foo/dir/..';
        const input = 'https://absolute.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/');
      });

      it('normalizes current directory', () => {
        const base = 'file:foo/dir/..';
        const input = 'https://absolute.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'file:foo/dir/..';
        const input = 'https://absolute.com/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'file:foo/dir/..';
        const input = 'https://absolute.com/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes file protocol 1', () => {
        const base = 'file:foo/dir/..';
        const input = 'file:///root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 2', () => {
        const base = 'file:foo/dir/..';
        const input = 'file://root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/main.js.map');
      });

      it('normalizes file protocol 2.5', () => {
        const base = 'file:foo/dir/..';
        const input = 'file://root';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/');
      });

      it('normalizes file protocol 3', () => {
        const base = 'file:foo/dir/..';
        const input = 'file:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 4', () => {
        const base = 'file:foo/dir/..';
        const input = 'file:root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });
    });

    describe('with protocol relative input', () => {
      it('resolves relative to the base protocol', () => {
        const base = 'file:foo/dir/..';
        const input = '//protocol-relative.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'file:foo/dir/..';
        const input = '//protocol-relative.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = 'file:foo/dir/..';
        const input = '//protocol-relative.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/');
      });

      it('normalizes current directory', () => {
        const base = 'file:foo/dir/..';
        const input = '//protocol-relative.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'file:foo/dir/..';
        const input = '//protocol-relative.com/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'file:foo/dir/..';
        const input = '//protocol-relative.com/foo/../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://protocol-relative.com/main.js.map');
      });
    });

    describe('with absolute path input', () => {
      it('remains absolute path', () => {
        const base = 'file:foo/dir/..';
        const input = '/assets/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///assets/main.js.map');
      });

      it('trims to root', () => {
        const base = 'file:foo/dir/..';
        const input = '/';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///');
      });

      it('normalizes input', () => {
        const base = 'file:foo/dir/..';
        const input = '/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///foo/main.js.map');
      });

      it('normalizes current directory', () => {
        const base = 'file:foo/dir/..';
        const input = '/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'file:foo/dir/..';
        const input = '/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'file:foo/dir/..';
        const input = '/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///main.js.map');
      });
    });

    describe('with leading dot relative input', () => {
      it('resolves relative to current directory', () => {
        const base = 'file:foo/dir/..';
        const input = './bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///foo/bar/main.js.map');
      });

      it('resolves relative to parent directory', () => {
        const base = 'file:foo/dir/..';
        const input = '../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///bar/main.js.map');
      });

      it('resolves relative to parent multiple directory', () => {
        const base = 'file:foo/dir/..';
        const input = '../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///bar/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'file:foo/dir/..';
        const input = './foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///foo/foo/main.js.map');
      });
    });

    describe('with relative input', () => {
      it('resolves relative to current directory', () => {
        const base = 'file:foo/dir/..';
        const input = 'bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///foo/bar/main.js.map');
      });

      it('resolves relative to parent multiple directory, later', () => {
        const base = 'file:foo/dir/..';
        const input = 'foo/../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///bar/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'file:foo/dir/..';
        const input = 'foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///foo/foo/main.js.map');
      });

      it('resolves node_module scope as path', () => {
        const base = 'file:foo/dir/..';
        const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(
          resolved,
          'file:///foo/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js'
        );
      });

      it('resolves package scope as path', () => {
        const base = 'file:foo/dir/..';
        const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///foo/@babel/runtime/helpers/esm/arrayLikeToArray.js');
      });
    });

    describe('empty input', () => {
      it('normalizes base', () => {
        const base = 'file:foo/dir/..';
        const input = '';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///foo/');
      });
    });
  });
});
