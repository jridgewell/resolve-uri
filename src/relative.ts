import {
  parseUrl,
  normalizePath,
  printSchemefulUrl,
  printRelativePath,
  printQueryHash,
  reconstructPath,
  UrlType,
} from './helpers';

export default function relative(from: string, to: string): string {
  const fromUrl = parseUrl(from);
  const url = parseUrl(to);
  normalizePath(url, url.type);

  if (url.scheme) {
    // We can't make an absolute URL into a protocol-relative one unless the from shares the same
    // scheme.
    if (url.scheme !== fromUrl.scheme) return printSchemefulUrl(url);
  }

  if (url.host) {
    // We can't make a protocol-relative URL path into an absolute path unless the from shares the
    // same origin.
    if (url.user !== fromUrl.user || url.host !== fromUrl.host || url.port !== fromUrl.port) {
      url.scheme = '';
      return printSchemefulUrl(url);
    }
  }

  const rel = url.type <= UrlType.RelativePath;
  const fromRel = fromUrl.type <= UrlType.RelativePath;
  if (rel !== fromRel) {
    if (rel) return printRelativePath(url, to, from);
    return url.path;
  }

  normalizePath(fromUrl, url.type);

  const pathPieces = url.path.split('/');
  const fromPieces = fromUrl.path.split('/');
  let pIndex = 0;
  let fIndex = 0;
  for (; pIndex < pathPieces.length && fIndex < fromPieces.length; pIndex++, fIndex++) {
    if (pathPieces[pIndex] !== fromPieces[fIndex]) break;
  }

  if (fIndex < fromPieces.length && fromPieces[fIndex] === '..') {
    throw new Error('cannot make relative path with remaining `..` parent directory');
  }

  if (pIndex === pathPieces.length && fIndex === fromPieces.length) {
    if (url.query || url.hash) {
      if (url.query !== fromUrl.query) return printQueryHash(url);
      return url.hash || url.query;
    }
  }

  // The file of the from's path doesn't matter, resolution is relative to the directory, so we need
  // to decrement by 1.
  const remaining = fromPieces.length - fIndex - 1;
  const parent = '/..'.repeat(Math.max(0, remaining));
  url.path = parent + reconstructPath(pathPieces, pIndex, pathPieces.length);
  return printRelativePath(url, to, from);
}
