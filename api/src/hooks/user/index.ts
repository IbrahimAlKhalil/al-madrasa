import {commonDeleteMaster} from '../app/common-delete-master';
import {commonCopyMaster} from '../app/common-copy-master';
import {registerHook} from '../../utils/register-hook';
import {omit} from 'lodash';

export default registerHook((hook) => {
	hook.action('roles.create', commonCopyMaster);
	hook.action(
		'roles.update',
		async (meta, ctx) => {
			meta.payload = omit(meta.payload, 'last_page');
			await commonCopyMaster(meta, ctx);
		}
	);
	hook.action('roles.delete', commonDeleteMaster);
});
