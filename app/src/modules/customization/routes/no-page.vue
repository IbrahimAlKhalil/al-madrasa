<template>
	<private-view title="Customization" small-header>
		<template #title-outer:prepend>
			<v-button class="header-icon" rounded disabled icon secondary>
				<v-icon name="box"/>
			</v-button>
		</template>

		<template #navigation>
			<v-notice icon="box" type="warning">
				Nothing to customize
			</v-notice>
		</template>

		<iframe :src="liveUrl"/>

		<template #sidebar>
			<sidebar-detail icon="info_outline" :title="t('information')" close>
				<div class="page-description">
					<strong>Customization —</strong> Lets you customize your website
				</div>
			</sidebar-detail>
		</template>
	</private-view>
</template>

<script lang="ts">
import SidebarDetail from "@/views/private/components/sidebar-detail/sidebar-detail.vue";
import PrivateView from "@/views/private/private-view.vue";
import VNotice from "@/components/v-notice/v-notice.vue";
import VButton from "@/components/v-button/v-button.vue";
import VInfo from "@/components/v-info/v-info.vue";
import VIcon from "@/components/v-icon/v-icon.vue";
import {defineComponent} from 'vue';
import {useI18n} from 'vue-i18n';

export default defineComponent({
	name: 'PagesOverview',
	components: {VNotice, SidebarDetail, VInfo, VIcon, VButton, PrivateView},
	props: {},
	setup() {
		const {t} = useI18n();

		return {
			t,
			liveUrl: `${location.protocol}//${location.host}/`
		};
	},
});
</script>

<style lang="scss" scoped>
.icon {
  --v-icon-color: var(--foreground-subdued);

  :deep(i) {
	vertical-align: unset;
  }
}

.header-icon {
  --v-button-color-disabled: var(--foreground-normal);
}

iframe {
  min-height: 100vh;
  width: 100%;
  border: 0;
}
</style>
