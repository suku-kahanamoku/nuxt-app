<script setup lang="ts">
import Field from '@/core/form/field/Field.vue';

const props = defineProps<{
	config: any;
}>();

const form = ref();
const loading = ref(false);
const data = ref();

onMounted(async () => {
	load(props.config.restUrl);
});

async function onSubmit(e) {
	const method = data.value ? (data.value.id ? 'PATCH' : 'POST') : 'GET';
	useSubmit(props.config.submitUrl, form, loading, method);
}

async function load(restUrl: string) {
	if (restUrl) {
		data.value = (await $fetch(restUrl))[0];
		props.config.fields.forEach((field) => (field.value = data.value[field.name]));
	}
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
					<v-col v-for="field in config.fields" cols="12" sm="6">
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

	<v-row>
		<v-col v-for="user in data" cols="12" sm="6" md="4" lg="3">
			<ProfileCard :data="user" />
		</v-col>
	</v-row>
</template>
