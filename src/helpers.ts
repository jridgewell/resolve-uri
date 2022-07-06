// Matches the scheme of a URL, eg "http://"
const schemeRegex = /^[\w+.-]+:\/\//;

/**
 * Matches the parts of a URL:
 * 1. Scheme, including ":", guaranteed.
 * 2. User/password, including "@", optional.
 * 3. Host, guaranteed.
 * 4. Port, including ":", optional.
 * 5. Path, including "/", optional.
 * 6. Query, including "?", optional.
 * 7. Hash, including "#", optional.
 */
const urlRegex = /^([\w+.-]+:)\/\/([^@/#?]*@)?([^:/#?]*)(:\d+)?(\/[^#?]*)?(\?[^#]*)?(#.*)?/;

/**
 * File URLs are weird. They dont' need the regular `//` in the scheme, they may or may not start
 * with a leading `/`, they can have a domain (but only if they don't start with a Windows drive).
 *
 * 1. Host, optional.
 * 2. Path, which may include "/", guaranteed.
 * 3. Query, including "?", optional.
 * 4. Hash, including "#", optional.
 */
const fileRegex = /^file:(?:\/\/((?![a-z]:)[^/#?]*)?)?(\/?[^#?]*)(\?[^#]*)?(#.*)?/i;

type Url = {
  scheme: string;
  user: string;
  host: string;
  port: string;
  path: string;
  query: string;
  hash: string;
  type: UrlType;
};

export enum UrlType {
  Empty = 1,
  Hash = 2,
  Query = 3,
  RelativePath = 4,
  AbsolutePath = 5,
  SchemeRelative = 6,
  Absolute = 7,
}

function isAbsoluteUrl(input: string): boolean {
  return schemeRegex.test(input);
}

function isSchemeRelativeUrl(input: string): boolean {
  return input.startsWith('//');
}

function isAbsolutePath(input: string): boolean {
  return input.startsWith('/');
}

function isFileUrl(input: string): boolean {
  return input.startsWith('file:');
}

function isRelative(input: string): boolean {
  return /^[.?#]/.test(input);
}

function parseAbsoluteUrl(input: string): Url {
  const match = urlRegex.exec(input)!;
  return makeUrl(
    match[1],
    match[2] || '',
    match[3],
    match[4] || '',
    match[5] || '/',
    match[6] || '',
    match[7] || '',
  );
}

function parseFileUrl(input: string): Url {
  const match = fileRegex.exec(input)!;
  const path = match[2];
  return makeUrl(
    'file:',
    '',
    match[1] || '',
    '',
    isAbsolutePath(path) ? path : '/' + path,
    match[3] || '',
    match[4] || '',
  );
}

function makeUrl(
  scheme: string,
  user: string,
  host: string,
  port: string,
  path: string,
  query: string,
  hash: string,
): Url {
  return {
    scheme,
    user,
    host,
    port,
    path,
    query,
    hash,
    type: UrlType.Absolute,
  };
}

export function parseUrl(input: string): Url {
  if (isSchemeRelativeUrl(input)) {
    const url = parseAbsoluteUrl('http:' + input);
    url.scheme = '';
    url.type = UrlType.SchemeRelative;
    return url;
  }

  if (isAbsolutePath(input)) {
    const url = parseAbsoluteUrl('http://foo.com' + input);
    url.scheme = '';
    url.host = '';
    url.type = UrlType.AbsolutePath;
    return url;
  }

  if (isFileUrl(input)) return parseFileUrl(input);

  if (isAbsoluteUrl(input)) return parseAbsoluteUrl(input);

  const url = parseAbsoluteUrl('http://foo.com/' + input);
  url.scheme = '';
  url.host = '';
  url.type = input
    ? input.startsWith('?')
      ? UrlType.Query
      : input.startsWith('#')
      ? UrlType.Hash
      : UrlType.RelativePath
    : UrlType.Empty;
  return url;
}

function stripPathFilename(path: string): string {
  // If a path ends with a parent directory "..", then it's a relative path with excess parent
  // paths. It's not a file, so we can't strip it.
  if (path.endsWith('/..')) return path;
  const index = path.lastIndexOf('/');
  return path.slice(0, index + 1);
}

export function mergePaths(url: Url, base: Url) {
  normalizePath(base, base.type);

  // If the path is just a "/", then it was an empty path to begin with (remember, we're a relative
  // path).
  if (url.path === '/') {
    url.path = base.path;
  } else {
    // Resolution happens relative to the base path's directory, not the file.
    url.path = stripPathFilename(base.path) + url.path;
  }
}

export function reconstructPath(pieces: string[], index: number, length: number): string {
  let path = '';
  for (; index < length; index++) {
    path += '/' + pieces[index];
  }
  return path;
}

/**
 * The path can have empty directories "//", unneeded parents "foo/..", or current directory
 * "foo/.". We need to normalize to a standard representation.
 */
export function normalizePath(url: Url, type: UrlType) {
  const rel = type <= UrlType.RelativePath;
  const pieces = url.path.split('/');

  // We need to preserve the first piece always, so that we output a leading slash. The item at
  // pieces[0] is an empty string.
  let pointer = 1;

  // Positive is the number of real directories we've output, used for popping a parent directory.
  // Eg, "foo/bar/.." will have a positive 2, and we can decrement to be left with just "foo".
  let positive = 0;

  // We need to keep a trailing slash if we encounter an empty directory (eg, splitting "foo/" will
  // generate `["foo", ""]` pieces). And, if we pop a parent directory. But once we encounter a
  // real directory, we won't need to append, unless the other conditions happen again.
  let addTrailingSlash = false;

  for (let i = 1; i < pieces.length; i++) {
    const piece = pieces[i];

    // An empty directory, could be a trailing slash, or just a double "//" in the path.
    if (!piece) {
      addTrailingSlash = true;
      continue;
    }

    // If we encounter a real directory, then we don't need to append anymore.
    addTrailingSlash = false;

    // A current directory, which we can always drop.
    if (piece === '.') continue;

    // A parent directory, we need to see if there are any real directories we can pop. Else, we
    // have an excess of parents, and we'll need to keep the "..".
    if (piece === '..') {
      if (positive) {
        addTrailingSlash = true;
        positive--;
        pointer--;
      } else if (rel) {
        // If we're in a relativePath, then we need to keep the excess parents. Else, in an absolute
        // URL, protocol relative URL, or an absolute path, we don't need to keep excess.
        pieces[pointer++] = piece;
      }
      continue;
    }

    // We've encountered a real directory. Move it to the next insertion pointer, which accounts for
    // any popped or dropped directories.
    pieces[pointer++] = piece;
    positive++;
  }

  let path = reconstructPath(pieces, 1, pointer);
  if (!path || (addTrailingSlash && !path.endsWith('/..'))) {
    path += '/';
  }
  url.path = path;
}

// We're outputting either an absolute URL, or a protocol relative one.
export function printSchemefulUrl(url: Url): string {
  return `${url.scheme}//${url.user}${url.host}${url.port}${printAbsolutePath(url)}`;
}

export function printRelativePath(url: Url, input: string, base: string | undefined): string {
  // The first char is always a "/", and we need it to be relative.
  const path = url.path.slice(1);
  const queryHash = printQueryHash(url);

  if (!path) return queryHash || '.';

  if (isRelative(base || input) && !isRelative(path)) {
    // If base started with a leading ".", or there is no base and input started with a ".",
    // then we need to ensure that the relative path starts with a ".". We don't know if
    // relative starts with a "..", though, so check before prepending.
    return './' + path + queryHash;
  }

  return path + queryHash;
}

export function printAbsolutePath(url: Url): string {
  return url.path + printQueryHash(url);
}

export function printQueryHash(url: Url): string {
  return url.query + url.hash;
}
