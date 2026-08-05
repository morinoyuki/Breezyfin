import {useCallback, useMemo} from 'react';

import {HOME_ROW_ORDER} from '../../../constants/homeRows';
import {writeBreezyfinSettings} from '../../../utils/settingsStorage';

export const useSettingsHomeRows = ({setSettings}) => {
	const handleHomeRowToggle = useCallback((rowKey) => {
		setSettings((prevSettings) => {
			const updated = {
				...prevSettings,
				homeRows: {
					...prevSettings.homeRows,
					[rowKey]: !prevSettings.homeRows?.[rowKey]
				}
			};
			if (!writeBreezyfinSettings(updated)) {
				console.error('保存主页行设置失败');
			}
			return updated;
		});
	}, [setSettings]);

	const handleHomeRowReorder = useCallback((rowKey, direction) => {
		setSettings((prevSettings) => {
			const order = Array.isArray(prevSettings.homeRowOrder)
				? [...prevSettings.homeRowOrder]
				: [...HOME_ROW_ORDER];
			const index = order.indexOf(rowKey);
			if (index === -1) return prevSettings;
			const swapIndex = direction === 'up' ? index - 1 : index + 1;
			if (swapIndex < 0 || swapIndex >= order.length) return prevSettings;
			[order[index], order[swapIndex]] = [order[swapIndex], order[index]];
			const updated = {...prevSettings, homeRowOrder: order};
			if (!writeBreezyfinSettings(updated)) {
				console.error('保存主页行顺序失败');
			}
			return updated;
		});
	}, [setSettings]);

	const homeRowToggleHandlers = useMemo(() => ({
		recentlyAdded: () => handleHomeRowToggle('recentlyAdded'),
		continueWatching: () => handleHomeRowToggle('continueWatching'),
		nextUp: () => handleHomeRowToggle('nextUp'),
		latestMovies: () => handleHomeRowToggle('latestMovies'),
		latestShows: () => handleHomeRowToggle('latestShows'),
		myRequests: () => handleHomeRowToggle('myRequests')
	}), [handleHomeRowToggle]);

	const moveHomeRowUp = useCallback((event) => {
		const rowKey = event.currentTarget.dataset.rowKey;
		if (!rowKey) return;
		handleHomeRowReorder(rowKey, 'up');
	}, [handleHomeRowReorder]);

	const moveHomeRowDown = useCallback((event) => {
		const rowKey = event.currentTarget.dataset.rowKey;
		if (!rowKey) return;
		handleHomeRowReorder(rowKey, 'down');
	}, [handleHomeRowReorder]);

	return {
		homeRowToggleHandlers,
		moveHomeRowUp,
		moveHomeRowDown
	};
};

