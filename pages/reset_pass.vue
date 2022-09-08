<script setup lang="ts">
	import Form from '@/core/form/Form.vue';

	definePageMeta({
		syscode: 'reset_pass',
	});

	const pageConfig = useState('pageConfig').value as any;
	const configs = reactive({} as any);

	onMounted(async () => {
		// nacte a inicializuje konfigurace pro vnitrni komponenty
		loadConfigs(pageConfig?.configs, configs);
	});
</script>
<template>
	<div>
		<Form v-for="config in configs" :config="config" />
	</div>
</template>
