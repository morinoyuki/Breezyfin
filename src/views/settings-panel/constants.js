import {HOME_ROW_ORDER} from '../../constants/homeRows';
import {ASS_SUBTITLE_RENDERERS} from '../../utils/assSubtitleRenderers';
import {BITMAP_SUBTITLE_RENDERERS} from '../../utils/bitmapSubtitleRenderers';

export {
	SUBTITLE_OVERLAY_FONT_SIZE_RANGE,
	SUBTITLE_OVERLAY_OUTLINE_SIZE_LEGACY_PX,
	SUBTITLE_OVERLAY_OUTLINE_SIZE_RANGE,
	SUBTITLE_OVERLAY_SIZE_LEGACY_PX
} from '../../utils/subtitleAppearance';

export const DEFAULT_SETTINGS = {
	maxBitrate: '100',
	enableTranscoding: true,
	forceTranscoding: false,
	smartSubtitleTranscoding: true,
	enableSubtitleBurnIn: true,
	forceTranscodingWithSubtitles: false,
	assSubtitleRenderer: 'auto',
	bitmapSubtitleRenderer: 'auto',
	subtitleBurnInTextCodecs: ['ass', 'ssa'],
	subtitleOverlaySize: 'medium',
	subtitleOverlayFontSizePx: '36',
	subtitleOverlayPosition: 'standard',
	subtitleOverlayBackground: 'none',
	subtitleOverlayWeight: 'bold',
	subtitleOverlayTextColor: 'white',
	subtitleOverlayBorderStyle: 'outline',
	subtitleOverlayBorderColor: 'black',
	subtitleOverlayBorderStrength: 'medium',
	subtitleOverlayOutlineSize: 'medium',
	subtitleOverlayOutlineSizePx: '2',
	subtitleOverlayShadowDistance: 'medium',
	subtitleOverlayShadowAngle: 'down',
	relaxedPlaybackProfile: false,
	preferredAudioLanguage: 'eng',
	preferredSubtitleLanguage: 'eng',
	disableAnimations: true,
	disableAllAnimations: false,
	screensaverTimeoutMinutes: '1',
	showMediaBar: true,
	navbarTheme: 'elegant',
	autoPlayNext: true,
	showPlayNextPrompt: true,
	playNextPromptMode: 'segmentsOrLast60',
	skipIntro: true,
	capabilityProbeRefreshDays: '30',
	showBackdrops: true,
	showSeasonImages: false,
	useSidewaysEpisodeList: true,
	showPerformanceOverlay: false,
	showExtendedPlayerDebugOverlay: false,
	showFocusDebugOverlay: false,
	showDebugErrorMenu: false,
	enableDiagnostics: false,
	verboseAppLogs: false,
	forceDolbyVision: false,
	enableFmp4HlsContainerPreference: false,
	forceFmp4HlsContainerPreference: false,
	homeRows: {
		recentlyAdded: true,
		continueWatching: true,
		nextUp: true,
		latestMovies: true,
		latestShows: true,
		myRequests: true
	},
	homeRowOrder: HOME_ROW_ORDER
};

export const BITRATE_OPTIONS = [
	{value: '10', label: '10 Mbps'},
	{value: '20', label: '20 Mbps'},
	{value: '40', label: '40 Mbps'},
	{value: '60', label: '60 Mbps'},
	{value: '80', label: '80 Mbps'},
	{value: '100', label: '100 Mbps（默认）'},
	{value: '120', label: '120 Mbps'}
];

export const LANGUAGE_OPTIONS = [
	{value: 'eng', label: '英语'},
	{value: 'spa', label: '西班牙语'},
	{value: 'fre', label: '法语'},
	{value: 'ger', label: '德语'},
	{value: 'ita', label: '意大利语'},
	{value: 'jpn', label: '日语'},
	{value: 'kor', label: '韩语'},
	{value: 'chi', label: '中文'},
	{value: 'por', label: '葡萄牙语'},
	{value: 'rus', label: '俄语'}
];

export const NAVBAR_THEME_OPTIONS = [
	{value: 'classic', label: '经典'},
	{value: 'elegant', label: '典雅'}
];

