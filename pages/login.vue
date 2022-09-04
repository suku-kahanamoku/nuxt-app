<script setup lang="ts">
import Form from '@/core/form/Form.vue';
import { CLONE } from '@/core/utils/modify-object.function';

definePageMeta({
	syscode: 'login',
});

const pageConfig = CLONE((useState('pages').value as any).login);
const configs = reactive(pageConfig?.configs);

onMounted(async () => {
	if (pageConfig?.configs?.form) {
		configs.form = (await useApi(pageConfig?.configs?.form))[0];
	}
});

async function onSubmit(url, form?, fieldConfigs?, loading?, method?: string) {
	useSubmit(url, form, fieldConfigs, loading, method).then(
		data => {
			if (data?.uid) {
				navigateTo(useState('redirect')?.value || '/pz');
			}
		}
	);
}
</script>
<template>
	<div>
		<Form v-if="configs?.form" :config="configs?.form" @submit="onSubmit" />
	</div>
</template>
