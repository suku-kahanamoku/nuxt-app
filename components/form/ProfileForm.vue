<script setup lang="ts">
import Field from '@/core/form/field/Field.vue';

const props = defineProps<{
	config: any;
	data?: any;
}>();

const emit = defineEmits(['submit']);

const form = ref();
const loading = ref(false);
const panels = ref([0]);

// kdyz se nastavi data, nastavi se automaticky do fields
watch(
	() => props.data,
	(data) => props.config.fields.forEach((field) => (field.value = data[field.name]))
);

async function onSubmit(e) {
	emit('submit', await useSubmit(props.config.submitUrl, form, loading, props.config.method));
}
</script>
<template>
	<v-form ref="form" @submit.prevent="onSubmit">
		<v-expansion-panels v-if="config.theme === 'accordion'" v-model="panels">
			<v-expansion-panel>
				<v-expansion-panel-title>
					{{ $t(config.title) }}
				</v-expansion-panel-title>
				<v-expansion-panel-text class="py-5">
					<v-row>
						<v-col v-for="field in config.fields" cols="12" sm="6">
							<Field :config="field" :value="field.value" />
						</v-col>
					</v-row>
					<v-row>
						<v-spacer></v-spacer>
						<v-btn color="primary" type="submit" :loading="loading" :disabled="!config.submitUrl">
							Send
						</v-btn>
					</v-row>
				</v-expansion-panel-text>
			</v-expansion-panel>
		</v-expansion-panels>

		<v-card v-else>
			<v-toolbar dark color="primary">
				<v-toolbar-title>{{ $t(config.title) }}</v-toolbar-title>
			</v-toolbar>
			<v-card-text>
				<v-row>
					<v-col v-for="field in config.fields" cols="12" sm="6">
						<Field :config="field" :value="field.value" />
					</v-col>
				</v-row>
			</v-card-text>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn color="primary" type="submit" :loading="loading" :disabled="!config.submitUrl"> Send </v-btn>
			</v-card-actions>
		</v-card>
	</v-form>
</template>
