<script setup lang="ts">
import Field from '@/core/form/field/Field.vue';

definePageMeta({
	icon: 'mdi-login',
});

const config: any = useState('config_login');
const form = ref();
const loading = ref(false);

async function onSubmit(e) {
	const loggedUser = await useSubmit('/api/signin', form, loading);
	if (loggedUser[0]?.uid) {
		setStore('isLogged', true);
		navigateTo(useState('redirect')?.value || '/');
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
					<v-col v-for="field in config.fields" cols="12">
						<Field :config="field" />
					</v-col>
				</v-row>
			</v-card-text>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn color="primary" type="submit" :loading="loading">Login</v-btn>
			</v-card-actions>
		</v-card>
	</v-form>
</template>
