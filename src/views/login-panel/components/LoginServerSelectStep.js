import BodyText from '@enact/sandstone/BodyText';
import Button from '../../../components/BreezyButton';

const LoginServerSelectStep = ({
	servers,
	loading,
	onServerSelect,
	onBack,
	css
}) => (
	<div className={css.form}>
		<BodyText className={css.serverInfo}>选择要将用户添加到的已保存服务器。</BodyText>
		<div className={css.savedList}>
			{servers.map((server) => (
				<Button
					key={server.serverId}
					data-server-id={server.serverId}
					onClick={onServerSelect}
					disabled={loading}
					size="large"
					className={css.authTextButton}
				>
					{server.serverName || server.url || 'Jellyfin 服务器'}
				</Button>
			))}
		</div>
		<Button
			onClick={onBack}
			disabled={loading}
			size="large"
			focusEffect="static"
			className={css.authTextButton}
		>
			返回
		</Button>
	</div>
);

export default LoginServerSelectStep;
