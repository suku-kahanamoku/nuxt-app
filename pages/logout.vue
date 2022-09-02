<script setup lang="ts">
definePageMeta({
	title: 'route.logout',
	icon: {
		value: 'mdi-logout',
	},
	visible: false,
});

onMounted(() => {
	useApi('/api/signout');
	setStore('profile', false);
});
</script>
<template>odhlaseni</template>
