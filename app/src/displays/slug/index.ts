import { defineDisplay } from '@directus/shared/utils';
import Slug from './slug.vue';

export default defineDisplay({
	id: 'slug',
	name: 'Slug',
	icon: 'code',
	component: Slug,
	options: [],
	types: ['string', 'text'],
	localTypes: ['standard'],
});
