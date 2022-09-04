<script setup lang="ts">
import { CLONE } from '@/core/utils/modify-object.function';

definePageMeta({
	syscode: 'home',
});

const pageConfig = CLONE((useState('pages').value as any).reset_pass);
</script>
<template>
	<div>
		home
	</div>
</template>
