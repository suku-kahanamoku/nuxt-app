<script setup lang="ts">
import Form from '@/core/form/Form.vue';

definePageMeta({
	title: 'route.auth',
	icon: {
		value: 'mdi-filter-cog',
	},
});

const config: any = ref();

onMounted(async () => {
	config.value = (await $fetch('/api/component?where={"syscode":"auth"}'))[0];
	config.value.submitUrl = `/api/auth`;
});

async function onSubmit(event) {}
</script>
<template>
	<div>
		<Form v-if="config" :config="config" @submit="onSubmit" />
	</div>
</template>
