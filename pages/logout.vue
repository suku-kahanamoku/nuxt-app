<script setup lang="ts">

definePageMeta({
	icon: 'mdi-logout',
});

onMounted(() => {
	$fetch('/api/signout');
	setStore('profile', false);
});
</script>
<template>odhlaseni</template>
