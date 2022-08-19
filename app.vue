<script setup lang="ts">
import { Ref } from 'vue';

//nastavi potomky, aby se s objektama dalo lepe pracovat
const routes = useRouter().getRoutes();
routes
	.map((route) => {
		route.children = routes.filter(
			(child) =>
				route !== child &&
				child.name.toString().indexOf(route.name.toString()) >= 0 &&
				route.path.split('/').length + 1 === child.path.split('/').length
		);
		return route;
	})
	.forEach((route: any) => {
		route.props.parentId = routes.find((parent) => parent.children.indexOf(route) >= 0)?.name.toString();
		route.meta.title = route.meta.title || route.name;
	});
</script>
<template>
	<NuxtLayout>
		<NuxtPage />
	</NuxtLayout>
</template>
