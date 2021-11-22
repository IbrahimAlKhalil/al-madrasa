import {syncItemDelete} from "../../database/helpers/sync-item-delete";
import {syncItem} from "../../database/helpers/sync-item";
import {registerHook} from "../../utils/register-hook";
import {isEmpty, omit} from "lodash";

export default registerHook((hook) => {
	hook.action('users.create', syncItem);
	hook.action('users.delete', syncItemDelete);
	hook.action('users.update', (meta, context) => {
		const payload = omit(meta.payload, 'last_page');

		if (isEmpty(payload)) {
			return;
		}

		syncItem(meta, context);
	});
});
