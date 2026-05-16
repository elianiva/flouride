import { bench, describe } from "vitest";
import { readFileSync } from "node:fs";
import detectLang from "../src/index";

// https://github.com/curl/curl/blob/master/src/tool_main.c
const curl = readFileSync(new URL("./curl", import.meta.url), "utf-8");
// https://github.com/gin-gonic/gin/blob/master/gin.go
const gin = readFileSync(new URL("./gin", import.meta.url), "utf-8");

describe("curl library", () => {
  bench(
    "detect language",
    () => {
      detectLang(curl);
    },
    { iterations: 500 },
  );
});

describe("go gin", () => {
  bench(
    "detect language",
    () => {
      detectLang(gin);
    },
    {
      iterations: 500,
    },
  );
});
