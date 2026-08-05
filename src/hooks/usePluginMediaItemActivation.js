import {useCallback, useEffect, useRef} from 'react';
import jellyfinService from '../services/jellyfinService';

const LINKED_ITEM_UNAVAILABLE_MESSAGE = '链接的 Jellyfin 项目对该用户不再可用。';

export const usePluginMediaItemActivation = ({
	onItemSelect,
	onExternalItem,
	onUnavailable,
	isActive = true
}) => {
	const requestGenerationRef = useRef(0);
	useEffect(() => {
		requestGenerationRef.current += 1;
		return () => {
			requestGenerationRef.current += 1;
		};
	}, [isActive]);

	return useCallback(async (item) => {
		if (!isActive) return;
		const generation = requestGenerationRef.current + 1;
		requestGenerationRef.current = generation;
		if (item.CanPlay && item.JellyfinItemId) {
			try {
				const linkedItem = await jellyfinService.getItem(item.JellyfinItemId);
				if (!isActive || generation !== requestGenerationRef.current) return;
				if (linkedItem) {
					onItemSelect(linkedItem);
					return;
				}
				throw new Error('未找到链接的 Jellyfin 项目。');
			} catch (error) {
				if (!isActive || generation !== requestGenerationRef.current) return;
				onUnavailable?.(LINKED_ITEM_UNAVAILABLE_MESSAGE, {error, item});
			}
			return;
		}
		onExternalItem(item);
	}, [isActive, onExternalItem, onItemSelect, onUnavailable]);
};
