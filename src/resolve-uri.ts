import {
  parseUrl,
  UrlType,
  mergePaths,
  normalizePath,
  printSchemefulUrl,
  printRelativePath,
  printAbsolutePath,
  printQueryHash,
  isRelative,
} from './helpers';

/**
 * Attempts to resolve `input` URL/path relative to `base`.
 */
export default function resolve(input: string, base: string | undefined): string {
  if (!input && !base) return '';

  const url = parseUrl(input);
  let inputType = url.type;

  if (base && inputType !== UrlType.Absolute) {
    const baseUrl = parseUrl(base);
    const baseType = baseUrl.type;

    switch (inputType) {
      case UrlType.Empty:
        url.hash = baseUrl.hash;
      // fall through

      case UrlType.Hash:
        url.query = baseUrl.query;
      // fall through

      case UrlType.Query:
      case UrlType.RelativePath:
        mergePaths(url, baseUrl);
      // fall through

      case UrlType.AbsolutePath:
        // The host, user, and port are joined, you can't copy one without the others.
        url.user = baseUrl.user;
        url.host = baseUrl.host;
        url.port = baseUrl.port;
      // fall through

      case UrlType.SchemeRelative:
        // The input doesn't have a schema at least, so we need to copy at least that over.
        url.scheme = baseUrl.scheme;
    }
    if (baseType > inputType) inputType = baseType;
  }

  normalizePath(url, inputType);

  switch (inputType) {
    // This is impossible, because of the empty checks at the start of the function.
    // case UrlType.Empty:

    case UrlType.Hash:
    case UrlType.Query:
      return printQueryHash(url);

    case UrlType.RelativePath:
      return printRelativePath(url, isRelative(base || input));

    case UrlType.AbsolutePath:
      return printAbsolutePath(url);

    default:
      return printSchemefulUrl(url);
  }
}
