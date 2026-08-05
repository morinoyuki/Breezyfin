import {useEffect, useMemo, useState} from 'react';

import {
	getEpisodeActionBadge,
	isEpisodeInProgress,
	isEpisodePlayed
} from '../utils/mediaDetailsHelpers';

export const useMediaDetailsOverviewState = ({
	item,
	episodes,
	selectedEpisode,
	isElegantTheme,
	hasOverviewText,
	overviewTextRef,
	overviewCollapsedClass
}) => {
	const [hasOverviewOverflow, setHasOverviewOverflow] = useState(false);

	useEffect(() => {
		if (!isElegantTheme || !hasOverviewText) {
			setHasOverviewOverflow(false);
			return undefined;
		}

		let frameId = 0;
		const measureOverviewOverflow = () => {
			const overviewElement = overviewTextRef.current;
			if (!overviewElement) {
				setHasOverviewOverflow(false);
				return;
			}
			const hadCollapsedClass = overviewElement.classList.contains(overviewCollapsedClass);
			if (!hadCollapsedClass) {
				overviewElement.classList.add(overviewCollapsedClass);
			}
			const hasOverflow = (overviewElement.scrollHeight - overviewElement.clientHeight) > 1;
			if (!hadCollapsedClass) {
				overviewElement.classList.remove(overviewCollapsedClass);
			}
			setHasOverviewOverflow(hasOverflow);
		};

		const scheduleOverviewMeasurement = () => {
			window.cancelAnimationFrame(frameId);
			frameId = window.requestAnimationFrame(measureOverviewOverflow);
		};

		scheduleOverviewMeasurement();
		window.addEventListener('resize', scheduleOverviewMeasurement);
		return () => {
			window.cancelAnimationFrame(frameId);
			window.removeEventListener('resize', scheduleOverviewMeasurement);
		};
	}, [
		hasOverviewText,
		isElegantTheme,
		item?.Id,
		overviewCollapsedClass,
		overviewTextRef
	]);

	const shouldShowContinue = useMemo(() => {
		if (item?.Type === 'Series') return false;
		if (!item?.UserData) return false;
		const playbackPosition = item?.UserData?.PlaybackPositionTicks || 0;
		if (playbackPosition > 0) return true;
		const percentage = item?.UserData?.PlayedPercentage || 0;
		return percentage > 0 && percentage < 100;
	}, [item]);

	const seriesHasWatchHistory = useMemo(() => {
		if (item?.Type !== 'Series') return false;
		if (episodes.some((episode) => isEpisodeInProgress(episode) || isEpisodePlayed(episode))) return true;
		const userData = item?.UserData;
		if (!userData) return false;
		if ((userData.PlaybackPositionTicks || 0) > 0) return true;
		if ((userData.PlayedPercentage || 0) > 0) return true;
		return userData.Played === true;
	}, [episodes, item]);

	const seriesPlayLabel = useMemo(() => {
		if (item?.Type !== 'Series') return '播放';
		const targetEpisode =
			selectedEpisode ||
			episodes.find((episode) => !isEpisodePlayed(episode)) ||
			episodes[0] ||
			null;
		if (!targetEpisode) return '播放';
		const badge = getEpisodeActionBadge(targetEpisode);
		const withBadge = (label) => (badge ? `${label} ${badge}` : label);
		if (isEpisodeInProgress(targetEpisode)) {
			return withBadge('继续');
		}
		if (!isEpisodePlayed(targetEpisode) && seriesHasWatchHistory) {
			return withBadge('接下来播放');
		}
		if (!isEpisodePlayed(targetEpisode)) {
			return withBadge('播放');
		}
		return withBadge('播放');
	}, [episodes, item?.Type, selectedEpisode, seriesHasWatchHistory]);

	const overviewPlayLabel = item?.Type === 'Series'
		? seriesPlayLabel
		: (shouldShowContinue ? '继续' : '播放');

	return {
		hasOverviewOverflow,
		seriesPlayLabel,
		overviewPlayLabel
	};
};
