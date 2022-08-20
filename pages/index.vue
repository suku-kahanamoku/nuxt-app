<script setup lang="ts">
import Field from '@/core/form/field/Field.vue';

const config: any = useState('config_auth');
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
						<v-select :label="'fsda *'" />
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
