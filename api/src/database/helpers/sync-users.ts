import {getSchema} from "../../utils/get-schema";
import {UsersService} from "../../services";
import getDatabase from "../index";
import {Knex} from "knex";
import {isEqual, omit} from "lodash";

export async function syncUsers(database: Knex | string) {
	const masterDB = getDatabase();

	if (typeof database === 'string') {
		database = getDatabase(database);
	}

	const masterUserService = new UsersService({
		knex: masterDB,
		schema: await getSchema({
			database: masterDB,
		}),
	});

	const instituteUserService = new UsersService({
		knex: database,
		schema: await getSchema({database})
	});

	const fields = ['id', 'email', 'status', 'role', 'first_name', 'last_name', 'location', 'title', 'description', 'tags', 'auth_data', 'token'];

	const users = await masterUserService.readByQuery({fields});

	for (const user of users) {
		let hasUser;

		try {
			hasUser = await instituteUserService.readOne(user.id,{fields});
		} catch (e) {
		}

		if (hasUser) {
			if (isEqual(hasUser, user)) {
				continue;
			}

			await instituteUserService.updateOne(user.id, omit(user, 'id'), {
				emitEvents: false,
			});
			continue;
		}

		await instituteUserService.createOne(user, {
			emitEvents: false,
		});

		const passwordResult = await masterDB('directus_users')
			.select('password')
			.where('id', user.id)
			.first();

		await database('directus_users')
			.where('id', user.id)
			.update({password: passwordResult.password})
	}
}
