import {
	CJK_FONT_NAME_ALIASES,
	buildCjkAvailableFonts,
	isCjkFontName
} from '../subtitleCjkFontNames';

describe('subtitleCjkFontNames', () => {
	it('exposes a frozen, lowercase, non-empty alias list', () => {
		expect(CJK_FONT_NAME_ALIASES.length).toBeGreaterThan(20);
		expect(Object.isFrozen(CJK_FONT_NAME_ALIASES)).toBe(true);
		CJK_FONT_NAME_ALIASES.forEach((alias) => {
			expect(typeof alias).toBe('string');
			expect(alias).toBe(alias.trim().toLowerCase());
			expect(alias.length).toBeGreaterThan(0);
		});
	});

	it('covers the most common Han / CJK font names found in ASS files', () => {
		// Each of these is a font name we have actually seen referenced
		// in ASS subtitle files in the wild. If any of these is removed
		// from the alias list the fallback to Museo Sans will produce
		// tofu boxes for those characters.
		const expectedAliases = [
			'noto sans cjk sc',
			'noto sans cjk tc',
			'noto sans cjk jp',
			'noto sans cjk kr',
			'noto sans sc',
			'noto sans tc',
			'noto sans cjk',
			'source han sans cn',
			'source han sans sc',
			'source han sans tc',
			'source han serif sc',
			'microsoft yahei',
			'microsoft yahei ui',
			'microsoft jhenghei',
			'microsoft jhenghei ui',
			'simhei',
			'simsun',
			'simkai',
			'simfang',
			'kaiti',
			'songti',
			'fangsong',
			'pingfang sc',
			'pingfang tc',
			'pingfang',
			'hiragino sans gb',
			'stheiti',
			'stsong',
			'stkaiti',
			'pmingliu',
			'mingliu',
			'dfkai-sb',
			'droid sans fallback',
			'wenquanyi micro hei',
			'wenquanyi zen hei',
			'hyqihei',
			'dengxian'
		];
		expectedAliases.forEach((alias) => {
			expect(CJK_FONT_NAME_ALIASES).toContain(alias);
		});
	});

	it('does not include Latin fallback fonts in the CJK alias list', () => {
		// Latin-style font names are intentionally absent from the CJK
		// alias list because the libass-wasm adapter now uses the
		// bundled Noto Sans SC (which ships a Latin subset) as the
		// renderer fallback font. Adding Latin aliases here would just
		// make vailableFonts larger without changing the rendered
		// font.
		const latinAliases = ['arial', 'helvetica', 'sans-serif', 'museo sans', 'roboto'];
		latinAliases.forEach((alias) => {
			expect(CJK_FONT_NAME_ALIASES).not.toContain(alias);
		});
	});

	it('isCjkFontName matches via the same trim/lowercase rule libass and JASSUB use', () => {
		expect(isCjkFontName('Noto Sans SC')).toBe(true);
		expect(isCjkFontName('  microsoft yahei  ')).toBe(true);
		expect(isCjkFontName('Source Han Sans CN')).toBe(true);
		expect(isCjkFontName('Microsoft JhengHei UI')).toBe(true);
		expect(isCjkFontName('SimHei')).toBe(true);
		// Latin-only fonts must not be reported as CJK.
		expect(isCjkFontName('Arial')).toBe(false);
		expect(isCjkFontName('Museo Sans')).toBe(false);
		expect(isCjkFontName('')).toBe(false);
		expect(isCjkFontName(null)).toBe(false);
		expect(isCjkFontName(undefined)).toBe(false);
	});

	it('buildCjkAvailableFonts maps every alias to the supplied CJK font URL', () => {
		const map = buildCjkAvailableFonts('breezyfin-subtitle-cjk.otf');
		expect(Object.keys(map).length).toBe(CJK_FONT_NAME_ALIASES.length);
		Object.entries(map).forEach(([alias, url]) => {
			expect(alias).toBe(alias.toLowerCase().trim());
			expect(url).toBe('breezyfin-subtitle-cjk.otf');
		});
	});
});
