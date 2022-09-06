<script setup lang="ts">
	definePageMeta({
		syscode: 'page_home',
	});

	const route = useRoute();
	const meta = route.meta as any;
	const pageConfig = useState('pages').value[meta?.syscode];
</script>
<template>
	<div>home</div>
</template>
