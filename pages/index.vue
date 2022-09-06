<script setup lang="ts">
	definePageMeta({
		syscode: 'page_home',
	});

	const route = useRoute();
	const syscode = route.meta?.syscode as string;
	const pageConfig = useState('pages').value[syscode];
</script>
<template>
	<div>home</div>
</template>
