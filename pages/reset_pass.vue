<script setup lang="ts">
	import Form from '@/core/form/Form.vue';

	definePageMeta({
		syscode: 'page_reset_pass',
		configSyscode: 'cmp_reset_pass',
	});

	const route = useRoute();
	const meta = route.meta as any;
	const pageConfig = useState('pages').value[meta?.syscode];
	const configs = reactive({} as any);
	const config = ref();

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
			result.forEach((tmpConfig) => {
				// nastavi config hlavni komponente
				if (meta?.configSyscode === tmpConfig.syscode) {
					config.value = tmpConfig;
				}
				configs[tmpConfig.syscode] = tmpConfig;
			});
		}
	}

	async function onSubmit(url, form?, fieldConfigs?, loading?, method?: string) {
		useSubmit(url, form, fieldConfigs, loading, method);
	}
</script>
<template>
	<div>
		<Form v-if="config" :config="config" @submit="onSubmit" />
	</div>
</template>
