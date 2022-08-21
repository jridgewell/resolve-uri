const relative = require('../../relative');
const assert = require('assert');

describe(`relative`, () => {
  describe(`with absolute base`, () => {
    describe(`base = "https://foo.com"`, () => {
      describe(`with absolute input`, () => {
        it(`returns relative path to same-host input`, () => {
          const base = 'https://foo.com';
          const input = 'https://foo.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'nested/file.js');
        });

        it(`returns relative path to same-host input with query`, () => {
          const base = 'https://foo.com';
          const input = 'https://foo.com/nested/file.js?input';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'nested/file.js?input');
        });

        it(`returns scheme-relative to input`, () => {
          const base = 'https://foo.com';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, '//input.com/nested/file.js');
        });
      });
    });

    describe(`base = "https://foo.com/"`, () => {
      describe(`with absolute input`, () => {
        it(`returns relative path to same-host input`, () => {
          const base = 'https://foo.com/';
          const input = 'https://foo.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'nested/file.js');
        });

        it(`returns relative path to same-host input with query`, () => {
          const base = 'https://foo.com/';
          const input = 'https://foo.com/nested/file.js?input';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'nested/file.js?input');
        });

        it(`returns scheme-relative to input`, () => {
          const base = 'https://foo.com/';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, '//input.com/nested/file.js');
        });
      });
    });

    describe(`base = "https://foo.com/file"`, () => {
      describe(`with absolute input`, () => {
        it(`returns relative path to same-host input`, () => {
          const base = 'https://foo.com/file';
          const input = 'https://foo.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'nested/file.js');
        });

        it(`returns relative path to same-host input with query`, () => {
          const base = 'https://foo.com/file';
          const input = 'https://foo.com/nested/file.js?input';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'nested/file.js?input');
        });

        it(`returns scheme-relative to input`, () => {
          const base = 'https://foo.com/file';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, '//input.com/nested/file.js');
        });
      });
    });

    describe(`base = "https://foo.com/dir/"`, () => {
      describe(`with absolute input`, () => {
        it(`returns relative path to same-host input`, () => {
          const base = 'https://foo.com/dir/';
          const input = 'https://foo.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, '../nested/file.js');
        });

        it(`returns relative path to same-host input with query`, () => {
          const base = 'https://foo.com/dir/';
          const input = 'https://foo.com/nested/file.js?input';
          const rel = relative(base, input);
          assert.strictEqual(rel, '../nested/file.js?input');
        });

        it(`returns scheme-relative to input`, () => {
          const base = 'https://foo.com/dir/';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, '//input.com/nested/file.js');
        });
      });
    });

    describe(`base = "https://foo.com/dir/file"`, () => {
      describe(`with absolute input`, () => {
        it(`returns relative path to same-host input`, () => {
          const base = 'https://foo.com/dir/file';
          const input = 'https://foo.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, '../nested/file.js');
        });

        it(`returns relative path to same-host input with query`, () => {
          const base = 'https://foo.com/dir/file';
          const input = 'https://foo.com/nested/file.js?input';
          const rel = relative(base, input);
          assert.strictEqual(rel, '../nested/file.js?input');
        });

        it(`returns scheme-relative to input`, () => {
          const base = 'https://foo.com/dir/file';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, '//input.com/nested/file.js');
        });
      });
    });

    describe(`base = "https://foo.com/.."`, () => {
      describe(`with absolute input`, () => {
        it(`returns relative path to same-host input`, () => {
          const base = 'https://foo.com/..';
          const input = 'https://foo.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'nested/file.js');
        });

        it(`returns relative path to same-host input with query`, () => {
          const base = 'https://foo.com/..';
          const input = 'https://foo.com/nested/file.js?input';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'nested/file.js?input');
        });

        it(`returns scheme-relative to input`, () => {
          const base = 'https://foo.com/..';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, '//input.com/nested/file.js');
        });
      });
    });

    describe(`base = "https://foo.com/../"`, () => {
      describe(`with absolute input`, () => {
        it(`returns relative path to same-host input`, () => {
          const base = 'https://foo.com/../';
          const input = 'https://foo.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'nested/file.js');
        });

        it(`returns relative path to same-host input with query`, () => {
          const base = 'https://foo.com/../';
          const input = 'https://foo.com/nested/file.js?input';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'nested/file.js?input');
        });

        it(`returns scheme-relative to input`, () => {
          const base = 'https://foo.com/../';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, '//input.com/nested/file.js');
        });
      });
    });

    describe(`base = "https://foo.com/dir/.."`, () => {
      describe(`with absolute input`, () => {
        it(`returns relative path to same-host input`, () => {
          const base = 'https://foo.com/dir/..';
          const input = 'https://foo.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'nested/file.js');
        });

        it(`returns relative path to same-host input with query`, () => {
          const base = 'https://foo.com/dir/..';
          const input = 'https://foo.com/nested/file.js?input';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'nested/file.js?input');
        });

        it(`returns scheme-relative to input`, () => {
          const base = 'https://foo.com/dir/..';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, '//input.com/nested/file.js');
        });
      });
    });

    describe(`base = "https://foo.com/file?baseQuery"`, () => {
      describe(`with absolute input`, () => {
        it(`returns relative path to same-host input`, () => {
          const base = 'https://foo.com/file?baseQuery';
          const input = 'https://foo.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'nested/file.js');
        });

        it(`returns relative path to same-host input with query`, () => {
          const base = 'https://foo.com/file?baseQuery';
          const input = 'https://foo.com/nested/file.js?input';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'nested/file.js?input');
        });

        it(`returns query when same-host and same-path`, () => {
          const base = 'https://foo.com/file?baseQuery';
          const input = 'https://foo.com/file?input';
          const rel = relative(base, input);
          assert.strictEqual(rel, '?input');
        });

        it(`returns query and hash when same-host and same-path`, () => {
          const base = 'https://foo.com/file?baseQuery';
          const input = 'https://foo.com/file?input#hash';
          const rel = relative(base, input);
          assert.strictEqual(rel, '?input#hash');
        });

        it(`returns query when same-host, same-path, and same-query`, () => {
          const base = 'https://foo.com/file?baseQuery';
          const input = 'https://foo.com/file?baseQuery';
          const rel = relative(base, input);
          assert.strictEqual(rel, '?baseQuery');
        });

        it(`returns scheme-relative to input`, () => {
          const base = 'https://foo.com/file?baseQuery';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, '//input.com/nested/file.js');
        });
      });
    });

    describe(`base = "https://foo.com/file?baseQuery#baseHash"`, () => {
      describe(`with absolute input`, () => {
        it(`returns relative path to same-host input`, () => {
          const base = 'https://foo.com/file?baseQuery#baseHash';
          const input = 'https://foo.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'nested/file.js');
        });

        it(`returns relative path to same-host input with query`, () => {
          const base = 'https://foo.com/file?baseQuery#baseHash';
          const input = 'https://foo.com/nested/file.js?input';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'nested/file.js?input');
        });

        it(`returns query when same-host and same-path`, () => {
          const base = 'https://foo.com/file?baseQuery#baseHash';
          const input = 'https://foo.com/file?input';
          const rel = relative(base, input);
          assert.strictEqual(rel, '?input');
        });

        it(`returns query and hash when same-host and same-path`, () => {
          const base = 'https://foo.com/file?baseQuery#baseHash';
          const input = 'https://foo.com/file?input#hash';
          const rel = relative(base, input);
          assert.strictEqual(rel, '?input#hash');
        });

        it(`returns query when same-host, same-path, and same-query`, () => {
          const base = 'https://foo.com/file?baseQuery#baseHash';
          const input = 'https://foo.com/file?baseQuery';
          const rel = relative(base, input);
          assert.strictEqual(rel, '?baseQuery');
        });

        it(`returns hash when same-host, same-path, and same-query`, () => {
          const base = 'https://foo.com/file?baseQuery#baseHash';
          const input = 'https://foo.com/file?baseQuery#hash';
          const rel = relative(base, input);
          assert.strictEqual(rel, '#hash');
        });

        it(`returns hash when same-host, same-path, same-query, and same hash`, () => {
          const base = 'https://foo.com/file?baseQuery#baseHash';
          const input = 'https://foo.com/file?baseQuery#baseHash';
          const rel = relative(base, input);
          assert.strictEqual(rel, '#baseHash');
        });

        it(`returns scheme-relative to input`, () => {
          const base = 'https://foo.com/file?baseQuery#baseHash';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, '//input.com/nested/file.js');
        });
      });
    });

    describe(`base = "https://foo.com/file#baseHash"`, () => {
      describe(`with absolute input`, () => {
        it(`returns relative path to same-host input`, () => {
          const base = 'https://foo.com/file#baseHash';
          const input = 'https://foo.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'nested/file.js');
        });

        it(`returns relative path to same-host input with query`, () => {
          const base = 'https://foo.com/file#baseHash';
          const input = 'https://foo.com/nested/file.js?input';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'nested/file.js?input');
        });

        it(`returns hash when same-host, same-path, and same-query`, () => {
          const base = 'https://foo.com/file#baseHash';
          const input = 'https://foo.com/file#hash';
          const rel = relative(base, input);
          assert.strictEqual(rel, '#hash');
        });

        it(`returns hash when same-host, same-path, same-query, and same hash`, () => {
          const base = 'https://foo.com/file#baseHash';
          const input = 'https://foo.com/file#baseHash';
          const rel = relative(base, input);
          assert.strictEqual(rel, '#baseHash');
        });

        it(`returns scheme-relative to input`, () => {
          const base = 'https://foo.com/file#baseHash';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, '//input.com/nested/file.js');
        });
      });
    });

    describe(`base = "https://g"`, () => {
      describe(`with absolute input`, () => {
        it(`returns relative path to same-host input`, () => {
          const base = 'https://g';
          const input = 'https://g/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'nested/file.js');
        });

        it(`returns relative path to same-host input with query`, () => {
          const base = 'https://g';
          const input = 'https://g/nested/file.js?input';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'nested/file.js?input');
        });

        it(`returns scheme-relative to input`, () => {
          const base = 'https://g';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, '//input.com/nested/file.js');
        });
      });
    });

    describe(`base = "https://g/"`, () => {
      describe(`with absolute input`, () => {
        it(`returns relative path to same-host input`, () => {
          const base = 'https://g/';
          const input = 'https://g/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'nested/file.js');
        });

        it(`returns relative path to same-host input with query`, () => {
          const base = 'https://g/';
          const input = 'https://g/nested/file.js?input';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'nested/file.js?input');
        });

        it(`returns scheme-relative to input`, () => {
          const base = 'https://g/';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, '//input.com/nested/file.js');
        });
      });
    });

    describe(`base = "https://g/file"`, () => {
      describe(`with absolute input`, () => {
        it(`returns relative path to same-host input`, () => {
          const base = 'https://g/file';
          const input = 'https://g/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'nested/file.js');
        });

        it(`returns relative path to same-host input with query`, () => {
          const base = 'https://g/file';
          const input = 'https://g/nested/file.js?input';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'nested/file.js?input');
        });

        it(`returns scheme-relative to input`, () => {
          const base = 'https://g/file';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, '//input.com/nested/file.js');
        });
      });
    });

    describe(`base = "https://g/dir/"`, () => {
      describe(`with absolute input`, () => {
        it(`returns relative path to same-host input`, () => {
          const base = 'https://g/dir/';
          const input = 'https://g/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, '../nested/file.js');
        });

        it(`returns relative path to same-host input with query`, () => {
          const base = 'https://g/dir/';
          const input = 'https://g/nested/file.js?input';
          const rel = relative(base, input);
          assert.strictEqual(rel, '../nested/file.js?input');
        });

        it(`returns scheme-relative to input`, () => {
          const base = 'https://g/dir/';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, '//input.com/nested/file.js');
        });
      });
    });

    describe(`base = "https://g/dir/file"`, () => {
      describe(`with absolute input`, () => {
        it(`returns relative path to same-host input`, () => {
          const base = 'https://g/dir/file';
          const input = 'https://g/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, '../nested/file.js');
        });

        it(`returns relative path to same-host input with query`, () => {
          const base = 'https://g/dir/file';
          const input = 'https://g/nested/file.js?input';
          const rel = relative(base, input);
          assert.strictEqual(rel, '../nested/file.js?input');
        });

        it(`returns scheme-relative to input`, () => {
          const base = 'https://g/dir/file';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, '//input.com/nested/file.js');
        });
      });
    });

    describe(`base = "https://g/.."`, () => {
      describe(`with absolute input`, () => {
        it(`returns relative path to same-host input`, () => {
          const base = 'https://g/..';
          const input = 'https://g/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'nested/file.js');
        });

        it(`returns relative path to same-host input with query`, () => {
          const base = 'https://g/..';
          const input = 'https://g/nested/file.js?input';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'nested/file.js?input');
        });

        it(`returns scheme-relative to input`, () => {
          const base = 'https://g/..';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, '//input.com/nested/file.js');
        });
      });
    });

    describe(`base = "https://g/../"`, () => {
      describe(`with absolute input`, () => {
        it(`returns relative path to same-host input`, () => {
          const base = 'https://g/../';
          const input = 'https://g/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'nested/file.js');
        });

        it(`returns relative path to same-host input with query`, () => {
          const base = 'https://g/../';
          const input = 'https://g/nested/file.js?input';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'nested/file.js?input');
        });

        it(`returns scheme-relative to input`, () => {
          const base = 'https://g/../';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, '//input.com/nested/file.js');
        });
      });
    });

    describe(`base = "https://g/dir/.."`, () => {
      describe(`with absolute input`, () => {
        it(`returns relative path to same-host input`, () => {
          const base = 'https://g/dir/..';
          const input = 'https://g/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'nested/file.js');
        });

        it(`returns relative path to same-host input with query`, () => {
          const base = 'https://g/dir/..';
          const input = 'https://g/nested/file.js?input';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'nested/file.js?input');
        });

        it(`returns scheme-relative to input`, () => {
          const base = 'https://g/dir/..';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, '//input.com/nested/file.js');
        });
      });
    });

    describe(`base = "https://g/file?baseQuery"`, () => {
      describe(`with absolute input`, () => {
        it(`returns relative path to same-host input`, () => {
          const base = 'https://g/file?baseQuery';
          const input = 'https://g/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'nested/file.js');
        });

        it(`returns relative path to same-host input with query`, () => {
          const base = 'https://g/file?baseQuery';
          const input = 'https://g/nested/file.js?input';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'nested/file.js?input');
        });

        it(`returns query when same-host and same-path`, () => {
          const base = 'https://g/file?baseQuery';
          const input = 'https://g/file?input';
          const rel = relative(base, input);
          assert.strictEqual(rel, '?input');
        });

        it(`returns query and hash when same-host and same-path`, () => {
          const base = 'https://g/file?baseQuery';
          const input = 'https://g/file?input#hash';
          const rel = relative(base, input);
          assert.strictEqual(rel, '?input#hash');
        });

        it(`returns query when same-host, same-path, and same-query`, () => {
          const base = 'https://g/file?baseQuery';
          const input = 'https://g/file?baseQuery';
          const rel = relative(base, input);
          assert.strictEqual(rel, '?baseQuery');
        });

        it(`returns scheme-relative to input`, () => {
          const base = 'https://g/file?baseQuery';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, '//input.com/nested/file.js');
        });
      });
    });

    describe(`base = "https://g/file?baseQuery#baseHash"`, () => {
      describe(`with absolute input`, () => {
        it(`returns relative path to same-host input`, () => {
          const base = 'https://g/file?baseQuery#baseHash';
          const input = 'https://g/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'nested/file.js');
        });

        it(`returns relative path to same-host input with query`, () => {
          const base = 'https://g/file?baseQuery#baseHash';
          const input = 'https://g/nested/file.js?input';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'nested/file.js?input');
        });

        it(`returns query when same-host and same-path`, () => {
          const base = 'https://g/file?baseQuery#baseHash';
          const input = 'https://g/file?input';
          const rel = relative(base, input);
          assert.strictEqual(rel, '?input');
        });

        it(`returns query and hash when same-host and same-path`, () => {
          const base = 'https://g/file?baseQuery#baseHash';
          const input = 'https://g/file?input#hash';
          const rel = relative(base, input);
          assert.strictEqual(rel, '?input#hash');
        });

        it(`returns query when same-host, same-path, and same-query`, () => {
          const base = 'https://g/file?baseQuery#baseHash';
          const input = 'https://g/file?baseQuery';
          const rel = relative(base, input);
          assert.strictEqual(rel, '?baseQuery');
        });

        it(`returns hash when same-host, same-path, and same-query`, () => {
          const base = 'https://g/file?baseQuery#baseHash';
          const input = 'https://g/file?baseQuery#hash';
          const rel = relative(base, input);
          assert.strictEqual(rel, '#hash');
        });

        it(`returns hash when same-host, same-path, same-query, and same hash`, () => {
          const base = 'https://g/file?baseQuery#baseHash';
          const input = 'https://g/file?baseQuery#baseHash';
          const rel = relative(base, input);
          assert.strictEqual(rel, '#baseHash');
        });

        it(`returns scheme-relative to input`, () => {
          const base = 'https://g/file?baseQuery#baseHash';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, '//input.com/nested/file.js');
        });
      });
    });

    describe(`base = "https://g/file#baseHash"`, () => {
      describe(`with absolute input`, () => {
        it(`returns relative path to same-host input`, () => {
          const base = 'https://g/file#baseHash';
          const input = 'https://g/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'nested/file.js');
        });

        it(`returns relative path to same-host input with query`, () => {
          const base = 'https://g/file#baseHash';
          const input = 'https://g/nested/file.js?input';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'nested/file.js?input');
        });

        it(`returns hash when same-host, same-path, and same-query`, () => {
          const base = 'https://g/file#baseHash';
          const input = 'https://g/file#hash';
          const rel = relative(base, input);
          assert.strictEqual(rel, '#hash');
        });

        it(`returns hash when same-host, same-path, same-query, and same hash`, () => {
          const base = 'https://g/file#baseHash';
          const input = 'https://g/file#baseHash';
          const rel = relative(base, input);
          assert.strictEqual(rel, '#baseHash');
        });

        it(`returns scheme-relative to input`, () => {
          const base = 'https://g/file#baseHash';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, '//input.com/nested/file.js');
        });
      });
    });

    describe(`base = "file:///foo"`, () => {
      describe(`with absolute input`, () => {
        it(`returns relative path to same-host input`, () => {
          const base = 'file:///foo';
          const input = 'file:///nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'nested/file.js');
        });

        it(`returns relative path to same-host input with query`, () => {
          const base = 'file:///foo';
          const input = 'file:///nested/file.js?input';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'nested/file.js?input');
        });

        it(`normalizes absolute input`, () => {
          const base = 'file:///foo';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'https://input.com/nested/file.js');
        });
      });
    });

    describe(`base = "file:///foo/"`, () => {
      describe(`with absolute input`, () => {
        it(`returns relative path to same-host input`, () => {
          const base = 'file:///foo/';
          const input = 'file:///nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, '../nested/file.js');
        });

        it(`returns relative path to same-host input with query`, () => {
          const base = 'file:///foo/';
          const input = 'file:///nested/file.js?input';
          const rel = relative(base, input);
          assert.strictEqual(rel, '../nested/file.js?input');
        });

        it(`normalizes absolute input`, () => {
          const base = 'file:///foo/';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'https://input.com/nested/file.js');
        });
      });
    });

    describe(`base = "file:///foo/file"`, () => {
      describe(`with absolute input`, () => {
        it(`returns relative path to same-host input`, () => {
          const base = 'file:///foo/file';
          const input = 'file:///nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, '../nested/file.js');
        });

        it(`returns relative path to same-host input with query`, () => {
          const base = 'file:///foo/file';
          const input = 'file:///nested/file.js?input';
          const rel = relative(base, input);
          assert.strictEqual(rel, '../nested/file.js?input');
        });

        it(`normalizes absolute input`, () => {
          const base = 'file:///foo/file';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'https://input.com/nested/file.js');
        });
      });
    });

    describe(`base = "file:///foo/dir/"`, () => {
      describe(`with absolute input`, () => {
        it(`returns relative path to same-host input`, () => {
          const base = 'file:///foo/dir/';
          const input = 'file:///nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, '../../nested/file.js');
        });

        it(`returns relative path to same-host input with query`, () => {
          const base = 'file:///foo/dir/';
          const input = 'file:///nested/file.js?input';
          const rel = relative(base, input);
          assert.strictEqual(rel, '../../nested/file.js?input');
        });

        it(`normalizes absolute input`, () => {
          const base = 'file:///foo/dir/';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'https://input.com/nested/file.js');
        });
      });
    });

    describe(`base = "file:///foo/dir/file"`, () => {
      describe(`with absolute input`, () => {
        it(`returns relative path to same-host input`, () => {
          const base = 'file:///foo/dir/file';
          const input = 'file:///nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, '../../nested/file.js');
        });

        it(`returns relative path to same-host input with query`, () => {
          const base = 'file:///foo/dir/file';
          const input = 'file:///nested/file.js?input';
          const rel = relative(base, input);
          assert.strictEqual(rel, '../../nested/file.js?input');
        });

        it(`normalizes absolute input`, () => {
          const base = 'file:///foo/dir/file';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'https://input.com/nested/file.js');
        });
      });
    });

    describe(`base = "file:///foo/.."`, () => {
      describe(`with absolute input`, () => {
        it(`returns relative path to same-host input`, () => {
          const base = 'file:///foo/..';
          const input = 'file:///nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'nested/file.js');
        });

        it(`returns relative path to same-host input with query`, () => {
          const base = 'file:///foo/..';
          const input = 'file:///nested/file.js?input';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'nested/file.js?input');
        });

        it(`normalizes absolute input`, () => {
          const base = 'file:///foo/..';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'https://input.com/nested/file.js');
        });
      });
    });

    describe(`base = "file:///foo/../"`, () => {
      describe(`with absolute input`, () => {
        it(`returns relative path to same-host input`, () => {
          const base = 'file:///foo/../';
          const input = 'file:///nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'nested/file.js');
        });

        it(`returns relative path to same-host input with query`, () => {
          const base = 'file:///foo/../';
          const input = 'file:///nested/file.js?input';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'nested/file.js?input');
        });

        it(`normalizes absolute input`, () => {
          const base = 'file:///foo/../';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'https://input.com/nested/file.js');
        });
      });
    });

    describe(`base = "file:///foo/dir/.."`, () => {
      describe(`with absolute input`, () => {
        it(`returns relative path to same-host input`, () => {
          const base = 'file:///foo/dir/..';
          const input = 'file:///nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, '../nested/file.js');
        });

        it(`returns relative path to same-host input with query`, () => {
          const base = 'file:///foo/dir/..';
          const input = 'file:///nested/file.js?input';
          const rel = relative(base, input);
          assert.strictEqual(rel, '../nested/file.js?input');
        });

        it(`normalizes absolute input`, () => {
          const base = 'file:///foo/dir/..';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'https://input.com/nested/file.js');
        });
      });
    });

    describe(`base = "file:///foo/file?baseQuery"`, () => {
      describe(`with absolute input`, () => {
        it(`returns relative path to same-host input`, () => {
          const base = 'file:///foo/file?baseQuery';
          const input = 'file:///nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, '../nested/file.js');
        });

        it(`returns relative path to same-host input with query`, () => {
          const base = 'file:///foo/file?baseQuery';
          const input = 'file:///nested/file.js?input';
          const rel = relative(base, input);
          assert.strictEqual(rel, '../nested/file.js?input');
        });

        it(`returns query when same-host and same-path`, () => {
          const base = 'file:///foo/file?baseQuery';
          const input = 'file:///foo/file?input';
          const rel = relative(base, input);
          assert.strictEqual(rel, '?input');
        });

        it(`returns query and hash when same-host and same-path`, () => {
          const base = 'file:///foo/file?baseQuery';
          const input = 'file:///foo/file?input#hash';
          const rel = relative(base, input);
          assert.strictEqual(rel, '?input#hash');
        });

        it(`returns query when same-host, same-path, and same-query`, () => {
          const base = 'file:///foo/file?baseQuery';
          const input = 'file:///foo/file?baseQuery';
          const rel = relative(base, input);
          assert.strictEqual(rel, '?baseQuery');
        });

        it(`normalizes absolute input`, () => {
          const base = 'file:///foo/file?baseQuery';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'https://input.com/nested/file.js');
        });
      });
    });

    describe(`base = "file:///foo/file?baseQuery#baseHash"`, () => {
      describe(`with absolute input`, () => {
        it(`returns relative path to same-host input`, () => {
          const base = 'file:///foo/file?baseQuery#baseHash';
          const input = 'file:///nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, '../nested/file.js');
        });

        it(`returns relative path to same-host input with query`, () => {
          const base = 'file:///foo/file?baseQuery#baseHash';
          const input = 'file:///nested/file.js?input';
          const rel = relative(base, input);
          assert.strictEqual(rel, '../nested/file.js?input');
        });

        it(`returns query when same-host and same-path`, () => {
          const base = 'file:///foo/file?baseQuery#baseHash';
          const input = 'file:///foo/file?input';
          const rel = relative(base, input);
          assert.strictEqual(rel, '?input');
        });

        it(`returns query and hash when same-host and same-path`, () => {
          const base = 'file:///foo/file?baseQuery#baseHash';
          const input = 'file:///foo/file?input#hash';
          const rel = relative(base, input);
          assert.strictEqual(rel, '?input#hash');
        });

        it(`returns query when same-host, same-path, and same-query`, () => {
          const base = 'file:///foo/file?baseQuery#baseHash';
          const input = 'file:///foo/file?baseQuery';
          const rel = relative(base, input);
          assert.strictEqual(rel, '?baseQuery');
        });

        it(`returns hash when same-host, same-path, and same-query`, () => {
          const base = 'file:///foo/file?baseQuery#baseHash';
          const input = 'file:///foo/file?baseQuery#hash';
          const rel = relative(base, input);
          assert.strictEqual(rel, '#hash');
        });

        it(`returns hash when same-host, same-path, same-query, and same hash`, () => {
          const base = 'file:///foo/file?baseQuery#baseHash';
          const input = 'file:///foo/file?baseQuery#baseHash';
          const rel = relative(base, input);
          assert.strictEqual(rel, '#baseHash');
        });

        it(`normalizes absolute input`, () => {
          const base = 'file:///foo/file?baseQuery#baseHash';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'https://input.com/nested/file.js');
        });
      });
    });

    describe(`base = "file:///foo/file#baseHash"`, () => {
      describe(`with absolute input`, () => {
        it(`returns relative path to same-host input`, () => {
          const base = 'file:///foo/file#baseHash';
          const input = 'file:///nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, '../nested/file.js');
        });

        it(`returns relative path to same-host input with query`, () => {
          const base = 'file:///foo/file#baseHash';
          const input = 'file:///nested/file.js?input';
          const rel = relative(base, input);
          assert.strictEqual(rel, '../nested/file.js?input');
        });

        it(`returns hash when same-host, same-path, and same-query`, () => {
          const base = 'file:///foo/file#baseHash';
          const input = 'file:///foo/file#hash';
          const rel = relative(base, input);
          assert.strictEqual(rel, '#hash');
        });

        it(`returns hash when same-host, same-path, same-query, and same hash`, () => {
          const base = 'file:///foo/file#baseHash';
          const input = 'file:///foo/file#baseHash';
          const rel = relative(base, input);
          assert.strictEqual(rel, '#baseHash');
        });

        it(`normalizes absolute input`, () => {
          const base = 'file:///foo/file#baseHash';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'https://input.com/nested/file.js');
        });
      });
    });

    describe(`base = "file://foo"`, () => {
      describe(`with absolute input`, () => {
        it(`returns relative path to same-host input`, () => {
          const base = 'file://foo';
          const input = 'file://foo/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'nested/file.js');
        });

        it(`returns relative path to same-host input with query`, () => {
          const base = 'file://foo';
          const input = 'file://foo/nested/file.js?input';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'nested/file.js?input');
        });

        it(`normalizes absolute input`, () => {
          const base = 'file://foo';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'https://input.com/nested/file.js');
        });
      });
    });

    describe(`base = "file://foo/"`, () => {
      describe(`with absolute input`, () => {
        it(`returns relative path to same-host input`, () => {
          const base = 'file://foo/';
          const input = 'file://foo/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'nested/file.js');
        });

        it(`returns relative path to same-host input with query`, () => {
          const base = 'file://foo/';
          const input = 'file://foo/nested/file.js?input';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'nested/file.js?input');
        });

        it(`normalizes absolute input`, () => {
          const base = 'file://foo/';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'https://input.com/nested/file.js');
        });
      });
    });

    describe(`base = "file://foo/file"`, () => {
      describe(`with absolute input`, () => {
        it(`returns relative path to same-host input`, () => {
          const base = 'file://foo/file';
          const input = 'file://foo/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'nested/file.js');
        });

        it(`returns relative path to same-host input with query`, () => {
          const base = 'file://foo/file';
          const input = 'file://foo/nested/file.js?input';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'nested/file.js?input');
        });

        it(`normalizes absolute input`, () => {
          const base = 'file://foo/file';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'https://input.com/nested/file.js');
        });
      });
    });

    describe(`base = "file://foo/dir/"`, () => {
      describe(`with absolute input`, () => {
        it(`returns relative path to same-host input`, () => {
          const base = 'file://foo/dir/';
          const input = 'file://foo/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, '../nested/file.js');
        });

        it(`returns relative path to same-host input with query`, () => {
          const base = 'file://foo/dir/';
          const input = 'file://foo/nested/file.js?input';
          const rel = relative(base, input);
          assert.strictEqual(rel, '../nested/file.js?input');
        });

        it(`normalizes absolute input`, () => {
          const base = 'file://foo/dir/';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'https://input.com/nested/file.js');
        });
      });
    });

    describe(`base = "file://foo/dir/file"`, () => {
      describe(`with absolute input`, () => {
        it(`returns relative path to same-host input`, () => {
          const base = 'file://foo/dir/file';
          const input = 'file://foo/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, '../nested/file.js');
        });

        it(`returns relative path to same-host input with query`, () => {
          const base = 'file://foo/dir/file';
          const input = 'file://foo/nested/file.js?input';
          const rel = relative(base, input);
          assert.strictEqual(rel, '../nested/file.js?input');
        });

        it(`normalizes absolute input`, () => {
          const base = 'file://foo/dir/file';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'https://input.com/nested/file.js');
        });
      });
    });

    describe(`base = "file://foo/.."`, () => {
      describe(`with absolute input`, () => {
        it(`returns relative path to same-host input`, () => {
          const base = 'file://foo/..';
          const input = 'file://foo/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'nested/file.js');
        });

        it(`returns relative path to same-host input with query`, () => {
          const base = 'file://foo/..';
          const input = 'file://foo/nested/file.js?input';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'nested/file.js?input');
        });

        it(`normalizes absolute input`, () => {
          const base = 'file://foo/..';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'https://input.com/nested/file.js');
        });
      });
    });

    describe(`base = "file://foo/../"`, () => {
      describe(`with absolute input`, () => {
        it(`returns relative path to same-host input`, () => {
          const base = 'file://foo/../';
          const input = 'file://foo/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'nested/file.js');
        });

        it(`returns relative path to same-host input with query`, () => {
          const base = 'file://foo/../';
          const input = 'file://foo/nested/file.js?input';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'nested/file.js?input');
        });

        it(`normalizes absolute input`, () => {
          const base = 'file://foo/../';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'https://input.com/nested/file.js');
        });
      });
    });

    describe(`base = "file://foo/dir/.."`, () => {
      describe(`with absolute input`, () => {
        it(`returns relative path to same-host input`, () => {
          const base = 'file://foo/dir/..';
          const input = 'file://foo/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'nested/file.js');
        });

        it(`returns relative path to same-host input with query`, () => {
          const base = 'file://foo/dir/..';
          const input = 'file://foo/nested/file.js?input';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'nested/file.js?input');
        });

        it(`normalizes absolute input`, () => {
          const base = 'file://foo/dir/..';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'https://input.com/nested/file.js');
        });
      });
    });

    describe(`base = "file://foo/file?baseQuery"`, () => {
      describe(`with absolute input`, () => {
        it(`returns relative path to same-host input`, () => {
          const base = 'file://foo/file?baseQuery';
          const input = 'file://foo/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'nested/file.js');
        });

        it(`returns relative path to same-host input with query`, () => {
          const base = 'file://foo/file?baseQuery';
          const input = 'file://foo/nested/file.js?input';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'nested/file.js?input');
        });

        it(`returns query when same-host and same-path`, () => {
          const base = 'file://foo/file?baseQuery';
          const input = 'file://foo/file?input';
          const rel = relative(base, input);
          assert.strictEqual(rel, '?input');
        });

        it(`returns query and hash when same-host and same-path`, () => {
          const base = 'file://foo/file?baseQuery';
          const input = 'file://foo/file?input#hash';
          const rel = relative(base, input);
          assert.strictEqual(rel, '?input#hash');
        });

        it(`returns query when same-host, same-path, and same-query`, () => {
          const base = 'file://foo/file?baseQuery';
          const input = 'file://foo/file?baseQuery';
          const rel = relative(base, input);
          assert.strictEqual(rel, '?baseQuery');
        });

        it(`normalizes absolute input`, () => {
          const base = 'file://foo/file?baseQuery';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'https://input.com/nested/file.js');
        });
      });
    });

    describe(`base = "file://foo/file?baseQuery#baseHash"`, () => {
      describe(`with absolute input`, () => {
        it(`returns relative path to same-host input`, () => {
          const base = 'file://foo/file?baseQuery#baseHash';
          const input = 'file://foo/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'nested/file.js');
        });

        it(`returns relative path to same-host input with query`, () => {
          const base = 'file://foo/file?baseQuery#baseHash';
          const input = 'file://foo/nested/file.js?input';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'nested/file.js?input');
        });

        it(`returns query when same-host and same-path`, () => {
          const base = 'file://foo/file?baseQuery#baseHash';
          const input = 'file://foo/file?input';
          const rel = relative(base, input);
          assert.strictEqual(rel, '?input');
        });

        it(`returns query and hash when same-host and same-path`, () => {
          const base = 'file://foo/file?baseQuery#baseHash';
          const input = 'file://foo/file?input#hash';
          const rel = relative(base, input);
          assert.strictEqual(rel, '?input#hash');
        });

        it(`returns query when same-host, same-path, and same-query`, () => {
          const base = 'file://foo/file?baseQuery#baseHash';
          const input = 'file://foo/file?baseQuery';
          const rel = relative(base, input);
          assert.strictEqual(rel, '?baseQuery');
        });

        it(`returns hash when same-host, same-path, and same-query`, () => {
          const base = 'file://foo/file?baseQuery#baseHash';
          const input = 'file://foo/file?baseQuery#hash';
          const rel = relative(base, input);
          assert.strictEqual(rel, '#hash');
        });

        it(`returns hash when same-host, same-path, same-query, and same hash`, () => {
          const base = 'file://foo/file?baseQuery#baseHash';
          const input = 'file://foo/file?baseQuery#baseHash';
          const rel = relative(base, input);
          assert.strictEqual(rel, '#baseHash');
        });

        it(`normalizes absolute input`, () => {
          const base = 'file://foo/file?baseQuery#baseHash';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'https://input.com/nested/file.js');
        });
      });
    });

    describe(`base = "file://foo/file#baseHash"`, () => {
      describe(`with absolute input`, () => {
        it(`returns relative path to same-host input`, () => {
          const base = 'file://foo/file#baseHash';
          const input = 'file://foo/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'nested/file.js');
        });

        it(`returns relative path to same-host input with query`, () => {
          const base = 'file://foo/file#baseHash';
          const input = 'file://foo/nested/file.js?input';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'nested/file.js?input');
        });

        it(`returns hash when same-host, same-path, and same-query`, () => {
          const base = 'file://foo/file#baseHash';
          const input = 'file://foo/file#hash';
          const rel = relative(base, input);
          assert.strictEqual(rel, '#hash');
        });

        it(`returns hash when same-host, same-path, same-query, and same hash`, () => {
          const base = 'file://foo/file#baseHash';
          const input = 'file://foo/file#baseHash';
          const rel = relative(base, input);
          assert.strictEqual(rel, '#baseHash');
        });

        it(`normalizes absolute input`, () => {
          const base = 'file://foo/file#baseHash';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'https://input.com/nested/file.js');
        });
      });
    });

    describe(`base = "file:/foo"`, () => {
      describe(`with absolute input`, () => {
        it(`returns relative path to same-host input`, () => {
          const base = 'file:/foo';
          const input = 'file:///nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'nested/file.js');
        });

        it(`returns relative path to same-host input with query`, () => {
          const base = 'file:/foo';
          const input = 'file:///nested/file.js?input';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'nested/file.js?input');
        });

        it(`normalizes absolute input`, () => {
          const base = 'file:/foo';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'https://input.com/nested/file.js');
        });
      });
    });

    describe(`base = "file:/foo/"`, () => {
      describe(`with absolute input`, () => {
        it(`returns relative path to same-host input`, () => {
          const base = 'file:/foo/';
          const input = 'file:///nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, '../nested/file.js');
        });

        it(`returns relative path to same-host input with query`, () => {
          const base = 'file:/foo/';
          const input = 'file:///nested/file.js?input';
          const rel = relative(base, input);
          assert.strictEqual(rel, '../nested/file.js?input');
        });

        it(`normalizes absolute input`, () => {
          const base = 'file:/foo/';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'https://input.com/nested/file.js');
        });
      });
    });

    describe(`base = "file:/foo/file"`, () => {
      describe(`with absolute input`, () => {
        it(`returns relative path to same-host input`, () => {
          const base = 'file:/foo/file';
          const input = 'file:///nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, '../nested/file.js');
        });

        it(`returns relative path to same-host input with query`, () => {
          const base = 'file:/foo/file';
          const input = 'file:///nested/file.js?input';
          const rel = relative(base, input);
          assert.strictEqual(rel, '../nested/file.js?input');
        });

        it(`normalizes absolute input`, () => {
          const base = 'file:/foo/file';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'https://input.com/nested/file.js');
        });
      });
    });

    describe(`base = "file:/foo/dir/"`, () => {
      describe(`with absolute input`, () => {
        it(`returns relative path to same-host input`, () => {
          const base = 'file:/foo/dir/';
          const input = 'file:///nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, '../../nested/file.js');
        });

        it(`returns relative path to same-host input with query`, () => {
          const base = 'file:/foo/dir/';
          const input = 'file:///nested/file.js?input';
          const rel = relative(base, input);
          assert.strictEqual(rel, '../../nested/file.js?input');
        });

        it(`normalizes absolute input`, () => {
          const base = 'file:/foo/dir/';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'https://input.com/nested/file.js');
        });
      });
    });

    describe(`base = "file:/foo/dir/file"`, () => {
      describe(`with absolute input`, () => {
        it(`returns relative path to same-host input`, () => {
          const base = 'file:/foo/dir/file';
          const input = 'file:///nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, '../../nested/file.js');
        });

        it(`returns relative path to same-host input with query`, () => {
          const base = 'file:/foo/dir/file';
          const input = 'file:///nested/file.js?input';
          const rel = relative(base, input);
          assert.strictEqual(rel, '../../nested/file.js?input');
        });

        it(`normalizes absolute input`, () => {
          const base = 'file:/foo/dir/file';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'https://input.com/nested/file.js');
        });
      });
    });

    describe(`base = "file:/foo/.."`, () => {
      describe(`with absolute input`, () => {
        it(`returns relative path to same-host input`, () => {
          const base = 'file:/foo/..';
          const input = 'file:///nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'nested/file.js');
        });

        it(`returns relative path to same-host input with query`, () => {
          const base = 'file:/foo/..';
          const input = 'file:///nested/file.js?input';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'nested/file.js?input');
        });

        it(`normalizes absolute input`, () => {
          const base = 'file:/foo/..';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'https://input.com/nested/file.js');
        });
      });
    });

    describe(`base = "file:/foo/../"`, () => {
      describe(`with absolute input`, () => {
        it(`returns relative path to same-host input`, () => {
          const base = 'file:/foo/../';
          const input = 'file:///nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'nested/file.js');
        });

        it(`returns relative path to same-host input with query`, () => {
          const base = 'file:/foo/../';
          const input = 'file:///nested/file.js?input';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'nested/file.js?input');
        });

        it(`normalizes absolute input`, () => {
          const base = 'file:/foo/../';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'https://input.com/nested/file.js');
        });
      });
    });

    describe(`base = "file:/foo/dir/.."`, () => {
      describe(`with absolute input`, () => {
        it(`returns relative path to same-host input`, () => {
          const base = 'file:/foo/dir/..';
          const input = 'file:///nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, '../nested/file.js');
        });

        it(`returns relative path to same-host input with query`, () => {
          const base = 'file:/foo/dir/..';
          const input = 'file:///nested/file.js?input';
          const rel = relative(base, input);
          assert.strictEqual(rel, '../nested/file.js?input');
        });

        it(`normalizes absolute input`, () => {
          const base = 'file:/foo/dir/..';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'https://input.com/nested/file.js');
        });
      });
    });

    describe(`base = "file:/foo/file?baseQuery"`, () => {
      describe(`with absolute input`, () => {
        it(`returns relative path to same-host input`, () => {
          const base = 'file:/foo/file?baseQuery';
          const input = 'file:///nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, '../nested/file.js');
        });

        it(`returns relative path to same-host input with query`, () => {
          const base = 'file:/foo/file?baseQuery';
          const input = 'file:///nested/file.js?input';
          const rel = relative(base, input);
          assert.strictEqual(rel, '../nested/file.js?input');
        });

        it(`returns query when same-host and same-path`, () => {
          const base = 'file:/foo/file?baseQuery';
          const input = 'file:///foo/file?input';
          const rel = relative(base, input);
          assert.strictEqual(rel, '?input');
        });

        it(`returns query and hash when same-host and same-path`, () => {
          const base = 'file:/foo/file?baseQuery';
          const input = 'file:///foo/file?input#hash';
          const rel = relative(base, input);
          assert.strictEqual(rel, '?input#hash');
        });

        it(`returns query when same-host, same-path, and same-query`, () => {
          const base = 'file:/foo/file?baseQuery';
          const input = 'file:///foo/file?baseQuery';
          const rel = relative(base, input);
          assert.strictEqual(rel, '?baseQuery');
        });

        it(`normalizes absolute input`, () => {
          const base = 'file:/foo/file?baseQuery';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'https://input.com/nested/file.js');
        });
      });
    });

    describe(`base = "file:/foo/file?baseQuery#baseHash"`, () => {
      describe(`with absolute input`, () => {
        it(`returns relative path to same-host input`, () => {
          const base = 'file:/foo/file?baseQuery#baseHash';
          const input = 'file:///nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, '../nested/file.js');
        });

        it(`returns relative path to same-host input with query`, () => {
          const base = 'file:/foo/file?baseQuery#baseHash';
          const input = 'file:///nested/file.js?input';
          const rel = relative(base, input);
          assert.strictEqual(rel, '../nested/file.js?input');
        });

        it(`returns query when same-host and same-path`, () => {
          const base = 'file:/foo/file?baseQuery#baseHash';
          const input = 'file:///foo/file?input';
          const rel = relative(base, input);
          assert.strictEqual(rel, '?input');
        });

        it(`returns query and hash when same-host and same-path`, () => {
          const base = 'file:/foo/file?baseQuery#baseHash';
          const input = 'file:///foo/file?input#hash';
          const rel = relative(base, input);
          assert.strictEqual(rel, '?input#hash');
        });

        it(`returns query when same-host, same-path, and same-query`, () => {
          const base = 'file:/foo/file?baseQuery#baseHash';
          const input = 'file:///foo/file?baseQuery';
          const rel = relative(base, input);
          assert.strictEqual(rel, '?baseQuery');
        });

        it(`returns hash when same-host, same-path, and same-query`, () => {
          const base = 'file:/foo/file?baseQuery#baseHash';
          const input = 'file:///foo/file?baseQuery#hash';
          const rel = relative(base, input);
          assert.strictEqual(rel, '#hash');
        });

        it(`returns hash when same-host, same-path, same-query, and same hash`, () => {
          const base = 'file:/foo/file?baseQuery#baseHash';
          const input = 'file:///foo/file?baseQuery#baseHash';
          const rel = relative(base, input);
          assert.strictEqual(rel, '#baseHash');
        });

        it(`normalizes absolute input`, () => {
          const base = 'file:/foo/file?baseQuery#baseHash';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'https://input.com/nested/file.js');
        });
      });
    });

    describe(`base = "file:/foo/file#baseHash"`, () => {
      describe(`with absolute input`, () => {
        it(`returns relative path to same-host input`, () => {
          const base = 'file:/foo/file#baseHash';
          const input = 'file:///nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, '../nested/file.js');
        });

        it(`returns relative path to same-host input with query`, () => {
          const base = 'file:/foo/file#baseHash';
          const input = 'file:///nested/file.js?input';
          const rel = relative(base, input);
          assert.strictEqual(rel, '../nested/file.js?input');
        });

        it(`returns hash when same-host, same-path, and same-query`, () => {
          const base = 'file:/foo/file#baseHash';
          const input = 'file:///foo/file#hash';
          const rel = relative(base, input);
          assert.strictEqual(rel, '#hash');
        });

        it(`returns hash when same-host, same-path, same-query, and same hash`, () => {
          const base = 'file:/foo/file#baseHash';
          const input = 'file:///foo/file#baseHash';
          const rel = relative(base, input);
          assert.strictEqual(rel, '#baseHash');
        });

        it(`normalizes absolute input`, () => {
          const base = 'file:/foo/file#baseHash';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'https://input.com/nested/file.js');
        });
      });
    });

    describe(`base = "file:foo"`, () => {
      describe(`with absolute input`, () => {
        it(`returns relative path to same-host input`, () => {
          const base = 'file:foo';
          const input = 'file:///nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'nested/file.js');
        });

        it(`returns relative path to same-host input with query`, () => {
          const base = 'file:foo';
          const input = 'file:///nested/file.js?input';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'nested/file.js?input');
        });

        it(`normalizes absolute input`, () => {
          const base = 'file:foo';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'https://input.com/nested/file.js');
        });
      });
    });

    describe(`base = "file:foo/"`, () => {
      describe(`with absolute input`, () => {
        it(`returns relative path to same-host input`, () => {
          const base = 'file:foo/';
          const input = 'file:///nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, '../nested/file.js');
        });

        it(`returns relative path to same-host input with query`, () => {
          const base = 'file:foo/';
          const input = 'file:///nested/file.js?input';
          const rel = relative(base, input);
          assert.strictEqual(rel, '../nested/file.js?input');
        });

        it(`normalizes absolute input`, () => {
          const base = 'file:foo/';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'https://input.com/nested/file.js');
        });
      });
    });

    describe(`base = "file:foo/file"`, () => {
      describe(`with absolute input`, () => {
        it(`returns relative path to same-host input`, () => {
          const base = 'file:foo/file';
          const input = 'file:///nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, '../nested/file.js');
        });

        it(`returns relative path to same-host input with query`, () => {
          const base = 'file:foo/file';
          const input = 'file:///nested/file.js?input';
          const rel = relative(base, input);
          assert.strictEqual(rel, '../nested/file.js?input');
        });

        it(`normalizes absolute input`, () => {
          const base = 'file:foo/file';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'https://input.com/nested/file.js');
        });
      });
    });

    describe(`base = "file:foo/dir/"`, () => {
      describe(`with absolute input`, () => {
        it(`returns relative path to same-host input`, () => {
          const base = 'file:foo/dir/';
          const input = 'file:///nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, '../../nested/file.js');
        });

        it(`returns relative path to same-host input with query`, () => {
          const base = 'file:foo/dir/';
          const input = 'file:///nested/file.js?input';
          const rel = relative(base, input);
          assert.strictEqual(rel, '../../nested/file.js?input');
        });

        it(`normalizes absolute input`, () => {
          const base = 'file:foo/dir/';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'https://input.com/nested/file.js');
        });
      });
    });

    describe(`base = "file:foo/dir/file"`, () => {
      describe(`with absolute input`, () => {
        it(`returns relative path to same-host input`, () => {
          const base = 'file:foo/dir/file';
          const input = 'file:///nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, '../../nested/file.js');
        });

        it(`returns relative path to same-host input with query`, () => {
          const base = 'file:foo/dir/file';
          const input = 'file:///nested/file.js?input';
          const rel = relative(base, input);
          assert.strictEqual(rel, '../../nested/file.js?input');
        });

        it(`normalizes absolute input`, () => {
          const base = 'file:foo/dir/file';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'https://input.com/nested/file.js');
        });
      });
    });

    describe(`base = "file:foo/.."`, () => {
      describe(`with absolute input`, () => {
        it(`returns relative path to same-host input`, () => {
          const base = 'file:foo/..';
          const input = 'file:///nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'nested/file.js');
        });

        it(`returns relative path to same-host input with query`, () => {
          const base = 'file:foo/..';
          const input = 'file:///nested/file.js?input';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'nested/file.js?input');
        });

        it(`normalizes absolute input`, () => {
          const base = 'file:foo/..';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'https://input.com/nested/file.js');
        });
      });
    });

    describe(`base = "file:foo/../"`, () => {
      describe(`with absolute input`, () => {
        it(`returns relative path to same-host input`, () => {
          const base = 'file:foo/../';
          const input = 'file:///nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'nested/file.js');
        });

        it(`returns relative path to same-host input with query`, () => {
          const base = 'file:foo/../';
          const input = 'file:///nested/file.js?input';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'nested/file.js?input');
        });

        it(`normalizes absolute input`, () => {
          const base = 'file:foo/../';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'https://input.com/nested/file.js');
        });
      });
    });

    describe(`base = "file:foo/dir/.."`, () => {
      describe(`with absolute input`, () => {
        it(`returns relative path to same-host input`, () => {
          const base = 'file:foo/dir/..';
          const input = 'file:///nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, '../nested/file.js');
        });

        it(`returns relative path to same-host input with query`, () => {
          const base = 'file:foo/dir/..';
          const input = 'file:///nested/file.js?input';
          const rel = relative(base, input);
          assert.strictEqual(rel, '../nested/file.js?input');
        });

        it(`normalizes absolute input`, () => {
          const base = 'file:foo/dir/..';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'https://input.com/nested/file.js');
        });
      });
    });

    describe(`base = "file:foo/file?baseQuery"`, () => {
      describe(`with absolute input`, () => {
        it(`returns relative path to same-host input`, () => {
          const base = 'file:foo/file?baseQuery';
          const input = 'file:///nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, '../nested/file.js');
        });

        it(`returns relative path to same-host input with query`, () => {
          const base = 'file:foo/file?baseQuery';
          const input = 'file:///nested/file.js?input';
          const rel = relative(base, input);
          assert.strictEqual(rel, '../nested/file.js?input');
        });

        it(`returns query when same-host and same-path`, () => {
          const base = 'file:foo/file?baseQuery';
          const input = 'file:///foo/file?input';
          const rel = relative(base, input);
          assert.strictEqual(rel, '?input');
        });

        it(`returns query and hash when same-host and same-path`, () => {
          const base = 'file:foo/file?baseQuery';
          const input = 'file:///foo/file?input#hash';
          const rel = relative(base, input);
          assert.strictEqual(rel, '?input#hash');
        });

        it(`returns query when same-host, same-path, and same-query`, () => {
          const base = 'file:foo/file?baseQuery';
          const input = 'file:///foo/file?baseQuery';
          const rel = relative(base, input);
          assert.strictEqual(rel, '?baseQuery');
        });

        it(`normalizes absolute input`, () => {
          const base = 'file:foo/file?baseQuery';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'https://input.com/nested/file.js');
        });
      });
    });

    describe(`base = "file:foo/file?baseQuery#baseHash"`, () => {
      describe(`with absolute input`, () => {
        it(`returns relative path to same-host input`, () => {
          const base = 'file:foo/file?baseQuery#baseHash';
          const input = 'file:///nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, '../nested/file.js');
        });

        it(`returns relative path to same-host input with query`, () => {
          const base = 'file:foo/file?baseQuery#baseHash';
          const input = 'file:///nested/file.js?input';
          const rel = relative(base, input);
          assert.strictEqual(rel, '../nested/file.js?input');
        });

        it(`returns query when same-host and same-path`, () => {
          const base = 'file:foo/file?baseQuery#baseHash';
          const input = 'file:///foo/file?input';
          const rel = relative(base, input);
          assert.strictEqual(rel, '?input');
        });

        it(`returns query and hash when same-host and same-path`, () => {
          const base = 'file:foo/file?baseQuery#baseHash';
          const input = 'file:///foo/file?input#hash';
          const rel = relative(base, input);
          assert.strictEqual(rel, '?input#hash');
        });

        it(`returns query when same-host, same-path, and same-query`, () => {
          const base = 'file:foo/file?baseQuery#baseHash';
          const input = 'file:///foo/file?baseQuery';
          const rel = relative(base, input);
          assert.strictEqual(rel, '?baseQuery');
        });

        it(`returns hash when same-host, same-path, and same-query`, () => {
          const base = 'file:foo/file?baseQuery#baseHash';
          const input = 'file:///foo/file?baseQuery#hash';
          const rel = relative(base, input);
          assert.strictEqual(rel, '#hash');
        });

        it(`returns hash when same-host, same-path, same-query, and same hash`, () => {
          const base = 'file:foo/file?baseQuery#baseHash';
          const input = 'file:///foo/file?baseQuery#baseHash';
          const rel = relative(base, input);
          assert.strictEqual(rel, '#baseHash');
        });

        it(`normalizes absolute input`, () => {
          const base = 'file:foo/file?baseQuery#baseHash';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'https://input.com/nested/file.js');
        });
      });
    });

    describe(`base = "file:foo/file#baseHash"`, () => {
      describe(`with absolute input`, () => {
        it(`returns relative path to same-host input`, () => {
          const base = 'file:foo/file#baseHash';
          const input = 'file:///nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, '../nested/file.js');
        });

        it(`returns relative path to same-host input with query`, () => {
          const base = 'file:foo/file#baseHash';
          const input = 'file:///nested/file.js?input';
          const rel = relative(base, input);
          assert.strictEqual(rel, '../nested/file.js?input');
        });

        it(`returns hash when same-host, same-path, and same-query`, () => {
          const base = 'file:foo/file#baseHash';
          const input = 'file:///foo/file#hash';
          const rel = relative(base, input);
          assert.strictEqual(rel, '#hash');
        });

        it(`returns hash when same-host, same-path, same-query, and same hash`, () => {
          const base = 'file:foo/file#baseHash';
          const input = 'file:///foo/file#baseHash';
          const rel = relative(base, input);
          assert.strictEqual(rel, '#baseHash');
        });

        it(`normalizes absolute input`, () => {
          const base = 'file:foo/file#baseHash';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'https://input.com/nested/file.js');
        });
      });
    });

    describe(`base = "file:foo/file?baseQuery"`, () => {
      describe(`with absolute input`, () => {
        it(`returns relative path to same-host input`, () => {
          const base = 'file:foo/file?baseQuery';
          const input = 'file:///nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, '../nested/file.js');
        });

        it(`returns relative path to same-host input with query`, () => {
          const base = 'file:foo/file?baseQuery';
          const input = 'file:///nested/file.js?input';
          const rel = relative(base, input);
          assert.strictEqual(rel, '../nested/file.js?input');
        });

        it(`returns query when same-host and same-path`, () => {
          const base = 'file:foo/file?baseQuery';
          const input = 'file:///foo/file?input';
          const rel = relative(base, input);
          assert.strictEqual(rel, '?input');
        });

        it(`returns query and hash when same-host and same-path`, () => {
          const base = 'file:foo/file?baseQuery';
          const input = 'file:///foo/file?input#hash';
          const rel = relative(base, input);
          assert.strictEqual(rel, '?input#hash');
        });

        it(`returns query when same-host, same-path, and same-query`, () => {
          const base = 'file:foo/file?baseQuery';
          const input = 'file:///foo/file?baseQuery';
          const rel = relative(base, input);
          assert.strictEqual(rel, '?baseQuery');
        });

        it(`normalizes absolute input`, () => {
          const base = 'file:foo/file?baseQuery';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'https://input.com/nested/file.js');
        });
      });
    });

    describe(`base = "file:foo/file?baseQuery#baseHash"`, () => {
      describe(`with absolute input`, () => {
        it(`returns relative path to same-host input`, () => {
          const base = 'file:foo/file?baseQuery#baseHash';
          const input = 'file:///nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, '../nested/file.js');
        });

        it(`returns relative path to same-host input with query`, () => {
          const base = 'file:foo/file?baseQuery#baseHash';
          const input = 'file:///nested/file.js?input';
          const rel = relative(base, input);
          assert.strictEqual(rel, '../nested/file.js?input');
        });

        it(`returns query when same-host and same-path`, () => {
          const base = 'file:foo/file?baseQuery#baseHash';
          const input = 'file:///foo/file?input';
          const rel = relative(base, input);
          assert.strictEqual(rel, '?input');
        });

        it(`returns query and hash when same-host and same-path`, () => {
          const base = 'file:foo/file?baseQuery#baseHash';
          const input = 'file:///foo/file?input#hash';
          const rel = relative(base, input);
          assert.strictEqual(rel, '?input#hash');
        });

        it(`returns query when same-host, same-path, and same-query`, () => {
          const base = 'file:foo/file?baseQuery#baseHash';
          const input = 'file:///foo/file?baseQuery';
          const rel = relative(base, input);
          assert.strictEqual(rel, '?baseQuery');
        });

        it(`returns hash when same-host, same-path, and same-query`, () => {
          const base = 'file:foo/file?baseQuery#baseHash';
          const input = 'file:///foo/file?baseQuery#hash';
          const rel = relative(base, input);
          assert.strictEqual(rel, '#hash');
        });

        it(`returns hash when same-host, same-path, same-query, and same hash`, () => {
          const base = 'file:foo/file?baseQuery#baseHash';
          const input = 'file:///foo/file?baseQuery#baseHash';
          const rel = relative(base, input);
          assert.strictEqual(rel, '#baseHash');
        });

        it(`normalizes absolute input`, () => {
          const base = 'file:foo/file?baseQuery#baseHash';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'https://input.com/nested/file.js');
        });
      });
    });

    describe(`base = "file:foo/file#baseHash"`, () => {
      describe(`with absolute input`, () => {
        it(`returns relative path to same-host input`, () => {
          const base = 'file:foo/file#baseHash';
          const input = 'file:///nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, '../nested/file.js');
        });

        it(`returns relative path to same-host input with query`, () => {
          const base = 'file:foo/file#baseHash';
          const input = 'file:///nested/file.js?input';
          const rel = relative(base, input);
          assert.strictEqual(rel, '../nested/file.js?input');
        });

        it(`returns hash when same-host, same-path, and same-query`, () => {
          const base = 'file:foo/file#baseHash';
          const input = 'file:///foo/file#hash';
          const rel = relative(base, input);
          assert.strictEqual(rel, '#hash');
        });

        it(`returns hash when same-host, same-path, same-query, and same hash`, () => {
          const base = 'file:foo/file#baseHash';
          const input = 'file:///foo/file#baseHash';
          const rel = relative(base, input);
          assert.strictEqual(rel, '#baseHash');
        });

        it(`normalizes absolute input`, () => {
          const base = 'file:foo/file#baseHash';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'https://input.com/nested/file.js');
        });
      });
    });

    describe(`base = "file:file?baseQuery"`, () => {
      describe(`with absolute input`, () => {
        it(`returns relative path to same-host input`, () => {
          const base = 'file:file?baseQuery';
          const input = 'file:///nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'nested/file.js');
        });

        it(`returns relative path to same-host input with query`, () => {
          const base = 'file:file?baseQuery';
          const input = 'file:///nested/file.js?input';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'nested/file.js?input');
        });

        it(`returns query when same-host and same-path`, () => {
          const base = 'file:file?baseQuery';
          const input = 'file:///file?input';
          const rel = relative(base, input);
          assert.strictEqual(rel, '?input');
        });

        it(`returns query and hash when same-host and same-path`, () => {
          const base = 'file:file?baseQuery';
          const input = 'file:///file?input#hash';
          const rel = relative(base, input);
          assert.strictEqual(rel, '?input#hash');
        });

        it(`returns query when same-host, same-path, and same-query`, () => {
          const base = 'file:file?baseQuery';
          const input = 'file:///file?baseQuery';
          const rel = relative(base, input);
          assert.strictEqual(rel, '?baseQuery');
        });

        it(`normalizes absolute input`, () => {
          const base = 'file:file?baseQuery';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'https://input.com/nested/file.js');
        });
      });
    });

    describe(`base = "file:file?baseQuery#baseHash"`, () => {
      describe(`with absolute input`, () => {
        it(`returns relative path to same-host input`, () => {
          const base = 'file:file?baseQuery#baseHash';
          const input = 'file:///nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'nested/file.js');
        });

        it(`returns relative path to same-host input with query`, () => {
          const base = 'file:file?baseQuery#baseHash';
          const input = 'file:///nested/file.js?input';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'nested/file.js?input');
        });

        it(`returns query when same-host and same-path`, () => {
          const base = 'file:file?baseQuery#baseHash';
          const input = 'file:///file?input';
          const rel = relative(base, input);
          assert.strictEqual(rel, '?input');
        });

        it(`returns query and hash when same-host and same-path`, () => {
          const base = 'file:file?baseQuery#baseHash';
          const input = 'file:///file?input#hash';
          const rel = relative(base, input);
          assert.strictEqual(rel, '?input#hash');
        });

        it(`returns query when same-host, same-path, and same-query`, () => {
          const base = 'file:file?baseQuery#baseHash';
          const input = 'file:///file?baseQuery';
          const rel = relative(base, input);
          assert.strictEqual(rel, '?baseQuery');
        });

        it(`returns hash when same-host, same-path, and same-query`, () => {
          const base = 'file:file?baseQuery#baseHash';
          const input = 'file:///file?baseQuery#hash';
          const rel = relative(base, input);
          assert.strictEqual(rel, '#hash');
        });

        it(`returns hash when same-host, same-path, same-query, and same hash`, () => {
          const base = 'file:file?baseQuery#baseHash';
          const input = 'file:///file?baseQuery#baseHash';
          const rel = relative(base, input);
          assert.strictEqual(rel, '#baseHash');
        });

        it(`normalizes absolute input`, () => {
          const base = 'file:file?baseQuery#baseHash';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'https://input.com/nested/file.js');
        });
      });
    });

    describe(`base = "file:file#baseHash"`, () => {
      describe(`with absolute input`, () => {
        it(`returns relative path to same-host input`, () => {
          const base = 'file:file#baseHash';
          const input = 'file:///nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'nested/file.js');
        });

        it(`returns relative path to same-host input with query`, () => {
          const base = 'file:file#baseHash';
          const input = 'file:///nested/file.js?input';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'nested/file.js?input');
        });

        it(`returns hash when same-host, same-path, and same-query`, () => {
          const base = 'file:file#baseHash';
          const input = 'file:///file#hash';
          const rel = relative(base, input);
          assert.strictEqual(rel, '#hash');
        });

        it(`returns hash when same-host, same-path, same-query, and same hash`, () => {
          const base = 'file:file#baseHash';
          const input = 'file:///file#baseHash';
          const rel = relative(base, input);
          assert.strictEqual(rel, '#baseHash');
        });

        it(`normalizes absolute input`, () => {
          const base = 'file:file#baseHash';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'https://input.com/nested/file.js');
        });
      });
    });

    describe(`base = "file:?baseQuery"`, () => {
      describe(`with absolute input`, () => {
        it(`returns relative path to same-host input`, () => {
          const base = 'file:?baseQuery';
          const input = 'file:///nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'nested/file.js');
        });

        it(`returns relative path to same-host input with query`, () => {
          const base = 'file:?baseQuery';
          const input = 'file:///nested/file.js?input';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'nested/file.js?input');
        });

        it(`returns query when same-host and same-path`, () => {
          const base = 'file:?baseQuery';
          const input = 'file:///?input';
          const rel = relative(base, input);
          assert.strictEqual(rel, '?input');
        });

        it(`returns query and hash when same-host and same-path`, () => {
          const base = 'file:?baseQuery';
          const input = 'file:///?input#hash';
          const rel = relative(base, input);
          assert.strictEqual(rel, '?input#hash');
        });

        it(`returns query when same-host, same-path, and same-query`, () => {
          const base = 'file:?baseQuery';
          const input = 'file:///?baseQuery';
          const rel = relative(base, input);
          assert.strictEqual(rel, '?baseQuery');
        });

        it(`normalizes absolute input`, () => {
          const base = 'file:?baseQuery';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'https://input.com/nested/file.js');
        });
      });
    });

    describe(`base = "file:?baseQuery#baseHash"`, () => {
      describe(`with absolute input`, () => {
        it(`returns relative path to same-host input`, () => {
          const base = 'file:?baseQuery#baseHash';
          const input = 'file:///nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'nested/file.js');
        });

        it(`returns relative path to same-host input with query`, () => {
          const base = 'file:?baseQuery#baseHash';
          const input = 'file:///nested/file.js?input';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'nested/file.js?input');
        });

        it(`returns query when same-host and same-path`, () => {
          const base = 'file:?baseQuery#baseHash';
          const input = 'file:///?input';
          const rel = relative(base, input);
          assert.strictEqual(rel, '?input');
        });

        it(`returns query and hash when same-host and same-path`, () => {
          const base = 'file:?baseQuery#baseHash';
          const input = 'file:///?input#hash';
          const rel = relative(base, input);
          assert.strictEqual(rel, '?input#hash');
        });

        it(`returns query when same-host, same-path, and same-query`, () => {
          const base = 'file:?baseQuery#baseHash';
          const input = 'file:///?baseQuery';
          const rel = relative(base, input);
          assert.strictEqual(rel, '?baseQuery');
        });

        it(`returns hash when same-host, same-path, and same-query`, () => {
          const base = 'file:?baseQuery#baseHash';
          const input = 'file:///?baseQuery#hash';
          const rel = relative(base, input);
          assert.strictEqual(rel, '#hash');
        });

        it(`returns hash when same-host, same-path, same-query, and same hash`, () => {
          const base = 'file:?baseQuery#baseHash';
          const input = 'file:///?baseQuery#baseHash';
          const rel = relative(base, input);
          assert.strictEqual(rel, '#baseHash');
        });

        it(`normalizes absolute input`, () => {
          const base = 'file:?baseQuery#baseHash';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'https://input.com/nested/file.js');
        });
      });
    });

    describe(`base = "file:#baseHash"`, () => {
      describe(`with absolute input`, () => {
        it(`returns relative path to same-host input`, () => {
          const base = 'file:#baseHash';
          const input = 'file:///nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'nested/file.js');
        });

        it(`returns relative path to same-host input with query`, () => {
          const base = 'file:#baseHash';
          const input = 'file:///nested/file.js?input';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'nested/file.js?input');
        });

        it(`returns hash when same-host, same-path, and same-query`, () => {
          const base = 'file:#baseHash';
          const input = 'file:///#hash';
          const rel = relative(base, input);
          assert.strictEqual(rel, '#hash');
        });

        it(`returns hash when same-host, same-path, same-query, and same hash`, () => {
          const base = 'file:#baseHash';
          const input = 'file:///#baseHash';
          const rel = relative(base, input);
          assert.strictEqual(rel, '#baseHash');
        });

        it(`normalizes absolute input`, () => {
          const base = 'file:#baseHash';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'https://input.com/nested/file.js');
        });
      });
    });
  });
});
