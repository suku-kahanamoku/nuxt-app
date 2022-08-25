<script setup lang="ts">
import Field from '@/core/form/field/Field.vue';

definePageMeta({
	title: 'route.profile',
	icon: {
		value: 'mdi-account',
	},
});

const config: any = useState('config_profile');
const form = ref();
const loading = ref(false);
const data = ref(await $fetch('/api/profile'));
const model = ref([0]);

async function onSubmit(e) {
	useSubmit('/api/profile', form, loading, 'GET');
}

async function del(event) {
	await $fetch(`/api/profile?where={"id":"${event.id}"}`, { method: 'DELETE' });
}
</script>
<template>
	<div>
		<v-expansion-panels v-model="model">
			<v-expansion-panel>
				<v-expansion-panel-title>
					{{ $t(config.title) }}
				</v-expansion-panel-title>
				<v-expansion-panel-text>
					<v-form ref="form" @submit.prevent="onSubmit">
						<v-row>
							<v-col v-for="field in config.fields" cols="12" sm="6">
								<Field :config="field" :value="field.value" />
							</v-col>
						</v-row>
						<v-spacer></v-spacer>
						<v-btn color="primary" type="submit" :loading="loading">Send</v-btn>
					</v-form>
				</v-expansion-panel-text>
			</v-expansion-panel>
		</v-expansion-panels>

		<v-row v-if="data.length" class="mt-5">
			<v-col v-for="user in data" cols="12" sm="6" md="4" lg="3">
				<ProfileCard :data="user" @delete="del" />
			</v-col>
		</v-row>
	</div>
</template>
