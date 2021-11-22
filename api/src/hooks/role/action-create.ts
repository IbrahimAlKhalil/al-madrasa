import {isMaster} from "../../database/helpers/is-master";
import {getSchema} from "../../utils/get-schema";
import {ItemsService } from "../../services";
import {ActionHandler} from "../../types";
import getDatabase from "../../database";
import env from "../../env";

export const actionCreate: ActionHandler = async (meta, context) => {
	if (!isMaster(context.database)) {
		return;
	}

	const masterDB = getDatabase();
	const masterSchema = await getSchema({database: masterDB});

	const instituteService = new ItemsService('institute', {
		knex: masterDB,
		schema: masterSchema,
	});

	const institutes = await instituteService.readByQuery({
		fields: ['db_name']
	});

	const roleId = meta.key ?? meta.keys[0];

	institutes.push({
		db_name: env.DB_TEMPLATE,
	});

	for (const institute of institutes) {
		const knex = getDatabase(institute.db_name, {database: institute.db_name});
		const schema = await getSchema({database: knex});
		const roleService = new ItemsService('directus_roles', {knex, schema});

		let hasRole;

		try {
			hasRole = await roleService.readOne(roleId);
		} catch (e) {
		}

		if (hasRole) {
			await roleService.updateOne(meta.keys[0], meta.payload, {
				emitEvents: false,
			});
			continue;
		}

		await roleService.createOne(meta.payload, { emitEvents: false });
	}
}
