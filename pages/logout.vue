<script setup lang="ts">
	definePageMeta({
		syscode: 'page_logout',
	});

	onMounted(() => {
		useApi('/api/signout');
	});
</script>
<template>
	<div>odhlaseni</div>
</template>
