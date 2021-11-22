import {getSchema} from "../../utils/get-schema";
import {ItemsService } from "../../services";
import {isEmpty, isEqual, isObjectLike, omitBy} from "lodash";
import {ActionHandler} from "../../types";
import getDatabase from "../../database";
import {isMaster} from "./is-master";
import env from "../../env";

export const syncItem: ActionHandler = async (meta, context) => {
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

	const id = meta.key ?? meta.keys[0];

	institutes.push({
		db_name: env.DB_TEMPLATE,
	});

	const payload = omitBy(meta.payload, isObjectLike);

	for (const institute of institutes) {
		const knex = getDatabase(institute.db_name, {database: institute.db_name});
		const schema = await getSchema({database: knex});
		const service = new ItemsService(meta.collection, {knex, schema});

		let hasItem;

		try {
			hasItem = await service.readOne(id, { fields: Object.keys(payload) });
		} catch (e) {
		}

		if (hasItem) {
			if (isEmpty(payload) || isEqual(hasItem, payload)) {
				continue;
			}

			await service.updateOne(meta.keys[0], payload, {
				emitEvents: false,
			});
			continue;
		}

		await service.createOne(payload, { emitEvents: false });
	}
}
