// Lowercased ASS font names that should resolve to the bundled CJK fallback
// (Noto Sans SC) for both libass-wasm and JASSUB renderers. The keys are
// matched after libass/JASSUB normalise the Style font name and inline `\fn`
// override through `String#trim().toLowerCase()`, so keep every entry in
// lowercase here. The Latin-style "Arial/Helvetica/..." aliases stay on the
// Latin fallback font because they are commonly paired with non-CJK dialog
// and routing them to the CJK fallback would force a heavier font load.
export const CJK_FONT_NAME_ALIASES = Object.freeze([
	// Noto Sans CJK family (pan-CJK).
	'noto sans cjk',
	'noto sans cjk sc',
	'noto sans cjk tc',
	'noto sans cjk jp',
	'noto sans cjk kr',
	// Noto Sans SC / TC specific.
	'noto sans sc',
	'noto sans tc',
	// Noto Sans Mono CJK (used by a few subtitle authoring tools).
	'noto sans mono cjk sc',
	'noto sans mono cjk tc',
	// Noto Serif CJK (occasionally referenced by Japanese/Korean subs).
	'noto serif cjk sc',
	'noto serif cjk tc',
	'noto serif cjk jp',
	'noto serif cjk kr',
	// Source Han Sans / Noto Sans CJK aliases (思源黑体 / 思源黑體).
	'source han sans',
	'source han sans cn',
	'source han sans sc',
	'source han sans tc',
	'source han sans jp',
	'source han sans kr',
	// Source Han Serif (思源宋体).
	'source han serif',
	'source han serif sc',
	'source han serif cn',
	'source han serif tc',
	// Microsoft YaHei family (微软雅黑).
	'microsoft yahei',
	'microsoft yahei ui',
	'microsoft yahei light',
	'microsoftyahei',
	'msyh',
	// Microsoft JhengHei (微軟正黑體) Traditional Chinese.
	'microsoft jhenghei',
	'microsoft jhenghei ui',
	'msjh',
	// SimHei / SimSun / SimKai / SimFang (黑体/宋体/楷体/仿宋).
	'simhei',
	'simsun',
	'simkai',
	'simfang',
	'simyou',
	'simiyou',
	// Heiti / Kaiti / Songti / Fangsong (without "Sim" prefix).
	'heiti',
	'heiti sc',
	'heiti tc',
	'kaiti',
	'kaiti sc',
	'kaiti tc',
	'songti',
	'songti sc',
	'songti tc',
	'fangsong',
	'fangsong sc',
	'fangsong tc',
	// PingFang (苹方) - Apple system fonts, common in modern Chinese subs.
	'pingfang',
	'pingfang sc',
	'pingfang tc',
	'pingfang hk',
	// Hiragino Sans (冬青黑体 / ヒラギノ角ゴ).
	'hiragino sans gb',
	'hiragino sans',
	'hiragino kaku gothic pro',
	'hiragino kaku gothic std',
	'hiragino mincho pro',
	'hiragino mincho pron',
	// STHeiti / STSong / STKaiti / STFangsong (华文黑体/宋体/楷体/仿宋).
	'stheiti',
	'stheiti light',
	'stheiti medium',
	'stsong',
	'stsongti sc',
	'stsongti tc',
	'stkaiti',
	'stfangsong',
	// Microsoft MingLiU / DFKai-SB (新細明體/標楷體) Traditional Chinese.
	'pmingliu',
	'mingliu',
	'mingliu hkscs',
	'pmingliu hkscs',
	'dfkai-sb',
	// Droid Sans Fallback (common Android default font).
	'droid sans fallback',
	// WenQuanYi (文泉驿) Linux fonts.
	'wenquanyi micro hei',
	'wenquanyi zen hei',
	// HYQiHei and other Chinese commercial fonts.
	'hyqihei',
	// DengXian (等线) - Windows default for Simplified Chinese.
	'dengxian',
	'dengxian light'
]);

export const isCjkFontName = (fontName) => {
	if (typeof fontName !== 'string') return false;
	const normalized = fontName.trim().toLowerCase();
	if (!normalized) return false;
	return CJK_FONT_NAME_ALIASES.includes(normalized);
};

// Build the CJK portion of an ASS renderer availableFonts map. Each alias
// resolves to the supplied CJK font URL so both libass-wasm and JASSUB will
// load the bundled Noto Sans SC whenever the ASS references one of the names.
export const buildCjkAvailableFonts = (cjkFontUrl) => CJK_FONT_NAME_ALIASES.reduce((map, fontName) => {
	map[fontName] = cjkFontUrl;
	return map;
}, {});
