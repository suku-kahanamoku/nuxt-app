<script setup lang="ts">
import Form from '@/core/form/Form.vue';

definePageMeta({
	title: 'route.contact',
	icon: {
		value: 'mdi-email',
	},
	pos: 2,
});

const config: any = ref();

onMounted(async () => {
	config.value = (await $fetch('/api/component?where={"syscode":"contact"}'))[0];
});

async function onSubmit(event) {}
</script>
<template>
	<div>
		<Form v-if="config" :config="config" @submit="onSubmit" />
	</div>
</template>
