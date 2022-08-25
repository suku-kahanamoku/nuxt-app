<script setup lang="ts">
import ProfileForm from '@/components/form/ProfileForm.vue';

definePageMeta({
	title: 'route.profile',
	icon: {
		value: 'mdi-account',
	},
	visible: false,
});

const config: any = ref((await $fetch('/api/component?where={"syscode":"profile"}'))[0]);
config.value.restUrl = `/api/profile?where={"id":"${useRoute().params.id}"}`;
</script>
<template>
	<div>
		<ProfileForm v-if="config" :config="config" />
	</div>
</template>
