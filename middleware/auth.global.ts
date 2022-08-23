export default async function (to, from) {
    if (useState('isClient')?.value) {
        // zkontroluje, zda je uzivatel prihlaseny
        return await $fetch('/api/check')
            // je prihlaseny
            .then((data) => {
                setStore('profile', data);
                setStore('redirect', null);
                return true;
            })
            // neni prihlaseny
            .catch((error): any => {
                setStore('profile', null);
                // pokud je cilove url zabezpecena stranka, nastavi se redirect page a presmeruje na login
                if (to.path.indexOf('/pz') >= 0) {
                    setStore('redirect', to.path);
                    return navigateTo('/login');
                }
                return true;
            });
    }
    return true;
}