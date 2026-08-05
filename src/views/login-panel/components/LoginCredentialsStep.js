import BodyText from '@enact/sandstone/BodyText';
import Input from '@enact/sandstone/Input';
import Button from '../../../components/BreezyButton';

const LoginCredentialsStep = ({
	serverUrl,
	username,
	password,
	loading,
	onUsernameChange,
	onUsernameKeyDown,
	onPasswordChange,
	onPasswordKeyDown,
	onBack,
	onLogin,
	css
}) => (
	<div className={css.form}>
		<BodyText className={css.serverInfo}>Server: {serverUrl}</BodyText>
		<Input
			placeholder="用户名"
			value={username}
			onChange={onUsernameChange}
			disabled={loading}
			onKeyDown={onUsernameKeyDown}
			className={`bf-input-trigger ${css.inputField}`}
		/>
		<Input
			type="password"
			placeholder="密码（可选）"
			value={password}
			onChange={onPasswordChange}
			onKeyDown={onPasswordKeyDown}
			disabled={loading}
			className={`bf-input-trigger ${css.inputField}`}
		/>
		<div className={css.buttonRow}>
			<Button
				onClick={onBack}
				disabled={loading}
				size="large"
				focusEffect="static"
				className={css.authTextButton}
			>
				返回
			</Button>
			<Button
				onClick={onLogin}
				disabled={!String(username || '').trim() || loading}
				size="large"
				focusEffect="static"
				className={css.authTextButton}
			>
				{loading ? 'Signing In...' : 'Sign In'}
			</Button>
		</div>
	</div>
);

export default LoginCredentialsStep;
