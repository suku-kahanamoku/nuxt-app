<script setup lang="ts">
import Form from '@/core/form/Form.vue';
import CmpCard from '@/components/card/CmpCard.vue';
import { CLONE } from '@/core/utils/modify-object.function';

definePageMeta({
	syscode: 'cmp',
});

const pageConfig = CLONE((useState('pages').value as any).cmp);
const configs = reactive(pageConfig?.configs);
const data = ref();

onMounted(async () => {
	if (pageConfig?.configs?.form) {
		configs.form = (await useApi(pageConfig?.configs?.form))[0];
		configs.form.method = 'GET';
	}
});

async function del(event) {
	await useApi(`/api/component?where={"id":"${event.id}"}`, { method: 'DELETE' });
}
</script>
<template>
	<div>
		<Form v-if="configs?.form" :config="configs?.form" @submit="data = $event" />

		<v-row v-if="data?.length" class="mt-5">
			<v-col v-for="item in data" cols="12" sm="6" md="4" lg="3">
				<CmpCard :data="item" @delete="del" />
			</v-col>
		</v-row>
	</div>
</template>
