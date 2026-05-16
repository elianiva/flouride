import { test, expect } from "vite-plus/test";
import detectLang from "../src/index";

test("should detect Unknown", () => {
  expect(detectLang("Hello world!").language).toEqual("Unknown");
});

test("should detect Unknown", () => {
  expect(detectLang("ooga booga").language).toEqual("Unknown");
});

test("should not gives unknown", () => {
  expect(detectLang("a very random text", { noUnknown: true }).language).toEqual("");
});
