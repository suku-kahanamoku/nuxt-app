<script setup lang="ts">
definePageMeta({
	title: 'route.logout',
	icon: {
		value: 'mdi-logout',
	},
	visible: false,
});

onMounted(() => {
	$fetch('/api/signout');
	setStore('profile', false);
});
</script>
<template>odhlaseni</template>
