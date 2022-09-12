export async function loadConfigs(syscodes: string[], configs, loading): Promise<any> {
	if (syscodes?.length) {
		loading.value = false;
		let result;
		try {
			result = await useApi(
				`/api/component?where={"syscode":{"value":["${syscodes?.join('","')}"],"operator":{"value":"in"}}}`
			);
		} catch (error) {
			console.error;
		}
		result?.forEach((tmpConfig) => {
			tmpConfig.redirUrl = useState('redirect')?.value || '/pz';
			configs[tmpConfig.syscode] = tmpConfig;
		});
		loading.value = true;
	}
}
