/* eslint-env node */

// This is a fallback for older node that doesn't know about package.json's exports field.

/**
 * Makes a relative URI from `from` to `to`.
 *
 * @type {(from: string, to: string) => string}
 */
module.exports = require('./dist/relative.cjs.js');
