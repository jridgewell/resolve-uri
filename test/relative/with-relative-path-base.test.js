const relative = require('@jridgewell/resolve-uri/relative');
const assert = require('assert');

describe(`relative`, () => {
  describe(`with relative path base`, () => {
    describe(`base = "file"`, () => {
      describe(`with absolute input`, () => {
        it(`normalizes absolute input`, () => {
          const base = 'file';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'https://input.com/nested/file.js');
        });
      });
    });

    describe(`base = "dir/"`, () => {
      describe(`with absolute input`, () => {
        it(`normalizes absolute input`, () => {
          const base = 'dir/';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'https://input.com/nested/file.js');
        });
      });
    });

    describe(`base = "dir/file"`, () => {
      describe(`with absolute input`, () => {
        it(`normalizes absolute input`, () => {
          const base = 'dir/file';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'https://input.com/nested/file.js');
        });
      });
    });

    describe(`base = "deep/dir/"`, () => {
      describe(`with absolute input`, () => {
        it(`normalizes absolute input`, () => {
          const base = 'deep/dir/';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'https://input.com/nested/file.js');
        });
      });
    });

    describe(`base = "./file"`, () => {
      describe(`with absolute input`, () => {
        it(`normalizes absolute input`, () => {
          const base = './file';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'https://input.com/nested/file.js');
        });
      });
    });

    describe(`base = "./dir/"`, () => {
      describe(`with absolute input`, () => {
        it(`normalizes absolute input`, () => {
          const base = './dir/';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'https://input.com/nested/file.js');
        });
      });
    });

    describe(`base = "./deep/file"`, () => {
      describe(`with absolute input`, () => {
        it(`normalizes absolute input`, () => {
          const base = './deep/file';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'https://input.com/nested/file.js');
        });
      });
    });

    describe(`base = "./deep/dir/"`, () => {
      describe(`with absolute input`, () => {
        it(`normalizes absolute input`, () => {
          const base = './deep/dir/';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'https://input.com/nested/file.js');
        });
      });
    });

    describe(`base = "../file"`, () => {
      describe(`with absolute input`, () => {
        it(`normalizes absolute input`, () => {
          const base = '../file';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'https://input.com/nested/file.js');
        });
      });
    });

    describe(`base = "../dir/"`, () => {
      describe(`with absolute input`, () => {
        it(`normalizes absolute input`, () => {
          const base = '../dir/';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'https://input.com/nested/file.js');
        });
      });
    });

    describe(`base = "../deep/file"`, () => {
      describe(`with absolute input`, () => {
        it(`normalizes absolute input`, () => {
          const base = '../deep/file';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'https://input.com/nested/file.js');
        });
      });
    });

    describe(`base = "../deep/dir/"`, () => {
      describe(`with absolute input`, () => {
        it(`normalizes absolute input`, () => {
          const base = '../deep/dir/';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'https://input.com/nested/file.js');
        });
      });
    });

    describe(`base = ".."`, () => {
      describe(`with absolute input`, () => {
        it(`normalizes absolute input`, () => {
          const base = '..';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'https://input.com/nested/file.js');
        });
      });
    });

    describe(`base = "../"`, () => {
      describe(`with absolute input`, () => {
        it(`normalizes absolute input`, () => {
          const base = '../';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'https://input.com/nested/file.js');
        });
      });
    });

    describe(`base = "dir/.."`, () => {
      describe(`with absolute input`, () => {
        it(`normalizes absolute input`, () => {
          const base = 'dir/..';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'https://input.com/nested/file.js');
        });
      });
    });

    describe(`base = "deep/../"`, () => {
      describe(`with absolute input`, () => {
        it(`normalizes absolute input`, () => {
          const base = 'deep/../';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'https://input.com/nested/file.js');
        });
      });
    });

    describe(`base = "./.."`, () => {
      describe(`with absolute input`, () => {
        it(`normalizes absolute input`, () => {
          const base = './..';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'https://input.com/nested/file.js');
        });
      });
    });

    describe(`base = "./../"`, () => {
      describe(`with absolute input`, () => {
        it(`normalizes absolute input`, () => {
          const base = './../';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'https://input.com/nested/file.js');
        });
      });
    });

    describe(`base = "./deep/.."`, () => {
      describe(`with absolute input`, () => {
        it(`normalizes absolute input`, () => {
          const base = './deep/..';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'https://input.com/nested/file.js');
        });
      });
    });

    describe(`base = "./deep/../"`, () => {
      describe(`with absolute input`, () => {
        it(`normalizes absolute input`, () => {
          const base = './deep/../';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'https://input.com/nested/file.js');
        });
      });
    });

    describe(`base = "../.."`, () => {
      describe(`with absolute input`, () => {
        it(`normalizes absolute input`, () => {
          const base = '../..';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'https://input.com/nested/file.js');
        });
      });
    });

    describe(`base = "../../"`, () => {
      describe(`with absolute input`, () => {
        it(`normalizes absolute input`, () => {
          const base = '../../';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'https://input.com/nested/file.js');
        });
      });
    });

    describe(`base = "../deep/.."`, () => {
      describe(`with absolute input`, () => {
        it(`normalizes absolute input`, () => {
          const base = '../deep/..';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'https://input.com/nested/file.js');
        });
      });
    });

    describe(`base = "../deep/../"`, () => {
      describe(`with absolute input`, () => {
        it(`normalizes absolute input`, () => {
          const base = '../deep/../';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'https://input.com/nested/file.js');
        });
      });
    });

    describe(`base = "file?baseQuery"`, () => {
      describe(`with absolute input`, () => {
        it(`normalizes absolute input`, () => {
          const base = 'file?baseQuery';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'https://input.com/nested/file.js');
        });
      });
    });

    describe(`base = "file?baseQuery#baseHash"`, () => {
      describe(`with absolute input`, () => {
        it(`normalizes absolute input`, () => {
          const base = 'file?baseQuery#baseHash';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'https://input.com/nested/file.js');
        });
      });
    });

    describe(`base = "file#baseHash"`, () => {
      describe(`with absolute input`, () => {
        it(`normalizes absolute input`, () => {
          const base = 'file#baseHash';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'https://input.com/nested/file.js');
        });
      });
    });
  });
});
