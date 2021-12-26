<template>
	<div class="item-item">
		<v-list-item block dense clickable>
			<v-list-item-icon>
				<v-icon v-if="!disableDrag" class="drag-handle" name="drag_handle"/>
			</v-list-item-icon>
			<div class="item-name" @click="$emit('open', item)">
				<v-icon
						class="item-icon"
						:name="item.link.icon"
				/>
				<span>{{ item.link.label }}</span>
			</div>
			<am-interface-menu-options @delete="$emit('remove', item)"/>
		</v-list-item>

		<draggable
				@update:model-value="sort"
				:group="{ name: 'items' }"
				:model-value="children"
				:force-fallback="true"
				class="drag-container"
				handle=".drag-handle"
				:swap-threshold="0.3"
				item-key="id"
		>
			<template #item="{ element }">
				<am-interface-menu-item
						@open="$emit('open', $event)"
						@remove="remove"
						:item="element"
						:items="items"
				/>
			</template>
		</draggable>
	</div>
</template>

<script lang="ts">
import VListItemIcon from "@/components/v-list/v-list-item-icon.vue";
import {MenuItem} from "@/interfaces/menu/typings/menu-item";
import VListItem from "@/components/v-list/v-list-item.vue";
import {defineComponent, PropType, computed} from 'vue';
import AmInterfaceMenuOptions from "./menu-options.vue";
import VIcon from "@/components/v-icon/v-icon.vue";
import Draggable from 'vuedraggable';

export default defineComponent({
	name: 'AmInterfaceMenuItem',
	components: {AmInterfaceMenuOptions, VIcon, VListItemIcon, VListItem, Draggable},
	props: {
		item: {
			type: Object as PropType<MenuItem>,
			required: true,
		},
		items: {
			type: Array as PropType<MenuItem[]>,
			required: true,
		},
		disableDrag: {
			type: Boolean,
			default: false,
		},
	},
	emits: ['setNestedSort', 'open', 'remove'],
	setup(props, {emit}) {
		const children = computed(() => props.item.children);

		function remove(item: MenuItem) {
			props.item.children?.splice(props.item.children?.indexOf(item), 1);
		}

		function sort(items: MenuItem[]) {
			props.item.children = items;
		}

		return {
			children,
			remove,
			sort,
		};
	},
});
</script>

<style scoped>
.drag-container {
	margin-top: 8px;
	margin-left: 20px;
}

.item-item {
	margin-bottom: 8px;
}

.item-name {
	display: flex;
	flex-grow: 1;
	align-items: center;
	height: 100%;
	font-family: var(--family-monospace);
}

.item-icon {
	margin-right: 8px;
}

.drag-handle {
	cursor: grab;
}
</style>
