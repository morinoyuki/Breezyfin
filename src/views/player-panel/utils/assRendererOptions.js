import {buildCjkAvailableFonts} from './subtitleCjkFontNames';

export const ASS_RENDERER_MODE = 'video-attached';
export const ASS_RENDERER_OPTIONS = Object.freeze({
	targetFps: 10,
	renderMode: 'js-blend',
	prescaleFactor: 1,
	maxRenderHeight: 0
});

// webOS TV webapps run inside a browser sandbox and cannot enumerate
// or reference the system fonts the shell provides to native apps.
// Without intervention, an ASS subtitle whose [V4+ Styles] section
// references a Latin-style font name (or any name not explicitly
// listed) routes to the Latin fallback font, which has no Han /
// kana / hangul glyphs. The text then renders as tofu boxes for any
// Chinese / Japanese / Korean dialogue. The bundled Noto Sans SC is
// a pan-CJK font that also ships a Latin subset, so using it as the
// libass-wasm `fallbackFont` makes every unmapped font name (Latin
// or otherwise) fall through to a font that can render both Latin
// and CJK glyphs. The explicit `availableFonts` aliases below still
// load Noto Sans SC for the most common Han / kana / hangul font
// names so the renderer can map them deterministically.
export const buildAssRendererOptions = (options, onError) => {
	const cjkFontUrl = 'breezyfin-subtitle-cjk.otf';
	return {
		...options,
		workerUrl: 'subtitles-octopus-worker.js',
		legacyWorkerUrl: 'subtitles-octopus-worker-legacy.js',
		fallbackFont: cjkFontUrl,
		availableFonts: {
			// CJK / Han fonts commonly referenced by ASS files: route
			// to the bundled Noto Sans SC (Latin + CJK glyphs). The
			// shared alias list keeps the libass and JASSUB renderers
			// in sync so an ASS file referencing e.g. `Source Han Sans
			// CN`, `Noto Sans CJK`, or `Microsoft JhengHei` resolves
			// the same way regardless of which renderer is selected.
			...buildCjkAvailableFonts(cjkFontUrl)
		},
		onError: onError || null,
		targetFps: ASS_RENDERER_OPTIONS.targetFps,
		renderMode: ASS_RENDERER_OPTIONS.renderMode,
		prescaleFactor: ASS_RENDERER_OPTIONS.prescaleFactor,
		maxRenderHeight: ASS_RENDERER_OPTIONS.maxRenderHeight,
		debug: false
	};
};

export const hasAssRendererCanvasParent = (videoElement) => {
	const parent = videoElement?.parentNode;
	if (!parent || typeof parent.querySelector !== 'function') return false;
	return Boolean(parent.querySelector('.libassjs-canvas-parent'));
};

const normalizeCanvasDebugOptions = (canvasDebugOptions) => {
	if (!canvasDebugOptions) {
		return {
			canvasElement: null,
			canvasMode: 'auto-sibling'
		};
	}
	if (canvasDebugOptions.nodeType) {
		return {
			canvasElement: canvasDebugOptions,
			canvasMode: 'caller-owned'
		};
	}
	return {
		canvasElement: canvasDebugOptions.canvasElement || null,
		canvasMode: canvasDebugOptions.canvasMode || (canvasDebugOptions.canvasElement ? 'caller-owned' : 'auto-sibling')
	};
};

export const getAssRendererDebugInfo = (videoElement, canvasDebugOptions = null) => {
	const {canvasMode} = normalizeCanvasDebugOptions(canvasDebugOptions);
	return {
		mode: ASS_RENDERER_MODE,
		renderMode: ASS_RENDERER_OPTIONS.renderMode,
		targetFps: ASS_RENDERER_OPTIONS.targetFps,
		prescaleFactor: ASS_RENDERER_OPTIONS.prescaleFactor,
		maxRenderHeight: ASS_RENDERER_OPTIONS.maxRenderHeight,
		canvasMode,
		canvasParent: hasAssRendererCanvasParent(videoElement) ? 'yes' : 'no'
	};
};
