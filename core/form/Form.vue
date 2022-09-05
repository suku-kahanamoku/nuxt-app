<script setup lang="ts">
	import Field from '@/core/form/field/Field.vue';

	const props = defineProps<{
		config: any;
		data?: any;
	}>();

	const emits = defineEmits(['submit']);

	const form = ref();
	const loading = ref(false);
	const panels = ref([0]);

	// kdyz se nastavi data, nastavi se automaticky do fields
	watch(
		() => props.data,
		(data) => props.config.fields.forEach((field) => (field.value = data[field.name]))
	);

	function onSubmit(e) {
		emits('submit', props.config.submitUrl, form, props.config.fields, loading, props.config.method);
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
							{{ $t('btn.send') }}
						</v-btn>
					</v-row>
				</v-expansion-panel-text>
			</v-expansion-panel>
		</v-expansion-panels>

		<v-card v-else-if="config.theme === 'card'">
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
				<v-btn color="primary" type="submit" :loading="loading" :disabled="!config.submitUrl">
					{{ $t('btn.send') }}
				</v-btn>
			</v-card-actions>
		</v-card>

		<v-row v-else>
			<v-col v-for="field in config.fields" cols="12" sm="6">
				<Field :config="field" :value="field.value" />
			</v-col>
		</v-row>
	</v-form>
</template>
