import {registerHook} from "../../utils/register-hook";
import {filterDelete} from "./filter-delete";
import {actionCreate} from "./action-create";
import {filterCreate} from "./filter-create";
import {actionUpdate} from "./action-update";

export default registerHook((hook) => {
	hook.filter('institute.items.create', filterCreate);
	hook.action('institute.items.create', actionCreate);
	hook.filter('institute.items.delete', filterDelete);
	hook.action('institute.items.update', actionUpdate);
});
