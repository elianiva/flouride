# Flouride - Language detector

[![npm](https://img.shields.io/npm/v/flouride?style=for-the-badge)](https://www.npmjs.com/package/flouride)
[![npm bundle size](https://img.shields.io/bundlephobia/min/flouride?style=for-the-badge)](https://www.npmjs.com/package/flouride)
[![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/elianiva/flouride/ci.yml?branch=master&style=for-the-badge)](https://github.com/elianiva/flouride/actions/workflows/ci.yml)
[![Codecov](https://img.shields.io/codecov/c/gh/elianiva/flouride?style=for-the-badge)](https://app.codecov.io/gh/elianiva/flouride)

A fork of [ts95/lang-detector](https://github.com/ts95/lang-detector), rewritten in Typescript with more language support.

Detects a programming language from a given string.

- Built-in support for CommonJS and ESM format
- Built-in Typescript typings
- No external dependencies
- 200 test cases and growing!

## Detectable languages

| Languages |            |            |        |            |
| --------- | ---------- | ---------- | ------ | ---------- |
| C         | Dockerfile | Javascript | Pascal | SQL        |
| C++       | Elixir     | Julia      | PHP    | YAML       |
| C#        | Go         | Kotlin     | Python | Typescript |
| Clojure   | HTML       | Lua        | Ruby   |            |
| CSS       | Java       | Markdown   | Rust   |            |

## Install

```bash
$ pnpm add @elianiva/flouride
```

## Usage

```js
import flouride from "@elianiva/flouride";

const code = flouride('cout << "Hello world" << endl;');

// {
//   language: 'C++',
//   statistics: {
//     C: 0,
//     Clojure: 0,
//     'C++': 5,
//     CSS: 0,
//     'C#': 0,
//     Dockerfile: 0,
//     Elixir: 0,
//     Go: 0,
//     HTML: 0,
//     Java: 0,
//     Javascript: 0,
//     Julia: 2,
//     Kotlin: 0,
//     Lua: 2,
//     Markdown: 0,
//     Pascal: 0,
//     PHP: 0,
//     Python: 0,
//     Ruby: 0,
//     Rust: 0,
//     SQL: 0,
//     Unknown: 1,
//     YAML: 0,
//   },
//   linesOfCode: 1
// }
```

Or if you want to integrate it with [Shiki](https://github.com/shikijs/shiki), you could pass:

```js
flouride('Console.WriteLine("Hello world!");', { shiki: true }).language;
// => csharp
flouride("fn partition<T,F>(v: &mut [T], f: &F) -> usize ", { shiki: true }).language;
// => rust
```

If you want to handle `Unknown` value, you could pass:

```js
const code = flouride("SELECT 'Hello world!' text FROM dual;", { noUnknown: true });
```

### With Typescript

```typescript
import flouride from "flouride";
import type { Options } from "flouride";

const flourideOptions: Options = {
  heuristic: true,
};

const code = flouride("print!({:?}, &v);", flourideOptions);
```

### Available Options

| Key       | Type      | Default | Description                                                                                      |
| --------- | --------- | ------- | ------------------------------------------------------------------------------------------------ |
| heuristic | `boolean` | `true`  | Checks for codes on the top of the given input. Only checks when the lines of code is above 500. |
| shiki     | `boolean` | `false` | Straightforward compatibility with Shiki's language specification type                           |
| noUnknown | `boolean` | `false` | If `true`, will not output `Unknown` on detected and statistics result                           |

## License

[MIT](./LICENSE)
