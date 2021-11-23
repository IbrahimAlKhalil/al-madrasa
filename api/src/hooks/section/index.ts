import {commonDeleteMaster} from "../app/common-delete-master";
import {commonCopyMaster} from "../app/common-copy-master";
import {registerHook} from "../../utils/register-hook";

export default registerHook((hook) => {
	hook.action('theme_page_section.items.create', commonCopyMaster);
	hook.action('theme_page_section.items.update', commonCopyMaster);
	hook.action('theme_page_section.items.delete', commonDeleteMaster);
});
