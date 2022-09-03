<script setup lang="ts">
import { RouteRecord } from 'vue-router';

const props = defineProps<{
	data: any;
}>();
</script>
<template>
	<v-list-group v-if="data.children.length" :value="data.name">
		<template v-slot:activator="{ props }">
			<v-list-item v-bind="props" rounded="lg" class="mb-1" :title="$t(data.title || 'empty')"
				:prepend-icon="data.icon?.pos !== 'after' && data.icon?.value"
				:after-icon="data.icon?.pos === 'after' && data.icon?.value"></v-list-item>
		</template>

		<template v-for="child in data.children">
			<TreeItem v-if="child.children.length" :data="child" />
			<v-list-item v-else :to="child.path" rounded="lg" class="mb-1 pl-1" :title="$t(child.title || 'empty')"
				:prepend-icon="child.icon?.pos !== 'after' && child.icon?.value"
				:after-icon="child.icon?.pos === 'after' && child.icon?.value"></v-list-item>
		</template>
	</v-list-group>
</template>
