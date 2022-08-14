<template>
	<main>
		<client-only>
		
		</client-only>
		<ContentDoc />
	</main>
</template>

<script setup lang="ts">
import data from 'mdb-ui-kit/js/mdb.min';

const { $hello } = useNuxtApp();

onMounted(() => {
	console.log($hello)
})
</script>
