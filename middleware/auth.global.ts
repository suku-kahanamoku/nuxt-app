export default async function (to, from) {
	if (useState('isClient')?.value) {
		const pages: any = useState('pages').value;
		setStore('pageConfig', pages[to.meta.syscode]);
		// zkontroluje, zda je uzivatel prihlaseny
		return await $fetch('/api/check')
			// je prihlaseny
			.then((data) => {
				setStore('isLogged', data.result);
				setStore('redirect', null);
				return true;
			})
			// neni prihlaseny
			.catch((error): any => {
				setStore('isLogged', null);
				// pokud je cilove url zabezpecena stranka, nastavi se redirect page a presmeruje na login
				if (to.path.indexOf('/pz') >= 0) {
					setStore('redirect', to.path);
					return navigateTo(pages?.login?.path);
				}
				return true;
			});
	}
	return true;
}
