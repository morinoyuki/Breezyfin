import BreezyLoadingOverlay from '../../../components/BreezyLoadingOverlay';
import css from '../../PlayerPanel.module.less';

const PlayerLoadingOverlay = ({loading, label = '加载中...'}) => {
	if (!loading) return null;

	return (
		<BreezyLoadingOverlay className={css.loading} label={label} />
	);
};

export default PlayerLoadingOverlay;
