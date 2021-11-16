<template>
	<private-view title="Customization">
		<template #title-outer:prepend>
			<v-button
					v-tooltip.bottom="t('back')"
					@click="router.back()"
					class="header-icon"
					secondary
					rounded
					exact
					icon
			>
				<v-icon name="arrow_back"/>
			</v-button>
		</template>

		<template #actions>
			<v-button
					v-tooltip.bottom="saveAllowed ? t('save') : t('not_allowed')"
					:disabled="!saveAllowed"
					:loading="saving"
					@click="save"
					rounded
					icon
			>
				<v-icon name="check"/>
			</v-button>
		</template>

		<template #navigation>
			<am-customization-nav v-if="hydrated" :page="page"/>
		</template>

		<template #sidebar>
			<sidebar-detail icon="info_outline" :title="t('information')" close>
				<div class="page-description">
					<strong>Customization —</strong> Lets you can customize your website
				</div>
			</sidebar-detail>

			<revisions-drawer-detail
					v-if="section && section.data?.id"
					:primary-key="section.data.id"
					collection="section"
					@revert="revert"
					scope="activity"
					ref="revision"
			/>

			<comments-sidebar-detail
					v-if="section && section.data?.id"
					:primary-key="section.data.id"
					collection="section"
			/>
		</template>

		<!--		<iframe :src="liveUrl"/>-->
	</private-view>
</template>

<script lang="ts">
import RevisionsDrawerDetail from "@/views/private/components/revisions-drawer-detail/revisions-drawer-detail.vue";
import CommentsSidebarDetail from "@/views/private/components/comments-sidebar-detail/comments-sidebar-detail.vue";
import SidebarDetail from "@/views/private/components/sidebar-detail/sidebar-detail.vue";
import {usePageStore} from '@/modules/customization/store/pages';
import AmCustomizationNav from '../components/navigation.vue';
import PrivateView from '@/views/private/private-view.vue';
import {computed, defineComponent, PropType, ref} from 'vue';
import VButton from "@/components/v-button/v-button.vue";
import VIcon from "@/components/v-icon/v-icon.vue";
import {useRoute, useRouter} from "vue-router";
import {useI18n} from "vue-i18n";

export default defineComponent({
	components: {
		CommentsSidebarDetail,
		RevisionsDrawerDetail, VIcon, VButton, SidebarDetail, AmCustomizationNav, PrivateView
	},
	props: {
		page: {
			type: String as PropType<string>,
			required: true,
		}
	},
	setup(props) {
		const {t} = useI18n();
		const router = useRouter();
		const route = useRoute();
		const pageStore = usePageStore();
		const hydrated = computed(() => pageStore.hydrated);
		const section = computed(() => {
			if (!route.params.section) {
				return null;
			}

			return pageStore.sectionsMap.get(route.params.section as string) || null;
		});
		const saving = ref(false);
		const saveAllowed = computed(() => section.value?.fields?.length && pageStore.model.has(section.value?.id));
		const revision = ref(null);

		pageStore.hydrate();

		function save() {
			if (!section.value?.id || saving.value) {
				return;
			}

			saving.value = true;

			const updates = { ...section.value?.data?.value, ...pageStore.model.get(section.value.id) };

			pageStore.update(props.page, section.value.id, {value: updates})
				.then(() => {
					saving.value = false;

					if (revision.value) {
						(revision.value as any).refresh();
					}
				});
		}

		function revert(value: Record<string, any>) {
			if (!section.value?.id) {
				return;
			}

			pageStore.input(section.value.id, value);
			save();
		}

		return {
			liveUrl: `${location.protocol}//${location.host}/`,
			saveAllowed,
			hydrated,
			revision,
			section,
			revert,
			router,
			saving,
			save,
			t,
		};
	}
});
</script>

<style lang="scss" scoped>
iframe {
  min-height: 100vh;
  width: 100%;
  border: 0;
}
</style>
