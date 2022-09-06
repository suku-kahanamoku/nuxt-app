<script setup lang="ts">
	import Form from '@/core/form/Form.vue';

	definePageMeta({
		syscode: 'page_contact',
	});

	const route = useRoute();
	const syscode = route.meta?.syscode as string;
	const pageConfig = useState('pages').value[syscode];
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
		<Form v-if="configs?.cmp_contact_form" :config="configs?.cmp_contact_form" @submit="onSubmit" />
	</div>
</template>
