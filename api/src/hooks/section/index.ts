import {syncItemDelete} from "../../database/helpers/sync-item-delete";
import {syncItem} from "../../database/helpers/sync-item";
import {registerHook} from "../../utils/register-hook";

export default registerHook((hook) => {
	hook.action('theme_page_section.items.create', syncItem);
	hook.action('theme_page_section.items.update', syncItem);
	hook.action('theme_page_section.items.delete', syncItemDelete);
});
