<script setup lang="ts">
	import Form from '@/core/form/Form.vue';
	import JsonForm from '@/core/form/JsonForm.vue';

	definePageMeta({
		syscode: 'page_role_detail',
		configSyscode: 'cmp_role_form',
	});

	const route = useRoute();
	const meta = route.meta as any;
	const pageConfig = useState('pages').value[meta?.syscode];
	const configs = reactive({} as any);
	const config = ref();
	const data = ref();
	const tab = ref();

	onMounted(async () => {
		// nacte a inicializuje konfigurace pro vnitrni komponenty
		await initConfigs();
		// nacte data
		load();
	});

	async function initConfigs() {
		if (pageConfig?.configs?.length) {
			const syscodes = pageConfig?.configs?.join('","');
			const result = await useApi(
				`/api/component?where={"syscode":{"value":["${syscodes}"],"operator":{"value":"in"}}}`
			);
			result.forEach((tmpConfig) => {
				if (tmpConfig.submitUrl) {
					tmpConfig.submitUrl = `${tmpConfig.submitUrl}?where={"id":"${route.params.id}"}`;
				}
				// nastavi config hlavni komponente
				if (meta?.configSyscode === tmpConfig.syscode) {
					config.value = tmpConfig;
				}
				configs[tmpConfig.syscode] = tmpConfig;
			});
		}
	}

	async function load() {
		if (config.value?.submitUrl) {
			const result = await useApi(configs.cmp_role_form.submitUrl);
			data.value = result[0];
		} else {
			data.value = {};
		}
	}

	async function onSubmit(url, form?, fieldConfigs?, loading?, method?: string) {
		data.value = await useSubmit(url, form, fieldConfigs, loading, method);
	}
</script>

<template>
	<div>
		<v-tabs v-model="tab" background-color="primary">
			<v-tab value="field">{{ $t('info.form') }}</v-tab>
			<v-tab value="json">{{ $t('info.json') }}</v-tab>
		</v-tabs>

		<v-window v-model="tab">
			<v-window-item value="field">
				<Form v-if="config" :config="config" :data="data" @submit="onSubmit" />
			</v-window-item>

			<v-window-item value="json">
				<JsonForm v-if="config" :config="config" :data="data" @submit="onSubmit" />
			</v-window-item>
		</v-window>
	</div>
</template>
