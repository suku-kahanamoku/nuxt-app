<script setup lang="ts">
import Form from '@/core/form/Form.vue';

definePageMeta({
	title: 'route.reset_pass',
	icon: {
		value: 'mdi-key',
	},
	visible: false,
});

const config: any = ref();

onMounted(async () => {
	config.value = (await $fetch('/api/component?where={"syscode":"reset_pass"}'))[0];
});

async function onSubmit(event) {}
</script>
<template>
	<div>
		<Form v-if="config" :config="config" @submit="onSubmit" />
	</div>
</template>