export const SCREENSAVER_TIMEOUT_OPTIONS = [
	{value: 'off', label: '关'},
	{value: '1', label: '1 分钟（默认）'},
	{value: '3', label: '3 分钟'},
	{value: '5', label: '5 分钟'},
	{value: '10', label: '10 分钟'},
	{value: '15', label: '15 分钟'}
];

export const CAPABILITY_PROBE_REFRESH_OPTIONS = [
	{value: '7', label: '7 天'},
	{value: '14', label: '14 天'},
	{value: '30', label: '30 天（默认）'},
	{value: '60', label: '60 天'},
	{value: '90', label: '90 天'}
];

export const SUBTITLE_BURN_IN_TEXT_CODEC_OPTIONS = [
	{value: 'ass', label: 'ASS'},
	{value: 'ssa', label: 'SSA'},
	{value: 'srt', label: 'SRT/SubRip'},
	{value: 'webvtt', label: 'WebVTT'},
	{value: 'sami', label: 'SAMI/SMI'},
	{value: 'ttml', label: 'TTML/DFXP'}
];

export const ASS_SUBTITLE_RENDERER_STABLE_OPTIONS = [
	{value: ASS_SUBTITLE_RENDERERS.AUTO, label: '自动（Breezyfin 轻量）'},
	{value: ASS_SUBTITLE_RENDERERS.LIGHTWEIGHT, label: 'Breezyfin 轻量'},
	{value: ASS_SUBTITLE_RENDERERS.LIBASS, label: 'libass（实验性）'},
	{value: ASS_SUBTITLE_RENDERERS.LIBASS_MANUAL, label: 'libass 手动画布（实验性）'},
	{value: ASS_SUBTITLE_RENDERERS.JASSUB, label: 'JASSUB（实验性）'},
	{value: ASS_SUBTITLE_RENDERERS.JASSUB_MANUAL, label: 'JASSUB 手动画布（实验性）'},
	{value: ASS_SUBTITLE_RENDERERS.ASSJS, label: 'ASS.js（实验性）'},
	{value: ASS_SUBTITLE_RENDERERS.BURN_IN, label: '烧录'}
];

export const ASS_SUBTITLE_RENDERER_OPTIONS = ASS_SUBTITLE_RENDERER_STABLE_OPTIONS;

export const getAssSubtitleRendererOptions = () => ASS_SUBTITLE_RENDERER_OPTIONS;

export const BITMAP_SUBTITLE_RENDERER_OPTIONS = [
	{value: BITMAP_SUBTITLE_RENDERERS.AUTO, label: '自动（libbitsub 优先）'},
	{value: BITMAP_SUBTITLE_RENDERERS.LIBBITSUB, label: 'libbitsub（实验性）'},
	{value: BITMAP_SUBTITLE_RENDERERS.LIBPGS, label: 'libpgs（实验性）'},
	{value: BITMAP_SUBTITLE_RENDERERS.BURN_IN, label: '烧录'}
];

export const SUBTITLE_OVERLAY_SIZE_OPTIONS = [
	{value: 'small', label: '小'},
	{value: 'medium', label: '中等（默认）'},
	{value: 'large', label: '大'}
];

export const SUBTITLE_OVERLAY_POSITION_OPTIONS = [
	{value: 'low', label: '低'},
	{value: 'standard', label: '标准（默认）'},
	{value: 'raised', label: '凸起'}
];

export const SUBTITLE_OVERLAY_BACKGROUND_OPTIONS = [
	{value: 'none', label: '无（默认）'},
	{value: 'low', label: '低'},
	{value: 'medium', label: '中等'},
	{value: 'high', label: '高'}
];

export const SUBTITLE_OVERLAY_WEIGHT_OPTIONS = [
	{value: 'regular', label: '常规'},
	{value: 'bold', label: '粗体（默认）'},
	{value: 'black', label: '黑色'}
];

export const SUBTITLE_OVERLAY_TEXT_COLOR_OPTIONS = [
	{value: 'white', label: '白色（默认）'},
	{value: 'warmWhite', label: '暖白'},
	{value: 'yellow', label: '黄色'},
	{value: 'black', label: '黑色'}
];

