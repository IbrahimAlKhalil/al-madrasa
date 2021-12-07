<template>
	<v-notice v-if="!displayTemplate" type="warning">
		{{ t('display_template_not_setup') }}
	</v-notice>
	<div v-else class="many-to-one">
		<v-menu v-model="menuActive" attached :disabled="disabled">
			<template #activator="{ active }">
				<v-skeleton-loader v-if="loadingCurrent" type="input"/>
				<v-input
						v-else
						:active="active"
						clickable
						:placeholder="t('select_an_item')"
						:disabled="disabled"
						@click="onPreviewClick"
				>
					<template v-if="currentItem" #input>
						<div class="preview">
							<render-template
									:collection="relatedCollection"
									:template="displayTemplate"
									:item="currentItem"
							/>
						</div>
					</template>

					<template v-if="!disabled" #append>
						<v-icon v-if="currentItem" v-tooltip="t('deselect')" name="close" class="deselect"
										@click.stop="$emit('input', null)"/>
						<v-icon v-else class="expand" :class="{ active }" name="expand_more"/>
					</template>
				</v-input>
			</template>

			<v-list>
				<template v-if="itemsLoading">
					<v-list-item v-for="n in 10" :key="`loader-${n}`">
						<v-list-item-content>
							<v-skeleton-loader type="text"/>
						</v-list-item-content>
					</v-list-item>
				</template>

				<template v-else>
					<v-list-item
							v-for="item in items"
							:key="item[relatedField]"
							:active="value === item[relatedField]"
							clickable
							@click="setCurrent(item)"
					>
						<v-list-item-content>
							<render-template :collection="relatedCollection" :template="displayTemplate" :item="item"/>
						</v-list-item-content>
					</v-list-item>
				</template>
			</v-list>
		</v-menu>

		<drawer-collection
				v-if="!disabled"
				v-model:active="selectModalActive"
				:collection="relatedCollection"
				:selection="selection"
				@input="stageSelection"
		/>
	</div>
</template>

<script lang="ts">
import {useI18n} from 'vue-i18n';
import {defineComponent, computed, ref, toRefs, watch, PropType} from 'vue';
import {useCollection} from '@directus/shared/composables';
import {getFieldsFromTemplate} from '@directus/shared/utils';
import api from '@/api';
import DrawerItem from '@/views/private/components/drawer-item';
import DrawerCollection from '@/views/private/components/drawer-collection';
import {unexpectedError} from '@/utils/unexpected-error';
import adjustFieldsForDisplays from '@/utils/adjust-fields-for-displays';

/**
 * @NOTE
 *
 * The value of a many to one can be one of three things: A primary key (number/string), a nested
 * object of edits (including primary key = editing existing) or an object with new values (no
 * primary key)
 */

