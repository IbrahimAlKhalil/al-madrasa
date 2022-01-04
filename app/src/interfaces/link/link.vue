<template>
	<div class="wrapper">
		<v-select
				@update:modelValue="handleTypeChange"
				:items="collections"
				:model-value="type"
				placeholder="Type"
				item-text="name"
				item-icon="icon"
				item-value="id"
		/>

		<br>

		<v-input v-if="type === 'custom'" placeholder="URL" :model-value="url"
						 @update:model-value="handleUrlChange"
						 trim/>

		<template v-else>
			<v-input :model-value="itemSelectLabel" clickable placeholder="Select an item" @click="showDrawer = true">
				<template #append>
					<v-icon clickable name="expand_more"></v-icon>
				</template>
				<div slot="append"></div>
			</v-input>
		</template>

		<br>

		<v-input :model-value="label" @update:model-value="handleLabelChange" placeholder="Label" trim/>

		<br>

		<select-icon v-if="hasIcon" class="icon-select" @input="handleIconChange" :value="icon"/>
	</div>

	<drawer-collection
			v-model:active="showDrawer"
			:selection="itemSelection"
			v-if="type !== 'custom'"
			@input="handleSelect"
			:active="showDrawer"
			:collection="type"
	/>
</template>

<script lang="ts">
import DrawerCollection from '@/views/private/components/drawer-collection/';
import SelectIcon from '@/interfaces/select-icon/select-icon.vue';
import DrawerItem from '@/views/private/components/drawer-item';
import {useCollectionsStore, useFieldsStore} from '@/stores';
import {computed, defineComponent, PropType, reactive, ref, watch} from 'vue';
import VSelect from '@/components/v-select/v-select.vue';
import VInput from '@/components/v-input/v-input.vue';
import VIcon from '@/components/v-icon/v-icon.vue';
import {Link} from '@/interfaces/link/types/link';
import Draggable from 'vuedraggable';
import {useI18n} from 'vue-i18n';
import api from '@/api';

export default defineComponent({
	name: 'am-interface-link',
	components: {SelectIcon, VIcon, VInput, VSelect, DrawerCollection, DrawerItem, Draggable},
	props: {
		value: {
			type: [Object, String] as PropType<Link | string>,
			default: null,
		},
		hasIcon: {
			type: Boolean as PropType<boolean>,
			default: false
		},
	},
	emits: ['input'],
	setup(props, {emit}) {
		const {t} = useI18n();
		const collectionStore = useCollectionsStore();
		const fieldStore = useFieldsStore();
		const allowedCollections = ['article', 'page', 'question', 'book', 'image', 'video', 'audio'];
		const collections = reactive<{ id: string; name?: string; icon?: string }[]>([
			{
				id: 'custom',
				name: 'Custom Link',
				icon: 'http'
			}
		]);

		const id = ref<string | number | undefined>();
		const type = ref('custom');
		const label = ref('');
		const url = ref<string | undefined>();
		const icon = ref<string | undefined>();

		const showDrawer = ref(false);

		const itemSelection = computed(() => {
			if (id.value) {
				return [id.value];
			}

			return [];
		});
		const itemSelectLabel = ref('');

		for (const item of allowedCollections) {
			const collection = collectionStore.getCollection(item);

			collections.push({
				id: item,
				name: collection?.name,
				icon: collection?.icon
			});
		}

		function initLink(value: string | Link) {
			if (typeof value === 'string') {
				type.value = 'custom';
				url.value = value;
			} else {
				id.value = value?.id;
				type.value = value?.type;
				label.value = value?.label;
				url.value = value?.url;
				icon.value = value?.icon;
			}
		}

		function emitInput() {
			emit('input', {
				id: id.value,
				type: type.value,
				label: label.value,
				url: url.value,
				icon: icon.value,
			});
		}

		function handleTypeChange(_type: string) {
			type.value = _type;
			id.value = undefined;
			url.value = undefined;

			emitInput();
		}

		async function loadItemSelectLabel() {
			if (!id.value || type.value === 'custom') {
				return;
			}

			const fields = fieldStore.getFieldsForCollection(type.value as string);
			const fieldsToLoad = ['id'];

			for (const field of fields) {
				if (field.field === 'name' || field.field === 'title') {
					fieldsToLoad.push(field.field);
				}
			}

			const res = await api.get(`/items/${type.value as string}/${id.value}`, {
				params: {
					fields: fieldsToLoad,
				}
			});
			const item = res.data.data;

			if (fieldsToLoad.includes('name')) {
				itemSelectLabel.value = item.name;
			} else if (fieldsToLoad.includes('title')) {
				itemSelectLabel.value = item.title;
			} else {
				itemSelectLabel.value = item.id;
			}

			label.value = itemSelectLabel.value;
			emitInput();
		}

		async function handleSelect(ids: (string | number)[]) {
			id.value = ids[0];
			emitInput();
		}

		function handleIconChange(value: string) {
			icon.value = value;
			emitInput();
		}

		function handleUrlChange(value: string) {
			url.value = value;
			emitInput();
		}

		function handleLabelChange(value: string) {
			label.value = value;
			emitInput();
		}

		watch(id, (value) => {
			loadItemSelectLabel();
		});

		watch(props, (_props) => {
			initLink(_props.value);
		});

		if (props.value) {
			initLink(props.value);
		}

	  loadItemSelectLabel();

		return {
			t,

			id,
			url,
			type,
			icon,
			label,

			showDrawer,
			collections,

			itemSelection,
			itemSelectLabel,

			handleSelect,
			handleUrlChange,
			handleIconChange,
			handleTypeChange,
			handleLabelChange,
		};
	},
});
</script>

<style lang="scss" scoped>
.wrapper {
	border: 2px solid var(--border-normal);
	border-radius: 4px;
	padding: 6px;
}
</style>
