const resolve = require('../');

const assert = require('assert');

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

      it('normalizes file protocol 1', () => {
        const base = '//foo.com';
        const input = 'file:///root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 2', () => {
        const base = '//foo.com';
        const input = 'file://root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/main.js.map');
      });

      it('normalizes file protocol 2.5', () => {
        const base = '//foo.com';
        const input = 'file://root';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/');
      });

      it('normalizes file protocol 3', () => {
        const base = '//foo.com';
        const input = 'file:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 4', () => {
        const base = '//foo.com';
        const input = 'file:root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes windows file 1', () => {
        const base = '//foo.com';
        const input = 'file:///C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 2', () => {
        const base = '//foo.com';
        const input = 'file://C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 3', () => {
        const base = '//foo.com';
        const input = 'file:/C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 4', () => {
        const base = '//foo.com';
        const input = 'file:C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
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

    describe('with absolute Windows path input', () => {
      it('remains absolute path', () => {
        const base = '//foo.com';
        const input = 'C:\\assets\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//foo.com/assets/main.js.map');
      });

      it('trims to root', () => {
        const base = '//foo.com';
        const input = 'C:\\';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//foo.com/');
      });

      it('normalizes input', () => {
        const base = '//foo.com';
        const input = 'C:\\foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//foo.com/foo/main.js.map');
      });

      it('normalizes current directory', () => {
        const base = '//foo.com';
        const input = 'C:\\.\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//foo.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = '//foo.com';
        const input = 'C:\\..\\..\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//foo.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = '//foo.com';
        const input = 'C:\\foo\\..\\..\\..\\main.js.map';
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

    describe('with leading dot relative Windows input', () => {
      it('resolves relative to current directory', () => {
        const base = '//foo.com';
        const input = '.\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//foo.com/bar/main.js.map');
      });

      it('resolves relative to parent directory', () => {
        const base = '//foo.com';
        const input = '..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//foo.com/bar/main.js.map');
      });

      it('resolves relative to parent multiple directory', () => {
        const base = '//foo.com';
        const input = '..\\..\\..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//foo.com/bar/main.js.map');
      });

      it('normalizes input', () => {
        const base = '//foo.com';
        const input = '.\\foo\\.\\bar\\..\\main.js.map';
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
        assert.strictEqual(resolved, '//foo.com/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js');
      });

      it('resolves package scope as path', () => {
        const base = '//foo.com';
        const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//foo.com/@babel/runtime/helpers/esm/arrayLikeToArray.js');
      });
    });

    describe('with relative Windows input', () => {
      it('resolves relative to current directory', () => {
        const base = '//foo.com';
        const input = 'bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//foo.com/bar/main.js.map');
      });

      it('resolves relative to parent multiple directory, later', () => {
        const base = '//foo.com';
        const input = 'foo\\..\\..\\..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//foo.com/bar/main.js.map');
      });

      it('normalizes input', () => {
        const base = '//foo.com';
        const input = 'foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//foo.com/foo/main.js.map');
      });

      it('resolves node_module scope as path', () => {
        const base = '//foo.com';
        const input = 'node_modules\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//foo.com/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js');
      });

      it('resolves package scope as path', () => {
        const base = '//foo.com';
        const input = '@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js';
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

      it('normalizes file protocol 1', () => {
        const base = '//foo.com/';
        const input = 'file:///root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 2', () => {
        const base = '//foo.com/';
        const input = 'file://root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/main.js.map');
      });

      it('normalizes file protocol 2.5', () => {
        const base = '//foo.com/';
        const input = 'file://root';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/');
      });

      it('normalizes file protocol 3', () => {
        const base = '//foo.com/';
        const input = 'file:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 4', () => {
        const base = '//foo.com/';
        const input = 'file:root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes windows file 1', () => {
        const base = '//foo.com/';
        const input = 'file:///C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 2', () => {
        const base = '//foo.com/';
        const input = 'file://C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 3', () => {
        const base = '//foo.com/';
        const input = 'file:/C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 4', () => {
        const base = '//foo.com/';
        const input = 'file:C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
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

    describe('with absolute Windows path input', () => {
      it('remains absolute path', () => {
        const base = '//foo.com/';
        const input = 'C:\\assets\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//foo.com/assets/main.js.map');
      });

      it('trims to root', () => {
        const base = '//foo.com/';
        const input = 'C:\\';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//foo.com/');
      });

      it('normalizes input', () => {
        const base = '//foo.com/';
        const input = 'C:\\foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//foo.com/foo/main.js.map');
      });

      it('normalizes current directory', () => {
        const base = '//foo.com/';
        const input = 'C:\\.\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//foo.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = '//foo.com/';
        const input = 'C:\\..\\..\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//foo.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = '//foo.com/';
        const input = 'C:\\foo\\..\\..\\..\\main.js.map';
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

    describe('with leading dot relative Windows input', () => {
      it('resolves relative to current directory', () => {
        const base = '//foo.com/';
        const input = '.\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//foo.com/bar/main.js.map');
      });

      it('resolves relative to parent directory', () => {
        const base = '//foo.com/';
        const input = '..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//foo.com/bar/main.js.map');
      });

      it('resolves relative to parent multiple directory', () => {
        const base = '//foo.com/';
        const input = '..\\..\\..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//foo.com/bar/main.js.map');
      });

      it('normalizes input', () => {
        const base = '//foo.com/';
        const input = '.\\foo\\.\\bar\\..\\main.js.map';
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
        assert.strictEqual(resolved, '//foo.com/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js');
      });

      it('resolves package scope as path', () => {
        const base = '//foo.com/';
        const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//foo.com/@babel/runtime/helpers/esm/arrayLikeToArray.js');
      });
    });

    describe('with relative Windows input', () => {
      it('resolves relative to current directory', () => {
        const base = '//foo.com/';
        const input = 'bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//foo.com/bar/main.js.map');
      });

      it('resolves relative to parent multiple directory, later', () => {
        const base = '//foo.com/';
        const input = 'foo\\..\\..\\..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//foo.com/bar/main.js.map');
      });

      it('normalizes input', () => {
        const base = '//foo.com/';
        const input = 'foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//foo.com/foo/main.js.map');
      });

      it('resolves node_module scope as path', () => {
        const base = '//foo.com/';
        const input = 'node_modules\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//foo.com/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js');
      });

      it('resolves package scope as path', () => {
        const base = '//foo.com/';
        const input = '@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js';
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

      it('normalizes file protocol 1', () => {
        const base = '//foo.com/file';
        const input = 'file:///root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 2', () => {
        const base = '//foo.com/file';
        const input = 'file://root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/main.js.map');
      });

      it('normalizes file protocol 2.5', () => {
        const base = '//foo.com/file';
        const input = 'file://root';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/');
      });

      it('normalizes file protocol 3', () => {
        const base = '//foo.com/file';
        const input = 'file:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 4', () => {
        const base = '//foo.com/file';
        const input = 'file:root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes windows file 1', () => {
        const base = '//foo.com/file';
        const input = 'file:///C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 2', () => {
        const base = '//foo.com/file';
        const input = 'file://C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 3', () => {
        const base = '//foo.com/file';
        const input = 'file:/C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 4', () => {
        const base = '//foo.com/file';
        const input = 'file:C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
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

    describe('with absolute Windows path input', () => {
      it('remains absolute path', () => {
        const base = '//foo.com/file';
        const input = 'C:\\assets\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//foo.com/assets/main.js.map');
      });

      it('trims to root', () => {
        const base = '//foo.com/file';
        const input = 'C:\\';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//foo.com/');
      });

      it('normalizes input', () => {
        const base = '//foo.com/file';
        const input = 'C:\\foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//foo.com/foo/main.js.map');
      });

      it('normalizes current directory', () => {
        const base = '//foo.com/file';
        const input = 'C:\\.\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//foo.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = '//foo.com/file';
        const input = 'C:\\..\\..\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//foo.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = '//foo.com/file';
        const input = 'C:\\foo\\..\\..\\..\\main.js.map';
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

    describe('with leading dot relative Windows input', () => {
      it('resolves relative to current directory', () => {
        const base = '//foo.com/file';
        const input = '.\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//foo.com/bar/main.js.map');
      });

      it('resolves relative to parent directory', () => {
        const base = '//foo.com/file';
        const input = '..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//foo.com/bar/main.js.map');
      });

      it('resolves relative to parent multiple directory', () => {
        const base = '//foo.com/file';
        const input = '..\\..\\..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//foo.com/bar/main.js.map');
      });

      it('normalizes input', () => {
        const base = '//foo.com/file';
        const input = '.\\foo\\.\\bar\\..\\main.js.map';
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
        assert.strictEqual(resolved, '//foo.com/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js');
      });

      it('resolves package scope as path', () => {
        const base = '//foo.com/file';
        const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//foo.com/@babel/runtime/helpers/esm/arrayLikeToArray.js');
      });
    });

    describe('with relative Windows input', () => {
      it('resolves relative to current directory', () => {
        const base = '//foo.com/file';
        const input = 'bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//foo.com/bar/main.js.map');
      });

      it('resolves relative to parent multiple directory, later', () => {
        const base = '//foo.com/file';
        const input = 'foo\\..\\..\\..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//foo.com/bar/main.js.map');
      });

      it('normalizes input', () => {
        const base = '//foo.com/file';
        const input = 'foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//foo.com/foo/main.js.map');
      });

      it('resolves node_module scope as path', () => {
        const base = '//foo.com/file';
        const input = 'node_modules\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//foo.com/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js');
      });

      it('resolves package scope as path', () => {
        const base = '//foo.com/file';
        const input = '@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js';
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

      it('normalizes file protocol 1', () => {
        const base = '//foo.com/dir/';
        const input = 'file:///root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 2', () => {
        const base = '//foo.com/dir/';
        const input = 'file://root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/main.js.map');
      });

      it('normalizes file protocol 2.5', () => {
        const base = '//foo.com/dir/';
        const input = 'file://root';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/');
      });

      it('normalizes file protocol 3', () => {
        const base = '//foo.com/dir/';
        const input = 'file:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 4', () => {
        const base = '//foo.com/dir/';
        const input = 'file:root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes windows file 1', () => {
        const base = '//foo.com/dir/';
        const input = 'file:///C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 2', () => {
        const base = '//foo.com/dir/';
        const input = 'file://C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 3', () => {
        const base = '//foo.com/dir/';
        const input = 'file:/C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 4', () => {
        const base = '//foo.com/dir/';
        const input = 'file:C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
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

    describe('with absolute Windows path input', () => {
      it('remains absolute path', () => {
        const base = '//foo.com/dir/';
        const input = 'C:\\assets\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//foo.com/assets/main.js.map');
      });

      it('trims to root', () => {
        const base = '//foo.com/dir/';
        const input = 'C:\\';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//foo.com/');
      });

      it('normalizes input', () => {
        const base = '//foo.com/dir/';
        const input = 'C:\\foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//foo.com/foo/main.js.map');
      });

      it('normalizes current directory', () => {
        const base = '//foo.com/dir/';
        const input = 'C:\\.\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//foo.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = '//foo.com/dir/';
        const input = 'C:\\..\\..\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//foo.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = '//foo.com/dir/';
        const input = 'C:\\foo\\..\\..\\..\\main.js.map';
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

    describe('with leading dot relative Windows input', () => {
      it('resolves relative to current directory', () => {
        const base = '//foo.com/dir/';
        const input = '.\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//foo.com/dir/bar/main.js.map');
      });

      it('resolves relative to parent directory', () => {
        const base = '//foo.com/dir/';
        const input = '..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//foo.com/bar/main.js.map');
      });

      it('resolves relative to parent multiple directory', () => {
        const base = '//foo.com/dir/';
        const input = '..\\..\\..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//foo.com/bar/main.js.map');
      });

      it('normalizes input', () => {
        const base = '//foo.com/dir/';
        const input = '.\\foo\\.\\bar\\..\\main.js.map';
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
        assert.strictEqual(resolved, '//foo.com/dir/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js');
      });

      it('resolves package scope as path', () => {
        const base = '//foo.com/dir/';
        const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//foo.com/dir/@babel/runtime/helpers/esm/arrayLikeToArray.js');
      });
    });

    describe('with relative Windows input', () => {
      it('resolves relative to current directory', () => {
        const base = '//foo.com/dir/';
        const input = 'bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//foo.com/dir/bar/main.js.map');
      });

      it('resolves relative to parent multiple directory, later', () => {
        const base = '//foo.com/dir/';
        const input = 'foo\\..\\..\\..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//foo.com/bar/main.js.map');
      });

      it('normalizes input', () => {
        const base = '//foo.com/dir/';
        const input = 'foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//foo.com/dir/foo/main.js.map');
      });

      it('resolves node_module scope as path', () => {
        const base = '//foo.com/dir/';
        const input = 'node_modules\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//foo.com/dir/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js');
      });

      it('resolves package scope as path', () => {
        const base = '//foo.com/dir/';
        const input = '@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//foo.com/dir/@babel/runtime/helpers/esm/arrayLikeToArray.js');
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

      it('normalizes file protocol 1', () => {
        const base = '//foo.com/dir/file';
        const input = 'file:///root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 2', () => {
        const base = '//foo.com/dir/file';
        const input = 'file://root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/main.js.map');
      });

      it('normalizes file protocol 2.5', () => {
        const base = '//foo.com/dir/file';
        const input = 'file://root';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/');
      });

      it('normalizes file protocol 3', () => {
        const base = '//foo.com/dir/file';
        const input = 'file:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 4', () => {
        const base = '//foo.com/dir/file';
        const input = 'file:root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes windows file 1', () => {
        const base = '//foo.com/dir/file';
        const input = 'file:///C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 2', () => {
        const base = '//foo.com/dir/file';
        const input = 'file://C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 3', () => {
        const base = '//foo.com/dir/file';
        const input = 'file:/C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 4', () => {
        const base = '//foo.com/dir/file';
        const input = 'file:C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
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

    describe('with absolute Windows path input', () => {
      it('remains absolute path', () => {
        const base = '//foo.com/dir/file';
        const input = 'C:\\assets\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//foo.com/assets/main.js.map');
      });

      it('trims to root', () => {
        const base = '//foo.com/dir/file';
        const input = 'C:\\';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//foo.com/');
      });

      it('normalizes input', () => {
        const base = '//foo.com/dir/file';
        const input = 'C:\\foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//foo.com/foo/main.js.map');
      });

      it('normalizes current directory', () => {
        const base = '//foo.com/dir/file';
        const input = 'C:\\.\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//foo.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = '//foo.com/dir/file';
        const input = 'C:\\..\\..\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//foo.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = '//foo.com/dir/file';
        const input = 'C:\\foo\\..\\..\\..\\main.js.map';
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

    describe('with leading dot relative Windows input', () => {
      it('resolves relative to current directory', () => {
        const base = '//foo.com/dir/file';
        const input = '.\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//foo.com/dir/bar/main.js.map');
      });

      it('resolves relative to parent directory', () => {
        const base = '//foo.com/dir/file';
        const input = '..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//foo.com/bar/main.js.map');
      });

      it('resolves relative to parent multiple directory', () => {
        const base = '//foo.com/dir/file';
        const input = '..\\..\\..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//foo.com/bar/main.js.map');
      });

      it('normalizes input', () => {
        const base = '//foo.com/dir/file';
        const input = '.\\foo\\.\\bar\\..\\main.js.map';
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
        assert.strictEqual(resolved, '//foo.com/dir/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js');
      });

      it('resolves package scope as path', () => {
        const base = '//foo.com/dir/file';
        const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//foo.com/dir/@babel/runtime/helpers/esm/arrayLikeToArray.js');
      });
    });

    describe('with relative Windows input', () => {
      it('resolves relative to current directory', () => {
        const base = '//foo.com/dir/file';
        const input = 'bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//foo.com/dir/bar/main.js.map');
      });

      it('resolves relative to parent multiple directory, later', () => {
        const base = '//foo.com/dir/file';
        const input = 'foo\\..\\..\\..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//foo.com/bar/main.js.map');
      });

      it('normalizes input', () => {
        const base = '//foo.com/dir/file';
        const input = 'foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//foo.com/dir/foo/main.js.map');
      });

      it('resolves node_module scope as path', () => {
        const base = '//foo.com/dir/file';
        const input = 'node_modules\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//foo.com/dir/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js');
      });

      it('resolves package scope as path', () => {
        const base = '//foo.com/dir/file';
        const input = '@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//foo.com/dir/@babel/runtime/helpers/esm/arrayLikeToArray.js');
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

      it('normalizes file protocol 1', () => {
        const base = '//foo.com/..';
        const input = 'file:///root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 2', () => {
        const base = '//foo.com/..';
        const input = 'file://root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/main.js.map');
      });

      it('normalizes file protocol 2.5', () => {
        const base = '//foo.com/..';
        const input = 'file://root';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/');
      });

      it('normalizes file protocol 3', () => {
        const base = '//foo.com/..';
        const input = 'file:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 4', () => {
        const base = '//foo.com/..';
        const input = 'file:root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes windows file 1', () => {
        const base = '//foo.com/..';
        const input = 'file:///C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 2', () => {
        const base = '//foo.com/..';
        const input = 'file://C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 3', () => {
        const base = '//foo.com/..';
        const input = 'file:/C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 4', () => {
        const base = '//foo.com/..';
        const input = 'file:C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
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

    describe('with absolute Windows path input', () => {
      it('remains absolute path', () => {
        const base = '//foo.com/..';
        const input = 'C:\\assets\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//foo.com/assets/main.js.map');
      });

      it('trims to root', () => {
        const base = '//foo.com/..';
        const input = 'C:\\';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//foo.com/');
      });

      it('normalizes input', () => {
        const base = '//foo.com/..';
        const input = 'C:\\foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//foo.com/foo/main.js.map');
      });

      it('normalizes current directory', () => {
        const base = '//foo.com/..';
        const input = 'C:\\.\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//foo.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = '//foo.com/..';
        const input = 'C:\\..\\..\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//foo.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = '//foo.com/..';
        const input = 'C:\\foo\\..\\..\\..\\main.js.map';
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

    describe('with leading dot relative Windows input', () => {
      it('resolves relative to current directory', () => {
        const base = '//foo.com/..';
        const input = '.\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//foo.com/bar/main.js.map');
      });

      it('resolves relative to parent directory', () => {
        const base = '//foo.com/..';
        const input = '..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//foo.com/bar/main.js.map');
      });

      it('resolves relative to parent multiple directory', () => {
        const base = '//foo.com/..';
        const input = '..\\..\\..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//foo.com/bar/main.js.map');
      });

      it('normalizes input', () => {
        const base = '//foo.com/..';
        const input = '.\\foo\\.\\bar\\..\\main.js.map';
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
        assert.strictEqual(resolved, '//foo.com/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js');
      });

      it('resolves package scope as path', () => {
        const base = '//foo.com/..';
        const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//foo.com/@babel/runtime/helpers/esm/arrayLikeToArray.js');
      });
    });

    describe('with relative Windows input', () => {
      it('resolves relative to current directory', () => {
        const base = '//foo.com/..';
        const input = 'bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//foo.com/bar/main.js.map');
      });

      it('resolves relative to parent multiple directory, later', () => {
        const base = '//foo.com/..';
        const input = 'foo\\..\\..\\..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//foo.com/bar/main.js.map');
      });

      it('normalizes input', () => {
        const base = '//foo.com/..';
        const input = 'foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//foo.com/foo/main.js.map');
      });

      it('resolves node_module scope as path', () => {
        const base = '//foo.com/..';
        const input = 'node_modules\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//foo.com/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js');
      });

      it('resolves package scope as path', () => {
        const base = '//foo.com/..';
        const input = '@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js';
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

      it('normalizes file protocol 1', () => {
        const base = '//foo.com/../';
        const input = 'file:///root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 2', () => {
        const base = '//foo.com/../';
        const input = 'file://root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/main.js.map');
      });

      it('normalizes file protocol 2.5', () => {
        const base = '//foo.com/../';
        const input = 'file://root';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/');
      });

      it('normalizes file protocol 3', () => {
        const base = '//foo.com/../';
        const input = 'file:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 4', () => {
        const base = '//foo.com/../';
        const input = 'file:root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes windows file 1', () => {
        const base = '//foo.com/../';
        const input = 'file:///C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 2', () => {
        const base = '//foo.com/../';
        const input = 'file://C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 3', () => {
        const base = '//foo.com/../';
        const input = 'file:/C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 4', () => {
        const base = '//foo.com/../';
        const input = 'file:C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
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

    describe('with absolute Windows path input', () => {
      it('remains absolute path', () => {
        const base = '//foo.com/../';
        const input = 'C:\\assets\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//foo.com/assets/main.js.map');
      });

      it('trims to root', () => {
        const base = '//foo.com/../';
        const input = 'C:\\';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//foo.com/');
      });

      it('normalizes input', () => {
        const base = '//foo.com/../';
        const input = 'C:\\foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//foo.com/foo/main.js.map');
      });

      it('normalizes current directory', () => {
        const base = '//foo.com/../';
        const input = 'C:\\.\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//foo.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = '//foo.com/../';
        const input = 'C:\\..\\..\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//foo.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = '//foo.com/../';
        const input = 'C:\\foo\\..\\..\\..\\main.js.map';
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

    describe('with leading dot relative Windows input', () => {
      it('resolves relative to current directory', () => {
        const base = '//foo.com/../';
        const input = '.\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//foo.com/bar/main.js.map');
      });

      it('resolves relative to parent directory', () => {
        const base = '//foo.com/../';
        const input = '..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//foo.com/bar/main.js.map');
      });

      it('resolves relative to parent multiple directory', () => {
        const base = '//foo.com/../';
        const input = '..\\..\\..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//foo.com/bar/main.js.map');
      });

      it('normalizes input', () => {
        const base = '//foo.com/../';
        const input = '.\\foo\\.\\bar\\..\\main.js.map';
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
        assert.strictEqual(resolved, '//foo.com/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js');
      });

      it('resolves package scope as path', () => {
        const base = '//foo.com/../';
        const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//foo.com/@babel/runtime/helpers/esm/arrayLikeToArray.js');
      });
    });

    describe('with relative Windows input', () => {
      it('resolves relative to current directory', () => {
        const base = '//foo.com/../';
        const input = 'bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//foo.com/bar/main.js.map');
      });

      it('resolves relative to parent multiple directory, later', () => {
        const base = '//foo.com/../';
        const input = 'foo\\..\\..\\..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//foo.com/bar/main.js.map');
      });

      it('normalizes input', () => {
        const base = '//foo.com/../';
        const input = 'foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//foo.com/foo/main.js.map');
      });

      it('resolves node_module scope as path', () => {
        const base = '//foo.com/../';
        const input = 'node_modules\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//foo.com/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js');
      });

      it('resolves package scope as path', () => {
        const base = '//foo.com/../';
        const input = '@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js';
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

      it('normalizes file protocol 1', () => {
        const base = '//foo.com/dir/..';
        const input = 'file:///root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 2', () => {
        const base = '//foo.com/dir/..';
        const input = 'file://root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/main.js.map');
      });

      it('normalizes file protocol 2.5', () => {
        const base = '//foo.com/dir/..';
        const input = 'file://root';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/');
      });

      it('normalizes file protocol 3', () => {
        const base = '//foo.com/dir/..';
        const input = 'file:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 4', () => {
        const base = '//foo.com/dir/..';
        const input = 'file:root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes windows file 1', () => {
        const base = '//foo.com/dir/..';
        const input = 'file:///C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 2', () => {
        const base = '//foo.com/dir/..';
        const input = 'file://C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 3', () => {
        const base = '//foo.com/dir/..';
        const input = 'file:/C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 4', () => {
        const base = '//foo.com/dir/..';
        const input = 'file:C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
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

    describe('with absolute Windows path input', () => {
      it('remains absolute path', () => {
        const base = '//foo.com/dir/..';
        const input = 'C:\\assets\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//foo.com/assets/main.js.map');
      });

      it('trims to root', () => {
        const base = '//foo.com/dir/..';
        const input = 'C:\\';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//foo.com/');
      });

      it('normalizes input', () => {
        const base = '//foo.com/dir/..';
        const input = 'C:\\foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//foo.com/foo/main.js.map');
      });

      it('normalizes current directory', () => {
        const base = '//foo.com/dir/..';
        const input = 'C:\\.\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//foo.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = '//foo.com/dir/..';
        const input = 'C:\\..\\..\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//foo.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = '//foo.com/dir/..';
        const input = 'C:\\foo\\..\\..\\..\\main.js.map';
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

    describe('with leading dot relative Windows input', () => {
      it('resolves relative to current directory', () => {
        const base = '//foo.com/dir/..';
        const input = '.\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//foo.com/bar/main.js.map');
      });

      it('resolves relative to parent directory', () => {
        const base = '//foo.com/dir/..';
        const input = '..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//foo.com/bar/main.js.map');
      });

      it('resolves relative to parent multiple directory', () => {
        const base = '//foo.com/dir/..';
        const input = '..\\..\\..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//foo.com/bar/main.js.map');
      });

      it('normalizes input', () => {
        const base = '//foo.com/dir/..';
        const input = '.\\foo\\.\\bar\\..\\main.js.map';
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
        assert.strictEqual(resolved, '//foo.com/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js');
      });

      it('resolves package scope as path', () => {
        const base = '//foo.com/dir/..';
        const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//foo.com/@babel/runtime/helpers/esm/arrayLikeToArray.js');
      });
    });

    describe('with relative Windows input', () => {
      it('resolves relative to current directory', () => {
        const base = '//foo.com/dir/..';
        const input = 'bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//foo.com/bar/main.js.map');
      });

      it('resolves relative to parent multiple directory, later', () => {
        const base = '//foo.com/dir/..';
        const input = 'foo\\..\\..\\..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//foo.com/bar/main.js.map');
      });

      it('normalizes input', () => {
        const base = '//foo.com/dir/..';
        const input = 'foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//foo.com/foo/main.js.map');
      });

      it('resolves node_module scope as path', () => {
        const base = '//foo.com/dir/..';
        const input = 'node_modules\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//foo.com/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js');
      });

      it('resolves package scope as path', () => {
        const base = '//foo.com/dir/..';
        const input = '@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js';
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

  describe(`base = "//g"`, () => {
    describe('with absolute input', () => {
      it('returns input', () => {
        const base = '//g';
        const input = 'https://absolute.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = '//g';
        const input = 'https://absolute.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = '//g';
        const input = 'https://absolute.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/');
      });

      it('normalizes current directory', () => {
        const base = '//g';
        const input = 'https://absolute.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = '//g';
        const input = 'https://absolute.com/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = '//g';
        const input = 'https://absolute.com/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes file protocol 1', () => {
        const base = '//g';
        const input = 'file:///root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 2', () => {
        const base = '//g';
        const input = 'file://root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/main.js.map');
      });

      it('normalizes file protocol 2.5', () => {
        const base = '//g';
        const input = 'file://root';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/');
      });

      it('normalizes file protocol 3', () => {
        const base = '//g';
        const input = 'file:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 4', () => {
        const base = '//g';
        const input = 'file:root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes windows file 1', () => {
        const base = '//g';
        const input = 'file:///C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 2', () => {
        const base = '//g';
        const input = 'file://C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 3', () => {
        const base = '//g';
        const input = 'file:/C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 4', () => {
        const base = '//g';
        const input = 'file:C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });
    });

    describe('with protocol relative input', () => {
      it('resolves relative to the base protocol', () => {
        const base = '//g';
        const input = '//protocol-relative.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = '//g';
        const input = '//protocol-relative.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = '//g';
        const input = '//protocol-relative.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/');
      });

      it('normalizes current directory', () => {
        const base = '//g';
        const input = '//protocol-relative.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = '//g';
        const input = '//protocol-relative.com/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = '//g';
        const input = '//protocol-relative.com/foo/../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });
    });

    describe('with absolute path input', () => {
      it('remains absolute path', () => {
        const base = '//g';
        const input = '/assets/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/assets/main.js.map');
      });

      it('trims to root', () => {
        const base = '//g';
        const input = '/';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/');
      });

      it('normalizes input', () => {
        const base = '//g';
        const input = '/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/foo/main.js.map');
      });

      it('normalizes current directory', () => {
        const base = '//g';
        const input = '/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = '//g';
        const input = '/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = '//g';
        const input = '/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/main.js.map');
      });
    });

    describe('with absolute Windows path input', () => {
      it('remains absolute path', () => {
        const base = '//g';
        const input = 'C:\\assets\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/assets/main.js.map');
      });

      it('trims to root', () => {
        const base = '//g';
        const input = 'C:\\';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/');
      });

      it('normalizes input', () => {
        const base = '//g';
        const input = 'C:\\foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/foo/main.js.map');
      });

      it('normalizes current directory', () => {
        const base = '//g';
        const input = 'C:\\.\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = '//g';
        const input = 'C:\\..\\..\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = '//g';
        const input = 'C:\\foo\\..\\..\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/main.js.map');
      });
    });

    describe('with leading dot relative input', () => {
      it('resolves relative to current directory', () => {
        const base = '//g';
        const input = './bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/bar/main.js.map');
      });

      it('resolves relative to parent directory', () => {
        const base = '//g';
        const input = '../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/bar/main.js.map');
      });

      it('resolves relative to parent multiple directory', () => {
        const base = '//g';
        const input = '../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/bar/main.js.map');
      });

      it('normalizes input', () => {
        const base = '//g';
        const input = './foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/foo/main.js.map');
      });
    });

    describe('with leading dot relative Windows input', () => {
      it('resolves relative to current directory', () => {
        const base = '//g';
        const input = '.\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/bar/main.js.map');
      });

      it('resolves relative to parent directory', () => {
        const base = '//g';
        const input = '..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/bar/main.js.map');
      });

      it('resolves relative to parent multiple directory', () => {
        const base = '//g';
        const input = '..\\..\\..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/bar/main.js.map');
      });

      it('normalizes input', () => {
        const base = '//g';
        const input = '.\\foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/foo/main.js.map');
      });
    });

    describe('with relative input', () => {
      it('resolves relative to current directory', () => {
        const base = '//g';
        const input = 'bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/bar/main.js.map');
      });

      it('resolves relative to parent multiple directory, later', () => {
        const base = '//g';
        const input = 'foo/../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/bar/main.js.map');
      });

      it('normalizes input', () => {
        const base = '//g';
        const input = 'foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/foo/main.js.map');
      });

      it('resolves node_module scope as path', () => {
        const base = '//g';
        const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js');
      });

      it('resolves package scope as path', () => {
        const base = '//g';
        const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/@babel/runtime/helpers/esm/arrayLikeToArray.js');
      });
    });

    describe('with relative Windows input', () => {
      it('resolves relative to current directory', () => {
        const base = '//g';
        const input = 'bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/bar/main.js.map');
      });

      it('resolves relative to parent multiple directory, later', () => {
        const base = '//g';
        const input = 'foo\\..\\..\\..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/bar/main.js.map');
      });

      it('normalizes input', () => {
        const base = '//g';
        const input = 'foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/foo/main.js.map');
      });

      it('resolves node_module scope as path', () => {
        const base = '//g';
        const input = 'node_modules\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js');
      });

      it('resolves package scope as path', () => {
        const base = '//g';
        const input = '@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/@babel/runtime/helpers/esm/arrayLikeToArray.js');
      });
    });

    describe('empty input', () => {
      it('normalizes base', () => {
        const base = '//g';
        const input = '';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/');
      });
    });
  });

  describe(`base = "//g/"`, () => {
    describe('with absolute input', () => {
      it('returns input', () => {
        const base = '//g/';
        const input = 'https://absolute.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = '//g/';
        const input = 'https://absolute.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = '//g/';
        const input = 'https://absolute.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/');
      });

      it('normalizes current directory', () => {
        const base = '//g/';
        const input = 'https://absolute.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = '//g/';
        const input = 'https://absolute.com/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = '//g/';
        const input = 'https://absolute.com/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes file protocol 1', () => {
        const base = '//g/';
        const input = 'file:///root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 2', () => {
        const base = '//g/';
        const input = 'file://root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/main.js.map');
      });

      it('normalizes file protocol 2.5', () => {
        const base = '//g/';
        const input = 'file://root';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/');
      });

      it('normalizes file protocol 3', () => {
        const base = '//g/';
        const input = 'file:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 4', () => {
        const base = '//g/';
        const input = 'file:root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes windows file 1', () => {
        const base = '//g/';
        const input = 'file:///C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 2', () => {
        const base = '//g/';
        const input = 'file://C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 3', () => {
        const base = '//g/';
        const input = 'file:/C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 4', () => {
        const base = '//g/';
        const input = 'file:C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });
    });

    describe('with protocol relative input', () => {
      it('resolves relative to the base protocol', () => {
        const base = '//g/';
        const input = '//protocol-relative.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = '//g/';
        const input = '//protocol-relative.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = '//g/';
        const input = '//protocol-relative.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/');
      });

      it('normalizes current directory', () => {
        const base = '//g/';
        const input = '//protocol-relative.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = '//g/';
        const input = '//protocol-relative.com/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = '//g/';
        const input = '//protocol-relative.com/foo/../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });
    });

    describe('with absolute path input', () => {
      it('remains absolute path', () => {
        const base = '//g/';
        const input = '/assets/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/assets/main.js.map');
      });

      it('trims to root', () => {
        const base = '//g/';
        const input = '/';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/');
      });

      it('normalizes input', () => {
        const base = '//g/';
        const input = '/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/foo/main.js.map');
      });

      it('normalizes current directory', () => {
        const base = '//g/';
        const input = '/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = '//g/';
        const input = '/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = '//g/';
        const input = '/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/main.js.map');
      });
    });

    describe('with absolute Windows path input', () => {
      it('remains absolute path', () => {
        const base = '//g/';
        const input = 'C:\\assets\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/assets/main.js.map');
      });

      it('trims to root', () => {
        const base = '//g/';
        const input = 'C:\\';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/');
      });

      it('normalizes input', () => {
        const base = '//g/';
        const input = 'C:\\foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/foo/main.js.map');
      });

      it('normalizes current directory', () => {
        const base = '//g/';
        const input = 'C:\\.\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = '//g/';
        const input = 'C:\\..\\..\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = '//g/';
        const input = 'C:\\foo\\..\\..\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/main.js.map');
      });
    });

    describe('with leading dot relative input', () => {
      it('resolves relative to current directory', () => {
        const base = '//g/';
        const input = './bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/bar/main.js.map');
      });

      it('resolves relative to parent directory', () => {
        const base = '//g/';
        const input = '../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/bar/main.js.map');
      });

      it('resolves relative to parent multiple directory', () => {
        const base = '//g/';
        const input = '../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/bar/main.js.map');
      });

      it('normalizes input', () => {
        const base = '//g/';
        const input = './foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/foo/main.js.map');
      });
    });

    describe('with leading dot relative Windows input', () => {
      it('resolves relative to current directory', () => {
        const base = '//g/';
        const input = '.\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/bar/main.js.map');
      });

      it('resolves relative to parent directory', () => {
        const base = '//g/';
        const input = '..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/bar/main.js.map');
      });

      it('resolves relative to parent multiple directory', () => {
        const base = '//g/';
        const input = '..\\..\\..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/bar/main.js.map');
      });

      it('normalizes input', () => {
        const base = '//g/';
        const input = '.\\foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/foo/main.js.map');
      });
    });

    describe('with relative input', () => {
      it('resolves relative to current directory', () => {
        const base = '//g/';
        const input = 'bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/bar/main.js.map');
      });

      it('resolves relative to parent multiple directory, later', () => {
        const base = '//g/';
        const input = 'foo/../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/bar/main.js.map');
      });

      it('normalizes input', () => {
        const base = '//g/';
        const input = 'foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/foo/main.js.map');
      });

      it('resolves node_module scope as path', () => {
        const base = '//g/';
        const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js');
      });

      it('resolves package scope as path', () => {
        const base = '//g/';
        const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/@babel/runtime/helpers/esm/arrayLikeToArray.js');
      });
    });

    describe('with relative Windows input', () => {
      it('resolves relative to current directory', () => {
        const base = '//g/';
        const input = 'bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/bar/main.js.map');
      });

      it('resolves relative to parent multiple directory, later', () => {
        const base = '//g/';
        const input = 'foo\\..\\..\\..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/bar/main.js.map');
      });

      it('normalizes input', () => {
        const base = '//g/';
        const input = 'foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/foo/main.js.map');
      });

      it('resolves node_module scope as path', () => {
        const base = '//g/';
        const input = 'node_modules\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js');
      });

      it('resolves package scope as path', () => {
        const base = '//g/';
        const input = '@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/@babel/runtime/helpers/esm/arrayLikeToArray.js');
      });
    });

    describe('empty input', () => {
      it('normalizes base', () => {
        const base = '//g/';
        const input = '';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/');
      });
    });
  });

  describe(`base = "//g/file"`, () => {
    describe('with absolute input', () => {
      it('returns input', () => {
        const base = '//g/file';
        const input = 'https://absolute.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = '//g/file';
        const input = 'https://absolute.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = '//g/file';
        const input = 'https://absolute.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/');
      });

      it('normalizes current directory', () => {
        const base = '//g/file';
        const input = 'https://absolute.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = '//g/file';
        const input = 'https://absolute.com/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = '//g/file';
        const input = 'https://absolute.com/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes file protocol 1', () => {
        const base = '//g/file';
        const input = 'file:///root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 2', () => {
        const base = '//g/file';
        const input = 'file://root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/main.js.map');
      });

      it('normalizes file protocol 2.5', () => {
        const base = '//g/file';
        const input = 'file://root';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/');
      });

      it('normalizes file protocol 3', () => {
        const base = '//g/file';
        const input = 'file:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 4', () => {
        const base = '//g/file';
        const input = 'file:root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes windows file 1', () => {
        const base = '//g/file';
        const input = 'file:///C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 2', () => {
        const base = '//g/file';
        const input = 'file://C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 3', () => {
        const base = '//g/file';
        const input = 'file:/C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 4', () => {
        const base = '//g/file';
        const input = 'file:C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });
    });

    describe('with protocol relative input', () => {
      it('resolves relative to the base protocol', () => {
        const base = '//g/file';
        const input = '//protocol-relative.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = '//g/file';
        const input = '//protocol-relative.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = '//g/file';
        const input = '//protocol-relative.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/');
      });

      it('normalizes current directory', () => {
        const base = '//g/file';
        const input = '//protocol-relative.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = '//g/file';
        const input = '//protocol-relative.com/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = '//g/file';
        const input = '//protocol-relative.com/foo/../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });
    });

    describe('with absolute path input', () => {
      it('remains absolute path', () => {
        const base = '//g/file';
        const input = '/assets/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/assets/main.js.map');
      });

      it('trims to root', () => {
        const base = '//g/file';
        const input = '/';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/');
      });

      it('normalizes input', () => {
        const base = '//g/file';
        const input = '/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/foo/main.js.map');
      });

      it('normalizes current directory', () => {
        const base = '//g/file';
        const input = '/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = '//g/file';
        const input = '/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = '//g/file';
        const input = '/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/main.js.map');
      });
    });

    describe('with absolute Windows path input', () => {
      it('remains absolute path', () => {
        const base = '//g/file';
        const input = 'C:\\assets\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/assets/main.js.map');
      });

      it('trims to root', () => {
        const base = '//g/file';
        const input = 'C:\\';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/');
      });

      it('normalizes input', () => {
        const base = '//g/file';
        const input = 'C:\\foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/foo/main.js.map');
      });

      it('normalizes current directory', () => {
        const base = '//g/file';
        const input = 'C:\\.\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = '//g/file';
        const input = 'C:\\..\\..\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = '//g/file';
        const input = 'C:\\foo\\..\\..\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/main.js.map');
      });
    });

    describe('with leading dot relative input', () => {
      it('resolves relative to current directory', () => {
        const base = '//g/file';
        const input = './bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/bar/main.js.map');
      });

      it('resolves relative to parent directory', () => {
        const base = '//g/file';
        const input = '../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/bar/main.js.map');
      });

      it('resolves relative to parent multiple directory', () => {
        const base = '//g/file';
        const input = '../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/bar/main.js.map');
      });

      it('normalizes input', () => {
        const base = '//g/file';
        const input = './foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/foo/main.js.map');
      });
    });

    describe('with leading dot relative Windows input', () => {
      it('resolves relative to current directory', () => {
        const base = '//g/file';
        const input = '.\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/bar/main.js.map');
      });

      it('resolves relative to parent directory', () => {
        const base = '//g/file';
        const input = '..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/bar/main.js.map');
      });

      it('resolves relative to parent multiple directory', () => {
        const base = '//g/file';
        const input = '..\\..\\..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/bar/main.js.map');
      });

      it('normalizes input', () => {
        const base = '//g/file';
        const input = '.\\foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/foo/main.js.map');
      });
    });

    describe('with relative input', () => {
      it('resolves relative to current directory', () => {
        const base = '//g/file';
        const input = 'bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/bar/main.js.map');
      });

      it('resolves relative to parent multiple directory, later', () => {
        const base = '//g/file';
        const input = 'foo/../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/bar/main.js.map');
      });

      it('normalizes input', () => {
        const base = '//g/file';
        const input = 'foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/foo/main.js.map');
      });

      it('resolves node_module scope as path', () => {
        const base = '//g/file';
        const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js');
      });

      it('resolves package scope as path', () => {
        const base = '//g/file';
        const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/@babel/runtime/helpers/esm/arrayLikeToArray.js');
      });
    });

    describe('with relative Windows input', () => {
      it('resolves relative to current directory', () => {
        const base = '//g/file';
        const input = 'bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/bar/main.js.map');
      });

      it('resolves relative to parent multiple directory, later', () => {
        const base = '//g/file';
        const input = 'foo\\..\\..\\..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/bar/main.js.map');
      });

      it('normalizes input', () => {
        const base = '//g/file';
        const input = 'foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/foo/main.js.map');
      });

      it('resolves node_module scope as path', () => {
        const base = '//g/file';
        const input = 'node_modules\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js');
      });

      it('resolves package scope as path', () => {
        const base = '//g/file';
        const input = '@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/@babel/runtime/helpers/esm/arrayLikeToArray.js');
      });
    });

    describe('empty input', () => {
      it('normalizes base', () => {
        const base = '//g/file';
        const input = '';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/file');
      });
    });
  });

  describe(`base = "//g/dir/"`, () => {
    describe('with absolute input', () => {
      it('returns input', () => {
        const base = '//g/dir/';
        const input = 'https://absolute.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = '//g/dir/';
        const input = 'https://absolute.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = '//g/dir/';
        const input = 'https://absolute.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/');
      });

      it('normalizes current directory', () => {
        const base = '//g/dir/';
        const input = 'https://absolute.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = '//g/dir/';
        const input = 'https://absolute.com/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = '//g/dir/';
        const input = 'https://absolute.com/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes file protocol 1', () => {
        const base = '//g/dir/';
        const input = 'file:///root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 2', () => {
        const base = '//g/dir/';
        const input = 'file://root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/main.js.map');
      });

      it('normalizes file protocol 2.5', () => {
        const base = '//g/dir/';
        const input = 'file://root';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/');
      });

      it('normalizes file protocol 3', () => {
        const base = '//g/dir/';
        const input = 'file:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 4', () => {
        const base = '//g/dir/';
        const input = 'file:root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes windows file 1', () => {
        const base = '//g/dir/';
        const input = 'file:///C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 2', () => {
        const base = '//g/dir/';
        const input = 'file://C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 3', () => {
        const base = '//g/dir/';
        const input = 'file:/C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 4', () => {
        const base = '//g/dir/';
        const input = 'file:C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });
    });

    describe('with protocol relative input', () => {
      it('resolves relative to the base protocol', () => {
        const base = '//g/dir/';
        const input = '//protocol-relative.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = '//g/dir/';
        const input = '//protocol-relative.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = '//g/dir/';
        const input = '//protocol-relative.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/');
      });

      it('normalizes current directory', () => {
        const base = '//g/dir/';
        const input = '//protocol-relative.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = '//g/dir/';
        const input = '//protocol-relative.com/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = '//g/dir/';
        const input = '//protocol-relative.com/foo/../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });
    });

    describe('with absolute path input', () => {
      it('remains absolute path', () => {
        const base = '//g/dir/';
        const input = '/assets/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/assets/main.js.map');
      });

      it('trims to root', () => {
        const base = '//g/dir/';
        const input = '/';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/');
      });

      it('normalizes input', () => {
        const base = '//g/dir/';
        const input = '/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/foo/main.js.map');
      });

      it('normalizes current directory', () => {
        const base = '//g/dir/';
        const input = '/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = '//g/dir/';
        const input = '/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = '//g/dir/';
        const input = '/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/main.js.map');
      });
    });

    describe('with absolute Windows path input', () => {
      it('remains absolute path', () => {
        const base = '//g/dir/';
        const input = 'C:\\assets\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/assets/main.js.map');
      });

      it('trims to root', () => {
        const base = '//g/dir/';
        const input = 'C:\\';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/');
      });

      it('normalizes input', () => {
        const base = '//g/dir/';
        const input = 'C:\\foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/foo/main.js.map');
      });

      it('normalizes current directory', () => {
        const base = '//g/dir/';
        const input = 'C:\\.\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = '//g/dir/';
        const input = 'C:\\..\\..\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = '//g/dir/';
        const input = 'C:\\foo\\..\\..\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/main.js.map');
      });
    });

    describe('with leading dot relative input', () => {
      it('resolves relative to current directory', () => {
        const base = '//g/dir/';
        const input = './bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/dir/bar/main.js.map');
      });

      it('resolves relative to parent directory', () => {
        const base = '//g/dir/';
        const input = '../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/bar/main.js.map');
      });

      it('resolves relative to parent multiple directory', () => {
        const base = '//g/dir/';
        const input = '../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/bar/main.js.map');
      });

      it('normalizes input', () => {
        const base = '//g/dir/';
        const input = './foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/dir/foo/main.js.map');
      });
    });

    describe('with leading dot relative Windows input', () => {
      it('resolves relative to current directory', () => {
        const base = '//g/dir/';
        const input = '.\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/dir/bar/main.js.map');
      });

      it('resolves relative to parent directory', () => {
        const base = '//g/dir/';
        const input = '..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/bar/main.js.map');
      });

      it('resolves relative to parent multiple directory', () => {
        const base = '//g/dir/';
        const input = '..\\..\\..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/bar/main.js.map');
      });

      it('normalizes input', () => {
        const base = '//g/dir/';
        const input = '.\\foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/dir/foo/main.js.map');
      });
    });

    describe('with relative input', () => {
      it('resolves relative to current directory', () => {
        const base = '//g/dir/';
        const input = 'bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/dir/bar/main.js.map');
      });

      it('resolves relative to parent multiple directory, later', () => {
        const base = '//g/dir/';
        const input = 'foo/../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/bar/main.js.map');
      });

      it('normalizes input', () => {
        const base = '//g/dir/';
        const input = 'foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/dir/foo/main.js.map');
      });

      it('resolves node_module scope as path', () => {
        const base = '//g/dir/';
        const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/dir/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js');
      });

      it('resolves package scope as path', () => {
        const base = '//g/dir/';
        const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/dir/@babel/runtime/helpers/esm/arrayLikeToArray.js');
      });
    });

    describe('with relative Windows input', () => {
      it('resolves relative to current directory', () => {
        const base = '//g/dir/';
        const input = 'bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/dir/bar/main.js.map');
      });

      it('resolves relative to parent multiple directory, later', () => {
        const base = '//g/dir/';
        const input = 'foo\\..\\..\\..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/bar/main.js.map');
      });

      it('normalizes input', () => {
        const base = '//g/dir/';
        const input = 'foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/dir/foo/main.js.map');
      });

      it('resolves node_module scope as path', () => {
        const base = '//g/dir/';
        const input = 'node_modules\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/dir/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js');
      });

      it('resolves package scope as path', () => {
        const base = '//g/dir/';
        const input = '@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/dir/@babel/runtime/helpers/esm/arrayLikeToArray.js');
      });
    });

    describe('empty input', () => {
      it('normalizes base', () => {
        const base = '//g/dir/';
        const input = '';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/dir/');
      });
    });
  });

  describe(`base = "//g/dir/file"`, () => {
    describe('with absolute input', () => {
      it('returns input', () => {
        const base = '//g/dir/file';
        const input = 'https://absolute.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = '//g/dir/file';
        const input = 'https://absolute.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = '//g/dir/file';
        const input = 'https://absolute.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/');
      });

      it('normalizes current directory', () => {
        const base = '//g/dir/file';
        const input = 'https://absolute.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = '//g/dir/file';
        const input = 'https://absolute.com/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = '//g/dir/file';
        const input = 'https://absolute.com/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes file protocol 1', () => {
        const base = '//g/dir/file';
        const input = 'file:///root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 2', () => {
        const base = '//g/dir/file';
        const input = 'file://root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/main.js.map');
      });

      it('normalizes file protocol 2.5', () => {
        const base = '//g/dir/file';
        const input = 'file://root';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/');
      });

      it('normalizes file protocol 3', () => {
        const base = '//g/dir/file';
        const input = 'file:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 4', () => {
        const base = '//g/dir/file';
        const input = 'file:root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes windows file 1', () => {
        const base = '//g/dir/file';
        const input = 'file:///C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 2', () => {
        const base = '//g/dir/file';
        const input = 'file://C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 3', () => {
        const base = '//g/dir/file';
        const input = 'file:/C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 4', () => {
        const base = '//g/dir/file';
        const input = 'file:C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });
    });

    describe('with protocol relative input', () => {
      it('resolves relative to the base protocol', () => {
        const base = '//g/dir/file';
        const input = '//protocol-relative.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = '//g/dir/file';
        const input = '//protocol-relative.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = '//g/dir/file';
        const input = '//protocol-relative.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/');
      });

      it('normalizes current directory', () => {
        const base = '//g/dir/file';
        const input = '//protocol-relative.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = '//g/dir/file';
        const input = '//protocol-relative.com/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = '//g/dir/file';
        const input = '//protocol-relative.com/foo/../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });
    });

    describe('with absolute path input', () => {
      it('remains absolute path', () => {
        const base = '//g/dir/file';
        const input = '/assets/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/assets/main.js.map');
      });

      it('trims to root', () => {
        const base = '//g/dir/file';
        const input = '/';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/');
      });

      it('normalizes input', () => {
        const base = '//g/dir/file';
        const input = '/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/foo/main.js.map');
      });

      it('normalizes current directory', () => {
        const base = '//g/dir/file';
        const input = '/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = '//g/dir/file';
        const input = '/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = '//g/dir/file';
        const input = '/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/main.js.map');
      });
    });

    describe('with absolute Windows path input', () => {
      it('remains absolute path', () => {
        const base = '//g/dir/file';
        const input = 'C:\\assets\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/assets/main.js.map');
      });

      it('trims to root', () => {
        const base = '//g/dir/file';
        const input = 'C:\\';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/');
      });

      it('normalizes input', () => {
        const base = '//g/dir/file';
        const input = 'C:\\foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/foo/main.js.map');
      });

      it('normalizes current directory', () => {
        const base = '//g/dir/file';
        const input = 'C:\\.\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = '//g/dir/file';
        const input = 'C:\\..\\..\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = '//g/dir/file';
        const input = 'C:\\foo\\..\\..\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/main.js.map');
      });
    });

    describe('with leading dot relative input', () => {
      it('resolves relative to current directory', () => {
        const base = '//g/dir/file';
        const input = './bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/dir/bar/main.js.map');
      });

      it('resolves relative to parent directory', () => {
        const base = '//g/dir/file';
        const input = '../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/bar/main.js.map');
      });

      it('resolves relative to parent multiple directory', () => {
        const base = '//g/dir/file';
        const input = '../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/bar/main.js.map');
      });

      it('normalizes input', () => {
        const base = '//g/dir/file';
        const input = './foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/dir/foo/main.js.map');
      });
    });

    describe('with leading dot relative Windows input', () => {
      it('resolves relative to current directory', () => {
        const base = '//g/dir/file';
        const input = '.\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/dir/bar/main.js.map');
      });

      it('resolves relative to parent directory', () => {
        const base = '//g/dir/file';
        const input = '..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/bar/main.js.map');
      });

      it('resolves relative to parent multiple directory', () => {
        const base = '//g/dir/file';
        const input = '..\\..\\..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/bar/main.js.map');
      });

      it('normalizes input', () => {
        const base = '//g/dir/file';
        const input = '.\\foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/dir/foo/main.js.map');
      });
    });

    describe('with relative input', () => {
      it('resolves relative to current directory', () => {
        const base = '//g/dir/file';
        const input = 'bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/dir/bar/main.js.map');
      });

      it('resolves relative to parent multiple directory, later', () => {
        const base = '//g/dir/file';
        const input = 'foo/../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/bar/main.js.map');
      });

      it('normalizes input', () => {
        const base = '//g/dir/file';
        const input = 'foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/dir/foo/main.js.map');
      });

      it('resolves node_module scope as path', () => {
        const base = '//g/dir/file';
        const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/dir/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js');
      });

      it('resolves package scope as path', () => {
        const base = '//g/dir/file';
        const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/dir/@babel/runtime/helpers/esm/arrayLikeToArray.js');
      });
    });

    describe('with relative Windows input', () => {
      it('resolves relative to current directory', () => {
        const base = '//g/dir/file';
        const input = 'bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/dir/bar/main.js.map');
      });

      it('resolves relative to parent multiple directory, later', () => {
        const base = '//g/dir/file';
        const input = 'foo\\..\\..\\..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/bar/main.js.map');
      });

      it('normalizes input', () => {
        const base = '//g/dir/file';
        const input = 'foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/dir/foo/main.js.map');
      });

      it('resolves node_module scope as path', () => {
        const base = '//g/dir/file';
        const input = 'node_modules\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/dir/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js');
      });

      it('resolves package scope as path', () => {
        const base = '//g/dir/file';
        const input = '@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/dir/@babel/runtime/helpers/esm/arrayLikeToArray.js');
      });
    });

    describe('empty input', () => {
      it('normalizes base', () => {
        const base = '//g/dir/file';
        const input = '';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/dir/file');
      });
    });
  });

  describe(`base = "//g/.."`, () => {
    describe('with absolute input', () => {
      it('returns input', () => {
        const base = '//g/..';
        const input = 'https://absolute.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = '//g/..';
        const input = 'https://absolute.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = '//g/..';
        const input = 'https://absolute.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/');
      });

      it('normalizes current directory', () => {
        const base = '//g/..';
        const input = 'https://absolute.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = '//g/..';
        const input = 'https://absolute.com/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = '//g/..';
        const input = 'https://absolute.com/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes file protocol 1', () => {
        const base = '//g/..';
        const input = 'file:///root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 2', () => {
        const base = '//g/..';
        const input = 'file://root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/main.js.map');
      });

      it('normalizes file protocol 2.5', () => {
        const base = '//g/..';
        const input = 'file://root';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/');
      });

      it('normalizes file protocol 3', () => {
        const base = '//g/..';
        const input = 'file:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 4', () => {
        const base = '//g/..';
        const input = 'file:root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes windows file 1', () => {
        const base = '//g/..';
        const input = 'file:///C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 2', () => {
        const base = '//g/..';
        const input = 'file://C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 3', () => {
        const base = '//g/..';
        const input = 'file:/C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 4', () => {
        const base = '//g/..';
        const input = 'file:C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });
    });

    describe('with protocol relative input', () => {
      it('resolves relative to the base protocol', () => {
        const base = '//g/..';
        const input = '//protocol-relative.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = '//g/..';
        const input = '//protocol-relative.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = '//g/..';
        const input = '//protocol-relative.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/');
      });

      it('normalizes current directory', () => {
        const base = '//g/..';
        const input = '//protocol-relative.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = '//g/..';
        const input = '//protocol-relative.com/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = '//g/..';
        const input = '//protocol-relative.com/foo/../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });
    });

    describe('with absolute path input', () => {
      it('remains absolute path', () => {
        const base = '//g/..';
        const input = '/assets/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/assets/main.js.map');
      });

      it('trims to root', () => {
        const base = '//g/..';
        const input = '/';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/');
      });

      it('normalizes input', () => {
        const base = '//g/..';
        const input = '/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/foo/main.js.map');
      });

      it('normalizes current directory', () => {
        const base = '//g/..';
        const input = '/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = '//g/..';
        const input = '/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = '//g/..';
        const input = '/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/main.js.map');
      });
    });

    describe('with absolute Windows path input', () => {
      it('remains absolute path', () => {
        const base = '//g/..';
        const input = 'C:\\assets\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/assets/main.js.map');
      });

      it('trims to root', () => {
        const base = '//g/..';
        const input = 'C:\\';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/');
      });

      it('normalizes input', () => {
        const base = '//g/..';
        const input = 'C:\\foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/foo/main.js.map');
      });

      it('normalizes current directory', () => {
        const base = '//g/..';
        const input = 'C:\\.\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = '//g/..';
        const input = 'C:\\..\\..\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = '//g/..';
        const input = 'C:\\foo\\..\\..\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/main.js.map');
      });
    });

    describe('with leading dot relative input', () => {
      it('resolves relative to current directory', () => {
        const base = '//g/..';
        const input = './bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/bar/main.js.map');
      });

      it('resolves relative to parent directory', () => {
        const base = '//g/..';
        const input = '../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/bar/main.js.map');
      });

      it('resolves relative to parent multiple directory', () => {
        const base = '//g/..';
        const input = '../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/bar/main.js.map');
      });

      it('normalizes input', () => {
        const base = '//g/..';
        const input = './foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/foo/main.js.map');
      });
    });

    describe('with leading dot relative Windows input', () => {
      it('resolves relative to current directory', () => {
        const base = '//g/..';
        const input = '.\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/bar/main.js.map');
      });

      it('resolves relative to parent directory', () => {
        const base = '//g/..';
        const input = '..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/bar/main.js.map');
      });

      it('resolves relative to parent multiple directory', () => {
        const base = '//g/..';
        const input = '..\\..\\..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/bar/main.js.map');
      });

      it('normalizes input', () => {
        const base = '//g/..';
        const input = '.\\foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/foo/main.js.map');
      });
    });

    describe('with relative input', () => {
      it('resolves relative to current directory', () => {
        const base = '//g/..';
        const input = 'bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/bar/main.js.map');
      });

      it('resolves relative to parent multiple directory, later', () => {
        const base = '//g/..';
        const input = 'foo/../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/bar/main.js.map');
      });

      it('normalizes input', () => {
        const base = '//g/..';
        const input = 'foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/foo/main.js.map');
      });

      it('resolves node_module scope as path', () => {
        const base = '//g/..';
        const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js');
      });

      it('resolves package scope as path', () => {
        const base = '//g/..';
        const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/@babel/runtime/helpers/esm/arrayLikeToArray.js');
      });
    });

    describe('with relative Windows input', () => {
      it('resolves relative to current directory', () => {
        const base = '//g/..';
        const input = 'bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/bar/main.js.map');
      });

      it('resolves relative to parent multiple directory, later', () => {
        const base = '//g/..';
        const input = 'foo\\..\\..\\..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/bar/main.js.map');
      });

      it('normalizes input', () => {
        const base = '//g/..';
        const input = 'foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/foo/main.js.map');
      });

      it('resolves node_module scope as path', () => {
        const base = '//g/..';
        const input = 'node_modules\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js');
      });

      it('resolves package scope as path', () => {
        const base = '//g/..';
        const input = '@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/@babel/runtime/helpers/esm/arrayLikeToArray.js');
      });
    });

    describe('empty input', () => {
      it('normalizes base', () => {
        const base = '//g/..';
        const input = '';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/');
      });
    });
  });

  describe(`base = "//g/../"`, () => {
    describe('with absolute input', () => {
      it('returns input', () => {
        const base = '//g/../';
        const input = 'https://absolute.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = '//g/../';
        const input = 'https://absolute.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = '//g/../';
        const input = 'https://absolute.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/');
      });

      it('normalizes current directory', () => {
        const base = '//g/../';
        const input = 'https://absolute.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = '//g/../';
        const input = 'https://absolute.com/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = '//g/../';
        const input = 'https://absolute.com/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes file protocol 1', () => {
        const base = '//g/../';
        const input = 'file:///root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 2', () => {
        const base = '//g/../';
        const input = 'file://root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/main.js.map');
      });

      it('normalizes file protocol 2.5', () => {
        const base = '//g/../';
        const input = 'file://root';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/');
      });

      it('normalizes file protocol 3', () => {
        const base = '//g/../';
        const input = 'file:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 4', () => {
        const base = '//g/../';
        const input = 'file:root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes windows file 1', () => {
        const base = '//g/../';
        const input = 'file:///C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 2', () => {
        const base = '//g/../';
        const input = 'file://C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 3', () => {
        const base = '//g/../';
        const input = 'file:/C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 4', () => {
        const base = '//g/../';
        const input = 'file:C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });
    });

    describe('with protocol relative input', () => {
      it('resolves relative to the base protocol', () => {
        const base = '//g/../';
        const input = '//protocol-relative.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = '//g/../';
        const input = '//protocol-relative.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = '//g/../';
        const input = '//protocol-relative.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/');
      });

      it('normalizes current directory', () => {
        const base = '//g/../';
        const input = '//protocol-relative.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = '//g/../';
        const input = '//protocol-relative.com/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = '//g/../';
        const input = '//protocol-relative.com/foo/../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });
    });

    describe('with absolute path input', () => {
      it('remains absolute path', () => {
        const base = '//g/../';
        const input = '/assets/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/assets/main.js.map');
      });

      it('trims to root', () => {
        const base = '//g/../';
        const input = '/';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/');
      });

      it('normalizes input', () => {
        const base = '//g/../';
        const input = '/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/foo/main.js.map');
      });

      it('normalizes current directory', () => {
        const base = '//g/../';
        const input = '/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = '//g/../';
        const input = '/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = '//g/../';
        const input = '/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/main.js.map');
      });
    });

    describe('with absolute Windows path input', () => {
      it('remains absolute path', () => {
        const base = '//g/../';
        const input = 'C:\\assets\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/assets/main.js.map');
      });

      it('trims to root', () => {
        const base = '//g/../';
        const input = 'C:\\';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/');
      });

      it('normalizes input', () => {
        const base = '//g/../';
        const input = 'C:\\foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/foo/main.js.map');
      });

      it('normalizes current directory', () => {
        const base = '//g/../';
        const input = 'C:\\.\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = '//g/../';
        const input = 'C:\\..\\..\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = '//g/../';
        const input = 'C:\\foo\\..\\..\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/main.js.map');
      });
    });

    describe('with leading dot relative input', () => {
      it('resolves relative to current directory', () => {
        const base = '//g/../';
        const input = './bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/bar/main.js.map');
      });

      it('resolves relative to parent directory', () => {
        const base = '//g/../';
        const input = '../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/bar/main.js.map');
      });

      it('resolves relative to parent multiple directory', () => {
        const base = '//g/../';
        const input = '../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/bar/main.js.map');
      });

      it('normalizes input', () => {
        const base = '//g/../';
        const input = './foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/foo/main.js.map');
      });
    });

    describe('with leading dot relative Windows input', () => {
      it('resolves relative to current directory', () => {
        const base = '//g/../';
        const input = '.\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/bar/main.js.map');
      });

      it('resolves relative to parent directory', () => {
        const base = '//g/../';
        const input = '..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/bar/main.js.map');
      });

      it('resolves relative to parent multiple directory', () => {
        const base = '//g/../';
        const input = '..\\..\\..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/bar/main.js.map');
      });

      it('normalizes input', () => {
        const base = '//g/../';
        const input = '.\\foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/foo/main.js.map');
      });
    });

    describe('with relative input', () => {
      it('resolves relative to current directory', () => {
        const base = '//g/../';
        const input = 'bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/bar/main.js.map');
      });

      it('resolves relative to parent multiple directory, later', () => {
        const base = '//g/../';
        const input = 'foo/../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/bar/main.js.map');
      });

      it('normalizes input', () => {
        const base = '//g/../';
        const input = 'foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/foo/main.js.map');
      });

      it('resolves node_module scope as path', () => {
        const base = '//g/../';
        const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js');
      });

      it('resolves package scope as path', () => {
        const base = '//g/../';
        const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/@babel/runtime/helpers/esm/arrayLikeToArray.js');
      });
    });

    describe('with relative Windows input', () => {
      it('resolves relative to current directory', () => {
        const base = '//g/../';
        const input = 'bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/bar/main.js.map');
      });

      it('resolves relative to parent multiple directory, later', () => {
        const base = '//g/../';
        const input = 'foo\\..\\..\\..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/bar/main.js.map');
      });

      it('normalizes input', () => {
        const base = '//g/../';
        const input = 'foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/foo/main.js.map');
      });

      it('resolves node_module scope as path', () => {
        const base = '//g/../';
        const input = 'node_modules\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js');
      });

      it('resolves package scope as path', () => {
        const base = '//g/../';
        const input = '@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/@babel/runtime/helpers/esm/arrayLikeToArray.js');
      });
    });

    describe('empty input', () => {
      it('normalizes base', () => {
        const base = '//g/../';
        const input = '';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/');
      });
    });
  });

  describe(`base = "//g/dir/.."`, () => {
    describe('with absolute input', () => {
      it('returns input', () => {
        const base = '//g/dir/..';
        const input = 'https://absolute.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = '//g/dir/..';
        const input = 'https://absolute.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = '//g/dir/..';
        const input = 'https://absolute.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/');
      });

      it('normalizes current directory', () => {
        const base = '//g/dir/..';
        const input = 'https://absolute.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = '//g/dir/..';
        const input = 'https://absolute.com/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = '//g/dir/..';
        const input = 'https://absolute.com/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes file protocol 1', () => {
        const base = '//g/dir/..';
        const input = 'file:///root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 2', () => {
        const base = '//g/dir/..';
        const input = 'file://root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/main.js.map');
      });

      it('normalizes file protocol 2.5', () => {
        const base = '//g/dir/..';
        const input = 'file://root';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/');
      });

      it('normalizes file protocol 3', () => {
        const base = '//g/dir/..';
        const input = 'file:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 4', () => {
        const base = '//g/dir/..';
        const input = 'file:root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes windows file 1', () => {
        const base = '//g/dir/..';
        const input = 'file:///C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 2', () => {
        const base = '//g/dir/..';
        const input = 'file://C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 3', () => {
        const base = '//g/dir/..';
        const input = 'file:/C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 4', () => {
        const base = '//g/dir/..';
        const input = 'file:C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });
    });

    describe('with protocol relative input', () => {
      it('resolves relative to the base protocol', () => {
        const base = '//g/dir/..';
        const input = '//protocol-relative.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = '//g/dir/..';
        const input = '//protocol-relative.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = '//g/dir/..';
        const input = '//protocol-relative.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/');
      });

      it('normalizes current directory', () => {
        const base = '//g/dir/..';
        const input = '//protocol-relative.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = '//g/dir/..';
        const input = '//protocol-relative.com/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = '//g/dir/..';
        const input = '//protocol-relative.com/foo/../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });
    });

    describe('with absolute path input', () => {
      it('remains absolute path', () => {
        const base = '//g/dir/..';
        const input = '/assets/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/assets/main.js.map');
      });

      it('trims to root', () => {
        const base = '//g/dir/..';
        const input = '/';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/');
      });

      it('normalizes input', () => {
        const base = '//g/dir/..';
        const input = '/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/foo/main.js.map');
      });

      it('normalizes current directory', () => {
        const base = '//g/dir/..';
        const input = '/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = '//g/dir/..';
        const input = '/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = '//g/dir/..';
        const input = '/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/main.js.map');
      });
    });

    describe('with absolute Windows path input', () => {
      it('remains absolute path', () => {
        const base = '//g/dir/..';
        const input = 'C:\\assets\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/assets/main.js.map');
      });

      it('trims to root', () => {
        const base = '//g/dir/..';
        const input = 'C:\\';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/');
      });

      it('normalizes input', () => {
        const base = '//g/dir/..';
        const input = 'C:\\foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/foo/main.js.map');
      });

      it('normalizes current directory', () => {
        const base = '//g/dir/..';
        const input = 'C:\\.\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = '//g/dir/..';
        const input = 'C:\\..\\..\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = '//g/dir/..';
        const input = 'C:\\foo\\..\\..\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/main.js.map');
      });
    });

    describe('with leading dot relative input', () => {
      it('resolves relative to current directory', () => {
        const base = '//g/dir/..';
        const input = './bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/bar/main.js.map');
      });

      it('resolves relative to parent directory', () => {
        const base = '//g/dir/..';
        const input = '../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/bar/main.js.map');
      });

      it('resolves relative to parent multiple directory', () => {
        const base = '//g/dir/..';
        const input = '../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/bar/main.js.map');
      });

      it('normalizes input', () => {
        const base = '//g/dir/..';
        const input = './foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/foo/main.js.map');
      });
    });

    describe('with leading dot relative Windows input', () => {
      it('resolves relative to current directory', () => {
        const base = '//g/dir/..';
        const input = '.\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/bar/main.js.map');
      });

      it('resolves relative to parent directory', () => {
        const base = '//g/dir/..';
        const input = '..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/bar/main.js.map');
      });

      it('resolves relative to parent multiple directory', () => {
        const base = '//g/dir/..';
        const input = '..\\..\\..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/bar/main.js.map');
      });

      it('normalizes input', () => {
        const base = '//g/dir/..';
        const input = '.\\foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/foo/main.js.map');
      });
    });

    describe('with relative input', () => {
      it('resolves relative to current directory', () => {
        const base = '//g/dir/..';
        const input = 'bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/bar/main.js.map');
      });

      it('resolves relative to parent multiple directory, later', () => {
        const base = '//g/dir/..';
        const input = 'foo/../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/bar/main.js.map');
      });

      it('normalizes input', () => {
        const base = '//g/dir/..';
        const input = 'foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/foo/main.js.map');
      });

      it('resolves node_module scope as path', () => {
        const base = '//g/dir/..';
        const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js');
      });

      it('resolves package scope as path', () => {
        const base = '//g/dir/..';
        const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/@babel/runtime/helpers/esm/arrayLikeToArray.js');
      });
    });

    describe('with relative Windows input', () => {
      it('resolves relative to current directory', () => {
        const base = '//g/dir/..';
        const input = 'bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/bar/main.js.map');
      });

      it('resolves relative to parent multiple directory, later', () => {
        const base = '//g/dir/..';
        const input = 'foo\\..\\..\\..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/bar/main.js.map');
      });

      it('normalizes input', () => {
        const base = '//g/dir/..';
        const input = 'foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/foo/main.js.map');
      });

      it('resolves node_module scope as path', () => {
        const base = '//g/dir/..';
        const input = 'node_modules\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js');
      });

      it('resolves package scope as path', () => {
        const base = '//g/dir/..';
        const input = '@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/@babel/runtime/helpers/esm/arrayLikeToArray.js');
      });
    });

    describe('empty input', () => {
      it('normalizes base', () => {
        const base = '//g/dir/..';
        const input = '';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//g/');
      });
    });
  });
});