export const SUBTITLE_OVERLAY_BORDER_STYLE_OPTIONS = [
	{value: 'none', label: '无'},
	{value: 'shadow', label: '阴影'},
	{value: 'outline', label: '描边（默认）'},
	{value: 'box', label: '方框'}
];

export const SUBTITLE_OVERLAY_BORDER_COLOR_OPTIONS = [
	{value: 'black', label: '黑色（默认）'},
	{value: 'white', label: '白色'},
	{value: 'yellow', label: '黄色'},
	{value: 'accent', label: '主题强调色'}
];

export const SUBTITLE_OVERLAY_BORDER_STRENGTH_OPTIONS = [
	{value: 'low', label: '低'},
	{value: 'medium', label: '中等（默认）'},
	{value: 'high', label: '高'}
];

export const SUBTITLE_OVERLAY_OUTLINE_SIZE_OPTIONS = [
	{value: 'thin', label: '细'},
	{value: 'medium', label: '中等（默认）'},
	{value: 'thick', label: '粗'},
	{value: 'extra', label: '极粗'}
];

export const SUBTITLE_OVERLAY_SHADOW_DISTANCE_OPTIONS = [
	{value: 'low', label: '低'},
	{value: 'medium', label: '中等（默认）'},
	{value: 'high', label: '高'},
	{value: 'extra', label: '极粗'}
];

export const SUBTITLE_OVERLAY_SHADOW_ANGLE_OPTIONS = [
	{value: 'down', label: '下方（默认）'},
	{value: 'downRight', label: '右下'},
	{value: 'downLeft', label: '左下'},
	{value: 'upRight', label: '右上'},
	{value: 'upLeft', label: '左上'}
];

export const SETTINGS_DISCLOSURE_KEYS = {
	BITRATE: 'bitratePopup',
	CAPABILITY_PROBE_REFRESH: 'capabilityProbeRefreshPopup',
	AUDIO_LANGUAGE: 'audioLanguagePopup',
	SUBTITLE_LANGUAGE: 'subtitleLanguagePopup',
	ASS_SUBTITLE_RENDERER: 'assSubtitleRendererPopup',
	BITMAP_SUBTITLE_RENDERER: 'bitmapSubtitleRendererPopup',
	SUBTITLE_BURN_IN_TEXT_CODECS: 'subtitleBurnInTextCodecsPopup',
	SUBTITLE_OVERLAY_SIZE: 'subtitleOverlaySizePopup',
	SUBTITLE_OVERLAY_POSITION: 'subtitleOverlayPositionPopup',
	SUBTITLE_OVERLAY_BACKGROUND: 'subtitleOverlayBackgroundPopup',
	SUBTITLE_OVERLAY_WEIGHT: 'subtitleOverlayWeightPopup',
	SUBTITLE_OVERLAY_TEXT_COLOR: 'subtitleOverlayTextColorPopup',
	SUBTITLE_OVERLAY_BORDER_STYLE: 'subtitleOverlayBorderStylePopup',
	SUBTITLE_OVERLAY_BORDER_COLOR: 'subtitleOverlayBorderColorPopup',
	SUBTITLE_OVERLAY_BORDER_STRENGTH: 'subtitleOverlayBorderStrengthPopup',
	SUBTITLE_OVERLAY_OUTLINE_SIZE: 'subtitleOverlayOutlineSizePopup',
	SUBTITLE_OVERLAY_SHADOW_DISTANCE: 'subtitleOverlayShadowDistancePopup',
	SUBTITLE_OVERLAY_SHADOW_ANGLE: 'subtitleOverlayShadowAnglePopup',
	NAVBAR_THEME: 'navbarThemePopup',
	SCREENSAVER_TIMEOUT: 'screensaverTimeoutPopup',
	PLAY_NEXT_PROMPT_MODE: 'playNextPromptModePopup',
	LOGOUT_CONFIRM: 'logoutConfirmPopup',
	LOGS: 'logsPopup',
	WIPE_CACHE_CONFIRM: 'wipeCacheConfirmPopup'
};

