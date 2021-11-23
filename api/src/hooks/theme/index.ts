import {commonDeleteMaster} from "../app/common-delete-master";
import {commonCopyMaster} from "../app/common-copy-master";
import {registerHook} from "../../utils/register-hook";

export default registerHook((hook) => {
	hook.action('theme.items.create', commonCopyMaster);
	hook.action('theme.items.update', commonCopyMaster);
	hook.action('theme.items.delete', commonDeleteMaster);
});
