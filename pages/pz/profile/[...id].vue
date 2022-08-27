<script setup lang="ts">
import ProfileForm from '@/components/form/ProfileForm.vue';

definePageMeta({
	title: 'route.profile',
	icon: {
		value: 'mdi-account',
	},
	visible: false,
});

const config: any = ref();
const data = ref();

onMounted(async () => {
	config.value = (await $fetch('/api/component?where={"syscode":"profile"}'))[0];
	config.value.submitUrl = `/api/profile?where={"id":"${useRoute().params.id}"}`;
	config.value.method = 'PATCH';
	data.value = (await $fetch(`/api/profile?where={"id":"${useRoute().params.id}"}`))[0];
});
</script>
<template>
	<div>
		<ProfileForm v-if="config" :config="config" :data="data" />
	</div>
</template>
