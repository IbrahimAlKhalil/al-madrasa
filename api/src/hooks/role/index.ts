import {registerHook} from "../../utils/register-hook";
import {actionCreate} from "./action-create";
import {actionDelete} from "./action-delete";

export default registerHook((hook) => {
	hook.action('roles.create', actionCreate);
	hook.action('roles.delete', actionDelete);
	hook.action('roles.update', actionCreate);
});