export default defineComponent({
	components: {DrawerItem, DrawerCollection},
	props: {
		value: {
			type: [Number, String, Object],
			default: null,
		},
		collection: {
			type: String,
			required: true,
		},
		field: {
			type: String,
			required: true,
		},
		template: {
			type: String,
			default: null,
		},
		selectMode: {
			type: String as PropType<'auto' | 'dropdown' | 'modal'>,
			default: 'auto',
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		relatedCollection: {
			type: String as PropType<string>,
			required: true,
		},
		relatedField: {
			type: String as PropType<string>,
			required: true,
		}
	},
	emits: ['input'],
	setup(props, {emit}) {
		const {t} = useI18n();

		const {collection} = toRefs(props);

		const {usesMenu, menuActive} = useMenu();
		const {info: collectionInfo} = useCollection(collection);
		const {selection, stageSelection, selectModalActive} = useSelection();
		const {displayTemplate, onPreviewClick, requiredFields} = usePreview();
		const {totalCount, loading: itemsLoading, fetchItems, items} = useItems();

		const {setCurrent, currentItem, loading: loadingCurrent, currentPrimaryKey} = useCurrent();

		const {edits, stageEdits} = useEdits();

		return {
			t,
			collectionInfo,
			currentItem,
			displayTemplate,
			items,
			itemsLoading,
			loadingCurrent,
			menuActive,
			onPreviewClick,
			selection,
			selectModalActive,
			setCurrent,
			totalCount,
			stageSelection,
			useMenu,
			currentPrimaryKey,
			edits,
			stageEdits,
		};

		function useCurrent() {
			const currentItem = ref<Record<string, any> | null>(null);
			const loading = ref(false);

			watch(
					() => props.value,
					(newValue) => {
						// When the newly configured value is a primitive, assume it's the primary key
						// of the item and fetch it from the API to render the preview
						if (
								newValue !== null &&
								newValue !== currentItem.value?.[props.relatedField] &&
								(typeof newValue === 'string' || typeof newValue === 'number')
						) {
							fetchCurrent();
						}

						// If the value isn't a primary key, the current value will be set by the editing
						// handlers in useEdit()

						if (newValue === null) {
							currentItem.value = null;
						}
					},
					{immediate: true}
			);

			const currentPrimaryKey = computed<string | number>(() => {
				if (!currentItem.value) return '+';
				if (!props.value) return '+';
				if (!props.relatedField) return '+';

				if (typeof props.value === 'number' || typeof props.value === 'string') {
					return props.value!;
				}

				if (typeof props.value === 'object' && props.relatedField in (props.value ?? {})) {
					return props.value?.[props.relatedField] ?? '+';
				}

				return '+';
			});

			return {setCurrent, currentItem, loading, currentPrimaryKey};

			function setCurrent(item: Record<string, any>) {
				if (!props.relatedField) return;
				currentItem.value = item;
				emit('input', item[props.relatedField]);
			}

			async function fetchCurrent() {
				if (!props.relatedField || !props.relatedCollection) return;

				loading.value = true;

				const fields = requiredFields.value || [];

				if (fields.includes(props.relatedField) === false) {
					fields.push(props.relatedField);
				}

				try {
					const endpoint = props.relatedCollection.startsWith('directus_')
							? `/${props.relatedCollection.substring(9)}/${props.value}`
							: `/items/${props.relatedCollection}/${encodeURIComponent(props.value! as string)}`;

					const response = await api.get(endpoint, {
						params: {
							fields: fields,
						},
					});

					currentItem.value = response.data.data;
				} catch (err: any) {
					unexpectedError(err);
				} finally {
					loading.value = false;
				}
			}
		}

		function useItems() {
			const totalCount = ref<number | null>(null);

			const items = ref<Record<string, any>[] | null>(null);
			const loading = ref(false);

			// watch(relatedCollection, () => {
			// 	fetchTotalCount();
			// 	items.value = null;
			// });

			return {totalCount, fetchItems, items, loading};

			async function fetchItems() {
				if (items.value !== null) return;
				if (!props.relatedCollection || !props.relatedField) return;

				loading.value = true;

				const fields = requiredFields.value || [];

				if (fields.includes(props.relatedField) === false) {
					fields.push(props.relatedField);
				}

				try {
					const endpoint = props.relatedCollection.startsWith('directus_')
							? `/${props.relatedCollection.substring(9)}`
							: `/items/${props.relatedCollection}`;

					const response = await api.get(endpoint, {
						params: {
							fields: fields,
							limit: -1,
						},
					});

					items.value = response.data.data;
				} catch (err: any) {
					unexpectedError(err);
				} finally {
					loading.value = false;
				}
			}

			async function fetchTotalCount() {
				if (!props.relatedCollection) return;

				const endpoint = props.relatedCollection.startsWith('directus_')
						? `/${props.relatedCollection.substring(9)}`
						: `/items/${props.relatedCollection}`;

				const response = await api.get(endpoint, {
					params: {
						limit: 0,
						meta: 'total_count',
					},
				});

				totalCount.value = response.data.meta.total_count;
			}
		}

		function useMenu() {
			const menuActive = ref(false);
			const usesMenu = computed(() => {
				if (props.selectMode === 'modal') return false;
				if (props.selectMode === 'dropdown') return true;

				// auto
				if (totalCount.value !== null && totalCount.value <= 100) return true;
				return false;
			});

			return {menuActive, usesMenu};
		}

		function usePreview() {
			const displayTemplate = computed(() => {
				if (props.template !== null) return props.template;
				return collectionInfo.value?.meta?.display_template || `{{ ${props.relatedField || ''} }}`;
			});

			const requiredFields = computed(() => {
				if (!displayTemplate.value || !props.relatedCollection) return null;

				return adjustFieldsForDisplays(
						getFieldsFromTemplate(displayTemplate.value),
						props.relatedCollection
				);
			});

			return {onPreviewClick, displayTemplate, requiredFields};

			function onPreviewClick() {
				if (props.disabled) return;

				if (usesMenu.value === true) {
					const newActive = !menuActive.value;
					menuActive.value = newActive;
					if (newActive === true) fetchItems();
				} else {
					selectModalActive.value = true;
				}
			}
		}

		function useSelection() {
			const selectModalActive = ref(false);

			const selection = computed<(number | string)[]>(() => {
				if (!props.value) return [];
				if (!props.relatedField) return [];

				if (typeof props.value === 'object' && props.relatedField in (props.value ?? {})) {
					return [props.value![props.relatedField]];
				}

				if (typeof props.value === 'string' || typeof props.value === 'number') {
					return [props.value!];
				}

				return [];
			});

			return {selection, stageSelection, selectModalActive};

			function stageSelection(newSelection: (number | string)[]) {
				if (newSelection.length === 0) {
					emit('input', null);
				} else {
					emit('input', newSelection[0]);
				}
			}
		}

		function useEdits() {
			const edits = computed(() => {
				// If the current value isn't a primitive, it means we've already staged some changes
				// This ensures we continue on those changes instead of starting over
				if (props.value && typeof props.value === 'object') {
					return props.value;
				}

				return {};
			});

			return {edits, stageEdits};

			function stageEdits(newEdits: Record<string, any>) {
				if (!props.relatedField) return;

				// Make sure we stage the primary key if it exists. This is needed to have the API
				// update the existing item instead of create a new one
				if (currentPrimaryKey.value && currentPrimaryKey.value !== '+') {
					emit('input', {
						[props.relatedField]: currentPrimaryKey.value,
						...newEdits,
					});
				} else {
					if (props.relatedField in newEdits && newEdits[props.relatedField] === '+') {
						delete newEdits[props.relatedField];
					}

					emit('input', newEdits);
				}

				currentItem.value = {
					...currentItem.value,
					...newEdits,
				};
			}
		}
	},
});
</script>

<style lang="scss" scoped>
.many-to-one {
	position: relative;

	:deep(.v-input .append) {
		display: flex;
	}
}

.v-skeleton-loader {
	top: 0;
	left: 0;
}

.preview {
	display: block;
	flex-grow: 1;
	height: calc(100% - 16px);
	overflow: hidden;
}

.expand {
	transition: transform var(--fast) var(--transition);

	&.active {
		transform: scaleY(-1);
	}
}

.edit {
	margin-right: 4px;

	&:hover {
		--v-icon-color: var(--foreground-normal);
	}
}

.add:hover {
	--v-icon-color: var(--primary);
}

.deselect:hover {
	--v-icon-color: var(--danger);
}
</style>
