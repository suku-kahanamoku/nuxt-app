<script setup lang="ts">
definePageMeta({
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
