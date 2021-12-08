<template>
	<private-view :title="t('settings_project')">
		<template #headline><v-breadcrumb :items="[{ name: t('settings'), to: '/settings' }]" /></template>
		<template #title-outer:prepend>
			<v-button class="header-icon" rounded disabled icon secondary>
				<v-icon name="public" />
			</v-button>
		</template>

		<template #actions>
			<v-button v-tooltip.bottom="t('save')" icon rounded :disabled="noEdits" :loading="saving" @click="save">
				<v-icon name="check" />
			</v-button>
		</template>

		<template #navigation>
			<settings-navigation />
		</template>

		<div class="settings">
			<v-form v-model="edits" :initial-values="initialValues" :fields="fields" :primary-key="1" />

			<div class="apps-select-wrapper with-fill">
					<div class="full">
			      <v-select :items="apps" :model-value="app" @update:modelValue="handleAppSelect">
								<template v-if="!apps" #preview>
										<v-progress-circular indeterminate/>
								</template>
			      </v-select>
					</div>
			</div>
		</div>

		<template #sidebar>
			<project-info-sidebar-detail />
		</template>

		<v-dialog v-model="confirmLeave" @esc="confirmLeave = false">
			<v-card>
				<v-card-title>{{ t('unsaved_changes') }}</v-card-title>
				<v-card-text>{{ t('unsaved_changes_copy') }}</v-card-text>
				<v-card-actions>
					<v-button secondary @click="discardAndLeave">
						{{ t('discard_changes') }}
					</v-button>
					<v-button @click="confirmLeave = false">{{ t('keep_editing') }}</v-button>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</private-view>
</template>

<script lang="ts">
import { useI18n } from 'vue-i18n';
import {defineComponent, ref, computed, reactive} from 'vue';
import SettingsNavigation from '../../components/navigation.vue';
import { useCollection } from '@directus/shared/composables';
import { useSettingsStore, useServerStore } from '@/stores';
import ProjectInfoSidebarDetail from './components/project-info-sidebar-detail.vue';
import { clone } from 'lodash';
import useShortcut from '@/composables/use-shortcut';
import unsavedChanges from '@/composables/unsaved-changes';
import { useRouter, onBeforeRouteUpdate, onBeforeRouteLeave, NavigationGuard } from 'vue-router';
import VSelect from "@/components/v-select/v-select.vue";
import VForm from "@/components/v-form/v-form.vue";
import VProgressCircular from "@/components/v-progress/circular/v-progress-circular.vue";
import api from "@/api";

export default defineComponent({
	components: {VProgressCircular, VForm, VSelect, SettingsNavigation, ProjectInfoSidebarDetail },
	setup() {
		const { t } = useI18n();

		const router = useRouter();

		const settingsStore = useSettingsStore();
		const serverStore = useServerStore();

		const { fields } = useCollection('directus_settings');

		const initialValues = ref(clone(settingsStore.settings));

		const edits = ref<{ [key: string]: any } | null>(null);

		const noEdits = computed<boolean>(() => edits.value === null || Object.keys(edits.value).length === 0);

		const saving = ref(false);

		useShortcut('meta+s', () => {
			if (!noEdits.value) save();
		});

		const isSavable = computed(() => {
			if (noEdits.value === true) return false;
			return noEdits.value;
		});

		unsavedChanges(isSavable);

		const confirmLeave = ref(false);
		const leaveTo = ref<string | null>(null);

		const editsGuard: NavigationGuard = (to) => {
			if (!noEdits.value) {
				confirmLeave.value = true;
				leaveTo.value = to.fullPath;
				return false;
			}
		};
		onBeforeRouteUpdate(editsGuard);
		onBeforeRouteLeave(editsGuard);

		const apps = reactive<any[]>([]);
		const app = ref(sessionStorage.getItem('default_app') ?? 'master');

		api.get('/server/current-app')
			.then(res => {
				app.value = res.data.app;
			});

		async function handleAppSelect(value: string) {
			if (app.value === value) {
				return;
			}

			app.value = value;
		  sessionStorage.setItem('default_app', value);

		  try {
		    await api.post('/server/switch-app', {
			    app: app.value,
		    });

		    location.reload();
			} catch (e) {
			  alert('Failed to switch app')
	    }
		}

		api.get('/server/apps').then((res) => {
			for (const item of res.data) {
				apps.push({
						text: item.code ? `${item.name} - ${item.code}` : item.name,
						value: item.app,
				});
			}

			if (!apps.some((a: any) => a.value === app.value)) {
				app.value = 'master';
		    api.defaults.headers.common['X-Al-Mad-App'] = app.value;
			}
		});

		return {
			t,
			fields,
			initialValues,
			edits,
			noEdits,
			saving,
			isSavable,
			confirmLeave,
			leaveTo,
			save,
			discardAndLeave,
		  apps,
			app,
			handleAppSelect,
		};

		async function save() {
			if (edits.value === null) return;
			saving.value = true;
			await settingsStore.updateSettings(edits.value);
			await serverStore.hydrate();
			edits.value = null;
			saving.value = false;
			initialValues.value = clone(settingsStore.settings);
		}

		function discardAndLeave() {
			if (!leaveTo.value) return;
			edits.value = {};
			confirmLeave.value = false;
			router.push(leaveTo.value);
		}
	},
});
</script>

<style lang="scss" scoped>
@import '@/styles/mixins/form-grid';

.settings {
	padding: var(--content-padding);
	padding-bottom: var(--content-padding-bottom);
}

.header-icon {
	--v-button-color-disabled: var(--warning);
	--v-button-background-color-disabled: var(--warning-10);
}

.apps-select-wrapper {
  @include form-grid;

	margin-top: 30px;
}
</style>
