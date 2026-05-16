import { test, expect } from "vite-plus/test";
import detectLang from "../src/index";

test("converted", () => {
  const node = "#!/usr/bin/env node";
  const nodelang = detectLang(node);
  expect(nodelang.language).toBe("Javascript");

  const python = "#!/usr/bin/env python3";
  const pythonlang = detectLang(python);
  expect(pythonlang.language).toBe("Python");

  const php = "#!/usr/bin/env php";
  const phplang = detectLang(php);
  expect(phplang.language).toBe("PHP");
});

test("random", () => {
  const lang = detectLang("#!/usr/bin/env ruby", { shiki: false });
  expect(lang.language).toBe("Ruby");
  const shiki = detectLang("#!/usr/bin/env ruby", { shiki: true });
  expect(shiki.language).toBe("ruby");
});

test("bash", () => {
  const shebang = "#!/bin/bash";
  const lang = detectLang(shebang);
  expect(lang.language).toBe("Bash");

  const shiki = detectLang(shebang, { shiki: true });
  expect(shiki.language).toBe("bash");
});

test("real world scenario", () => {
  const code = detectLang(`#!/usr/bin/env julia

repo = ""
directory = ""

if length(ARGS) >= 1 && ARGS[1] != ""
  if startswith(ARGS[1], "https://") || startswith(ARGS[1], "git@")
    repo = ARGS[1]
  elseif startswith(ARGS[1], "github:")
    repo = "git@github.com:" * chop(ARGS[1], head = 7, tail = 0)
  elseif startswith(ARGS[1], "gitlab:")
    repo = "git@gitlab.com:" * chop(ARGS[1], head = 7, tail = 0)
  elseif startswith(ARGS[1], "bitbucket:")
    repo = "git@bitbucket.org:" * chop(ARGS[1], head = 10, tail = 0)
  else
    repo = "git@github.com:" * ARGS[1]
  end
else
  println("Repository can't be empty!!!")
  exit(1)
end

if length(ARGS) > 1 && ARGS[2] != ""
  directory = ARGS[2]
else
  directory = split(repo, "/")[2]
end

run(\`git clone --depth=1 $repo $directory\`)
run(\`rm -rf $directory/.git\`)`);
  expect(code.language).toBe("Julia");
});
