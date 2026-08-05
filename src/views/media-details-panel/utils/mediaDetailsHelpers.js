const LANGUAGE_NAME_MAP = {
	eng: '英语',
	en: '英语',
	spa: '西班牙语',
	es: '西班牙语',
	fra: '法语',
	fr: '法语',
	deu: '德语',
	de: '德语',
	ita: '意大利语',
	it: '意大利语',
	jpn: '日语',
	ja: '日语',
	kor: '韩语',
	ko: '韩语',
	por: '葡萄牙语',
	pt: '葡萄牙语',
	rus: '俄语',
	ru: '俄语',
	ara: 'Arabic',
	ar: 'Arabic',
	zho: '中文',
	zh: '中文'
};

export const toLanguageDisplayName = (language) => {
	if (!language) return '未知';
	const normalized = String(language).trim().toLowerCase();
	if (!normalized) return '未知';
	if (LANGUAGE_NAME_MAP[normalized]) return LANGUAGE_NAME_MAP[normalized];
	if (normalized.length === 2 || normalized.length === 3) {
		return normalized.toUpperCase();
	}
	return String(language);
};

export const getTrackSummaryLabel = (tracks, selectedTrackKey, options = {}) => {
	const {noneKey = null, noneLabel = '无', defaultLabel = '默认'} = options;
	if (selectedTrackKey === noneKey) return noneLabel;
	const track = Array.isArray(tracks)
		? tracks.find((entry) => entry?.key === selectedTrackKey)
		: null;
	return track?.summary || defaultLabel;
};

export const getSeasonImageUrl = (season, item, imageApi) => {
	if (!imageApi) return '';
	if (season?.ImageTags?.Primary) {
		return imageApi.getImageUrl(season.Id, 'Primary', 360);
	}
	if (season?.ImageTags?.Thumb) {
		return imageApi.getImageUrl(season.Id, 'Thumb', 360);
	}
	if (Array.isArray(item?.BackdropImageTags) && item.BackdropImageTags.length > 0) {
		return imageApi.getBackdropUrl(item.Id, 0, 640);
	}
	if (item?.ImageTags?.Primary) {
		return imageApi.getImageUrl(item.Id, 'Primary', 360);
	}
	return '';
};

export const getEpisodeImageUrl = (episode, item, imageApi) => {
	if (!imageApi) return '';
	if (episode?.ImageTags?.Primary) {
		return imageApi.getImageUrl(episode.Id, 'Primary', 760);
	}
	if (episode?.ImageTags?.Thumb) {
		return imageApi.getImageUrl(episode.Id, 'Thumb', 760);
	}
	if (episode?.SeriesId) {
		return imageApi.getBackdropUrl(episode.SeriesId, 0, 960);
	}
	if (Array.isArray(item?.BackdropImageTags) && item.BackdropImageTags.length > 0) {
		return imageApi.getBackdropUrl(item.Id, 0, 960);
	}
	if (item?.ImageTags?.Primary) {
		return imageApi.getImageUrl(item.Id, 'Primary', 760);
	}
	return '';
};

const toEpisodeBadge = (episode, fallback = '?') => {
	const season = Number.isInteger(episode?.ParentIndexNumber)
		? episode.ParentIndexNumber
		: fallback;
	const ep = Number.isInteger(episode?.IndexNumber)
		? episode.IndexNumber
		: fallback;
	return `S${season}E${ep}`;
};

export const getEpisodeBadge = (episode) => {
	return toEpisodeBadge(episode, '?');
};

export const getEpisodeActionBadge = (episode) => {
	if (!Number.isInteger(episode?.ParentIndexNumber) || !Number.isInteger(episode?.IndexNumber)) {
		return '';
	}
	return toEpisodeBadge(episode, '');
};

export const getEpisodeAirDate = (episode) => {
	if (!episode?.PremiereDate) return '';
	const parsed = new Date(episode.PremiereDate);
	if (Number.isNaN(parsed.getTime())) return '';
	return parsed.toLocaleDateString(undefined, {month: 'short', day: 'numeric', year: 'numeric'});
};

export const getEpisodeRuntime = (episode) => {
	if (!episode?.RunTimeTicks) return '';
	return `${Math.floor(episode.RunTimeTicks / 600000000)} min`;
};

export const isEpisodeInProgress = (episode) => {
	if (!episode?.UserData) return false;
	if ((episode.UserData.PlaybackPositionTicks || 0) > 0) return true;
	const percentage = episode.UserData.PlayedPercentage || 0;
	return percentage > 0 && percentage < 100;
};

export const isEpisodePlayed = (episode) => {
	if (!episode?.UserData) return false;
	if (episode.UserData.Played === true) return true;
	return (episode.UserData.PlayedPercentage || 0) >= 100;
};

export const withItemPlayedState = (item, itemId, played) => {
	if (!item || String(item.Id) !== String(itemId)) return item;
	return {
		...item,
		UserData: {
			...(item.UserData || {}),
			Played: played === true,
			PlayedPercentage: played === true ? 100 : 0
		}
	};
};

export const updateItemsPlayedState = (items, itemId, played) => (
	Array.isArray(items)
		? items.map((entry) => withItemPlayedState(entry, itemId, played))
		: []
);
