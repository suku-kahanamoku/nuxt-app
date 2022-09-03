function getRoutes(routes) {
	return routes
		.map((route) => {
			route.children = routes
				.filter(
					(child) =>
						route.visible !== false &&
						child.visible !== false &&
						route !== child &&
						child.name.indexOf(route.name) >= 0 &&
						route.path.split('/').length + 1 === child.path.split('/').length
				)
				.sort((a, b) => (a.pos || 0) - (b.pos || 0));
			return route;
		})
		.map((route: any) => {
			route.parentId = routes.find((parent) => parent.children.indexOf(route) >= 0)?.name;
			return route;
		})
		.filter((route) => route.visible !== false && !route.parentId)
		.sort((a, b) => (a.pos || 0) - (b.pos || 0));
}

export default defineNuxtPlugin(async (nuxtApp) => {
	const configs = await useApi('/api/page');
	// prekonvertuje routy do potrebne podoby
	const routes = useRouter()
		.getRoutes()
		.map((route) => ({
			...{
				name: route.name as string,
				path: route.path as string,
				children: [],
			},
			...configs.find((config) => config.syscode === route.meta.syscode),
		}));

	// vytvori seznam route, aby se dalo s nema lepe pracovat
	const pages: any = {};
	routes.forEach((route) => {
		pages[route.syscode || route.name] = route;
	});
	setStore('pages', pages);

	// po prihlaseni nebo odhlaseni se aktualizuji routy
	watch(useState('profile'), (event: boolean) =>
		setStore('routes', getRoutes(routes.filter((route) => event || route.path.indexOf('/pz') < 0)))
	);
});
