# Changelog

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
