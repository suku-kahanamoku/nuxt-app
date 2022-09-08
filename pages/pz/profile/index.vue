<script setup lang="ts">
	import Form from '@/core/form/Form.vue';
	import ProfileCard from '@/components/card/ProfileCard.vue';
	import { GET_MARK } from '@/core/utils/modify-string.functions';
	import { IS_OBJECT } from '@/core/utils/check.functions';

	definePageMeta({
		syscode: 'profile',
	});

	const pageConfig = useState('pageConfig').value as any;
	const configs = reactive({} as any);
	const data = ref();
	const tab = ref(pageConfig?.configs[0]);

	onMounted(async () => {
		// nacte a inicializuje konfigurace pro vnitrni komponenty
		loadConfigs(pageConfig?.configs, configs);
	});

	function onLoad(e): void {
		e?.forEach((item) => (item.path = `${pageConfig?.path}/${item.id}`));
		data.value = e;
	}

	function onSubmit(e): void {
		if (e) {
			if (IS_OBJECT(e)) {
				navigateTo(`${pageConfig?.path}/${e.id}`);
			} else {
				navigateTo(pageConfig?.path + GET_MARK(pageConfig?.path) + e);
			}
		}
	}
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
				<Form v-if="configs[syscode]" :config="configs[syscode]" @load="onLoad" @submit="onSubmit" />
			</v-window-item>
		</v-window>

		<v-row v-if="data?.length" class="mt-5">
			<v-col v-for="item in data" cols="12" sm="6" md="4" lg="3">
				<ProfileCard :data="item" />
			</v-col>
		</v-row>
	</div>
</template>
