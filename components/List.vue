<script setup lang="ts">
	import DefaultCard from '@/components/card/DefaultCard.vue';

	const props = defineProps<{
		config: any;
		data: any;
	}>();

	const emits = defineEmits(['delete']);
</script>

<template>
	<v-row v-if="data?.length" class="mt-5">
		<v-col v-for="item in data" cols="12" sm="6" md="4" lg="3">
			<DefaultCard :data="item" @delete="emits('delete', $event)" />
		</v-col>
	</v-row>
</template>
