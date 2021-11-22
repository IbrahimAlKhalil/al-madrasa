import {registerHook} from "../../utils/register-hook";
import {actionCreate} from "./action-create";
import {actionDelete} from "./action-delete";

export default registerHook((hook) => {
	hook.action('users.create', actionCreate);
	hook.action('users.delete', actionDelete);
	hook.action('users.update', actionCreate);
});
