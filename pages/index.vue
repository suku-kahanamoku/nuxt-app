<script setup lang="ts">
definePageMeta({
	title: 'My home page',
	icon: 'mdi-home'
});
</script>
<template>
	<v-container fluid>
		<v-col>
			<section>
				<div>
					<!-- <Logo :width="350"/> -->
					<h1 class="title">NUXT<span class="green">JS</span></h1>
					<h2 class="subtitle">Starter for CodeSandBox</h2>
					<div class="links">
						<a href="https://nuxtjs.org/" target="_blank" class="button--green">Documentation</a>
					</div>
				</div>
			</section>
		</v-col>
	</v-container>
</template>

<style scoped></style>
