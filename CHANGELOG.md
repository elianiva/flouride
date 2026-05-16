# Changelog

## [1.5.0] - 2026-05-16

### Added

- TypeScript detection for `import type { X }`, `import { type X, type Y }`, and `export type` syntax.
- TypeScript detection for `satisfies`, `keyof`, `infer`, type predicates (`is`), and `as const` / `const enum`.
- TypeScript derives from JS core patterns (`JsCode`) while excluding JS anti-patterns that penalize valid TS constructs.
- New JS detection patterns: ESM `import ... from`, `export`, `require()`, `Math.*`, `JSON.*`, `prototype.*`.
- New test cases for TypeScript: `import type`, `satisfies and keyof`, `as const and const enum`, `type predicate`.
- New test cases for JavaScript: `ESM import/export`, `require + module.exports`.
- Ruby `end` keyword detection (`^\s*end\s*$`).

### Changed

- Split JS patterns into `JsCode` (core) and `JsAntiPatterns` (penalties for other languages) for reuse by TypeScript.
- Tightened `var`/`const`/`let` pattern to require `=` or `;` — avoids matching Kotlin `var x: Type`.
- Made `new` pattern require `(` — avoids matching Java `new ArrayList<>()` generic syntax.
- ESM `import` now requires `from '...'` syntax — avoids matching Java/Python/Go imports.
- Fixed Ruby `class` pattern from `^class` to `^\s*class` to match indented class declarations.

### Fixed

- TypeScript false positives on Kotlin (via `fun` anti-pattern), YAML key-value lines, Markdown headings.
- JavaScript false positive on Go (gamma function) — added `Math.` pattern to break the tie.
- TypeScript no longer falsely detected on embedded HTML with JS code (added lowercase HTML tag anti-pattern that skips uppercase TSX generics like `<Props>`).
- Java `while` keyword no longer raises false `end` hits for Julia.

## [1.4.0] - 2026-05-16

### Changed

- Replaced `uvu` test runner with `vite-plus/test` across all test files. Assertions migrated from `assert.equal()` to `expect().toEqual()` and `assert.is()` to `expect().toBe()`.
- Switched from manual tsconfig build configuration to `vite.config.ts` using `vite-plus` pack format. Build now outputs ESM, CJS, IIFE, and UMD formats.
- Updated `tsconfig.json` to use `moduleResolution: "bundler"`, `isolatedDeclarations: true`, and `strict: true`.
- Migrated package manager from npm to pnpm.
- Formatted code with consistent string quotes, trailing commas, and import grouping.
- Bumped all dependency versions to latest compatible releases.
- Updated GitHub Actions CI versions and added coverage reporting.

### Fixed

- Overhauled language detection regexes across all 26 supported languages for improved accuracy.
- Removed problematic regex that caused false positives.
