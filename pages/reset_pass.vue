<script setup lang="ts">
import Form from '@/core/form/Form.vue';
import { CLONE } from '@/core/utils/modify-object.function';

definePageMeta({
	syscode: 'reset_pass',
});

const pageConfig = CLONE((useState('pages').value as any).reset_pass);
const configs = reactive(pageConfig?.configs);

onMounted(async () => {
	if (pageConfig?.configs?.form) {
		configs.form = (await useApi(pageConfig?.configs?.form))[0];
	}
});

async function onSubmit(url, form?, fieldConfigs?, loading?, method?: string) {
	useSubmit(url, form, fieldConfigs, loading, method);
}
</script>
<template>
	<div>
		<Form v-if="configs?.form" :config="configs?.form" @submit="onSubmit" />
	</div>
</template>
