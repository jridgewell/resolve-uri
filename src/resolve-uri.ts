// Matches the scheme of a URL, which is a strong indicator it is an valid
// absolute URL.
const schemeRegex = /^[\w+.-]+:\/\//i;
const urlRegex = /^([\w+.-]+:)\/\/([^@]*@)?([^:/]+)(:\d+)?(\/[^#?]*)?/;

/**
 * Removes the filename from the path (everything trailing the last "/"). This
 * is only safe to call on a path, never call with an absolute or protocol
 * relative URL.
 */
function stripPathFilename(path: string): string {
  if (path.endsWith('/..')) return path;
  const index = path.lastIndexOf('/');
  return path.slice(0, index + 1);
}

type Url = {
  scheme: string;
  user: string;
  host: string;
  port: string;
  path: string;
  relativePath: boolean;
};

function isAbsoluteUrl(input: string): boolean {
  return schemeRegex.test(input);
}

function isSchemeRelativeUrl(input: string): boolean {
  return input.startsWith('//');
}

function isAbsolutePath(input: string): boolean {
  return input.startsWith('/');
}

function parseUrl(input: string): Url {
  if (isSchemeRelativeUrl(input)) {
    const url = parseUrl('http:' + input);
    url.scheme = '';
    return url;
  }
  if (isAbsolutePath(input)) {
    const url = parseUrl('http://foo.com' + input);
    url.scheme = '';
    url.host = '';
    return url;
  }
  if (!isAbsoluteUrl(input)) {
    const url = parseUrl('http://foo.com/' + input);
    url.scheme = '';
    url.host = '';
    url.relativePath = true;
    return url;
  }
  const match = urlRegex.exec(input)!;
  const host = match[3];
  return {
    scheme: match[1],
    user: match[2] || '',
    host,
    port: match[4] || '',
    path: match[5] || (host ? '/' : ''),
    relativePath: false,
  };
}

function mergePaths(url: Url, base: Url) {
  if (url.path) {
    if (!url.relativePath) return;
    normalizePath(base);
    url.path = stripPathFilename(base.path) + url.path;
  } else {
    url.path = base.path;
  }
  url.relativePath = base.relativePath;
}

function copyDomainIfEmpty(url: Url, base: Url) {
  if (url.host) return;
  url.user = base.user;
  url.host = base.host;
  url.port = base.port;
}

function normalizePath(url: Url) {
  const { relativePath } = url;
  const pieces = url.path.split('/');

  let pointer = 1;
  let positive = 0;
  let addTrailingSlash = false;
  for (let i = 1; i < pieces.length; i++) {
    const piece = pieces[i];
    if (!piece) {
      addTrailingSlash = true;
      continue;
    }
    addTrailingSlash = false;
    if (piece === '.') continue;
    if (piece === '..') {
      if (positive) {
        addTrailingSlash = true;
        positive--;
        pointer--;
      } else if (relativePath) {
        pieces[pointer++] = piece;
      }
      continue;
    }
    pieces[pointer++] = piece;
    positive++;
  }

  let path = '';
  for (let i = 1; i < pointer; i++) {
    path += '/' + pieces[i];
  }
  if (addTrailingSlash) path += '/';
  url.path = path;
}

function print(url: Url, keepRelative: boolean): string {
  if (url.relativePath) {
    const path = url.path.slice(1);
    return !keepRelative || path.startsWith('.') ? path : './' + path;
  }
  if (!url.host) return url.path;
  return `${url.scheme}//${url.user}${url.host}${url.port}${url.path}`;
}

/**
 * Attempts to resolve `input` URL relative to `base`.
 */
export default function resolve(input: string, base: string | undefined): string {
  const keepRelative = (base || input).startsWith('.');
  const url = parseUrl(input);

  if (base && !url.scheme) {
    const baseUrl = parseUrl(base);
    url.scheme = baseUrl.scheme;
    copyDomainIfEmpty(url, baseUrl);
    mergePaths(url, baseUrl);
  }

  normalizePath(url);
  return print(url, keepRelative);
}
