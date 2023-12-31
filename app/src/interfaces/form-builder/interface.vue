<template>
	<div class="grid">
		<div class="grid-element full">
			<repeater
					:value="repeaterValue"
					:template="`{{ field }} — {{ interface }}`"
					:fields="repeaterFields"
					@input="repeaterValue = $event"
			/>
		</div>
	</div>
</template>

<script lang="ts">
import {translate} from '@/utils/translate-object-values';
import {Field, FieldMeta} from '@directus/shared/types';
import {defineComponent, PropType, computed, onMounted} from 'vue';
import {DeepPartial} from '@directus/shared/types';
import {FIELD_TYPES_SELECT} from '@/constants';
import Repeater from './repeater.vue';
import {useI18n} from 'vue-i18n';

export default defineComponent({
	components: {Repeater},
	props: {
		value: {
			type: Object as PropType<Record<string, any>>,
			default: null,
		},
	},
	emits: ['input'],
	setup(props, {emit}) {
		const {t} = useI18n();

		const repeaterValue = computed({
			get() {
				return props.value?.map((field: Field) => field.meta);
			},
			set(newVal: FieldMeta[] | null) {
				const fields = (newVal || []).map((meta: Record<string, any>) => ({
					field: meta.field,
					name: meta.name ?? meta.field,
					type: meta.type,
					meta,
				}));

				emit('input', fields);
			},
		});

		const repeaterFields: DeepPartial<Field>[] = [
			{
				name: t('name', 1),
				field: 'name',
				type: 'string',
				meta: {
					interface: 'input',
					width: 'full',
					sort: 2,
					options: {
						font: 'monospace',
						placeholder: 'Name',
					},
				},
				schema: null,
			},
			{
				name: t('field', 1),
				field: 'field',
				type: 'string',
				meta: {
					interface: 'input',
					width: 'half',
					sort: 2,
					options: {
						dbSafe: true,
						font: 'monospace',
						placeholder: t('interfaces.list.field_name_placeholder'),
					},
				},
				schema: null,
			},
			{
				name: t('field_width'),
				field: 'width',
				type: 'string',
				meta: {
					interface: 'select-dropdown',
					width: 'half',
					sort: 3,
					options: {
						choices: [
							{
								value: 'half',
								text: t('half_width'),
							},
							{
								value: 'full',
								text: t('full_width'),
							},
						],
					},
				},
				schema: null,
			},
			{
				name: t('type'),
				field: 'type',
				type: 'string',
				meta: {
					interface: 'select-dropdown',
					width: 'half',
					sort: 4,
					options: {
						choices: translate(FIELD_TYPES_SELECT),
					},
				},
				schema: null,
			},
			{
				name: t('interface_label'),
				field: 'interface',
				type: 'string',
				meta: {
					interface: 'system-interface',
					width: 'half',
					sort: 5,
					options: {
						typeField: 'type',
					},
				},
				schema: null,
			},
			{
				name: t('note'),
				field: 'note',
				type: 'string',
				meta: {
					interface: 'input',
					width: 'full',
					sort: 6,
					options: {
						placeholder: t('interfaces.list.field_note_placeholder'),
					},
				},
				schema: null,
			},
			{
				name: t('options'),
				field: 'options',
				type: 'string',
				meta: {
					interface: 'system-interface-options',
					width: 'full',
					sort: 7,
					options: {
						interfaceField: 'interface',
					},
				},
			},
		];

		onMounted(() => {
			console.log(repeaterFields);
		});

		return {t, repeaterValue, repeaterFields};
	},
});
</script>

<style lang="scss" scoped>
@import '@/styles/mixins/form-grid';

.grid {
	@include form-grid;

	&-element {
		&.full {
			grid-column: start/full;
		}
	}
}
</style>
