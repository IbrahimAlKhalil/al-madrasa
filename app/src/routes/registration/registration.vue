<template>
	<public-view>
		<div class="header">
			<h1 class="type-title">Registration</h1>
		</div>

	  <continue-as v-if="authenticated" />

		<registration-form v-else />
	</public-view>
</template>

<script lang="ts">
import ContinueAs from '../login/components/continue-as.vue';
import { defineComponent, computed, onMounted } from 'vue';
import { unexpectedError } from '@/utils/unexpected-error';
import RegistrationForm from './form.vue';
import { useAppStore } from '@/stores';
import { useI18n } from 'vue-i18n';
import api from '@/api';

export default defineComponent({
	components: { RegistrationForm, ContinueAs },
	setup() {
		const { t, te } = useI18n();

		const appStore = useAppStore();

		const authenticated = computed(() => appStore.authenticated);

		onMounted(() => fetchProviders());

		return { t, te, authenticated };

		async function fetchProviders() {
			try {
				const response = await api.get('/auth');
			} catch (err: any) {
				unexpectedError(err);
			}
		}
	},
});
</script>

<style lang="scss" scoped>
h1 {
	margin-bottom: 20px;
}

.header {
	display: flex;
	align-items: end;
	justify-content: space-between;
	margin-bottom: 20px;

	.type-title {
		margin-bottom: 0;
	}

	.provider-select {
		margin-bottom: 8px;
	}
}
</style>
