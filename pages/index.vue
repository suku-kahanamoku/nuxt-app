<script setup lang="ts">
	import { CLONE } from '@/core/utils/modify-object.function';

	definePageMeta({
		syscode: 'page_home',
	});

	const pageConfig = CLONE((useState('pages').value as any).page_home);
</script>
<template>
	<div>home</div>
</template>
