import { JsCode } from "./javascript";
import type { LanguagePattern } from "../types";

// TS derives from JS core patterns, adding TS-specific syntax.
// JsCode (not Javascript) is used to avoid including JS anti-patterns
// that penalize valid TS constructs (as const, const enum, etc.).
export const Typescript: LanguagePattern[] = [
  ...JsCode,

  // ── Import/Export Type ──────────────────────────────────────────
  // import type { X } from 'y'
  { pattern: /^import\s+type\s+/, type: "meta.import" },
  // import { type X, type Y, ... }
  { pattern: /import\s*\{[^}]*\btype\s+\w+/, type: "meta.import" },
  // export type { X }
  { pattern: /export\s+type\s*\{/, type: "meta.import" },
  // export type X = ...
  { pattern: /export\s+type\s+\w+/, type: "meta.import" },

  // ── Type-Only Keywords ──────────────────────────────────────────
  { pattern: /\bsatisfies\b/, type: "keyword" },
  { pattern: /\bkeyof\b/, type: "keyword" },
  { pattern: /\binfer\b/, type: "keyword" },
  { pattern: /\bas\s+const\b/, type: "keyword.other" },
  { pattern: /\bconst\s+enum\b/, type: "constant.type" },

  // ── Type Predicate ──────────────────────────────────────────────
  { pattern: /\)\s*:\s*\w+\s+is\s+\w+/, type: "constant.type" },

  // ── Template Literal Types ──────────────────────────────────────
  { pattern: /`\$\{[^}]+\}`/, type: "constant.type" },

  // ── Generic Type References ─────────────────────────────────────
  {
    pattern:
      /(Readonly<|ReadonlyArray<|Array<|Record<|Pick<|Omit<|Exclude<|Extract<|NonNullable<|ReturnType<|Parameters<|Partial<|Required<)/,
    type: "constant.dictionary",
  },

  // Array type shorthand: string[]
  { pattern: /\w+\[]/, type: "keyword.other" },

  // Generic type parameter after colon: : Foo<Bar>
  // Must be preceded by colon to avoid matching comparison operators
  { pattern: /:\s*\w+\s*</, type: "keyword.other" },

  // Generic calls: Array.from<number>(...)
  { pattern: /\w+\.\w+<\w+>\(/, type: "keyword.other" },

  // ── Type Annotations (specific positions) ──────────────────────
  // : any | string | boolean | undefined | null | number | void | never | symbol | bigint | object | unknown
  {
    pattern:
      /\)\s*:\s*(any|string|boolean|undefined|null|number|void|never|symbol|bigint|object|unknown)/,
    type: "constant.type",
  },
  // let x: Type = ... or const x: Type = ... or var x: Type = ...
  {
    pattern:
      /(let|const|var)\s+\w+\s*:\s*(any|string|boolean|undefined|null|number|void|never|symbol|bigint|object|unknown)\s*=/,
    type: "constant.type",
  },

  // ── Declarations ────────────────────────────────────────────────
  { pattern: /interface\s+\w+\s*\{/, type: "constant.type" },
  { pattern: /enum\s+\w+\s*\{/, type: "constant.type" },
  { pattern: /type\s+\w+\s*=/, type: "constant.type" },

  // ── Functions ───────────────────────────────────────────────────
  { pattern: /function\s+\w+\(.*\)\s*:\s*\w+\s*{/, type: "keyword.function" },
  { pattern: /\(.*\)\s*:\s*\w+\s*=>\s*{/, type: "keyword.function" },

  // ── Keywords ────────────────────────────────────────────────────
  { pattern: /(typeof|declare)\s+/, type: "keyword" },
  { pattern: /\s+as\s+/, type: "keyword" },
  { pattern: /console\.log\s*\(/, type: "keyword.print" },

  // ── Negative (not TS) ───────────────────────────────────────────
  // Rust
  { pattern: /usize/, type: "not" },
  { pattern: /fn\s+\w+/, type: "not" },
  // Kotlin
  { pattern: /fun\s+/, type: "not" },
  { pattern: /Array<String>/, type: "not" },
  // Lua
  { pattern: /local\s+\w+\s*=/, type: "not" },
  { pattern: /function\s+\w+\(.*\)\s*$/, type: "not" },
  // Ruby
  { pattern: /def\s+\w+/, type: "not" },
  // Python
  { pattern: /def\s+\w+\(/, type: "not" },
  // Markdown heading
  { pattern: /^##/, type: "not" },
  // YAML key: value (value is lowercase word, no code constructs)
  { pattern: /^\s*[a-z]\w*:\s+[a-z][a-zA-Z0-9_]*$/, type: "not" },
  // HTML tags — penalizes when JS has embedded HTML (uppercase = TSX generics, skip)
  { pattern: /(?:^|\s)<\/?[a-z][a-z0-9]*(\s+[a-z-]+=\s*['"][^'"]*['"]|\s*\/?>)/, type: "not" },
];
