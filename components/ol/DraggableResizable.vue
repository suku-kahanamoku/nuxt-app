<script setup lang="ts">
import { ref } from 'vue';
import VueDraggableResizable from 'vue-draggable-resizable/src/components/vue-draggable-resizable.vue';

import type { IDraggableResizable } from './ol.interface';

const props = defineProps<{
	config?: IDraggableResizable | any;
}>();

const emits = defineEmits(['change', 'drag', 'resize', 'close']);

const el = ref();

function onChange(e: any): void {
	emits('change', e.value.$data);
}

function onDrag(x: number, y: number): void {
	emits('drag', x, y);
	onChange(el);
}

function onResize(x: number, y: number): void {
	emits('resize', x, y);
	onChange(el);
}
</script>

<template>
	<VueDraggableResizable
		ref="el"
		:z="config?.z || 1"
		:x="config?.x"
		:y="config?.y"
		:w="config?.w"
		:h="config?.h || 'auto'"
		:minWidth="config?.minWidth"
		:minHeight="config?.minHeight"
		:maxWidth="config?.maxWidth"
		:maxHeight="config?.maxHeight"
		:parent="true"
		:draggable="config?.draggable"
		:resizable="config?.resizable"
		:handles="['tl', 'tr', 'br', 'bl']"
		@dragstop="onDrag"
		@resizestop="onResize"
	>
		<slot>
			<v-card width="400">
				<template v-slot:title>
					<slot name="header">...</slot>
					<v-btn @click="emits('close')">X</v-btn>
				</template>
				<template v-slot:text>
					<slot name="body">...</slot>
				</template>
			</v-card>
		</slot>
	</VueDraggableResizable>
</template>

<style scoped>
.draggable.active {
	z-index: 9999 !important;
}

.draggable {
	cursor: grab;
	border: none;
	transition: box-shadow 0.3s ease;
}

.draggable:active {
	cursor: grabbing;
	box-shadow: 0 10px 10px 10px rgb(0 0 0 / 7%);
}
</style>

<style>
.handle {
	z-index: 10;
	border: none;
	background-color: transparent;
}

.handle-tl {
	top: 0;
	left: 0;
	border-top: 2px solid;
	border-left: 2px solid;
}

.handle-tm {
	top: 0;
	border-top: 2px solid;
}

.handle-tr {
	top: 0;
	right: 0;
	border-top: 2px solid;
	border-right: 2px solid;
}

.handle-bl {
	bottom: 0;
	left: 0;
	border-bottom: 2px solid;
	border-left: 2px solid;
}

.handle-bm {
	bottom: 0;
	border-bottom: 2px solid;
}

.handle-br {
	bottom: 0;
	right: 0;
	border-bottom: 2px solid;
	border-right: 2px solid;
}

.handle-ml {
	left: 0;
	border-left: 2px solid;
}

.handle-mr {
	right: 0;
	border-right: 2px solid;
}
</style>
