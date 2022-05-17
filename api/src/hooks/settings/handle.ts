import {ItemsService, SettingsService} from "../../services";
import {ActionHandler, SchemaOverview} from "../../types";
import {pick} from "lodash";

export const handle: ActionHandler = async (meta, ctx) => {
	const options = {
		knex: ctx.database,
		schema: ctx.schema as SchemaOverview,
		accountability: ctx.accountability
	};

	const service = meta.collection === 'directus_settings'
		? new ItemsService('website', options)
		: new SettingsService(options);

	await service.upsertSingleton(pick(meta.payload, 'id', 'project_logo', 'project_name'), {
		emitEvents: false,
	});
}
