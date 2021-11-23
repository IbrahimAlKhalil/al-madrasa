import {commonDeleteMaster} from "../app/common-delete-master";
import {commonCopyMaster} from "../app/common-copy-master";
import {registerHook} from "../../utils/register-hook";

export default registerHook((hook) => {
	hook.action('theme_page.items.create', commonCopyMaster);
	hook.action('theme_page.items.update', commonCopyMaster);
	hook.action('theme_page.items.delete', commonDeleteMaster);
});
