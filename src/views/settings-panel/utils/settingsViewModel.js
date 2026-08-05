export const SETTINGS_TABS = [
	{key: 'info', label: '信息'},
	{key: 'home', label: '主页'},
	{key: 'playback', label: '播放'},
	{key: 'subtitles', label: '字幕'},
	{key: 'display', label: '显示'},
	{key: 'about', label: '关于'},
	{key: 'diagnostics', label: '诊断'}
];

export const TAB_SECTION_KEYS = {
	info: ['serverInfo', 'savedServers', 'account'],
	home: ['homeRows'],
	playback: ['playback', 'transcoding'],
	subtitles: ['subtitles', 'subtitleAppearance'],
	display: ['display', 'languages'],
	about: ['about'],
	diagnostics: ['diagnostics', 'capabilities']
};

export const DEFAULT_SETTINGS_TAB_KEY = SETTINGS_TABS[0].key;

export const isSettingsTabKey = (tabKey) => (
	Object.prototype.hasOwnProperty.call(TAB_SECTION_KEYS, tabKey)
);

export const getSettingsSectionKeys = (tabKey) => (
	isSettingsTabKey(tabKey) ? TAB_SECTION_KEYS[tabKey] : TAB_SECTION_KEYS[DEFAULT_SETTINGS_TAB_KEY]
);

export const shouldRenderSettingsSection = (activeTabKey, sectionKey) => (
	getSettingsSectionKeys(activeTabKey).includes(sectionKey)
);

export const isSmartSubtitleHandlingEnabled = (settings = {}) => (
	settings.smartSubtitleTranscoding !== false
);

export const getAssSubtitleRendererControlState = (settings, enabledLabel) => {
	const enabled = isSmartSubtitleHandlingEnabled(settings);
	return {
		enabled,
		label: enabled ? enabledLabel : '手动模式'
	};
};

export const getBitmapSubtitleRendererControlState = (settings, enabledLabel) => {
	const enabled = isSmartSubtitleHandlingEnabled(settings);
	return {
		enabled,
		label: enabled ? enabledLabel : '手动模式'
	};
};

export const getSubtitleBurnInFormatsControlState = (settings, enabledLabel) => {
	if (isSmartSubtitleHandlingEnabled(settings)) {
		return {
			enabled: false,
			label: '由智能模式管理'
		};
	}
	return {
		enabled: true,
		label: settings?.enableSubtitleBurnIn === false ? '已禁用' : enabledLabel
	};
};

export const isSubtitleOptionSelected = (settings, settingKey, fallback, optionValue) => (
	(settings?.[settingKey] || fallback) === optionValue
);

export const isSubtitleBurnInCodecSelected = (settings, codec) => (
	(settings?.subtitleBurnInTextCodecs || []).includes(codec)
);

export const getWipeCacheConfirmCopy = (wipeCacheKeepLogin) => (
	wipeCacheKeepLogin ? {
		title: '清除缓存（保留登录）',
		message: '这将清除缓存和存储数据并刷新应用，同时保留已保存的登录会话。',
		actionLabel: '清除（保留登录）并刷新'
	} : {
		title: '清除应用缓存',
		message: '这将清除本地存储、会话存储、缓存存储和 IndexedDB，然后刷新应用。',
		actionLabel: '清除并刷新'
	}
);
