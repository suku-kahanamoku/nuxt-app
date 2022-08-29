import { ITERATE } from '@/core/utils/modify-object.function';

function getRoutes(routes) {
    return routes
        .map((route) => {
            route.children = routes
                .filter((child) =>
                    route.meta.visible !== false &&
                    child.meta.visible !== false &&
                    route !== child &&
                    child.name.indexOf(route.name) >= 0 &&
                    route.path.split('/').length + 1 === child.path.split('/').length)
                .sort((a, b) => (a.meta.pos || 0) - (b.meta.pos || 0));
            return route;
        })
        .map((route: any) => {
            route.meta.parentId = routes.find((parent) => parent.children.indexOf(route) >= 0)?.name;
            return route;
        })
        .filter((route) => route.meta.visible !== false && !route.meta.parentId)
        .sort((a, b) => (a.meta.pos || 0) - (b.meta.pos || 0));
}

export default defineNuxtPlugin(nuxtApp => {
    // prekonvertuje routy do potrebne podoby
    const routes = useRouter().getRoutes().map((route) => ({
        meta: route.meta,
        name: route.name,
        path: route.path,
        children: [],
    }));

    // vytvori seznam route, aby se dalo s nema lepe pracovat
    const pages: any = {};
    routes.forEach(route => pages[route.name] = route);
    setStore('pages', pages);

    // po prihlaseni nebo odhlaseni se aktualizuji routy
    watch(
        useState('profile'),
        (event: boolean) => setStore('routes', getRoutes(
            routes.filter(route => event || route.path.indexOf('/pz') < 0)
        ))
    );
})