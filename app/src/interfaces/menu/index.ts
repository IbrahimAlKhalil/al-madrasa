import {defineInterface} from '@directus/shared/utils';
import PreviewSVG from './preview.svg?raw';
import Menu from './menu.vue';

export default defineInterface({
	id: 'menu',
	name: 'Menu',
	description: '',
	icon: 'menu',
	component: Menu,
	types: ['json'],
	group: 'other',
	options: null,
	preview: PreviewSVG,
});
