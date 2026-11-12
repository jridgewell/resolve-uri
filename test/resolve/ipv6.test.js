const resolve = require('../..');
const assert = require('assert');

describe('IPv6 hosts', () => {
  const cases = [
    ['http://[::1]/main.js', undefined, 'http://[::1]/main.js'],
    ['https://[2001:db8::1]', undefined, 'https://[2001:db8::1]/'],
    ['http://[::1]:8080?query#hash', undefined, 'http://[::1]:8080/?query#hash'],
    ['http://user:pass@[2001:db8::1]:8080/src/../main.js?query#hash', undefined, 'http://user:pass@[2001:db8::1]:8080/main.js?query#hash'],
    ['main.js.map', 'http://[::1]:8080/src/main.js', 'http://[::1]:8080/src/main.js.map'],
    ['/main.js.map', 'http://[::1]:8080/src/main.js', 'http://[::1]:8080/main.js.map'],
    ['../main.js.map', '//[2001:db8::1]:8080/src/main.js', '//[2001:db8::1]:8080/main.js.map'],
    ['//[::1]:8080/src/main.js', 'https://example.com/', 'https://[::1]:8080/src/main.js'],
    ['//[::1]/main.js', undefined, '//[::1]/main.js'],
    ['?new', 'http://[::1]:8080/src/main.js?old#hash', 'http://[::1]:8080/src/main.js?new'],
    ['#new', 'http://[::1]:8080/src/main.js?query#old', 'http://[::1]:8080/src/main.js?query#new'],
    ['http://[ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff]:8080/main.js', undefined, 'http://[ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff]:8080/main.js'],
    ['http://[::ffff:192.0.2.1]/main.js', undefined, 'http://[::ffff:192.0.2.1]/main.js'],
  ];

  for (const [input, base, expected] of cases) {
    it(`resolves ${JSON.stringify(input)} against ${JSON.stringify(base)}`, () => {
      assert.strictEqual(resolve(input, base), expected);
    });
  }
});
