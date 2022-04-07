
import GlobalSettings from './global-settings';

const { registerPlugin } = wp.plugins;

registerPlugin( 'wprig-global-settings', {
	render() {
		return <GlobalSettings />;
	},
} );

