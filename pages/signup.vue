<script setup lang="ts">
import ProfileForm from '@/components/form/ProfileForm.vue';

definePageMeta({
	title: 'route.signup',
	icon: {
		value: 'mdi-account',
	},
	visible: false,
});

const config: any = useState('config_signup');
onMounted(() => {
	config.value.submitUrl = `/api/profile`;
	config.value.method = 'POST';
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
		<ProfileForm :config="config" @submit="onSubmit" />
	</div>
</template>
