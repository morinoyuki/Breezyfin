import {useCallback, useRef} from 'react';
import Popup from '@enact/sandstone/Popup';
import BodyText from '@enact/sandstone/BodyText';
import PanelActionButton from './PanelActionButton';
import {useSyncPlay} from '../contexts/SyncPlayContext';
import {usePopupInitialFocus} from '../hooks/usePopupInitialFocus';
import {popupShellCss} from '../styles/popupStyles';
import popupStyles from '../styles/popupStyles.module.less';

import css from './SyncPlayGlobalOverlays.module.less';

const SyncPlayGlobalOverlays = () => {
	const syncPlay = useSyncPlay();
	const pendingActionRef = useRef(null);
	const decisionContentRef = useRef(null);
	usePopupInitialFocus(Boolean(syncPlay.playDecision), decisionContentRef);
	const closeDecision = useCallback(() => {
		pendingActionRef.current = null;
		syncPlay.cancelPlayDecision();
	}, [syncPlay]);
	const queueReplaceAfterHide = useCallback(() => {
		pendingActionRef.current = syncPlay.confirmReplacePlayback;
		syncPlay.cancelPlayDecision();
	}, [syncPlay]);
	const queueJoinAfterHide = useCallback(() => {
		pendingActionRef.current = syncPlay.joinCurrentPlayback;
		syncPlay.cancelPlayDecision();
	}, [syncPlay]);
	const finishDecisionAfterHide = useCallback(() => {
		const pendingAction = pendingActionRef.current;
		pendingActionRef.current = null;
		pendingAction?.();
	}, []);
	return (
		<>
			<Popup
				open={Boolean(syncPlay.playDecision)}
				onClose={closeDecision}
				onHide={finishDecisionAfterHide}
				css={popupShellCss}
			>
				<div ref={decisionContentRef} className={`${popupStyles.popupSurface} ${css.decision}`}>
					<BodyText>此 SyncPlay 群组已排队其他项目。</BodyText>
					<div className={css.actions}>
						<PanelActionButton onClick={queueReplaceAfterHide}>替换群组播放</PanelActionButton>
						<PanelActionButton onClick={queueJoinAfterHide}>加入当前群组播放</PanelActionButton>
						<PanelActionButton onClick={closeDecision}>取消</PanelActionButton>
					</div>
				</div>
			</Popup>
			{syncPlay.notification ? (
				<div className={`${popupStyles.popupSurface} ${css.notification}`} role="status">
					<BodyText>{syncPlay.notification.message}</BodyText>
					{syncPlay.notification.type === 'remote-playback' ? (
						<PanelActionButton size="small" onClick={syncPlay.resumeSession}>观看</PanelActionButton>
					) : null}
					<PanelActionButton size="small" onClick={syncPlay.dismissNotification}>关闭</PanelActionButton>
				</div>
			) : null}
		</>
	);
};

export default SyncPlayGlobalOverlays;
