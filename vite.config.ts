import { defineConfig } from "vite-plus";

export default defineConfig({
  pack: {
    entry: ["src/index.ts"],
    format: {
      esm: {},
      cjs: {},
      iife: { minify: true },
      umd: { minify: true },
    },
    globalName: "flourite",
    dts: true,
    clean: true,
    target: "es2015",
  },
  test: {
    include: ["tests/**/*.test.ts"],
    benchmark: {
      include: ["benchmark/**/*.bench.ts"],
    },
  },
  staged: {
    "*": "vp check --fix",
  },
  fmt: {},
  lint: {
    options: {
      typeAware: true,
      typeCheck: true,
    },
  },
});
