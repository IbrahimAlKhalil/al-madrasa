import { defineInterface } from '@directus/shared/utils';
import PreviewSVG from './preview.svg?raw';
import Interface from './interface.vue';
import Options from './repeater.vue';

export default defineInterface({
	id: 'form-builder',
	name: 'Form Builder',
	description: '$t:interfaces.list.description',
	icon: 'replay',
	component: Interface,
	options: Options,
	types: ['json'],
	group: 'selection',
	preview: PreviewSVG,
});
