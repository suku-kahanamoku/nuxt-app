<script setup lang="ts">
import { Ref } from 'vue';
import { RouteRecord } from 'vue-router';

const props = defineProps<{
	data: RouteRecord[];
}>();

console.log(props.data);

const open = ref();
</script>

<template>
	<Logo />
	<v-divider />

	<v-list v-model:opened="open">
		<template v-for="route in data">
			<TreeItem v-if="route.children.length" :data="route" />
			<v-list-item
				v-else
				:value="route.name"
				:title="(route.name as string)"
				:prepend-icon="'mdi-account-circle'"
			></v-list-item>
		</template>
	</v-list>
</template>

<style scoped></style>
