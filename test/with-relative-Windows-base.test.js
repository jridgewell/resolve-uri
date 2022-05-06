const resolve = require('../');
const assert = require('assert');

describe('with relative Windows base', () => {
  describe(`base = "dir\\"`, () => {
    describe('with absolute input', () => {
      it('returns input', () => {
        const base = 'dir\\';
        const input = 'https://absolute.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'dir\\';
        const input = 'https://absolute.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = 'dir\\';
        const input = 'https://absolute.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/');
      });

      it('normalizes current directory', () => {
        const base = 'dir\\';
        const input = 'https://absolute.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'dir\\';
        const input = 'https://absolute.com/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'dir\\';
        const input = 'https://absolute.com/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes file protocol 1', () => {
        const base = 'dir\\';
        const input = 'file:///root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 2', () => {
        const base = 'dir\\';
        const input = 'file://root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/main.js.map');
      });

      it('normalizes file protocol 2.5', () => {
        const base = 'dir\\';
        const input = 'file://root';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/');
      });

      it('normalizes file protocol 3', () => {
        const base = 'dir\\';
        const input = 'file:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 4', () => {
        const base = 'dir\\';
        const input = 'file:root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes windows file 1', () => {
        const base = 'dir\\';
        const input = 'file:///C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 2', () => {
        const base = 'dir\\';
        const input = 'file://C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 3', () => {
        const base = 'dir\\';
        const input = 'file:/C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 4', () => {
        const base = 'dir\\';
        const input = 'file:C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });
    });

    describe('with protocol relative input', () => {
      it('resolves relative to the base protocol', () => {
        const base = 'dir\\';
        const input = '//protocol-relative.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'dir\\';
        const input = '//protocol-relative.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = 'dir\\';
        const input = '//protocol-relative.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/');
      });

      it('normalizes current directory', () => {
        const base = 'dir\\';
        const input = '//protocol-relative.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'dir\\';
        const input = '//protocol-relative.com/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'dir\\';
        const input = '//protocol-relative.com/foo/../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });
    });

    describe('with absolute path input', () => {
      it('remains absolute path', () => {
        const base = 'dir\\';
        const input = '/assets/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\assets\\main.js.map');
      });

      it('trims to root', () => {
        const base = 'dir\\';
        const input = '/';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\');
      });

      it('normalizes input', () => {
        const base = 'dir\\';
        const input = '/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\foo\\main.js.map');
      });

      it('normalizes current directory', () => {
        const base = 'dir\\';
        const input = '/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'dir\\';
        const input = '/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'dir\\';
        const input = '/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\main.js.map');
      });
    });

    describe('with absolute Windows path input', () => {
      it('remains absolute path', () => {
        const base = 'dir\\';
        const input = 'C:\\assets\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\assets\\main.js.map');
      });

      it('trims to root', () => {
        const base = 'dir\\';
        const input = 'C:\\';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\');
      });

      it('normalizes input', () => {
        const base = 'dir\\';
        const input = 'C:\\foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\foo\\main.js.map');
      });

      it('normalizes current directory', () => {
        const base = 'dir\\';
        const input = 'C:\\.\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'dir\\';
        const input = 'C:\\..\\..\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'dir\\';
        const input = 'C:\\foo\\..\\..\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\main.js.map');
      });
    });

    describe('with leading dot relative input', () => {
      it('resolves relative to current directory', () => {
        const base = 'dir\\';
        const input = './bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'dir\\bar\\main.js.map');
      });

      it('resolves relative to parent directory', () => {
        const base = 'dir\\';
        const input = '../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'bar\\main.js.map');
      });

      it('resolves relative to parent multiple directory', () => {
        const base = 'dir\\';
        const input = '../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\..\\bar\\main.js.map');
      });

      it('normalizes input', () => {
        const base = 'dir\\';
        const input = './foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'dir\\foo\\main.js.map');
      });
    });

    describe('with leading dot relative Windows input', () => {
      it('resolves relative to current directory', () => {
        const base = 'dir\\';
        const input = '.\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'dir\\bar\\main.js.map');
      });

      it('resolves relative to parent directory', () => {
        const base = 'dir\\';
        const input = '..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'bar\\main.js.map');
      });

      it('resolves relative to parent multiple directory', () => {
        const base = 'dir\\';
        const input = '..\\..\\..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\..\\bar\\main.js.map');
      });

      it('normalizes input', () => {
        const base = 'dir\\';
        const input = '.\\foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'dir\\foo\\main.js.map');
      });
    });

    describe('with relative input', () => {
      it('resolves relative to current directory', () => {
        const base = 'dir\\';
        const input = 'bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'dir\\bar\\main.js.map');
      });

      it('resolves relative to parent multiple directory, later', () => {
        const base = 'dir\\';
        const input = 'foo/../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\bar\\main.js.map');
      });

      it('normalizes input', () => {
        const base = 'dir\\';
        const input = 'foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'dir\\foo\\main.js.map');
      });

      it('resolves node_module scope as path', () => {
        const base = 'dir\\';
        const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'dir\\node_modules\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js');
      });

      it('resolves package scope as path', () => {
        const base = 'dir\\';
        const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'dir\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js');
      });
    });

    describe('with relative Windows input', () => {
      it('resolves relative to current directory', () => {
        const base = 'dir\\';
        const input = 'bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'dir\\bar\\main.js.map');
      });

      it('resolves relative to parent multiple directory, later', () => {
        const base = 'dir\\';
        const input = 'foo\\..\\..\\..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\bar\\main.js.map');
      });

      it('normalizes input', () => {
        const base = 'dir\\';
        const input = 'foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'dir\\foo\\main.js.map');
      });

      it('resolves node_module scope as path', () => {
        const base = 'dir\\';
        const input = 'node_modules\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'dir\\node_modules\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js');
      });

      it('resolves package scope as path', () => {
        const base = 'dir\\';
        const input = '@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'dir\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js');
      });
    });

    describe('empty input', () => {
      it('normalizes base', () => {
        const base = 'dir\\';
        const input = '';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'dir\\');
      });
    });
  });

  describe(`base = "dir\\file"`, () => {
    describe('with absolute input', () => {
      it('returns input', () => {
        const base = 'dir\\file';
        const input = 'https://absolute.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'dir\\file';
        const input = 'https://absolute.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = 'dir\\file';
        const input = 'https://absolute.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/');
      });

      it('normalizes current directory', () => {
        const base = 'dir\\file';
        const input = 'https://absolute.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'dir\\file';
        const input = 'https://absolute.com/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'dir\\file';
        const input = 'https://absolute.com/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes file protocol 1', () => {
        const base = 'dir\\file';
        const input = 'file:///root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 2', () => {
        const base = 'dir\\file';
        const input = 'file://root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/main.js.map');
      });

      it('normalizes file protocol 2.5', () => {
        const base = 'dir\\file';
        const input = 'file://root';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/');
      });

      it('normalizes file protocol 3', () => {
        const base = 'dir\\file';
        const input = 'file:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 4', () => {
        const base = 'dir\\file';
        const input = 'file:root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes windows file 1', () => {
        const base = 'dir\\file';
        const input = 'file:///C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 2', () => {
        const base = 'dir\\file';
        const input = 'file://C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 3', () => {
        const base = 'dir\\file';
        const input = 'file:/C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 4', () => {
        const base = 'dir\\file';
        const input = 'file:C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });
    });

    describe('with protocol relative input', () => {
      it('resolves relative to the base protocol', () => {
        const base = 'dir\\file';
        const input = '//protocol-relative.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'dir\\file';
        const input = '//protocol-relative.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = 'dir\\file';
        const input = '//protocol-relative.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/');
      });

      it('normalizes current directory', () => {
        const base = 'dir\\file';
        const input = '//protocol-relative.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'dir\\file';
        const input = '//protocol-relative.com/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'dir\\file';
        const input = '//protocol-relative.com/foo/../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });
    });

    describe('with absolute path input', () => {
      it('remains absolute path', () => {
        const base = 'dir\\file';
        const input = '/assets/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\assets\\main.js.map');
      });

      it('trims to root', () => {
        const base = 'dir\\file';
        const input = '/';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\');
      });

      it('normalizes input', () => {
        const base = 'dir\\file';
        const input = '/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\foo\\main.js.map');
      });

      it('normalizes current directory', () => {
        const base = 'dir\\file';
        const input = '/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'dir\\file';
        const input = '/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'dir\\file';
        const input = '/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\main.js.map');
      });
    });

    describe('with absolute Windows path input', () => {
      it('remains absolute path', () => {
        const base = 'dir\\file';
        const input = 'C:\\assets\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\assets\\main.js.map');
      });

      it('trims to root', () => {
        const base = 'dir\\file';
        const input = 'C:\\';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\');
      });

      it('normalizes input', () => {
        const base = 'dir\\file';
        const input = 'C:\\foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\foo\\main.js.map');
      });

      it('normalizes current directory', () => {
        const base = 'dir\\file';
        const input = 'C:\\.\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'dir\\file';
        const input = 'C:\\..\\..\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'dir\\file';
        const input = 'C:\\foo\\..\\..\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\main.js.map');
      });
    });

    describe('with leading dot relative input', () => {
      it('resolves relative to current directory', () => {
        const base = 'dir\\file';
        const input = './bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'dir\\bar\\main.js.map');
      });

      it('resolves relative to parent directory', () => {
        const base = 'dir\\file';
        const input = '../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'bar\\main.js.map');
      });

      it('resolves relative to parent multiple directory', () => {
        const base = 'dir\\file';
        const input = '../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\..\\bar\\main.js.map');
      });

      it('normalizes input', () => {
        const base = 'dir\\file';
        const input = './foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'dir\\foo\\main.js.map');
      });
    });

    describe('with leading dot relative Windows input', () => {
      it('resolves relative to current directory', () => {
        const base = 'dir\\file';
        const input = '.\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'dir\\bar\\main.js.map');
      });

      it('resolves relative to parent directory', () => {
        const base = 'dir\\file';
        const input = '..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'bar\\main.js.map');
      });

      it('resolves relative to parent multiple directory', () => {
        const base = 'dir\\file';
        const input = '..\\..\\..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\..\\bar\\main.js.map');
      });

      it('normalizes input', () => {
        const base = 'dir\\file';
        const input = '.\\foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'dir\\foo\\main.js.map');
      });
    });

    describe('with relative input', () => {
      it('resolves relative to current directory', () => {
        const base = 'dir\\file';
        const input = 'bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'dir\\bar\\main.js.map');
      });

      it('resolves relative to parent multiple directory, later', () => {
        const base = 'dir\\file';
        const input = 'foo/../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\bar\\main.js.map');
      });

      it('normalizes input', () => {
        const base = 'dir\\file';
        const input = 'foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'dir\\foo\\main.js.map');
      });

      it('resolves node_module scope as path', () => {
        const base = 'dir\\file';
        const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'dir\\node_modules\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js');
      });

      it('resolves package scope as path', () => {
        const base = 'dir\\file';
        const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'dir\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js');
      });
    });

    describe('with relative Windows input', () => {
      it('resolves relative to current directory', () => {
        const base = 'dir\\file';
        const input = 'bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'dir\\bar\\main.js.map');
      });

      it('resolves relative to parent multiple directory, later', () => {
        const base = 'dir\\file';
        const input = 'foo\\..\\..\\..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\bar\\main.js.map');
      });

      it('normalizes input', () => {
        const base = 'dir\\file';
        const input = 'foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'dir\\foo\\main.js.map');
      });

      it('resolves node_module scope as path', () => {
        const base = 'dir\\file';
        const input = 'node_modules\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'dir\\node_modules\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js');
      });

      it('resolves package scope as path', () => {
        const base = 'dir\\file';
        const input = '@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'dir\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js');
      });
    });

    describe('empty input', () => {
      it('normalizes base', () => {
        const base = 'dir\\file';
        const input = '';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'dir\\file');
      });
    });
  });

  describe(`base = "deep\\dir\\"`, () => {
    describe('with absolute input', () => {
      it('returns input', () => {
        const base = 'deep\\dir\\';
        const input = 'https://absolute.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'deep\\dir\\';
        const input = 'https://absolute.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = 'deep\\dir\\';
        const input = 'https://absolute.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/');
      });

      it('normalizes current directory', () => {
        const base = 'deep\\dir\\';
        const input = 'https://absolute.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'deep\\dir\\';
        const input = 'https://absolute.com/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'deep\\dir\\';
        const input = 'https://absolute.com/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes file protocol 1', () => {
        const base = 'deep\\dir\\';
        const input = 'file:///root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 2', () => {
        const base = 'deep\\dir\\';
        const input = 'file://root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/main.js.map');
      });

      it('normalizes file protocol 2.5', () => {
        const base = 'deep\\dir\\';
        const input = 'file://root';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/');
      });

      it('normalizes file protocol 3', () => {
        const base = 'deep\\dir\\';
        const input = 'file:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 4', () => {
        const base = 'deep\\dir\\';
        const input = 'file:root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes windows file 1', () => {
        const base = 'deep\\dir\\';
        const input = 'file:///C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 2', () => {
        const base = 'deep\\dir\\';
        const input = 'file://C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 3', () => {
        const base = 'deep\\dir\\';
        const input = 'file:/C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 4', () => {
        const base = 'deep\\dir\\';
        const input = 'file:C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });
    });

    describe('with protocol relative input', () => {
      it('resolves relative to the base protocol', () => {
        const base = 'deep\\dir\\';
        const input = '//protocol-relative.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'deep\\dir\\';
        const input = '//protocol-relative.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = 'deep\\dir\\';
        const input = '//protocol-relative.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/');
      });

      it('normalizes current directory', () => {
        const base = 'deep\\dir\\';
        const input = '//protocol-relative.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'deep\\dir\\';
        const input = '//protocol-relative.com/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'deep\\dir\\';
        const input = '//protocol-relative.com/foo/../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });
    });

    describe('with absolute path input', () => {
      it('remains absolute path', () => {
        const base = 'deep\\dir\\';
        const input = '/assets/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\assets\\main.js.map');
      });

      it('trims to root', () => {
        const base = 'deep\\dir\\';
        const input = '/';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\');
      });

      it('normalizes input', () => {
        const base = 'deep\\dir\\';
        const input = '/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\foo\\main.js.map');
      });

      it('normalizes current directory', () => {
        const base = 'deep\\dir\\';
        const input = '/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'deep\\dir\\';
        const input = '/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'deep\\dir\\';
        const input = '/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\main.js.map');
      });
    });

    describe('with absolute Windows path input', () => {
      it('remains absolute path', () => {
        const base = 'deep\\dir\\';
        const input = 'C:\\assets\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\assets\\main.js.map');
      });

      it('trims to root', () => {
        const base = 'deep\\dir\\';
        const input = 'C:\\';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\');
      });

      it('normalizes input', () => {
        const base = 'deep\\dir\\';
        const input = 'C:\\foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\foo\\main.js.map');
      });

      it('normalizes current directory', () => {
        const base = 'deep\\dir\\';
        const input = 'C:\\.\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'deep\\dir\\';
        const input = 'C:\\..\\..\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'deep\\dir\\';
        const input = 'C:\\foo\\..\\..\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\main.js.map');
      });
    });

    describe('with leading dot relative input', () => {
      it('resolves relative to current directory', () => {
        const base = 'deep\\dir\\';
        const input = './bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'deep\\dir\\bar\\main.js.map');
      });

      it('resolves relative to parent directory', () => {
        const base = 'deep\\dir\\';
        const input = '../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'deep\\bar\\main.js.map');
      });

      it('resolves relative to parent multiple directory', () => {
        const base = 'deep\\dir\\';
        const input = '../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\bar\\main.js.map');
      });

      it('normalizes input', () => {
        const base = 'deep\\dir\\';
        const input = './foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'deep\\dir\\foo\\main.js.map');
      });
    });

    describe('with leading dot relative Windows input', () => {
      it('resolves relative to current directory', () => {
        const base = 'deep\\dir\\';
        const input = '.\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'deep\\dir\\bar\\main.js.map');
      });

      it('resolves relative to parent directory', () => {
        const base = 'deep\\dir\\';
        const input = '..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'deep\\bar\\main.js.map');
      });

      it('resolves relative to parent multiple directory', () => {
        const base = 'deep\\dir\\';
        const input = '..\\..\\..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\bar\\main.js.map');
      });

      it('normalizes input', () => {
        const base = 'deep\\dir\\';
        const input = '.\\foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'deep\\dir\\foo\\main.js.map');
      });
    });

    describe('with relative input', () => {
      it('resolves relative to current directory', () => {
        const base = 'deep\\dir\\';
        const input = 'bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'deep\\dir\\bar\\main.js.map');
      });

      it('resolves relative to parent multiple directory, later', () => {
        const base = 'deep\\dir\\';
        const input = 'foo/../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'bar\\main.js.map');
      });

      it('normalizes input', () => {
        const base = 'deep\\dir\\';
        const input = 'foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'deep\\dir\\foo\\main.js.map');
      });

      it('resolves node_module scope as path', () => {
        const base = 'deep\\dir\\';
        const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'deep\\dir\\node_modules\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js');
      });

      it('resolves package scope as path', () => {
        const base = 'deep\\dir\\';
        const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'deep\\dir\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js');
      });
    });

    describe('with relative Windows input', () => {
      it('resolves relative to current directory', () => {
        const base = 'deep\\dir\\';
        const input = 'bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'deep\\dir\\bar\\main.js.map');
      });

      it('resolves relative to parent multiple directory, later', () => {
        const base = 'deep\\dir\\';
        const input = 'foo\\..\\..\\..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'bar\\main.js.map');
      });

      it('normalizes input', () => {
        const base = 'deep\\dir\\';
        const input = 'foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'deep\\dir\\foo\\main.js.map');
      });

      it('resolves node_module scope as path', () => {
        const base = 'deep\\dir\\';
        const input = 'node_modules\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'deep\\dir\\node_modules\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js');
      });

      it('resolves package scope as path', () => {
        const base = 'deep\\dir\\';
        const input = '@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'deep\\dir\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js');
      });
    });

    describe('empty input', () => {
      it('normalizes base', () => {
        const base = 'deep\\dir\\';
        const input = '';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'deep\\dir\\');
      });
    });
  });

  describe(`base = ".\\file"`, () => {
    describe('with absolute input', () => {
      it('returns input', () => {
        const base = '.\\file';
        const input = 'https://absolute.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = '.\\file';
        const input = 'https://absolute.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = '.\\file';
        const input = 'https://absolute.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/');
      });

      it('normalizes current directory', () => {
        const base = '.\\file';
        const input = 'https://absolute.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = '.\\file';
        const input = 'https://absolute.com/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = '.\\file';
        const input = 'https://absolute.com/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes file protocol 1', () => {
        const base = '.\\file';
        const input = 'file:///root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 2', () => {
        const base = '.\\file';
        const input = 'file://root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/main.js.map');
      });

      it('normalizes file protocol 2.5', () => {
        const base = '.\\file';
        const input = 'file://root';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/');
      });

      it('normalizes file protocol 3', () => {
        const base = '.\\file';
        const input = 'file:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 4', () => {
        const base = '.\\file';
        const input = 'file:root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes windows file 1', () => {
        const base = '.\\file';
        const input = 'file:///C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 2', () => {
        const base = '.\\file';
        const input = 'file://C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 3', () => {
        const base = '.\\file';
        const input = 'file:/C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 4', () => {
        const base = '.\\file';
        const input = 'file:C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });
    });

    describe('with protocol relative input', () => {
      it('resolves relative to the base protocol', () => {
        const base = '.\\file';
        const input = '//protocol-relative.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = '.\\file';
        const input = '//protocol-relative.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = '.\\file';
        const input = '//protocol-relative.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/');
      });

      it('normalizes current directory', () => {
        const base = '.\\file';
        const input = '//protocol-relative.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = '.\\file';
        const input = '//protocol-relative.com/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = '.\\file';
        const input = '//protocol-relative.com/foo/../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });
    });

    describe('with absolute path input', () => {
      it('remains absolute path', () => {
        const base = '.\\file';
        const input = '/assets/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\assets\\main.js.map');
      });

      it('trims to root', () => {
        const base = '.\\file';
        const input = '/';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\');
      });

      it('normalizes input', () => {
        const base = '.\\file';
        const input = '/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\foo\\main.js.map');
      });

      it('normalizes current directory', () => {
        const base = '.\\file';
        const input = '/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = '.\\file';
        const input = '/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = '.\\file';
        const input = '/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\main.js.map');
      });
    });

    describe('with absolute Windows path input', () => {
      it('remains absolute path', () => {
        const base = '.\\file';
        const input = 'C:\\assets\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\assets\\main.js.map');
      });

      it('trims to root', () => {
        const base = '.\\file';
        const input = 'C:\\';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\');
      });

      it('normalizes input', () => {
        const base = '.\\file';
        const input = 'C:\\foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\foo\\main.js.map');
      });

      it('normalizes current directory', () => {
        const base = '.\\file';
        const input = 'C:\\.\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = '.\\file';
        const input = 'C:\\..\\..\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = '.\\file';
        const input = 'C:\\foo\\..\\..\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\main.js.map');
      });
    });

    describe('with leading dot relative input', () => {
      it('resolves relative to current directory', () => {
        const base = '.\\file';
        const input = './bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '.\\bar\\main.js.map');
      });

      it('resolves relative to parent directory', () => {
        const base = '.\\file';
        const input = '../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\bar\\main.js.map');
      });

      it('resolves relative to parent multiple directory', () => {
        const base = '.\\file';
        const input = '../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\..\\..\\bar\\main.js.map');
      });

      it('normalizes input', () => {
        const base = '.\\file';
        const input = './foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '.\\foo\\main.js.map');
      });
    });

    describe('with leading dot relative Windows input', () => {
      it('resolves relative to current directory', () => {
        const base = '.\\file';
        const input = '.\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '.\\bar\\main.js.map');
      });

      it('resolves relative to parent directory', () => {
        const base = '.\\file';
        const input = '..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\bar\\main.js.map');
      });

      it('resolves relative to parent multiple directory', () => {
        const base = '.\\file';
        const input = '..\\..\\..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\..\\..\\bar\\main.js.map');
      });

      it('normalizes input', () => {
        const base = '.\\file';
        const input = '.\\foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '.\\foo\\main.js.map');
      });
    });

    describe('with relative input', () => {
      it('resolves relative to current directory', () => {
        const base = '.\\file';
        const input = 'bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '.\\bar\\main.js.map');
      });

      it('resolves relative to parent multiple directory, later', () => {
        const base = '.\\file';
        const input = 'foo/../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\..\\bar\\main.js.map');
      });

      it('normalizes input', () => {
        const base = '.\\file';
        const input = 'foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '.\\foo\\main.js.map');
      });

      it('resolves node_module scope as path', () => {
        const base = '.\\file';
        const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '.\\node_modules\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js');
      });

      it('resolves package scope as path', () => {
        const base = '.\\file';
        const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '.\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js');
      });
    });

    describe('with relative Windows input', () => {
      it('resolves relative to current directory', () => {
        const base = '.\\file';
        const input = 'bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '.\\bar\\main.js.map');
      });

      it('resolves relative to parent multiple directory, later', () => {
        const base = '.\\file';
        const input = 'foo\\..\\..\\..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\..\\bar\\main.js.map');
      });

      it('normalizes input', () => {
        const base = '.\\file';
        const input = 'foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '.\\foo\\main.js.map');
      });

      it('resolves node_module scope as path', () => {
        const base = '.\\file';
        const input = 'node_modules\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '.\\node_modules\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js');
      });

      it('resolves package scope as path', () => {
        const base = '.\\file';
        const input = '@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '.\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js');
      });
    });

    describe('empty input', () => {
      it('normalizes base', () => {
        const base = '.\\file';
        const input = '';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '.\\file');
      });
    });
  });

  describe(`base = ".\\dir\\"`, () => {
    describe('with absolute input', () => {
      it('returns input', () => {
        const base = '.\\dir\\';
        const input = 'https://absolute.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = '.\\dir\\';
        const input = 'https://absolute.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = '.\\dir\\';
        const input = 'https://absolute.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/');
      });

      it('normalizes current directory', () => {
        const base = '.\\dir\\';
        const input = 'https://absolute.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = '.\\dir\\';
        const input = 'https://absolute.com/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = '.\\dir\\';
        const input = 'https://absolute.com/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes file protocol 1', () => {
        const base = '.\\dir\\';
        const input = 'file:///root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 2', () => {
        const base = '.\\dir\\';
        const input = 'file://root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/main.js.map');
      });

      it('normalizes file protocol 2.5', () => {
        const base = '.\\dir\\';
        const input = 'file://root';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/');
      });

      it('normalizes file protocol 3', () => {
        const base = '.\\dir\\';
        const input = 'file:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 4', () => {
        const base = '.\\dir\\';
        const input = 'file:root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes windows file 1', () => {
        const base = '.\\dir\\';
        const input = 'file:///C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 2', () => {
        const base = '.\\dir\\';
        const input = 'file://C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 3', () => {
        const base = '.\\dir\\';
        const input = 'file:/C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 4', () => {
        const base = '.\\dir\\';
        const input = 'file:C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });
    });

    describe('with protocol relative input', () => {
      it('resolves relative to the base protocol', () => {
        const base = '.\\dir\\';
        const input = '//protocol-relative.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = '.\\dir\\';
        const input = '//protocol-relative.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = '.\\dir\\';
        const input = '//protocol-relative.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/');
      });

      it('normalizes current directory', () => {
        const base = '.\\dir\\';
        const input = '//protocol-relative.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = '.\\dir\\';
        const input = '//protocol-relative.com/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = '.\\dir\\';
        const input = '//protocol-relative.com/foo/../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });
    });

    describe('with absolute path input', () => {
      it('remains absolute path', () => {
        const base = '.\\dir\\';
        const input = '/assets/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\assets\\main.js.map');
      });

      it('trims to root', () => {
        const base = '.\\dir\\';
        const input = '/';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\');
      });

      it('normalizes input', () => {
        const base = '.\\dir\\';
        const input = '/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\foo\\main.js.map');
      });

      it('normalizes current directory', () => {
        const base = '.\\dir\\';
        const input = '/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = '.\\dir\\';
        const input = '/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = '.\\dir\\';
        const input = '/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\main.js.map');
      });
    });

    describe('with absolute Windows path input', () => {
      it('remains absolute path', () => {
        const base = '.\\dir\\';
        const input = 'C:\\assets\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\assets\\main.js.map');
      });

      it('trims to root', () => {
        const base = '.\\dir\\';
        const input = 'C:\\';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\');
      });

      it('normalizes input', () => {
        const base = '.\\dir\\';
        const input = 'C:\\foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\foo\\main.js.map');
      });

      it('normalizes current directory', () => {
        const base = '.\\dir\\';
        const input = 'C:\\.\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = '.\\dir\\';
        const input = 'C:\\..\\..\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = '.\\dir\\';
        const input = 'C:\\foo\\..\\..\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\main.js.map');
      });
    });

    describe('with leading dot relative input', () => {
      it('resolves relative to current directory', () => {
        const base = '.\\dir\\';
        const input = './bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '.\\dir\\bar\\main.js.map');
      });

      it('resolves relative to parent directory', () => {
        const base = '.\\dir\\';
        const input = '../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '.\\bar\\main.js.map');
      });

      it('resolves relative to parent multiple directory', () => {
        const base = '.\\dir\\';
        const input = '../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\..\\bar\\main.js.map');
      });

      it('normalizes input', () => {
        const base = '.\\dir\\';
        const input = './foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '.\\dir\\foo\\main.js.map');
      });
    });

    describe('with leading dot relative Windows input', () => {
      it('resolves relative to current directory', () => {
        const base = '.\\dir\\';
        const input = '.\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '.\\dir\\bar\\main.js.map');
      });

      it('resolves relative to parent directory', () => {
        const base = '.\\dir\\';
        const input = '..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '.\\bar\\main.js.map');
      });

      it('resolves relative to parent multiple directory', () => {
        const base = '.\\dir\\';
        const input = '..\\..\\..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\..\\bar\\main.js.map');
      });

      it('normalizes input', () => {
        const base = '.\\dir\\';
        const input = '.\\foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '.\\dir\\foo\\main.js.map');
      });
    });

    describe('with relative input', () => {
      it('resolves relative to current directory', () => {
        const base = '.\\dir\\';
        const input = 'bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '.\\dir\\bar\\main.js.map');
      });

      it('resolves relative to parent multiple directory, later', () => {
        const base = '.\\dir\\';
        const input = 'foo/../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\bar\\main.js.map');
      });

      it('normalizes input', () => {
        const base = '.\\dir\\';
        const input = 'foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '.\\dir\\foo\\main.js.map');
      });

      it('resolves node_module scope as path', () => {
        const base = '.\\dir\\';
        const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '.\\dir\\node_modules\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js');
      });

      it('resolves package scope as path', () => {
        const base = '.\\dir\\';
        const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '.\\dir\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js');
      });
    });

    describe('with relative Windows input', () => {
      it('resolves relative to current directory', () => {
        const base = '.\\dir\\';
        const input = 'bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '.\\dir\\bar\\main.js.map');
      });

      it('resolves relative to parent multiple directory, later', () => {
        const base = '.\\dir\\';
        const input = 'foo\\..\\..\\..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\bar\\main.js.map');
      });

      it('normalizes input', () => {
        const base = '.\\dir\\';
        const input = 'foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '.\\dir\\foo\\main.js.map');
      });

      it('resolves node_module scope as path', () => {
        const base = '.\\dir\\';
        const input = 'node_modules\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '.\\dir\\node_modules\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js');
      });

      it('resolves package scope as path', () => {
        const base = '.\\dir\\';
        const input = '@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '.\\dir\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js');
      });
    });

    describe('empty input', () => {
      it('normalizes base', () => {
        const base = '.\\dir\\';
        const input = '';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '.\\dir\\');
      });
    });
  });

  describe(`base = ".\\deep\\file"`, () => {
    describe('with absolute input', () => {
      it('returns input', () => {
        const base = '.\\deep\\file';
        const input = 'https://absolute.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = '.\\deep\\file';
        const input = 'https://absolute.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = '.\\deep\\file';
        const input = 'https://absolute.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/');
      });

      it('normalizes current directory', () => {
        const base = '.\\deep\\file';
        const input = 'https://absolute.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = '.\\deep\\file';
        const input = 'https://absolute.com/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = '.\\deep\\file';
        const input = 'https://absolute.com/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes file protocol 1', () => {
        const base = '.\\deep\\file';
        const input = 'file:///root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 2', () => {
        const base = '.\\deep\\file';
        const input = 'file://root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/main.js.map');
      });

      it('normalizes file protocol 2.5', () => {
        const base = '.\\deep\\file';
        const input = 'file://root';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/');
      });

      it('normalizes file protocol 3', () => {
        const base = '.\\deep\\file';
        const input = 'file:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 4', () => {
        const base = '.\\deep\\file';
        const input = 'file:root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes windows file 1', () => {
        const base = '.\\deep\\file';
        const input = 'file:///C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 2', () => {
        const base = '.\\deep\\file';
        const input = 'file://C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 3', () => {
        const base = '.\\deep\\file';
        const input = 'file:/C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 4', () => {
        const base = '.\\deep\\file';
        const input = 'file:C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });
    });

    describe('with protocol relative input', () => {
      it('resolves relative to the base protocol', () => {
        const base = '.\\deep\\file';
        const input = '//protocol-relative.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = '.\\deep\\file';
        const input = '//protocol-relative.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = '.\\deep\\file';
        const input = '//protocol-relative.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/');
      });

      it('normalizes current directory', () => {
        const base = '.\\deep\\file';
        const input = '//protocol-relative.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = '.\\deep\\file';
        const input = '//protocol-relative.com/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = '.\\deep\\file';
        const input = '//protocol-relative.com/foo/../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });
    });

    describe('with absolute path input', () => {
      it('remains absolute path', () => {
        const base = '.\\deep\\file';
        const input = '/assets/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\assets\\main.js.map');
      });

      it('trims to root', () => {
        const base = '.\\deep\\file';
        const input = '/';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\');
      });

      it('normalizes input', () => {
        const base = '.\\deep\\file';
        const input = '/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\foo\\main.js.map');
      });

      it('normalizes current directory', () => {
        const base = '.\\deep\\file';
        const input = '/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = '.\\deep\\file';
        const input = '/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = '.\\deep\\file';
        const input = '/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\main.js.map');
      });
    });

    describe('with absolute Windows path input', () => {
      it('remains absolute path', () => {
        const base = '.\\deep\\file';
        const input = 'C:\\assets\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\assets\\main.js.map');
      });

      it('trims to root', () => {
        const base = '.\\deep\\file';
        const input = 'C:\\';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\');
      });

      it('normalizes input', () => {
        const base = '.\\deep\\file';
        const input = 'C:\\foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\foo\\main.js.map');
      });

      it('normalizes current directory', () => {
        const base = '.\\deep\\file';
        const input = 'C:\\.\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = '.\\deep\\file';
        const input = 'C:\\..\\..\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = '.\\deep\\file';
        const input = 'C:\\foo\\..\\..\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\main.js.map');
      });
    });

    describe('with leading dot relative input', () => {
      it('resolves relative to current directory', () => {
        const base = '.\\deep\\file';
        const input = './bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '.\\deep\\bar\\main.js.map');
      });

      it('resolves relative to parent directory', () => {
        const base = '.\\deep\\file';
        const input = '../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '.\\bar\\main.js.map');
      });

      it('resolves relative to parent multiple directory', () => {
        const base = '.\\deep\\file';
        const input = '../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\..\\bar\\main.js.map');
      });

      it('normalizes input', () => {
        const base = '.\\deep\\file';
        const input = './foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '.\\deep\\foo\\main.js.map');
      });
    });

    describe('with leading dot relative Windows input', () => {
      it('resolves relative to current directory', () => {
        const base = '.\\deep\\file';
        const input = '.\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '.\\deep\\bar\\main.js.map');
      });

      it('resolves relative to parent directory', () => {
        const base = '.\\deep\\file';
        const input = '..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '.\\bar\\main.js.map');
      });

      it('resolves relative to parent multiple directory', () => {
        const base = '.\\deep\\file';
        const input = '..\\..\\..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\..\\bar\\main.js.map');
      });

      it('normalizes input', () => {
        const base = '.\\deep\\file';
        const input = '.\\foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '.\\deep\\foo\\main.js.map');
      });
    });

    describe('with relative input', () => {
      it('resolves relative to current directory', () => {
        const base = '.\\deep\\file';
        const input = 'bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '.\\deep\\bar\\main.js.map');
      });

      it('resolves relative to parent multiple directory, later', () => {
        const base = '.\\deep\\file';
        const input = 'foo/../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\bar\\main.js.map');
      });

      it('normalizes input', () => {
        const base = '.\\deep\\file';
        const input = 'foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '.\\deep\\foo\\main.js.map');
      });

      it('resolves node_module scope as path', () => {
        const base = '.\\deep\\file';
        const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '.\\deep\\node_modules\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js');
      });

      it('resolves package scope as path', () => {
        const base = '.\\deep\\file';
        const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '.\\deep\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js');
      });
    });

    describe('with relative Windows input', () => {
      it('resolves relative to current directory', () => {
        const base = '.\\deep\\file';
        const input = 'bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '.\\deep\\bar\\main.js.map');
      });

      it('resolves relative to parent multiple directory, later', () => {
        const base = '.\\deep\\file';
        const input = 'foo\\..\\..\\..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\bar\\main.js.map');
      });

      it('normalizes input', () => {
        const base = '.\\deep\\file';
        const input = 'foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '.\\deep\\foo\\main.js.map');
      });

      it('resolves node_module scope as path', () => {
        const base = '.\\deep\\file';
        const input = 'node_modules\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '.\\deep\\node_modules\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js');
      });

      it('resolves package scope as path', () => {
        const base = '.\\deep\\file';
        const input = '@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '.\\deep\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js');
      });
    });

    describe('empty input', () => {
      it('normalizes base', () => {
        const base = '.\\deep\\file';
        const input = '';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '.\\deep\\file');
      });
    });
  });

  describe(`base = ".\\deep\\dir\\"`, () => {
    describe('with absolute input', () => {
      it('returns input', () => {
        const base = '.\\deep\\dir\\';
        const input = 'https://absolute.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = '.\\deep\\dir\\';
        const input = 'https://absolute.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = '.\\deep\\dir\\';
        const input = 'https://absolute.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/');
      });

      it('normalizes current directory', () => {
        const base = '.\\deep\\dir\\';
        const input = 'https://absolute.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = '.\\deep\\dir\\';
        const input = 'https://absolute.com/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = '.\\deep\\dir\\';
        const input = 'https://absolute.com/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes file protocol 1', () => {
        const base = '.\\deep\\dir\\';
        const input = 'file:///root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 2', () => {
        const base = '.\\deep\\dir\\';
        const input = 'file://root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/main.js.map');
      });

      it('normalizes file protocol 2.5', () => {
        const base = '.\\deep\\dir\\';
        const input = 'file://root';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/');
      });

      it('normalizes file protocol 3', () => {
        const base = '.\\deep\\dir\\';
        const input = 'file:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 4', () => {
        const base = '.\\deep\\dir\\';
        const input = 'file:root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes windows file 1', () => {
        const base = '.\\deep\\dir\\';
        const input = 'file:///C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 2', () => {
        const base = '.\\deep\\dir\\';
        const input = 'file://C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 3', () => {
        const base = '.\\deep\\dir\\';
        const input = 'file:/C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 4', () => {
        const base = '.\\deep\\dir\\';
        const input = 'file:C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });
    });

    describe('with protocol relative input', () => {
      it('resolves relative to the base protocol', () => {
        const base = '.\\deep\\dir\\';
        const input = '//protocol-relative.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = '.\\deep\\dir\\';
        const input = '//protocol-relative.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = '.\\deep\\dir\\';
        const input = '//protocol-relative.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/');
      });

      it('normalizes current directory', () => {
        const base = '.\\deep\\dir\\';
        const input = '//protocol-relative.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = '.\\deep\\dir\\';
        const input = '//protocol-relative.com/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = '.\\deep\\dir\\';
        const input = '//protocol-relative.com/foo/../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });
    });

    describe('with absolute path input', () => {
      it('remains absolute path', () => {
        const base = '.\\deep\\dir\\';
        const input = '/assets/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\assets\\main.js.map');
      });

      it('trims to root', () => {
        const base = '.\\deep\\dir\\';
        const input = '/';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\');
      });

      it('normalizes input', () => {
        const base = '.\\deep\\dir\\';
        const input = '/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\foo\\main.js.map');
      });

      it('normalizes current directory', () => {
        const base = '.\\deep\\dir\\';
        const input = '/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = '.\\deep\\dir\\';
        const input = '/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = '.\\deep\\dir\\';
        const input = '/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\main.js.map');
      });
    });

    describe('with absolute Windows path input', () => {
      it('remains absolute path', () => {
        const base = '.\\deep\\dir\\';
        const input = 'C:\\assets\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\assets\\main.js.map');
      });

      it('trims to root', () => {
        const base = '.\\deep\\dir\\';
        const input = 'C:\\';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\');
      });

      it('normalizes input', () => {
        const base = '.\\deep\\dir\\';
        const input = 'C:\\foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\foo\\main.js.map');
      });

      it('normalizes current directory', () => {
        const base = '.\\deep\\dir\\';
        const input = 'C:\\.\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = '.\\deep\\dir\\';
        const input = 'C:\\..\\..\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = '.\\deep\\dir\\';
        const input = 'C:\\foo\\..\\..\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\main.js.map');
      });
    });

    describe('with leading dot relative input', () => {
      it('resolves relative to current directory', () => {
        const base = '.\\deep\\dir\\';
        const input = './bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '.\\deep\\dir\\bar\\main.js.map');
      });

      it('resolves relative to parent directory', () => {
        const base = '.\\deep\\dir\\';
        const input = '../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '.\\deep\\bar\\main.js.map');
      });

      it('resolves relative to parent multiple directory', () => {
        const base = '.\\deep\\dir\\';
        const input = '../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\bar\\main.js.map');
      });

      it('normalizes input', () => {
        const base = '.\\deep\\dir\\';
        const input = './foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '.\\deep\\dir\\foo\\main.js.map');
      });
    });

    describe('with leading dot relative Windows input', () => {
      it('resolves relative to current directory', () => {
        const base = '.\\deep\\dir\\';
        const input = '.\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '.\\deep\\dir\\bar\\main.js.map');
      });

      it('resolves relative to parent directory', () => {
        const base = '.\\deep\\dir\\';
        const input = '..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '.\\deep\\bar\\main.js.map');
      });

      it('resolves relative to parent multiple directory', () => {
        const base = '.\\deep\\dir\\';
        const input = '..\\..\\..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\bar\\main.js.map');
      });

      it('normalizes input', () => {
        const base = '.\\deep\\dir\\';
        const input = '.\\foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '.\\deep\\dir\\foo\\main.js.map');
      });
    });

    describe('with relative input', () => {
      it('resolves relative to current directory', () => {
        const base = '.\\deep\\dir\\';
        const input = 'bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '.\\deep\\dir\\bar\\main.js.map');
      });

      it('resolves relative to parent multiple directory, later', () => {
        const base = '.\\deep\\dir\\';
        const input = 'foo/../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '.\\bar\\main.js.map');
      });

      it('normalizes input', () => {
        const base = '.\\deep\\dir\\';
        const input = 'foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '.\\deep\\dir\\foo\\main.js.map');
      });

      it('resolves node_module scope as path', () => {
        const base = '.\\deep\\dir\\';
        const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '.\\deep\\dir\\node_modules\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js');
      });

      it('resolves package scope as path', () => {
        const base = '.\\deep\\dir\\';
        const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '.\\deep\\dir\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js');
      });
    });

    describe('with relative Windows input', () => {
      it('resolves relative to current directory', () => {
        const base = '.\\deep\\dir\\';
        const input = 'bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '.\\deep\\dir\\bar\\main.js.map');
      });

      it('resolves relative to parent multiple directory, later', () => {
        const base = '.\\deep\\dir\\';
        const input = 'foo\\..\\..\\..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '.\\bar\\main.js.map');
      });

      it('normalizes input', () => {
        const base = '.\\deep\\dir\\';
        const input = 'foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '.\\deep\\dir\\foo\\main.js.map');
      });

      it('resolves node_module scope as path', () => {
        const base = '.\\deep\\dir\\';
        const input = 'node_modules\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '.\\deep\\dir\\node_modules\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js');
      });

      it('resolves package scope as path', () => {
        const base = '.\\deep\\dir\\';
        const input = '@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '.\\deep\\dir\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js');
      });
    });

    describe('empty input', () => {
      it('normalizes base', () => {
        const base = '.\\deep\\dir\\';
        const input = '';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '.\\deep\\dir\\');
      });
    });
  });

  describe(`base = "..\\file"`, () => {
    describe('with absolute input', () => {
      it('returns input', () => {
        const base = '..\\file';
        const input = 'https://absolute.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = '..\\file';
        const input = 'https://absolute.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = '..\\file';
        const input = 'https://absolute.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/');
      });

      it('normalizes current directory', () => {
        const base = '..\\file';
        const input = 'https://absolute.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = '..\\file';
        const input = 'https://absolute.com/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = '..\\file';
        const input = 'https://absolute.com/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes file protocol 1', () => {
        const base = '..\\file';
        const input = 'file:///root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 2', () => {
        const base = '..\\file';
        const input = 'file://root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/main.js.map');
      });

      it('normalizes file protocol 2.5', () => {
        const base = '..\\file';
        const input = 'file://root';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/');
      });

      it('normalizes file protocol 3', () => {
        const base = '..\\file';
        const input = 'file:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 4', () => {
        const base = '..\\file';
        const input = 'file:root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes windows file 1', () => {
        const base = '..\\file';
        const input = 'file:///C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 2', () => {
        const base = '..\\file';
        const input = 'file://C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 3', () => {
        const base = '..\\file';
        const input = 'file:/C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 4', () => {
        const base = '..\\file';
        const input = 'file:C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });
    });

    describe('with protocol relative input', () => {
      it('resolves relative to the base protocol', () => {
        const base = '..\\file';
        const input = '//protocol-relative.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = '..\\file';
        const input = '//protocol-relative.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = '..\\file';
        const input = '//protocol-relative.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/');
      });

      it('normalizes current directory', () => {
        const base = '..\\file';
        const input = '//protocol-relative.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = '..\\file';
        const input = '//protocol-relative.com/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = '..\\file';
        const input = '//protocol-relative.com/foo/../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });
    });

    describe('with absolute path input', () => {
      it('remains absolute path', () => {
        const base = '..\\file';
        const input = '/assets/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\assets\\main.js.map');
      });

      it('trims to root', () => {
        const base = '..\\file';
        const input = '/';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\');
      });

      it('normalizes input', () => {
        const base = '..\\file';
        const input = '/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\foo\\main.js.map');
      });

      it('normalizes current directory', () => {
        const base = '..\\file';
        const input = '/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = '..\\file';
        const input = '/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = '..\\file';
        const input = '/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\main.js.map');
      });
    });

    describe('with absolute Windows path input', () => {
      it('remains absolute path', () => {
        const base = '..\\file';
        const input = 'C:\\assets\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\assets\\main.js.map');
      });

      it('trims to root', () => {
        const base = '..\\file';
        const input = 'C:\\';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\');
      });

      it('normalizes input', () => {
        const base = '..\\file';
        const input = 'C:\\foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\foo\\main.js.map');
      });

      it('normalizes current directory', () => {
        const base = '..\\file';
        const input = 'C:\\.\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = '..\\file';
        const input = 'C:\\..\\..\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = '..\\file';
        const input = 'C:\\foo\\..\\..\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\main.js.map');
      });
    });

    describe('with leading dot relative input', () => {
      it('resolves relative to current directory', () => {
        const base = '..\\file';
        const input = './bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\bar\\main.js.map');
      });

      it('resolves relative to parent directory', () => {
        const base = '..\\file';
        const input = '../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\..\\bar\\main.js.map');
      });

      it('resolves relative to parent multiple directory', () => {
        const base = '..\\file';
        const input = '../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\..\\..\\..\\bar\\main.js.map');
      });

      it('normalizes input', () => {
        const base = '..\\file';
        const input = './foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\foo\\main.js.map');
      });
    });

    describe('with leading dot relative Windows input', () => {
      it('resolves relative to current directory', () => {
        const base = '..\\file';
        const input = '.\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\bar\\main.js.map');
      });

      it('resolves relative to parent directory', () => {
        const base = '..\\file';
        const input = '..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\..\\bar\\main.js.map');
      });

      it('resolves relative to parent multiple directory', () => {
        const base = '..\\file';
        const input = '..\\..\\..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\..\\..\\..\\bar\\main.js.map');
      });

      it('normalizes input', () => {
        const base = '..\\file';
        const input = '.\\foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\foo\\main.js.map');
      });
    });

    describe('with relative input', () => {
      it('resolves relative to current directory', () => {
        const base = '..\\file';
        const input = 'bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\bar\\main.js.map');
      });

      it('resolves relative to parent multiple directory, later', () => {
        const base = '..\\file';
        const input = 'foo/../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\..\\..\\bar\\main.js.map');
      });

      it('normalizes input', () => {
        const base = '..\\file';
        const input = 'foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\foo\\main.js.map');
      });

      it('resolves node_module scope as path', () => {
        const base = '..\\file';
        const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\node_modules\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js');
      });

      it('resolves package scope as path', () => {
        const base = '..\\file';
        const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js');
      });
    });

    describe('with relative Windows input', () => {
      it('resolves relative to current directory', () => {
        const base = '..\\file';
        const input = 'bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\bar\\main.js.map');
      });

      it('resolves relative to parent multiple directory, later', () => {
        const base = '..\\file';
        const input = 'foo\\..\\..\\..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\..\\..\\bar\\main.js.map');
      });

      it('normalizes input', () => {
        const base = '..\\file';
        const input = 'foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\foo\\main.js.map');
      });

      it('resolves node_module scope as path', () => {
        const base = '..\\file';
        const input = 'node_modules\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\node_modules\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js');
      });

      it('resolves package scope as path', () => {
        const base = '..\\file';
        const input = '@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js');
      });
    });

    describe('empty input', () => {
      it('normalizes base', () => {
        const base = '..\\file';
        const input = '';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\file');
      });
    });
  });

  describe(`base = "..\\dir\\"`, () => {
    describe('with absolute input', () => {
      it('returns input', () => {
        const base = '..\\dir\\';
        const input = 'https://absolute.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = '..\\dir\\';
        const input = 'https://absolute.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = '..\\dir\\';
        const input = 'https://absolute.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/');
      });

      it('normalizes current directory', () => {
        const base = '..\\dir\\';
        const input = 'https://absolute.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = '..\\dir\\';
        const input = 'https://absolute.com/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = '..\\dir\\';
        const input = 'https://absolute.com/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes file protocol 1', () => {
        const base = '..\\dir\\';
        const input = 'file:///root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 2', () => {
        const base = '..\\dir\\';
        const input = 'file://root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/main.js.map');
      });

      it('normalizes file protocol 2.5', () => {
        const base = '..\\dir\\';
        const input = 'file://root';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/');
      });

      it('normalizes file protocol 3', () => {
        const base = '..\\dir\\';
        const input = 'file:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 4', () => {
        const base = '..\\dir\\';
        const input = 'file:root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes windows file 1', () => {
        const base = '..\\dir\\';
        const input = 'file:///C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 2', () => {
        const base = '..\\dir\\';
        const input = 'file://C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 3', () => {
        const base = '..\\dir\\';
        const input = 'file:/C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 4', () => {
        const base = '..\\dir\\';
        const input = 'file:C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });
    });

    describe('with protocol relative input', () => {
      it('resolves relative to the base protocol', () => {
        const base = '..\\dir\\';
        const input = '//protocol-relative.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = '..\\dir\\';
        const input = '//protocol-relative.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = '..\\dir\\';
        const input = '//protocol-relative.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/');
      });

      it('normalizes current directory', () => {
        const base = '..\\dir\\';
        const input = '//protocol-relative.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = '..\\dir\\';
        const input = '//protocol-relative.com/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = '..\\dir\\';
        const input = '//protocol-relative.com/foo/../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });
    });

    describe('with absolute path input', () => {
      it('remains absolute path', () => {
        const base = '..\\dir\\';
        const input = '/assets/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\assets\\main.js.map');
      });

      it('trims to root', () => {
        const base = '..\\dir\\';
        const input = '/';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\');
      });

      it('normalizes input', () => {
        const base = '..\\dir\\';
        const input = '/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\foo\\main.js.map');
      });

      it('normalizes current directory', () => {
        const base = '..\\dir\\';
        const input = '/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = '..\\dir\\';
        const input = '/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = '..\\dir\\';
        const input = '/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\main.js.map');
      });
    });

    describe('with absolute Windows path input', () => {
      it('remains absolute path', () => {
        const base = '..\\dir\\';
        const input = 'C:\\assets\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\assets\\main.js.map');
      });

      it('trims to root', () => {
        const base = '..\\dir\\';
        const input = 'C:\\';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\');
      });

      it('normalizes input', () => {
        const base = '..\\dir\\';
        const input = 'C:\\foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\foo\\main.js.map');
      });

      it('normalizes current directory', () => {
        const base = '..\\dir\\';
        const input = 'C:\\.\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = '..\\dir\\';
        const input = 'C:\\..\\..\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = '..\\dir\\';
        const input = 'C:\\foo\\..\\..\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\main.js.map');
      });
    });

    describe('with leading dot relative input', () => {
      it('resolves relative to current directory', () => {
        const base = '..\\dir\\';
        const input = './bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\dir\\bar\\main.js.map');
      });

      it('resolves relative to parent directory', () => {
        const base = '..\\dir\\';
        const input = '../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\bar\\main.js.map');
      });

      it('resolves relative to parent multiple directory', () => {
        const base = '..\\dir\\';
        const input = '../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\..\\..\\bar\\main.js.map');
      });

      it('normalizes input', () => {
        const base = '..\\dir\\';
        const input = './foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\dir\\foo\\main.js.map');
      });
    });

    describe('with leading dot relative Windows input', () => {
      it('resolves relative to current directory', () => {
        const base = '..\\dir\\';
        const input = '.\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\dir\\bar\\main.js.map');
      });

      it('resolves relative to parent directory', () => {
        const base = '..\\dir\\';
        const input = '..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\bar\\main.js.map');
      });

      it('resolves relative to parent multiple directory', () => {
        const base = '..\\dir\\';
        const input = '..\\..\\..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\..\\..\\bar\\main.js.map');
      });

      it('normalizes input', () => {
        const base = '..\\dir\\';
        const input = '.\\foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\dir\\foo\\main.js.map');
      });
    });

    describe('with relative input', () => {
      it('resolves relative to current directory', () => {
        const base = '..\\dir\\';
        const input = 'bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\dir\\bar\\main.js.map');
      });

      it('resolves relative to parent multiple directory, later', () => {
        const base = '..\\dir\\';
        const input = 'foo/../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\..\\bar\\main.js.map');
      });

      it('normalizes input', () => {
        const base = '..\\dir\\';
        const input = 'foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\dir\\foo\\main.js.map');
      });

      it('resolves node_module scope as path', () => {
        const base = '..\\dir\\';
        const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\dir\\node_modules\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js');
      });

      it('resolves package scope as path', () => {
        const base = '..\\dir\\';
        const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\dir\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js');
      });
    });

    describe('with relative Windows input', () => {
      it('resolves relative to current directory', () => {
        const base = '..\\dir\\';
        const input = 'bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\dir\\bar\\main.js.map');
      });

      it('resolves relative to parent multiple directory, later', () => {
        const base = '..\\dir\\';
        const input = 'foo\\..\\..\\..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\..\\bar\\main.js.map');
      });

      it('normalizes input', () => {
        const base = '..\\dir\\';
        const input = 'foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\dir\\foo\\main.js.map');
      });

      it('resolves node_module scope as path', () => {
        const base = '..\\dir\\';
        const input = 'node_modules\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\dir\\node_modules\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js');
      });

      it('resolves package scope as path', () => {
        const base = '..\\dir\\';
        const input = '@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\dir\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js');
      });
    });

    describe('empty input', () => {
      it('normalizes base', () => {
        const base = '..\\dir\\';
        const input = '';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\dir\\');
      });
    });
  });

  describe(`base = "..\\deep\\file"`, () => {
    describe('with absolute input', () => {
      it('returns input', () => {
        const base = '..\\deep\\file';
        const input = 'https://absolute.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = '..\\deep\\file';
        const input = 'https://absolute.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = '..\\deep\\file';
        const input = 'https://absolute.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/');
      });

      it('normalizes current directory', () => {
        const base = '..\\deep\\file';
        const input = 'https://absolute.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = '..\\deep\\file';
        const input = 'https://absolute.com/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = '..\\deep\\file';
        const input = 'https://absolute.com/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes file protocol 1', () => {
        const base = '..\\deep\\file';
        const input = 'file:///root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 2', () => {
        const base = '..\\deep\\file';
        const input = 'file://root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/main.js.map');
      });

      it('normalizes file protocol 2.5', () => {
        const base = '..\\deep\\file';
        const input = 'file://root';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/');
      });

      it('normalizes file protocol 3', () => {
        const base = '..\\deep\\file';
        const input = 'file:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 4', () => {
        const base = '..\\deep\\file';
        const input = 'file:root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes windows file 1', () => {
        const base = '..\\deep\\file';
        const input = 'file:///C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 2', () => {
        const base = '..\\deep\\file';
        const input = 'file://C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 3', () => {
        const base = '..\\deep\\file';
        const input = 'file:/C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 4', () => {
        const base = '..\\deep\\file';
        const input = 'file:C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });
    });

    describe('with protocol relative input', () => {
      it('resolves relative to the base protocol', () => {
        const base = '..\\deep\\file';
        const input = '//protocol-relative.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = '..\\deep\\file';
        const input = '//protocol-relative.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = '..\\deep\\file';
        const input = '//protocol-relative.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/');
      });

      it('normalizes current directory', () => {
        const base = '..\\deep\\file';
        const input = '//protocol-relative.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = '..\\deep\\file';
        const input = '//protocol-relative.com/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = '..\\deep\\file';
        const input = '//protocol-relative.com/foo/../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });
    });

    describe('with absolute path input', () => {
      it('remains absolute path', () => {
        const base = '..\\deep\\file';
        const input = '/assets/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\assets\\main.js.map');
      });

      it('trims to root', () => {
        const base = '..\\deep\\file';
        const input = '/';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\');
      });

      it('normalizes input', () => {
        const base = '..\\deep\\file';
        const input = '/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\foo\\main.js.map');
      });

      it('normalizes current directory', () => {
        const base = '..\\deep\\file';
        const input = '/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = '..\\deep\\file';
        const input = '/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = '..\\deep\\file';
        const input = '/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\main.js.map');
      });
    });

    describe('with absolute Windows path input', () => {
      it('remains absolute path', () => {
        const base = '..\\deep\\file';
        const input = 'C:\\assets\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\assets\\main.js.map');
      });

      it('trims to root', () => {
        const base = '..\\deep\\file';
        const input = 'C:\\';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\');
      });

      it('normalizes input', () => {
        const base = '..\\deep\\file';
        const input = 'C:\\foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\foo\\main.js.map');
      });

      it('normalizes current directory', () => {
        const base = '..\\deep\\file';
        const input = 'C:\\.\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = '..\\deep\\file';
        const input = 'C:\\..\\..\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = '..\\deep\\file';
        const input = 'C:\\foo\\..\\..\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\main.js.map');
      });
    });

    describe('with leading dot relative input', () => {
      it('resolves relative to current directory', () => {
        const base = '..\\deep\\file';
        const input = './bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\deep\\bar\\main.js.map');
      });

      it('resolves relative to parent directory', () => {
        const base = '..\\deep\\file';
        const input = '../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\bar\\main.js.map');
      });

      it('resolves relative to parent multiple directory', () => {
        const base = '..\\deep\\file';
        const input = '../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\..\\..\\bar\\main.js.map');
      });

      it('normalizes input', () => {
        const base = '..\\deep\\file';
        const input = './foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\deep\\foo\\main.js.map');
      });
    });

    describe('with leading dot relative Windows input', () => {
      it('resolves relative to current directory', () => {
        const base = '..\\deep\\file';
        const input = '.\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\deep\\bar\\main.js.map');
      });

      it('resolves relative to parent directory', () => {
        const base = '..\\deep\\file';
        const input = '..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\bar\\main.js.map');
      });

      it('resolves relative to parent multiple directory', () => {
        const base = '..\\deep\\file';
        const input = '..\\..\\..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\..\\..\\bar\\main.js.map');
      });

      it('normalizes input', () => {
        const base = '..\\deep\\file';
        const input = '.\\foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\deep\\foo\\main.js.map');
      });
    });

    describe('with relative input', () => {
      it('resolves relative to current directory', () => {
        const base = '..\\deep\\file';
        const input = 'bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\deep\\bar\\main.js.map');
      });

      it('resolves relative to parent multiple directory, later', () => {
        const base = '..\\deep\\file';
        const input = 'foo/../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\..\\bar\\main.js.map');
      });

      it('normalizes input', () => {
        const base = '..\\deep\\file';
        const input = 'foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\deep\\foo\\main.js.map');
      });

      it('resolves node_module scope as path', () => {
        const base = '..\\deep\\file';
        const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\deep\\node_modules\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js');
      });

      it('resolves package scope as path', () => {
        const base = '..\\deep\\file';
        const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\deep\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js');
      });
    });

    describe('with relative Windows input', () => {
      it('resolves relative to current directory', () => {
        const base = '..\\deep\\file';
        const input = 'bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\deep\\bar\\main.js.map');
      });

      it('resolves relative to parent multiple directory, later', () => {
        const base = '..\\deep\\file';
        const input = 'foo\\..\\..\\..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\..\\bar\\main.js.map');
      });

      it('normalizes input', () => {
        const base = '..\\deep\\file';
        const input = 'foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\deep\\foo\\main.js.map');
      });

      it('resolves node_module scope as path', () => {
        const base = '..\\deep\\file';
        const input = 'node_modules\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\deep\\node_modules\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js');
      });

      it('resolves package scope as path', () => {
        const base = '..\\deep\\file';
        const input = '@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\deep\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js');
      });
    });

    describe('empty input', () => {
      it('normalizes base', () => {
        const base = '..\\deep\\file';
        const input = '';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\deep\\file');
      });
    });
  });

  describe(`base = "..\\deep\\dir\\"`, () => {
    describe('with absolute input', () => {
      it('returns input', () => {
        const base = '..\\deep\\dir\\';
        const input = 'https://absolute.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = '..\\deep\\dir\\';
        const input = 'https://absolute.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = '..\\deep\\dir\\';
        const input = 'https://absolute.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/');
      });

      it('normalizes current directory', () => {
        const base = '..\\deep\\dir\\';
        const input = 'https://absolute.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = '..\\deep\\dir\\';
        const input = 'https://absolute.com/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = '..\\deep\\dir\\';
        const input = 'https://absolute.com/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes file protocol 1', () => {
        const base = '..\\deep\\dir\\';
        const input = 'file:///root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 2', () => {
        const base = '..\\deep\\dir\\';
        const input = 'file://root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/main.js.map');
      });

      it('normalizes file protocol 2.5', () => {
        const base = '..\\deep\\dir\\';
        const input = 'file://root';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/');
      });

      it('normalizes file protocol 3', () => {
        const base = '..\\deep\\dir\\';
        const input = 'file:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 4', () => {
        const base = '..\\deep\\dir\\';
        const input = 'file:root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes windows file 1', () => {
        const base = '..\\deep\\dir\\';
        const input = 'file:///C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 2', () => {
        const base = '..\\deep\\dir\\';
        const input = 'file://C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 3', () => {
        const base = '..\\deep\\dir\\';
        const input = 'file:/C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 4', () => {
        const base = '..\\deep\\dir\\';
        const input = 'file:C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });
    });

    describe('with protocol relative input', () => {
      it('resolves relative to the base protocol', () => {
        const base = '..\\deep\\dir\\';
        const input = '//protocol-relative.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = '..\\deep\\dir\\';
        const input = '//protocol-relative.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = '..\\deep\\dir\\';
        const input = '//protocol-relative.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/');
      });

      it('normalizes current directory', () => {
        const base = '..\\deep\\dir\\';
        const input = '//protocol-relative.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = '..\\deep\\dir\\';
        const input = '//protocol-relative.com/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = '..\\deep\\dir\\';
        const input = '//protocol-relative.com/foo/../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });
    });

    describe('with absolute path input', () => {
      it('remains absolute path', () => {
        const base = '..\\deep\\dir\\';
        const input = '/assets/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\assets\\main.js.map');
      });

      it('trims to root', () => {
        const base = '..\\deep\\dir\\';
        const input = '/';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\');
      });

      it('normalizes input', () => {
        const base = '..\\deep\\dir\\';
        const input = '/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\foo\\main.js.map');
      });

      it('normalizes current directory', () => {
        const base = '..\\deep\\dir\\';
        const input = '/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = '..\\deep\\dir\\';
        const input = '/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = '..\\deep\\dir\\';
        const input = '/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\main.js.map');
      });
    });

    describe('with absolute Windows path input', () => {
      it('remains absolute path', () => {
        const base = '..\\deep\\dir\\';
        const input = 'C:\\assets\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\assets\\main.js.map');
      });

      it('trims to root', () => {
        const base = '..\\deep\\dir\\';
        const input = 'C:\\';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\');
      });

      it('normalizes input', () => {
        const base = '..\\deep\\dir\\';
        const input = 'C:\\foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\foo\\main.js.map');
      });

      it('normalizes current directory', () => {
        const base = '..\\deep\\dir\\';
        const input = 'C:\\.\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = '..\\deep\\dir\\';
        const input = 'C:\\..\\..\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = '..\\deep\\dir\\';
        const input = 'C:\\foo\\..\\..\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\main.js.map');
      });
    });

    describe('with leading dot relative input', () => {
      it('resolves relative to current directory', () => {
        const base = '..\\deep\\dir\\';
        const input = './bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\deep\\dir\\bar\\main.js.map');
      });

      it('resolves relative to parent directory', () => {
        const base = '..\\deep\\dir\\';
        const input = '../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\deep\\bar\\main.js.map');
      });

      it('resolves relative to parent multiple directory', () => {
        const base = '..\\deep\\dir\\';
        const input = '../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\..\\bar\\main.js.map');
      });

      it('normalizes input', () => {
        const base = '..\\deep\\dir\\';
        const input = './foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\deep\\dir\\foo\\main.js.map');
      });
    });

    describe('with leading dot relative Windows input', () => {
      it('resolves relative to current directory', () => {
        const base = '..\\deep\\dir\\';
        const input = '.\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\deep\\dir\\bar\\main.js.map');
      });

      it('resolves relative to parent directory', () => {
        const base = '..\\deep\\dir\\';
        const input = '..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\deep\\bar\\main.js.map');
      });

      it('resolves relative to parent multiple directory', () => {
        const base = '..\\deep\\dir\\';
        const input = '..\\..\\..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\..\\bar\\main.js.map');
      });

      it('normalizes input', () => {
        const base = '..\\deep\\dir\\';
        const input = '.\\foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\deep\\dir\\foo\\main.js.map');
      });
    });

    describe('with relative input', () => {
      it('resolves relative to current directory', () => {
        const base = '..\\deep\\dir\\';
        const input = 'bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\deep\\dir\\bar\\main.js.map');
      });

      it('resolves relative to parent multiple directory, later', () => {
        const base = '..\\deep\\dir\\';
        const input = 'foo/../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\bar\\main.js.map');
      });

      it('normalizes input', () => {
        const base = '..\\deep\\dir\\';
        const input = 'foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\deep\\dir\\foo\\main.js.map');
      });

      it('resolves node_module scope as path', () => {
        const base = '..\\deep\\dir\\';
        const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\deep\\dir\\node_modules\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js');
      });

      it('resolves package scope as path', () => {
        const base = '..\\deep\\dir\\';
        const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\deep\\dir\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js');
      });
    });

    describe('with relative Windows input', () => {
      it('resolves relative to current directory', () => {
        const base = '..\\deep\\dir\\';
        const input = 'bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\deep\\dir\\bar\\main.js.map');
      });

      it('resolves relative to parent multiple directory, later', () => {
        const base = '..\\deep\\dir\\';
        const input = 'foo\\..\\..\\..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\bar\\main.js.map');
      });

      it('normalizes input', () => {
        const base = '..\\deep\\dir\\';
        const input = 'foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\deep\\dir\\foo\\main.js.map');
      });

      it('resolves node_module scope as path', () => {
        const base = '..\\deep\\dir\\';
        const input = 'node_modules\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\deep\\dir\\node_modules\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js');
      });

      it('resolves package scope as path', () => {
        const base = '..\\deep\\dir\\';
        const input = '@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\deep\\dir\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js');
      });
    });

    describe('empty input', () => {
      it('normalizes base', () => {
        const base = '..\\deep\\dir\\';
        const input = '';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\deep\\dir\\');
      });
    });
  });

  describe(`base = "..\\"`, () => {
    describe('with absolute input', () => {
      it('returns input', () => {
        const base = '..\\';
        const input = 'https://absolute.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = '..\\';
        const input = 'https://absolute.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = '..\\';
        const input = 'https://absolute.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/');
      });

      it('normalizes current directory', () => {
        const base = '..\\';
        const input = 'https://absolute.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = '..\\';
        const input = 'https://absolute.com/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = '..\\';
        const input = 'https://absolute.com/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes file protocol 1', () => {
        const base = '..\\';
        const input = 'file:///root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 2', () => {
        const base = '..\\';
        const input = 'file://root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/main.js.map');
      });

      it('normalizes file protocol 2.5', () => {
        const base = '..\\';
        const input = 'file://root';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/');
      });

      it('normalizes file protocol 3', () => {
        const base = '..\\';
        const input = 'file:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 4', () => {
        const base = '..\\';
        const input = 'file:root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes windows file 1', () => {
        const base = '..\\';
        const input = 'file:///C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 2', () => {
        const base = '..\\';
        const input = 'file://C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 3', () => {
        const base = '..\\';
        const input = 'file:/C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 4', () => {
        const base = '..\\';
        const input = 'file:C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });
    });

    describe('with protocol relative input', () => {
      it('resolves relative to the base protocol', () => {
        const base = '..\\';
        const input = '//protocol-relative.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = '..\\';
        const input = '//protocol-relative.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = '..\\';
        const input = '//protocol-relative.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/');
      });

      it('normalizes current directory', () => {
        const base = '..\\';
        const input = '//protocol-relative.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = '..\\';
        const input = '//protocol-relative.com/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = '..\\';
        const input = '//protocol-relative.com/foo/../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });
    });

    describe('with absolute path input', () => {
      it('remains absolute path', () => {
        const base = '..\\';
        const input = '/assets/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\assets\\main.js.map');
      });

      it('trims to root', () => {
        const base = '..\\';
        const input = '/';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\');
      });

      it('normalizes input', () => {
        const base = '..\\';
        const input = '/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\foo\\main.js.map');
      });

      it('normalizes current directory', () => {
        const base = '..\\';
        const input = '/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = '..\\';
        const input = '/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = '..\\';
        const input = '/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\main.js.map');
      });
    });

    describe('with absolute Windows path input', () => {
      it('remains absolute path', () => {
        const base = '..\\';
        const input = 'C:\\assets\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\assets\\main.js.map');
      });

      it('trims to root', () => {
        const base = '..\\';
        const input = 'C:\\';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\');
      });

      it('normalizes input', () => {
        const base = '..\\';
        const input = 'C:\\foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\foo\\main.js.map');
      });

      it('normalizes current directory', () => {
        const base = '..\\';
        const input = 'C:\\.\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = '..\\';
        const input = 'C:\\..\\..\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = '..\\';
        const input = 'C:\\foo\\..\\..\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\main.js.map');
      });
    });

    describe('with leading dot relative input', () => {
      it('resolves relative to current directory', () => {
        const base = '..\\';
        const input = './bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\bar\\main.js.map');
      });

      it('resolves relative to parent directory', () => {
        const base = '..\\';
        const input = '../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\..\\bar\\main.js.map');
      });

      it('resolves relative to parent multiple directory', () => {
        const base = '..\\';
        const input = '../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\..\\..\\..\\bar\\main.js.map');
      });

      it('normalizes input', () => {
        const base = '..\\';
        const input = './foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\foo\\main.js.map');
      });
    });

    describe('with leading dot relative Windows input', () => {
      it('resolves relative to current directory', () => {
        const base = '..\\';
        const input = '.\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\bar\\main.js.map');
      });

      it('resolves relative to parent directory', () => {
        const base = '..\\';
        const input = '..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\..\\bar\\main.js.map');
      });

      it('resolves relative to parent multiple directory', () => {
        const base = '..\\';
        const input = '..\\..\\..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\..\\..\\..\\bar\\main.js.map');
      });

      it('normalizes input', () => {
        const base = '..\\';
        const input = '.\\foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\foo\\main.js.map');
      });
    });

    describe('with relative input', () => {
      it('resolves relative to current directory', () => {
        const base = '..\\';
        const input = 'bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\bar\\main.js.map');
      });

      it('resolves relative to parent multiple directory, later', () => {
        const base = '..\\';
        const input = 'foo/../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\..\\..\\bar\\main.js.map');
      });

      it('normalizes input', () => {
        const base = '..\\';
        const input = 'foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\foo\\main.js.map');
      });

      it('resolves node_module scope as path', () => {
        const base = '..\\';
        const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\node_modules\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js');
      });

      it('resolves package scope as path', () => {
        const base = '..\\';
        const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js');
      });
    });

    describe('with relative Windows input', () => {
      it('resolves relative to current directory', () => {
        const base = '..\\';
        const input = 'bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\bar\\main.js.map');
      });

      it('resolves relative to parent multiple directory, later', () => {
        const base = '..\\';
        const input = 'foo\\..\\..\\..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\..\\..\\bar\\main.js.map');
      });

      it('normalizes input', () => {
        const base = '..\\';
        const input = 'foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\foo\\main.js.map');
      });

      it('resolves node_module scope as path', () => {
        const base = '..\\';
        const input = 'node_modules\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\node_modules\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js');
      });

      it('resolves package scope as path', () => {
        const base = '..\\';
        const input = '@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js');
      });
    });

    describe('empty input', () => {
      it('normalizes base', () => {
        const base = '..\\';
        const input = '';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..');
      });
    });
  });

  describe(`base = "dir\\.."`, () => {
    describe('with absolute input', () => {
      it('returns input', () => {
        const base = 'dir\\..';
        const input = 'https://absolute.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'dir\\..';
        const input = 'https://absolute.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = 'dir\\..';
        const input = 'https://absolute.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/');
      });

      it('normalizes current directory', () => {
        const base = 'dir\\..';
        const input = 'https://absolute.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'dir\\..';
        const input = 'https://absolute.com/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'dir\\..';
        const input = 'https://absolute.com/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes file protocol 1', () => {
        const base = 'dir\\..';
        const input = 'file:///root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 2', () => {
        const base = 'dir\\..';
        const input = 'file://root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/main.js.map');
      });

      it('normalizes file protocol 2.5', () => {
        const base = 'dir\\..';
        const input = 'file://root';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/');
      });

      it('normalizes file protocol 3', () => {
        const base = 'dir\\..';
        const input = 'file:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 4', () => {
        const base = 'dir\\..';
        const input = 'file:root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes windows file 1', () => {
        const base = 'dir\\..';
        const input = 'file:///C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 2', () => {
        const base = 'dir\\..';
        const input = 'file://C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 3', () => {
        const base = 'dir\\..';
        const input = 'file:/C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 4', () => {
        const base = 'dir\\..';
        const input = 'file:C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });
    });

    describe('with protocol relative input', () => {
      it('resolves relative to the base protocol', () => {
        const base = 'dir\\..';
        const input = '//protocol-relative.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'dir\\..';
        const input = '//protocol-relative.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = 'dir\\..';
        const input = '//protocol-relative.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/');
      });

      it('normalizes current directory', () => {
        const base = 'dir\\..';
        const input = '//protocol-relative.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'dir\\..';
        const input = '//protocol-relative.com/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'dir\\..';
        const input = '//protocol-relative.com/foo/../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });
    });

    describe('with absolute path input', () => {
      it('remains absolute path', () => {
        const base = 'dir\\..';
        const input = '/assets/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\assets\\main.js.map');
      });

      it('trims to root', () => {
        const base = 'dir\\..';
        const input = '/';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\');
      });

      it('normalizes input', () => {
        const base = 'dir\\..';
        const input = '/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\foo\\main.js.map');
      });

      it('normalizes current directory', () => {
        const base = 'dir\\..';
        const input = '/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'dir\\..';
        const input = '/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'dir\\..';
        const input = '/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\main.js.map');
      });
    });

    describe('with absolute Windows path input', () => {
      it('remains absolute path', () => {
        const base = 'dir\\..';
        const input = 'C:\\assets\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\assets\\main.js.map');
      });

      it('trims to root', () => {
        const base = 'dir\\..';
        const input = 'C:\\';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\');
      });

      it('normalizes input', () => {
        const base = 'dir\\..';
        const input = 'C:\\foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\foo\\main.js.map');
      });

      it('normalizes current directory', () => {
        const base = 'dir\\..';
        const input = 'C:\\.\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'dir\\..';
        const input = 'C:\\..\\..\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'dir\\..';
        const input = 'C:\\foo\\..\\..\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\main.js.map');
      });
    });

    describe('with leading dot relative input', () => {
      it('resolves relative to current directory', () => {
        const base = 'dir\\..';
        const input = './bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'bar\\main.js.map');
      });

      it('resolves relative to parent directory', () => {
        const base = 'dir\\..';
        const input = '../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\bar\\main.js.map');
      });

      it('resolves relative to parent multiple directory', () => {
        const base = 'dir\\..';
        const input = '../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\..\\..\\bar\\main.js.map');
      });

      it('normalizes input', () => {
        const base = 'dir\\..';
        const input = './foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'foo\\main.js.map');
      });
    });

    describe('with leading dot relative Windows input', () => {
      it('resolves relative to current directory', () => {
        const base = 'dir\\..';
        const input = '.\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'bar\\main.js.map');
      });

      it('resolves relative to parent directory', () => {
        const base = 'dir\\..';
        const input = '..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\bar\\main.js.map');
      });

      it('resolves relative to parent multiple directory', () => {
        const base = 'dir\\..';
        const input = '..\\..\\..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\..\\..\\bar\\main.js.map');
      });

      it('normalizes input', () => {
        const base = 'dir\\..';
        const input = '.\\foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'foo\\main.js.map');
      });
    });

    describe('with relative input', () => {
      it('resolves relative to current directory', () => {
        const base = 'dir\\..';
        const input = 'bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'bar\\main.js.map');
      });

      it('resolves relative to parent multiple directory, later', () => {
        const base = 'dir\\..';
        const input = 'foo/../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\..\\bar\\main.js.map');
      });

      it('normalizes input', () => {
        const base = 'dir\\..';
        const input = 'foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'foo\\main.js.map');
      });

      it('resolves node_module scope as path', () => {
        const base = 'dir\\..';
        const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'node_modules\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js');
      });

      it('resolves package scope as path', () => {
        const base = 'dir\\..';
        const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js');
      });
    });

    describe('with relative Windows input', () => {
      it('resolves relative to current directory', () => {
        const base = 'dir\\..';
        const input = 'bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'bar\\main.js.map');
      });

      it('resolves relative to parent multiple directory, later', () => {
        const base = 'dir\\..';
        const input = 'foo\\..\\..\\..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\..\\bar\\main.js.map');
      });

      it('normalizes input', () => {
        const base = 'dir\\..';
        const input = 'foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'foo\\main.js.map');
      });

      it('resolves node_module scope as path', () => {
        const base = 'dir\\..';
        const input = 'node_modules\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'node_modules\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js');
      });

      it('resolves package scope as path', () => {
        const base = 'dir\\..';
        const input = '@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js');
      });
    });

    describe('empty input', () => {
      it('normalizes base', () => {
        const base = 'dir\\..';
        const input = '';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '.');
      });
    });
  });

  describe(`base = "deep\\..\\"`, () => {
    describe('with absolute input', () => {
      it('returns input', () => {
        const base = 'deep\\..\\';
        const input = 'https://absolute.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'deep\\..\\';
        const input = 'https://absolute.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = 'deep\\..\\';
        const input = 'https://absolute.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/');
      });

      it('normalizes current directory', () => {
        const base = 'deep\\..\\';
        const input = 'https://absolute.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'deep\\..\\';
        const input = 'https://absolute.com/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'deep\\..\\';
        const input = 'https://absolute.com/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes file protocol 1', () => {
        const base = 'deep\\..\\';
        const input = 'file:///root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 2', () => {
        const base = 'deep\\..\\';
        const input = 'file://root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/main.js.map');
      });

      it('normalizes file protocol 2.5', () => {
        const base = 'deep\\..\\';
        const input = 'file://root';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/');
      });

      it('normalizes file protocol 3', () => {
        const base = 'deep\\..\\';
        const input = 'file:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 4', () => {
        const base = 'deep\\..\\';
        const input = 'file:root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes windows file 1', () => {
        const base = 'deep\\..\\';
        const input = 'file:///C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 2', () => {
        const base = 'deep\\..\\';
        const input = 'file://C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 3', () => {
        const base = 'deep\\..\\';
        const input = 'file:/C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 4', () => {
        const base = 'deep\\..\\';
        const input = 'file:C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });
    });

    describe('with protocol relative input', () => {
      it('resolves relative to the base protocol', () => {
        const base = 'deep\\..\\';
        const input = '//protocol-relative.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'deep\\..\\';
        const input = '//protocol-relative.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = 'deep\\..\\';
        const input = '//protocol-relative.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/');
      });

      it('normalizes current directory', () => {
        const base = 'deep\\..\\';
        const input = '//protocol-relative.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'deep\\..\\';
        const input = '//protocol-relative.com/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'deep\\..\\';
        const input = '//protocol-relative.com/foo/../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });
    });

    describe('with absolute path input', () => {
      it('remains absolute path', () => {
        const base = 'deep\\..\\';
        const input = '/assets/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\assets\\main.js.map');
      });

      it('trims to root', () => {
        const base = 'deep\\..\\';
        const input = '/';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\');
      });

      it('normalizes input', () => {
        const base = 'deep\\..\\';
        const input = '/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\foo\\main.js.map');
      });

      it('normalizes current directory', () => {
        const base = 'deep\\..\\';
        const input = '/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'deep\\..\\';
        const input = '/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'deep\\..\\';
        const input = '/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\main.js.map');
      });
    });

    describe('with absolute Windows path input', () => {
      it('remains absolute path', () => {
        const base = 'deep\\..\\';
        const input = 'C:\\assets\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\assets\\main.js.map');
      });

      it('trims to root', () => {
        const base = 'deep\\..\\';
        const input = 'C:\\';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\');
      });

      it('normalizes input', () => {
        const base = 'deep\\..\\';
        const input = 'C:\\foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\foo\\main.js.map');
      });

      it('normalizes current directory', () => {
        const base = 'deep\\..\\';
        const input = 'C:\\.\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'deep\\..\\';
        const input = 'C:\\..\\..\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'deep\\..\\';
        const input = 'C:\\foo\\..\\..\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\main.js.map');
      });
    });

    describe('with leading dot relative input', () => {
      it('resolves relative to current directory', () => {
        const base = 'deep\\..\\';
        const input = './bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'bar\\main.js.map');
      });

      it('resolves relative to parent directory', () => {
        const base = 'deep\\..\\';
        const input = '../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\bar\\main.js.map');
      });

      it('resolves relative to parent multiple directory', () => {
        const base = 'deep\\..\\';
        const input = '../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\..\\..\\bar\\main.js.map');
      });

      it('normalizes input', () => {
        const base = 'deep\\..\\';
        const input = './foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'foo\\main.js.map');
      });
    });

    describe('with leading dot relative Windows input', () => {
      it('resolves relative to current directory', () => {
        const base = 'deep\\..\\';
        const input = '.\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'bar\\main.js.map');
      });

      it('resolves relative to parent directory', () => {
        const base = 'deep\\..\\';
        const input = '..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\bar\\main.js.map');
      });

      it('resolves relative to parent multiple directory', () => {
        const base = 'deep\\..\\';
        const input = '..\\..\\..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\..\\..\\bar\\main.js.map');
      });

      it('normalizes input', () => {
        const base = 'deep\\..\\';
        const input = '.\\foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'foo\\main.js.map');
      });
    });

    describe('with relative input', () => {
      it('resolves relative to current directory', () => {
        const base = 'deep\\..\\';
        const input = 'bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'bar\\main.js.map');
      });

      it('resolves relative to parent multiple directory, later', () => {
        const base = 'deep\\..\\';
        const input = 'foo/../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\..\\bar\\main.js.map');
      });

      it('normalizes input', () => {
        const base = 'deep\\..\\';
        const input = 'foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'foo\\main.js.map');
      });

      it('resolves node_module scope as path', () => {
        const base = 'deep\\..\\';
        const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'node_modules\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js');
      });

      it('resolves package scope as path', () => {
        const base = 'deep\\..\\';
        const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js');
      });
    });

    describe('with relative Windows input', () => {
      it('resolves relative to current directory', () => {
        const base = 'deep\\..\\';
        const input = 'bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'bar\\main.js.map');
      });

      it('resolves relative to parent multiple directory, later', () => {
        const base = 'deep\\..\\';
        const input = 'foo\\..\\..\\..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\..\\bar\\main.js.map');
      });

      it('normalizes input', () => {
        const base = 'deep\\..\\';
        const input = 'foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'foo\\main.js.map');
      });

      it('resolves node_module scope as path', () => {
        const base = 'deep\\..\\';
        const input = 'node_modules\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'node_modules\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js');
      });

      it('resolves package scope as path', () => {
        const base = 'deep\\..\\';
        const input = '@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js');
      });
    });

    describe('empty input', () => {
      it('normalizes base', () => {
        const base = 'deep\\..\\';
        const input = '';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '.');
      });
    });
  });

  describe(`base = ".\\.."`, () => {
    describe('with absolute input', () => {
      it('returns input', () => {
        const base = '.\\..';
        const input = 'https://absolute.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = '.\\..';
        const input = 'https://absolute.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = '.\\..';
        const input = 'https://absolute.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/');
      });

      it('normalizes current directory', () => {
        const base = '.\\..';
        const input = 'https://absolute.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = '.\\..';
        const input = 'https://absolute.com/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = '.\\..';
        const input = 'https://absolute.com/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes file protocol 1', () => {
        const base = '.\\..';
        const input = 'file:///root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 2', () => {
        const base = '.\\..';
        const input = 'file://root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/main.js.map');
      });

      it('normalizes file protocol 2.5', () => {
        const base = '.\\..';
        const input = 'file://root';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/');
      });

      it('normalizes file protocol 3', () => {
        const base = '.\\..';
        const input = 'file:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 4', () => {
        const base = '.\\..';
        const input = 'file:root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes windows file 1', () => {
        const base = '.\\..';
        const input = 'file:///C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 2', () => {
        const base = '.\\..';
        const input = 'file://C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 3', () => {
        const base = '.\\..';
        const input = 'file:/C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 4', () => {
        const base = '.\\..';
        const input = 'file:C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });
    });

    describe('with protocol relative input', () => {
      it('resolves relative to the base protocol', () => {
        const base = '.\\..';
        const input = '//protocol-relative.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = '.\\..';
        const input = '//protocol-relative.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = '.\\..';
        const input = '//protocol-relative.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/');
      });

      it('normalizes current directory', () => {
        const base = '.\\..';
        const input = '//protocol-relative.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = '.\\..';
        const input = '//protocol-relative.com/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = '.\\..';
        const input = '//protocol-relative.com/foo/../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });
    });

    describe('with absolute path input', () => {
      it('remains absolute path', () => {
        const base = '.\\..';
        const input = '/assets/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\assets\\main.js.map');
      });

      it('trims to root', () => {
        const base = '.\\..';
        const input = '/';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\');
      });

      it('normalizes input', () => {
        const base = '.\\..';
        const input = '/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\foo\\main.js.map');
      });

      it('normalizes current directory', () => {
        const base = '.\\..';
        const input = '/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = '.\\..';
        const input = '/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = '.\\..';
        const input = '/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\main.js.map');
      });
    });

    describe('with absolute Windows path input', () => {
      it('remains absolute path', () => {
        const base = '.\\..';
        const input = 'C:\\assets\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\assets\\main.js.map');
      });

      it('trims to root', () => {
        const base = '.\\..';
        const input = 'C:\\';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\');
      });

      it('normalizes input', () => {
        const base = '.\\..';
        const input = 'C:\\foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\foo\\main.js.map');
      });

      it('normalizes current directory', () => {
        const base = '.\\..';
        const input = 'C:\\.\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = '.\\..';
        const input = 'C:\\..\\..\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = '.\\..';
        const input = 'C:\\foo\\..\\..\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\main.js.map');
      });
    });

    describe('with leading dot relative input', () => {
      it('resolves relative to current directory', () => {
        const base = '.\\..';
        const input = './bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\bar\\main.js.map');
      });

      it('resolves relative to parent directory', () => {
        const base = '.\\..';
        const input = '../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\..\\bar\\main.js.map');
      });

      it('resolves relative to parent multiple directory', () => {
        const base = '.\\..';
        const input = '../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\..\\..\\..\\bar\\main.js.map');
      });

      it('normalizes input', () => {
        const base = '.\\..';
        const input = './foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\foo\\main.js.map');
      });
    });

    describe('with leading dot relative Windows input', () => {
      it('resolves relative to current directory', () => {
        const base = '.\\..';
        const input = '.\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\bar\\main.js.map');
      });

      it('resolves relative to parent directory', () => {
        const base = '.\\..';
        const input = '..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\..\\bar\\main.js.map');
      });

      it('resolves relative to parent multiple directory', () => {
        const base = '.\\..';
        const input = '..\\..\\..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\..\\..\\..\\bar\\main.js.map');
      });

      it('normalizes input', () => {
        const base = '.\\..';
        const input = '.\\foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\foo\\main.js.map');
      });
    });

    describe('with relative input', () => {
      it('resolves relative to current directory', () => {
        const base = '.\\..';
        const input = 'bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\bar\\main.js.map');
      });

      it('resolves relative to parent multiple directory, later', () => {
        const base = '.\\..';
        const input = 'foo/../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\..\\..\\bar\\main.js.map');
      });

      it('normalizes input', () => {
        const base = '.\\..';
        const input = 'foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\foo\\main.js.map');
      });

      it('resolves node_module scope as path', () => {
        const base = '.\\..';
        const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\node_modules\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js');
      });

      it('resolves package scope as path', () => {
        const base = '.\\..';
        const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js');
      });
    });

    describe('with relative Windows input', () => {
      it('resolves relative to current directory', () => {
        const base = '.\\..';
        const input = 'bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\bar\\main.js.map');
      });

      it('resolves relative to parent multiple directory, later', () => {
        const base = '.\\..';
        const input = 'foo\\..\\..\\..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\..\\..\\bar\\main.js.map');
      });

      it('normalizes input', () => {
        const base = '.\\..';
        const input = 'foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\foo\\main.js.map');
      });

      it('resolves node_module scope as path', () => {
        const base = '.\\..';
        const input = 'node_modules\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\node_modules\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js');
      });

      it('resolves package scope as path', () => {
        const base = '.\\..';
        const input = '@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js');
      });
    });

    describe('empty input', () => {
      it('normalizes base', () => {
        const base = '.\\..';
        const input = '';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..');
      });
    });
  });

  describe(`base = ".\\..\\"`, () => {
    describe('with absolute input', () => {
      it('returns input', () => {
        const base = '.\\..\\';
        const input = 'https://absolute.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = '.\\..\\';
        const input = 'https://absolute.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = '.\\..\\';
        const input = 'https://absolute.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/');
      });

      it('normalizes current directory', () => {
        const base = '.\\..\\';
        const input = 'https://absolute.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = '.\\..\\';
        const input = 'https://absolute.com/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = '.\\..\\';
        const input = 'https://absolute.com/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes file protocol 1', () => {
        const base = '.\\..\\';
        const input = 'file:///root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 2', () => {
        const base = '.\\..\\';
        const input = 'file://root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/main.js.map');
      });

      it('normalizes file protocol 2.5', () => {
        const base = '.\\..\\';
        const input = 'file://root';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/');
      });

      it('normalizes file protocol 3', () => {
        const base = '.\\..\\';
        const input = 'file:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 4', () => {
        const base = '.\\..\\';
        const input = 'file:root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes windows file 1', () => {
        const base = '.\\..\\';
        const input = 'file:///C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 2', () => {
        const base = '.\\..\\';
        const input = 'file://C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 3', () => {
        const base = '.\\..\\';
        const input = 'file:/C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 4', () => {
        const base = '.\\..\\';
        const input = 'file:C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });
    });

    describe('with protocol relative input', () => {
      it('resolves relative to the base protocol', () => {
        const base = '.\\..\\';
        const input = '//protocol-relative.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = '.\\..\\';
        const input = '//protocol-relative.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = '.\\..\\';
        const input = '//protocol-relative.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/');
      });

      it('normalizes current directory', () => {
        const base = '.\\..\\';
        const input = '//protocol-relative.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = '.\\..\\';
        const input = '//protocol-relative.com/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = '.\\..\\';
        const input = '//protocol-relative.com/foo/../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });
    });

    describe('with absolute path input', () => {
      it('remains absolute path', () => {
        const base = '.\\..\\';
        const input = '/assets/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\assets\\main.js.map');
      });

      it('trims to root', () => {
        const base = '.\\..\\';
        const input = '/';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\');
      });

      it('normalizes input', () => {
        const base = '.\\..\\';
        const input = '/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\foo\\main.js.map');
      });

      it('normalizes current directory', () => {
        const base = '.\\..\\';
        const input = '/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = '.\\..\\';
        const input = '/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = '.\\..\\';
        const input = '/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\main.js.map');
      });
    });

    describe('with absolute Windows path input', () => {
      it('remains absolute path', () => {
        const base = '.\\..\\';
        const input = 'C:\\assets\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\assets\\main.js.map');
      });

      it('trims to root', () => {
        const base = '.\\..\\';
        const input = 'C:\\';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\');
      });

      it('normalizes input', () => {
        const base = '.\\..\\';
        const input = 'C:\\foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\foo\\main.js.map');
      });

      it('normalizes current directory', () => {
        const base = '.\\..\\';
        const input = 'C:\\.\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = '.\\..\\';
        const input = 'C:\\..\\..\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = '.\\..\\';
        const input = 'C:\\foo\\..\\..\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\main.js.map');
      });
    });

    describe('with leading dot relative input', () => {
      it('resolves relative to current directory', () => {
        const base = '.\\..\\';
        const input = './bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\bar\\main.js.map');
      });

      it('resolves relative to parent directory', () => {
        const base = '.\\..\\';
        const input = '../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\..\\bar\\main.js.map');
      });

      it('resolves relative to parent multiple directory', () => {
        const base = '.\\..\\';
        const input = '../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\..\\..\\..\\bar\\main.js.map');
      });

      it('normalizes input', () => {
        const base = '.\\..\\';
        const input = './foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\foo\\main.js.map');
      });
    });

    describe('with leading dot relative Windows input', () => {
      it('resolves relative to current directory', () => {
        const base = '.\\..\\';
        const input = '.\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\bar\\main.js.map');
      });

      it('resolves relative to parent directory', () => {
        const base = '.\\..\\';
        const input = '..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\..\\bar\\main.js.map');
      });

      it('resolves relative to parent multiple directory', () => {
        const base = '.\\..\\';
        const input = '..\\..\\..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\..\\..\\..\\bar\\main.js.map');
      });

      it('normalizes input', () => {
        const base = '.\\..\\';
        const input = '.\\foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\foo\\main.js.map');
      });
    });

    describe('with relative input', () => {
      it('resolves relative to current directory', () => {
        const base = '.\\..\\';
        const input = 'bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\bar\\main.js.map');
      });

      it('resolves relative to parent multiple directory, later', () => {
        const base = '.\\..\\';
        const input = 'foo/../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\..\\..\\bar\\main.js.map');
      });

      it('normalizes input', () => {
        const base = '.\\..\\';
        const input = 'foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\foo\\main.js.map');
      });

      it('resolves node_module scope as path', () => {
        const base = '.\\..\\';
        const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\node_modules\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js');
      });

      it('resolves package scope as path', () => {
        const base = '.\\..\\';
        const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js');
      });
    });

    describe('with relative Windows input', () => {
      it('resolves relative to current directory', () => {
        const base = '.\\..\\';
        const input = 'bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\bar\\main.js.map');
      });

      it('resolves relative to parent multiple directory, later', () => {
        const base = '.\\..\\';
        const input = 'foo\\..\\..\\..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\..\\..\\bar\\main.js.map');
      });

      it('normalizes input', () => {
        const base = '.\\..\\';
        const input = 'foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\foo\\main.js.map');
      });

      it('resolves node_module scope as path', () => {
        const base = '.\\..\\';
        const input = 'node_modules\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\node_modules\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js');
      });

      it('resolves package scope as path', () => {
        const base = '.\\..\\';
        const input = '@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js');
      });
    });

    describe('empty input', () => {
      it('normalizes base', () => {
        const base = '.\\..\\';
        const input = '';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..');
      });
    });
  });

  describe(`base = ".\\deep\\.."`, () => {
    describe('with absolute input', () => {
      it('returns input', () => {
        const base = '.\\deep\\..';
        const input = 'https://absolute.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = '.\\deep\\..';
        const input = 'https://absolute.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = '.\\deep\\..';
        const input = 'https://absolute.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/');
      });

      it('normalizes current directory', () => {
        const base = '.\\deep\\..';
        const input = 'https://absolute.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = '.\\deep\\..';
        const input = 'https://absolute.com/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = '.\\deep\\..';
        const input = 'https://absolute.com/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes file protocol 1', () => {
        const base = '.\\deep\\..';
        const input = 'file:///root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 2', () => {
        const base = '.\\deep\\..';
        const input = 'file://root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/main.js.map');
      });

      it('normalizes file protocol 2.5', () => {
        const base = '.\\deep\\..';
        const input = 'file://root';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/');
      });

      it('normalizes file protocol 3', () => {
        const base = '.\\deep\\..';
        const input = 'file:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 4', () => {
        const base = '.\\deep\\..';
        const input = 'file:root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes windows file 1', () => {
        const base = '.\\deep\\..';
        const input = 'file:///C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 2', () => {
        const base = '.\\deep\\..';
        const input = 'file://C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 3', () => {
        const base = '.\\deep\\..';
        const input = 'file:/C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 4', () => {
        const base = '.\\deep\\..';
        const input = 'file:C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });
    });

    describe('with protocol relative input', () => {
      it('resolves relative to the base protocol', () => {
        const base = '.\\deep\\..';
        const input = '//protocol-relative.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = '.\\deep\\..';
        const input = '//protocol-relative.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = '.\\deep\\..';
        const input = '//protocol-relative.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/');
      });

      it('normalizes current directory', () => {
        const base = '.\\deep\\..';
        const input = '//protocol-relative.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = '.\\deep\\..';
        const input = '//protocol-relative.com/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = '.\\deep\\..';
        const input = '//protocol-relative.com/foo/../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });
    });

    describe('with absolute path input', () => {
      it('remains absolute path', () => {
        const base = '.\\deep\\..';
        const input = '/assets/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\assets\\main.js.map');
      });

      it('trims to root', () => {
        const base = '.\\deep\\..';
        const input = '/';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\');
      });

      it('normalizes input', () => {
        const base = '.\\deep\\..';
        const input = '/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\foo\\main.js.map');
      });

      it('normalizes current directory', () => {
        const base = '.\\deep\\..';
        const input = '/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = '.\\deep\\..';
        const input = '/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = '.\\deep\\..';
        const input = '/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\main.js.map');
      });
    });

    describe('with absolute Windows path input', () => {
      it('remains absolute path', () => {
        const base = '.\\deep\\..';
        const input = 'C:\\assets\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\assets\\main.js.map');
      });

      it('trims to root', () => {
        const base = '.\\deep\\..';
        const input = 'C:\\';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\');
      });

      it('normalizes input', () => {
        const base = '.\\deep\\..';
        const input = 'C:\\foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\foo\\main.js.map');
      });

      it('normalizes current directory', () => {
        const base = '.\\deep\\..';
        const input = 'C:\\.\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = '.\\deep\\..';
        const input = 'C:\\..\\..\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = '.\\deep\\..';
        const input = 'C:\\foo\\..\\..\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\main.js.map');
      });
    });

    describe('with leading dot relative input', () => {
      it('resolves relative to current directory', () => {
        const base = '.\\deep\\..';
        const input = './bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '.\\bar\\main.js.map');
      });

      it('resolves relative to parent directory', () => {
        const base = '.\\deep\\..';
        const input = '../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\bar\\main.js.map');
      });

      it('resolves relative to parent multiple directory', () => {
        const base = '.\\deep\\..';
        const input = '../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\..\\..\\bar\\main.js.map');
      });

      it('normalizes input', () => {
        const base = '.\\deep\\..';
        const input = './foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '.\\foo\\main.js.map');
      });
    });

    describe('with leading dot relative Windows input', () => {
      it('resolves relative to current directory', () => {
        const base = '.\\deep\\..';
        const input = '.\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '.\\bar\\main.js.map');
      });

      it('resolves relative to parent directory', () => {
        const base = '.\\deep\\..';
        const input = '..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\bar\\main.js.map');
      });

      it('resolves relative to parent multiple directory', () => {
        const base = '.\\deep\\..';
        const input = '..\\..\\..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\..\\..\\bar\\main.js.map');
      });

      it('normalizes input', () => {
        const base = '.\\deep\\..';
        const input = '.\\foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '.\\foo\\main.js.map');
      });
    });

    describe('with relative input', () => {
      it('resolves relative to current directory', () => {
        const base = '.\\deep\\..';
        const input = 'bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '.\\bar\\main.js.map');
      });

      it('resolves relative to parent multiple directory, later', () => {
        const base = '.\\deep\\..';
        const input = 'foo/../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\..\\bar\\main.js.map');
      });

      it('normalizes input', () => {
        const base = '.\\deep\\..';
        const input = 'foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '.\\foo\\main.js.map');
      });

      it('resolves node_module scope as path', () => {
        const base = '.\\deep\\..';
        const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '.\\node_modules\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js');
      });

      it('resolves package scope as path', () => {
        const base = '.\\deep\\..';
        const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '.\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js');
      });
    });

    describe('with relative Windows input', () => {
      it('resolves relative to current directory', () => {
        const base = '.\\deep\\..';
        const input = 'bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '.\\bar\\main.js.map');
      });

      it('resolves relative to parent multiple directory, later', () => {
        const base = '.\\deep\\..';
        const input = 'foo\\..\\..\\..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\..\\bar\\main.js.map');
      });

      it('normalizes input', () => {
        const base = '.\\deep\\..';
        const input = 'foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '.\\foo\\main.js.map');
      });

      it('resolves node_module scope as path', () => {
        const base = '.\\deep\\..';
        const input = 'node_modules\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '.\\node_modules\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js');
      });

      it('resolves package scope as path', () => {
        const base = '.\\deep\\..';
        const input = '@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '.\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js');
      });
    });

    describe('empty input', () => {
      it('normalizes base', () => {
        const base = '.\\deep\\..';
        const input = '';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '.');
      });
    });
  });

  describe(`base = ".\\deep\\..\\"`, () => {
    describe('with absolute input', () => {
      it('returns input', () => {
        const base = '.\\deep\\..\\';
        const input = 'https://absolute.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = '.\\deep\\..\\';
        const input = 'https://absolute.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = '.\\deep\\..\\';
        const input = 'https://absolute.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/');
      });

      it('normalizes current directory', () => {
        const base = '.\\deep\\..\\';
        const input = 'https://absolute.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = '.\\deep\\..\\';
        const input = 'https://absolute.com/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = '.\\deep\\..\\';
        const input = 'https://absolute.com/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes file protocol 1', () => {
        const base = '.\\deep\\..\\';
        const input = 'file:///root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 2', () => {
        const base = '.\\deep\\..\\';
        const input = 'file://root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/main.js.map');
      });

      it('normalizes file protocol 2.5', () => {
        const base = '.\\deep\\..\\';
        const input = 'file://root';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/');
      });

      it('normalizes file protocol 3', () => {
        const base = '.\\deep\\..\\';
        const input = 'file:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 4', () => {
        const base = '.\\deep\\..\\';
        const input = 'file:root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes windows file 1', () => {
        const base = '.\\deep\\..\\';
        const input = 'file:///C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 2', () => {
        const base = '.\\deep\\..\\';
        const input = 'file://C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 3', () => {
        const base = '.\\deep\\..\\';
        const input = 'file:/C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 4', () => {
        const base = '.\\deep\\..\\';
        const input = 'file:C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });
    });

    describe('with protocol relative input', () => {
      it('resolves relative to the base protocol', () => {
        const base = '.\\deep\\..\\';
        const input = '//protocol-relative.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = '.\\deep\\..\\';
        const input = '//protocol-relative.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = '.\\deep\\..\\';
        const input = '//protocol-relative.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/');
      });

      it('normalizes current directory', () => {
        const base = '.\\deep\\..\\';
        const input = '//protocol-relative.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = '.\\deep\\..\\';
        const input = '//protocol-relative.com/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = '.\\deep\\..\\';
        const input = '//protocol-relative.com/foo/../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });
    });

    describe('with absolute path input', () => {
      it('remains absolute path', () => {
        const base = '.\\deep\\..\\';
        const input = '/assets/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\assets\\main.js.map');
      });

      it('trims to root', () => {
        const base = '.\\deep\\..\\';
        const input = '/';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\');
      });

      it('normalizes input', () => {
        const base = '.\\deep\\..\\';
        const input = '/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\foo\\main.js.map');
      });

      it('normalizes current directory', () => {
        const base = '.\\deep\\..\\';
        const input = '/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = '.\\deep\\..\\';
        const input = '/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = '.\\deep\\..\\';
        const input = '/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\main.js.map');
      });
    });

    describe('with absolute Windows path input', () => {
      it('remains absolute path', () => {
        const base = '.\\deep\\..\\';
        const input = 'C:\\assets\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\assets\\main.js.map');
      });

      it('trims to root', () => {
        const base = '.\\deep\\..\\';
        const input = 'C:\\';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\');
      });

      it('normalizes input', () => {
        const base = '.\\deep\\..\\';
        const input = 'C:\\foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\foo\\main.js.map');
      });

      it('normalizes current directory', () => {
        const base = '.\\deep\\..\\';
        const input = 'C:\\.\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = '.\\deep\\..\\';
        const input = 'C:\\..\\..\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = '.\\deep\\..\\';
        const input = 'C:\\foo\\..\\..\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\main.js.map');
      });
    });

    describe('with leading dot relative input', () => {
      it('resolves relative to current directory', () => {
        const base = '.\\deep\\..\\';
        const input = './bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '.\\bar\\main.js.map');
      });

      it('resolves relative to parent directory', () => {
        const base = '.\\deep\\..\\';
        const input = '../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\bar\\main.js.map');
      });

      it('resolves relative to parent multiple directory', () => {
        const base = '.\\deep\\..\\';
        const input = '../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\..\\..\\bar\\main.js.map');
      });

      it('normalizes input', () => {
        const base = '.\\deep\\..\\';
        const input = './foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '.\\foo\\main.js.map');
      });
    });

    describe('with leading dot relative Windows input', () => {
      it('resolves relative to current directory', () => {
        const base = '.\\deep\\..\\';
        const input = '.\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '.\\bar\\main.js.map');
      });

      it('resolves relative to parent directory', () => {
        const base = '.\\deep\\..\\';
        const input = '..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\bar\\main.js.map');
      });

      it('resolves relative to parent multiple directory', () => {
        const base = '.\\deep\\..\\';
        const input = '..\\..\\..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\..\\..\\bar\\main.js.map');
      });

      it('normalizes input', () => {
        const base = '.\\deep\\..\\';
        const input = '.\\foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '.\\foo\\main.js.map');
      });
    });

    describe('with relative input', () => {
      it('resolves relative to current directory', () => {
        const base = '.\\deep\\..\\';
        const input = 'bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '.\\bar\\main.js.map');
      });

      it('resolves relative to parent multiple directory, later', () => {
        const base = '.\\deep\\..\\';
        const input = 'foo/../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\..\\bar\\main.js.map');
      });

      it('normalizes input', () => {
        const base = '.\\deep\\..\\';
        const input = 'foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '.\\foo\\main.js.map');
      });

      it('resolves node_module scope as path', () => {
        const base = '.\\deep\\..\\';
        const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '.\\node_modules\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js');
      });

      it('resolves package scope as path', () => {
        const base = '.\\deep\\..\\';
        const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '.\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js');
      });
    });

    describe('with relative Windows input', () => {
      it('resolves relative to current directory', () => {
        const base = '.\\deep\\..\\';
        const input = 'bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '.\\bar\\main.js.map');
      });

      it('resolves relative to parent multiple directory, later', () => {
        const base = '.\\deep\\..\\';
        const input = 'foo\\..\\..\\..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\..\\bar\\main.js.map');
      });

      it('normalizes input', () => {
        const base = '.\\deep\\..\\';
        const input = 'foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '.\\foo\\main.js.map');
      });

      it('resolves node_module scope as path', () => {
        const base = '.\\deep\\..\\';
        const input = 'node_modules\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '.\\node_modules\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js');
      });

      it('resolves package scope as path', () => {
        const base = '.\\deep\\..\\';
        const input = '@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '.\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js');
      });
    });

    describe('empty input', () => {
      it('normalizes base', () => {
        const base = '.\\deep\\..\\';
        const input = '';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '.');
      });
    });
  });

  describe(`base = "..\\.."`, () => {
    describe('with absolute input', () => {
      it('returns input', () => {
        const base = '..\\..';
        const input = 'https://absolute.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = '..\\..';
        const input = 'https://absolute.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = '..\\..';
        const input = 'https://absolute.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/');
      });

      it('normalizes current directory', () => {
        const base = '..\\..';
        const input = 'https://absolute.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = '..\\..';
        const input = 'https://absolute.com/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = '..\\..';
        const input = 'https://absolute.com/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes file protocol 1', () => {
        const base = '..\\..';
        const input = 'file:///root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 2', () => {
        const base = '..\\..';
        const input = 'file://root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/main.js.map');
      });

      it('normalizes file protocol 2.5', () => {
        const base = '..\\..';
        const input = 'file://root';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/');
      });

      it('normalizes file protocol 3', () => {
        const base = '..\\..';
        const input = 'file:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 4', () => {
        const base = '..\\..';
        const input = 'file:root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes windows file 1', () => {
        const base = '..\\..';
        const input = 'file:///C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 2', () => {
        const base = '..\\..';
        const input = 'file://C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 3', () => {
        const base = '..\\..';
        const input = 'file:/C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 4', () => {
        const base = '..\\..';
        const input = 'file:C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });
    });

    describe('with protocol relative input', () => {
      it('resolves relative to the base protocol', () => {
        const base = '..\\..';
        const input = '//protocol-relative.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = '..\\..';
        const input = '//protocol-relative.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = '..\\..';
        const input = '//protocol-relative.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/');
      });

      it('normalizes current directory', () => {
        const base = '..\\..';
        const input = '//protocol-relative.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = '..\\..';
        const input = '//protocol-relative.com/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = '..\\..';
        const input = '//protocol-relative.com/foo/../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });
    });

    describe('with absolute path input', () => {
      it('remains absolute path', () => {
        const base = '..\\..';
        const input = '/assets/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\assets\\main.js.map');
      });

      it('trims to root', () => {
        const base = '..\\..';
        const input = '/';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\');
      });

      it('normalizes input', () => {
        const base = '..\\..';
        const input = '/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\foo\\main.js.map');
      });

      it('normalizes current directory', () => {
        const base = '..\\..';
        const input = '/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = '..\\..';
        const input = '/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = '..\\..';
        const input = '/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\main.js.map');
      });
    });

    describe('with absolute Windows path input', () => {
      it('remains absolute path', () => {
        const base = '..\\..';
        const input = 'C:\\assets\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\assets\\main.js.map');
      });

      it('trims to root', () => {
        const base = '..\\..';
        const input = 'C:\\';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\');
      });

      it('normalizes input', () => {
        const base = '..\\..';
        const input = 'C:\\foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\foo\\main.js.map');
      });

      it('normalizes current directory', () => {
        const base = '..\\..';
        const input = 'C:\\.\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = '..\\..';
        const input = 'C:\\..\\..\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = '..\\..';
        const input = 'C:\\foo\\..\\..\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\main.js.map');
      });
    });

    describe('with leading dot relative input', () => {
      it('resolves relative to current directory', () => {
        const base = '..\\..';
        const input = './bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\..\\bar\\main.js.map');
      });

      it('resolves relative to parent directory', () => {
        const base = '..\\..';
        const input = '../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\..\\..\\bar\\main.js.map');
      });

      it('resolves relative to parent multiple directory', () => {
        const base = '..\\..';
        const input = '../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\..\\..\\..\\..\\bar\\main.js.map');
      });

      it('normalizes input', () => {
        const base = '..\\..';
        const input = './foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\..\\foo\\main.js.map');
      });
    });

    describe('with leading dot relative Windows input', () => {
      it('resolves relative to current directory', () => {
        const base = '..\\..';
        const input = '.\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\..\\bar\\main.js.map');
      });

      it('resolves relative to parent directory', () => {
        const base = '..\\..';
        const input = '..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\..\\..\\bar\\main.js.map');
      });

      it('resolves relative to parent multiple directory', () => {
        const base = '..\\..';
        const input = '..\\..\\..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\..\\..\\..\\..\\bar\\main.js.map');
      });

      it('normalizes input', () => {
        const base = '..\\..';
        const input = '.\\foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\..\\foo\\main.js.map');
      });
    });

    describe('with relative input', () => {
      it('resolves relative to current directory', () => {
        const base = '..\\..';
        const input = 'bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\..\\bar\\main.js.map');
      });

      it('resolves relative to parent multiple directory, later', () => {
        const base = '..\\..';
        const input = 'foo/../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\..\\..\\..\\bar\\main.js.map');
      });

      it('normalizes input', () => {
        const base = '..\\..';
        const input = 'foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\..\\foo\\main.js.map');
      });

      it('resolves node_module scope as path', () => {
        const base = '..\\..';
        const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\..\\node_modules\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js');
      });

      it('resolves package scope as path', () => {
        const base = '..\\..';
        const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\..\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js');
      });
    });

    describe('with relative Windows input', () => {
      it('resolves relative to current directory', () => {
        const base = '..\\..';
        const input = 'bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\..\\bar\\main.js.map');
      });

      it('resolves relative to parent multiple directory, later', () => {
        const base = '..\\..';
        const input = 'foo\\..\\..\\..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\..\\..\\..\\bar\\main.js.map');
      });

      it('normalizes input', () => {
        const base = '..\\..';
        const input = 'foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\..\\foo\\main.js.map');
      });

      it('resolves node_module scope as path', () => {
        const base = '..\\..';
        const input = 'node_modules\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\..\\node_modules\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js');
      });

      it('resolves package scope as path', () => {
        const base = '..\\..';
        const input = '@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\..\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js');
      });
    });

    describe('empty input', () => {
      it('normalizes base', () => {
        const base = '..\\..';
        const input = '';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\..');
      });
    });
  });

  describe(`base = "..\\..\\"`, () => {
    describe('with absolute input', () => {
      it('returns input', () => {
        const base = '..\\..\\';
        const input = 'https://absolute.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = '..\\..\\';
        const input = 'https://absolute.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = '..\\..\\';
        const input = 'https://absolute.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/');
      });

      it('normalizes current directory', () => {
        const base = '..\\..\\';
        const input = 'https://absolute.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = '..\\..\\';
        const input = 'https://absolute.com/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = '..\\..\\';
        const input = 'https://absolute.com/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes file protocol 1', () => {
        const base = '..\\..\\';
        const input = 'file:///root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 2', () => {
        const base = '..\\..\\';
        const input = 'file://root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/main.js.map');
      });

      it('normalizes file protocol 2.5', () => {
        const base = '..\\..\\';
        const input = 'file://root';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/');
      });

      it('normalizes file protocol 3', () => {
        const base = '..\\..\\';
        const input = 'file:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 4', () => {
        const base = '..\\..\\';
        const input = 'file:root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes windows file 1', () => {
        const base = '..\\..\\';
        const input = 'file:///C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 2', () => {
        const base = '..\\..\\';
        const input = 'file://C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 3', () => {
        const base = '..\\..\\';
        const input = 'file:/C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 4', () => {
        const base = '..\\..\\';
        const input = 'file:C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });
    });

    describe('with protocol relative input', () => {
      it('resolves relative to the base protocol', () => {
        const base = '..\\..\\';
        const input = '//protocol-relative.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = '..\\..\\';
        const input = '//protocol-relative.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = '..\\..\\';
        const input = '//protocol-relative.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/');
      });

      it('normalizes current directory', () => {
        const base = '..\\..\\';
        const input = '//protocol-relative.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = '..\\..\\';
        const input = '//protocol-relative.com/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = '..\\..\\';
        const input = '//protocol-relative.com/foo/../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });
    });

    describe('with absolute path input', () => {
      it('remains absolute path', () => {
        const base = '..\\..\\';
        const input = '/assets/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\assets\\main.js.map');
      });

      it('trims to root', () => {
        const base = '..\\..\\';
        const input = '/';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\');
      });

      it('normalizes input', () => {
        const base = '..\\..\\';
        const input = '/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\foo\\main.js.map');
      });

      it('normalizes current directory', () => {
        const base = '..\\..\\';
        const input = '/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = '..\\..\\';
        const input = '/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = '..\\..\\';
        const input = '/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\main.js.map');
      });
    });

    describe('with absolute Windows path input', () => {
      it('remains absolute path', () => {
        const base = '..\\..\\';
        const input = 'C:\\assets\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\assets\\main.js.map');
      });

      it('trims to root', () => {
        const base = '..\\..\\';
        const input = 'C:\\';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\');
      });

      it('normalizes input', () => {
        const base = '..\\..\\';
        const input = 'C:\\foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\foo\\main.js.map');
      });

      it('normalizes current directory', () => {
        const base = '..\\..\\';
        const input = 'C:\\.\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = '..\\..\\';
        const input = 'C:\\..\\..\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = '..\\..\\';
        const input = 'C:\\foo\\..\\..\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\main.js.map');
      });
    });

    describe('with leading dot relative input', () => {
      it('resolves relative to current directory', () => {
        const base = '..\\..\\';
        const input = './bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\..\\bar\\main.js.map');
      });

      it('resolves relative to parent directory', () => {
        const base = '..\\..\\';
        const input = '../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\..\\..\\bar\\main.js.map');
      });

      it('resolves relative to parent multiple directory', () => {
        const base = '..\\..\\';
        const input = '../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\..\\..\\..\\..\\bar\\main.js.map');
      });

      it('normalizes input', () => {
        const base = '..\\..\\';
        const input = './foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\..\\foo\\main.js.map');
      });
    });

    describe('with leading dot relative Windows input', () => {
      it('resolves relative to current directory', () => {
        const base = '..\\..\\';
        const input = '.\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\..\\bar\\main.js.map');
      });

      it('resolves relative to parent directory', () => {
        const base = '..\\..\\';
        const input = '..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\..\\..\\bar\\main.js.map');
      });

      it('resolves relative to parent multiple directory', () => {
        const base = '..\\..\\';
        const input = '..\\..\\..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\..\\..\\..\\..\\bar\\main.js.map');
      });

      it('normalizes input', () => {
        const base = '..\\..\\';
        const input = '.\\foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\..\\foo\\main.js.map');
      });
    });

    describe('with relative input', () => {
      it('resolves relative to current directory', () => {
        const base = '..\\..\\';
        const input = 'bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\..\\bar\\main.js.map');
      });

      it('resolves relative to parent multiple directory, later', () => {
        const base = '..\\..\\';
        const input = 'foo/../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\..\\..\\..\\bar\\main.js.map');
      });

      it('normalizes input', () => {
        const base = '..\\..\\';
        const input = 'foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\..\\foo\\main.js.map');
      });

      it('resolves node_module scope as path', () => {
        const base = '..\\..\\';
        const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\..\\node_modules\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js');
      });

      it('resolves package scope as path', () => {
        const base = '..\\..\\';
        const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\..\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js');
      });
    });

    describe('with relative Windows input', () => {
      it('resolves relative to current directory', () => {
        const base = '..\\..\\';
        const input = 'bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\..\\bar\\main.js.map');
      });

      it('resolves relative to parent multiple directory, later', () => {
        const base = '..\\..\\';
        const input = 'foo\\..\\..\\..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\..\\..\\..\\bar\\main.js.map');
      });

      it('normalizes input', () => {
        const base = '..\\..\\';
        const input = 'foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\..\\foo\\main.js.map');
      });

      it('resolves node_module scope as path', () => {
        const base = '..\\..\\';
        const input = 'node_modules\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\..\\node_modules\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js');
      });

      it('resolves package scope as path', () => {
        const base = '..\\..\\';
        const input = '@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\..\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js');
      });
    });

    describe('empty input', () => {
      it('normalizes base', () => {
        const base = '..\\..\\';
        const input = '';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\..');
      });
    });
  });

  describe(`base = "..\\deep\\.."`, () => {
    describe('with absolute input', () => {
      it('returns input', () => {
        const base = '..\\deep\\..';
        const input = 'https://absolute.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = '..\\deep\\..';
        const input = 'https://absolute.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = '..\\deep\\..';
        const input = 'https://absolute.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/');
      });

      it('normalizes current directory', () => {
        const base = '..\\deep\\..';
        const input = 'https://absolute.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = '..\\deep\\..';
        const input = 'https://absolute.com/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = '..\\deep\\..';
        const input = 'https://absolute.com/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes file protocol 1', () => {
        const base = '..\\deep\\..';
        const input = 'file:///root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 2', () => {
        const base = '..\\deep\\..';
        const input = 'file://root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/main.js.map');
      });

      it('normalizes file protocol 2.5', () => {
        const base = '..\\deep\\..';
        const input = 'file://root';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/');
      });

      it('normalizes file protocol 3', () => {
        const base = '..\\deep\\..';
        const input = 'file:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 4', () => {
        const base = '..\\deep\\..';
        const input = 'file:root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes windows file 1', () => {
        const base = '..\\deep\\..';
        const input = 'file:///C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 2', () => {
        const base = '..\\deep\\..';
        const input = 'file://C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 3', () => {
        const base = '..\\deep\\..';
        const input = 'file:/C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 4', () => {
        const base = '..\\deep\\..';
        const input = 'file:C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });
    });

    describe('with protocol relative input', () => {
      it('resolves relative to the base protocol', () => {
        const base = '..\\deep\\..';
        const input = '//protocol-relative.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = '..\\deep\\..';
        const input = '//protocol-relative.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = '..\\deep\\..';
        const input = '//protocol-relative.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/');
      });

      it('normalizes current directory', () => {
        const base = '..\\deep\\..';
        const input = '//protocol-relative.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = '..\\deep\\..';
        const input = '//protocol-relative.com/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = '..\\deep\\..';
        const input = '//protocol-relative.com/foo/../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });
    });

    describe('with absolute path input', () => {
      it('remains absolute path', () => {
        const base = '..\\deep\\..';
        const input = '/assets/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\assets\\main.js.map');
      });

      it('trims to root', () => {
        const base = '..\\deep\\..';
        const input = '/';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\');
      });

      it('normalizes input', () => {
        const base = '..\\deep\\..';
        const input = '/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\foo\\main.js.map');
      });

      it('normalizes current directory', () => {
        const base = '..\\deep\\..';
        const input = '/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = '..\\deep\\..';
        const input = '/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = '..\\deep\\..';
        const input = '/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\main.js.map');
      });
    });

    describe('with absolute Windows path input', () => {
      it('remains absolute path', () => {
        const base = '..\\deep\\..';
        const input = 'C:\\assets\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\assets\\main.js.map');
      });

      it('trims to root', () => {
        const base = '..\\deep\\..';
        const input = 'C:\\';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\');
      });

      it('normalizes input', () => {
        const base = '..\\deep\\..';
        const input = 'C:\\foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\foo\\main.js.map');
      });

      it('normalizes current directory', () => {
        const base = '..\\deep\\..';
        const input = 'C:\\.\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = '..\\deep\\..';
        const input = 'C:\\..\\..\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = '..\\deep\\..';
        const input = 'C:\\foo\\..\\..\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\main.js.map');
      });
    });

    describe('with leading dot relative input', () => {
      it('resolves relative to current directory', () => {
        const base = '..\\deep\\..';
        const input = './bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\bar\\main.js.map');
      });

      it('resolves relative to parent directory', () => {
        const base = '..\\deep\\..';
        const input = '../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\..\\bar\\main.js.map');
      });

      it('resolves relative to parent multiple directory', () => {
        const base = '..\\deep\\..';
        const input = '../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\..\\..\\..\\bar\\main.js.map');
      });

      it('normalizes input', () => {
        const base = '..\\deep\\..';
        const input = './foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\foo\\main.js.map');
      });
    });

    describe('with leading dot relative Windows input', () => {
      it('resolves relative to current directory', () => {
        const base = '..\\deep\\..';
        const input = '.\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\bar\\main.js.map');
      });

      it('resolves relative to parent directory', () => {
        const base = '..\\deep\\..';
        const input = '..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\..\\bar\\main.js.map');
      });

      it('resolves relative to parent multiple directory', () => {
        const base = '..\\deep\\..';
        const input = '..\\..\\..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\..\\..\\..\\bar\\main.js.map');
      });

      it('normalizes input', () => {
        const base = '..\\deep\\..';
        const input = '.\\foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\foo\\main.js.map');
      });
    });

    describe('with relative input', () => {
      it('resolves relative to current directory', () => {
        const base = '..\\deep\\..';
        const input = 'bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\bar\\main.js.map');
      });

      it('resolves relative to parent multiple directory, later', () => {
        const base = '..\\deep\\..';
        const input = 'foo/../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\..\\..\\bar\\main.js.map');
      });

      it('normalizes input', () => {
        const base = '..\\deep\\..';
        const input = 'foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\foo\\main.js.map');
      });

      it('resolves node_module scope as path', () => {
        const base = '..\\deep\\..';
        const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\node_modules\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js');
      });

      it('resolves package scope as path', () => {
        const base = '..\\deep\\..';
        const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js');
      });
    });

    describe('with relative Windows input', () => {
      it('resolves relative to current directory', () => {
        const base = '..\\deep\\..';
        const input = 'bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\bar\\main.js.map');
      });

      it('resolves relative to parent multiple directory, later', () => {
        const base = '..\\deep\\..';
        const input = 'foo\\..\\..\\..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\..\\..\\bar\\main.js.map');
      });

      it('normalizes input', () => {
        const base = '..\\deep\\..';
        const input = 'foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\foo\\main.js.map');
      });

      it('resolves node_module scope as path', () => {
        const base = '..\\deep\\..';
        const input = 'node_modules\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\node_modules\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js');
      });

      it('resolves package scope as path', () => {
        const base = '..\\deep\\..';
        const input = '@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js');
      });
    });

    describe('empty input', () => {
      it('normalizes base', () => {
        const base = '..\\deep\\..';
        const input = '';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..');
      });
    });
  });

  describe(`base = "..\\deep\\..\\"`, () => {
    describe('with absolute input', () => {
      it('returns input', () => {
        const base = '..\\deep\\..\\';
        const input = 'https://absolute.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = '..\\deep\\..\\';
        const input = 'https://absolute.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = '..\\deep\\..\\';
        const input = 'https://absolute.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/');
      });

      it('normalizes current directory', () => {
        const base = '..\\deep\\..\\';
        const input = 'https://absolute.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = '..\\deep\\..\\';
        const input = 'https://absolute.com/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = '..\\deep\\..\\';
        const input = 'https://absolute.com/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes file protocol 1', () => {
        const base = '..\\deep\\..\\';
        const input = 'file:///root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 2', () => {
        const base = '..\\deep\\..\\';
        const input = 'file://root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/main.js.map');
      });

      it('normalizes file protocol 2.5', () => {
        const base = '..\\deep\\..\\';
        const input = 'file://root';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/');
      });

      it('normalizes file protocol 3', () => {
        const base = '..\\deep\\..\\';
        const input = 'file:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 4', () => {
        const base = '..\\deep\\..\\';
        const input = 'file:root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes windows file 1', () => {
        const base = '..\\deep\\..\\';
        const input = 'file:///C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 2', () => {
        const base = '..\\deep\\..\\';
        const input = 'file://C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 3', () => {
        const base = '..\\deep\\..\\';
        const input = 'file:/C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 4', () => {
        const base = '..\\deep\\..\\';
        const input = 'file:C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });
    });

    describe('with protocol relative input', () => {
      it('resolves relative to the base protocol', () => {
        const base = '..\\deep\\..\\';
        const input = '//protocol-relative.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = '..\\deep\\..\\';
        const input = '//protocol-relative.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = '..\\deep\\..\\';
        const input = '//protocol-relative.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/');
      });

      it('normalizes current directory', () => {
        const base = '..\\deep\\..\\';
        const input = '//protocol-relative.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = '..\\deep\\..\\';
        const input = '//protocol-relative.com/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = '..\\deep\\..\\';
        const input = '//protocol-relative.com/foo/../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });
    });

    describe('with absolute path input', () => {
      it('remains absolute path', () => {
        const base = '..\\deep\\..\\';
        const input = '/assets/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\assets\\main.js.map');
      });

      it('trims to root', () => {
        const base = '..\\deep\\..\\';
        const input = '/';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\');
      });

      it('normalizes input', () => {
        const base = '..\\deep\\..\\';
        const input = '/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\foo\\main.js.map');
      });

      it('normalizes current directory', () => {
        const base = '..\\deep\\..\\';
        const input = '/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = '..\\deep\\..\\';
        const input = '/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = '..\\deep\\..\\';
        const input = '/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '\\main.js.map');
      });
    });

    describe('with absolute Windows path input', () => {
      it('remains absolute path', () => {
        const base = '..\\deep\\..\\';
        const input = 'C:\\assets\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\assets\\main.js.map');
      });

      it('trims to root', () => {
        const base = '..\\deep\\..\\';
        const input = 'C:\\';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\');
      });

      it('normalizes input', () => {
        const base = '..\\deep\\..\\';
        const input = 'C:\\foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\foo\\main.js.map');
      });

      it('normalizes current directory', () => {
        const base = '..\\deep\\..\\';
        const input = 'C:\\.\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = '..\\deep\\..\\';
        const input = 'C:\\..\\..\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = '..\\deep\\..\\';
        const input = 'C:\\foo\\..\\..\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\main.js.map');
      });
    });

    describe('with leading dot relative input', () => {
      it('resolves relative to current directory', () => {
        const base = '..\\deep\\..\\';
        const input = './bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\bar\\main.js.map');
      });

      it('resolves relative to parent directory', () => {
        const base = '..\\deep\\..\\';
        const input = '../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\..\\bar\\main.js.map');
      });

      it('resolves relative to parent multiple directory', () => {
        const base = '..\\deep\\..\\';
        const input = '../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\..\\..\\..\\bar\\main.js.map');
      });

      it('normalizes input', () => {
        const base = '..\\deep\\..\\';
        const input = './foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\foo\\main.js.map');
      });
    });

    describe('with leading dot relative Windows input', () => {
      it('resolves relative to current directory', () => {
        const base = '..\\deep\\..\\';
        const input = '.\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\bar\\main.js.map');
      });

      it('resolves relative to parent directory', () => {
        const base = '..\\deep\\..\\';
        const input = '..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\..\\bar\\main.js.map');
      });

      it('resolves relative to parent multiple directory', () => {
        const base = '..\\deep\\..\\';
        const input = '..\\..\\..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\..\\..\\..\\bar\\main.js.map');
      });

      it('normalizes input', () => {
        const base = '..\\deep\\..\\';
        const input = '.\\foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\foo\\main.js.map');
      });
    });

    describe('with relative input', () => {
      it('resolves relative to current directory', () => {
        const base = '..\\deep\\..\\';
        const input = 'bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\bar\\main.js.map');
      });

      it('resolves relative to parent multiple directory, later', () => {
        const base = '..\\deep\\..\\';
        const input = 'foo/../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\..\\..\\bar\\main.js.map');
      });

      it('normalizes input', () => {
        const base = '..\\deep\\..\\';
        const input = 'foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\foo\\main.js.map');
      });

      it('resolves node_module scope as path', () => {
        const base = '..\\deep\\..\\';
        const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\node_modules\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js');
      });

      it('resolves package scope as path', () => {
        const base = '..\\deep\\..\\';
        const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js');
      });
    });

    describe('with relative Windows input', () => {
      it('resolves relative to current directory', () => {
        const base = '..\\deep\\..\\';
        const input = 'bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\bar\\main.js.map');
      });

      it('resolves relative to parent multiple directory, later', () => {
        const base = '..\\deep\\..\\';
        const input = 'foo\\..\\..\\..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\..\\..\\bar\\main.js.map');
      });

      it('normalizes input', () => {
        const base = '..\\deep\\..\\';
        const input = 'foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\foo\\main.js.map');
      });

      it('resolves node_module scope as path', () => {
        const base = '..\\deep\\..\\';
        const input = 'node_modules\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\node_modules\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js');
      });

      it('resolves package scope as path', () => {
        const base = '..\\deep\\..\\';
        const input = '@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js');
      });
    });

    describe('empty input', () => {
      it('normalizes base', () => {
        const base = '..\\deep\\..\\';
        const input = '';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '..');
      });
    });
  });
});
