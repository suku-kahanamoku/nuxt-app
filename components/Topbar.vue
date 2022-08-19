<script setup lang="ts">
import { Ref } from 'vue';

const emit = defineEmits(['open']);
</script>

<template>
	<v-app-bar hide-on-scroll>
		<v-toolbar title="Application" color="grey-lighten-3">
			<v-btn stacked>
				<v-badge color="error" dot>
					<v-icon icon="mdi-newspaper-variant-outline"></v-icon>
				</v-badge>

				News
			</v-btn>

			<v-btn stacked>
				<v-badge dot color="error">
					<v-icon icon="mdi-post"></v-icon>
				</v-badge>

				Blog
			</v-btn>

			<v-btn stacked variant="tonal">
				<NuxtLink to="/pz" class="n-link-base">
					<v-icon icon="mdi-login"></v-icon>
					Login
				</NuxtLink>
			</v-btn>
		</v-toolbar>
		<slot />
	</v-app-bar>
</template>

<style scoped></style>
