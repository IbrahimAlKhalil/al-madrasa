import { defineInterface } from '@directus/shared/utils';
import PreviewSVG from './preview.svg?raw';
import InterfaceLink from './link.vue';

export default defineInterface({
	id: 'link',
	name: 'Link',
	description: 'Link interface',
	icon: 'https',
	component: InterfaceLink,
	types: ['string', 'integer'],
	group: 'other',
	options: () => {
		return [
			{
				field: 'has-icon',
				name: 'Icon',
				type: 'boolean',
				meta: {
					width: 'half',
					interface: 'boolean',
					options: {
						label: 'Icon',
					},
				},
				schema: {
					default_value: false,
				},
			}
		];
	},
	preview: PreviewSVG,
});
