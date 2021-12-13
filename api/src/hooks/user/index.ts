import {commonDeleteMaster} from '../app/common-delete-master';
import {commonCopyMaster} from '../app/common-copy-master';
import {registerHook} from '../../utils/register-hook';
import {omit} from 'lodash';

export default registerHook((hook) => {
	hook.action('users.create', commonCopyMaster);
	hook.action(
		'users.update',
		async (meta, ctx) => {
			meta.payload = omit(meta.payload, 'last_page');
			await commonCopyMaster(meta, ctx);
		}
	);
	hook.action('users.delete', commonDeleteMaster);
});
