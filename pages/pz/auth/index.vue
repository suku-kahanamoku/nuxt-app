<script setup lang="ts">
import Form from '@/core/form/Form.vue';
import AuthCard from '@/components/card/AuthCard.vue';

definePageMeta({
	title: 'route.auth',
	icon: {
		value: 'mdi-cog',
	},
});

const config: any = ref();
const data = ref();

onMounted(async () => {
	config.value = (await $fetch('/api/component?where={"syscode":"auth"}'))[0];
	config.value.method = 'GET';
	config.value.create = true;
});

async function del(event) {
	await $fetch(`/api/auth?where={"id":"${event.id}"}`, { method: 'DELETE' });
}
</script>
<template>
	<div>
		<Form v-if="config" :config="config" @submit="data = $event" />

		<v-row v-if="data?.length" class="mt-5">
			<v-col v-for="item in data" cols="12" sm="6" md="4" lg="3">
				<AuthCard :data="item" @delete="del" />
			</v-col>
		</v-row>
	</div>
</template>
