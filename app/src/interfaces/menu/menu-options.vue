<template>
	<v-menu placement="left-start" show-arrow>
		<template #activator="{ toggle }">
			<v-icon name="more_vert" clickable class="ctx-toggle" @click="toggle"/>
		</template>
		<v-list>
			<v-list-item clickable class="danger" @click="deleteActive = true">
				<v-list-item-icon>
					<v-icon name="delete" outline/>
				</v-list-item-icon>
				<v-list-item-content>
					Delete
				</v-list-item-content>
			</v-list-item>
		</v-list>
	</v-menu>

	<v-dialog v-model="deleteActive" @esc="deleteActive = null">
		<v-card>
			<v-card-title>Are you sure you want to delete this item?</v-card-title>
			<v-card-actions>
				<v-button :disabled="deleting" secondary @click="deleteActive = null">
					{{ t('cancel') }}
				</v-button>
				<v-button :loading="deleting" kind="danger" @click="deleteItem">
					Delete
				</v-button>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script lang="ts">
import VListItemContent from "@/components/v-list/v-list-item-content.vue";
import VListItemIcon from "@/components/v-list/v-list-item-icon.vue";
import VCardActions from "@/components/v-card/v-card-actions.vue";
import VCardTitle from "@/components/v-card/v-card-title.vue";
import VListItem from "@/components/v-list/v-list-item.vue";
import VDialog from "@/components/v-dialog/v-dialog.vue";
import VButton from "@/components/v-button/v-button.vue";
import VMenu from "@/components/v-menu/v-menu.vue";
import VIcon from "@/components/v-icon/v-icon.vue";
import VList from "@/components/v-list/v-list.vue";
import VCard from "@/components/v-card/v-card.vue";
import {defineComponent, ref} from 'vue';
import {useI18n} from "vue-i18n";

export default defineComponent({
	name: 'am-interface-menu-options',
	components: {
		VButton,
		VCardActions,
		VCardTitle,
		VCard,
		VDialog,
		VListItemContent,
		VListItemIcon,
		VListItem,
		VList,
		VIcon,
		VMenu
	},
	emits: ['delete'],
	setup(props, {emit}) {
		const {t} = useI18n();
		const {deleting, deleteActive, deleteItem} = useDelete();

		return {t, deleting, deleteActive, deleteItem};

		function useDelete() {
			const deleting = ref(false);
			const deleteActive = ref(false);

			return {deleting, deleteActive, deleteItem};

			async function deleteItem() {
				deleting.value = true;

				try {
					emit('delete')
					deleteActive.value = false;
				} finally {
					deleting.value = false;
				}
			}
		}
	},
});
</script>

<style lang="scss" scoped>
.ctx-toggle {
  --v-icon-color: var(--foreground-subdued);

  &:hover {
	--v-icon-color: var(--foreground-normal);
  }
}

.v-list-item.danger {
  --v-list-item-color: var(--danger);
  --v-list-item-color-hover: var(--danger);
  --v-list-item-icon-color: var(--danger);
}

.v-list-item.warning {
  --v-list-item-color: var(--warning);
  --v-list-item-color-hover: var(--warning);
  --v-list-item-icon-color: var(--warning);
}
</style>
