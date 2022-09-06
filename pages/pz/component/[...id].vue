<script setup lang="ts">
	import Form from '@/core/form/Form.vue';
	import { CLONE } from '@/core/utils/modify-object.function';
	import JsonForm from '@/core/form/JsonForm.vue';

	definePageMeta({
		syscode: 'page_cmp_detail',
	});

	const pageConfig = CLONE((useState('pages').value as any).page_cmp_detail);
	const configs = reactive({} as any);
	const data = ref();
	const tab = ref();

	onMounted(async () => {
		await initConfigs();
		load();
	});

	async function initConfigs() {
		if (pageConfig?.configs?.length) {
			const syscodes = pageConfig?.configs?.join('","');
			const result = await useApi(
				`/api/component?where={"syscode":{"value":["${syscodes}"],"operator":{"value":"in"}}}`
			);
			result.forEach((config) => {
				const tmpConfig = (configs[config.syscode] = config);
				if (tmpConfig.submitUrl) {
					tmpConfig.submitUrl = `${tmpConfig.submitUrl}?where={"id":"${useRoute().params.id}"}`;
					tmpConfig.method = 'PATCH';
				}
			});
		}
	}

	async function load() {
		if (configs?.cmp_form?.submitUrl) {
			const result = await useApi(configs.cmp_form.submitUrl);
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
				<Form v-if="configs?.cmp_form" :config="configs?.cmp_form" :data="data" @submit="onSubmit" />
			</v-window-item>

			<v-window-item value="json">
				<JsonForm v-if="configs?.cmp_form" :config="configs?.cmp_form" :data="data" @submit="onSubmit" />
			</v-window-item>
		</v-window>
	</div>
</template>
