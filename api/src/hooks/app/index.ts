import {registerHook} from '../../utils/register-hook';
import {initApp} from './init-app';
import env from '../../env';

export default registerHook((hook) => {
	hook.init('app.after', (...args) => {
		if (env.NODE_ENV === 'development') {
			initApp(...args);
		} else {
			setTimeout(() => {
				initApp(...args);
			}, 1000 * 60 * 5);
		}
	});
});
