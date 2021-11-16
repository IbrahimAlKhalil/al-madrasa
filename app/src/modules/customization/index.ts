import SectionNotFound from './routes/not-found.vue';
import {defineModule} from '@directus/shared/utils';
import Navigation from './routes/navigation.vue';
import {usePageStore} from './store/pages';
import Section from './routes/section.vue';
import NoPage from './routes/no-page.vue';
import Page from './routes/page.vue';

export default defineModule({
	id: 'customization',
	name: 'Customization',
	color: 'var(--primary)',
	icon: 'design_services',
	routes: [
		{
			name: 'no-pages',
			path: '',
			component: NoPage,
			async beforeEnter() {
				const pageStore = usePageStore();
				await pageStore.hydrate();

				if (pageStore.pages.length === 0) {
					return;
				}

				return `/customization/${pageStore.pages[0].id}`;
			}
		},
		{
			name: 'customization-page',
			path: ':page',
			component: Page,
			props: (route) => ({
				page: route.params.page,
			}),
			children: [
				{
					name: 'customization-navigation',
					path: '',
					component: Navigation,
					props: (route) => ({
						page: route.params.page,
						section: route.params.section,
					}),
				},
				{
					name: 'customization-section',
					path: ':section',
					component: Section,
					props: (route) => ({
						page: route.params.page,
						section: route.params.section,
					}),
				},
			],
		},
		{
			name: 'customization-section-not-found',
			path: ':_(.+)+',
			component: SectionNotFound,
		},
	],
});
