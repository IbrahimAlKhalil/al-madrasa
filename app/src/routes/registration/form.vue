<template>
	<form @submit.prevent="onSubmit">
		<v-input v-model="first_name" autofocus autocomplete="given-name" placeholder="First Name"/>
		<v-input v-model="last_name" autofocus autocomplete="family-name" placeholder="Last Name"/>
		<v-input v-model="email" autofocus autocomplete="username" type="email" :placeholder="t('email')"/>
		<v-input v-model="password" type="password" autocomplete="current-password" :placeholder="t('password')"/>

		<v-notice v-if="error" type="warning">
			{{ errorFormatted }}
		</v-notice>

		<div class="buttons">
			<v-button type="submit" :loading="loading" large>Submit</v-button>
			<router-link to="/login" class="forgot-password">
				{{ t('login') }}
			</router-link>
		</div>
	</form>
</template>

<script lang="ts">
import {defineComponent, ref, computed} from 'vue';
import {translateAPIError} from '@/lang';
import {useUserStore} from '@/stores';
import {useRouter} from 'vue-router';
import {RequestError} from '@/api';
import {useI18n} from 'vue-i18n';
import {login} from '@/auth';

type Credentials = {
	first_name: string | null;
	last_name: string | null;
	email: string;
	password: string;
};

export default defineComponent({
	setup() {
		const {t} = useI18n();

		const router = useRouter();

		const loading = ref(false);

		const first_name = ref<string | null>(null);
		const last_name = ref<string | null>(null);
		const email = ref<string | null>(null);
		const password = ref<string | null>(null);

		const error = ref<RequestError | string | null>(null);
		const userStore = useUserStore();

		const errorFormatted = computed(() => {
			// Show "Wrong username or password" for wrongly formatted emails as well
			if (error.value === 'INVALID_PAYLOAD') {
				return translateAPIError('INVALID_CREDENTIALS');
			}

			if (error.value) {
				return translateAPIError(error.value);
			}
			return null;
		});

		return {
			t,
			errorFormatted,
			error,
			first_name,
			last_name,
			email,
			password,
			onSubmit,
			loading,
			translateAPIError,
		};

		async function onSubmit() {
			if (email.value === null || password.value === null) return;

			try {
				loading.value = true;

				const credentials: Credentials = {
					first_name: first_name.value,
					last_name: last_name.value,
					email: email.value,
					password: password.value,
				};

				// await login(credentials, provider.value);

				const redirectQuery = router.currentRoute.value.query.redirect as string;

				// Stores are hydrated after login
				const lastPage = userStore.currentUser?.last_page;

				router.push(redirectQuery || lastPage || '/content');
			} catch (err: any) {
				error.value = err.response?.data?.errors?.[0]?.extensions?.code || err;
			} finally {
				loading.value = false;
			}
		}
	},
});
</script>

<style lang="scss" scoped>
.v-input,
.v-notice {
	margin-bottom: 20px;
}

.buttons {
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.forgot-password {
	color: var(--foreground-subdued);
	transition: color var(--fast) var(--transition);

	&:hover {
		color: var(--foreground-normal);
	}
}
</style>
