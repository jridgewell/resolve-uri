const relative = require('../../relative');
const assert = require('assert');

describe(`relative`, () => {
  describe(`without base`, () => {
    describe(`base = ""`, () => {
      it(`normalizes absolute input`, () => {
        const base = '';
        const input = 'https://input.com/nested/file.js';
        const rel = relative(base, input);
        assert.strictEqual(rel, 'https://input.com/nested/file.js');
      });

      it(`normalizes scheme-relative input`, () => {
        const base = '';
        const input = '//input.com/nested/file.js';
        const rel = relative(base, input);
        assert.strictEqual(rel, '//input.com/nested/file.js');
      });

      it(`normalizes absolute path input`, () => {
        const base = '';
        const input = '/nested/file.js';
        const rel = relative(base, input);
        assert.strictEqual(rel, '/nested/file.js');
      });

      it(`normalizes relative path input`, () => {
        const base = '';
        const input = 'nested/file.js';
        const rel = relative(base, input);
        assert.strictEqual(rel, 'nested/file.js');
      });

      it(`normalizes query path input`, () => {
        const base = '';
        const input = '?query';
        const rel = relative(base, input);
        assert.strictEqual(rel, '?query');
      });

      it(`normalizes query hash path input`, () => {
        const base = '';
        const input = '?query#hash';
        const rel = relative(base, input);
        assert.strictEqual(rel, '?query#hash');
      });

      it(`normalizes hash path input`, () => {
        const base = '';
        const input = '#hash';
        const rel = relative(base, input);
        assert.strictEqual(rel, '#hash');
      });
    });
  });
});
