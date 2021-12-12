import {registerHook} from '../../utils/register-hook';
import {initApp} from './init-app';

export default registerHook((hook) => {
	hook.init('app.after', (...args) => {
		setTimeout(() => {
			initApp(...args);
		}, 1000 * 60 * 5);
	});
});
