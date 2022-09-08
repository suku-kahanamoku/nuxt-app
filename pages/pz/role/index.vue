<script setup lang="ts">
	import Form from '@/core/form/Form.vue';
	import DefaultCard from '@/components/card/DefaultCard.vue';

	definePageMeta({
		syscode: 'role',
	});

	const route = useRoute();
	const meta = route.meta as any;
	const pageConfig = useState('pages').value[meta?.syscode];
	const configs = reactive({} as any);
	const data = ref();
	const tab = ref(pageConfig.configs[0]);

	onMounted(async () => {
		// nacte a inicializuje konfigurace pro vnitrni komponenty
		await initConfigs();
	});

	async function initConfigs(): Promise<void> {
		if (pageConfig?.configs?.length) {
			const syscodes = pageConfig?.configs?.join('","');
			const result = await useApi(
				`/api/component?where={"syscode":{"value":["${syscodes}"],"operator":{"value":"in"}}}`
			);
			result.forEach((tmpConfig) => {
				tmpConfig.redirUrl = pageConfig.path;
				configs[tmpConfig.syscode] = tmpConfig;
			});
		}
	}

	function onLoad(e): void {
		e?.forEach((item) => (item.path = `${pageConfig.path}/${item.id}`));
		data.value = e;
	}
</script>

<template>
	<div>
		<v-tabs v-model="tab" background-color="primary">
			<v-tab v-for="syscode in pageConfig.configs" :value="syscode">{{
				$t(configs[syscode]?.title || 'empty')
			}}</v-tab>
		</v-tabs>

		<v-window v-model="tab">
			<v-window-item v-for="syscode in pageConfig.configs" :value="syscode">
				<Form v-if="configs[syscode]" :config="configs[syscode]" @load="onLoad" />
			</v-window-item>
		</v-window>

		<v-row v-if="data?.length" class="mt-5">
			<v-col v-for="item in data" cols="12" sm="6" md="4" lg="3">
				<DefaultCard :data="item" />
			</v-col>
		</v-row>
	</div>
</template>
