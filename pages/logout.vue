<script setup lang="ts">

definePageMeta({
	syscode: 'logout',
});

onMounted(() => {
	useApi('/api/signout');
});
</script>
<template>
	<div>
		odhlaseni
	</div>
</template>
