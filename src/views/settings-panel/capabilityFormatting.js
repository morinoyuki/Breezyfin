export const formatYesNoUnknown = (value) => {
	if (value === true) return '是';
	if (value === false) return '否';
	return '未知';
};

export const formatCapabilityTimestamp = (timestamp) => {
	if (!Number.isFinite(timestamp)) return '未知';
	try {
		return new Date(timestamp).toLocaleString();
	} catch (_) {
		return '未知';
	}
};

const AUDIO_CODEC_NAME_MAP = {
	pcm_s16le: 'PCM 16 位',
	pcm_s24le: 'PCM 24 位',
	eac3: 'EAC3',
	ac3: 'AC3',
	mp3: 'MP3',
	mp2: 'MP2',
	aac: 'AAC',
	opus: 'Opus',
	flac: 'FLAC'
};

export const formatAudioCodecName = (codec) => {
	const normalized = String(codec || '').trim().toLowerCase();
	if (!normalized) return '';
	if (AUDIO_CODEC_NAME_MAP[normalized]) return AUDIO_CODEC_NAME_MAP[normalized];
	return normalized.toUpperCase();
};

export const formatAudioCodecList = (audioCodecs) => {
	if (!Array.isArray(audioCodecs) || audioCodecs.length === 0) return '未知';
	const normalized = Array.from(new Set(audioCodecs.map(formatAudioCodecName).filter(Boolean)));
	return normalized.length > 0 ? normalized.join(', ') : '未知';
};

export const formatBitrateMbps = (value) => {
	const numeric = Number(value);
	if (!Number.isFinite(numeric) || numeric <= 0) return '未知';
	return `${Math.round(numeric / 1000000)} Mbps`;
};

export const createCapabilityProbeRefreshNormalizer = (options, fallbackValue) => {
	const optionValueSet = new Set((options || []).map((option) => String(option.value)));
	return (value) => {
		const normalized = String(value ?? '');
		if (optionValueSet.has(normalized)) return normalized;
		return String(fallbackValue ?? '');
	};
};
