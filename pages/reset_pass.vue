<script setup lang="ts">
	import Form from '@/core/form/Form.vue';
	import { CLONE } from '@/core/utils/modify-object.function';

	definePageMeta({
		syscode: 'page_reset_pass',
	});

	const pageConfig = CLONE((useState('pages').value as any).page_reset_pass);
	const configs = reactive({} as any);

	onMounted(async () => {
		// nacte a inicializuje konfigurace pro vnitrni komponenty
		await initConfigs();
	});

	async function initConfigs() {
		if (pageConfig?.configs?.length) {
			const syscodes = pageConfig?.configs?.join('","');
			const result = await useApi(
				`/api/component?where={"syscode":{"value":["${syscodes}"],"operator":{"value":"in"}}}`
			);
			result.forEach((config) => (configs[config.syscode] = config));
		}
	}

	async function onSubmit(url, form?, fieldConfigs?, loading?, method?: string) {
		useSubmit(url, form, fieldConfigs, loading, method);
	}
</script>
<template>
	<div>
		<Form v-if="configs?.cmp_reset_pass" :config="configs?.cmp_reset_pass" @submit="onSubmit" />
	</div>
</template>
