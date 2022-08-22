<script setup lang="ts">
import { IS_DEFINED } from '~~/core/utils/check.functions';

definePageMeta({
	icon: 'mdi-logout',
});

onMounted(() => {
	$fetch('/api/signout');
	setStore('isLogged', false);
});
</script>
<template>odhlaseni</template>
