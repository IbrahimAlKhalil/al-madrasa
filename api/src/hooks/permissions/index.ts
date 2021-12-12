import {commonDeleteTemplate} from '../app/common-delete-template';
import {commonCopyTemplate} from '../app/common-copy-template';
import {registerHook} from "../../utils/register-hook";

export default registerHook((hook) => {
	hook.action('permissions.create', commonCopyTemplate);
	hook.action('permissions.update', commonCopyTemplate);
	hook.action('permissions.delete', commonDeleteTemplate);
});
