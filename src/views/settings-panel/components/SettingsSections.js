import {useCallback, useState} from 'react';
import Spinner from '@enact/sandstone/Spinner';
import BodyText from '@enact/sandstone/BodyText';
import Button from '../../../components/BreezyButton';
import PanelTabNavigation from '../../../components/PanelTabNavigation';
import {HOME_ROW_ORDER} from '../../../constants/homeRows';
import {
	DEFAULT_SETTINGS_TAB_KEY,
	SETTINGS_TABS,
	getAssSubtitleRendererControlState,
	getBitmapSubtitleRendererControlState,
	getSettingsSectionKeys,
	getSubtitleBurnInFormatsControlState,
	isSettingsTabKey,
	isSmartSubtitleHandlingEnabled
} from '../utils/settingsViewModel';
import {
	SettingsItem as Item,
	SettingsSwitchItem as SwitchItem
} from './SettingsStaticItems';
import css from '../../SettingsPanel.module.less';

const SETTINGS_PANEL_TABS = SETTINGS_TABS.map((tab) => ({id: tab.key, label: tab.label}));

const SettingsSections = ({
	loading,
	serverInfo,
	serverUrl,
	savedServers,
	switchingServerId,
	handleSwitchServerClick,
	handleForgetServerClick,
	settings,
	integrationPreferences,
	handleToggleServerHome,
	handleToggleWatchlist,
	homeRowToggleHandlers,
	moveHomeRowUp,
	moveHomeRowDown,
	getHomeRowLabel,
	userInfo,
	openLogoutConfirm,
	settingToggleHandlers,
	getPlayNextPromptModeLabel,
	openPlayNextPromptModePopup,
	getLanguageLabel,
	openAudioLangPopup,
	openSubtitleLangPopup,
	subtitleBurnInTextCodecsLabel,
	openSubtitleBurnInTextCodecsPopup,
	assSubtitleRendererLabel,
	openAssSubtitleRendererPopup,
	bitmapSubtitleRendererLabel,
	openBitmapSubtitleRendererPopup,
	subtitleOverlayFontSizeLabel,
	subtitleOverlayPositionLabel,
	subtitleOverlayBackgroundLabel,
	subtitleOverlayWeightLabel,
	subtitleOverlayTextColorLabel,
	subtitleOverlayBorderStyleLabel,
	subtitleOverlayBorderColorLabel,
	subtitleOverlayBorderStrengthLabel,
	subtitleOverlayOutlineSizeLabel,
	subtitleOverlayShadowDistanceLabel,
	subtitleOverlayShadowAngleLabel,
	openSubtitleOverlaySizePopup,
	openSubtitleOverlayPositionPopup,
	openSubtitleOverlayBackgroundPopup,
	openSubtitleOverlayWeightPopup,
	openSubtitleOverlayTextColorPopup,
	openSubtitleOverlayBorderStylePopup,
	openSubtitleOverlayBorderColorPopup,
	openSubtitleOverlayBorderStrengthPopup,
	openSubtitleOverlayOutlineSizePopup,
	openSubtitleOverlayShadowDistancePopup,
	openSubtitleOverlayShadowAnglePopup,
	getBitrateLabel,
	openBitratePopup,
	getNavbarThemeLabel,
	openNavbarThemePopup,
	screensaverTimeoutLabel,
	openScreensaverTimeoutPopup,
	appVersion,
	webosVersionLabel,
	capabilityProbeLabel,
	getCapabilityProbeRefreshPeriodLabel,
	openCapabilityProbeRefreshPopup,
	handleRefreshCapabilitiesNow,
	dynamicRangeLabel,
	dolbyVisionMkvLabel,
	webpImageDecodeLabel,
	videoCodecsLabel,
	audioCodecsLabel,
	atmosLabel,
	hdAudioLabel,
	maxAudioChannelsLabel,
	maxStreamingBitrateLabel,
	appLogCount,
	cacheWipeInProgress,
	openLogsPopup,
	openWipeCacheConfirm,
	openWipeCacheKeepLoginConfirm,
	isNonStableBuild = false
}) => {
	const [activeTabKey, setActiveTabKey] = useState(DEFAULT_SETTINGS_TAB_KEY);
	const [expandedCapabilityRows, setExpandedCapabilityRows] = useState({
		videoCodecs: false,
		audioCodecs: false
	});
	const activeSectionKeys = getSettingsSectionKeys(activeTabKey);
	const userIdLabel = userInfo?.Id ? `${userInfo.Id.substring(0, 8)}...` : '未知';
	const smartSubtitleTranscodingEnabled = isSmartSubtitleHandlingEnabled(settings);
	const assSubtitleRendererControl = getAssSubtitleRendererControlState(settings, assSubtitleRendererLabel);
	const bitmapSubtitleRendererControl = getBitmapSubtitleRendererControlState(settings, bitmapSubtitleRendererLabel);
	const subtitleBurnInFormatsControl = getSubtitleBurnInFormatsControlState(settings, subtitleBurnInTextCodecsLabel);

	const handleTabClick = useCallback((tabKey) => {
		if (!tabKey || !isSettingsTabKey(tabKey)) return;
		setActiveTabKey(tabKey);
	}, []);

	const shouldRenderSection = useCallback(
		(sectionKey) => activeSectionKeys.includes(sectionKey),
		[activeSectionKeys]
	);

	const toggleCapabilityRow = useCallback((key) => {
		setExpandedCapabilityRows((current) => ({
			...current,
			[key]: !current[key]
		}));
	}, []);
	const handleToggleVideoCodecs = useCallback(() => toggleCapabilityRow('videoCodecs'), [toggleCapabilityRow]);
	const handleToggleAudioCodecs = useCallback(() => toggleCapabilityRow('audioCodecs'), [toggleCapabilityRow]);

	return (
		<div className={css.content}>
			<PanelTabNavigation
				activeId={activeTabKey}
				ariaLabel="设置分类"
				onSelect={handleTabClick}
				spotlightIdPrefix="settings-tab"
				tabs={SETTINGS_PANEL_TABS}
			/>

			{shouldRenderSection('serverInfo') ? (
				<section className={css.section}>
					<BodyText className={css.sectionTitle}>服务器信息</BodyText>
					{loading ? (
						<div className={css.loadingItem}>
							<Spinner size="small" />
						</div>
					) : (
						<>
							<Item className={css.infoItem} label="服务器名称" slotAfter={serverInfo?.ServerName || '未知'} />
							<Item className={css.infoItem} label="服务器版本" slotAfter={serverInfo?.Version || '未知'} />
							<Item className={css.infoItem} label="服务器地址" slotAfter={serverUrl || '未连接'} />
						</>
					)}
				</section>
			) : null}

			{shouldRenderSection('savedServers') ? (
				<section className={css.section}>
					<BodyText className={css.sectionTitle}>已保存的服务器</BodyText>
					{savedServers.length === 0 && (
						<BodyText className={css.mutedText}>尚未保存任何服务器。登录以添加一个。</BodyText>
					)}
					<div className={css.serverList}>
						{savedServers.map((entry) => {
							const key = `${entry.serverId}:${entry.userId}`;
							return (
								<div key={key} className={`${css.serverCard} ${entry.isActive ? css.activeCard : ''}`}>
									<div className={css.serverCardMain}>
										<div className={css.serverTitle}>{entry.serverName || 'Jellyfin 服务器'}</div>
										<div className={css.serverMeta}>{entry.username} - {entry.url}</div>
									</div>
									<div className={css.serverCardActions}>
										<Button
											size="small"
											minWidth={false}
											data-server-key={key}
											onClick={handleSwitchServerClick}
											selected={switchingServerId === key}
										>
											{entry.isActive ? '活跃' : switchingServerId === key ? '切换中...' : '切换'}
										</Button>
										<Button
											size="small"
											minWidth={false}
											data-server-key={key}
											onClick={handleForgetServerClick}
										>
											忘记
										</Button>
									</div>
								</div>
							);
						})}
					</div>
				</section>
			) : null}

			{shouldRenderSection('account') ? (
				<section className={css.section}>
					<BodyText className={css.sectionTitle}>账户</BodyText>
					{loading ? (
						<div className={css.loadingItem}>
							<Spinner size="small" />
						</div>
					) : (
						<>
							<Item className={css.infoItem} label="用户名" slotAfter={userInfo?.Name || '未知'} />
							<Item className={css.infoItem} label="用户 ID" slotAfter={userIdLabel} />
							<Button
								className={css.logoutButton}
								onClick={openLogoutConfirm}
								icon="closex"
							>
								退出登录
							</Button>
						</>
					)}
				</section>
			) : null}

			{shouldRenderSection('homeRows') ? (
				<section className={css.section}>
					<BodyText className={css.sectionTitle}>主页行</BodyText>
					<SwitchItem
						className={css.switchItem}
						selected={integrationPreferences?.homeSource === 'server'}
						onToggle={handleToggleServerHome}
					>
						使用服务器配置的主页行
					</SwitchItem>
					<SwitchItem
						className={css.switchItem}
						selected={integrationPreferences?.watchlistEnabled === true}
						onToggle={handleToggleWatchlist}
					>
						点赞关注列表
					</SwitchItem>
					<SwitchItem
						className={css.switchItem}
						selected={settings.homeRows?.recentlyAdded !== false}
						onToggle={homeRowToggleHandlers.recentlyAdded}
					>
						最近添加
					</SwitchItem>
					<SwitchItem
						className={css.switchItem}
						selected={settings.homeRows?.continueWatching !== false}
						onToggle={homeRowToggleHandlers.continueWatching}
					>
						继续观看
					</SwitchItem>
					<SwitchItem
						className={css.switchItem}
						selected={settings.homeRows?.nextUp !== false}
						onToggle={homeRowToggleHandlers.nextUp}
					>
						接下来播放
					</SwitchItem>
					<SwitchItem
						className={css.switchItem}
						selected={settings.homeRows?.latestMovies !== false}
						onToggle={homeRowToggleHandlers.latestMovies}
					>
						最新电影
					</SwitchItem>
					<SwitchItem
						className={css.switchItem}
						selected={settings.homeRows?.latestShows !== false}
						onToggle={homeRowToggleHandlers.latestShows}
					>
						最新电视剧
					</SwitchItem>
					<SwitchItem
						className={css.switchItem}
						selected={settings.homeRows?.myRequests !== false}
						onToggle={homeRowToggleHandlers.myRequests}
					>
						我的请求
					</SwitchItem>
					<div className={css.rowOrderHeader}>行顺序</div>
					<div className={css.rowOrderList}>
						{(settings.homeRowOrder || HOME_ROW_ORDER).map((rowKey, index, list) => (
							<div key={rowKey} className={css.rowOrderItem}>
								<BodyText className={css.rowOrderLabel}>{getHomeRowLabel(rowKey)}</BodyText>
								<div className={css.rowOrderActions}>
									<Button
										size="small"
										minWidth={false}
										disabled={index === 0}
										data-row-key={rowKey}
										onClick={moveHomeRowUp}
									>
										上移
									</Button>
									<Button
										size="small"
										minWidth={false}
										disabled={index === list.length - 1}
										data-row-key={rowKey}
										onClick={moveHomeRowDown}
									>
										下移
									</Button>
								</div>
							</div>
						))}
					</div>
				</section>
			) : null}

			{shouldRenderSection('playback') ? (
				<section className={css.section}>
					<BodyText className={css.sectionTitle}>播放</BodyText>
					<SwitchItem
						className={css.switchItem}
						onToggle={settingToggleHandlers.autoPlayNext}
						selected={settings.autoPlayNext}
					>
						自动播放下一集
					</SwitchItem>
					<SwitchItem
						className={css.switchItem}
						onToggle={settingToggleHandlers.showPlayNextPrompt}
						selected={settings.showPlayNextPrompt !== false}
					>
						显示继续播放提示
					</SwitchItem>
					<Item
						className={css.settingItem}
						label="继续播放提示模式"
						slotAfter={getPlayNextPromptModeLabel(settings.playNextPromptMode)}
						onClick={openPlayNextPromptModePopup}
					/>
					<SwitchItem
						className={css.switchItem}
						onToggle={settingToggleHandlers.skipIntro}
						selected={settings.skipIntro}
					>
						显示跳过片头/回顾提示
					</SwitchItem>
				</section>
			) : null}

			{shouldRenderSection('transcoding') ? (
				<section className={css.section}>
					<BodyText className={css.sectionTitle}>转码</BodyText>
					<Item
						className={css.settingItem}
						label="最大位率"
						slotAfter={getBitrateLabel(settings.maxBitrate)}
						onClick={openBitratePopup}
					/>
					<SwitchItem
						className={css.switchItem}
						onToggle={settingToggleHandlers.enableTranscoding}
						selected={settings.enableTranscoding}
					>
						启用转码
					</SwitchItem>
					<SwitchItem
						className={css.switchItem}
						onToggle={settingToggleHandlers.forceTranscoding}
						selected={settings.forceTranscoding}
					>
						强制转码（始终）
					</SwitchItem>
					<SwitchItem
						className={css.switchItem}
						onToggle={settingToggleHandlers.enableFmp4HlsContainerPreference}
						selected={settings.enableFmp4HlsContainerPreference === true}
					>
						启用 fMP4-HLS 容器偏好
					</SwitchItem>
					<SwitchItem
						className={css.switchItem}
						onToggle={settingToggleHandlers.forceFmp4HlsContainerPreference}
						selected={settings.forceFmp4HlsContainerPreference === true}
					>
						强制 fMP4-HLS 容器偏好
					</SwitchItem>
				</section>
			) : null}

			{shouldRenderSection('subtitles') ? (
				<section className={css.section}>
					<BodyText className={css.sectionTitle}>字幕</BodyText>
					<Item
						className={css.settingItem}
						label="首选字幕语言"
						slotAfter={getLanguageLabel(settings.preferredSubtitleLanguage)}
						onClick={openSubtitleLangPopup}
					/>
					<SwitchItem
						className={css.switchItem}
						onToggle={settingToggleHandlers.smartSubtitleTranscoding}
						selected={smartSubtitleTranscodingEnabled}
					>
						智能字幕处理
					</SwitchItem>
					<Item
						className={css.settingItem}
						label="ASS/SSA 字幕渲染器"
						disabled={!assSubtitleRendererControl.enabled}
						slotAfter={assSubtitleRendererControl.label}
						onClick={assSubtitleRendererControl.enabled ? openAssSubtitleRendererPopup : null}
					/>
					<Item
						className={css.settingItem}
						label="位图字幕渲染器"
						disabled={!bitmapSubtitleRendererControl.enabled}
						slotAfter={bitmapSubtitleRendererControl.label}
						onClick={bitmapSubtitleRendererControl.enabled ? openBitmapSubtitleRendererPopup : null}
					/>
					<SwitchItem
						className={css.switchItem}
						onToggle={settingToggleHandlers.enableSubtitleBurnIn}
						disabled={smartSubtitleTranscodingEnabled}
						selected={settings.enableSubtitleBurnIn !== false}
					>
						手动字幕烧录
					</SwitchItem>
					<SwitchItem
						className={css.switchItem}
						onToggle={settingToggleHandlers.forceTranscodingWithSubtitles}
						selected={settings.forceTranscodingWithSubtitles}
					>
						在 HDR/DV 上强制字幕烧录
					</SwitchItem>
					<Item
						className={css.settingItem}
						label="字幕烧录格式"
						disabled={!subtitleBurnInFormatsControl.enabled}
						slotAfter={subtitleBurnInFormatsControl.label}
						onClick={subtitleBurnInFormatsControl.enabled ? openSubtitleBurnInTextCodecsPopup : null}
					/>
				</section>
			) : null}

			{shouldRenderSection('subtitleAppearance') ? (
				<section className={css.section}>
					<BodyText className={css.sectionTitle}>Breezyfin 字幕外观</BodyText>
					<Item
						className={css.settingItem}
						label="Breezyfin 字幕字号"
						slotAfter={subtitleOverlayFontSizeLabel}
						onClick={openSubtitleOverlaySizePopup}
					/>
					<Item
						className={css.settingItem}
						label="Breezyfin 字幕位置"
						slotAfter={subtitleOverlayPositionLabel}
						onClick={openSubtitleOverlayPositionPopup}
					/>
					<Item
						className={css.settingItem}
						label="Breezyfin 字幕背景"
						slotAfter={subtitleOverlayBackgroundLabel}
						onClick={openSubtitleOverlayBackgroundPopup}
					/>
					<Item
						className={css.settingItem}
						label="Breezyfin 字幕字重"
						slotAfter={subtitleOverlayWeightLabel}
						onClick={openSubtitleOverlayWeightPopup}
					/>
					<Item
						className={css.settingItem}
						label="Breezyfin 字幕文字颜色"
						slotAfter={subtitleOverlayTextColorLabel}
						onClick={openSubtitleOverlayTextColorPopup}
					/>
					<Item
						className={css.settingItem}
						label="Breezyfin 字幕边框样式"
						slotAfter={subtitleOverlayBorderStyleLabel}
						onClick={openSubtitleOverlayBorderStylePopup}
					/>
					<Item
						className={css.settingItem}
						label="Breezyfin 字幕边框颜色"
						slotAfter={subtitleOverlayBorderColorLabel}
						onClick={openSubtitleOverlayBorderColorPopup}
					/>
					<Item
						className={css.settingItem}
						label="Breezyfin 字幕框边框粗细"
						slotAfter={subtitleOverlayBorderStrengthLabel}
						onClick={openSubtitleOverlayBorderStrengthPopup}
					/>
					<Item
						className={css.settingItem}
						label="Breezyfin 字幕描边宽度"
						slotAfter={subtitleOverlayOutlineSizeLabel}
						onClick={openSubtitleOverlayOutlineSizePopup}
					/>
					<Item
						className={css.settingItem}
						label="Breezyfin 字幕阴影距离"
						slotAfter={subtitleOverlayShadowDistanceLabel}
						onClick={openSubtitleOverlayShadowDistancePopup}
					/>
					<Item
						className={css.settingItem}
						label="Breezyfin 字幕阴影角度"
						slotAfter={subtitleOverlayShadowAngleLabel}
						onClick={openSubtitleOverlayShadowAnglePopup}
					/>
				</section>
			) : null}

			{shouldRenderSection('display') ? (
				<section className={css.section}>
					<BodyText className={css.sectionTitle}>显示</BodyText>
					<Item
						className={css.settingItem}
						label="导航栏主题"
						slotAfter={getNavbarThemeLabel(settings.navbarTheme)}
						onClick={openNavbarThemePopup}
					/>
					<Item
						className={css.settingItem}
						label="屏保"
						slotAfter={screensaverTimeoutLabel}
						onClick={openScreensaverTimeoutPopup}
					/>
					<SwitchItem
						className={css.switchItem}
						onToggle={settingToggleHandlers.showBackdrops}
						selected={settings.showBackdrops}
					>
						显示背景图片
					</SwitchItem>
					<SwitchItem
						className={css.switchItem}
						onToggle={settingToggleHandlers.showSeasonImages}
						selected={settings.showSeasonImages === true}
					>
						显示季卡片图片（典雅）
					</SwitchItem>
					<SwitchItem
						className={css.switchItem}
						onToggle={settingToggleHandlers.useSidewaysEpisodeList}
						selected={settings.useSidewaysEpisodeList !== false}
					>
						横版分集列表（典雅）
					</SwitchItem>
					<SwitchItem
						className={css.switchItem}
						onToggle={settingToggleHandlers.disableAnimations}
						selected={settings.disableAnimations}
					>
						禁用动画（性能模式）
					</SwitchItem>
					<SwitchItem
						className={css.switchItem}
						onToggle={settingToggleHandlers.disableAllAnimations}
						selected={settings.disableAllAnimations}
					>
						禁用全部动画（性能+模式）
					</SwitchItem>
					<SwitchItem
						className={css.switchItem}
						onToggle={settingToggleHandlers.showMediaBar}
						selected={settings.showMediaBar !== false}
					>
						在主页显示媒体栏
					</SwitchItem>
				</section>
			) : null}

			{shouldRenderSection('languages') ? (
				<section className={css.section}>
					<BodyText className={css.sectionTitle}>音频语言偏好</BodyText>
					<Item
						className={css.settingItem}
						label="首选音频语言"
						slotAfter={getLanguageLabel(settings.preferredAudioLanguage)}
						onClick={openAudioLangPopup}
					/>
				</section>
			) : null}

			{shouldRenderSection('about') ? (
				<section className={css.section}>
					<BodyText className={css.sectionTitle}>关于</BodyText>
					<Item className={css.infoItem} label="应用版本" slotAfter={appVersion} />
					<Item className={css.infoItem} label="平台" slotAfter="webOS TV" />
					<Item className={css.infoItem} label="webOS 版本" slotAfter={webosVersionLabel} />
				</section>
			) : null}

			{shouldRenderSection('diagnostics') ? (
				<section className={css.section}>
					<BodyText className={css.sectionTitle}>诊断</BodyText>
					<SwitchItem
						className={css.switchItem}
						onToggle={settingToggleHandlers.enableDiagnostics}
						selected={settings.enableDiagnostics === true}
					>
						启用诊断
					</SwitchItem>
					<BodyText className={css.sectionHint}>
						启用运行时指标和持续故障排查日志。这可能会影响电视性能。
					</BodyText>
					<SwitchItem
						className={css.switchItem}
						disabled={settings.enableDiagnostics !== true}
						onToggle={settingToggleHandlers.showPerformanceOverlay}
						selected={settings.showPerformanceOverlay === true}
					>
						性能叠加层（FPS/输入）
					</SwitchItem>
					<SwitchItem
						className={css.switchItem}
						disabled={settings.enableDiagnostics !== true}
						onToggle={settingToggleHandlers.showExtendedPlayerDebugOverlay}
						selected={settings.showExtendedPlayerDebugOverlay === true}
					>
						扩展播放器调试指标
					</SwitchItem>
					<SwitchItem
						className={css.switchItem}
						disabled={settings.enableDiagnostics !== true}
						onToggle={settingToggleHandlers.showFocusDebugOverlay}
						selected={settings.showFocusDebugOverlay === true}
					>
						焦点调试叠加层（全部面板）
					</SwitchItem>
					<SwitchItem
						className={css.switchItem}
						disabled={settings.enableDiagnostics !== true}
						onToggle={settingToggleHandlers.verboseAppLogs}
						selected={settings.verboseAppLogs === true}
					>
						详细应用日志
					</SwitchItem>
					{isNonStableBuild ? (
						<SwitchItem
							className={css.switchItem}
							disabled={settings.enableDiagnostics !== true}
							onToggle={settingToggleHandlers.showDebugErrorMenu}
							selected={settings.showDebugErrorMenu === true}
						>
							调试错误菜单（仅限非稳定版本）
						</SwitchItem>
					) : null}
					<SwitchItem
						className={css.switchItem}
						onToggle={settingToggleHandlers.forceDolbyVision}
						selected={settings.forceDolbyVision === true}
					>
						强制 DV（调试）
					</SwitchItem>
					<SwitchItem
						className={css.switchItem}
						onToggle={settingToggleHandlers.relaxedPlaybackProfile}
						selected={settings.relaxedPlaybackProfile === true}
					>
						放宽播放配置文件（调试）
					</SwitchItem>
					<Item
						className={css.settingItem}
						label="日志"
						slotAfter={`${appLogCount} 条日志`}
						onClick={openLogsPopup}
					/>
					<Item
						className={css.settingItem}
						label="清除缓存（保留登录）"
						slotAfter={cacheWipeInProgress ? '清除中...' : '执行'}
						onClick={openWipeCacheKeepLoginConfirm}
					/>
					<Item
						className={css.settingItem}
						label="清除应用缓存"
						slotAfter={cacheWipeInProgress ? '清除中...' : '执行'}
						onClick={openWipeCacheConfirm}
					/>
				</section>
			) : null}

			{shouldRenderSection('capabilities') ? (
				<section className={css.section}>
					<BodyText className={css.sectionTitle}>设备播放能力</BodyText>
					<Item
						className={css.infoItem}
						label="能力探测"
						slotAfter={<span className={css.infoItemValueWrap}>{capabilityProbeLabel}</span>}
					/>
					<Item
						className={css.settingItem}
						label="探测刷新周期"
						slotAfter={getCapabilityProbeRefreshPeriodLabel(settings.capabilityProbeRefreshDays)}
						onClick={openCapabilityProbeRefreshPopup}
					/>
					<Item
						className={css.settingItem}
						label="立即刷新能力"
						slotAfter="执行"
						onClick={handleRefreshCapabilitiesNow}
					/>
					<Item className={css.infoItem} label="动态范围" slotAfter={dynamicRangeLabel} />
					<Item className={css.infoItem} label="MKV 中的杜比视界" slotAfter={dolbyVisionMkvLabel} />
					<Item className={css.infoItem} label="WebP 图片解码" slotAfter={webpImageDecodeLabel} />
					<Item
						className={`${css.infoItem} ${css.collapsibleInfoItem} ${expandedCapabilityRows.videoCodecs ? css.collapsibleInfoItemExpanded : ''}`}
						label="视频编解码"
						slotAfter={(
							<span className={`${css.infoItemValueWrap} ${expandedCapabilityRows.videoCodecs ? css.infoItemValueWrapExpanded : ''}`}>
								{videoCodecsLabel}
							</span>
						)}
						onClick={handleToggleVideoCodecs}
					/>
					<Item
						className={`${css.infoItem} ${css.collapsibleInfoItem} ${expandedCapabilityRows.audioCodecs ? css.collapsibleInfoItemExpanded : ''}`}
						label="音频编解码"
						slotAfter={(
							<span className={`${css.infoItemValueWrap} ${expandedCapabilityRows.audioCodecs ? css.infoItemValueWrapExpanded : ''}`}>
								{audioCodecsLabel}
							</span>
						)}
						onClick={handleToggleAudioCodecs}
					/>
					<Item className={css.infoItem} label="杜比全景声（EAC3 JOC）" slotAfter={atmosLabel} />
					<Item className={css.infoItem} label="DTS / TrueHD" slotAfter={hdAudioLabel} />
					<Item className={css.infoItem} label="最大声道数" slotAfter={maxAudioChannelsLabel} />
					<Item className={css.infoItem} label="最大串流位率" slotAfter={maxStreamingBitrateLabel} />
				</section>
			) : null}
		</div>
	);
};

export default SettingsSections;
