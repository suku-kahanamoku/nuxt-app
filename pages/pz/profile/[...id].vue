<script setup lang="ts">
import Form from '@/core/form/Form.vue';

definePageMeta({
	title: 'route.profile',
	icon: {
		value: 'mdi-account',
	},
	visible: false,
});

const config: any = ref();
const data = ref();

onMounted(async () => {
	config.value = (await $fetch('/api/component?where={"syscode":"profile"}'))[0];
	config.value.submitUrl = `/api/profile?where={"id":"${useRoute().params.id}"}`;
	config.value.method = 'PATCH';
	data.value = (await $fetch(`/api/profile?where={"id":"${useRoute().params.id}"}`))[0];
});
</script>
<template>
	<div>
		<Form v-if="config" :config="config" :data="data" @submit="data = $event" />
	</div>
</template>
