<script setup lang="ts">
import Form from '@/core/form/Form.vue';
import CmpCard from '@/components/card/CmpCard.vue';
import { CLONE } from '@/core/utils/modify-object.function';
import { GET_MARK } from '@/core/utils/modify-string.functions';

definePageMeta({
	syscode: 'cmp',
});

const pageConfig = CLONE((useState('pages').value as any).cmp);
const configs = reactive(pageConfig?.configs);
const data = ref();
const tab = ref();

onMounted(async () => {
	// nacte a inicializuje konfigurace pro vnitrni komponenty
	await initConfigs();
	// nacte data
	load();
});

watch(useRoute(), load);

async function initConfigs() {
	if (pageConfig?.configs?.form) {
		// init create form
		const result = await useApi(pageConfig?.configs?.form);
		configs.form = result[0];
		configs.form.method = 'POST';
		// init search form
		configs.searchForm = CLONE(configs.form);
		configs.searchForm.fields.forEach(field => field.required = false);
		configs.searchForm.method = 'GET';
	}
}

async function load() {
	const params = useRoute().query[pageConfig.syscode] as string;
	if (params && configs.searchForm.submitUrl) {
		data.value = await useApi(configs.searchForm.submitUrl + '?where=' + params);
	} else {
		data.value = [];
	}
}

async function onSubmit(url, form?, fieldConfigs?, loading?, method?: string) {
	switch (method) {
		case 'POST':
		case 'PATCH':
			const result = await useSubmit(url, form, fieldConfigs, loading, method);
			navigateTo(`${pageConfig.path}/${result.id}`);
			break;

		case 'DELETE':
			await useSubmit(url, form, fieldConfigs, loading, method);
			load();
			break;

		default:
			const redirUrl = await useSubmit('', form, fieldConfigs, loading, method);
			navigateTo(pageConfig.path + GET_MARK(pageConfig.path) + pageConfig.syscode + '=' + redirUrl);
			break;
	}
}
</script>
<template>
	<div>
		<v-tabs v-model="tab" background-color="primary">
			<v-tab value="search">{{ $t('btn.search') }}</v-tab>
			<v-tab value="create">{{ $t('btn.create') }}</v-tab>
		</v-tabs>

		<v-window v-model="tab">
			<v-window-item value="search">
				<Form v-if="configs?.searchForm" :config="configs?.searchForm" @submit="onSubmit" />

				<v-row v-if="data?.length" class="mt-5">
					<v-col v-for="item in data" cols="12" sm="6" md="4" lg="3">
						<CmpCard :data="item"
							@delete="onSubmit(configs?.form?.submitUrl, null, $event, null, 'DELETE')" />
					</v-col>
				</v-row>
			</v-window-item>

			<v-window-item value="create">
				<Form v-if="configs?.form" :config="configs?.form" @submit="onSubmit" />
			</v-window-item>
		</v-window>
	</div>
</template>
