import useToast from './useToast';

export default async function (url: string, options?: any): Promise<any> {
	if (url) {
		return $fetch(url, options)
			.then((data: any) => {
				if (data?.msgs?.length) {
					useToast(data?.msgs);
				}
				return options?.all ? data : data.result;
			})
			.catch((error) => {
				if (error?.data?.msgs?.length) {
					useToast(error?.data?.msgs);
				} else {
					useToast({ type: 'error', message: error?.data?.message || error.message });
				}
				throw new Error(error);
			});
	}
}
