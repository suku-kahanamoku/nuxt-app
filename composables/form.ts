import { ITERATE } from "@/core/utils/modify-object.function";

export async function useSubmit(url, vForm, loading, method = 'POST') {
    loading.value = true;
    let result;
    try {
        const validation = await vForm.value.validate();
        if (validation.valid) {
            const payload = {};
            ITERATE(vForm.value.elements, (input, key) => {
                if (isNaN(key as unknown as number)) {
                    payload[key] = input.value;
                }
            });
            const options: any = { method: method };
            if (method.toUpperCase() === 'GET') {
                options.params = payload;
            } else {
                options.body = payload;
            }
            result = await $fetch(url, options);
        }
    } catch (error) {
        result = error;
    }
    loading.value = false;
    return result;
}