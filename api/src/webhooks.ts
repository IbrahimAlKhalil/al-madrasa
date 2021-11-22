import axios from 'axios';
import {databases} from './database';
import emitter from './emitter';
import logger from './logger';
import { ActionHandler, Webhook, WebhookHeader } from './types';
import { pick } from 'lodash';
import { WebhooksService } from './services';
import { getSchema } from './utils/get-schema';

let registered: { event: string; handler: ActionHandler }[] = [];

export async function register(): Promise<void> {
	unregister();

	for (const key in databases) {
		if (!databases.hasOwnProperty(key)) {
			continue
		}

		const webhookService = new WebhooksService({ knex: databases[key], schema: await getSchema({ database: databases[key] }) });

		const webhooks = await webhookService.readByQuery({ filter: { status: { _eq: 'active' } } });
		for (const webhook of webhooks) {
			if (webhook.actions.includes('*')) {
				const event = 'items.*';
				const handler = createHandler(webhook);
				emitter.onAction(event, handler);
				registered.push({ event, handler });
			} else {
				for (const action of webhook.actions) {
					const event = `items.${action}`;
					const handler = createHandler(webhook);
					emitter.onAction(event, handler);
					registered.push({ event, handler });
				}
			}
		}
	}
}

export function unregister(): void {
	for (const { event, handler } of registered) {
		emitter.offAction(event, handler);
	}

	registered = [];
}

function createHandler(webhook: Webhook): ActionHandler {
	return async (data) => {
		if (webhook.collections.includes('*') === false && webhook.collections.includes(data.collection) === false) return;

		const webhookPayload = pick(data, [
			'event',
			'accountability.user',
			'accountability.role',
			'collection',
			'item',
			'action',
			'payload',
		]);

		try {
			await axios({
				url: webhook.url,
				method: webhook.method,
				data: webhook.data ? webhookPayload : null,
				headers: mergeHeaders(webhook.headers),
			});
		} catch (error: any) {
			logger.warn(`Webhook "${webhook.name}" (id: ${webhook.id}) failed`);
			logger.warn(error);
		}
	};
}

function mergeHeaders(headerArray: WebhookHeader[]) {
	const headers: Record<string, string> = {};

	for (const { header, value } of headerArray ?? []) {
		headers[header] = value;
	}

	return headers;
}
