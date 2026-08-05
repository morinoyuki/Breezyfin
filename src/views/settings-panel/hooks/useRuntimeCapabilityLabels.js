import {useMemo} from 'react';
import {
	formatAudioCodecList,
	formatBitrateMbps,
	formatCapabilityTimestamp,
	formatYesNoUnknown
} from '../capabilityFormatting';

export const useRuntimeCapabilityLabels = (runtimeCapabilities) => {
	const runtimePlaybackCapabilities = runtimeCapabilities?.playback || {};
	const capabilityProbe = runtimeCapabilities?.capabilityProbe || null;

	const hasRuntimeVersionInfo = runtimeCapabilities?.version != null || runtimeCapabilities?.chrome != null;
	const webosVersionLabel = hasRuntimeVersionInfo
		? `${runtimeCapabilities?.version ?? '未知'}${runtimeCapabilities?.chrome ? ` (Chrome ${runtimeCapabilities.chrome})` : ''}`
		: '未知';

	const dynamicRangeLabel = useMemo(() => {
		const ranges = [];
		if (runtimePlaybackCapabilities.supportsDolbyVision === true) ranges.push('杜比视界');
		if (runtimePlaybackCapabilities.supportsHdr10 !== false) ranges.push('HDR10');
		if (runtimePlaybackCapabilities.supportsHlg !== false) ranges.push('HLG');
		if (ranges.length === 0) return '仅 SDR';
		return ranges.join(', ');
	}, [
		runtimePlaybackCapabilities.supportsDolbyVision,
		runtimePlaybackCapabilities.supportsHdr10,
		runtimePlaybackCapabilities.supportsHlg
	]);

	const videoCodecsLabel = useMemo(() => {
		const codecs = ['H.264'];
		if (runtimePlaybackCapabilities.supportsHevc !== false) codecs.push('HEVC');
		if (runtimePlaybackCapabilities.supportsAv1 === true) codecs.push('AV1');
		if (runtimePlaybackCapabilities.supportsVp9 === true) codecs.push('VP9');
		return codecs.join(', ');
	}, [
		runtimePlaybackCapabilities.supportsAv1,
		runtimePlaybackCapabilities.supportsHevc,
		runtimePlaybackCapabilities.supportsVp9
	]);

	const audioCodecsLabel = useMemo(
		() => formatAudioCodecList(runtimePlaybackCapabilities.audioCodecs),
		[runtimePlaybackCapabilities.audioCodecs]
	);

	const capabilityProbeLabel = useMemo(() => {
		const sourceLabel = capabilityProbe?.source === 'cache' ? '缓存探测' : '实时探测';
		const checkedAtLabel = formatCapabilityTimestamp(capabilityProbe?.checkedAt);
		const ttlMs = Number(capabilityProbe?.ttlMs);
		if (!Number.isFinite(ttlMs) || ttlMs <= 0) return `${sourceLabel} | ${checkedAtLabel}`;
		const ttlDays = Math.max(1, Math.round(ttlMs / (24 * 60 * 60 * 1000)));
		return `${sourceLabel} | ${checkedAtLabel} | 刷新 ${ttlDays} 天`;
	}, [capabilityProbe?.checkedAt, capabilityProbe?.source, capabilityProbe?.ttlMs]);

	return {
		webosVersionLabel,
		capabilityProbeLabel,
		dynamicRangeLabel,
		videoCodecsLabel,
		audioCodecsLabel,
		dolbyVisionMkvLabel: formatYesNoUnknown(runtimePlaybackCapabilities.supportsDolbyVisionInMkv),
		webpImageDecodeLabel: formatYesNoUnknown(runtimePlaybackCapabilities.supportsWebpImage),
		atmosLabel: formatYesNoUnknown(runtimePlaybackCapabilities.supportsAtmos),
		hdAudioLabel: `${formatYesNoUnknown(runtimePlaybackCapabilities.supportsDts)} / ${formatYesNoUnknown(runtimePlaybackCapabilities.supportsTrueHd)}`,
		maxAudioChannelsLabel: Number.isFinite(Number(runtimePlaybackCapabilities.maxAudioChannels))
			? `${runtimePlaybackCapabilities.maxAudioChannels} ch`
			: '未知',
		maxStreamingBitrateLabel: formatBitrateMbps(runtimePlaybackCapabilities.maxStreamingBitrate)
	};
};
