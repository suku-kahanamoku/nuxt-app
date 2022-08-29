<script setup lang="ts">
import { ref, type Ref, watch } from 'vue';
import Fill from 'ol/style/Fill.js';
import Stroke from 'ol/style/Stroke.js';
import Style from 'ol/style/Style.js';

import data from '@/assets/data/form.json';
import DraggableResizable from '@/components/ol/DraggableResizable.vue';
import Field from '@/core/form/field/Field.vue';
import area from '@turf/area';
import { IArea } from './ol.interface';

const props = defineProps<{
	wrapId: string;
	area: IArea;
}>();

const emits = defineEmits(['change']);
const open: Ref<boolean | undefined> = ref(props.area.config?.open);
const hover: Ref<boolean | undefined> = ref();

//todo
const config = data.profile as any;

watch(
	() => props.area.calculate,
	(e) => {
		switch (e?.event) {
			case 'click':
				open.value = !open.value;
				break;

			case 'hover':
				hover.value = e.value;
				break;
		}
	}
);

watch(open, (e: boolean | undefined) => {
	console.log(props.area.feature.getProperties());
	if (e) {
		setStyle(props.area);
	} else {
		setStyle(props.area, props.area.style);
	}
});

watch(hover, (e: boolean | undefined) => {
	if (!open.value) {
		if (e) {
			setStyle(props.area);
		} else {
			setStyle(props.area, props.area.style);
		}
	}
});

/**
 * Udalosti pri zmene => drag, resize
 *
 * @param e
 */
function onChange(e: any): void {
	// do configu uliz open stav
	e.open = open.value;
	emits('change', e);
}

/**
 * Nastavi styly dane area
 *
 * @param {IArea} area
 * @param {Style} [style=new Style({
 * 		fill: new Fill({
 * 			color: 'rgba(255, 255, 255, 0.4)',
 * 		}),
 * 		stroke: new Stroke({
 * 			color: 'white',
 * 		}),
 * 	})]
 */
function setStyle(
	area: IArea,
	style: Style = new Style({
		fill: new Fill({
			color: 'rgba(255, 255, 255, 0.4)',
		}),
		stroke: new Stroke({
			color: 'white',
		}),
	})
): void {
	area.feature?.setStyle(style);
}
</script>

<template>
	<Teleport v-if="open" :to="`#${wrapId}`">
		<DraggableResizable :config="area.config" @change="onChange" @close="open = false">
			<template v-slot:header>
				{{ area.feature?.getProperties()?.name }}
			</template>
			<template v-slot:body>
				<form novalidate>
					<div class="row">
						<div v-for="field in config.fields" class="col-sm-6">
							<Field :config="field" />
						</div>
					</div>
				</form>
			</template>
		</DraggableResizable>
	</Teleport>
</template>

<style></style>
