const fs = require('fs');
const path = require('path');

const root = 'E:/Breezyfin/src';
const walk = (dir) => {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === '__tests__' || entry.name === '__mocks__') continue;
      out.push(...walk(p));
    } else if (/\.(jsx?|mjs)$/.test(entry.name)) {
      if (/__tests__|\.test\.|\.spec\./.test(entry.name)) continue;
      out.push(p);
    }
  }
  return out;
};

const files = walk(root);
const counts = new Map();
const locations = new Map();
const SKIP_PATTERNS = [
  /^[A-Z0-9_]+$/, /^[a-z]+\.[a-z]+/, /^\.\.?\//, /^[a-z-]+$/, /^https?:\/\//,
  /^[A-Z][a-zA-Z]+[A-Z]/, /^[a-z]+:[a-z]+/, /^[a-z]+-[a-z]+$/, /^#[0-9a-f]{3,8}$/i,
  /^[A-Za-z]+_[A-Za-z_]+$/, /^@/
];
const looksLikeUI = (s) => {
  if (s.length < 2 || s.length > 80) return false;
  if (!/[a-zA-Z]/.test(s)) return false;
  for (let i = 0; i < SKIP_PATTERNS.length; i++) if (SKIP_PATTERNS[i].test(s)) return false;
  const uiKeywords = /^(Loading|Save|Cancel|Confirm|OK|Yes|No|Back|Next|Previous|Add|Edit|Delete|Remove|Play|Pause|Stop|Resume|Close|Open|Show|Hide|Refresh|Retry|Search|Filter|Sort|Settings|Theme|Audio|Video|Subtitle|Language|Server|User|Login|Logout|Error|Warning|Info|Status|Default|Custom|Auto|Manual|On|Off|Library|Home|Watchlist|Favorites|Favorite|Mark|Watched|Continue|Latest|Recent|Discov|Detail|Play|Skip|Reset|Save|Apply|Capabilit|Diagnos|About|Help|Support|Account|Profile|Season|Episode|Movie|Series|Show|Overview|Plot|Cast|Studio|Genre|Year|Runtime|Duration|Size|Quality|Resolution|Bitrate|Format|Codec|Channels|Stereo|Multi|Dolby|HDR|HDR10|HLG|DV|EAC|AC|AAC|MP|FLAC|OPUS|Pcm|HEVC|H\.264|H\.265|AVC|VP|AV|WMV|MKV|MP4|TS|WEBM|M3U8|Master|Pass|Lock|Unlock|Require|Optional|Required|Enable|Disable|Login|Logout|Logout|Toggle|Reload|Quit|Exit|Confirm|Reload|Reopen|Reset|Reconnect|Verified|Unverified)/i;
  return uiKeywords.test(s) || (s.includes(' ') && /^[A-Z]/.test(s));
};

for (const file of files) {
  const text = fs.readFileSync(file, 'utf8');
  const re = /['"`]([A-Za-z0-9 ,.!?_:;()/\-+&@#$%^*'"<>{}|=]{2,80})['"`]/g;
  let m;
  while ((m = re.exec(text))) {
    const s = m[1];
    if (!looksLikeUI(s)) continue;
    counts.set(s, (counts.get(s) || 0) + 1);
    if (!locations.has(s)) locations.set(s, new Set());
    locations.get(s).add(file.replace(/^E:[\\\/]Breezyfin[\\\/]/, ''));
  }
}

const sorted = [...counts.entries()].sort((a, b) => b[1] - a[1]);
console.log('Total candidate UI strings:', sorted.length);
sorted.slice(0, 300).forEach(([s, c]) => {
  const loc = [...locations.get(s)].slice(0, 2).join(', ');
  console.log(c + '\t' + s + '\t@' + loc);
});
