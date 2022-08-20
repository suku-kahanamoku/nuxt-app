<script setup lang="ts">
import { Ref } from 'vue';

import configs from '@/assets/data/form.json';
import { ITERATE } from '@/core/utils/modify-object.function';

//nastavi potomky, aby se s objektama dalo lepe pracovat
const routes = useRouter()
	.getRoutes()
	.map((route) => ({
		meta: route.meta,
		name: route.name.toString(),
		path: route.path,
		props: route.props,
		children: [],
	}));

useState('routes', () =>
	routes
		.map((route) => {
			route.children = routes.filter(
				(child) =>
					route !== child &&
					child.name.indexOf(route.name) >= 0 &&
					route.path.split('/').length + 1 === child.path.split('/').length
			);
			return route;
		})
		.map((route: any) => {
			route.props.parentId = routes.find((parent) => parent.children.indexOf(route) >= 0)?.name;
			route.meta.title = route.meta.title || route.name;
			return route;
		})
		.filter((route) => !route.props.parentId)
);

ITERATE(configs, (config: any, name: string) => useState(`config_${name}`, () => config));
</script>
<template>
	<div>
		<NuxtLayout>
			<NuxtPage />
		</NuxtLayout>
	</div>
</template>
