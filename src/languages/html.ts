import type { LanguagePattern } from "../types";

export const HTML: LanguagePattern[] = [
  { pattern: /<!DOCTYPE (html|HTML PUBLIC .+)>/, type: "meta.module", nearTop: true },
  // Tags - matches <tagname> and </tagname>
  { pattern: /<\/?[a-zA-Z][a-zA-Z0-9]*(\s+[a-zA-Z-]+=("|')[^"']*("|'))*\s*\/?>/, type: "keyword" },
  // Comments
  { pattern: /<!--(.*)(-->)?/, type: "comment.block" },
  // Properties
  { pattern: /[a-zA-Z-]+=("|')[^"']*("|')/g, type: "keyword.other" },
  // PHP tag
  { pattern: /<\?php/, type: "not" },
];
