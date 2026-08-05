const fs = require('fs');
const path = require('path');

const root = 'E:/Breezyfin/src';

const walk = (dir) => {
  const out = [];
  for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...walk(p));
    } else if (/\.(jsx?|mjs)$/.test(entry.name)) {
      if (/__tests__|\.test\.|\.spec\./.test(entry.name)) continue;
      out.push(p);
    }
  }
  return out;
};

const files = walk(root);
console.log('files:', files.length);

// Collect string literals (single + double quoted)
const counts = new Map();
for (const file of files) {
  const text = fs.readFileSync(file, 'utf8');
  const re = /['`]([^'"`\n]{2,80})['`]/g;
  let m;
  while ((m = re.exec(text))) {
    const s = m[1];
    if (!/[a-zA-Z]/.test(s)) continue;
    if (/^[A-Z0-9_]+$/.test(s)) continue; // constants
    if (/^https?:\/\//.test(s)) continue;
    if (/^[a-z-]+\.(png|jpg|svg|less|css|js)$/.test(s)) continue;
    if (/^[a-z]+\.[a-z]+\.[a-z]+$/.test(s)) continue;
    if (/^@?[a-z][a-zA-Z0-9_-]*$/.test(s) && /^[a-z]+$/.test(s)) continue; // identifiers
    if (/^[.#][\w-]+$/.test(s)) continue; // css selectors
    if (/^\$\{.*\}$/.test(s)) continue;
    if (/^\{\{.*\}\}$/.test(s)) continue;
    if (/^[A-Z][a-z]+[A-Z]/.test(s) && s.length < 25) continue; // camelCase identifiers
    counts.set(s, (counts.get(s) || 0) + 1);
  }
}

const sorted = [...counts.entries()].sort((a, b) => b[1] - a[1]);
sorted.slice(0, 200).forEach(([s, c]) => console.log(c + '\t' + s));
