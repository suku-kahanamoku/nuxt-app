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
				:title="$t(data.meta?.title as string || 'empty')"
				:prepend-icon="(data.meta?.icon as any)?.pos !== 'after' && (data.meta?.icon as any)?.value"
				:after-icon="(data.meta?.icon as any)?.pos === 'after' && (data.meta?.icon as any)?.value"
			></v-list-item>
		</template>

		<template v-for="child in data.children">
			<TreeItem v-if="child.children.length" :data="child" />
			<v-list-item
				v-else
				:to="child.path"
				rounded="lg"
				class="mb-1 pl-1"
				:title="$t(child.meta?.title as string || 'empty')"
				:prepend-icon="(child.meta?.icon as any)?.pos !== 'after' && (child.meta?.icon as any)?.value"
				:after-icon="(child.meta?.icon as any)?.pos === 'after' && (child.meta?.icon as any)?.value"
			></v-list-item>
		</template>
	</v-list-group>
</template>
