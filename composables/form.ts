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
            result = await $fetch(url, { method: method, body: payload });
        }
    } catch (error) {
        result = error;
    }
    loading.value = false;
    return result;
}