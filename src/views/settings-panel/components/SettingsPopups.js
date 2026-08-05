import {useRef} from 'react';
import Popup from '@enact/sandstone/Popup';
import BodyText from '@enact/sandstone/BodyText';
import Scroller from '../../../components/AppScroller';
import Button from '../../../components/BreezyButton';
import {usePopupInitialFocus} from '../../../hooks/usePopupInitialFocus';
import {
	getWipeCacheConfirmCopy,
	isSubtitleBurnInCodecSelected,
	isSubtitleOptionSelected
} from '../utils/settingsViewModel';
import css from '../../SettingsPanel.module.less';
import popupStyles from '../../../styles/popupStyles.module.less';

const SettingsPopups = ({
	popupShellCss,
	bitratePopupOpen,
	closeBitratePopup,
	bitrateOptions,
	capabilityProbeRefreshPopupOpen,
	closeCapabilityProbeRefreshPopup,
	capabilityProbeRefreshOptions,
	settings,
	handleBitrateSelect,
	handleCapabilityProbeRefreshSelect,
	audioLangPopupOpen,
	closeAudioLangPopup,
	languageOptions,
	handleAudioLanguageSelect,
	subtitleLangPopupOpen,
	closeSubtitleLangPopup,
	handleSubtitleLanguageSelect,
	subtitleBurnInTextCodecsPopupOpen,
	closeSubtitleBurnInTextCodecsPopup,
	subtitleBurnInTextCodecOptions,
	handleSubtitleBurnInTextCodecToggle,
	assSubtitleRendererPopupOpen,
	closeAssSubtitleRendererPopup,
	assSubtitleRendererOptions,
	handleAssSubtitleRendererSelect,
	bitmapSubtitleRendererPopupOpen,
	closeBitmapSubtitleRendererPopup,
	bitmapSubtitleRendererOptions,
	handleBitmapSubtitleRendererSelect,
	subtitleOverlaySizePopupOpen,
	closeSubtitleOverlaySizePopup,
	subtitleOverlayFontSizeLabel,
	handleSubtitleOverlayFontSizeDecrease,
	handleSubtitleOverlayFontSizeIncrease,
	handleSubtitleOverlayFontSizeReset,
	subtitleOverlayPositionPopupOpen,
	closeSubtitleOverlayPositionPopup,
	subtitleOverlayPositionOptions,
	handleSubtitleOverlayPositionSelect,
	subtitleOverlayBackgroundPopupOpen,
	closeSubtitleOverlayBackgroundPopup,
	subtitleOverlayBackgroundOptions,
	handleSubtitleOverlayBackgroundSelect,
	subtitleOverlayWeightPopupOpen,
	closeSubtitleOverlayWeightPopup,
	subtitleOverlayWeightOptions,
	handleSubtitleOverlayWeightSelect,
	subtitleOverlayTextColorPopupOpen,
	closeSubtitleOverlayTextColorPopup,
	subtitleOverlayTextColorOptions,
	handleSubtitleOverlayTextColorSelect,
	subtitleOverlayBorderStylePopupOpen,
	closeSubtitleOverlayBorderStylePopup,
	subtitleOverlayBorderStyleOptions,
	handleSubtitleOverlayBorderStyleSelect,
	subtitleOverlayBorderColorPopupOpen,
	closeSubtitleOverlayBorderColorPopup,
	subtitleOverlayBorderColorOptions,
	handleSubtitleOverlayBorderColorSelect,
	subtitleOverlayBorderStrengthPopupOpen,
	closeSubtitleOverlayBorderStrengthPopup,
	subtitleOverlayBorderStrengthOptions,
	handleSubtitleOverlayBorderStrengthSelect,
	subtitleOverlayOutlineSizePopupOpen,
	closeSubtitleOverlayOutlineSizePopup,
	subtitleOverlayOutlineSizeLabel,
	handleSubtitleOverlayOutlineSizeDecrease,
	handleSubtitleOverlayOutlineSizeIncrease,
	handleSubtitleOverlayOutlineSizeReset,
	subtitleOverlayShadowDistancePopupOpen,
	closeSubtitleOverlayShadowDistancePopup,
	subtitleOverlayShadowDistanceOptions,
	handleSubtitleOverlayShadowDistanceSelect,
	subtitleOverlayShadowAnglePopupOpen,
	closeSubtitleOverlayShadowAnglePopup,
	subtitleOverlayShadowAngleOptions,
	handleSubtitleOverlayShadowAngleSelect,
	navbarThemePopupOpen,
	closeNavbarThemePopup,
	navbarThemeOptions,
	handleNavbarThemeSelect,
	screensaverTimeoutPopupOpen,
	closeScreensaverTimeoutPopup,
	screensaverTimeoutOptions,
	handleScreensaverTimeoutSelect,
	playNextPromptModePopupOpen,
	closePlayNextPromptModePopup,
	setSegmentsOnlyPromptMode,
	setSegmentsOrLast60PromptMode,
	logoutConfirmOpen,
	closeLogoutConfirm,
	serverInfo,
	handleLogoutConfirm,
	logsPopupOpen,
	closeLogsPopup,
	handleClearLogs,
	appLogs,
	wipeCacheConfirmOpen,
	closeWipeCacheConfirm,
	wipeCacheKeepLogin,
	cacheWipeInProgress,
	cacheWipeError,
	handleWipeCacheConfirm
}) => {
	const {
		title: wipeCacheTitle,
		message: wipeCacheMessage,
		actionLabel: wipeCacheActionLabel
	} = getWipeCacheConfirmCopy(wipeCacheKeepLogin);
	const bitratePopupContentRef = useRef(null);
	const audioLangPopupContentRef = useRef(null);
	const capabilityProbeRefreshPopupContentRef = useRef(null);
	const subtitleLangPopupContentRef = useRef(null);
	const subtitleBurnInTextCodecsPopupContentRef = useRef(null);
	const assSubtitleRendererPopupContentRef = useRef(null);
	const bitmapSubtitleRendererPopupContentRef = useRef(null);
	const subtitleOverlaySizePopupContentRef = useRef(null);
	const subtitleOverlayPositionPopupContentRef = useRef(null);
	const subtitleOverlayBackgroundPopupContentRef = useRef(null);
	const subtitleOverlayWeightPopupContentRef = useRef(null);
	const subtitleOverlayTextColorPopupContentRef = useRef(null);
	const subtitleOverlayBorderStylePopupContentRef = useRef(null);
	const subtitleOverlayBorderColorPopupContentRef = useRef(null);
	const subtitleOverlayBorderStrengthPopupContentRef = useRef(null);
	const subtitleOverlayOutlineSizePopupContentRef = useRef(null);
	const subtitleOverlayShadowDistancePopupContentRef = useRef(null);
	const subtitleOverlayShadowAnglePopupContentRef = useRef(null);
	const navbarThemePopupContentRef = useRef(null);
	const screensaverTimeoutPopupContentRef = useRef(null);
	const playNextPromptModePopupContentRef = useRef(null);
	const logoutConfirmPopupContentRef = useRef(null);
	const logsPopupContentRef = useRef(null);
	const wipeCacheConfirmPopupContentRef = useRef(null);

	usePopupInitialFocus(bitratePopupOpen, bitratePopupContentRef);
	usePopupInitialFocus(audioLangPopupOpen, audioLangPopupContentRef);
	usePopupInitialFocus(capabilityProbeRefreshPopupOpen, capabilityProbeRefreshPopupContentRef);
	usePopupInitialFocus(subtitleLangPopupOpen, subtitleLangPopupContentRef);
	usePopupInitialFocus(subtitleBurnInTextCodecsPopupOpen, subtitleBurnInTextCodecsPopupContentRef);
	usePopupInitialFocus(assSubtitleRendererPopupOpen, assSubtitleRendererPopupContentRef);
	usePopupInitialFocus(bitmapSubtitleRendererPopupOpen, bitmapSubtitleRendererPopupContentRef);
	usePopupInitialFocus(subtitleOverlaySizePopupOpen, subtitleOverlaySizePopupContentRef);
	usePopupInitialFocus(subtitleOverlayPositionPopupOpen, subtitleOverlayPositionPopupContentRef);
	usePopupInitialFocus(subtitleOverlayBackgroundPopupOpen, subtitleOverlayBackgroundPopupContentRef);
	usePopupInitialFocus(subtitleOverlayWeightPopupOpen, subtitleOverlayWeightPopupContentRef);
	usePopupInitialFocus(subtitleOverlayTextColorPopupOpen, subtitleOverlayTextColorPopupContentRef);
	usePopupInitialFocus(subtitleOverlayBorderStylePopupOpen, subtitleOverlayBorderStylePopupContentRef);
	usePopupInitialFocus(subtitleOverlayBorderColorPopupOpen, subtitleOverlayBorderColorPopupContentRef);
	usePopupInitialFocus(subtitleOverlayBorderStrengthPopupOpen, subtitleOverlayBorderStrengthPopupContentRef);
	usePopupInitialFocus(subtitleOverlayOutlineSizePopupOpen, subtitleOverlayOutlineSizePopupContentRef);
	usePopupInitialFocus(subtitleOverlayShadowDistancePopupOpen, subtitleOverlayShadowDistancePopupContentRef);
	usePopupInitialFocus(subtitleOverlayShadowAnglePopupOpen, subtitleOverlayShadowAnglePopupContentRef);
	usePopupInitialFocus(navbarThemePopupOpen, navbarThemePopupContentRef);
	usePopupInitialFocus(screensaverTimeoutPopupOpen, screensaverTimeoutPopupContentRef);
	usePopupInitialFocus(playNextPromptModePopupOpen, playNextPromptModePopupContentRef);
	usePopupInitialFocus(logoutConfirmOpen, logoutConfirmPopupContentRef);
	usePopupInitialFocus(logsPopupOpen, logsPopupContentRef);
	usePopupInitialFocus(wipeCacheConfirmOpen, wipeCacheConfirmPopupContentRef);

	const renderSubtitleOptionPopup = ({
		open,
		onClose,
		contentRef,
		title,
		options,
		settingKey,
		onSelect,
		fallback
	}) => (
		<Popup
			open={open}
			onClose={onClose}
			css={popupShellCss}
		>
			<div ref={contentRef} className={`${popupStyles.popupSurface} ${css.popupContent}`}>
				<BodyText className={css.popupTitle}>{title}</BodyText>
				<div className={css.popupOptions}>
					{options.map((option) => (
						<Button
							key={option.value}
							data-value={option.value}
							className={css.popupOption}
							selected={isSubtitleOptionSelected(settings, settingKey, fallback, option.value)}
							onClick={onSelect}
						>
							{option.label}
						</Button>
					))}
				</div>
			</div>
		</Popup>
	);

	const renderSubtitleNumericPopup = ({
		open,
		onClose,
		contentRef,
		title,
		message,
		valueLabel,
		onDecrease,
		onIncrease,
		onReset
	}) => (
		<Popup
			open={open}
			onClose={onClose}
			css={popupShellCss}
		>
			<div ref={contentRef} className={`${popupStyles.popupSurface} ${css.popupContent}`}>
				<BodyText className={css.popupTitle}>{title}</BodyText>
				<BodyText className={css.popupMessage}>{message}</BodyText>
				<BodyText className={css.popupNumericValue}>{valueLabel}</BodyText>
				<div className={css.popupNumericActions}>
					<Button className={css.popupOption} onClick={onDecrease}>-</Button>
					<Button className={css.popupOption} onClick={onReset}>重置</Button>
					<Button className={css.popupOption} onClick={onIncrease}>+</Button>
				</div>
				<div className={css.popupActions}>
					<Button onClick={onClose} className={css.popupOption}>完成</Button>
				</div>
			</div>
		</Popup>
	);

	return (
		<>
			<Popup
				open={bitratePopupOpen}
				onClose={closeBitratePopup}
				css={popupShellCss}
			>
				<div ref={bitratePopupContentRef} className={`${popupStyles.popupSurface} ${css.popupContent}`}>
					<BodyText className={css.popupTitle}>选择最大位率</BodyText>
					{bitrateOptions.map((option) => (
						<Button
							key={option.value}
							data-bitrate={option.value}
							className={css.popupOption}
							selected={settings.maxBitrate === option.value}
							onClick={handleBitrateSelect}
						>
							{option.label}
						</Button>
					))}
				</div>
			</Popup>

			{renderSubtitleOptionPopup({
				open: screensaverTimeoutPopupOpen,
				onClose: closeScreensaverTimeoutPopup,
				contentRef: screensaverTimeoutPopupContentRef,
				title: '屏保超时',
				options: screensaverTimeoutOptions,
				settingKey: 'screensaverTimeoutMinutes',
				onSelect: handleScreensaverTimeoutSelect,
				fallback: '1'
			})}

			{renderSubtitleOptionPopup({
				open: subtitleOverlayWeightPopupOpen,
				onClose: closeSubtitleOverlayWeightPopup,
				contentRef: subtitleOverlayWeightPopupContentRef,
				title: 'Breezyfin 字幕字重',
				options: subtitleOverlayWeightOptions,
				settingKey: 'subtitleOverlayWeight',
				onSelect: handleSubtitleOverlayWeightSelect,
				fallback: 'bold'
			})}

			{renderSubtitleOptionPopup({
				open: subtitleOverlayTextColorPopupOpen,
				onClose: closeSubtitleOverlayTextColorPopup,
				contentRef: subtitleOverlayTextColorPopupContentRef,
				title: 'Breezyfin 字幕文字颜色',
				options: subtitleOverlayTextColorOptions,
				settingKey: 'subtitleOverlayTextColor',
				onSelect: handleSubtitleOverlayTextColorSelect,
				fallback: 'white'
			})}

			{renderSubtitleOptionPopup({
				open: subtitleOverlayBorderStylePopupOpen,
				onClose: closeSubtitleOverlayBorderStylePopup,
				contentRef: subtitleOverlayBorderStylePopupContentRef,
				title: 'Breezyfin 字幕边框样式',
				options: subtitleOverlayBorderStyleOptions,
				settingKey: 'subtitleOverlayBorderStyle',
				onSelect: handleSubtitleOverlayBorderStyleSelect,
				fallback: 'outline'
			})}

			{renderSubtitleOptionPopup({
				open: subtitleOverlayBorderColorPopupOpen,
				onClose: closeSubtitleOverlayBorderColorPopup,
				contentRef: subtitleOverlayBorderColorPopupContentRef,
				title: 'Breezyfin 字幕边框颜色',
				options: subtitleOverlayBorderColorOptions,
				settingKey: 'subtitleOverlayBorderColor',
				onSelect: handleSubtitleOverlayBorderColorSelect,
				fallback: 'black'
			})}

			{renderSubtitleOptionPopup({
				open: subtitleOverlayBorderStrengthPopupOpen,
				onClose: closeSubtitleOverlayBorderStrengthPopup,
				contentRef: subtitleOverlayBorderStrengthPopupContentRef,
				title: 'Breezyfin 字幕框边框粗细',
				options: subtitleOverlayBorderStrengthOptions,
				settingKey: 'subtitleOverlayBorderStrength',
				onSelect: handleSubtitleOverlayBorderStrengthSelect,
				fallback: 'medium'
			})}

			{renderSubtitleNumericPopup({
				open: subtitleOverlayOutlineSizePopupOpen,
				onClose: closeSubtitleOverlayOutlineSizePopup,
				contentRef: subtitleOverlayOutlineSizePopupContentRef,
				title: 'Breezyfin 字幕描边宽度',
				message: '控制 Breezyfin DOM 字幕描边的像素宽度。',
				valueLabel: subtitleOverlayOutlineSizeLabel,
				onDecrease: handleSubtitleOverlayOutlineSizeDecrease,
				onIncrease: handleSubtitleOverlayOutlineSizeIncrease,
				onReset: handleSubtitleOverlayOutlineSizeReset
			})}

			{renderSubtitleOptionPopup({
				open: subtitleOverlayShadowDistancePopupOpen,
				onClose: closeSubtitleOverlayShadowDistancePopup,
				contentRef: subtitleOverlayShadowDistancePopupContentRef,
				title: 'Breezyfin 字幕阴影距离',
				options: subtitleOverlayShadowDistanceOptions,
				settingKey: 'subtitleOverlayShadowDistance',
				onSelect: handleSubtitleOverlayShadowDistanceSelect,
				fallback: 'medium'
			})}

			{renderSubtitleOptionPopup({
				open: subtitleOverlayShadowAnglePopupOpen,
				onClose: closeSubtitleOverlayShadowAnglePopup,
				contentRef: subtitleOverlayShadowAnglePopupContentRef,
				title: 'Breezyfin 字幕阴影角度',
				options: subtitleOverlayShadowAngleOptions,
				settingKey: 'subtitleOverlayShadowAngle',
				onSelect: handleSubtitleOverlayShadowAngleSelect,
				fallback: 'down'
			})}

			<Popup
				open={audioLangPopupOpen}
				onClose={closeAudioLangPopup}
				css={popupShellCss}
			>
				<div ref={audioLangPopupContentRef} className={`${popupStyles.popupSurface} ${css.popupContent}`}>
					<BodyText className={css.popupTitle}>首选音频语言</BodyText>
					<div className={css.popupOptions}>
						{languageOptions.map((option) => (
							<Button
								key={option.value}
								data-language={option.value}
								className={css.popupOption}
								selected={settings.preferredAudioLanguage === option.value}
								onClick={handleAudioLanguageSelect}
							>
								{option.label}
							</Button>
						))}
					</div>
				</div>
			</Popup>

			<Popup
				open={capabilityProbeRefreshPopupOpen}
				onClose={closeCapabilityProbeRefreshPopup}
				css={popupShellCss}
			>
				<div ref={capabilityProbeRefreshPopupContentRef} className={`${popupStyles.popupSurface} ${css.popupContent}`}>
					<BodyText className={css.popupTitle}>能力探测刷新周期</BodyText>
					{capabilityProbeRefreshOptions.map((option) => (
						<Button
							key={option.value}
							data-days={option.value}
							className={css.popupOption}
							selected={String(settings.capabilityProbeRefreshDays) === option.value}
							onClick={handleCapabilityProbeRefreshSelect}
						>
							{option.label}
						</Button>
					))}
				</div>
			</Popup>

			<Popup
				open={subtitleLangPopupOpen}
				onClose={closeSubtitleLangPopup}
				css={popupShellCss}
			>
				<div ref={subtitleLangPopupContentRef} className={`${popupStyles.popupSurface} ${css.popupContent}`}>
					<BodyText className={css.popupTitle}>首选字幕语言</BodyText>
					<div className={css.popupOptions}>
						{languageOptions.map((option) => (
							<Button
								key={option.value}
								data-language={option.value}
								className={css.popupOption}
								selected={settings.preferredSubtitleLanguage === option.value}
								onClick={handleSubtitleLanguageSelect}
							>
								{option.label}
							</Button>
						))}
					</div>
				</div>
			</Popup>

			<Popup
				open={subtitleBurnInTextCodecsPopupOpen}
				onClose={closeSubtitleBurnInTextCodecsPopup}
				css={popupShellCss}
			>
				<div ref={subtitleBurnInTextCodecsPopupContentRef} className={`${popupStyles.popupSurface} ${css.popupContent}`}>
					<BodyText className={css.popupTitle}>字幕烧录格式</BodyText>
					<BodyText className={css.popupMessage}>
						仅手动模式。所选格式将优先使用烧录/转码。留空以保持质量优先播放。
					</BodyText>
					<div className={css.popupOptions}>
						{subtitleBurnInTextCodecOptions.map((option) => (
							<Button
								key={option.value}
								data-codec={option.value}
								className={css.popupOption}
								selected={isSubtitleBurnInCodecSelected(settings, option.value)}
								onClick={handleSubtitleBurnInTextCodecToggle}
							>
								{option.label}
							</Button>
						))}
					</div>
					<div className={css.popupActions}>
						<Button onClick={closeSubtitleBurnInTextCodecsPopup} className={css.popupOption}>完成</Button>
					</div>
				</div>
			</Popup>

			{renderSubtitleOptionPopup({
				open: assSubtitleRendererPopupOpen,
				onClose: closeAssSubtitleRendererPopup,
				contentRef: assSubtitleRendererPopupContentRef,
				title: 'ASS/SSA 字幕渲染器',
				options: assSubtitleRendererOptions,
				settingKey: 'assSubtitleRenderer',
				onSelect: handleAssSubtitleRendererSelect,
				fallback: 'auto'
			})}

			{renderSubtitleOptionPopup({
				open: bitmapSubtitleRendererPopupOpen,
				onClose: closeBitmapSubtitleRendererPopup,
				contentRef: bitmapSubtitleRendererPopupContentRef,
				title: '位图字幕渲染器',
				options: bitmapSubtitleRendererOptions,
				settingKey: 'bitmapSubtitleRenderer',
				onSelect: handleBitmapSubtitleRendererSelect,
				fallback: 'auto'
			})}

			<Popup
				open={navbarThemePopupOpen}
				onClose={closeNavbarThemePopup}
				css={popupShellCss}
			>
				<div ref={navbarThemePopupContentRef} className={`${popupStyles.popupSurface} ${css.nativeThemePopupContent}`}>
					<BodyText className={css.popupTitle}>导航栏主题</BodyText>
					<div className={css.nativeThemePopupOptions}>
						{navbarThemeOptions.map((option) => (
							<Button
								key={option.value}
								size="small"
								data-theme={option.value}
								selected={settings.navbarTheme === option.value}
								onClick={handleNavbarThemeSelect}
								className={css.popupOption}
							>
								{option.label}
							</Button>
						))}
					</div>
				</div>
			</Popup>

			{renderSubtitleNumericPopup({
				open: subtitleOverlaySizePopupOpen,
				onClose: closeSubtitleOverlaySizePopup,
				contentRef: subtitleOverlaySizePopupContentRef,
				title: 'Breezyfin 字幕字号',
				message: '控制 Breezyfin DOM 字幕。Libass 字幕保留 ASS/SSA 原始大小。',
				valueLabel: subtitleOverlayFontSizeLabel,
				onDecrease: handleSubtitleOverlayFontSizeDecrease,
				onIncrease: handleSubtitleOverlayFontSizeIncrease,
				onReset: handleSubtitleOverlayFontSizeReset
			})}

			<Popup
				open={subtitleOverlayPositionPopupOpen}
				onClose={closeSubtitleOverlayPositionPopup}
				css={popupShellCss}
			>
				<div ref={subtitleOverlayPositionPopupContentRef} className={`${popupStyles.popupSurface} ${css.popupContent}`}>
					<BodyText className={css.popupTitle}>Breezyfin 字幕位置</BodyText>
					<div className={css.popupOptions}>
						{subtitleOverlayPositionOptions.map((option) => (
							<Button
								key={option.value}
								data-value={option.value}
								className={css.popupOption}
								selected={(settings.subtitleOverlayPosition || 'standard') === option.value}
								onClick={handleSubtitleOverlayPositionSelect}
							>
								{option.label}
							</Button>
						))}
					</div>
				</div>
			</Popup>

			<Popup
				open={subtitleOverlayBackgroundPopupOpen}
				onClose={closeSubtitleOverlayBackgroundPopup}
				css={popupShellCss}
			>
				<div ref={subtitleOverlayBackgroundPopupContentRef} className={`${popupStyles.popupSurface} ${css.popupContent}`}>
					<BodyText className={css.popupTitle}>Breezyfin 字幕背景</BodyText>
					<div className={css.popupOptions}>
						{subtitleOverlayBackgroundOptions.map((option) => (
							<Button
								key={option.value}
								data-value={option.value}
								className={css.popupOption}
								selected={(settings.subtitleOverlayBackground || 'none') === option.value}
								onClick={handleSubtitleOverlayBackgroundSelect}
							>
								{option.label}
							</Button>
						))}
					</div>
				</div>
			</Popup>

			<Popup
				open={playNextPromptModePopupOpen}
				onClose={closePlayNextPromptModePopup}
				css={popupShellCss}
			>
				<div ref={playNextPromptModePopupContentRef} className={`${popupStyles.popupSurface} ${css.popupContent}`}>
					<BodyText className={css.popupTitle}>继续播放提示模式</BodyText>
					<Button
						className={css.popupOption}
						selected={settings.playNextPromptMode === 'segmentsOnly'}
						onClick={setSegmentsOnlyPromptMode}
					>
						仅片尾/演职员表
					</Button>
					<Button
						className={css.popupOption}
						selected={settings.playNextPromptMode !== 'segmentsOnly'}
						onClick={setSegmentsOrLast60PromptMode}
					>
						分段或最后 60 秒
					</Button>
				</div>
			</Popup>

			<Popup
				open={logoutConfirmOpen}
				onClose={closeLogoutConfirm}
				css={popupShellCss}
			>
				<div ref={logoutConfirmPopupContentRef} className={`${popupStyles.popupSurface} ${css.popupContent}`}>
					<BodyText className={css.popupTitle}>退出登录</BodyText>
					<BodyText className={css.popupMessage}>
						确定要从 {serverInfo?.ServerName || '此服务器'} 注销吗？
					</BodyText>
					<div className={css.popupActions}>
						<Button onClick={closeLogoutConfirm} className={css.popupOption}>取消</Button>
						<Button onClick={handleLogoutConfirm} className={`${css.popupOption} ${css.dangerButton}`}>退出登录</Button>
					</div>
				</div>
			</Popup>

			<Popup
				open={logsPopupOpen}
				onClose={closeLogsPopup}
				css={popupShellCss}
			>
				<div ref={logsPopupContentRef} className={`${popupStyles.popupSurface} ${css.logPopupContent}`}>
					<BodyText className={css.popupTitle}>最近日志</BodyText>
					<div className={css.logActions}>
						<Button size="small" onClick={handleClearLogs} className={css.popupOption}>清空日志</Button>
						<Button size="small" onClick={closeLogsPopup} className={css.popupOption}>关闭</Button>
					</div>
					<Scroller className={css.logScroller}>
						{appLogs.length === 0 && (
							<BodyText className={css.mutedText}>尚未捕获任何日志。</BodyText>
						)}
						{appLogs.map((entry, index) => (
							<div key={`${entry.ts}-${index}`} className={css.logEntry}>
								<BodyText className={css.logMeta}>[{entry.ts}] {entry.level?.toUpperCase()}</BodyText>
								<BodyText className={css.logText}>{entry.message}</BodyText>
							</div>
						))}
					</Scroller>
				</div>
			</Popup>

			<Popup
				open={wipeCacheConfirmOpen}
				onClose={closeWipeCacheConfirm}
				noAutoDismiss={cacheWipeInProgress}
				css={popupShellCss}
			>
				<div ref={wipeCacheConfirmPopupContentRef} className={`${popupStyles.popupSurface} ${css.popupContent}`}>
					<BodyText className={css.popupTitle}>{wipeCacheTitle}</BodyText>
					<BodyText className={css.popupMessage}>
						{wipeCacheMessage}
					</BodyText>
					{cacheWipeError ? (
						<BodyText className={css.popupMessage}>{cacheWipeError}</BodyText>
					) : null}
					<div className={css.popupActions}>
						<Button onClick={closeWipeCacheConfirm} disabled={cacheWipeInProgress} className={css.popupOption}>取消</Button>
						<Button
							onClick={handleWipeCacheConfirm}
							className={`${css.popupOption} ${css.dangerButton}`}
							disabled={cacheWipeInProgress}
							selected={cacheWipeInProgress}
						>
							{cacheWipeInProgress ? '清除中...' : wipeCacheActionLabel}
						</Button>
					</div>
				</div>
			</Popup>
		</>
	);
};

export default SettingsPopups;
