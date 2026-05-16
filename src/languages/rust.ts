import type { LanguagePattern } from "../types";

export const Rust: LanguagePattern[] = [
  { pattern: /fn\s+main\(\)/, type: "keyword.function" },
  { pattern: /(pub\s+)?fn\s+[A-Za-z0-9_<>',]+\s*\([^)]*\)\s*(->\s*\w+(?:<[^>]+>)?)?\s*\{?/, type: "keyword.visibility" },
  { pattern: /let\s+(mut\s+)?\w+\s*([=:].*)?$/, type: "keyword.variable" },
  { pattern: /\w+!\([^)]*\)/, type: "macro" },
  { pattern: /use\s+\w+(::\w+)*(\s+as\s+\w+)?\s*;/, type: "meta.import" },
  { pattern: /\{:\?\}/, type: "keyword.other" },
  { pattern: /loop\s*\{/, type: "keyword.control" },
  // Rust keywords
  { pattern: /\b(impl|crate|extern|mod|trait|where|as)\b/, type: "keyword.other" },
  { pattern: /match\s+\S+\s*\{/, type: "keyword.control" },
  { pattern: /\w+\.len\(\)/, type: "keyword.other" },
  // Data types
  { pattern: /(&str|(i|u)(8|16|32|64|128|size))/, type: "constant.type" },
  // Vector
  { pattern: /\b(Vec|Option|Result|Box|HashMap|HashSet|String)\b/, type: "constant.type" },
  // Traits
  { pattern: /\b(Ok|Err|Some|None|ToOwned|Clone)\b/, type: "keyword.other" },
  // Panic!!
  { pattern: /panic!\(.*\)/, type: "keyword.function" },
  // Avoiding clash with C#
  { pattern: /using\sSystem/, type: "not" },
  { pattern: /Console\.WriteLine\s*\(/, type: "not" },
  { pattern: /(public\s)?((partial|static)\s)?class\s/, type: "not" },
  { pattern: /(function|func)\s/, type: "not" },
];
