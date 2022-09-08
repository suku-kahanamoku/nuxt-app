<script setup lang="ts">
	import Form from '@/core/form/Form.vue';

	definePageMeta({
		syscode: 'contact',
	});

	const pageConfig = useState('pageConfig').value as any;
	const configs = reactive({} as any);

	onMounted(async () => {
		// nacte a inicializuje konfigurace pro vnitrni komponenty
		loadConfigs(pageConfig?.configs, configs);
	});

	function onSubmit(e): void {
		if (e.id) {
			
		}
	}
</script>
<template>
	<div>
		<Form v-for="config in configs" :config="config" @submit="onSubmit" />
	</div>
</template>
