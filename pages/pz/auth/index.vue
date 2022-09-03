<script setup lang="ts">
import Form from '@/core/form/Form.vue';
import AuthCard from '@/components/card/AuthCard.vue';
import { CLONE } from '@/core/utils/modify-object.function';

definePageMeta({
	syscode: 'auth',
});

const pageConfig = CLONE((useState('pages').value as any).auth);
const configs = reactive(pageConfig?.configs);
const data = ref();

onMounted(async () => {
	if (pageConfig?.configs?.form) {
		configs.form = (await useApi(pageConfig?.configs?.form))[0];
		configs.form.method = 'GET';
	}
});

function onSubmit(url, form, fieldConfigs, loading, method) {
	useSubmit(url, form, fieldConfigs, loading, method).then(
		items => data.value = items
	);
}

async function onDelete(event) {
	await useApi(`/api/auth?where={"id":"${event.id}"}`, { method: 'DELETE' });
}
</script>
<template>
	<div>
		<Form v-if="configs?.form" :config="configs?.form" @submit="onSubmit" />

		<v-row v-if="data?.length" class="mt-5">
			<v-col v-for="item in data" cols="12" sm="6" md="4" lg="3">
				<AuthCard :data="item" @delete="onDelete" />
			</v-col>
		</v-row>
	</div>
</template>
