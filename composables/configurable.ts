export async function loadConfigs(syscodes: string[], configs): Promise<any> {
	if (syscodes?.length) {
		const result = await useApi(
			`/api/component?where={"syscode":{"value":["${syscodes?.join('","')}"],"operator":{"value":"in"}}}`
		);
		result.forEach((tmpConfig) => {
			tmpConfig.redirUrl = useState('redirect')?.value || '/pz';
			configs[tmpConfig.syscode] = tmpConfig;
		});
	}
}
