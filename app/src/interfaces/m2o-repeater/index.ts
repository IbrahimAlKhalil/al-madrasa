import InterfaceSelectDropdownM2O from './m2o-repeater.vue';
import { defineInterface } from '@directus/shared/utils';
import PreviewSVG from './preview.svg?raw';

export default defineInterface({
	id: 'm2o-repeater',
	name: 'Many to One (Repeater)',
	description: '$t:interfaces.select-dropdown-m2o.description',
	icon: 'arrow_right_alt',
	component: InterfaceSelectDropdownM2O,
	types: ['uuid', 'string', 'text', 'integer', 'bigInteger'],
	group: 'relational',
	options: () => {
		return [
			{
				field: 'related-collection',
				type: 'string',
				name: '$t:collection',
				meta: {
					interface: 'input',
					width: 'full',
					options: {
						trim: true,
					},
				},
			},
			{
				field: 'related-field',
				type: 'string',
				name: '$t:panels.metric.field',
				meta: {
					interface: 'input',
					width: 'full',
					options: {
						trim: true,
					},
				},
			},
			{
				field: 'template',
				name: '$t:interfaces.select-dropdown-m2o.display_template',
				meta: {
					interface: 'input',
					options: {
						trim: true,
					},
				},
			},
		];
	},
	recommendedDisplays: ['related-values'],
	preview: PreviewSVG,
});
