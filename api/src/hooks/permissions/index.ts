import {syncItemDelete} from "../../database/helpers/sync-item-delete";
import {syncItem} from "../../database/helpers/sync-item";
import {registerHook} from "../../utils/register-hook";

export default registerHook((hook) => {
	hook.action('permissions.create', syncItem);
	hook.action('permissions.delete', syncItemDelete);
	hook.action('permissions.update', syncItem);
});
