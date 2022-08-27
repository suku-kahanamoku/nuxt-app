<script setup lang="ts">
import Field from '@/core/form/field/Field.vue';

definePageMeta({
	title: 'route.reset_pass',
	icon: {
		value: 'mdi-key',
	},
	visible: false,
});

const config: any = useState('config_reset_pass');
const form = ref();
const loading = ref(false);

async function onSubmit(e) {
	await useSubmit('/api/signreset', form, config.value.fields, loading);
}
</script>
<template>
	<v-form ref="form" @submit.prevent="onSubmit">
		<v-card>
			<v-toolbar dark color="primary">
				<v-toolbar-title>{{ $t(config.title) }}</v-toolbar-title>
			</v-toolbar>
			<v-card-text>
				<v-row>
					<v-col v-for="field in config.fields" cols="12">
						<Field :config="field" :value="field.value" />
					</v-col>
				</v-row>
			</v-card-text>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn color="primary" type="submit" :loading="loading">Send</v-btn>
			</v-card-actions>
		</v-card>
	</v-form>
</template>
