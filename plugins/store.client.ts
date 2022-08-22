function initRoutes(isLogged: boolean) {
    setStore('routes', getRoutes(
        useRouter()
            .getRoutes()
            .map((route) => ({
                meta: route.meta,
                name: route.name.toString(),
                path: route.path,
                children: [],
            }))
            .filter(route => isLogged || route.path.indexOf('/pz') < 0)
    ));
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

export default function () {
    setStore('isClient', true);
    watch(useState('isLogged'), (event: boolean) => initRoutes(event))
}