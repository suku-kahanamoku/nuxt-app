import { ITERATE } from '@/core/utils/modify-object.function';
import { IS_DEFINED } from '@/core/utils/check.functions';
import { TRIM } from '@/core/utils/modify-string.functions';

function getValues(vForm) {
	let result = '{';
	ITERATE(vForm?.value?.elements, (input, key) => {
		if (isNaN(key as unknown as number) && IS_DEFINED(input.value) && input.value.toString().length) {
			result += `"${key}":{"value":"${input.value}"},`;
		}
	});
	result = TRIM(result, ',');
	result += '}';
	return result;
}

function patchValues(vForm, fields) {
	const result = {};
	ITERATE(vForm?.value?.elements, (input, key) => {
		// projede jen pojmenovane fieldy, ne ocislovane
		if (isNaN(key as unknown as number) && typeof input.value !== undefined) {
			const field = fields.find((field) => field.name === key);
			if (!field?.ignore && field?.value !== input.value) {
				result[key] = input.value;
			}
		}
	});
	return result;
}

export async function useSubmit(url: string, vForm?, fields?, loading?, method = 'POST') {
	if (loading) {
		loading.value = true;
	}
	let result;
	try {
		const validation = await vForm?.value?.validate();
		const options: any = { method: method };
		if (validation?.valid) {
			method = method.toUpperCase();
			if (method === 'GET') {
				result = getValues(vForm);
			} else {
				options.body = patchValues(vForm, fields);
				result = await useApi(url, options).catch((error) => console.error(error));
			}
		}
		//
		else if (method === 'DELETE') {
			options.body = fields;
			result = await useApi(url, options).catch((error) => console.error(error));
		}
	} catch (error) {
		console.error(error);
	}
	if (loading) {
		loading.value = false;
	}
	return result;
}
