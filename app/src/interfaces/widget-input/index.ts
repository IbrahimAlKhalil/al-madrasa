import {defineInterface} from '@directus/shared/utils';
import PreviewSVG from './preview.svg?raw';
import InterfaceList from './list.vue';

export default defineInterface({
	id: 'widget-metadata',
	name: 'Widget Metadata',
	description: '',
	icon: 'widgets',
	component: InterfaceList,
	types: ['json'],
	group: 'other',
	options: [
		{
			field: 'collection',
			name: '$t:collection',
			meta: {
				width: 'full',
				interface: 'system-collection',
				options: {
					includeSystem: false,
				},
			},
		},
		{
			field: 'field',
			type: 'string',
			name: '$t:panels.metric.field',
			meta: {
				interface: 'system-field',
				options: {
					collectionField: 'collection',
					typeAllowList: ['json'],
					allowPrimaryKey: true,
					allowNone: true,
				},
				width: 'full',
			},
		},
	],
	preview: PreviewSVG,
});
