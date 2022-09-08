<script setup lang="ts">
	import Form from '@/core/form/Form.vue';
	import JsonForm from '@/core/form/JsonForm.vue';

	definePageMeta({
		syscode: 'auth_detail',
	});

	const route = useRoute();
	const meta = route.meta as any;
	const pageConfig = useState('pages').value[meta?.syscode];
	const configs = reactive({} as any);
	const data = ref();
	const tab = ref();

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
			result.forEach((tmpConfig) => (configs[tmpConfig.syscode] = tmpConfig));
		}
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
				<JsonForm
					v-if="configs[syscode]?.type === 'json'"
					:config="configs.cmp_form"
					:data="data"
					@submit="data = $event"
				/>
				<Form v-else-if="configs[syscode]" :config="configs[syscode]" @load="data = $event" />
			</v-window-item>
		</v-window>
	</div>
</template>
