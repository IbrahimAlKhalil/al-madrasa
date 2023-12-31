<template>
	<div class="v-error selectable">
		<output>[{{ code }}] {{ message }}</output>
		<v-icon
			v-if="showCopy"
			v-tooltip="t('copy_details')"
			small
			class="copy-error"
			:name="copied ? 'check' : 'content_copy'"
			clickable
			@click="copyError"
		/>
	</div>
</template>

<script lang="ts">
import { useI18n } from 'vue-i18n';
import { defineComponent, computed, PropType, ref } from 'vue';
import { isPlainObject } from 'lodash';

export default defineComponent({
	props: {
		error: {
			type: [Object, Error] as PropType<Record<string, any>>,
			required: true,
		},
	},
	setup(props) {
		const { t } = useI18n();

		const code = computed(() => {
			return props.error?.response?.data?.errors?.[0]?.extensions?.code || props.error?.extensions?.code || 'UNKNOWN';
		});

		const message = computed(() => {
			let message = props.error?.response?.data?.errors?.[0]?.message || props.error?.message;

			if (message.length > 200) {
				message = message.substring(0, 197) + '...';
			}

			return message;
		});

		const copied = ref(false);

		const showCopy = computed(() => !!navigator.clipboard?.writeText);

		return { t, code, copyError, showCopy, copied, message };

		async function copyError() {
			const error = props.error?.response?.data || props.error;
			await navigator.clipboard.writeText(
				JSON.stringify(error, isPlainObject(error) ? null : Object.getOwnPropertyNames(error), 2)
			);
			copied.value = true;
		}
	},
});
</script>

<style lang="scss" scoped>
.v-error {
	max-height: 50vh;
	padding: 6px 12px;
	overflow: auto;
	color: var(--danger);
	font-family: var(--family-monospace);
	background-color: var(--danger-alt);
	border-radius: var(--border-radius);

	.copy-error {
		margin-left: 12px;
	}
}
</style>
