<script setup lang="ts">
	import Form from '@/core/form/Form.vue';
	import JsonForm from '@/core/form/JsonForm.vue';

	definePageMeta({
		syscode: 'auth_detail',
	});

	const pageConfig = useState('pageConfig').value as any;
	const configs = reactive({} as any);
	const data = ref();
	const tab = ref();

	onMounted(async () => {
		// nacte a inicializuje konfigurace pro vnitrni komponenty
		loadConfigs(pageConfig?.configs, configs);
	});
</script>

<template>
	<div>
		<v-tabs v-model="tab" background-color="primary">
			<v-tab v-for="syscode in pageConfig?.configs" :value="syscode">{{
				$t(configs[syscode]?.title || 'empty')
			}}</v-tab>
		</v-tabs>

		<v-window v-model="tab">
			<v-window-item v-for="syscode in pageConfig?.configs" :value="syscode">
				<JsonForm
					v-if="configs[syscode]?.type === 'json'"
					:config="configs[syscode]"
					:data="data"
					@submit="data = $event"
				/>
				<Form
					v-else-if="configs[syscode]"
					:config="configs[syscode]"
					:data="data"
					@load="data = $event[0]"
					@submit="data = [$event]"
				/>
			</v-window-item>
		</v-window>
	</div>
</template>
