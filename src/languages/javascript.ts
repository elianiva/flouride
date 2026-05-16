import type { LanguagePattern } from "../types";

// Core JS patterns — only patterns specific to JS/ES that don't broadly match other languages.
// Generic keywords (return, for, if, class, import, etc.) exist in too many languages and
// cause false positives. JS identification relies on idioms unique to the language.
export const JsCode: LanguagePattern[] = [
  // undefined keyword
  { pattern: /undefined/g, type: "keyword" },
  // window keyword
  { pattern: /window\./g, type: "keyword" },
  // console.log('ayy lmao')
  { pattern: /console\.log\s*\(/, type: "keyword.print" },
  // Variable declaration with assignment or semicolon (not just ": Type" from TS/Kotlin)
  { pattern: /(var|const|let)\s+\w+\s*[=;]/, type: "keyword.variable" },
  // Array/Object literal
  { pattern: /(('|").+('|")\s*|\w+):\s*[{[]/, type: "constant.array" },
  // === operator
  { pattern: /===/g, type: "keyword.operator" },
  // !== operator
  { pattern: /!==/g, type: "keyword.operator" },
  // Function definition (no return type annotation — that would be TS)
  { pattern: /function\*?\s*([A-Za-z$_][\w$]*)?\s*[(][^:;()]*[)]\s*{/g, type: "keyword.function" },
  // arrow function
  { pattern: /\([^)]*\)\s*=>\s*[{]/g, type: "keyword.function" },
  // arrow function without parens or single param wrapped in parens
  { pattern: /(?:\(\w+|\w+)\s*=>\s*[{]/g, type: "keyword.function" },
  // null/true/false keywords
  { pattern: /\b(?:null|true|false)\b/g, type: "constant.null" },
  // ESM import with string source: import ... from "..."
  // This is uniquely JS — Java/Python/Go use import without quotes or "from" keyword
  { pattern: /\bimport\s+(type\s+)?\{[^}]*\}\s+from\s+['"]/, type: "meta.import" },
  { pattern: /\bimport\s+\w+\s+from\s+['"]/, type: "meta.import" },
  // import() dynamic
  { pattern: /import\s*\(/, type: "meta.import" },
  // ESM export
  {
    pattern: /\bexport\s+(default|const|let|var|function|class|interface|type|enum|abstract|async)/,
    type: "meta.import",
  },
  { pattern: /\bexport\s+\{/, type: "meta.import" },
  // require()
  { pattern: /require\s*\(/, type: "meta.import" },
  // new keyword (with function call parens to avoid matching Java's `new ArrayList<>()` style generic)
  { pattern: /\bnew\s+\w+\s*\(/, type: "keyword" },
  // this/super
  { pattern: /\b(this|super)\b/, type: "keyword" },
  // class declaration
  { pattern: /\bclass\s+\w+/, type: "keyword" },
  // JS-only global objects (not present in Go/Rust)
  { pattern: /\bMath\./, type: "keyword" },
  { pattern: /\bJSON\./, type: "keyword" },
  { pattern: /\bprototype\./, type: "keyword" },
];

export const JsAntiPatterns: LanguagePattern[] = [
  // const enum / const assertions -- TS-only, penalize
  { pattern: /\bas\s+const\b/, type: "not" },
  { pattern: /\bconst\s+enum\b/, type: "not" },
  // C style variable declaration.
  {
    pattern: /(^|\s)(char|long|int|float|double|short|unsigned|signed|void|size_t)\s+\w+\s*=?/,
    type: "not",
  },
  // pointer
  { pattern: /\*\w+/, type: "not" },
  // HTML <script> tag
  { pattern: /<(\/)?script( type=('|")text\/javascript('|"))?>/, type: "not" },
  { pattern: /fn\s[A-Za-z0-9<>,]+\(.*\)\s->\s\w+(\s\{|)/, type: "not" },
  // Avoiding C# confusion
  { pattern: /Console\.(WriteLine|Write)(\s*)?\(/, type: "not" },
  { pattern: /(using\s)?System(\..*)?(;)?/, type: "not" },
  { pattern: /(func|fn)\s/, type: "not" },
  { pattern: /(begin|end)\n/, type: "not" },
  // Avoiding Lua confusion
  { pattern: /local\s(function|(\w+)\s=)/, type: "not" },
  // Avoiding Kotlin confusion
  { pattern: /fun main\((.*)?\) {/, type: "not" },
  { pattern: /(inline(\s+))?fun(\s+)([A-Za-z0-9_])(\s+)?\((.*)\)(\s+)({|=)/, type: "not" },
  { pattern: /(const)?(\s+)?val(\s+)(.*)(:(\s)(.*)(\?)?)?(\s+)=(\s+)/, type: "not" },
  // Avoiding Dart confusion
  { pattern: /^(void\s)?main()\s{/, type: "not" },
  // Markdown heading
  { pattern: /^##/, type: "not" },
  // YAML key: value (value is lowercase word, no code constructs)
  { pattern: /^\s*[a-z]\w*:\s+[a-z][a-zA-Z0-9_]*$/, type: "not" },
];

export const Javascript: LanguagePattern[] = [...JsCode, ...JsAntiPatterns];
