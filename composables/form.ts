import { ITERATE } from '@/core/utils/modify-object.function';
import { IS_DEFINED } from '@/core/utils/check.functions';
import { TRIM } from '@/core/utils/modify-string.functions';

export async function useSubmit(url: string, vForm, fields, loading?, method = 'POST') {
	if (loading) {
		loading.value = true;
	}
	let result;
	try {
		const validation = await vForm.value.validate();
		if (validation.valid) {
			method = method.toUpperCase();
			const payload = {};
			const fieldList = {};
			fields.forEach((field) => (fieldList[field.name] = field));
			// nastavi params z input.value
			ITERATE(vForm.value.elements, (input, key) => {
				// projede jen pojmenovane fieldy, ne ocislovane
				if (isNaN(key as unknown as number) && typeof input.value !== undefined) {
					const field = fieldList[key];
					// pokud je to GET, odesila se bez omezeni vse
					if (method === 'GET') {
						payload[key] = input.value;
					}
					// jinak nesmi byt ignore a nesmi se rovnat defaultni hodnote
					else if (!field?.ignore && field?.value !== input.value) {
						payload[key] = input.value;
					}
				}
			});
			const options: any = { method: method };
			if (method === 'GET') {
				result = '{';
				ITERATE(payload, (value, key) => {
					if (IS_DEFINED(value) && value.toString().length) {
						result += `"${key}":{"value":"${value}"},`;
					}
				});
				result = TRIM(result, ',');
				result += '}';
			} else {
				options.body = payload;
				result = await useApi(url, options).catch((error) => console.error(error));
			}
		}
	} catch (error) {
		console.error(error);
	}
	if (loading) {
		loading.value = false;
	}
	return result;
}
