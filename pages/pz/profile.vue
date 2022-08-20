<script setup lang="ts">
import Field from '@/core/form/field/Field.vue';

const config: any = useState('config_profile');
</script>
<template>
	<div>
		<v-card>
			<v-toolbar dark color="primary">
				<v-toolbar-title>{{ $t(config.title) }}</v-toolbar-title>
			</v-toolbar>
			<v-card-text>
				<v-form>
					<v-row>
						<v-col v-for="field in config.fields" cols="12" sm="6">
							<Field :config="field" />
						</v-col>
					</v-row>
				</v-form>
			</v-card-text>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn color="primary" to="/">Login</v-btn>
			</v-card-actions>
		</v-card>
	</div>
</template>
