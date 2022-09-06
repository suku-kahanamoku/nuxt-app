<script setup lang="ts">
	import Form from '@/core/form/Form.vue';
	import DefaultCard from '@/components/card/DefaultCard.vue';
	import { GET_MARK } from '@/core/utils/modify-string.functions';

	definePageMeta({
		syscode: 'page',
	});

	const route = useRoute();
	const syscode = route.meta?.syscode as string;
	const pageConfig = useState('pages').value[syscode];
	const configs = reactive({} as any);
	const data = ref();
	const tab = ref(pageConfig.configs[0]);

	onMounted(async () => {
		// nacte a inicializuje konfigurace pro vnitrni komponenty
		await initConfigs();
		// nacte data
		load();
	});

	watch(route, load);

	async function initConfigs() {
		if (pageConfig?.configs?.length) {
			const syscodes = pageConfig?.configs?.join('","');
			const result = await useApi(
				`/api/component?where={"syscode":{"value":["${syscodes}"],"operator":{"value":"in"}}}`
			);
			result.forEach((config) => (configs[config.syscode] = config));
		}
	}

	async function load() {
		const params = route.query[pageConfig?.syscode] as string;
		if (params && configs.cmp_page_search_form.submitUrl) {
			data.value = await useApi(configs.cmp_page_search_form.submitUrl + '?where=' + params);
		} else {
			data.value = [];
		}
	}

	async function onSubmit(url, form?, fieldConfigs?, loading?, method?: string) {
		switch (method) {
			case 'POST':
			case 'PATCH':
				const result = await useSubmit(url, form, fieldConfigs, loading, method);
				if (result?.id) {
					navigateTo(`${pageConfig?.path}/${result.id}`);
				}
				break;

			case 'DELETE':
				await useSubmit(url, form, fieldConfigs, loading, method);
				load();
				break;

			default:
				const redirUrl = await useSubmit('', form, fieldConfigs, loading, method);
				if (redirUrl) {
					navigateTo(pageConfig?.path + GET_MARK(pageConfig?.path) + pageConfig?.syscode + '=' + redirUrl);
				}
				break;
		}
	}
</script>

<template>
	<div>
		<v-tabs v-model="tab" background-color="primary">
			<v-tab v-for="config in configs" :value="config?.syscode">{{ $t(config?.title) }}</v-tab>
		</v-tabs>

		<v-window v-model="tab">
			<v-window-item v-for="config in configs" :value="config?.syscode">
				<Form v-if="config" :config="config" @submit="onSubmit" />
			</v-window-item>
		</v-window>

		<v-row v-if="data?.length" class="mt-5">
			<v-col v-for="item in data" cols="12" sm="6" md="4" lg="3">
				<DefaultCard
					:data="item"
					:path="pageConfig?.path"
					@delete="onSubmit(configs?.cmp_page_search_form?.submitUrl, $event, null, null, 'DELETE')"
				/>
			</v-col>
		</v-row>
	</div>
</template>
