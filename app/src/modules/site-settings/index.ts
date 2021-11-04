import {useNavigation} from "@/modules/content/composables/use-navigation";
import CollectionOrItem from './routes/collection-or-item.vue';
import { addQueryToPath } from '@/utils/add-query-to-path';
import {allowedCollections} from "./allowed-collections";
import NoCollections from "./routes/no-collections.vue";
import { defineModule } from '@directus/shared/utils';
import RouterPass from '@/utils/router-passthrough';
import ItemNotFound from './routes/not-found.vue';
import {Collection} from "@directus/shared/types";
import { NavigationGuard } from 'vue-router';
import {useCollectionsStore} from "@/stores";
import {isNil, orderBy} from "lodash";
import Item from './routes/item.vue';
import {ref} from "vue";


const checkForSystem: NavigationGuard = (to, from) => {
	if (!to.params?.collection) return;

	if (
		'bookmark' in from.query &&
		typeof from.query.bookmark === 'string' &&
		'bookmark' in to.query === false &&
		to.params.collection === from.params.collection
	) {
		return addQueryToPath(to.fullPath, { bookmark: from.query.bookmark });
	}
};

export default defineModule({
	id: '_settings',
	name: '$t:settings',
	color: 'var(--warning)',
	icon: 'build',
	routes: [
		{
			name: 'no-settings',
			path: '',
			component: NoCollections,
			beforeEnter() {
				const collectionsStore = useCollectionsStore();
				const { activeGroups } = useNavigation(ref(null));
				const collections = collectionsStore.allCollections.filter(item => allowedCollections.has(item.collection));

				const rootCollections = orderBy(
					collections.filter((collection) => {
						return isNil(collection?.meta?.group);
					}),
					['meta.sort', 'collection']
				);

				let firstCollection = findFirst(rootCollections);

				// If the first collection couldn't be found in any open collections, try again but with closed collections
				firstCollection = findFirst(rootCollections, { skipClosed: false });

				if (!firstCollection) return;

				return `/_settings/${firstCollection.collection}`;

				function findFirst(collections: Collection[], { skipClosed } = { skipClosed: true }): Collection | void {
					for (const collection of collections) {
						if (collection.schema) {
							return collection;
						}

						// Don't default to a collection in a currently closed folder
						if (skipClosed && activeGroups.value.includes(collection.collection) === false) continue;

						const children = orderBy(
							collectionsStore.visibleCollections.filter((childCollection) => {
								return collection.collection === childCollection.meta?.group;
							}),
							['meta.sort', 'collection']
						);

						const first = findFirst(children);

						if (first) return first;
					}
				}
			},
		},
		{
			path: ':collection',
			component: RouterPass,
			children: [
				{
					name: 'settings-collection',
					path: '',
					component: CollectionOrItem,
					props: (route) => ({
						collection: route.params.collection,
						bookmark: route.query.bookmark,
						archive: 'archive' in route.query,
					}),
					beforeEnter: checkForSystem,
				},
				{
					name: 'settings-item',
					path: ':primaryKey',
					component: Item,
					props: true,
					beforeEnter: checkForSystem,
				},
			],
		},
		{
			name: 'settings-item-not-found',
			path: ':_(.+)+',
			component: ItemNotFound,
			beforeEnter: checkForSystem,
		},
	],
});
