import {isMaster} from "../../database/helpers/is-master";
import {ItemsService, RolesService} from "../../services";
import {getSchema} from "../../utils/get-schema";
import {ActionHandler } from "../../types";
import getDatabase from "../../database";
import env from "../../env";

export const actionDelete: ActionHandler = async (meta, context) => {
	if (!isMaster(context.database)) {
		return;
	}

	const masterDB = getDatabase();
	const masterSchema = await getSchema({ database: masterDB });

	const instituteService = new ItemsService('institute', {
		knex: masterDB,
		schema: masterSchema,
	});

	const institutes = await instituteService.readByQuery({
		fields: ['db_name']
	});

	institutes.push({
		db_name: env.DB_TEMPLATE,
	});

	for (const institute of institutes) {
		const knex = getDatabase(institute.db_name, { database: institute.db_name });
		const schema = await getSchema({ database: knex });

		const roleService = new RolesService({knex, schema});
		await roleService.deleteMany(meta.payload);
	}
}
