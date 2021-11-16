<template>
	<div class="navigation-wrapper">
		<div class="page-select">
			<v-select
					@update:model-value="changePage"
					:model-value="page"
					placeholder="Page"
					item-text="name"
					item-icon="icon"
					item-value="id"
					:items="pages"
					mandatory
			/>

			<br>
			<v-divider/>
			<br>
		</div>

		<router-view/>
	</div>
</template>

<script lang="ts">
import VDivider from '@/components/v-divider/v-divider.vue';
import VSelect from '@/components/v-select/v-select.vue';
import {computed, defineComponent, PropType} from 'vue';
import {usePageStore} from '../store/pages';
import {useRouter} from 'vue-router';

export default defineComponent({
	name: 'am-customization-navigation',
	components: {VDivider, VSelect},

	props: {
		page: {
			type: String as PropType<string>,
			required: true,
		}
	},

	setup() {
		const router = useRouter();
		const pageStore = usePageStore();
		const pages = computed(() => pageStore.pages);

		function changePage(pageId: string) {
			router.push({
				name: 'customization-navigation',
				params: {page: pageId}
			});
		}

		return {
			changePage,
			pages,
		};
	}
})
</script>

<style lang="scss" scoped>
.navigation-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100%;
}

.page-select {
  --input-height: 40px;

  position: sticky;
  top: 0;
  z-index: 2;
  padding: 12px 12px 0 12px;
  background-color: var(--background-normal);
}
</style>

<style>
#navigation .module-nav {
	width: 290px !important;
}
</style>
