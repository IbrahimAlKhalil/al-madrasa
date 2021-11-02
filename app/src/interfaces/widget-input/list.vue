<template>
	<v-notice type="info" v-if="!isWidgetSet">
		Please select an widget first
	</v-notice>

	<v-notice type="info" v-else-if="fields.length === 0">
		No options to configure
	</v-notice>

	<template v-else>
		<v-divider/>
		<br><br>

		<form-field
				@update:modelValue="handleInput($event, field)"
				:model-value="model[field.field]"
				v-for="field in fields"
				:key="field.field"
				:field="field"
		/>
	</template>
</template>

<script lang="ts">
import {defineComponent, PropType, inject, watch, reactive, computed, ref} from 'vue';
import VDivider from "@/components/v-divider/v-divider.vue";
import {FieldRaw} from "@directus/shared/src/types/fields";
import FormField from "@/components/v-form/form-field.vue";
import VNotice from "@/components/v-notice/v-notice.vue";
import Draggable from 'vuedraggable';
import api from '@/api';

export default defineComponent({
	components: {VDivider, FormField, VNotice, Draggable},
	props: {
		value: {
			type: Array as PropType<Record<string, any>[]>,
			default: null,
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		collection: {
			type: String,
			default: null,
		},
		field: {
			type: String,
			default: null,
		},
	},
	emits: ['input'],
	setup(props, {emit}) {
		const values = inject('values') as any;
		const metadata = reactive({value: [] as FieldRaw[]});
		const isWidgetSet = ref(!!values._value.widget);
		const fields = computed(() => metadata.value);
		const model: Record<string, any> = reactive(props.value ? {...props.value} : {});

		function handleInput(value: any, field: FieldRaw) {
			model[field.field] = value;
			emit('input', model);
		}

		if (isWidgetSet.value) {
			api.get(`/items/widget/${values._value.widget}`).then(({data}) => {
				metadata.value = data.data.metadata;
			});
		}

		watch(values, async (value) => {
			if (!value.widget) {
				isWidgetSet.value = false;
				metadata.value = [];
				return;
			}

			isWidgetSet.value = true;

			metadata.value = (await api.get(`/items/widget/${value.widget}`)).data.data.metadata;

			for (const field of metadata.value) {
				if (!model.hasOwnProperty(field.field)) {
					model[field.field] = null;
				}
			}
		}, {deep: true});

		return {
			handleInput,
			isWidgetSet,
			fields,
			model
		}
	},
});
</script>
