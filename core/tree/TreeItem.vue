<script setup lang="ts">
import { RouteRecord } from 'vue-router';

const props = defineProps<{
	data: RouteRecord;
}>();
</script>
<template>
	<v-list-group v-if="data.children.length" :value="data.name">
		<template v-slot:activator="{ props }">
			<v-list-item
				v-bind="props"
				rounded="lg"
				class="mb-1"
				prepend-icon="mdi-account-circle"
				:title="(data.name as string)"
			></v-list-item>
		</template>

		<template v-for="child in data.children">
			<TreeItem v-if="child.children.length" :data="child" />
			<v-list-item
				v-else
				:to="child.path"
				rounded="lg"
				class="mb-1 pl-1"
				:value="child.name"
				:title="(child.name as string)"
				:prepend-icon="'mdi-account-circle'"
			></v-list-item>
		</template>
	</v-list-group>
</template>