export const SETTINGS_DISCLOSURE_KEY_LIST = [
	SETTINGS_DISCLOSURE_KEYS.BITRATE,
	SETTINGS_DISCLOSURE_KEYS.CAPABILITY_PROBE_REFRESH,
	SETTINGS_DISCLOSURE_KEYS.AUDIO_LANGUAGE,
	SETTINGS_DISCLOSURE_KEYS.SUBTITLE_LANGUAGE,
	SETTINGS_DISCLOSURE_KEYS.ASS_SUBTITLE_RENDERER,
	SETTINGS_DISCLOSURE_KEYS.BITMAP_SUBTITLE_RENDERER,
	SETTINGS_DISCLOSURE_KEYS.SUBTITLE_BURN_IN_TEXT_CODECS,
	SETTINGS_DISCLOSURE_KEYS.SUBTITLE_OVERLAY_SIZE,
	SETTINGS_DISCLOSURE_KEYS.SUBTITLE_OVERLAY_POSITION,
	SETTINGS_DISCLOSURE_KEYS.SUBTITLE_OVERLAY_BACKGROUND,
	SETTINGS_DISCLOSURE_KEYS.SUBTITLE_OVERLAY_WEIGHT,
	SETTINGS_DISCLOSURE_KEYS.SUBTITLE_OVERLAY_TEXT_COLOR,
	SETTINGS_DISCLOSURE_KEYS.SUBTITLE_OVERLAY_BORDER_STYLE,
	SETTINGS_DISCLOSURE_KEYS.SUBTITLE_OVERLAY_BORDER_COLOR,
	SETTINGS_DISCLOSURE_KEYS.SUBTITLE_OVERLAY_BORDER_STRENGTH,
	SETTINGS_DISCLOSURE_KEYS.SUBTITLE_OVERLAY_OUTLINE_SIZE,
	SETTINGS_DISCLOSURE_KEYS.SUBTITLE_OVERLAY_SHADOW_DISTANCE,
	SETTINGS_DISCLOSURE_KEYS.SUBTITLE_OVERLAY_SHADOW_ANGLE,
	SETTINGS_DISCLOSURE_KEYS.NAVBAR_THEME,
	SETTINGS_DISCLOSURE_KEYS.SCREENSAVER_TIMEOUT,
	SETTINGS_DISCLOSURE_KEYS.PLAY_NEXT_PROMPT_MODE,
	SETTINGS_DISCLOSURE_KEYS.LOGOUT_CONFIRM,
	SETTINGS_DISCLOSURE_KEYS.LOGS,
	SETTINGS_DISCLOSURE_KEYS.WIPE_CACHE_CONFIRM
];

export const INITIAL_SETTINGS_DISCLOSURES = {
	[SETTINGS_DISCLOSURE_KEYS.BITRATE]: false,
	[SETTINGS_DISCLOSURE_KEYS.CAPABILITY_PROBE_REFRESH]: false,
	[SETTINGS_DISCLOSURE_KEYS.AUDIO_LANGUAGE]: false,
	[SETTINGS_DISCLOSURE_KEYS.SUBTITLE_LANGUAGE]: false,
	[SETTINGS_DISCLOSURE_KEYS.ASS_SUBTITLE_RENDERER]: false,
	[SETTINGS_DISCLOSURE_KEYS.BITMAP_SUBTITLE_RENDERER]: false,
	[SETTINGS_DISCLOSURE_KEYS.SUBTITLE_BURN_IN_TEXT_CODECS]: false,
	[SETTINGS_DISCLOSURE_KEYS.SUBTITLE_OVERLAY_SIZE]: false,
	[SETTINGS_DISCLOSURE_KEYS.SUBTITLE_OVERLAY_POSITION]: false,
	[SETTINGS_DISCLOSURE_KEYS.SUBTITLE_OVERLAY_BACKGROUND]: false,
	[SETTINGS_DISCLOSURE_KEYS.SUBTITLE_OVERLAY_WEIGHT]: false,
	[SETTINGS_DISCLOSURE_KEYS.SUBTITLE_OVERLAY_TEXT_COLOR]: false,
	[SETTINGS_DISCLOSURE_KEYS.SUBTITLE_OVERLAY_BORDER_STYLE]: false,
	[SETTINGS_DISCLOSURE_KEYS.SUBTITLE_OVERLAY_BORDER_COLOR]: false,
	[SETTINGS_DISCLOSURE_KEYS.SUBTITLE_OVERLAY_BORDER_STRENGTH]: false,
	[SETTINGS_DISCLOSURE_KEYS.SUBTITLE_OVERLAY_OUTLINE_SIZE]: false,
	[SETTINGS_DISCLOSURE_KEYS.SUBTITLE_OVERLAY_SHADOW_DISTANCE]: false,
	[SETTINGS_DISCLOSURE_KEYS.SUBTITLE_OVERLAY_SHADOW_ANGLE]: false,
	[SETTINGS_DISCLOSURE_KEYS.NAVBAR_THEME]: false,
	[SETTINGS_DISCLOSURE_KEYS.SCREENSAVER_TIMEOUT]: false,
	[SETTINGS_DISCLOSURE_KEYS.PLAY_NEXT_PROMPT_MODE]: false,
	[SETTINGS_DISCLOSURE_KEYS.LOGOUT_CONFIRM]: false,
	[SETTINGS_DISCLOSURE_KEYS.LOGS]: false,
	[SETTINGS_DISCLOSURE_KEYS.WIPE_CACHE_CONFIRM]: false
};

