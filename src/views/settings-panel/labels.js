import {HOME_ROW_LABELS} from './constants';

export const getOptionLabel = (options, value, fallback) => {
	const option = options.find((entry) => entry.value === value);
	return option ? option.label : fallback;
};

export const getHomeRowLabel = (rowKey) => {
	return HOME_ROW_LABELS[rowKey] || rowKey;
};

export const getPlayNextPromptModeLabel = (value) => {
	switch (value) {
		case 'segmentsOnly':
			return '仅片尾/演职员表';
		case 'segmentsOrLast60':
		default:
			return '分段或最后 60 秒';
	}
};

export const getCapabilityProbeRefreshLabel = (value) => {
	const days = Number(value);
	if (!Number.isFinite(days) || days <= 0) return '30 天';
	if (days === 1) return '1 天';
	return `${Math.trunc(days)} 天`;
};

export const getSubtitleBurnInTextCodecsLabel = (selectedCodecs, options) => {
	const normalizedSelection = Array.isArray(selectedCodecs) ? selectedCodecs : [];
	if (normalizedSelection.length === 0) return '无（质量优先）';
	const labels = normalizedSelection.map((codec) => {
		const match = options.find((option) => option.value === codec);
		return match?.label || codec;
	});
	return labels.join(', ');
};

