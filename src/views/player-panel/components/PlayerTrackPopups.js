import PlayerTrackPopup from './PlayerTrackPopup';

const PlayerTrackPopups = ({
	audioOpen,
	onAudioClose,
	audioTracks,
	currentAudioTrack,
	onAudioTrackClick,
	subtitleOpen,
	onSubtitleClose,
	subtitleTracks,
	currentSubtitleTrack,
	onSubtitleTrackClick,
	getTrackLabel
}) => (
	<>
		<PlayerTrackPopup
			open={audioOpen}
			onClose={onAudioClose}
			title="音轨"
			tracks={audioTracks}
			currentTrack={currentAudioTrack}
			onTrackClick={onAudioTrackClick}
			getTrackLabel={getTrackLabel}
		/>
		<PlayerTrackPopup
			open={subtitleOpen}
			onClose={onSubtitleClose}
			title="字幕"
			tracks={subtitleTracks}
			currentTrack={currentSubtitleTrack}
			onTrackClick={onSubtitleTrackClick}
			getTrackLabel={getTrackLabel}
			includeOffOption
			offLabel="关"
		/>
	</>
);

export default PlayerTrackPopups;
