import {isMaster} from "../../database/helpers/is-master";
import {FilterHandler} from "../../types";
import crypto from "crypto";

export const filterCreate: FilterHandler = async (payload, meta, context) => {
	if (!isMaster(context.database)) {
		return payload;
	}

	return {
		db_name: `am_institute_${payload.code}`,
		db_user: `am_institute_${payload.code}`,
		db_password: crypto.randomBytes(24).toString('hex'),
		...payload,
	};
}
