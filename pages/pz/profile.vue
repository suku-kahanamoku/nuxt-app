<script setup lang="ts">
import Field from '@/core/form/field/Field.vue';

definePageMeta({
	icon: 'mdi-account-circle',
});

const config: any = useState('config_profile');
const form = ref();
const loading = ref(false);

async function onSubmit(e) {
	useSubmit('/api/profile', form, loading);
}
</script>
<template>
	<div>
		<v-form ref="form" @submit.prevent="onSubmit">
			<v-card>
				<v-toolbar dark color="primary">
					<v-toolbar-title>{{ $t(config.title) }}</v-toolbar-title>
				</v-toolbar>
				<v-card-text>
					<v-row>
						<v-col v-for="field in config.fields" cols="12" sm="6">
							<Field :config="field" />
						</v-col>
					</v-row>
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="primary" type="submit" :loading="loading">Send</v-btn>
				</v-card-actions>
			</v-card>
		</v-form>
	</div>
</template>
