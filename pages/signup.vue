<script setup lang="ts">
import Form from '@/core/form/Form.vue';

definePageMeta({
	title: 'route.signup',
	icon: {
		value: 'mdi-account',
	},
	visible: false,
});

const config: any = useState('config_signup');
const data = ref();

onMounted(async () => {
	config.value.submitUrl = `/api/profile`;
	config.value.method = 'POST';
	data.value = (await $fetch(`/api/profile?where={"id":"${useRoute().params.id}"}`))[0];
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
		<Form v-if="config" :config="config" :data="data" @submit="onSubmit" />
	</div>
</template>
