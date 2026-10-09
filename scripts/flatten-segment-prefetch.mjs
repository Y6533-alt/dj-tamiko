// Static export writes segment-prefetch payloads as `__next.<seg>/__PAGE__.txt`,
// but the client router requests `__next.<seg>.__PAGE__.txt` (it then falls back
// to index.txt, leaving a 404 in the console). Copy each file to the flat name.
import { copyFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const root = process.argv[2] ?? "out";
let copied = 0;

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (!statSync(full).isDirectory()) continue;
    if (name.startsWith("__next.")) {
      for (const file of readdirSync(full)) {
        if (statSync(join(full, file)).isFile()) {
          copyFileSync(join(full, file), join(dir, `${name}.${file}`));
          copied++;
        }
      }
    }
    walk(full);
  }
}

walk(root);
console.log(`flatten-segment-prefetch: ${copied} file(s) copied`);
