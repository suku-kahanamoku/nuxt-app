<script setup lang="ts">
import { Ref } from 'vue';

import configs from '@/assets/data/form.json';
import { ITERATE } from '@/core/utils/modify-object.function';
import { IS_DEFINED } from './core/utils/check.functions';

/* const isLogged = useState('isLogged');

watch(isLogged, (event) => initRoutes());

initRoutes(); */

function initRoutes() {
	const routesState = useState('routes');
	const routes = getRoutes(
		useRouter()
			.getRoutes()
			.map((route) => ({
				meta: route.meta,
				name: route.name.toString(),
				path: route.path,
				children: [],
			}))
	);
	if (IS_DEFINED(routesState)) {
		routesState.value = routes;
	} else {
		useState('routes', routes);
	}
	/* console.log(routesState); */
}

function getRoutes(routes) {
	return routes
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
			route.meta.parentId = routes.find((parent) => parent.children.indexOf(route) >= 0)?.name;
			route.meta.title = route.meta.title || route.name;
			return route;
		})
		.filter((route) => !route.meta.parentId);
}

ITERATE(configs, (config: any, name: string) => useState(`config_${name}`, () => config));

/* $fetch('/profile', { method: 'POST', body: { aaaa: 'aaa', bbb: 'bbb' } }); */
</script>
<template>
	<div>
		<NuxtLayout>
			<NuxtPage />
		</NuxtLayout>
	</div>
</template>
