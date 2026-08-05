// Breezyfin frontend localization pass: English -> Simplified Chinese
// Run via: node .i18n/translate.js
const fs = require(`fs`);
const path = require(`path`);

const SRC = `E:/Breezyfin/src`;
const SKIP_FILE_RE = /__tests__|\.test\.|\.spec\./;
const SKIP_DIRS = new Set([`__tests__`, `__mocks__`]);

// Keys that collide with technical identifiers (Jellyfin stream types, PlayMethod values,
// setting value identifiers). Translated UI labels in these contexts are accepted as
// remaining English to avoid breaking runtime comparisons.
const EXCLUDED_KEYS = new Set([`Audio`, `Video`, `Subtitle`, `Channels`, `Channel`, `Source`, `Stream`, `Track`, `Transcode`, `Direct Play`, `Direct Stream`, `Force Transcoding`, `Container`, `Codec`, `Format`, `Resolution`, `Bitrate`, `Volume`, `Quality`, `Discovery`, `MyRequests`, `JellyfinItems`, `Director`, `Writer`, `Genre`, `Status`, `Info`, `Showing`, `Showing next`]);

// Per-file overrides: skip these files entirely (too risky or already-correct content).
const SKIP_FILES = new Set([
  `src/services/jellyfin/homeSectionsApi.js`,
  `src/services/jellyfin/playbackProfileBuilder.js`,
  `src/services/jellyfin/playbackApi.js`,
  `src/services/jellyfin/playback-api/dolbyVision.js`,
  `src/services/jellyfin/playback-api/sourceNegotiation.js`,
  `src/services/jellyfin/playback-api/subtitleBurnIn.js`,
  `src/services/jellyfin/playback-api/subtitlePolicy.js`,
  `src/services/jellyfin/playback-api/playbackSafety.js`,
  `src/services/jellyfin/playback-api/requestDebug.js`,
  `src/services/jellyfin/playback-api/errors.js`,
  `src/services/testUtils/playbackFixtures.js`,
  `src/utils/playbackSelection.js`,
  `src/utils/playbackDynamicRange.js`,
  `src/utils/mediaItemUtils.js`,
  `src/utils/mediaFilters.js`,
  `src/utils/assSubtitleRenderers.js`,
  `src/utils/bitmapSubtitleRenderers.js`,
  `src/utils/subtitleAppearance.js`,
  `src/utils/errorMessages.js`,
  `src/utils/platform-capabilities/playbackSnapshot.js`,
  `src/constants/homeSections.js`,
  `src/constants/homeRows.js`,
  `src/constants/session.js`,
  `src/constants/toast.js`,
  `src/App/hooks/useAppSyncPlayCoordinator.js`
]);

const TX_RAW = require(`./tx.json`);
const TX = {};
for (const [k, v] of Object.entries(TX_RAW)) {
  if (k === `meta`) continue;
  if (v && typeof v === `object`) Object.assign(TX, v);
  else TX[k] = v;
}
console.log(`loaded`, Object.keys(TX).length, `translation keys`);

const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, `\\$&`);

const walk = (dir) => {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) continue;
      out.push(...walk(p));
    } else if (/\.(jsx?|mjs)$/.test(entry.name)) {
      if (SKIP_FILE_RE.test(entry.name)) continue;
      out.push(p);
    }
  }
  return out;
};

const files = walk(SRC);
console.log(`scanning`, files.length, `files`);

const keys = Object.keys(TX)
  .filter((k) => !EXCLUDED_KEYS.has(k))
  .sort((a, b) => b.length - a.length);
const precompiled = keys.map((k) => {
  const escaped = escapeRe(k);
  const val = TX[k];
  const dq = new RegExp(`"` + escaped + `"`, `g`);
  const sq = new RegExp(`'` + escaped + `'`, `g`);
      const jsx = new RegExp(`>\\s*` + escaped + `\\s*<`, `g`);
  return { key: k, val, dq, sq, jsx };
});
console.log(`active keys after exclusions:`, precompiled.length);

let totalFilesChanged = 0;
let totalSubs = 0;
const touchedFiles = [];
const perKeyStats = new Map();
const skippedFileReasons = [];

for (const file of files) {
  const rel = path.relative(`E:/Breezyfin`, file).replace(/\\/g, `/`);
  if (SKIP_FILES.has(rel)) {
    skippedFileReasons.push(rel);
    continue;
  }
  let text = fs.readFileSync(file, `utf8`);
  let fileSubs = 0;

  for (const { key, val, dq, sq, jsx } of precompiled) {
    text = text.replace(dq, () => { fileSubs++; perKeyStats.set(key, (perKeyStats.get(key) || 0) + 1); return `"` + val + `"`; });
    text = text.replace(sq, () => { fileSubs++; perKeyStats.set(key, (perKeyStats.get(key) || 0) + 1); return `'` + val + `'`; });
    text = text.replace(jsx, (matched) => { fileSubs++; perKeyStats.set(key, (perKeyStats.get(key) || 0) + 1); return matched.replace(key, val); });
  }

  if (fileSubs > 0) {
    fs.writeFileSync(file, text, `utf8`);
    totalFilesChanged++;
    totalSubs += fileSubs;
    touchedFiles.push(rel + ` (` + fileSubs + `)`);
  }
}

console.log(`done. files changed:`, totalFilesChanged, `substitutions:`, totalSubs);
console.log(`files skipped (per-file overrides):`, skippedFileReasons.length);
console.log(`touched files:`);
touchedFiles.sort().forEach((f) => console.log(`  ` + f));
console.log(`top translated keys:`);
[...perKeyStats.entries()].sort((a, b) => b[1] - a[1]).slice(0, 60).forEach(([k, n]) => console.log(`  `, n, `\t`, k));