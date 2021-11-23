import {commonDeleteMT} from "../app/common-delete-mt";
import {registerHook} from "../../utils/register-hook";
import {commonCopyMT} from "../app/common-copy-mt";

export default registerHook((hook) => {
	hook.action('permissions.create', commonCopyMT);
	hook.action('permissions.update', commonCopyMT);
	hook.action('permissions.delete', commonDeleteMT);
});
