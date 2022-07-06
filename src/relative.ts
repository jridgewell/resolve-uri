import {
  parseUrl,
  normalizePath,
  printSchemefulUrl,
  printRelativePath,
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
  if (rel !== fromUrl.type <= UrlType.RelativePath) {
    if (rel) return printRelativePath(url, to, from);
    return url.path;
  }

  normalizePath(fromUrl, url.type);

  const pathPieces = url.path.split('/');
  const fromPieces = fromUrl.path.split('/');
  let pIndex = 0;
  let bIndex = 0;
  for (; pIndex < pathPieces.length && bIndex < fromPieces.length; pIndex++, bIndex++) {
    if (pathPieces[pIndex] !== fromPieces[bIndex]) break;
  }

  const remaining = fromPieces.length - bIndex;
  if (bIndex < fromPieces.length && fromPieces[bIndex] === '..') {
    throw new Error('cannot make relative path with remaining `..` parent directory');
  }

  const parent = '/..'.repeat(remaining);
  url.path = parent + reconstructPath(pathPieces, pIndex, pathPieces.length);
  return printRelativePath(url, to, from);
}
