<script setup lang="ts">
import Form from '@/core/form/Form.vue';
import { CLONE } from '@/core/utils/modify-object.function';

definePageMeta({
	syscode: 'role_detail',
});

const pageConfig = CLONE((useState('pages').value as any).role_detail);
const configs = reactive(pageConfig?.configs);
const data = ref();

onMounted(async () => {
	if (pageConfig?.configs?.form) {
		configs.form = (await useApi(pageConfig?.configs?.form))[0];
		configs.form.submitUrl = `${configs.form.submitUrl}?where={"id":"${useRoute().params.id}"}`;
		configs.form.method = 'PATCH';
		data.value = (await useApi(configs.form.submitUrl))[0];
	}
});
</script>
<template>
	<div>
		<Form v-if="configs?.form" :config="configs?.form" :data="data" @submit="data = $event" />
	</div>
</template>
