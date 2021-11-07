<template>
		<a :href="link">{{ link }}</a>
</template>

<script lang="ts">
import {computed, defineComponent} from "vue";

export default defineComponent({
		props: {
			value: String,
		},

		setup({ value }) {
			return {
				link: computed(() => `${location.protocol}${location.host}/${value}`)
			};
		},
});
</script>

<style scoped>
a {
		color: var(--brand);
		text-decoration: underline;
}
</style>