export const DISCLOSURE_BACK_PRIORITY = [
	SETTINGS_DISCLOSURE_KEYS.WIPE_CACHE_CONFIRM,
	SETTINGS_DISCLOSURE_KEYS.LOGS,
	SETTINGS_DISCLOSURE_KEYS.LOGOUT_CONFIRM,
	SETTINGS_DISCLOSURE_KEYS.PLAY_NEXT_PROMPT_MODE,
	SETTINGS_DISCLOSURE_KEYS.NAVBAR_THEME,
	SETTINGS_DISCLOSURE_KEYS.SCREENSAVER_TIMEOUT,
	SETTINGS_DISCLOSURE_KEYS.CAPABILITY_PROBE_REFRESH,
	SETTINGS_DISCLOSURE_KEYS.SUBTITLE_OVERLAY_SHADOW_ANGLE,
	SETTINGS_DISCLOSURE_KEYS.SUBTITLE_OVERLAY_SHADOW_DISTANCE,
	SETTINGS_DISCLOSURE_KEYS.SUBTITLE_OVERLAY_OUTLINE_SIZE,
	SETTINGS_DISCLOSURE_KEYS.SUBTITLE_OVERLAY_BORDER_STRENGTH,
	SETTINGS_DISCLOSURE_KEYS.SUBTITLE_OVERLAY_BORDER_COLOR,
	SETTINGS_DISCLOSURE_KEYS.SUBTITLE_OVERLAY_BORDER_STYLE,
	SETTINGS_DISCLOSURE_KEYS.SUBTITLE_OVERLAY_TEXT_COLOR,
	SETTINGS_DISCLOSURE_KEYS.SUBTITLE_OVERLAY_WEIGHT,
	SETTINGS_DISCLOSURE_KEYS.SUBTITLE_OVERLAY_BACKGROUND,
	SETTINGS_DISCLOSURE_KEYS.SUBTITLE_OVERLAY_POSITION,
	SETTINGS_DISCLOSURE_KEYS.SUBTITLE_OVERLAY_SIZE,
	SETTINGS_DISCLOSURE_KEYS.SUBTITLE_BURN_IN_TEXT_CODECS,
	SETTINGS_DISCLOSURE_KEYS.BITMAP_SUBTITLE_RENDERER,
	SETTINGS_DISCLOSURE_KEYS.ASS_SUBTITLE_RENDERER,
	SETTINGS_DISCLOSURE_KEYS.SUBTITLE_LANGUAGE,
	SETTINGS_DISCLOSURE_KEYS.AUDIO_LANGUAGE,
	SETTINGS_DISCLOSURE_KEYS.BITRATE
];

export const HOME_ROW_LABELS = {
	recentlyAdded: '最近添加',
	continueWatching: '继续观看',
	nextUp: '接下来播放',
	latestMovies: '最新电影',
	latestShows: '最新电视剧',
	myRequests: '我的请求',
	watchlist: '关注列表'
};
