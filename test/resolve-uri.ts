import resolve from '../src/resolve-uri';

describe('resolve', () => {
  describe('random string in ".." input', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    test('finds unique string', () => {
      jest.spyOn(Math, 'random').mockImplementation(() => 0.123);
      const base = '';
      const input = 'z123/a/b/../../abc';
      const resolved = resolve(input, base);
      expect(resolved).toBe('z123/abc');
    });

    test('continues to find unique string', () => {
      jest.spyOn(Math, 'random').mockImplementation(() => 0.123);
      const base = '';
      const input = 'z123z123/a/b/../../abc';
      const resolved = resolve(input, base);
      expect(resolved).toBe('z123z123/abc');
    });
  });

  describe('without base', () => {
    describe(`base = ""`, () => {
      describe('with absolute input', () => {
        test('returns input', () => {
          const base = '';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes input', () => {
          const base = '';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = '';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = '';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = '';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        test('resolves relative to the base protocol', () => {
          const base = '';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });

        test('normalizes input', () => {
          const base = '';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = '';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = '';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = '';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        test('remains absolute path', () => {
          const base = '';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/assets/main.js.map');
        });

        test('normalizes input', () => {
          const base = '';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = '';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = '';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = '';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        test('resolves relative to current directory', () => {
          const base = '';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('./bar/main.js.map');
        });

        test('resolves relative to parent directory', () => {
          const base = '';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('../bar/main.js.map');
        });

        test('resolves relative to parent multiple directory', () => {
          const base = '';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('../../../bar/main.js.map');
        });

        test('normalizes input', () => {
          const base = '';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('./foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        test('resolves relative to current directory', () => {
          const base = '';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('bar/main.js.map');
        });

        test('resolves relative to parent multiple directory, later', () => {
          const base = '';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('../../bar/main.js.map');
        });

        test('normalizes input', () => {
          const base = '';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('foo/main.js.map');
        });
      });
    });
  });

  describe('with absolute base', () => {
    describe(`base = "https://foo.com"`, () => {
      describe('with absolute input', () => {
        test('returns input', () => {
          const base = 'https://foo.com';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes input', () => {
          const base = 'https://foo.com';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = 'https://foo.com';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = 'https://foo.com';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = 'https://foo.com';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        test('resolves relative to the base protocol', () => {
          const base = 'https://foo.com';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://protocol-relative.com/main.js.map');
        });

        test('normalizes input', () => {
          const base = 'https://foo.com';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://protocol-relative.com/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = 'https://foo.com';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = 'https://foo.com';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = 'https://foo.com';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        test('remains absolute path', () => {
          const base = 'https://foo.com';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://foo.com/assets/main.js.map');
        });

        test('normalizes input', () => {
          const base = 'https://foo.com';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://foo.com/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = 'https://foo.com';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://foo.com/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = 'https://foo.com';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://foo.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = 'https://foo.com';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://foo.com/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        test('resolves relative to current directory', () => {
          const base = 'https://foo.com';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://foo.com/bar/main.js.map');
        });

        test('resolves relative to parent directory', () => {
          const base = 'https://foo.com';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://foo.com/bar/main.js.map');
        });

        test('resolves relative to parent multiple directory', () => {
          const base = 'https://foo.com';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://foo.com/bar/main.js.map');
        });

        test('normalizes input', () => {
          const base = 'https://foo.com';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://foo.com/foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        test('resolves relative to current directory', () => {
          const base = 'https://foo.com';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://foo.com/bar/main.js.map');
        });

        test('resolves relative to parent multiple directory, later', () => {
          const base = 'https://foo.com';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://foo.com/bar/main.js.map');
        });

        test('normalizes input', () => {
          const base = 'https://foo.com';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://foo.com/foo/main.js.map');
        });
      });
    });

    describe(`base = "https://foo.com/"`, () => {
      describe('with absolute input', () => {
        test('returns input', () => {
          const base = 'https://foo.com/';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes input', () => {
          const base = 'https://foo.com/';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = 'https://foo.com/';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = 'https://foo.com/';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = 'https://foo.com/';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        test('resolves relative to the base protocol', () => {
          const base = 'https://foo.com/';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://protocol-relative.com/main.js.map');
        });

        test('normalizes input', () => {
          const base = 'https://foo.com/';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://protocol-relative.com/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = 'https://foo.com/';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = 'https://foo.com/';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = 'https://foo.com/';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        test('remains absolute path', () => {
          const base = 'https://foo.com/';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://foo.com/assets/main.js.map');
        });

        test('normalizes input', () => {
          const base = 'https://foo.com/';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://foo.com/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = 'https://foo.com/';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://foo.com/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = 'https://foo.com/';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://foo.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = 'https://foo.com/';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://foo.com/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        test('resolves relative to current directory', () => {
          const base = 'https://foo.com/';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://foo.com/bar/main.js.map');
        });

        test('resolves relative to parent directory', () => {
          const base = 'https://foo.com/';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://foo.com/bar/main.js.map');
        });

        test('resolves relative to parent multiple directory', () => {
          const base = 'https://foo.com/';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://foo.com/bar/main.js.map');
        });

        test('normalizes input', () => {
          const base = 'https://foo.com/';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://foo.com/foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        test('resolves relative to current directory', () => {
          const base = 'https://foo.com/';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://foo.com/bar/main.js.map');
        });

        test('resolves relative to parent multiple directory, later', () => {
          const base = 'https://foo.com/';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://foo.com/bar/main.js.map');
        });

        test('normalizes input', () => {
          const base = 'https://foo.com/';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://foo.com/foo/main.js.map');
        });
      });
    });

    describe(`base = "https://foo.com/file"`, () => {
      describe('with absolute input', () => {
        test('returns input', () => {
          const base = 'https://foo.com/file';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes input', () => {
          const base = 'https://foo.com/file';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = 'https://foo.com/file';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = 'https://foo.com/file';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = 'https://foo.com/file';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        test('resolves relative to the base protocol', () => {
          const base = 'https://foo.com/file';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://protocol-relative.com/main.js.map');
        });

        test('normalizes input', () => {
          const base = 'https://foo.com/file';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://protocol-relative.com/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = 'https://foo.com/file';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = 'https://foo.com/file';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = 'https://foo.com/file';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        test('remains absolute path', () => {
          const base = 'https://foo.com/file';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://foo.com/assets/main.js.map');
        });

        test('normalizes input', () => {
          const base = 'https://foo.com/file';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://foo.com/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = 'https://foo.com/file';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://foo.com/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = 'https://foo.com/file';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://foo.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = 'https://foo.com/file';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://foo.com/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        test('resolves relative to current directory', () => {
          const base = 'https://foo.com/file';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://foo.com/bar/main.js.map');
        });

        test('resolves relative to parent directory', () => {
          const base = 'https://foo.com/file';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://foo.com/bar/main.js.map');
        });

        test('resolves relative to parent multiple directory', () => {
          const base = 'https://foo.com/file';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://foo.com/bar/main.js.map');
        });

        test('normalizes input', () => {
          const base = 'https://foo.com/file';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://foo.com/foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        test('resolves relative to current directory', () => {
          const base = 'https://foo.com/file';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://foo.com/bar/main.js.map');
        });

        test('resolves relative to parent multiple directory, later', () => {
          const base = 'https://foo.com/file';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://foo.com/bar/main.js.map');
        });

        test('normalizes input', () => {
          const base = 'https://foo.com/file';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://foo.com/foo/main.js.map');
        });
      });
    });

    describe(`base = "https://foo.com/dir/"`, () => {
      describe('with absolute input', () => {
        test('returns input', () => {
          const base = 'https://foo.com/dir/';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes input', () => {
          const base = 'https://foo.com/dir/';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = 'https://foo.com/dir/';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = 'https://foo.com/dir/';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = 'https://foo.com/dir/';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        test('resolves relative to the base protocol', () => {
          const base = 'https://foo.com/dir/';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://protocol-relative.com/main.js.map');
        });

        test('normalizes input', () => {
          const base = 'https://foo.com/dir/';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://protocol-relative.com/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = 'https://foo.com/dir/';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = 'https://foo.com/dir/';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = 'https://foo.com/dir/';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        test('remains absolute path', () => {
          const base = 'https://foo.com/dir/';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://foo.com/assets/main.js.map');
        });

        test('normalizes input', () => {
          const base = 'https://foo.com/dir/';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://foo.com/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = 'https://foo.com/dir/';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://foo.com/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = 'https://foo.com/dir/';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://foo.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = 'https://foo.com/dir/';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://foo.com/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        test('resolves relative to current directory', () => {
          const base = 'https://foo.com/dir/';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://foo.com/dir/bar/main.js.map');
        });

        test('resolves relative to parent directory', () => {
          const base = 'https://foo.com/dir/';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://foo.com/bar/main.js.map');
        });

        test('resolves relative to parent multiple directory', () => {
          const base = 'https://foo.com/dir/';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://foo.com/bar/main.js.map');
        });

        test('normalizes input', () => {
          const base = 'https://foo.com/dir/';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://foo.com/dir/foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        test('resolves relative to current directory', () => {
          const base = 'https://foo.com/dir/';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://foo.com/dir/bar/main.js.map');
        });

        test('resolves relative to parent multiple directory, later', () => {
          const base = 'https://foo.com/dir/';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://foo.com/bar/main.js.map');
        });

        test('normalizes input', () => {
          const base = 'https://foo.com/dir/';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://foo.com/dir/foo/main.js.map');
        });
      });
    });

    describe(`base = "https://foo.com/dir/file"`, () => {
      describe('with absolute input', () => {
        test('returns input', () => {
          const base = 'https://foo.com/dir/file';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes input', () => {
          const base = 'https://foo.com/dir/file';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = 'https://foo.com/dir/file';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = 'https://foo.com/dir/file';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = 'https://foo.com/dir/file';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        test('resolves relative to the base protocol', () => {
          const base = 'https://foo.com/dir/file';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://protocol-relative.com/main.js.map');
        });

        test('normalizes input', () => {
          const base = 'https://foo.com/dir/file';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://protocol-relative.com/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = 'https://foo.com/dir/file';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = 'https://foo.com/dir/file';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = 'https://foo.com/dir/file';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        test('remains absolute path', () => {
          const base = 'https://foo.com/dir/file';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://foo.com/assets/main.js.map');
        });

        test('normalizes input', () => {
          const base = 'https://foo.com/dir/file';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://foo.com/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = 'https://foo.com/dir/file';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://foo.com/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = 'https://foo.com/dir/file';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://foo.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = 'https://foo.com/dir/file';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://foo.com/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        test('resolves relative to current directory', () => {
          const base = 'https://foo.com/dir/file';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://foo.com/dir/bar/main.js.map');
        });

        test('resolves relative to parent directory', () => {
          const base = 'https://foo.com/dir/file';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://foo.com/bar/main.js.map');
        });

        test('resolves relative to parent multiple directory', () => {
          const base = 'https://foo.com/dir/file';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://foo.com/bar/main.js.map');
        });

        test('normalizes input', () => {
          const base = 'https://foo.com/dir/file';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://foo.com/dir/foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        test('resolves relative to current directory', () => {
          const base = 'https://foo.com/dir/file';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://foo.com/dir/bar/main.js.map');
        });

        test('resolves relative to parent multiple directory, later', () => {
          const base = 'https://foo.com/dir/file';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://foo.com/bar/main.js.map');
        });

        test('normalizes input', () => {
          const base = 'https://foo.com/dir/file';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://foo.com/dir/foo/main.js.map');
        });
      });
    });

    describe(`base = "https://foo.com/.."`, () => {
      describe('with absolute input', () => {
        test('returns input', () => {
          const base = 'https://foo.com/..';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes input', () => {
          const base = 'https://foo.com/..';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = 'https://foo.com/..';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = 'https://foo.com/..';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = 'https://foo.com/..';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        test('resolves relative to the base protocol', () => {
          const base = 'https://foo.com/..';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://protocol-relative.com/main.js.map');
        });

        test('normalizes input', () => {
          const base = 'https://foo.com/..';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://protocol-relative.com/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = 'https://foo.com/..';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = 'https://foo.com/..';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = 'https://foo.com/..';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        test('remains absolute path', () => {
          const base = 'https://foo.com/..';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://foo.com/assets/main.js.map');
        });

        test('normalizes input', () => {
          const base = 'https://foo.com/..';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://foo.com/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = 'https://foo.com/..';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://foo.com/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = 'https://foo.com/..';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://foo.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = 'https://foo.com/..';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://foo.com/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        test('resolves relative to current directory', () => {
          const base = 'https://foo.com/..';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://foo.com/bar/main.js.map');
        });

        test('resolves relative to parent directory', () => {
          const base = 'https://foo.com/..';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://foo.com/bar/main.js.map');
        });

        test('resolves relative to parent multiple directory', () => {
          const base = 'https://foo.com/..';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://foo.com/bar/main.js.map');
        });

        test('normalizes input', () => {
          const base = 'https://foo.com/..';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://foo.com/foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        test('resolves relative to current directory', () => {
          const base = 'https://foo.com/..';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://foo.com/bar/main.js.map');
        });

        test('resolves relative to parent multiple directory, later', () => {
          const base = 'https://foo.com/..';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://foo.com/bar/main.js.map');
        });

        test('normalizes input', () => {
          const base = 'https://foo.com/..';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://foo.com/foo/main.js.map');
        });
      });
    });

    describe(`base = "https://foo.com/../"`, () => {
      describe('with absolute input', () => {
        test('returns input', () => {
          const base = 'https://foo.com/../';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes input', () => {
          const base = 'https://foo.com/../';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = 'https://foo.com/../';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = 'https://foo.com/../';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = 'https://foo.com/../';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        test('resolves relative to the base protocol', () => {
          const base = 'https://foo.com/../';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://protocol-relative.com/main.js.map');
        });

        test('normalizes input', () => {
          const base = 'https://foo.com/../';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://protocol-relative.com/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = 'https://foo.com/../';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = 'https://foo.com/../';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = 'https://foo.com/../';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        test('remains absolute path', () => {
          const base = 'https://foo.com/../';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://foo.com/assets/main.js.map');
        });

        test('normalizes input', () => {
          const base = 'https://foo.com/../';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://foo.com/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = 'https://foo.com/../';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://foo.com/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = 'https://foo.com/../';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://foo.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = 'https://foo.com/../';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://foo.com/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        test('resolves relative to current directory', () => {
          const base = 'https://foo.com/../';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://foo.com/bar/main.js.map');
        });

        test('resolves relative to parent directory', () => {
          const base = 'https://foo.com/../';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://foo.com/bar/main.js.map');
        });

        test('resolves relative to parent multiple directory', () => {
          const base = 'https://foo.com/../';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://foo.com/bar/main.js.map');
        });

        test('normalizes input', () => {
          const base = 'https://foo.com/../';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://foo.com/foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        test('resolves relative to current directory', () => {
          const base = 'https://foo.com/../';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://foo.com/bar/main.js.map');
        });

        test('resolves relative to parent multiple directory, later', () => {
          const base = 'https://foo.com/../';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://foo.com/bar/main.js.map');
        });

        test('normalizes input', () => {
          const base = 'https://foo.com/../';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://foo.com/foo/main.js.map');
        });
      });
    });

    describe(`base = "https://foo.com/dir/.."`, () => {
      describe('with absolute input', () => {
        test('returns input', () => {
          const base = 'https://foo.com/dir/..';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes input', () => {
          const base = 'https://foo.com/dir/..';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = 'https://foo.com/dir/..';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = 'https://foo.com/dir/..';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = 'https://foo.com/dir/..';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        test('resolves relative to the base protocol', () => {
          const base = 'https://foo.com/dir/..';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://protocol-relative.com/main.js.map');
        });

        test('normalizes input', () => {
          const base = 'https://foo.com/dir/..';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://protocol-relative.com/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = 'https://foo.com/dir/..';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = 'https://foo.com/dir/..';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = 'https://foo.com/dir/..';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        test('remains absolute path', () => {
          const base = 'https://foo.com/dir/..';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://foo.com/assets/main.js.map');
        });

        test('normalizes input', () => {
          const base = 'https://foo.com/dir/..';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://foo.com/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = 'https://foo.com/dir/..';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://foo.com/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = 'https://foo.com/dir/..';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://foo.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = 'https://foo.com/dir/..';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://foo.com/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        test('resolves relative to current directory', () => {
          const base = 'https://foo.com/dir/..';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://foo.com/bar/main.js.map');
        });

        test('resolves relative to parent directory', () => {
          const base = 'https://foo.com/dir/..';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://foo.com/bar/main.js.map');
        });

        test('resolves relative to parent multiple directory', () => {
          const base = 'https://foo.com/dir/..';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://foo.com/bar/main.js.map');
        });

        test('normalizes input', () => {
          const base = 'https://foo.com/dir/..';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://foo.com/foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        test('resolves relative to current directory', () => {
          const base = 'https://foo.com/dir/..';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://foo.com/bar/main.js.map');
        });

        test('resolves relative to parent multiple directory, later', () => {
          const base = 'https://foo.com/dir/..';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://foo.com/bar/main.js.map');
        });

        test('normalizes input', () => {
          const base = 'https://foo.com/dir/..';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://foo.com/foo/main.js.map');
        });
      });
    });
  });

  describe('with protocol relative base', () => {
    describe(`base = "//foo.com"`, () => {
      describe('with absolute input', () => {
        test('returns input', () => {
          const base = '//foo.com';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes input', () => {
          const base = '//foo.com';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = '//foo.com';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = '//foo.com';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = '//foo.com';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        test('resolves relative to the base protocol', () => {
          const base = '//foo.com';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });

        test('normalizes input', () => {
          const base = '//foo.com';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = '//foo.com';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = '//foo.com';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = '//foo.com';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        test('remains absolute path', () => {
          const base = '//foo.com';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//foo.com/assets/main.js.map');
        });

        test('normalizes input', () => {
          const base = '//foo.com';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//foo.com/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = '//foo.com';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//foo.com/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = '//foo.com';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//foo.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = '//foo.com';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//foo.com/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        test('resolves relative to current directory', () => {
          const base = '//foo.com';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//foo.com/bar/main.js.map');
        });

        test('resolves relative to parent directory', () => {
          const base = '//foo.com';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//foo.com/bar/main.js.map');
        });

        test('resolves relative to parent multiple directory', () => {
          const base = '//foo.com';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//foo.com/bar/main.js.map');
        });

        test('normalizes input', () => {
          const base = '//foo.com';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//foo.com/foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        test('resolves relative to current directory', () => {
          const base = '//foo.com';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//foo.com/bar/main.js.map');
        });

        test('resolves relative to parent multiple directory, later', () => {
          const base = '//foo.com';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//foo.com/bar/main.js.map');
        });

        test('normalizes input', () => {
          const base = '//foo.com';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//foo.com/foo/main.js.map');
        });
      });
    });

    describe(`base = "//foo.com/"`, () => {
      describe('with absolute input', () => {
        test('returns input', () => {
          const base = '//foo.com/';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes input', () => {
          const base = '//foo.com/';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = '//foo.com/';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = '//foo.com/';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = '//foo.com/';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        test('resolves relative to the base protocol', () => {
          const base = '//foo.com/';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });

        test('normalizes input', () => {
          const base = '//foo.com/';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = '//foo.com/';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = '//foo.com/';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = '//foo.com/';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        test('remains absolute path', () => {
          const base = '//foo.com/';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//foo.com/assets/main.js.map');
        });

        test('normalizes input', () => {
          const base = '//foo.com/';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//foo.com/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = '//foo.com/';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//foo.com/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = '//foo.com/';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//foo.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = '//foo.com/';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//foo.com/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        test('resolves relative to current directory', () => {
          const base = '//foo.com/';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//foo.com/bar/main.js.map');
        });

        test('resolves relative to parent directory', () => {
          const base = '//foo.com/';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//foo.com/bar/main.js.map');
        });

        test('resolves relative to parent multiple directory', () => {
          const base = '//foo.com/';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//foo.com/bar/main.js.map');
        });

        test('normalizes input', () => {
          const base = '//foo.com/';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//foo.com/foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        test('resolves relative to current directory', () => {
          const base = '//foo.com/';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//foo.com/bar/main.js.map');
        });

        test('resolves relative to parent multiple directory, later', () => {
          const base = '//foo.com/';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//foo.com/bar/main.js.map');
        });

        test('normalizes input', () => {
          const base = '//foo.com/';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//foo.com/foo/main.js.map');
        });
      });
    });

    describe(`base = "//foo.com/file"`, () => {
      describe('with absolute input', () => {
        test('returns input', () => {
          const base = '//foo.com/file';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes input', () => {
          const base = '//foo.com/file';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = '//foo.com/file';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = '//foo.com/file';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = '//foo.com/file';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        test('resolves relative to the base protocol', () => {
          const base = '//foo.com/file';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });

        test('normalizes input', () => {
          const base = '//foo.com/file';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = '//foo.com/file';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = '//foo.com/file';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = '//foo.com/file';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        test('remains absolute path', () => {
          const base = '//foo.com/file';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//foo.com/assets/main.js.map');
        });

        test('normalizes input', () => {
          const base = '//foo.com/file';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//foo.com/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = '//foo.com/file';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//foo.com/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = '//foo.com/file';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//foo.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = '//foo.com/file';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//foo.com/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        test('resolves relative to current directory', () => {
          const base = '//foo.com/file';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//foo.com/bar/main.js.map');
        });

        test('resolves relative to parent directory', () => {
          const base = '//foo.com/file';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//foo.com/bar/main.js.map');
        });

        test('resolves relative to parent multiple directory', () => {
          const base = '//foo.com/file';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//foo.com/bar/main.js.map');
        });

        test('normalizes input', () => {
          const base = '//foo.com/file';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//foo.com/foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        test('resolves relative to current directory', () => {
          const base = '//foo.com/file';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//foo.com/bar/main.js.map');
        });

        test('resolves relative to parent multiple directory, later', () => {
          const base = '//foo.com/file';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//foo.com/bar/main.js.map');
        });

        test('normalizes input', () => {
          const base = '//foo.com/file';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//foo.com/foo/main.js.map');
        });
      });
    });

    describe(`base = "//foo.com/dir/"`, () => {
      describe('with absolute input', () => {
        test('returns input', () => {
          const base = '//foo.com/dir/';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes input', () => {
          const base = '//foo.com/dir/';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = '//foo.com/dir/';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = '//foo.com/dir/';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = '//foo.com/dir/';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        test('resolves relative to the base protocol', () => {
          const base = '//foo.com/dir/';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });

        test('normalizes input', () => {
          const base = '//foo.com/dir/';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = '//foo.com/dir/';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = '//foo.com/dir/';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = '//foo.com/dir/';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        test('remains absolute path', () => {
          const base = '//foo.com/dir/';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//foo.com/assets/main.js.map');
        });

        test('normalizes input', () => {
          const base = '//foo.com/dir/';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//foo.com/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = '//foo.com/dir/';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//foo.com/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = '//foo.com/dir/';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//foo.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = '//foo.com/dir/';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//foo.com/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        test('resolves relative to current directory', () => {
          const base = '//foo.com/dir/';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//foo.com/dir/bar/main.js.map');
        });

        test('resolves relative to parent directory', () => {
          const base = '//foo.com/dir/';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//foo.com/bar/main.js.map');
        });

        test('resolves relative to parent multiple directory', () => {
          const base = '//foo.com/dir/';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//foo.com/bar/main.js.map');
        });

        test('normalizes input', () => {
          const base = '//foo.com/dir/';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//foo.com/dir/foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        test('resolves relative to current directory', () => {
          const base = '//foo.com/dir/';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//foo.com/dir/bar/main.js.map');
        });

        test('resolves relative to parent multiple directory, later', () => {
          const base = '//foo.com/dir/';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//foo.com/bar/main.js.map');
        });

        test('normalizes input', () => {
          const base = '//foo.com/dir/';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//foo.com/dir/foo/main.js.map');
        });
      });
    });

    describe(`base = "//foo.com/dir/file"`, () => {
      describe('with absolute input', () => {
        test('returns input', () => {
          const base = '//foo.com/dir/file';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes input', () => {
          const base = '//foo.com/dir/file';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = '//foo.com/dir/file';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = '//foo.com/dir/file';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = '//foo.com/dir/file';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        test('resolves relative to the base protocol', () => {
          const base = '//foo.com/dir/file';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });

        test('normalizes input', () => {
          const base = '//foo.com/dir/file';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = '//foo.com/dir/file';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = '//foo.com/dir/file';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = '//foo.com/dir/file';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        test('remains absolute path', () => {
          const base = '//foo.com/dir/file';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//foo.com/assets/main.js.map');
        });

        test('normalizes input', () => {
          const base = '//foo.com/dir/file';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//foo.com/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = '//foo.com/dir/file';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//foo.com/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = '//foo.com/dir/file';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//foo.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = '//foo.com/dir/file';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//foo.com/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        test('resolves relative to current directory', () => {
          const base = '//foo.com/dir/file';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//foo.com/dir/bar/main.js.map');
        });

        test('resolves relative to parent directory', () => {
          const base = '//foo.com/dir/file';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//foo.com/bar/main.js.map');
        });

        test('resolves relative to parent multiple directory', () => {
          const base = '//foo.com/dir/file';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//foo.com/bar/main.js.map');
        });

        test('normalizes input', () => {
          const base = '//foo.com/dir/file';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//foo.com/dir/foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        test('resolves relative to current directory', () => {
          const base = '//foo.com/dir/file';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//foo.com/dir/bar/main.js.map');
        });

        test('resolves relative to parent multiple directory, later', () => {
          const base = '//foo.com/dir/file';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//foo.com/bar/main.js.map');
        });

        test('normalizes input', () => {
          const base = '//foo.com/dir/file';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//foo.com/dir/foo/main.js.map');
        });
      });
    });

    describe(`base = "//foo.com/.."`, () => {
      describe('with absolute input', () => {
        test('returns input', () => {
          const base = '//foo.com/..';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes input', () => {
          const base = '//foo.com/..';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = '//foo.com/..';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = '//foo.com/..';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = '//foo.com/..';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        test('resolves relative to the base protocol', () => {
          const base = '//foo.com/..';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });

        test('normalizes input', () => {
          const base = '//foo.com/..';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = '//foo.com/..';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = '//foo.com/..';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = '//foo.com/..';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        test('remains absolute path', () => {
          const base = '//foo.com/..';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//foo.com/assets/main.js.map');
        });

        test('normalizes input', () => {
          const base = '//foo.com/..';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//foo.com/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = '//foo.com/..';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//foo.com/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = '//foo.com/..';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//foo.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = '//foo.com/..';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//foo.com/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        test('resolves relative to current directory', () => {
          const base = '//foo.com/..';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//foo.com/bar/main.js.map');
        });

        test('resolves relative to parent directory', () => {
          const base = '//foo.com/..';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//foo.com/bar/main.js.map');
        });

        test('resolves relative to parent multiple directory', () => {
          const base = '//foo.com/..';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//foo.com/bar/main.js.map');
        });

        test('normalizes input', () => {
          const base = '//foo.com/..';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//foo.com/foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        test('resolves relative to current directory', () => {
          const base = '//foo.com/..';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//foo.com/bar/main.js.map');
        });

        test('resolves relative to parent multiple directory, later', () => {
          const base = '//foo.com/..';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//foo.com/bar/main.js.map');
        });

        test('normalizes input', () => {
          const base = '//foo.com/..';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//foo.com/foo/main.js.map');
        });
      });
    });

    describe(`base = "//foo.com/../"`, () => {
      describe('with absolute input', () => {
        test('returns input', () => {
          const base = '//foo.com/../';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes input', () => {
          const base = '//foo.com/../';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = '//foo.com/../';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = '//foo.com/../';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = '//foo.com/../';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        test('resolves relative to the base protocol', () => {
          const base = '//foo.com/../';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });

        test('normalizes input', () => {
          const base = '//foo.com/../';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = '//foo.com/../';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = '//foo.com/../';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = '//foo.com/../';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        test('remains absolute path', () => {
          const base = '//foo.com/../';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//foo.com/assets/main.js.map');
        });

        test('normalizes input', () => {
          const base = '//foo.com/../';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//foo.com/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = '//foo.com/../';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//foo.com/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = '//foo.com/../';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//foo.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = '//foo.com/../';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//foo.com/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        test('resolves relative to current directory', () => {
          const base = '//foo.com/../';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//foo.com/bar/main.js.map');
        });

        test('resolves relative to parent directory', () => {
          const base = '//foo.com/../';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//foo.com/bar/main.js.map');
        });

        test('resolves relative to parent multiple directory', () => {
          const base = '//foo.com/../';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//foo.com/bar/main.js.map');
        });

        test('normalizes input', () => {
          const base = '//foo.com/../';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//foo.com/foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        test('resolves relative to current directory', () => {
          const base = '//foo.com/../';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//foo.com/bar/main.js.map');
        });

        test('resolves relative to parent multiple directory, later', () => {
          const base = '//foo.com/../';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//foo.com/bar/main.js.map');
        });

        test('normalizes input', () => {
          const base = '//foo.com/../';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//foo.com/foo/main.js.map');
        });
      });
    });

    describe(`base = "//foo.com/dir/.."`, () => {
      describe('with absolute input', () => {
        test('returns input', () => {
          const base = '//foo.com/dir/..';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes input', () => {
          const base = '//foo.com/dir/..';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = '//foo.com/dir/..';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = '//foo.com/dir/..';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = '//foo.com/dir/..';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        test('resolves relative to the base protocol', () => {
          const base = '//foo.com/dir/..';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });

        test('normalizes input', () => {
          const base = '//foo.com/dir/..';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = '//foo.com/dir/..';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = '//foo.com/dir/..';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = '//foo.com/dir/..';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        test('remains absolute path', () => {
          const base = '//foo.com/dir/..';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//foo.com/assets/main.js.map');
        });

        test('normalizes input', () => {
          const base = '//foo.com/dir/..';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//foo.com/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = '//foo.com/dir/..';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//foo.com/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = '//foo.com/dir/..';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//foo.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = '//foo.com/dir/..';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//foo.com/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        test('resolves relative to current directory', () => {
          const base = '//foo.com/dir/..';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//foo.com/bar/main.js.map');
        });

        test('resolves relative to parent directory', () => {
          const base = '//foo.com/dir/..';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//foo.com/bar/main.js.map');
        });

        test('resolves relative to parent multiple directory', () => {
          const base = '//foo.com/dir/..';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//foo.com/bar/main.js.map');
        });

        test('normalizes input', () => {
          const base = '//foo.com/dir/..';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//foo.com/foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        test('resolves relative to current directory', () => {
          const base = '//foo.com/dir/..';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//foo.com/bar/main.js.map');
        });

        test('resolves relative to parent multiple directory, later', () => {
          const base = '//foo.com/dir/..';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//foo.com/bar/main.js.map');
        });

        test('normalizes input', () => {
          const base = '//foo.com/dir/..';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//foo.com/foo/main.js.map');
        });
      });
    });
  });

  describe('with path absolute base', () => {
    describe(`base = "/"`, () => {
      describe('with absolute input', () => {
        test('returns input', () => {
          const base = '/';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes input', () => {
          const base = '/';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = '/';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = '/';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = '/';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        test('resolves relative to the base protocol', () => {
          const base = '/';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });

        test('normalizes input', () => {
          const base = '/';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = '/';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = '/';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = '/';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        test('remains absolute path', () => {
          const base = '/';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/assets/main.js.map');
        });

        test('normalizes input', () => {
          const base = '/';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = '/';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = '/';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = '/';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        test('resolves relative to current directory', () => {
          const base = '/';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/bar/main.js.map');
        });

        test('resolves relative to parent directory', () => {
          const base = '/';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/bar/main.js.map');
        });

        test('resolves relative to parent multiple directory', () => {
          const base = '/';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/bar/main.js.map');
        });

        test('normalizes input', () => {
          const base = '/';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        test('resolves relative to current directory', () => {
          const base = '/';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/bar/main.js.map');
        });

        test('resolves relative to parent multiple directory, later', () => {
          const base = '/';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/bar/main.js.map');
        });

        test('normalizes input', () => {
          const base = '/';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/foo/main.js.map');
        });
      });
    });

    describe(`base = "/root"`, () => {
      describe('with absolute input', () => {
        test('returns input', () => {
          const base = '/root';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes input', () => {
          const base = '/root';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = '/root';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = '/root';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = '/root';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        test('resolves relative to the base protocol', () => {
          const base = '/root';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });

        test('normalizes input', () => {
          const base = '/root';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = '/root';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = '/root';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = '/root';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        test('remains absolute path', () => {
          const base = '/root';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/assets/main.js.map');
        });

        test('normalizes input', () => {
          const base = '/root';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = '/root';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = '/root';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = '/root';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        test('resolves relative to current directory', () => {
          const base = '/root';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/bar/main.js.map');
        });

        test('resolves relative to parent directory', () => {
          const base = '/root';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/bar/main.js.map');
        });

        test('resolves relative to parent multiple directory', () => {
          const base = '/root';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/bar/main.js.map');
        });

        test('normalizes input', () => {
          const base = '/root';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        test('resolves relative to current directory', () => {
          const base = '/root';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/bar/main.js.map');
        });

        test('resolves relative to parent multiple directory, later', () => {
          const base = '/root';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/bar/main.js.map');
        });

        test('normalizes input', () => {
          const base = '/root';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/foo/main.js.map');
        });
      });
    });

    describe(`base = "/root/"`, () => {
      describe('with absolute input', () => {
        test('returns input', () => {
          const base = '/root/';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes input', () => {
          const base = '/root/';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = '/root/';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = '/root/';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = '/root/';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        test('resolves relative to the base protocol', () => {
          const base = '/root/';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });

        test('normalizes input', () => {
          const base = '/root/';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = '/root/';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = '/root/';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = '/root/';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        test('remains absolute path', () => {
          const base = '/root/';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/assets/main.js.map');
        });

        test('normalizes input', () => {
          const base = '/root/';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = '/root/';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = '/root/';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = '/root/';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        test('resolves relative to current directory', () => {
          const base = '/root/';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/root/bar/main.js.map');
        });

        test('resolves relative to parent directory', () => {
          const base = '/root/';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/bar/main.js.map');
        });

        test('resolves relative to parent multiple directory', () => {
          const base = '/root/';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/bar/main.js.map');
        });

        test('normalizes input', () => {
          const base = '/root/';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/root/foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        test('resolves relative to current directory', () => {
          const base = '/root/';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/root/bar/main.js.map');
        });

        test('resolves relative to parent multiple directory, later', () => {
          const base = '/root/';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/bar/main.js.map');
        });

        test('normalizes input', () => {
          const base = '/root/';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/root/foo/main.js.map');
        });
      });
    });

    describe(`base = "/root/file"`, () => {
      describe('with absolute input', () => {
        test('returns input', () => {
          const base = '/root/file';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes input', () => {
          const base = '/root/file';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = '/root/file';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = '/root/file';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = '/root/file';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        test('resolves relative to the base protocol', () => {
          const base = '/root/file';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });

        test('normalizes input', () => {
          const base = '/root/file';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = '/root/file';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = '/root/file';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = '/root/file';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        test('remains absolute path', () => {
          const base = '/root/file';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/assets/main.js.map');
        });

        test('normalizes input', () => {
          const base = '/root/file';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = '/root/file';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = '/root/file';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = '/root/file';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        test('resolves relative to current directory', () => {
          const base = '/root/file';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/root/bar/main.js.map');
        });

        test('resolves relative to parent directory', () => {
          const base = '/root/file';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/bar/main.js.map');
        });

        test('resolves relative to parent multiple directory', () => {
          const base = '/root/file';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/bar/main.js.map');
        });

        test('normalizes input', () => {
          const base = '/root/file';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/root/foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        test('resolves relative to current directory', () => {
          const base = '/root/file';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/root/bar/main.js.map');
        });

        test('resolves relative to parent multiple directory, later', () => {
          const base = '/root/file';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/bar/main.js.map');
        });

        test('normalizes input', () => {
          const base = '/root/file';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/root/foo/main.js.map');
        });
      });
    });

    describe(`base = "/root/dir/"`, () => {
      describe('with absolute input', () => {
        test('returns input', () => {
          const base = '/root/dir/';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes input', () => {
          const base = '/root/dir/';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = '/root/dir/';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = '/root/dir/';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = '/root/dir/';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        test('resolves relative to the base protocol', () => {
          const base = '/root/dir/';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });

        test('normalizes input', () => {
          const base = '/root/dir/';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = '/root/dir/';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = '/root/dir/';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = '/root/dir/';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        test('remains absolute path', () => {
          const base = '/root/dir/';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/assets/main.js.map');
        });

        test('normalizes input', () => {
          const base = '/root/dir/';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = '/root/dir/';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = '/root/dir/';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = '/root/dir/';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        test('resolves relative to current directory', () => {
          const base = '/root/dir/';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/root/dir/bar/main.js.map');
        });

        test('resolves relative to parent directory', () => {
          const base = '/root/dir/';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/root/bar/main.js.map');
        });

        test('resolves relative to parent multiple directory', () => {
          const base = '/root/dir/';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/bar/main.js.map');
        });

        test('normalizes input', () => {
          const base = '/root/dir/';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/root/dir/foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        test('resolves relative to current directory', () => {
          const base = '/root/dir/';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/root/dir/bar/main.js.map');
        });

        test('resolves relative to parent multiple directory, later', () => {
          const base = '/root/dir/';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/bar/main.js.map');
        });

        test('normalizes input', () => {
          const base = '/root/dir/';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/root/dir/foo/main.js.map');
        });
      });
    });

    describe(`base = "/.."`, () => {
      describe('with absolute input', () => {
        test('returns input', () => {
          const base = '/..';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes input', () => {
          const base = '/..';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = '/..';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = '/..';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = '/..';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        test('resolves relative to the base protocol', () => {
          const base = '/..';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });

        test('normalizes input', () => {
          const base = '/..';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = '/..';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = '/..';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = '/..';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        test('remains absolute path', () => {
          const base = '/..';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/assets/main.js.map');
        });

        test('normalizes input', () => {
          const base = '/..';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = '/..';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = '/..';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = '/..';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        test('resolves relative to current directory', () => {
          const base = '/..';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/bar/main.js.map');
        });

        test('resolves relative to parent directory', () => {
          const base = '/..';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/bar/main.js.map');
        });

        test('resolves relative to parent multiple directory', () => {
          const base = '/..';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/bar/main.js.map');
        });

        test('normalizes input', () => {
          const base = '/..';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        test('resolves relative to current directory', () => {
          const base = '/..';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/bar/main.js.map');
        });

        test('resolves relative to parent multiple directory, later', () => {
          const base = '/..';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/bar/main.js.map');
        });

        test('normalizes input', () => {
          const base = '/..';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/foo/main.js.map');
        });
      });
    });

    describe(`base = "/../"`, () => {
      describe('with absolute input', () => {
        test('returns input', () => {
          const base = '/../';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes input', () => {
          const base = '/../';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = '/../';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = '/../';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = '/../';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        test('resolves relative to the base protocol', () => {
          const base = '/../';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });

        test('normalizes input', () => {
          const base = '/../';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = '/../';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = '/../';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = '/../';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        test('remains absolute path', () => {
          const base = '/../';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/assets/main.js.map');
        });

        test('normalizes input', () => {
          const base = '/../';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = '/../';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = '/../';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = '/../';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        test('resolves relative to current directory', () => {
          const base = '/../';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/bar/main.js.map');
        });

        test('resolves relative to parent directory', () => {
          const base = '/../';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/bar/main.js.map');
        });

        test('resolves relative to parent multiple directory', () => {
          const base = '/../';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/bar/main.js.map');
        });

        test('normalizes input', () => {
          const base = '/../';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        test('resolves relative to current directory', () => {
          const base = '/../';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/bar/main.js.map');
        });

        test('resolves relative to parent multiple directory, later', () => {
          const base = '/../';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/bar/main.js.map');
        });

        test('normalizes input', () => {
          const base = '/../';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/foo/main.js.map');
        });
      });
    });

    describe(`base = "/root/.."`, () => {
      describe('with absolute input', () => {
        test('returns input', () => {
          const base = '/root/..';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes input', () => {
          const base = '/root/..';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = '/root/..';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = '/root/..';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = '/root/..';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        test('resolves relative to the base protocol', () => {
          const base = '/root/..';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });

        test('normalizes input', () => {
          const base = '/root/..';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = '/root/..';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = '/root/..';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = '/root/..';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        test('remains absolute path', () => {
          const base = '/root/..';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/assets/main.js.map');
        });

        test('normalizes input', () => {
          const base = '/root/..';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = '/root/..';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = '/root/..';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = '/root/..';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        test('resolves relative to current directory', () => {
          const base = '/root/..';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/bar/main.js.map');
        });

        test('resolves relative to parent directory', () => {
          const base = '/root/..';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/bar/main.js.map');
        });

        test('resolves relative to parent multiple directory', () => {
          const base = '/root/..';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/bar/main.js.map');
        });

        test('normalizes input', () => {
          const base = '/root/..';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        test('resolves relative to current directory', () => {
          const base = '/root/..';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/bar/main.js.map');
        });

        test('resolves relative to parent multiple directory, later', () => {
          const base = '/root/..';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/bar/main.js.map');
        });

        test('normalizes input', () => {
          const base = '/root/..';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/foo/main.js.map');
        });
      });
    });

    describe(`base = "/root/../"`, () => {
      describe('with absolute input', () => {
        test('returns input', () => {
          const base = '/root/../';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes input', () => {
          const base = '/root/../';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = '/root/../';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = '/root/../';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = '/root/../';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        test('resolves relative to the base protocol', () => {
          const base = '/root/../';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });

        test('normalizes input', () => {
          const base = '/root/../';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = '/root/../';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = '/root/../';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = '/root/../';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        test('remains absolute path', () => {
          const base = '/root/../';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/assets/main.js.map');
        });

        test('normalizes input', () => {
          const base = '/root/../';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = '/root/../';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = '/root/../';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = '/root/../';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        test('resolves relative to current directory', () => {
          const base = '/root/../';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/bar/main.js.map');
        });

        test('resolves relative to parent directory', () => {
          const base = '/root/../';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/bar/main.js.map');
        });

        test('resolves relative to parent multiple directory', () => {
          const base = '/root/../';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/bar/main.js.map');
        });

        test('normalizes input', () => {
          const base = '/root/../';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        test('resolves relative to current directory', () => {
          const base = '/root/../';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/bar/main.js.map');
        });

        test('resolves relative to parent multiple directory, later', () => {
          const base = '/root/../';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/bar/main.js.map');
        });

        test('normalizes input', () => {
          const base = '/root/../';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/foo/main.js.map');
        });
      });
    });
  });

  describe('with relative base', () => {
    describe(`base = "file"`, () => {
      describe('with absolute input', () => {
        test('returns input', () => {
          const base = 'file';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes input', () => {
          const base = 'file';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = 'file';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = 'file';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = 'file';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        test('resolves relative to the base protocol', () => {
          const base = 'file';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });

        test('normalizes input', () => {
          const base = 'file';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = 'file';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = 'file';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = 'file';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        test('remains absolute path', () => {
          const base = 'file';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/assets/main.js.map');
        });

        test('normalizes input', () => {
          const base = 'file';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = 'file';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = 'file';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = 'file';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        test('resolves relative to current directory', () => {
          const base = 'file';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('bar/main.js.map');
        });

        test('resolves relative to parent directory', () => {
          const base = 'file';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('../bar/main.js.map');
        });

        test('resolves relative to parent multiple directory', () => {
          const base = 'file';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('../../../bar/main.js.map');
        });

        test('normalizes input', () => {
          const base = 'file';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        test('resolves relative to current directory', () => {
          const base = 'file';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('bar/main.js.map');
        });

        test('resolves relative to parent multiple directory, later', () => {
          const base = 'file';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('../../bar/main.js.map');
        });

        test('normalizes input', () => {
          const base = 'file';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('foo/main.js.map');
        });
      });
    });

    describe(`base = "dir/"`, () => {
      describe('with absolute input', () => {
        test('returns input', () => {
          const base = 'dir/';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes input', () => {
          const base = 'dir/';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = 'dir/';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = 'dir/';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = 'dir/';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        test('resolves relative to the base protocol', () => {
          const base = 'dir/';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });

        test('normalizes input', () => {
          const base = 'dir/';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = 'dir/';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = 'dir/';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = 'dir/';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        test('remains absolute path', () => {
          const base = 'dir/';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/assets/main.js.map');
        });

        test('normalizes input', () => {
          const base = 'dir/';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = 'dir/';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = 'dir/';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = 'dir/';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        test('resolves relative to current directory', () => {
          const base = 'dir/';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('dir/bar/main.js.map');
        });

        test('resolves relative to parent directory', () => {
          const base = 'dir/';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('bar/main.js.map');
        });

        test('resolves relative to parent multiple directory', () => {
          const base = 'dir/';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('../../bar/main.js.map');
        });

        test('normalizes input', () => {
          const base = 'dir/';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('dir/foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        test('resolves relative to current directory', () => {
          const base = 'dir/';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('dir/bar/main.js.map');
        });

        test('resolves relative to parent multiple directory, later', () => {
          const base = 'dir/';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('../bar/main.js.map');
        });

        test('normalizes input', () => {
          const base = 'dir/';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('dir/foo/main.js.map');
        });
      });
    });

    describe(`base = "dir/file"`, () => {
      describe('with absolute input', () => {
        test('returns input', () => {
          const base = 'dir/file';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes input', () => {
          const base = 'dir/file';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = 'dir/file';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = 'dir/file';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = 'dir/file';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        test('resolves relative to the base protocol', () => {
          const base = 'dir/file';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });

        test('normalizes input', () => {
          const base = 'dir/file';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = 'dir/file';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = 'dir/file';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = 'dir/file';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        test('remains absolute path', () => {
          const base = 'dir/file';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/assets/main.js.map');
        });

        test('normalizes input', () => {
          const base = 'dir/file';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = 'dir/file';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = 'dir/file';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = 'dir/file';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        test('resolves relative to current directory', () => {
          const base = 'dir/file';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('dir/bar/main.js.map');
        });

        test('resolves relative to parent directory', () => {
          const base = 'dir/file';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('bar/main.js.map');
        });

        test('resolves relative to parent multiple directory', () => {
          const base = 'dir/file';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('../../bar/main.js.map');
        });

        test('normalizes input', () => {
          const base = 'dir/file';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('dir/foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        test('resolves relative to current directory', () => {
          const base = 'dir/file';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('dir/bar/main.js.map');
        });

        test('resolves relative to parent multiple directory, later', () => {
          const base = 'dir/file';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('../bar/main.js.map');
        });

        test('normalizes input', () => {
          const base = 'dir/file';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('dir/foo/main.js.map');
        });
      });
    });

    describe(`base = "deep/dir/"`, () => {
      describe('with absolute input', () => {
        test('returns input', () => {
          const base = 'deep/dir/';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes input', () => {
          const base = 'deep/dir/';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = 'deep/dir/';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = 'deep/dir/';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = 'deep/dir/';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        test('resolves relative to the base protocol', () => {
          const base = 'deep/dir/';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });

        test('normalizes input', () => {
          const base = 'deep/dir/';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = 'deep/dir/';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = 'deep/dir/';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = 'deep/dir/';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        test('remains absolute path', () => {
          const base = 'deep/dir/';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/assets/main.js.map');
        });

        test('normalizes input', () => {
          const base = 'deep/dir/';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = 'deep/dir/';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = 'deep/dir/';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = 'deep/dir/';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        test('resolves relative to current directory', () => {
          const base = 'deep/dir/';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('deep/dir/bar/main.js.map');
        });

        test('resolves relative to parent directory', () => {
          const base = 'deep/dir/';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('deep/bar/main.js.map');
        });

        test('resolves relative to parent multiple directory', () => {
          const base = 'deep/dir/';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('../bar/main.js.map');
        });

        test('normalizes input', () => {
          const base = 'deep/dir/';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('deep/dir/foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        test('resolves relative to current directory', () => {
          const base = 'deep/dir/';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('deep/dir/bar/main.js.map');
        });

        test('resolves relative to parent multiple directory, later', () => {
          const base = 'deep/dir/';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('bar/main.js.map');
        });

        test('normalizes input', () => {
          const base = 'deep/dir/';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('deep/dir/foo/main.js.map');
        });
      });
    });

    describe(`base = "./file"`, () => {
      describe('with absolute input', () => {
        test('returns input', () => {
          const base = './file';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes input', () => {
          const base = './file';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = './file';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = './file';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = './file';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        test('resolves relative to the base protocol', () => {
          const base = './file';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });

        test('normalizes input', () => {
          const base = './file';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = './file';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = './file';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = './file';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        test('remains absolute path', () => {
          const base = './file';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/assets/main.js.map');
        });

        test('normalizes input', () => {
          const base = './file';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = './file';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = './file';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = './file';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        test('resolves relative to current directory', () => {
          const base = './file';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('./bar/main.js.map');
        });

        test('resolves relative to parent directory', () => {
          const base = './file';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('../bar/main.js.map');
        });

        test('resolves relative to parent multiple directory', () => {
          const base = './file';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('../../../bar/main.js.map');
        });

        test('normalizes input', () => {
          const base = './file';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('./foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        test('resolves relative to current directory', () => {
          const base = './file';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('./bar/main.js.map');
        });

        test('resolves relative to parent multiple directory, later', () => {
          const base = './file';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('../../bar/main.js.map');
        });

        test('normalizes input', () => {
          const base = './file';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('./foo/main.js.map');
        });
      });
    });

    describe(`base = "./dir/"`, () => {
      describe('with absolute input', () => {
        test('returns input', () => {
          const base = './dir/';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes input', () => {
          const base = './dir/';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = './dir/';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = './dir/';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = './dir/';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        test('resolves relative to the base protocol', () => {
          const base = './dir/';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });

        test('normalizes input', () => {
          const base = './dir/';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = './dir/';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = './dir/';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = './dir/';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        test('remains absolute path', () => {
          const base = './dir/';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/assets/main.js.map');
        });

        test('normalizes input', () => {
          const base = './dir/';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = './dir/';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = './dir/';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = './dir/';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        test('resolves relative to current directory', () => {
          const base = './dir/';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('./dir/bar/main.js.map');
        });

        test('resolves relative to parent directory', () => {
          const base = './dir/';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('./bar/main.js.map');
        });

        test('resolves relative to parent multiple directory', () => {
          const base = './dir/';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('../../bar/main.js.map');
        });

        test('normalizes input', () => {
          const base = './dir/';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('./dir/foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        test('resolves relative to current directory', () => {
          const base = './dir/';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('./dir/bar/main.js.map');
        });

        test('resolves relative to parent multiple directory, later', () => {
          const base = './dir/';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('../bar/main.js.map');
        });

        test('normalizes input', () => {
          const base = './dir/';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('./dir/foo/main.js.map');
        });
      });
    });

    describe(`base = "./deep/file"`, () => {
      describe('with absolute input', () => {
        test('returns input', () => {
          const base = './deep/file';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes input', () => {
          const base = './deep/file';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = './deep/file';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = './deep/file';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = './deep/file';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        test('resolves relative to the base protocol', () => {
          const base = './deep/file';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });

        test('normalizes input', () => {
          const base = './deep/file';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = './deep/file';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = './deep/file';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = './deep/file';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        test('remains absolute path', () => {
          const base = './deep/file';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/assets/main.js.map');
        });

        test('normalizes input', () => {
          const base = './deep/file';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = './deep/file';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = './deep/file';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = './deep/file';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        test('resolves relative to current directory', () => {
          const base = './deep/file';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('./deep/bar/main.js.map');
        });

        test('resolves relative to parent directory', () => {
          const base = './deep/file';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('./bar/main.js.map');
        });

        test('resolves relative to parent multiple directory', () => {
          const base = './deep/file';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('../../bar/main.js.map');
        });

        test('normalizes input', () => {
          const base = './deep/file';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('./deep/foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        test('resolves relative to current directory', () => {
          const base = './deep/file';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('./deep/bar/main.js.map');
        });

        test('resolves relative to parent multiple directory, later', () => {
          const base = './deep/file';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('../bar/main.js.map');
        });

        test('normalizes input', () => {
          const base = './deep/file';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('./deep/foo/main.js.map');
        });
      });
    });

    describe(`base = "./deep/dir/"`, () => {
      describe('with absolute input', () => {
        test('returns input', () => {
          const base = './deep/dir/';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes input', () => {
          const base = './deep/dir/';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = './deep/dir/';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = './deep/dir/';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = './deep/dir/';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        test('resolves relative to the base protocol', () => {
          const base = './deep/dir/';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });

        test('normalizes input', () => {
          const base = './deep/dir/';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = './deep/dir/';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = './deep/dir/';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = './deep/dir/';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        test('remains absolute path', () => {
          const base = './deep/dir/';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/assets/main.js.map');
        });

        test('normalizes input', () => {
          const base = './deep/dir/';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = './deep/dir/';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = './deep/dir/';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = './deep/dir/';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        test('resolves relative to current directory', () => {
          const base = './deep/dir/';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('./deep/dir/bar/main.js.map');
        });

        test('resolves relative to parent directory', () => {
          const base = './deep/dir/';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('./deep/bar/main.js.map');
        });

        test('resolves relative to parent multiple directory', () => {
          const base = './deep/dir/';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('../bar/main.js.map');
        });

        test('normalizes input', () => {
          const base = './deep/dir/';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('./deep/dir/foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        test('resolves relative to current directory', () => {
          const base = './deep/dir/';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('./deep/dir/bar/main.js.map');
        });

        test('resolves relative to parent multiple directory, later', () => {
          const base = './deep/dir/';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('./bar/main.js.map');
        });

        test('normalizes input', () => {
          const base = './deep/dir/';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('./deep/dir/foo/main.js.map');
        });
      });
    });

    describe(`base = "../file"`, () => {
      describe('with absolute input', () => {
        test('returns input', () => {
          const base = '../file';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes input', () => {
          const base = '../file';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = '../file';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = '../file';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = '../file';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        test('resolves relative to the base protocol', () => {
          const base = '../file';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });

        test('normalizes input', () => {
          const base = '../file';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = '../file';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = '../file';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = '../file';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        test('remains absolute path', () => {
          const base = '../file';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/assets/main.js.map');
        });

        test('normalizes input', () => {
          const base = '../file';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = '../file';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = '../file';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = '../file';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        test('resolves relative to current directory', () => {
          const base = '../file';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('../bar/main.js.map');
        });

        test('resolves relative to parent directory', () => {
          const base = '../file';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('../../bar/main.js.map');
        });

        test('resolves relative to parent multiple directory', () => {
          const base = '../file';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('../../../../bar/main.js.map');
        });

        test('normalizes input', () => {
          const base = '../file';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('../foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        test('resolves relative to current directory', () => {
          const base = '../file';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('../bar/main.js.map');
        });

        test('resolves relative to parent multiple directory, later', () => {
          const base = '../file';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('../../../bar/main.js.map');
        });

        test('normalizes input', () => {
          const base = '../file';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('../foo/main.js.map');
        });
      });
    });

    describe(`base = "../dir/"`, () => {
      describe('with absolute input', () => {
        test('returns input', () => {
          const base = '../dir/';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes input', () => {
          const base = '../dir/';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = '../dir/';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = '../dir/';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = '../dir/';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        test('resolves relative to the base protocol', () => {
          const base = '../dir/';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });

        test('normalizes input', () => {
          const base = '../dir/';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = '../dir/';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = '../dir/';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = '../dir/';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        test('remains absolute path', () => {
          const base = '../dir/';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/assets/main.js.map');
        });

        test('normalizes input', () => {
          const base = '../dir/';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = '../dir/';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = '../dir/';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = '../dir/';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        test('resolves relative to current directory', () => {
          const base = '../dir/';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('../dir/bar/main.js.map');
        });

        test('resolves relative to parent directory', () => {
          const base = '../dir/';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('../bar/main.js.map');
        });

        test('resolves relative to parent multiple directory', () => {
          const base = '../dir/';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('../../../bar/main.js.map');
        });

        test('normalizes input', () => {
          const base = '../dir/';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('../dir/foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        test('resolves relative to current directory', () => {
          const base = '../dir/';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('../dir/bar/main.js.map');
        });

        test('resolves relative to parent multiple directory, later', () => {
          const base = '../dir/';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('../../bar/main.js.map');
        });

        test('normalizes input', () => {
          const base = '../dir/';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('../dir/foo/main.js.map');
        });
      });
    });

    describe(`base = "../deep/file"`, () => {
      describe('with absolute input', () => {
        test('returns input', () => {
          const base = '../deep/file';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes input', () => {
          const base = '../deep/file';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = '../deep/file';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = '../deep/file';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = '../deep/file';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        test('resolves relative to the base protocol', () => {
          const base = '../deep/file';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });

        test('normalizes input', () => {
          const base = '../deep/file';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = '../deep/file';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = '../deep/file';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = '../deep/file';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        test('remains absolute path', () => {
          const base = '../deep/file';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/assets/main.js.map');
        });

        test('normalizes input', () => {
          const base = '../deep/file';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = '../deep/file';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = '../deep/file';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = '../deep/file';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        test('resolves relative to current directory', () => {
          const base = '../deep/file';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('../deep/bar/main.js.map');
        });

        test('resolves relative to parent directory', () => {
          const base = '../deep/file';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('../bar/main.js.map');
        });

        test('resolves relative to parent multiple directory', () => {
          const base = '../deep/file';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('../../../bar/main.js.map');
        });

        test('normalizes input', () => {
          const base = '../deep/file';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('../deep/foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        test('resolves relative to current directory', () => {
          const base = '../deep/file';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('../deep/bar/main.js.map');
        });

        test('resolves relative to parent multiple directory, later', () => {
          const base = '../deep/file';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('../../bar/main.js.map');
        });

        test('normalizes input', () => {
          const base = '../deep/file';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('../deep/foo/main.js.map');
        });
      });
    });

    describe(`base = "../deep/dir/"`, () => {
      describe('with absolute input', () => {
        test('returns input', () => {
          const base = '../deep/dir/';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes input', () => {
          const base = '../deep/dir/';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = '../deep/dir/';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = '../deep/dir/';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = '../deep/dir/';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        test('resolves relative to the base protocol', () => {
          const base = '../deep/dir/';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });

        test('normalizes input', () => {
          const base = '../deep/dir/';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = '../deep/dir/';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = '../deep/dir/';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = '../deep/dir/';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        test('remains absolute path', () => {
          const base = '../deep/dir/';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/assets/main.js.map');
        });

        test('normalizes input', () => {
          const base = '../deep/dir/';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = '../deep/dir/';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = '../deep/dir/';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = '../deep/dir/';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        test('resolves relative to current directory', () => {
          const base = '../deep/dir/';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('../deep/dir/bar/main.js.map');
        });

        test('resolves relative to parent directory', () => {
          const base = '../deep/dir/';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('../deep/bar/main.js.map');
        });

        test('resolves relative to parent multiple directory', () => {
          const base = '../deep/dir/';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('../../bar/main.js.map');
        });

        test('normalizes input', () => {
          const base = '../deep/dir/';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('../deep/dir/foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        test('resolves relative to current directory', () => {
          const base = '../deep/dir/';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('../deep/dir/bar/main.js.map');
        });

        test('resolves relative to parent multiple directory, later', () => {
          const base = '../deep/dir/';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('../bar/main.js.map');
        });

        test('normalizes input', () => {
          const base = '../deep/dir/';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('../deep/dir/foo/main.js.map');
        });
      });
    });

    describe(`base = ".."`, () => {
      describe('with absolute input', () => {
        test('returns input', () => {
          const base = '..';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes input', () => {
          const base = '..';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = '..';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = '..';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = '..';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        test('resolves relative to the base protocol', () => {
          const base = '..';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });

        test('normalizes input', () => {
          const base = '..';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = '..';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = '..';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = '..';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        test('remains absolute path', () => {
          const base = '..';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/assets/main.js.map');
        });

        test('normalizes input', () => {
          const base = '..';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = '..';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = '..';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = '..';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        test('resolves relative to current directory', () => {
          const base = '..';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('../bar/main.js.map');
        });

        test('resolves relative to parent directory', () => {
          const base = '..';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('../../bar/main.js.map');
        });

        test('resolves relative to parent multiple directory', () => {
          const base = '..';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('../../../../bar/main.js.map');
        });

        test('normalizes input', () => {
          const base = '..';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('../foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        test('resolves relative to current directory', () => {
          const base = '..';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('../bar/main.js.map');
        });

        test('resolves relative to parent multiple directory, later', () => {
          const base = '..';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('../../../bar/main.js.map');
        });

        test('normalizes input', () => {
          const base = '..';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('../foo/main.js.map');
        });
      });
    });

    describe(`base = "../"`, () => {
      describe('with absolute input', () => {
        test('returns input', () => {
          const base = '../';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes input', () => {
          const base = '../';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = '../';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = '../';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = '../';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        test('resolves relative to the base protocol', () => {
          const base = '../';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });

        test('normalizes input', () => {
          const base = '../';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = '../';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = '../';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = '../';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        test('remains absolute path', () => {
          const base = '../';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/assets/main.js.map');
        });

        test('normalizes input', () => {
          const base = '../';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = '../';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = '../';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = '../';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        test('resolves relative to current directory', () => {
          const base = '../';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('../bar/main.js.map');
        });

        test('resolves relative to parent directory', () => {
          const base = '../';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('../../bar/main.js.map');
        });

        test('resolves relative to parent multiple directory', () => {
          const base = '../';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('../../../../bar/main.js.map');
        });

        test('normalizes input', () => {
          const base = '../';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('../foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        test('resolves relative to current directory', () => {
          const base = '../';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('../bar/main.js.map');
        });

        test('resolves relative to parent multiple directory, later', () => {
          const base = '../';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('../../../bar/main.js.map');
        });

        test('normalizes input', () => {
          const base = '../';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('../foo/main.js.map');
        });
      });
    });

    describe(`base = "dir/.."`, () => {
      describe('with absolute input', () => {
        test('returns input', () => {
          const base = 'dir/..';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes input', () => {
          const base = 'dir/..';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = 'dir/..';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = 'dir/..';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = 'dir/..';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        test('resolves relative to the base protocol', () => {
          const base = 'dir/..';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });

        test('normalizes input', () => {
          const base = 'dir/..';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = 'dir/..';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = 'dir/..';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = 'dir/..';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        test('remains absolute path', () => {
          const base = 'dir/..';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/assets/main.js.map');
        });

        test('normalizes input', () => {
          const base = 'dir/..';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = 'dir/..';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = 'dir/..';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = 'dir/..';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        test('resolves relative to current directory', () => {
          const base = 'dir/..';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('bar/main.js.map');
        });

        test('resolves relative to parent directory', () => {
          const base = 'dir/..';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('../bar/main.js.map');
        });

        test('resolves relative to parent multiple directory', () => {
          const base = 'dir/..';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('../../../bar/main.js.map');
        });

        test('normalizes input', () => {
          const base = 'dir/..';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        test('resolves relative to current directory', () => {
          const base = 'dir/..';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('bar/main.js.map');
        });

        test('resolves relative to parent multiple directory, later', () => {
          const base = 'dir/..';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('../../bar/main.js.map');
        });

        test('normalizes input', () => {
          const base = 'dir/..';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('foo/main.js.map');
        });
      });
    });

    describe(`base = "deep/../"`, () => {
      describe('with absolute input', () => {
        test('returns input', () => {
          const base = 'deep/../';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes input', () => {
          const base = 'deep/../';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = 'deep/../';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = 'deep/../';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = 'deep/../';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        test('resolves relative to the base protocol', () => {
          const base = 'deep/../';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });

        test('normalizes input', () => {
          const base = 'deep/../';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = 'deep/../';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = 'deep/../';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = 'deep/../';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        test('remains absolute path', () => {
          const base = 'deep/../';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/assets/main.js.map');
        });

        test('normalizes input', () => {
          const base = 'deep/../';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = 'deep/../';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = 'deep/../';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = 'deep/../';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        test('resolves relative to current directory', () => {
          const base = 'deep/../';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('bar/main.js.map');
        });

        test('resolves relative to parent directory', () => {
          const base = 'deep/../';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('../bar/main.js.map');
        });

        test('resolves relative to parent multiple directory', () => {
          const base = 'deep/../';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('../../../bar/main.js.map');
        });

        test('normalizes input', () => {
          const base = 'deep/../';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        test('resolves relative to current directory', () => {
          const base = 'deep/../';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('bar/main.js.map');
        });

        test('resolves relative to parent multiple directory, later', () => {
          const base = 'deep/../';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('../../bar/main.js.map');
        });

        test('normalizes input', () => {
          const base = 'deep/../';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('foo/main.js.map');
        });
      });
    });

    describe(`base = "./.."`, () => {
      describe('with absolute input', () => {
        test('returns input', () => {
          const base = './..';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes input', () => {
          const base = './..';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = './..';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = './..';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = './..';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        test('resolves relative to the base protocol', () => {
          const base = './..';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });

        test('normalizes input', () => {
          const base = './..';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = './..';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = './..';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = './..';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        test('remains absolute path', () => {
          const base = './..';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/assets/main.js.map');
        });

        test('normalizes input', () => {
          const base = './..';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = './..';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = './..';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = './..';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        test('resolves relative to current directory', () => {
          const base = './..';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('../bar/main.js.map');
        });

        test('resolves relative to parent directory', () => {
          const base = './..';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('../../bar/main.js.map');
        });

        test('resolves relative to parent multiple directory', () => {
          const base = './..';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('../../../../bar/main.js.map');
        });

        test('normalizes input', () => {
          const base = './..';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('../foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        test('resolves relative to current directory', () => {
          const base = './..';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('../bar/main.js.map');
        });

        test('resolves relative to parent multiple directory, later', () => {
          const base = './..';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('../../../bar/main.js.map');
        });

        test('normalizes input', () => {
          const base = './..';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('../foo/main.js.map');
        });
      });
    });

    describe(`base = "./../"`, () => {
      describe('with absolute input', () => {
        test('returns input', () => {
          const base = './../';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes input', () => {
          const base = './../';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = './../';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = './../';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = './../';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        test('resolves relative to the base protocol', () => {
          const base = './../';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });

        test('normalizes input', () => {
          const base = './../';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = './../';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = './../';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = './../';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        test('remains absolute path', () => {
          const base = './../';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/assets/main.js.map');
        });

        test('normalizes input', () => {
          const base = './../';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = './../';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = './../';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = './../';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        test('resolves relative to current directory', () => {
          const base = './../';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('../bar/main.js.map');
        });

        test('resolves relative to parent directory', () => {
          const base = './../';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('../../bar/main.js.map');
        });

        test('resolves relative to parent multiple directory', () => {
          const base = './../';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('../../../../bar/main.js.map');
        });

        test('normalizes input', () => {
          const base = './../';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('../foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        test('resolves relative to current directory', () => {
          const base = './../';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('../bar/main.js.map');
        });

        test('resolves relative to parent multiple directory, later', () => {
          const base = './../';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('../../../bar/main.js.map');
        });

        test('normalizes input', () => {
          const base = './../';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('../foo/main.js.map');
        });
      });
    });

    describe(`base = "./deep/.."`, () => {
      describe('with absolute input', () => {
        test('returns input', () => {
          const base = './deep/..';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes input', () => {
          const base = './deep/..';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = './deep/..';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = './deep/..';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = './deep/..';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        test('resolves relative to the base protocol', () => {
          const base = './deep/..';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });

        test('normalizes input', () => {
          const base = './deep/..';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = './deep/..';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = './deep/..';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = './deep/..';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        test('remains absolute path', () => {
          const base = './deep/..';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/assets/main.js.map');
        });

        test('normalizes input', () => {
          const base = './deep/..';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = './deep/..';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = './deep/..';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = './deep/..';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        test('resolves relative to current directory', () => {
          const base = './deep/..';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('./bar/main.js.map');
        });

        test('resolves relative to parent directory', () => {
          const base = './deep/..';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('../bar/main.js.map');
        });

        test('resolves relative to parent multiple directory', () => {
          const base = './deep/..';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('../../../bar/main.js.map');
        });

        test('normalizes input', () => {
          const base = './deep/..';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('./foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        test('resolves relative to current directory', () => {
          const base = './deep/..';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('./bar/main.js.map');
        });

        test('resolves relative to parent multiple directory, later', () => {
          const base = './deep/..';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('../../bar/main.js.map');
        });

        test('normalizes input', () => {
          const base = './deep/..';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('./foo/main.js.map');
        });
      });
    });

    describe(`base = "./deep/../"`, () => {
      describe('with absolute input', () => {
        test('returns input', () => {
          const base = './deep/../';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes input', () => {
          const base = './deep/../';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = './deep/../';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = './deep/../';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = './deep/../';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        test('resolves relative to the base protocol', () => {
          const base = './deep/../';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });

        test('normalizes input', () => {
          const base = './deep/../';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = './deep/../';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = './deep/../';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = './deep/../';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        test('remains absolute path', () => {
          const base = './deep/../';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/assets/main.js.map');
        });

        test('normalizes input', () => {
          const base = './deep/../';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = './deep/../';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = './deep/../';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = './deep/../';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        test('resolves relative to current directory', () => {
          const base = './deep/../';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('./bar/main.js.map');
        });

        test('resolves relative to parent directory', () => {
          const base = './deep/../';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('../bar/main.js.map');
        });

        test('resolves relative to parent multiple directory', () => {
          const base = './deep/../';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('../../../bar/main.js.map');
        });

        test('normalizes input', () => {
          const base = './deep/../';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('./foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        test('resolves relative to current directory', () => {
          const base = './deep/../';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('./bar/main.js.map');
        });

        test('resolves relative to parent multiple directory, later', () => {
          const base = './deep/../';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('../../bar/main.js.map');
        });

        test('normalizes input', () => {
          const base = './deep/../';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('./foo/main.js.map');
        });
      });
    });

    describe(`base = "../.."`, () => {
      describe('with absolute input', () => {
        test('returns input', () => {
          const base = '../..';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes input', () => {
          const base = '../..';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = '../..';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = '../..';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = '../..';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        test('resolves relative to the base protocol', () => {
          const base = '../..';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });

        test('normalizes input', () => {
          const base = '../..';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = '../..';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = '../..';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = '../..';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        test('remains absolute path', () => {
          const base = '../..';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/assets/main.js.map');
        });

        test('normalizes input', () => {
          const base = '../..';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = '../..';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = '../..';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = '../..';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        test('resolves relative to current directory', () => {
          const base = '../..';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('../../bar/main.js.map');
        });

        test('resolves relative to parent directory', () => {
          const base = '../..';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('../../../bar/main.js.map');
        });

        test('resolves relative to parent multiple directory', () => {
          const base = '../..';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('../../../../../bar/main.js.map');
        });

        test('normalizes input', () => {
          const base = '../..';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('../../foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        test('resolves relative to current directory', () => {
          const base = '../..';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('../../bar/main.js.map');
        });

        test('resolves relative to parent multiple directory, later', () => {
          const base = '../..';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('../../../../bar/main.js.map');
        });

        test('normalizes input', () => {
          const base = '../..';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('../../foo/main.js.map');
        });
      });
    });

    describe(`base = "../../"`, () => {
      describe('with absolute input', () => {
        test('returns input', () => {
          const base = '../../';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes input', () => {
          const base = '../../';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = '../../';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = '../../';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = '../../';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        test('resolves relative to the base protocol', () => {
          const base = '../../';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });

        test('normalizes input', () => {
          const base = '../../';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = '../../';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = '../../';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = '../../';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        test('remains absolute path', () => {
          const base = '../../';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/assets/main.js.map');
        });

        test('normalizes input', () => {
          const base = '../../';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = '../../';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = '../../';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = '../../';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        test('resolves relative to current directory', () => {
          const base = '../../';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('../../bar/main.js.map');
        });

        test('resolves relative to parent directory', () => {
          const base = '../../';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('../../../bar/main.js.map');
        });

        test('resolves relative to parent multiple directory', () => {
          const base = '../../';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('../../../../../bar/main.js.map');
        });

        test('normalizes input', () => {
          const base = '../../';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('../../foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        test('resolves relative to current directory', () => {
          const base = '../../';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('../../bar/main.js.map');
        });

        test('resolves relative to parent multiple directory, later', () => {
          const base = '../../';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('../../../../bar/main.js.map');
        });

        test('normalizes input', () => {
          const base = '../../';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('../../foo/main.js.map');
        });
      });
    });

    describe(`base = "../deep/.."`, () => {
      describe('with absolute input', () => {
        test('returns input', () => {
          const base = '../deep/..';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes input', () => {
          const base = '../deep/..';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = '../deep/..';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = '../deep/..';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = '../deep/..';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        test('resolves relative to the base protocol', () => {
          const base = '../deep/..';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });

        test('normalizes input', () => {
          const base = '../deep/..';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = '../deep/..';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = '../deep/..';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = '../deep/..';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        test('remains absolute path', () => {
          const base = '../deep/..';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/assets/main.js.map');
        });

        test('normalizes input', () => {
          const base = '../deep/..';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = '../deep/..';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = '../deep/..';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = '../deep/..';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        test('resolves relative to current directory', () => {
          const base = '../deep/..';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('../bar/main.js.map');
        });

        test('resolves relative to parent directory', () => {
          const base = '../deep/..';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('../../bar/main.js.map');
        });

        test('resolves relative to parent multiple directory', () => {
          const base = '../deep/..';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('../../../../bar/main.js.map');
        });

        test('normalizes input', () => {
          const base = '../deep/..';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('../foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        test('resolves relative to current directory', () => {
          const base = '../deep/..';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('../bar/main.js.map');
        });

        test('resolves relative to parent multiple directory, later', () => {
          const base = '../deep/..';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('../../../bar/main.js.map');
        });

        test('normalizes input', () => {
          const base = '../deep/..';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('../foo/main.js.map');
        });
      });
    });

    describe(`base = "../deep/../"`, () => {
      describe('with absolute input', () => {
        test('returns input', () => {
          const base = '../deep/../';
          const input = 'https://absolute.com/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes input', () => {
          const base = '../deep/../';
          const input = 'https://absolute.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = '../deep/../';
          const input = 'https://absolute.com/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = '../deep/../';
          const input = 'https://absolute.com/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = '../deep/../';
          const input = 'https://absolute.com/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('https://absolute.com/main.js.map');
        });
      });

      describe('with protocol relative input', () => {
        test('resolves relative to the base protocol', () => {
          const base = '../deep/../';
          const input = '//protocol-relative.com/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });

        test('normalizes input', () => {
          const base = '../deep/../';
          const input = '//protocol-relative.com/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = '../deep/../';
          const input = '//protocol-relative.com/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = '../deep/../';
          const input = '//protocol-relative.com/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = '../deep/../';
          const input = '//protocol-relative.com/foo/../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('//protocol-relative.com/main.js.map');
        });
      });

      describe('with absolute path input', () => {
        test('remains absolute path', () => {
          const base = '../deep/../';
          const input = '/assets/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/assets/main.js.map');
        });

        test('normalizes input', () => {
          const base = '../deep/../';
          const input = '/foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/foo/main.js.map');
        });

        test('normalizes current directory', () => {
          const base = '../deep/../';
          const input = '/./main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/main.js.map');
        });

        test('normalizes too many parent accessors', () => {
          const base = '../deep/../';
          const input = '/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/main.js.map');
        });

        test('normalizes too many parent accessors, late', () => {
          const base = '../deep/../';
          const input = '/foo/../../../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('/main.js.map');
        });
      });

      describe('with leading dot relative input', () => {
        test('resolves relative to current directory', () => {
          const base = '../deep/../';
          const input = './bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('../bar/main.js.map');
        });

        test('resolves relative to parent directory', () => {
          const base = '../deep/../';
          const input = '../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('../../bar/main.js.map');
        });

        test('resolves relative to parent multiple directory', () => {
          const base = '../deep/../';
          const input = '../../../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('../../../../bar/main.js.map');
        });

        test('normalizes input', () => {
          const base = '../deep/../';
          const input = './foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('../foo/main.js.map');
        });
      });

      describe('with relative input', () => {
        test('resolves relative to current directory', () => {
          const base = '../deep/../';
          const input = 'bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('../bar/main.js.map');
        });

        test('resolves relative to parent multiple directory, later', () => {
          const base = '../deep/../';
          const input = 'foo/../../../bar/main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('../../../bar/main.js.map');
        });

        test('normalizes input', () => {
          const base = '../deep/../';
          const input = 'foo/./bar/../main.js.map';
          const resolved = resolve(input, base);
          expect(resolved).toBe('../foo/main.js.map');
        });
      });
    });
  });
});
