import {registerHook} from "../../utils/register-hook";
import {handle} from "./handle";

export default registerHook((hook) => {
	hook.action('settings.create', handle);
	hook.action('settings.update', handle)
	hook.action('website.items.create', handle)
	hook.action('website.items.update', handle);
});
