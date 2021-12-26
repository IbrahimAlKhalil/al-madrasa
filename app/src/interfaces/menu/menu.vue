<template>
	<div class="menu-root grid fill">
		<v-list v-if="items.length" class="draggable-list half">
			<draggable
					class="root-drag-container"
					@update:model-value="sort"
					:group="{ name: 'items' }"
					:force-fallback="true"
					handle=".drag-handle"
					:swap-threshold="0.3"
					:model-value="items"
					item-key="id"
			>
				<template #item="{ element }">
					<am-interface-menu-item
							@remove="remove"
							:item="element"
							:items="items"
							@open="open"
					/>
				</template>
			</draggable>
		</v-list>

		<v-notice v-else>
			Empty
		</v-notice>

		<v-card class="card half-right">
			<v-card-title class="card-title">
				<div>
					<v-icon name="widgets"/>
					<span>&nbsp;&nbsp;Menu</span>
				</div>

				<div>
					<v-button @click="reset" icon small secondary>
						<v-icon name="refresh"/>
					</v-button>
					<v-button @click="save" icon small secondary>
						<v-icon name="save"/>
					</v-button>
				</div>
			</v-card-title>

			<v-divider/>

			<br>

			<am-interface-link @input="handleLinkInput" :value="model.link" has-icon/>
		</v-card>
	</div>
</template>

<script lang="ts">
import VListItemContent from '@/components/v-list/v-list-item-content.vue';
import VListItemIcon from '@/components/v-list/v-list-item-icon.vue';
import SelectIcon from '@/interfaces/select-icon/select-icon.vue';
import {computed, defineComponent, PropType, reactive, watch} from 'vue';
import VCardTitle from '@/components/v-card/v-card-title.vue';
import VCardText from '@/components/v-card/v-card-text.vue';
import VListItem from '@/components/v-list/v-list-item.vue';
import VDivider from '@/components/v-divider/v-divider.vue';
import VButton from '@/components/v-button/v-button.vue';
import VNotice from '@/components/v-notice/v-notice.vue';
import AmInterfaceLink from '@/interfaces/link/link.vue';
import VInput from '@/components/v-input/v-input.vue';
import VCard from '@/components/v-card/v-card.vue';
import VList from '@/components/v-list/v-list.vue';
import VIcon from '@/components/v-icon/v-icon.vue';
import AmInterfaceMenuItem from './menu-item.vue';
import {Link} from '@/interfaces/link/types/link';
import {MenuItem} from './typings/menu-item';
import Draggable from 'vuedraggable';
import {merge} from 'lodash';

export default defineComponent({
	name: 'am-interface-menu',
	components: {
		AmInterfaceLink,
		AmInterfaceMenuItem,
		VListItemContent,
		VListItemIcon,
		VCardTitle,
		SelectIcon,
		VListItem,
		VCardText,
		VButton,
		VInput,
		VCard,
		VIcon,
		VList,
		VDivider,
		VNotice,
		Draggable
	},
	props: {
		value: {
			type: Array as PropType<MenuItem[]>,
			default: null,
		},
		disabled: {
			type: Boolean,
			default: false,
		},
	},
	emits: ['input'],
	setup(props, {emit}) {
		const savedItems = computed(() => props.value);
		const source = reactive<{ items: MenuItem[] }>({
			items: serializeItems(props.value),
		});
		const items = computed(() => source.items);
		const model = reactive<MenuItem>({
			id: '',
			link: {
				type: 'custom',
				label: '',
			},
		});
		let current: MenuItem | null = null;
		let changedFromProps = false;

		if (!props.value) {
			const unwatch = watch(savedItems, () => {
				changedFromProps = true;
				source.items = serializeItems(props.value);
				unwatch();
			});
		}

		watch(items, () => {
			if (!changedFromProps) {
				emit('input', items);
			} else {
				changedFromProps = false;
			}
		}, {
			deep: true,
		});

		function serializeItems(value: null | MenuItem[]) {
			return Array.isArray(value) ? JSON.parse(JSON.stringify(value)) : [];
		}

		function sort(_items: MenuItem[]) {
			source.items = _items;
		}

		function save() {
			if (!current) {
				source.items.push({
					id: `${Date.now()}-${Math.random()}`,
					link: model.link,
					children: [],
				});
			}
		}

		function reset() {
			current = null;
			model.link = {
				type: 'custom',
				label: '',
			};
		}

		function open(item: MenuItem) {
			current = item;
			model.id = item.id;
			model.children = item.children;
			model.link = item.link;
		}

		function handleLinkInput(link: Link) {
			merge(model.link, link);
		}

		function remove(item: MenuItem) {
			source.items.splice(source.items.indexOf(item), 1);
		}

		return {
			handleLinkInput,
			model,
			items,
			sort,
			remove,
			save,
			reset,
			open
		};
	},
});
</script>

<style lang="scss" scoped>
@import '@/styles/mixins/form-grid';

.menu-root {
	@include form-grid;
}

.card {
	--input-height: 44px;

	padding: 10px;
}

.card-title {
	justify-content: space-between;
}

.input {
	margin-bottom: 15px;
}

.root-drag-container {
	padding: 8px 0;
	overflow: hidden;
}

.draggable-list :deep(.sortable-ghost) {
	.v-list-item {
		--v-list-item-background-color: var(--primary-alt);
		--v-list-item-border-color: var(--primary);
		--v-list-item-background-color-hover: var(--primary-alt);
		--v-list-item-border-color-hover: var(--primary);

		> * {
			opacity: 0;
		}
	}
}
</style>
