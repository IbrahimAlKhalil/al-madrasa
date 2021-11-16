<template>
	<div>
		<v-form
				@update:modelValue="handleUpdate"
				:initial-values="initialValue"
				class="am-customization-form"
				:primary-key="section"
				:model-value="model"
				:loading="loading"
				:fields="fields"
		/>

		<v-notice v-if="fields.length === 0" type="warning">
			No customization available for this section
		</v-notice>
	</div>
</template>

<script lang="ts">
import VNotice from '@/components/v-notice/v-notice.vue';
import {computed, defineComponent, PropType} from 'vue';
import VForm from '@/components/v-form/v-form.vue';
import {usePageStore} from '../store/pages';

export default defineComponent({
	name: 'am-customization-route-section',
	components: {VNotice, VForm},
	props: {
		page: {
			type: String as PropType<string>,
			required: true,
		},
		section: {
			type: String as PropType<string>,
			required: true,
		}
	},
	setup(props) {
		const pageStore = usePageStore();
		const fields = computed(() => {
			const section = pageStore.sectionsMap.get(props.section);

			if (!section || !section.fields) {
				return [];
			}

			return section.fields;
		});
		const loading = computed(() => pageStore.loading);
		const model = computed(() => {
			return pageStore.model.get(props.section) || null;
		});
		const initialValue = computed(() => pageStore.sectionsMap.get(props.section)?.data?.value);

		pageStore.hydrateSection(props.page, props.section);

		function handleUpdate(updates: Record<string, any>) {
			pageStore.input(props.section, updates);
		}

		return {
			handleUpdate,
			initialValue,
			loading,
			fields,
			model,
		};
	}
});
</script>

<style lang="scss">
.am-customization-form {
  --input-height: 40px;
  --v-textarea-height: 80px;
  --form-vertical-gap: 16px;

  padding: 0 10px;

  input, textarea, .type-label {
	font-size: .96em;
  }
}
</style>
