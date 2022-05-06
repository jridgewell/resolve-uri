const resolve = require('../');
const assert = require('assert');

describe('with absolute Windows path base', () => {
  describe(`base = "C:\\"`, () => {
    describe('with absolute input', () => {
      it('returns input', () => {
        const base = 'C:\\';
        const input = 'https://absolute.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'C:\\';
        const input = 'https://absolute.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = 'C:\\';
        const input = 'https://absolute.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/');
      });

      it('normalizes current directory', () => {
        const base = 'C:\\';
        const input = 'https://absolute.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'C:\\';
        const input = 'https://absolute.com/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'C:\\';
        const input = 'https://absolute.com/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes file protocol 1', () => {
        const base = 'C:\\';
        const input = 'file:///root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 2', () => {
        const base = 'C:\\';
        const input = 'file://root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/main.js.map');
      });

      it('normalizes file protocol 2.5', () => {
        const base = 'C:\\';
        const input = 'file://root';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/');
      });

      it('normalizes file protocol 3', () => {
        const base = 'C:\\';
        const input = 'file:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 4', () => {
        const base = 'C:\\';
        const input = 'file:root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes windows file 1', () => {
        const base = 'C:\\';
        const input = 'file:///C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 2', () => {
        const base = 'C:\\';
        const input = 'file://C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 3', () => {
        const base = 'C:\\';
        const input = 'file:/C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 4', () => {
        const base = 'C:\\';
        const input = 'file:C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });
    });

    describe('with protocol relative input', () => {
      it('resolves relative to the base protocol', () => {
        const base = 'C:\\';
        const input = '//protocol-relative.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'C:\\';
        const input = '//protocol-relative.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = 'C:\\';
        const input = '//protocol-relative.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/');
      });

      it('normalizes current directory', () => {
        const base = 'C:\\';
        const input = '//protocol-relative.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'C:\\';
        const input = '//protocol-relative.com/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'C:\\';
        const input = '//protocol-relative.com/foo/../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });
    });

    describe('with absolute path input', () => {
      it('remains absolute path', () => {
        const base = 'C:\\';
        const input = '/assets/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\assets\\main.js.map');
      });

      it('trims to root', () => {
        const base = 'C:\\';
        const input = '/';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\');
      });

      it('normalizes input', () => {
        const base = 'C:\\';
        const input = '/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\foo\\main.js.map');
      });

      it('normalizes current directory', () => {
        const base = 'C:\\';
        const input = '/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'C:\\';
        const input = '/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'C:\\';
        const input = '/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\main.js.map');
      });
    });

    describe('with absolute Windows path input', () => {
      it('remains absolute path', () => {
        const base = 'C:\\';
        const input = 'C:\\assets\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\assets\\main.js.map');
      });

      it('trims to root', () => {
        const base = 'C:\\';
        const input = 'C:\\';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\');
      });

      it('normalizes input', () => {
        const base = 'C:\\';
        const input = 'C:\\foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\foo\\main.js.map');
      });

      it('normalizes current directory', () => {
        const base = 'C:\\';
        const input = 'C:\\.\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'C:\\';
        const input = 'C:\\..\\..\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'C:\\';
        const input = 'C:\\foo\\..\\..\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\main.js.map');
      });
    });

    describe('with leading dot relative input', () => {
      it('resolves relative to current directory', () => {
        const base = 'C:\\';
        const input = './bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\bar\\main.js.map');
      });

      it('resolves relative to parent directory', () => {
        const base = 'C:\\';
        const input = '../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\bar\\main.js.map');
      });

      it('resolves relative to parent multiple directory', () => {
        const base = 'C:\\';
        const input = '../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\bar\\main.js.map');
      });

      it('normalizes input', () => {
        const base = 'C:\\';
        const input = './foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\foo\\main.js.map');
      });
    });

    describe('with leading dot relative Windows input', () => {
      it('resolves relative to current directory', () => {
        const base = 'C:\\';
        const input = '.\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\bar\\main.js.map');
      });

      it('resolves relative to parent directory', () => {
        const base = 'C:\\';
        const input = '..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\bar\\main.js.map');
      });

      it('resolves relative to parent multiple directory', () => {
        const base = 'C:\\';
        const input = '..\\..\\..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\bar\\main.js.map');
      });

      it('normalizes input', () => {
        const base = 'C:\\';
        const input = '.\\foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\foo\\main.js.map');
      });
    });

    describe('with relative input', () => {
      it('resolves relative to current directory', () => {
        const base = 'C:\\';
        const input = 'bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\bar\\main.js.map');
      });

      it('resolves relative to parent multiple directory, later', () => {
        const base = 'C:\\';
        const input = 'foo/../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\bar\\main.js.map');
      });

      it('normalizes input', () => {
        const base = 'C:\\';
        const input = 'foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\foo\\main.js.map');
      });

      it('resolves node_module scope as path', () => {
        const base = 'C:\\';
        const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\node_modules\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js');
      });

      it('resolves package scope as path', () => {
        const base = 'C:\\';
        const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js');
      });
    });

    describe('with relative Windows input', () => {
      it('resolves relative to current directory', () => {
        const base = 'C:\\';
        const input = 'bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\bar\\main.js.map');
      });

      it('resolves relative to parent multiple directory, later', () => {
        const base = 'C:\\';
        const input = 'foo\\..\\..\\..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\bar\\main.js.map');
      });

      it('normalizes input', () => {
        const base = 'C:\\';
        const input = 'foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\foo\\main.js.map');
      });

      it('resolves node_module scope as path', () => {
        const base = 'C:\\';
        const input = 'node_modules\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\node_modules\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js');
      });

      it('resolves package scope as path', () => {
        const base = 'C:\\';
        const input = '@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js');
      });
    });

    describe('empty input', () => {
      it('normalizes base', () => {
        const base = 'C:\\';
        const input = '';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\');
      });
    });
  });

  describe(`base = "C:\\root"`, () => {
    describe('with absolute input', () => {
      it('returns input', () => {
        const base = 'C:\\root';
        const input = 'https://absolute.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'C:\\root';
        const input = 'https://absolute.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = 'C:\\root';
        const input = 'https://absolute.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/');
      });

      it('normalizes current directory', () => {
        const base = 'C:\\root';
        const input = 'https://absolute.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'C:\\root';
        const input = 'https://absolute.com/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'C:\\root';
        const input = 'https://absolute.com/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes file protocol 1', () => {
        const base = 'C:\\root';
        const input = 'file:///root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 2', () => {
        const base = 'C:\\root';
        const input = 'file://root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/main.js.map');
      });

      it('normalizes file protocol 2.5', () => {
        const base = 'C:\\root';
        const input = 'file://root';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/');
      });

      it('normalizes file protocol 3', () => {
        const base = 'C:\\root';
        const input = 'file:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 4', () => {
        const base = 'C:\\root';
        const input = 'file:root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes windows file 1', () => {
        const base = 'C:\\root';
        const input = 'file:///C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 2', () => {
        const base = 'C:\\root';
        const input = 'file://C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 3', () => {
        const base = 'C:\\root';
        const input = 'file:/C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 4', () => {
        const base = 'C:\\root';
        const input = 'file:C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });
    });

    describe('with protocol relative input', () => {
      it('resolves relative to the base protocol', () => {
        const base = 'C:\\root';
        const input = '//protocol-relative.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'C:\\root';
        const input = '//protocol-relative.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = 'C:\\root';
        const input = '//protocol-relative.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/');
      });

      it('normalizes current directory', () => {
        const base = 'C:\\root';
        const input = '//protocol-relative.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'C:\\root';
        const input = '//protocol-relative.com/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'C:\\root';
        const input = '//protocol-relative.com/foo/../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });
    });

    describe('with absolute path input', () => {
      it('remains absolute path', () => {
        const base = 'C:\\root';
        const input = '/assets/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\assets\\main.js.map');
      });

      it('trims to root', () => {
        const base = 'C:\\root';
        const input = '/';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\');
      });

      it('normalizes input', () => {
        const base = 'C:\\root';
        const input = '/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\foo\\main.js.map');
      });

      it('normalizes current directory', () => {
        const base = 'C:\\root';
        const input = '/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'C:\\root';
        const input = '/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'C:\\root';
        const input = '/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\main.js.map');
      });
    });

    describe('with absolute Windows path input', () => {
      it('remains absolute path', () => {
        const base = 'C:\\root';
        const input = 'C:\\assets\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\assets\\main.js.map');
      });

      it('trims to root', () => {
        const base = 'C:\\root';
        const input = 'C:\\';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\');
      });

      it('normalizes input', () => {
        const base = 'C:\\root';
        const input = 'C:\\foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\foo\\main.js.map');
      });

      it('normalizes current directory', () => {
        const base = 'C:\\root';
        const input = 'C:\\.\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'C:\\root';
        const input = 'C:\\..\\..\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'C:\\root';
        const input = 'C:\\foo\\..\\..\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\main.js.map');
      });
    });

    describe('with leading dot relative input', () => {
      it('resolves relative to current directory', () => {
        const base = 'C:\\root';
        const input = './bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\bar\\main.js.map');
      });

      it('resolves relative to parent directory', () => {
        const base = 'C:\\root';
        const input = '../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\bar\\main.js.map');
      });

      it('resolves relative to parent multiple directory', () => {
        const base = 'C:\\root';
        const input = '../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\bar\\main.js.map');
      });

      it('normalizes input', () => {
        const base = 'C:\\root';
        const input = './foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\foo\\main.js.map');
      });
    });

    describe('with leading dot relative Windows input', () => {
      it('resolves relative to current directory', () => {
        const base = 'C:\\root';
        const input = '.\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\bar\\main.js.map');
      });

      it('resolves relative to parent directory', () => {
        const base = 'C:\\root';
        const input = '..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\bar\\main.js.map');
      });

      it('resolves relative to parent multiple directory', () => {
        const base = 'C:\\root';
        const input = '..\\..\\..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\bar\\main.js.map');
      });

      it('normalizes input', () => {
        const base = 'C:\\root';
        const input = '.\\foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\foo\\main.js.map');
      });
    });

    describe('with relative input', () => {
      it('resolves relative to current directory', () => {
        const base = 'C:\\root';
        const input = 'bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\bar\\main.js.map');
      });

      it('resolves relative to parent multiple directory, later', () => {
        const base = 'C:\\root';
        const input = 'foo/../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\bar\\main.js.map');
      });

      it('normalizes input', () => {
        const base = 'C:\\root';
        const input = 'foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\foo\\main.js.map');
      });

      it('resolves node_module scope as path', () => {
        const base = 'C:\\root';
        const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\node_modules\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js');
      });

      it('resolves package scope as path', () => {
        const base = 'C:\\root';
        const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js');
      });
    });

    describe('with relative Windows input', () => {
      it('resolves relative to current directory', () => {
        const base = 'C:\\root';
        const input = 'bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\bar\\main.js.map');
      });

      it('resolves relative to parent multiple directory, later', () => {
        const base = 'C:\\root';
        const input = 'foo\\..\\..\\..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\bar\\main.js.map');
      });

      it('normalizes input', () => {
        const base = 'C:\\root';
        const input = 'foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\foo\\main.js.map');
      });

      it('resolves node_module scope as path', () => {
        const base = 'C:\\root';
        const input = 'node_modules\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\node_modules\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js');
      });

      it('resolves package scope as path', () => {
        const base = 'C:\\root';
        const input = '@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js');
      });
    });

    describe('empty input', () => {
      it('normalizes base', () => {
        const base = 'C:\\root';
        const input = '';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\root');
      });
    });
  });

  describe(`base = "C:\\root\\"`, () => {
    describe('with absolute input', () => {
      it('returns input', () => {
        const base = 'C:\\root\\';
        const input = 'https://absolute.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'C:\\root\\';
        const input = 'https://absolute.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = 'C:\\root\\';
        const input = 'https://absolute.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/');
      });

      it('normalizes current directory', () => {
        const base = 'C:\\root\\';
        const input = 'https://absolute.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'C:\\root\\';
        const input = 'https://absolute.com/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'C:\\root\\';
        const input = 'https://absolute.com/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes file protocol 1', () => {
        const base = 'C:\\root\\';
        const input = 'file:///root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 2', () => {
        const base = 'C:\\root\\';
        const input = 'file://root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/main.js.map');
      });

      it('normalizes file protocol 2.5', () => {
        const base = 'C:\\root\\';
        const input = 'file://root';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/');
      });

      it('normalizes file protocol 3', () => {
        const base = 'C:\\root\\';
        const input = 'file:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 4', () => {
        const base = 'C:\\root\\';
        const input = 'file:root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes windows file 1', () => {
        const base = 'C:\\root\\';
        const input = 'file:///C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 2', () => {
        const base = 'C:\\root\\';
        const input = 'file://C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 3', () => {
        const base = 'C:\\root\\';
        const input = 'file:/C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 4', () => {
        const base = 'C:\\root\\';
        const input = 'file:C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });
    });

    describe('with protocol relative input', () => {
      it('resolves relative to the base protocol', () => {
        const base = 'C:\\root\\';
        const input = '//protocol-relative.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'C:\\root\\';
        const input = '//protocol-relative.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = 'C:\\root\\';
        const input = '//protocol-relative.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/');
      });

      it('normalizes current directory', () => {
        const base = 'C:\\root\\';
        const input = '//protocol-relative.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'C:\\root\\';
        const input = '//protocol-relative.com/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'C:\\root\\';
        const input = '//protocol-relative.com/foo/../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });
    });

    describe('with absolute path input', () => {
      it('remains absolute path', () => {
        const base = 'C:\\root\\';
        const input = '/assets/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\assets\\main.js.map');
      });

      it('trims to root', () => {
        const base = 'C:\\root\\';
        const input = '/';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\');
      });

      it('normalizes input', () => {
        const base = 'C:\\root\\';
        const input = '/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\foo\\main.js.map');
      });

      it('normalizes current directory', () => {
        const base = 'C:\\root\\';
        const input = '/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'C:\\root\\';
        const input = '/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'C:\\root\\';
        const input = '/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\main.js.map');
      });
    });

    describe('with absolute Windows path input', () => {
      it('remains absolute path', () => {
        const base = 'C:\\root\\';
        const input = 'C:\\assets\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\assets\\main.js.map');
      });

      it('trims to root', () => {
        const base = 'C:\\root\\';
        const input = 'C:\\';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\');
      });

      it('normalizes input', () => {
        const base = 'C:\\root\\';
        const input = 'C:\\foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\foo\\main.js.map');
      });

      it('normalizes current directory', () => {
        const base = 'C:\\root\\';
        const input = 'C:\\.\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'C:\\root\\';
        const input = 'C:\\..\\..\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'C:\\root\\';
        const input = 'C:\\foo\\..\\..\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\main.js.map');
      });
    });

    describe('with leading dot relative input', () => {
      it('resolves relative to current directory', () => {
        const base = 'C:\\root\\';
        const input = './bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\root\\bar\\main.js.map');
      });

      it('resolves relative to parent directory', () => {
        const base = 'C:\\root\\';
        const input = '../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\bar\\main.js.map');
      });

      it('resolves relative to parent multiple directory', () => {
        const base = 'C:\\root\\';
        const input = '../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\bar\\main.js.map');
      });

      it('normalizes input', () => {
        const base = 'C:\\root\\';
        const input = './foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\root\\foo\\main.js.map');
      });
    });

    describe('with leading dot relative Windows input', () => {
      it('resolves relative to current directory', () => {
        const base = 'C:\\root\\';
        const input = '.\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\root\\bar\\main.js.map');
      });

      it('resolves relative to parent directory', () => {
        const base = 'C:\\root\\';
        const input = '..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\bar\\main.js.map');
      });

      it('resolves relative to parent multiple directory', () => {
        const base = 'C:\\root\\';
        const input = '..\\..\\..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\bar\\main.js.map');
      });

      it('normalizes input', () => {
        const base = 'C:\\root\\';
        const input = '.\\foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\root\\foo\\main.js.map');
      });
    });

    describe('with relative input', () => {
      it('resolves relative to current directory', () => {
        const base = 'C:\\root\\';
        const input = 'bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\root\\bar\\main.js.map');
      });

      it('resolves relative to parent multiple directory, later', () => {
        const base = 'C:\\root\\';
        const input = 'foo/../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\bar\\main.js.map');
      });

      it('normalizes input', () => {
        const base = 'C:\\root\\';
        const input = 'foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\root\\foo\\main.js.map');
      });

      it('resolves node_module scope as path', () => {
        const base = 'C:\\root\\';
        const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\root\\node_modules\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js');
      });

      it('resolves package scope as path', () => {
        const base = 'C:\\root\\';
        const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\root\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js');
      });
    });

    describe('with relative Windows input', () => {
      it('resolves relative to current directory', () => {
        const base = 'C:\\root\\';
        const input = 'bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\root\\bar\\main.js.map');
      });

      it('resolves relative to parent multiple directory, later', () => {
        const base = 'C:\\root\\';
        const input = 'foo\\..\\..\\..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\bar\\main.js.map');
      });

      it('normalizes input', () => {
        const base = 'C:\\root\\';
        const input = 'foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\root\\foo\\main.js.map');
      });

      it('resolves node_module scope as path', () => {
        const base = 'C:\\root\\';
        const input = 'node_modules\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\root\\node_modules\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js');
      });

      it('resolves package scope as path', () => {
        const base = 'C:\\root\\';
        const input = '@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\root\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js');
      });
    });

    describe('empty input', () => {
      it('normalizes base', () => {
        const base = 'C:\\root\\';
        const input = '';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\root\\');
      });
    });
  });

  describe(`base = "C:\\root\\file"`, () => {
    describe('with absolute input', () => {
      it('returns input', () => {
        const base = 'C:\\root\\file';
        const input = 'https://absolute.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'C:\\root\\file';
        const input = 'https://absolute.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = 'C:\\root\\file';
        const input = 'https://absolute.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/');
      });

      it('normalizes current directory', () => {
        const base = 'C:\\root\\file';
        const input = 'https://absolute.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'C:\\root\\file';
        const input = 'https://absolute.com/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'C:\\root\\file';
        const input = 'https://absolute.com/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes file protocol 1', () => {
        const base = 'C:\\root\\file';
        const input = 'file:///root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 2', () => {
        const base = 'C:\\root\\file';
        const input = 'file://root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/main.js.map');
      });

      it('normalizes file protocol 2.5', () => {
        const base = 'C:\\root\\file';
        const input = 'file://root';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/');
      });

      it('normalizes file protocol 3', () => {
        const base = 'C:\\root\\file';
        const input = 'file:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 4', () => {
        const base = 'C:\\root\\file';
        const input = 'file:root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes windows file 1', () => {
        const base = 'C:\\root\\file';
        const input = 'file:///C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 2', () => {
        const base = 'C:\\root\\file';
        const input = 'file://C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 3', () => {
        const base = 'C:\\root\\file';
        const input = 'file:/C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 4', () => {
        const base = 'C:\\root\\file';
        const input = 'file:C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });
    });

    describe('with protocol relative input', () => {
      it('resolves relative to the base protocol', () => {
        const base = 'C:\\root\\file';
        const input = '//protocol-relative.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'C:\\root\\file';
        const input = '//protocol-relative.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = 'C:\\root\\file';
        const input = '//protocol-relative.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/');
      });

      it('normalizes current directory', () => {
        const base = 'C:\\root\\file';
        const input = '//protocol-relative.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'C:\\root\\file';
        const input = '//protocol-relative.com/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'C:\\root\\file';
        const input = '//protocol-relative.com/foo/../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });
    });

    describe('with absolute path input', () => {
      it('remains absolute path', () => {
        const base = 'C:\\root\\file';
        const input = '/assets/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\assets\\main.js.map');
      });

      it('trims to root', () => {
        const base = 'C:\\root\\file';
        const input = '/';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\');
      });

      it('normalizes input', () => {
        const base = 'C:\\root\\file';
        const input = '/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\foo\\main.js.map');
      });

      it('normalizes current directory', () => {
        const base = 'C:\\root\\file';
        const input = '/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'C:\\root\\file';
        const input = '/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'C:\\root\\file';
        const input = '/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\main.js.map');
      });
    });

    describe('with absolute Windows path input', () => {
      it('remains absolute path', () => {
        const base = 'C:\\root\\file';
        const input = 'C:\\assets\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\assets\\main.js.map');
      });

      it('trims to root', () => {
        const base = 'C:\\root\\file';
        const input = 'C:\\';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\');
      });

      it('normalizes input', () => {
        const base = 'C:\\root\\file';
        const input = 'C:\\foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\foo\\main.js.map');
      });

      it('normalizes current directory', () => {
        const base = 'C:\\root\\file';
        const input = 'C:\\.\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'C:\\root\\file';
        const input = 'C:\\..\\..\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'C:\\root\\file';
        const input = 'C:\\foo\\..\\..\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\main.js.map');
      });
    });

    describe('with leading dot relative input', () => {
      it('resolves relative to current directory', () => {
        const base = 'C:\\root\\file';
        const input = './bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\root\\bar\\main.js.map');
      });

      it('resolves relative to parent directory', () => {
        const base = 'C:\\root\\file';
        const input = '../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\bar\\main.js.map');
      });

      it('resolves relative to parent multiple directory', () => {
        const base = 'C:\\root\\file';
        const input = '../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\bar\\main.js.map');
      });

      it('normalizes input', () => {
        const base = 'C:\\root\\file';
        const input = './foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\root\\foo\\main.js.map');
      });
    });

    describe('with leading dot relative Windows input', () => {
      it('resolves relative to current directory', () => {
        const base = 'C:\\root\\file';
        const input = '.\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\root\\bar\\main.js.map');
      });

      it('resolves relative to parent directory', () => {
        const base = 'C:\\root\\file';
        const input = '..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\bar\\main.js.map');
      });

      it('resolves relative to parent multiple directory', () => {
        const base = 'C:\\root\\file';
        const input = '..\\..\\..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\bar\\main.js.map');
      });

      it('normalizes input', () => {
        const base = 'C:\\root\\file';
        const input = '.\\foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\root\\foo\\main.js.map');
      });
    });

    describe('with relative input', () => {
      it('resolves relative to current directory', () => {
        const base = 'C:\\root\\file';
        const input = 'bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\root\\bar\\main.js.map');
      });

      it('resolves relative to parent multiple directory, later', () => {
        const base = 'C:\\root\\file';
        const input = 'foo/../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\bar\\main.js.map');
      });

      it('normalizes input', () => {
        const base = 'C:\\root\\file';
        const input = 'foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\root\\foo\\main.js.map');
      });

      it('resolves node_module scope as path', () => {
        const base = 'C:\\root\\file';
        const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\root\\node_modules\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js');
      });

      it('resolves package scope as path', () => {
        const base = 'C:\\root\\file';
        const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\root\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js');
      });
    });

    describe('with relative Windows input', () => {
      it('resolves relative to current directory', () => {
        const base = 'C:\\root\\file';
        const input = 'bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\root\\bar\\main.js.map');
      });

      it('resolves relative to parent multiple directory, later', () => {
        const base = 'C:\\root\\file';
        const input = 'foo\\..\\..\\..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\bar\\main.js.map');
      });

      it('normalizes input', () => {
        const base = 'C:\\root\\file';
        const input = 'foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\root\\foo\\main.js.map');
      });

      it('resolves node_module scope as path', () => {
        const base = 'C:\\root\\file';
        const input = 'node_modules\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\root\\node_modules\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js');
      });

      it('resolves package scope as path', () => {
        const base = 'C:\\root\\file';
        const input = '@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\root\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js');
      });
    });

    describe('empty input', () => {
      it('normalizes base', () => {
        const base = 'C:\\root\\file';
        const input = '';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\root\\file');
      });
    });
  });

  describe(`base = "C:\\root\\dir\\"`, () => {
    describe('with absolute input', () => {
      it('returns input', () => {
        const base = 'C:\\root\\dir\\';
        const input = 'https://absolute.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'C:\\root\\dir\\';
        const input = 'https://absolute.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = 'C:\\root\\dir\\';
        const input = 'https://absolute.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/');
      });

      it('normalizes current directory', () => {
        const base = 'C:\\root\\dir\\';
        const input = 'https://absolute.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'C:\\root\\dir\\';
        const input = 'https://absolute.com/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'C:\\root\\dir\\';
        const input = 'https://absolute.com/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes file protocol 1', () => {
        const base = 'C:\\root\\dir\\';
        const input = 'file:///root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 2', () => {
        const base = 'C:\\root\\dir\\';
        const input = 'file://root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/main.js.map');
      });

      it('normalizes file protocol 2.5', () => {
        const base = 'C:\\root\\dir\\';
        const input = 'file://root';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/');
      });

      it('normalizes file protocol 3', () => {
        const base = 'C:\\root\\dir\\';
        const input = 'file:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 4', () => {
        const base = 'C:\\root\\dir\\';
        const input = 'file:root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes windows file 1', () => {
        const base = 'C:\\root\\dir\\';
        const input = 'file:///C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 2', () => {
        const base = 'C:\\root\\dir\\';
        const input = 'file://C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 3', () => {
        const base = 'C:\\root\\dir\\';
        const input = 'file:/C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 4', () => {
        const base = 'C:\\root\\dir\\';
        const input = 'file:C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });
    });

    describe('with protocol relative input', () => {
      it('resolves relative to the base protocol', () => {
        const base = 'C:\\root\\dir\\';
        const input = '//protocol-relative.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'C:\\root\\dir\\';
        const input = '//protocol-relative.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = 'C:\\root\\dir\\';
        const input = '//protocol-relative.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/');
      });

      it('normalizes current directory', () => {
        const base = 'C:\\root\\dir\\';
        const input = '//protocol-relative.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'C:\\root\\dir\\';
        const input = '//protocol-relative.com/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'C:\\root\\dir\\';
        const input = '//protocol-relative.com/foo/../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });
    });

    describe('with absolute path input', () => {
      it('remains absolute path', () => {
        const base = 'C:\\root\\dir\\';
        const input = '/assets/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\assets\\main.js.map');
      });

      it('trims to root', () => {
        const base = 'C:\\root\\dir\\';
        const input = '/';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\');
      });

      it('normalizes input', () => {
        const base = 'C:\\root\\dir\\';
        const input = '/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\foo\\main.js.map');
      });

      it('normalizes current directory', () => {
        const base = 'C:\\root\\dir\\';
        const input = '/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'C:\\root\\dir\\';
        const input = '/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'C:\\root\\dir\\';
        const input = '/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\main.js.map');
      });
    });

    describe('with absolute Windows path input', () => {
      it('remains absolute path', () => {
        const base = 'C:\\root\\dir\\';
        const input = 'C:\\assets\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\assets\\main.js.map');
      });

      it('trims to root', () => {
        const base = 'C:\\root\\dir\\';
        const input = 'C:\\';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\');
      });

      it('normalizes input', () => {
        const base = 'C:\\root\\dir\\';
        const input = 'C:\\foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\foo\\main.js.map');
      });

      it('normalizes current directory', () => {
        const base = 'C:\\root\\dir\\';
        const input = 'C:\\.\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'C:\\root\\dir\\';
        const input = 'C:\\..\\..\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'C:\\root\\dir\\';
        const input = 'C:\\foo\\..\\..\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\main.js.map');
      });
    });

    describe('with leading dot relative input', () => {
      it('resolves relative to current directory', () => {
        const base = 'C:\\root\\dir\\';
        const input = './bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\root\\dir\\bar\\main.js.map');
      });

      it('resolves relative to parent directory', () => {
        const base = 'C:\\root\\dir\\';
        const input = '../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\root\\bar\\main.js.map');
      });

      it('resolves relative to parent multiple directory', () => {
        const base = 'C:\\root\\dir\\';
        const input = '../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\bar\\main.js.map');
      });

      it('normalizes input', () => {
        const base = 'C:\\root\\dir\\';
        const input = './foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\root\\dir\\foo\\main.js.map');
      });
    });

    describe('with leading dot relative Windows input', () => {
      it('resolves relative to current directory', () => {
        const base = 'C:\\root\\dir\\';
        const input = '.\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\root\\dir\\bar\\main.js.map');
      });

      it('resolves relative to parent directory', () => {
        const base = 'C:\\root\\dir\\';
        const input = '..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\root\\bar\\main.js.map');
      });

      it('resolves relative to parent multiple directory', () => {
        const base = 'C:\\root\\dir\\';
        const input = '..\\..\\..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\bar\\main.js.map');
      });

      it('normalizes input', () => {
        const base = 'C:\\root\\dir\\';
        const input = '.\\foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\root\\dir\\foo\\main.js.map');
      });
    });

    describe('with relative input', () => {
      it('resolves relative to current directory', () => {
        const base = 'C:\\root\\dir\\';
        const input = 'bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\root\\dir\\bar\\main.js.map');
      });

      it('resolves relative to parent multiple directory, later', () => {
        const base = 'C:\\root\\dir\\';
        const input = 'foo/../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\bar\\main.js.map');
      });

      it('normalizes input', () => {
        const base = 'C:\\root\\dir\\';
        const input = 'foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\root\\dir\\foo\\main.js.map');
      });

      it('resolves node_module scope as path', () => {
        const base = 'C:\\root\\dir\\';
        const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\root\\dir\\node_modules\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js');
      });

      it('resolves package scope as path', () => {
        const base = 'C:\\root\\dir\\';
        const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\root\\dir\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js');
      });
    });

    describe('with relative Windows input', () => {
      it('resolves relative to current directory', () => {
        const base = 'C:\\root\\dir\\';
        const input = 'bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\root\\dir\\bar\\main.js.map');
      });

      it('resolves relative to parent multiple directory, later', () => {
        const base = 'C:\\root\\dir\\';
        const input = 'foo\\..\\..\\..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\bar\\main.js.map');
      });

      it('normalizes input', () => {
        const base = 'C:\\root\\dir\\';
        const input = 'foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\root\\dir\\foo\\main.js.map');
      });

      it('resolves node_module scope as path', () => {
        const base = 'C:\\root\\dir\\';
        const input = 'node_modules\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\root\\dir\\node_modules\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js');
      });

      it('resolves package scope as path', () => {
        const base = 'C:\\root\\dir\\';
        const input = '@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\root\\dir\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js');
      });
    });

    describe('empty input', () => {
      it('normalizes base', () => {
        const base = 'C:\\root\\dir\\';
        const input = '';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\root\\dir\\');
      });
    });
  });

  describe(`base = "C:\\.."`, () => {
    describe('with absolute input', () => {
      it('returns input', () => {
        const base = 'C:\\..';
        const input = 'https://absolute.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'C:\\..';
        const input = 'https://absolute.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = 'C:\\..';
        const input = 'https://absolute.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/');
      });

      it('normalizes current directory', () => {
        const base = 'C:\\..';
        const input = 'https://absolute.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'C:\\..';
        const input = 'https://absolute.com/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'C:\\..';
        const input = 'https://absolute.com/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes file protocol 1', () => {
        const base = 'C:\\..';
        const input = 'file:///root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 2', () => {
        const base = 'C:\\..';
        const input = 'file://root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/main.js.map');
      });

      it('normalizes file protocol 2.5', () => {
        const base = 'C:\\..';
        const input = 'file://root';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/');
      });

      it('normalizes file protocol 3', () => {
        const base = 'C:\\..';
        const input = 'file:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 4', () => {
        const base = 'C:\\..';
        const input = 'file:root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes windows file 1', () => {
        const base = 'C:\\..';
        const input = 'file:///C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 2', () => {
        const base = 'C:\\..';
        const input = 'file://C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 3', () => {
        const base = 'C:\\..';
        const input = 'file:/C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 4', () => {
        const base = 'C:\\..';
        const input = 'file:C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });
    });

    describe('with protocol relative input', () => {
      it('resolves relative to the base protocol', () => {
        const base = 'C:\\..';
        const input = '//protocol-relative.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'C:\\..';
        const input = '//protocol-relative.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = 'C:\\..';
        const input = '//protocol-relative.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/');
      });

      it('normalizes current directory', () => {
        const base = 'C:\\..';
        const input = '//protocol-relative.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'C:\\..';
        const input = '//protocol-relative.com/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'C:\\..';
        const input = '//protocol-relative.com/foo/../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });
    });

    describe('with absolute path input', () => {
      it('remains absolute path', () => {
        const base = 'C:\\..';
        const input = '/assets/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\assets\\main.js.map');
      });

      it('trims to root', () => {
        const base = 'C:\\..';
        const input = '/';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\');
      });

      it('normalizes input', () => {
        const base = 'C:\\..';
        const input = '/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\foo\\main.js.map');
      });

      it('normalizes current directory', () => {
        const base = 'C:\\..';
        const input = '/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'C:\\..';
        const input = '/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'C:\\..';
        const input = '/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\main.js.map');
      });
    });

    describe('with absolute Windows path input', () => {
      it('remains absolute path', () => {
        const base = 'C:\\..';
        const input = 'C:\\assets\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\assets\\main.js.map');
      });

      it('trims to root', () => {
        const base = 'C:\\..';
        const input = 'C:\\';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\');
      });

      it('normalizes input', () => {
        const base = 'C:\\..';
        const input = 'C:\\foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\foo\\main.js.map');
      });

      it('normalizes current directory', () => {
        const base = 'C:\\..';
        const input = 'C:\\.\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'C:\\..';
        const input = 'C:\\..\\..\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'C:\\..';
        const input = 'C:\\foo\\..\\..\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\main.js.map');
      });
    });

    describe('with leading dot relative input', () => {
      it('resolves relative to current directory', () => {
        const base = 'C:\\..';
        const input = './bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\bar\\main.js.map');
      });

      it('resolves relative to parent directory', () => {
        const base = 'C:\\..';
        const input = '../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\bar\\main.js.map');
      });

      it('resolves relative to parent multiple directory', () => {
        const base = 'C:\\..';
        const input = '../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\bar\\main.js.map');
      });

      it('normalizes input', () => {
        const base = 'C:\\..';
        const input = './foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\foo\\main.js.map');
      });
    });

    describe('with leading dot relative Windows input', () => {
      it('resolves relative to current directory', () => {
        const base = 'C:\\..';
        const input = '.\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\bar\\main.js.map');
      });

      it('resolves relative to parent directory', () => {
        const base = 'C:\\..';
        const input = '..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\bar\\main.js.map');
      });

      it('resolves relative to parent multiple directory', () => {
        const base = 'C:\\..';
        const input = '..\\..\\..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\bar\\main.js.map');
      });

      it('normalizes input', () => {
        const base = 'C:\\..';
        const input = '.\\foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\foo\\main.js.map');
      });
    });

    describe('with relative input', () => {
      it('resolves relative to current directory', () => {
        const base = 'C:\\..';
        const input = 'bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\bar\\main.js.map');
      });

      it('resolves relative to parent multiple directory, later', () => {
        const base = 'C:\\..';
        const input = 'foo/../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\bar\\main.js.map');
      });

      it('normalizes input', () => {
        const base = 'C:\\..';
        const input = 'foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\foo\\main.js.map');
      });

      it('resolves node_module scope as path', () => {
        const base = 'C:\\..';
        const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\node_modules\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js');
      });

      it('resolves package scope as path', () => {
        const base = 'C:\\..';
        const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js');
      });
    });

    describe('with relative Windows input', () => {
      it('resolves relative to current directory', () => {
        const base = 'C:\\..';
        const input = 'bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\bar\\main.js.map');
      });

      it('resolves relative to parent multiple directory, later', () => {
        const base = 'C:\\..';
        const input = 'foo\\..\\..\\..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\bar\\main.js.map');
      });

      it('normalizes input', () => {
        const base = 'C:\\..';
        const input = 'foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\foo\\main.js.map');
      });

      it('resolves node_module scope as path', () => {
        const base = 'C:\\..';
        const input = 'node_modules\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\node_modules\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js');
      });

      it('resolves package scope as path', () => {
        const base = 'C:\\..';
        const input = '@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js');
      });
    });

    describe('empty input', () => {
      it('normalizes base', () => {
        const base = 'C:\\..';
        const input = '';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\');
      });
    });
  });

  describe(`base = "C:\\..\\"`, () => {
    describe('with absolute input', () => {
      it('returns input', () => {
        const base = 'C:\\..\\';
        const input = 'https://absolute.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'C:\\..\\';
        const input = 'https://absolute.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = 'C:\\..\\';
        const input = 'https://absolute.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/');
      });

      it('normalizes current directory', () => {
        const base = 'C:\\..\\';
        const input = 'https://absolute.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'C:\\..\\';
        const input = 'https://absolute.com/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'C:\\..\\';
        const input = 'https://absolute.com/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes file protocol 1', () => {
        const base = 'C:\\..\\';
        const input = 'file:///root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 2', () => {
        const base = 'C:\\..\\';
        const input = 'file://root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/main.js.map');
      });

      it('normalizes file protocol 2.5', () => {
        const base = 'C:\\..\\';
        const input = 'file://root';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/');
      });

      it('normalizes file protocol 3', () => {
        const base = 'C:\\..\\';
        const input = 'file:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 4', () => {
        const base = 'C:\\..\\';
        const input = 'file:root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes windows file 1', () => {
        const base = 'C:\\..\\';
        const input = 'file:///C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 2', () => {
        const base = 'C:\\..\\';
        const input = 'file://C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 3', () => {
        const base = 'C:\\..\\';
        const input = 'file:/C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 4', () => {
        const base = 'C:\\..\\';
        const input = 'file:C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });
    });

    describe('with protocol relative input', () => {
      it('resolves relative to the base protocol', () => {
        const base = 'C:\\..\\';
        const input = '//protocol-relative.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'C:\\..\\';
        const input = '//protocol-relative.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = 'C:\\..\\';
        const input = '//protocol-relative.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/');
      });

      it('normalizes current directory', () => {
        const base = 'C:\\..\\';
        const input = '//protocol-relative.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'C:\\..\\';
        const input = '//protocol-relative.com/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'C:\\..\\';
        const input = '//protocol-relative.com/foo/../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });
    });

    describe('with absolute path input', () => {
      it('remains absolute path', () => {
        const base = 'C:\\..\\';
        const input = '/assets/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\assets\\main.js.map');
      });

      it('trims to root', () => {
        const base = 'C:\\..\\';
        const input = '/';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\');
      });

      it('normalizes input', () => {
        const base = 'C:\\..\\';
        const input = '/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\foo\\main.js.map');
      });

      it('normalizes current directory', () => {
        const base = 'C:\\..\\';
        const input = '/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'C:\\..\\';
        const input = '/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'C:\\..\\';
        const input = '/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\main.js.map');
      });
    });

    describe('with absolute Windows path input', () => {
      it('remains absolute path', () => {
        const base = 'C:\\..\\';
        const input = 'C:\\assets\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\assets\\main.js.map');
      });

      it('trims to root', () => {
        const base = 'C:\\..\\';
        const input = 'C:\\';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\');
      });

      it('normalizes input', () => {
        const base = 'C:\\..\\';
        const input = 'C:\\foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\foo\\main.js.map');
      });

      it('normalizes current directory', () => {
        const base = 'C:\\..\\';
        const input = 'C:\\.\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'C:\\..\\';
        const input = 'C:\\..\\..\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'C:\\..\\';
        const input = 'C:\\foo\\..\\..\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\main.js.map');
      });
    });

    describe('with leading dot relative input', () => {
      it('resolves relative to current directory', () => {
        const base = 'C:\\..\\';
        const input = './bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\bar\\main.js.map');
      });

      it('resolves relative to parent directory', () => {
        const base = 'C:\\..\\';
        const input = '../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\bar\\main.js.map');
      });

      it('resolves relative to parent multiple directory', () => {
        const base = 'C:\\..\\';
        const input = '../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\bar\\main.js.map');
      });

      it('normalizes input', () => {
        const base = 'C:\\..\\';
        const input = './foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\foo\\main.js.map');
      });
    });

    describe('with leading dot relative Windows input', () => {
      it('resolves relative to current directory', () => {
        const base = 'C:\\..\\';
        const input = '.\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\bar\\main.js.map');
      });

      it('resolves relative to parent directory', () => {
        const base = 'C:\\..\\';
        const input = '..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\bar\\main.js.map');
      });

      it('resolves relative to parent multiple directory', () => {
        const base = 'C:\\..\\';
        const input = '..\\..\\..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\bar\\main.js.map');
      });

      it('normalizes input', () => {
        const base = 'C:\\..\\';
        const input = '.\\foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\foo\\main.js.map');
      });
    });

    describe('with relative input', () => {
      it('resolves relative to current directory', () => {
        const base = 'C:\\..\\';
        const input = 'bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\bar\\main.js.map');
      });

      it('resolves relative to parent multiple directory, later', () => {
        const base = 'C:\\..\\';
        const input = 'foo/../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\bar\\main.js.map');
      });

      it('normalizes input', () => {
        const base = 'C:\\..\\';
        const input = 'foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\foo\\main.js.map');
      });

      it('resolves node_module scope as path', () => {
        const base = 'C:\\..\\';
        const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\node_modules\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js');
      });

      it('resolves package scope as path', () => {
        const base = 'C:\\..\\';
        const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js');
      });
    });

    describe('with relative Windows input', () => {
      it('resolves relative to current directory', () => {
        const base = 'C:\\..\\';
        const input = 'bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\bar\\main.js.map');
      });

      it('resolves relative to parent multiple directory, later', () => {
        const base = 'C:\\..\\';
        const input = 'foo\\..\\..\\..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\bar\\main.js.map');
      });

      it('normalizes input', () => {
        const base = 'C:\\..\\';
        const input = 'foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\foo\\main.js.map');
      });

      it('resolves node_module scope as path', () => {
        const base = 'C:\\..\\';
        const input = 'node_modules\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\node_modules\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js');
      });

      it('resolves package scope as path', () => {
        const base = 'C:\\..\\';
        const input = '@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js');
      });
    });

    describe('empty input', () => {
      it('normalizes base', () => {
        const base = 'C:\\..\\';
        const input = '';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\');
      });
    });
  });

  describe(`base = "C:\\root\\.."`, () => {
    describe('with absolute input', () => {
      it('returns input', () => {
        const base = 'C:\\root\\..';
        const input = 'https://absolute.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'C:\\root\\..';
        const input = 'https://absolute.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = 'C:\\root\\..';
        const input = 'https://absolute.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/');
      });

      it('normalizes current directory', () => {
        const base = 'C:\\root\\..';
        const input = 'https://absolute.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'C:\\root\\..';
        const input = 'https://absolute.com/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'C:\\root\\..';
        const input = 'https://absolute.com/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes file protocol 1', () => {
        const base = 'C:\\root\\..';
        const input = 'file:///root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 2', () => {
        const base = 'C:\\root\\..';
        const input = 'file://root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/main.js.map');
      });

      it('normalizes file protocol 2.5', () => {
        const base = 'C:\\root\\..';
        const input = 'file://root';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/');
      });

      it('normalizes file protocol 3', () => {
        const base = 'C:\\root\\..';
        const input = 'file:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 4', () => {
        const base = 'C:\\root\\..';
        const input = 'file:root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes windows file 1', () => {
        const base = 'C:\\root\\..';
        const input = 'file:///C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 2', () => {
        const base = 'C:\\root\\..';
        const input = 'file://C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 3', () => {
        const base = 'C:\\root\\..';
        const input = 'file:/C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 4', () => {
        const base = 'C:\\root\\..';
        const input = 'file:C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });
    });

    describe('with protocol relative input', () => {
      it('resolves relative to the base protocol', () => {
        const base = 'C:\\root\\..';
        const input = '//protocol-relative.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'C:\\root\\..';
        const input = '//protocol-relative.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = 'C:\\root\\..';
        const input = '//protocol-relative.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/');
      });

      it('normalizes current directory', () => {
        const base = 'C:\\root\\..';
        const input = '//protocol-relative.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'C:\\root\\..';
        const input = '//protocol-relative.com/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'C:\\root\\..';
        const input = '//protocol-relative.com/foo/../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });
    });

    describe('with absolute path input', () => {
      it('remains absolute path', () => {
        const base = 'C:\\root\\..';
        const input = '/assets/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\assets\\main.js.map');
      });

      it('trims to root', () => {
        const base = 'C:\\root\\..';
        const input = '/';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\');
      });

      it('normalizes input', () => {
        const base = 'C:\\root\\..';
        const input = '/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\foo\\main.js.map');
      });

      it('normalizes current directory', () => {
        const base = 'C:\\root\\..';
        const input = '/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'C:\\root\\..';
        const input = '/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'C:\\root\\..';
        const input = '/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\main.js.map');
      });
    });

    describe('with absolute Windows path input', () => {
      it('remains absolute path', () => {
        const base = 'C:\\root\\..';
        const input = 'C:\\assets\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\assets\\main.js.map');
      });

      it('trims to root', () => {
        const base = 'C:\\root\\..';
        const input = 'C:\\';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\');
      });

      it('normalizes input', () => {
        const base = 'C:\\root\\..';
        const input = 'C:\\foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\foo\\main.js.map');
      });

      it('normalizes current directory', () => {
        const base = 'C:\\root\\..';
        const input = 'C:\\.\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'C:\\root\\..';
        const input = 'C:\\..\\..\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'C:\\root\\..';
        const input = 'C:\\foo\\..\\..\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\main.js.map');
      });
    });

    describe('with leading dot relative input', () => {
      it('resolves relative to current directory', () => {
        const base = 'C:\\root\\..';
        const input = './bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\bar\\main.js.map');
      });

      it('resolves relative to parent directory', () => {
        const base = 'C:\\root\\..';
        const input = '../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\bar\\main.js.map');
      });

      it('resolves relative to parent multiple directory', () => {
        const base = 'C:\\root\\..';
        const input = '../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\bar\\main.js.map');
      });

      it('normalizes input', () => {
        const base = 'C:\\root\\..';
        const input = './foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\foo\\main.js.map');
      });
    });

    describe('with leading dot relative Windows input', () => {
      it('resolves relative to current directory', () => {
        const base = 'C:\\root\\..';
        const input = '.\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\bar\\main.js.map');
      });

      it('resolves relative to parent directory', () => {
        const base = 'C:\\root\\..';
        const input = '..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\bar\\main.js.map');
      });

      it('resolves relative to parent multiple directory', () => {
        const base = 'C:\\root\\..';
        const input = '..\\..\\..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\bar\\main.js.map');
      });

      it('normalizes input', () => {
        const base = 'C:\\root\\..';
        const input = '.\\foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\foo\\main.js.map');
      });
    });

    describe('with relative input', () => {
      it('resolves relative to current directory', () => {
        const base = 'C:\\root\\..';
        const input = 'bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\bar\\main.js.map');
      });

      it('resolves relative to parent multiple directory, later', () => {
        const base = 'C:\\root\\..';
        const input = 'foo/../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\bar\\main.js.map');
      });

      it('normalizes input', () => {
        const base = 'C:\\root\\..';
        const input = 'foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\foo\\main.js.map');
      });

      it('resolves node_module scope as path', () => {
        const base = 'C:\\root\\..';
        const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\node_modules\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js');
      });

      it('resolves package scope as path', () => {
        const base = 'C:\\root\\..';
        const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js');
      });
    });

    describe('with relative Windows input', () => {
      it('resolves relative to current directory', () => {
        const base = 'C:\\root\\..';
        const input = 'bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\bar\\main.js.map');
      });

      it('resolves relative to parent multiple directory, later', () => {
        const base = 'C:\\root\\..';
        const input = 'foo\\..\\..\\..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\bar\\main.js.map');
      });

      it('normalizes input', () => {
        const base = 'C:\\root\\..';
        const input = 'foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\foo\\main.js.map');
      });

      it('resolves node_module scope as path', () => {
        const base = 'C:\\root\\..';
        const input = 'node_modules\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\node_modules\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js');
      });

      it('resolves package scope as path', () => {
        const base = 'C:\\root\\..';
        const input = '@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js');
      });
    });

    describe('empty input', () => {
      it('normalizes base', () => {
        const base = 'C:\\root\\..';
        const input = '';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\');
      });
    });
  });

  describe(`base = "C:\\root\\..\\"`, () => {
    describe('with absolute input', () => {
      it('returns input', () => {
        const base = 'C:\\root\\..\\';
        const input = 'https://absolute.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'C:\\root\\..\\';
        const input = 'https://absolute.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = 'C:\\root\\..\\';
        const input = 'https://absolute.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/');
      });

      it('normalizes current directory', () => {
        const base = 'C:\\root\\..\\';
        const input = 'https://absolute.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'C:\\root\\..\\';
        const input = 'https://absolute.com/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'C:\\root\\..\\';
        const input = 'https://absolute.com/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'https://absolute.com/main.js.map');
      });

      it('normalizes file protocol 1', () => {
        const base = 'C:\\root\\..\\';
        const input = 'file:///root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 2', () => {
        const base = 'C:\\root\\..\\';
        const input = 'file://root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/main.js.map');
      });

      it('normalizes file protocol 2.5', () => {
        const base = 'C:\\root\\..\\';
        const input = 'file://root';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file://root/');
      });

      it('normalizes file protocol 3', () => {
        const base = 'C:\\root\\..\\';
        const input = 'file:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes file protocol 4', () => {
        const base = 'C:\\root\\..\\';
        const input = 'file:root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///root/main.js.map');
      });

      it('normalizes windows file 1', () => {
        const base = 'C:\\root\\..\\';
        const input = 'file:///C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 2', () => {
        const base = 'C:\\root\\..\\';
        const input = 'file://C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 3', () => {
        const base = 'C:\\root\\..\\';
        const input = 'file:/C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });

      it('normalizes windows file 4', () => {
        const base = 'C:\\root\\..\\';
        const input = 'file:C:/root/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'file:///C:/root/main.js.map');
      });
    });

    describe('with protocol relative input', () => {
      it('resolves relative to the base protocol', () => {
        const base = 'C:\\root\\..\\';
        const input = '//protocol-relative.com/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });

      it('normalizes input', () => {
        const base = 'C:\\root\\..\\';
        const input = '//protocol-relative.com/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/foo/main.js.map');
      });

      it('normalizes pathless input', () => {
        const base = 'C:\\root\\..\\';
        const input = '//protocol-relative.com';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/');
      });

      it('normalizes current directory', () => {
        const base = 'C:\\root\\..\\';
        const input = '//protocol-relative.com/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'C:\\root\\..\\';
        const input = '//protocol-relative.com/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'C:\\root\\..\\';
        const input = '//protocol-relative.com/foo/../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, '//protocol-relative.com/main.js.map');
      });
    });

    describe('with absolute path input', () => {
      it('remains absolute path', () => {
        const base = 'C:\\root\\..\\';
        const input = '/assets/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\assets\\main.js.map');
      });

      it('trims to root', () => {
        const base = 'C:\\root\\..\\';
        const input = '/';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\');
      });

      it('normalizes input', () => {
        const base = 'C:\\root\\..\\';
        const input = '/foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\foo\\main.js.map');
      });

      it('normalizes current directory', () => {
        const base = 'C:\\root\\..\\';
        const input = '/./main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'C:\\root\\..\\';
        const input = '/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'C:\\root\\..\\';
        const input = '/foo/../../../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\main.js.map');
      });
    });

    describe('with absolute Windows path input', () => {
      it('remains absolute path', () => {
        const base = 'C:\\root\\..\\';
        const input = 'C:\\assets\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\assets\\main.js.map');
      });

      it('trims to root', () => {
        const base = 'C:\\root\\..\\';
        const input = 'C:\\';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\');
      });

      it('normalizes input', () => {
        const base = 'C:\\root\\..\\';
        const input = 'C:\\foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\foo\\main.js.map');
      });

      it('normalizes current directory', () => {
        const base = 'C:\\root\\..\\';
        const input = 'C:\\.\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\main.js.map');
      });

      it('normalizes too many parent accessors', () => {
        const base = 'C:\\root\\..\\';
        const input = 'C:\\..\\..\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\main.js.map');
      });

      it('normalizes too many parent accessors, late', () => {
        const base = 'C:\\root\\..\\';
        const input = 'C:\\foo\\..\\..\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\main.js.map');
      });
    });

    describe('with leading dot relative input', () => {
      it('resolves relative to current directory', () => {
        const base = 'C:\\root\\..\\';
        const input = './bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\bar\\main.js.map');
      });

      it('resolves relative to parent directory', () => {
        const base = 'C:\\root\\..\\';
        const input = '../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\bar\\main.js.map');
      });

      it('resolves relative to parent multiple directory', () => {
        const base = 'C:\\root\\..\\';
        const input = '../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\bar\\main.js.map');
      });

      it('normalizes input', () => {
        const base = 'C:\\root\\..\\';
        const input = './foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\foo\\main.js.map');
      });
    });

    describe('with leading dot relative Windows input', () => {
      it('resolves relative to current directory', () => {
        const base = 'C:\\root\\..\\';
        const input = '.\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\bar\\main.js.map');
      });

      it('resolves relative to parent directory', () => {
        const base = 'C:\\root\\..\\';
        const input = '..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\bar\\main.js.map');
      });

      it('resolves relative to parent multiple directory', () => {
        const base = 'C:\\root\\..\\';
        const input = '..\\..\\..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\bar\\main.js.map');
      });

      it('normalizes input', () => {
        const base = 'C:\\root\\..\\';
        const input = '.\\foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\foo\\main.js.map');
      });
    });

    describe('with relative input', () => {
      it('resolves relative to current directory', () => {
        const base = 'C:\\root\\..\\';
        const input = 'bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\bar\\main.js.map');
      });

      it('resolves relative to parent multiple directory, later', () => {
        const base = 'C:\\root\\..\\';
        const input = 'foo/../../../bar/main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\bar\\main.js.map');
      });

      it('normalizes input', () => {
        const base = 'C:\\root\\..\\';
        const input = 'foo/./bar/../main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\foo\\main.js.map');
      });

      it('resolves node_module scope as path', () => {
        const base = 'C:\\root\\..\\';
        const input = 'node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\node_modules\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js');
      });

      it('resolves package scope as path', () => {
        const base = 'C:\\root\\..\\';
        const input = '@babel/runtime/helpers/esm/arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js');
      });
    });

    describe('with relative Windows input', () => {
      it('resolves relative to current directory', () => {
        const base = 'C:\\root\\..\\';
        const input = 'bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\bar\\main.js.map');
      });

      it('resolves relative to parent multiple directory, later', () => {
        const base = 'C:\\root\\..\\';
        const input = 'foo\\..\\..\\..\\bar\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\bar\\main.js.map');
      });

      it('normalizes input', () => {
        const base = 'C:\\root\\..\\';
        const input = 'foo\\.\\bar\\..\\main.js.map';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\foo\\main.js.map');
      });

      it('resolves node_module scope as path', () => {
        const base = 'C:\\root\\..\\';
        const input = 'node_modules\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\node_modules\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js');
      });

      it('resolves package scope as path', () => {
        const base = 'C:\\root\\..\\';
        const input = '@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\@babel\\runtime\\helpers\\esm\\arrayLikeToArray.js');
      });
    });

    describe('empty input', () => {
      it('normalizes base', () => {
        const base = 'C:\\root\\..\\';
        const input = '';
        const resolved = resolve(input, base);
        assert.strictEqual(resolved, 'C:\\');
      });
    });
  });
});
