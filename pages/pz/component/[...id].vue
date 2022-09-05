<script setup lang="ts">
	import Form from '@/core/form/Form.vue';
	import { CLONE } from '@/core/utils/modify-object.function';
	import JsonForm from '@/core/form/JsonForm.vue';

	definePageMeta({
		syscode: 'cmp_detail',
	});

	const pageConfig = CLONE((useState('pages').value as any).cmp_detail);
	const configs = reactive(pageConfig?.configs);
	const data = ref();
	const tab = ref();

	onMounted(async () => {
		if (pageConfig?.configs?.form) {
			configs.form = (await useApi(pageConfig?.configs?.form))[0];
			configs.form.submitUrl = `${configs.form.submitUrl}?where={"id":"${useRoute().params.id}"}`;
			configs.form.method = 'PATCH';
			data.value = (await useApi(configs.form.submitUrl))[0];
		}
	});

	async function onSubmit(url, form?, fieldConfigs?, loading?, method?: string) {
		useSubmit(url, form, fieldConfigs, loading, method).then((items) => {
			if (items?.uid) {
				data.value = items;
			}
		});
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
				<Form v-if="configs?.form" :config="configs?.form" :data="data" @submit="onSubmit" />
			</v-window-item>

			<v-window-item value="json">
				<JsonForm v-if="configs?.form" :config="configs?.form" :data="data" @submit="onSubmit" />
			</v-window-item>
		</v-window>
	</div>
</template>
