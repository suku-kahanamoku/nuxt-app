import { ITERATE } from '@/core/utils/modify-object.function';
import { IS_DEFINED, IS_NUMERIC } from '@/core/utils/check.functions';
import { TRIM } from '@/core/utils/modify-string.functions';

/**
 * Vrati hodnotu ve spravnem typu
 *
 * @param {*} value
 * @param {*} [config]
 * @returns {*}  {*}
 */
function getType(value, config?): any {
	try {
		switch (config?.db_type) {
			case 'boolean':
				return !!JSON.parse(value);

			case 'number':
			case 'decimal':
				return JSON.parse(value);

			default:
				if (IS_NUMERIC(value)) {
					return JSON.parse(value);
				} else {
					return value;
				}
		}
	} catch (error) {
		return value;
	}
}

/**
 * Vrati fields pro url
 *
 * @param {*} vForm
 * @param {*} fields
 * @returns {*}  {string}
 */
function getValues(vForm, fields): string {
	let result = '{';
	ITERATE(vForm?.value?.elements, (input, key) => {
		// projede jen pojmenovane fieldy, ne ocislovane
		if (!IS_NUMERIC(key) && IS_DEFINED(input.value) && input.value.toString().length) {
			const field = fields.find((field) => field.name === key);
			let value = getType(input.value, field);
			value = typeof value === 'string' ? `"${value}"` : value;
			result += `"${key}":{"value":${value}},`;
		}
	});
	result = TRIM(result, ',');
	result += '}';
	return result;
}

/**
 * Vrati fields pro patch a post
 *
 * @param {*} vForm
 * @param {*} fields
 * @returns {*}  {*}
 */
function patchValues(vForm, fields): any {
	const result = {};
	ITERATE(vForm?.value?.elements, (input, key) => {
		// projede jen pojmenovane fieldy, ne ocislovane
		if (!IS_NUMERIC(key) && typeof input.value !== undefined) {
			const field = fields.find((field) => field.name === key);
			const value = getType(input.value, field);
			if (!field?.ignore && field?.value !== value) {
				result[key] = value;
			}
		}
	});
	return result;
}

/**
 * Odesle formular a vrati data
 *
 * @export
 * @param {string} url
 * @param {*} [vForm]
 * @param {*} [fields]
 * @param {*} [loading]
 * @param {string} [method='POST']
 * @returns {*}
 */
export async function useSubmit(url: string, vForm?, fields?, loading?, method = 'POST') {
	if (loading) {
		loading.value = true;
	}
	let result;
	try {
		const validation = vForm?.value?.validate ? await vForm?.value?.validate() : null;
		const options: any = { method: method };
		if (validation?.valid) {
			method = method.toUpperCase();
			if (method === 'GET') {
				result = getValues(vForm, fields);
			} else {
				options.body = patchValues(vForm, fields);
				result = await useApi(url, options).catch((error) => console.error(error));
			}
		}
		//
		else if (method === 'DELETE') {
			options.body = vForm;
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
