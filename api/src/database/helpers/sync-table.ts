import {getSchema} from "../../utils/get-schema";
import {ItemsService} from "../../services";
import getDatabase from "../index";
import {Knex} from "knex";
import {isEqual, omit} from "lodash";

export async function syncTable(database: Knex | string, table: string, fields: string[]) {
	const masterDB = getDatabase();

	if (typeof database === 'string') {
		database = getDatabase(database);
	}

	const masterService = new ItemsService(table,{
		knex: masterDB,
		schema: await getSchema(),
	});

	const items = await masterService.readByQuery({ fields });

	const service = new ItemsService(table,{
		knex: database,
		schema: await getSchema({database}),
	});

	for (const item of items) {
		let has;

		try {
			has = await service.readOne(item.id, { fields });
		} catch (e) {
		}

		if (has) {
			if (isEqual(has, item)) {
				continue;
			}

			await service.updateOne(item.id, omit(item, 'id'), {
				emitEvents: false,
			});

			continue;
		}

		await service.createOne(item, {
			emitEvents: false,
		});
	}
}
