const relative = require('@jridgewell/resolve-uri/relative');
const assert = require('assert');

describe(`relative`, () => {
  describe(`with absolute path base`, () => {
    describe(`base = "/"`, () => {
      describe(`with absolute input`, () => {
        it(`normalizes absolute input`, () => {
          const base = '/';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'https://input.com/nested/file.js');
        });
      });
    });

    describe(`base = "/root"`, () => {
      describe(`with absolute input`, () => {
        it(`normalizes absolute input`, () => {
          const base = '/root';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'https://input.com/nested/file.js');
        });
      });
    });

    describe(`base = "/root/"`, () => {
      describe(`with absolute input`, () => {
        it(`normalizes absolute input`, () => {
          const base = '/root/';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'https://input.com/nested/file.js');
        });
      });
    });

    describe(`base = "/root/file"`, () => {
      describe(`with absolute input`, () => {
        it(`normalizes absolute input`, () => {
          const base = '/root/file';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'https://input.com/nested/file.js');
        });
      });
    });

    describe(`base = "/root/dir/"`, () => {
      describe(`with absolute input`, () => {
        it(`normalizes absolute input`, () => {
          const base = '/root/dir/';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'https://input.com/nested/file.js');
        });
      });
    });

    describe(`base = "/.."`, () => {
      describe(`with absolute input`, () => {
        it(`normalizes absolute input`, () => {
          const base = '/..';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'https://input.com/nested/file.js');
        });
      });
    });

    describe(`base = "/../"`, () => {
      describe(`with absolute input`, () => {
        it(`normalizes absolute input`, () => {
          const base = '/../';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'https://input.com/nested/file.js');
        });
      });
    });

    describe(`base = "/root/.."`, () => {
      describe(`with absolute input`, () => {
        it(`normalizes absolute input`, () => {
          const base = '/root/..';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'https://input.com/nested/file.js');
        });
      });
    });

    describe(`base = "/root/../"`, () => {
      describe(`with absolute input`, () => {
        it(`normalizes absolute input`, () => {
          const base = '/root/../';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'https://input.com/nested/file.js');
        });
      });
    });

    describe(`base = "/root?baseQuery"`, () => {
      describe(`with absolute input`, () => {
        it(`normalizes absolute input`, () => {
          const base = '/root?baseQuery';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'https://input.com/nested/file.js');
        });
      });
    });

    describe(`base = "/root?baseQuery#baseHash"`, () => {
      describe(`with absolute input`, () => {
        it(`normalizes absolute input`, () => {
          const base = '/root?baseQuery#baseHash';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'https://input.com/nested/file.js');
        });
      });
    });

    describe(`base = "/root#baseHash"`, () => {
      describe(`with absolute input`, () => {
        it(`normalizes absolute input`, () => {
          const base = '/root#baseHash';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'https://input.com/nested/file.js');
        });
      });
    });
  });
});
