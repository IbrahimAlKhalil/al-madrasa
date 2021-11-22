import {syncItemDelete} from "../../database/helpers/sync-item-delete";
import {syncItem} from "../../database/helpers/sync-item";
import {registerHook} from "../../utils/register-hook";

export default registerHook((hook) => {
	hook.action('roles.create', syncItem);
	hook.action('roles.delete', syncItemDelete);
	hook.action('roles.update', syncItem);
});
