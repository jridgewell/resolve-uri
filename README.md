# @jridgewell/resolve-uri

> Resolve a URI relative to an optional base URI

Resolve any combination of absolute URIs, protocol-realtive URIs, absolute paths, or relative paths.

## Installation

```sh
npm install @jridgewell/resolve-uri
```

## Usage

```typescript
function resolve(input: string, base?: string): string;
```

```js
import resolve from '@jridgewell/resolve-uri';

resolve('foo', 'https://example.com'); // => 'https://example.com/foo'
```

| Input                 | Base                    | Resolution                      | Explanation                                                    |
|-----------------------|-------------------------|---------------------------------|----------------------------------------------------------------|
| `https://example.com` | _any_                   | `https://example.com/`          | Normalized only                                                |
| `//example.com`       | `https://base.com/`     | `https://example.com/`          | Inherits the base's protocol                                   |
| `//example.com`       | _rest_                  | `//example.com/`                | Normalized only                                                |
| `/example`            | `https://base.com/`     | `https://base.com/example`      | Inherits base's origin                                         |
| `/example`            | `//base.com/`           | `//base.com/example`            | Inherits base's host, remains protocol-relative                |
| `/example`            | _rest_                  | `/example`                      | Normalized only                                                |
| `example`             | `https://base.com/dir/` | `https://base.com/dir/example`  | Joined with base's last directory                              |
| `example`             | `https://base.com/file` | `https://base.com/example`      | Joined with base without its file                              |
| `example`             | `//base.com/dir/`       | `//base.com/dir/example`        | Joined with base's last directory                              |
| `example`             | `//base.com/file`       | `//base.com/example`            | Joined with base without its file                              |
| `example`             | `/base/dir/`            | `/base/dir/example`             | Joined with base's last directory                              |
| `example`             | `/base/file`            | `/base/example`                 | Joined with base without its file                              |
| `example`             | `base/dir/`             | `base/dir/example`              | Joined with base's last directory                              |
| `example`             | `base/file`             | `base/example`                  | Joined with base without its file                              |

## Windows path support

A path is interpreted as "Windows" if it contains _any_ backslash `\` characters. If the resolved
result is an absolute or protocol-relative URL, then the result is kept as a URL. Else, the result
will be a Windows path.

| Input                 | Base                    | Resolution                      | Explanation                                                    |
|-----------------------|-------------------------|---------------------------------|----------------------------------------------------------------|
| `C:\example`          | `https://base.com/`     | `https://base.com/example`      | Inherits base's origin, removes Drive                          |
| `C:\example`          | `//base.com/`           | `//base.com/example`            | Inherits base's host, removes Drive, remains protocol-relative |
| `C:\example`          | _rest_                  | `C:\example`                    | Normalized only, outputs Windows Drive path                    |
| `example\`            | `https://base.com/dir/` | `https://base.com/dir/example/` | Joined with base's last directory, outputs URL                 |
| `example\`            | `https://base.com/file` | `https://base.com/example/`     | Joined with base without its file, outputs URL                 |
| `example\`            | `//base.com/dir/`       | `//base.com/dir/example/`       | Joined with base's last directory, outputs protocol-relative   |
| `example\`            | `//base.com/file`       | `//base.com/example/`           | Joined with base without its file, outputs protocol-relative   |
| `example`             | `C:\base\dir\`          | `C:\base\dir\example`           | Joined with base's last directory, outputs Windows Drive path  |
| `example`             | `C:\base\file`          | `C:\base\example`               | Joined with base without its file, outputs Windows Drive path  |
| `example\`            | `/base/dir/`            | `\base\dir\example`             | Joined with base's last directory, outputs Windows path        |
| `example\`            | `/base/file`            | `\base\example\`                | Joined with base without its file, outputs Windows path        |
| `example`             | `base\dir\`             | `base\dir\example`              | Joined with base's last directory, outputs Windows path        |
| `example`             | `base\file`             | `base\example`                  | Joined with base without its file, outputs Windows path        |
| `example\`            | `base/dir/`             | `base\dir\example\`             | Joined with base's last directory, outputs Windows path        |
| `example\`            | `base/file`             | `base\example\`                 | Joined with base without its file, outputs Windows path        |

