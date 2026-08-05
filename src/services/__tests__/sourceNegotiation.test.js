jest.mock('../../utils/platformCapabilities', () => ({
	getRuntimePlatformCapabilities: jest.fn(() => ({playback: {}}))
}));

jest.mock('../../utils/platformCapabilities', () => ({
	getRuntimePlatformCapabilities: jest.fn(() => ({playback: {}}))
}));

import {getRuntimePlatformCapabilities} from '../../utils/platformCapabilities';
import {attemptAudioDownmixEnforcement} from '../jellyfin/playback-api/sourceNegotiation';
import {createPlaybackApiTestService, resetPlaybackApiTestRuntime} from '../testUtils/playbackApiTestHelpers';

const createMultiChannelSource = ({id = 'source-1', channels = 6, codec = 'eac3', withTranscodingUrl = false} = {}) => ({
	Id: id,
	Container: 'mp4',
	SupportsDirectPlay: !withTranscodingUrl,
	SupportsDirectStream: !withTranscodingUrl,
	SupportsTranscoding: true,
	...(withTranscodingUrl ? {TranscodingUrl: '/Videos/item/master.m3u8'} : {}),
	MediaStreams: [
		{Type: 'Video', Codec: 'h264', VideoRangeType: 'SDR'},
		{Type: 'Audio', Codec: codec, Index: 0, IsDefault: true, Channels: channels}
	]
});

describe('attemptAudioDownmixEnforcement', () => {
	beforeEach(() => {
		resetPlaybackApiTestRuntime({
			clearMocks: jest.clearAllMocks,
			createFetchMock: jest.fn,
			getRuntimePlatformCapabilities
		});
	});

	it('returns null when no MediaSources are present', async () => {
		const result = await attemptAudioDownmixEnforcement({
			service: createPlaybackApiTestService(),
			itemId: 'item-1',
			data: {MediaSources: []},
			forceTranscoding: false,
			runtimePlaybackCapabilities: {maxAudioChannels: 2},
			createSourceSelectionOptions: () => ({})
		});
		expect(result).toBeNull();
	});

	it('returns null when no audio stream exceeds the channel limit', async () => {
		const source = createMultiChannelSource({channels: 2});
		const result = await attemptAudioDownmixEnforcement({
			service: createPlaybackApiTestService(),
			itemId: 'item-1',
			selectedSource: source,
			data: {MediaSources: [source]},
			forceTranscoding: false,
			runtimePlaybackCapabilities: {maxAudioChannels: 2},
			createSourceSelectionOptions: () => ({})
		});
		expect(result).toBeNull();
	});

	it('skips when forceTranscoding is already true', async () => {
		const source = createMultiChannelSource({channels: 6});
		const result = await attemptAudioDownmixEnforcement({
			service: createPlaybackApiTestService(),
			itemId: 'item-1',
			selectedSource: source,
			data: {MediaSources: [source]},
			forceTranscoding: true,
			runtimePlaybackCapabilities: {maxAudioChannels: 2},
			createSourceSelectionOptions: () => ({})
		});
		expect(result).toBeNull();
	});

	it('re-fetches playback info with forceTranscoding for multi-channel audio', async () => {
		const source = createMultiChannelSource({channels: 6});
		global.fetch.mockResolvedValue({
			ok: true,
			json: async () => ({
				PlaySessionId: 'session-1',
				MediaSources: [Object.assign({}, source, {TranscodingUrl: '/Videos/item/master.m3u8'})]
			})
		});
		const result = await attemptAudioDownmixEnforcement({
			service: createPlaybackApiTestService(),
			itemId: 'item-1',
			selectedSource: source,
			data: {MediaSources: [source]},
			options: {},
			forceTranscoding: false,
			runtimePlaybackCapabilities: {maxAudioChannels: 2},
			createSourceSelectionOptions: () => ({forceTranscoding: true})
		});
		expect(result).not.toBeNull();
		expect(result.adjustment.type).toBe('audioDownmixEnforcement');
		expect(result.selectedSource.TranscodingUrl).toBe('/Videos/item/master.m3u8');
		const body = JSON.parse(global.fetch.mock.calls[0][1].body);
		expect(body.EnableDirectPlay).toBe(false);
		expect(body.EnableDirectStream).toBe(false);
		expect(body.EnableTranscoding).toBe(true);
	});

	it('does not re-fetch when the existing TranscodingUrl already respects MaxAudioChannels', async () => {
		const source = createMultiChannelSource({channels: 6, withTranscodingUrl: true});
		source.TranscodingUrl = '/Videos/item/master.m3u8?MaxAudioChannels=2';
		const result = await attemptAudioDownmixEnforcement({
			service: createPlaybackApiTestService(),
			itemId: 'item-1',
			selectedSource: source,
			data: {MediaSources: [source]},
			options: {},
			forceTranscoding: false,
			runtimePlaybackCapabilities: {maxAudioChannels: 2},
			createSourceSelectionOptions: () => ({})
		});
		expect(result).toBeNull();
	});
});
