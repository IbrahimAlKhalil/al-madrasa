<template>
	<div v-if="loading" class="loading">
		<v-progress-circular indeterminate/>
	</div>

	<v-list class="draggable-list" v-show="!loading">
		<v-list-item
				v-for="section in stillSections" :key="section.id"
				:class="!section.data.visible?'hidden':''"
				clickable
				block
				dense
		>
			<v-list-item-icon>
				<v-icon :name="section.icon" class="section-icon"/>
			</v-list-item-icon>

			<div class="section-name" @click="open(section)">
				<span>{{ section.name }}</span>
			</div>

			<v-icon
					:name="section.data.visible?'visibility':'visibility_off'"
					@click="handleVisibility(section)"
					class="visibility-toggle"
					v-if="section.can_hide"
			/>
		</v-list-item>

		<draggable
				:model-value="sortableSections"
				@update:model-value="sort"
				class="drag-container"
				:force-fallback="true"
				handle=".drag-handle"
				:swap-threshold="0.3"
				item-key="id"
		>
			<template #item="{ element }">
				<v-list-item
						:class="!element.data.visible?'hidden':''"
						block dense clickable
				>
					<v-list-item-icon>
						<v-icon class="drag-handle" name="drag_handle"/>
					</v-list-item-icon>
					<div class="section-name" @click="open(element)">
						<v-icon
								:name="element.icon"
								class="section-icon"
						/>
						<span>{{ element.name }}</span>
					</div>
					<v-icon
							:name="element.data.visible?'visibility':'visibility_off'"
							@click="handleVisibility(element)"
							class="visibility-toggle"
							v-if="element.can_hide"
					/>
				</v-list-item>
			</template>
		</draggable>
	</v-list>
</template>

<script lang="ts">
import VProgressCircular from '@/components/v-progress/circular/v-progress-circular.vue';
import VListItemIcon from '@/components/v-list/v-list-item-icon.vue';
import VListItem from '@/components/v-list/v-list-item.vue';
import {computed, defineComponent, PropType} from 'vue';
import VList from '@/components/v-list/v-list.vue';
import VIcon from '@/components/v-icon/v-icon.vue';
import {usePageStore} from '../store/pages';
import {Section} from '../typings/section';
import Draggable from 'vuedraggable';
import {useRouter} from 'vue-router';

export default defineComponent({
	name: 'am-customization-route-nav',
	components: {VProgressCircular, VIcon, VListItemIcon, VListItem, VList, Draggable},

	props: {
		page: {
			type: String as PropType<string>,
			required: true,
		}
	},

	setup(props) {
		const router = useRouter();
		const pageStore = usePageStore();
		const sortableSections = computed(() => pageStore.pages.find(p => p.id === props.page)?.sections?.sortable || []);
		const stillSections = computed(() => pageStore.pages.find(p => p.id === props.page)?.sections?.still || [])
		const loading = computed(() => pageStore.loading);

		pageStore.hydratePage(props.page);

		function sort(items: Section[]) {
			pageStore.sort(props.page, items);
		}

		function open(item: Section) {
			router.push({
				name: 'customization-section',
				params: {
					section: item.id,
				},
			});
		}

		function handleVisibility(item: Section) {
			pageStore.update(props.page, item.id, {
				visible: !item.data.visible
			});
		}

		return {
			handleVisibility,
			sortableSections,
			stillSections,
			loading,
			open,
			sort
		};
	}
})
</script>

<style lang="scss" scoped>
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 400px);
}

.drag-container {
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

.section-name {
  display: flex;
  flex-grow: 1;
  align-items: center;
  height: 100%;
  font-family: var(--family-monospace);
}

.section-icon {
  margin-right: 8px;
}

.drag-handle {
  cursor: grab;
}

.visibility-toggle {
  --v-icon-color: var(--foreground-subdued);

  &:hover {
	--v-icon-color: var(--foreground-normal);
  }
}

.hidden .section-name {
  color: var(--foreground-subdued);
}
</style>
