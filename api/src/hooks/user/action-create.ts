import {isMaster} from "../../database/helpers/is-master";
import {ItemsService, UsersService} from "../../services";
import {getSchema} from "../../utils/get-schema";
import {ActionHandler} from "../../types";
import getDatabase from "../../database";
import {isEmpty, omit} from "lodash";
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

	const masterUserService = new UsersService({
		knex: masterDB,
		schema: masterSchema,
	});

	const institutes = await instituteService.readByQuery({
		fields: ['db_name']
	});

	const userId = meta.key ?? meta.keys[0];
	const user = await masterUserService.readOne(userId);

	institutes.push({
		db_name: env.DB_TEMPLATE,
	});

	for (const institute of institutes) {
		const knex = getDatabase(institute.db_name, {database: institute.db_name});
		const schema = await getSchema({database: knex});
		const userService = new UsersService({knex, schema});

		let hasUser;

		try {
			hasUser = await userService.readOne(userId);
		} catch (e) {
		}

		if (hasUser) {
			const payload = omit({
				...meta.payload,
			}, 'last_page', 'avatar');

			if (isEmpty(payload)) {
				continue;
			}

			await userService.updateOne(meta.keys[0], payload);
			continue;
		}

		await userService.createOne(omit({
			...user,
			...meta.payload,
		}, 'avatar'), {
			emitEvents: false,
		})
	}
}
