import {registerHook} from "../../utils/register-hook";
import {initApp} from "./init-app";

export default registerHook((hook) => {
	hook.init('app.after', initApp);
});
