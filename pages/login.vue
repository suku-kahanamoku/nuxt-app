<script setup lang="ts">
import Form from '@/core/form/Form.vue';

definePageMeta({
	title: 'route.login',
	icon: {
		value: 'mdi-login',
	},
	visible: false,
});

const config: any = ref();

onMounted(async () => {
	config.value = (await $fetch('/api/component?where={"syscode":"login"}'))[0];
});

async function onSubmit(event) {
	if (event?.uid) {
		setStore('profile', event);
		navigateTo(useState('redirect')?.value || '/pz');
	}
}
</script>
<template>
	<div>
		<Form v-if="config" :config="config" @submit="onSubmit" />
	</div>
</template>
