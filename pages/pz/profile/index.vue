<script setup lang="ts">
import ProfileForm from '@/components/form/ProfileForm.vue';

definePageMeta({
	title: 'route.profile',
	icon: {
		value: 'mdi-account',
	},
});

const config: any = ref((await $fetch('/api/component?where={"syscode":"profile"}'))[0]);
const data = ref();

onMounted(() => {
	config.value.submitUrl = `/api/profile`;
	config.value.method = 'GET';
	config.value.theme = 'accordion';
});

async function del(event) {
	await $fetch(`/api/profile?where={"id":"${event.id}"}`, { method: 'DELETE' });
}
</script>
<template>
	<div>
		<ProfileForm :config="config" @submit="data = $event" />

		<v-row v-if="data?.length" class="mt-5">
			<v-col v-for="user in data" cols="12" sm="6" md="4" lg="3">
				<ProfileCard :data="user" @delete="del" />
			</v-col>
		</v-row>
	</div>
</template>
