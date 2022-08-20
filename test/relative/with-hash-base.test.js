const relative = require('@jridgewell/resolve-uri/relative');
const assert = require('assert');

describe(`relative`, () => {
  describe(`with hash base`, () => {
    describe(`base = "#baseHash"`, () => {
      describe(`with absolute input`, () => {
        it(`normalizes absolute input`, () => {
          const base = '#baseHash';
          const input = 'https://input.com/nested/file.js';
          const rel = relative(base, input);
          assert.strictEqual(rel, 'https://input.com/nested/file.js');
        });
      });
    });
  });
});
