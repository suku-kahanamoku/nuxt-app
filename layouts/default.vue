<script setup lang="ts">
import { Ref } from 'vue';

const open: Ref<boolean> = ref(false);
const routes = useRouter()
	.getRoutes()
	.filter((route) => !route.props.parentId);
</script>

<template>
	<v-app>
		<v-navigation-drawer v-model="open" temporary :width="360">
			<Sidebar :data="routes" />
			<template v-slot:append>
				<div class="pa-2">
					<v-btn block> Logout </v-btn>
				</div>
			</template>
		</v-navigation-drawer>
		<Topbar @open="open = true">
			<v-app-bar-nav-icon @click="open = true"></v-app-bar-nav-icon>
		</Topbar>
		<v-main>
			<slot />
		</v-main>
		<v-footer> footer </v-footer>
	</v-app>
</template>

<style scoped></style>
