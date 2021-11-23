import {registerHook} from "../../utils/register-hook";
import {commonDeleteMT} from "../app/common-delete-mt";
import {commonCopyMT} from "../app/common-copy-mt";

export default registerHook((hook) => {
	hook.action('roles.create', commonCopyMT);
	hook.action('roles.update', commonCopyMT);
	hook.action('roles.delete', commonDeleteMT);
});
