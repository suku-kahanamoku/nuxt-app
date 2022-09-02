<script setup lang="ts">
import Form from '@/core/form/Form.vue';
import ProfileCard from '@/components/card/ProfileCard.vue';

definePageMeta({
	title: 'route.profile',
	icon: {
		value: 'mdi-account',
	},
});

const config: any = ref();
const data = ref();

onMounted(async () => {
	config.value = (await useApi('/api/component?where={"syscode":"profile"}'))[0];
	config.value.method = 'GET';
});

async function del(event) {
	await useApi(`/api/profile?where={"id":"${event.id}"}`, { method: 'DELETE' });
}
</script>
<template>
	<div>
		<Form v-if="config" :config="config" @submit="data = $event" />

		<v-row v-if="data?.length" class="mt-5">
			<v-col v-for="user in data" cols="12" sm="6" md="4" lg="3">
				<ProfileCard :data="user" @delete="del" />
			</v-col>
		</v-row>
	</div>
</template>
