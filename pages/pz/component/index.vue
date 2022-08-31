<script setup lang="ts">
import Form from '@/core/form/Form.vue';
import CmpCard from '@/components/component/CmpCard.vue';

definePageMeta({
	title: 'route.cmp',
	icon: {
		value: 'mdi-account',
	},
});

const config: any = ref();
const data = ref();

onMounted(async () => {
	config.value = (await $fetch('/api/component?where={"syscode":"cmp"}'))[0];
	config.value.method = 'GET';
});

async function del(event) {
	await $fetch(`/api/component?where={"id":"${event.id}"}`, { method: 'DELETE' });
}
</script>
<template>
	<div>
		<Form v-if="config" :config="config" @submit="data = $event" />

		<v-row v-if="data?.length" class="mt-5">
			<v-col v-for="cmp in data" cols="12" sm="6" md="4" lg="3">
				<CmpCard :data="cmp" @delete="del" />
			</v-col>
		</v-row>
	</div>
</template>
