const relative = require('../../relative');
const assert = require('assert');

describe(`relative`, () => {
  describe(`with protocol relative base`, () => {
    describe(`base = "//foo.com"`, () => {
      describe(`with absolute input`, () => {
        it(`normalizes absolute input`, () => {
          const base = '//foo.com';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'https://input.com/nested/file.js');
        });
      });
    });

    describe(`base = "//foo.com/"`, () => {
      describe(`with absolute input`, () => {
        it(`normalizes absolute input`, () => {
          const base = '//foo.com/';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'https://input.com/nested/file.js');
        });
      });
    });

    describe(`base = "//foo.com/file"`, () => {
      describe(`with absolute input`, () => {
        it(`normalizes absolute input`, () => {
          const base = '//foo.com/file';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'https://input.com/nested/file.js');
        });
      });
    });

    describe(`base = "//foo.com/dir/"`, () => {
      describe(`with absolute input`, () => {
        it(`normalizes absolute input`, () => {
          const base = '//foo.com/dir/';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'https://input.com/nested/file.js');
        });
      });
    });

    describe(`base = "//foo.com/dir/file"`, () => {
      describe(`with absolute input`, () => {
        it(`normalizes absolute input`, () => {
          const base = '//foo.com/dir/file';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'https://input.com/nested/file.js');
        });
      });
    });

    describe(`base = "//foo.com/.."`, () => {
      describe(`with absolute input`, () => {
        it(`normalizes absolute input`, () => {
          const base = '//foo.com/..';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'https://input.com/nested/file.js');
        });
      });
    });

    describe(`base = "//foo.com/../"`, () => {
      describe(`with absolute input`, () => {
        it(`normalizes absolute input`, () => {
          const base = '//foo.com/../';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'https://input.com/nested/file.js');
        });
      });
    });

    describe(`base = "//foo.com/dir/.."`, () => {
      describe(`with absolute input`, () => {
        it(`normalizes absolute input`, () => {
          const base = '//foo.com/dir/..';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'https://input.com/nested/file.js');
        });
      });
    });

    describe(`base = "//foo.com/file?baseQuery"`, () => {
      describe(`with absolute input`, () => {
        it(`normalizes absolute input`, () => {
          const base = '//foo.com/file?baseQuery';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'https://input.com/nested/file.js');
        });
      });
    });

    describe(`base = "//foo.com/file?baseQuery#baseHash"`, () => {
      describe(`with absolute input`, () => {
        it(`normalizes absolute input`, () => {
          const base = '//foo.com/file?baseQuery#baseHash';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'https://input.com/nested/file.js');
        });
      });
    });

    describe(`base = "//foo.com/file#baseHash"`, () => {
      describe(`with absolute input`, () => {
        it(`normalizes absolute input`, () => {
          const base = '//foo.com/file#baseHash';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'https://input.com/nested/file.js');
        });
      });
    });

    describe(`base = "//g"`, () => {
      describe(`with absolute input`, () => {
        it(`normalizes absolute input`, () => {
          const base = '//g';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'https://input.com/nested/file.js');
        });
      });
    });

    describe(`base = "//g/"`, () => {
      describe(`with absolute input`, () => {
        it(`normalizes absolute input`, () => {
          const base = '//g/';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'https://input.com/nested/file.js');
        });
      });
    });

    describe(`base = "//g/file"`, () => {
      describe(`with absolute input`, () => {
        it(`normalizes absolute input`, () => {
          const base = '//g/file';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'https://input.com/nested/file.js');
        });
      });
    });

    describe(`base = "//g/dir/"`, () => {
      describe(`with absolute input`, () => {
        it(`normalizes absolute input`, () => {
          const base = '//g/dir/';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'https://input.com/nested/file.js');
        });
      });
    });

    describe(`base = "//g/dir/file"`, () => {
      describe(`with absolute input`, () => {
        it(`normalizes absolute input`, () => {
          const base = '//g/dir/file';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'https://input.com/nested/file.js');
        });
      });
    });

    describe(`base = "//g/.."`, () => {
      describe(`with absolute input`, () => {
        it(`normalizes absolute input`, () => {
          const base = '//g/..';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'https://input.com/nested/file.js');
        });
      });
    });

    describe(`base = "//g/../"`, () => {
      describe(`with absolute input`, () => {
        it(`normalizes absolute input`, () => {
          const base = '//g/../';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'https://input.com/nested/file.js');
        });
      });
    });

    describe(`base = "//g/dir/.."`, () => {
      describe(`with absolute input`, () => {
        it(`normalizes absolute input`, () => {
          const base = '//g/dir/..';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'https://input.com/nested/file.js');
        });
      });
    });

    describe(`base = "//g/file?baseQuery"`, () => {
      describe(`with absolute input`, () => {
        it(`normalizes absolute input`, () => {
          const base = '//g/file?baseQuery';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'https://input.com/nested/file.js');
        });
      });
    });

    describe(`base = "//g/file?baseQuery#baseHash"`, () => {
      describe(`with absolute input`, () => {
        it(`normalizes absolute input`, () => {
          const base = '//g/file?baseQuery#baseHash';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'https://input.com/nested/file.js');
        });
      });
    });

    describe(`base = "//g/file#baseHash"`, () => {
      describe(`with absolute input`, () => {
        it(`normalizes absolute input`, () => {
          const base = '//g/file#baseHash';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'https://input.com/nested/file.js');
        });
      });
    });
  });
});
