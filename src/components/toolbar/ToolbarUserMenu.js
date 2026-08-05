import Button from '../BreezyButton';
import css from '../Toolbar.module.less';

const ToolbarUserMenu = ({
	isElegantTheme,
	showUserMenu,
	onLogout,
	onSwitchUser,
	onExit
}) => {
	if (!showUserMenu) return null;

	return (
		<div className={`${css.userMenu} ${isElegantTheme ? css.userMenuElegant : ''}`}>
			{isElegantTheme && (
				<>
					<div className={`${css.liquidLayerFilter} ${css.liquidLayerFilterMuted}`} />
					<div className={css.liquidLayerOverlay} />
					<div className={css.liquidLayerSpecular} />
				</>
			)}
			<div className={css.userMenuInner}>
				<Button size="small" focusEffect="static" backgroundOpacity="transparent" shadowed={false} onClick={onLogout} className={css.menuButton}>退出登录</Button>
				<Button size="small" focusEffect="static" backgroundOpacity="transparent" shadowed={false} onClick={onSwitchUser} className={css.menuButton}>切换用户</Button>
				<Button size="small" focusEffect="static" backgroundOpacity="transparent" shadowed={false} onClick={onExit} className={css.menuButton}>退出</Button>
			</div>
		</div>
	);
};

export default ToolbarUserMenu;
