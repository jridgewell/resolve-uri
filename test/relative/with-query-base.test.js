const relative = require('../../relative');
const assert = require('assert');

describe(`relative`, () => {
  describe(`with query base`, () => {
    describe(`base = "?baseQuery"`, () => {
      describe(`with absolute input`, () => {
        it(`normalizes absolute input`, () => {
          const base = '?baseQuery';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'https://input.com/nested/file.js');
        });
      });
    });

    describe(`base = "?baseQuery#baseHash"`, () => {
      describe(`with absolute input`, () => {
        it(`normalizes absolute input`, () => {
          const base = '?baseQuery#baseHash';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'https://input.com/nested/file.js');
        });
      });
    });
  });
});
