<script setup lang="ts">
import { ref } from 'vue';

import { IFormFieldSelect } from '@/core/form/field/field.interface';
import { IS_DEFINED } from '@/core/utils/check.functions';

const props = defineProps<{
	config: IFormFieldSelect;
}>();

const el = ref();
const value = ref();
const rule = ref();

onMounted(() => {
	// inicializuje regex
	if (props.config?.validation?.pattern) {
		rule.value = new RegExp(props.config.validation.pattern);
	}
	// nastavi defaultni hodnotu
	if (IS_DEFINED(props.config.value)) {
		value.value = props.config.value;
	}
});
</script>

<template>
	<v-autocomplete
		ref="el"
		v-model="value"
		:id="config.name"
		:name="config.name"
		:label="$t(config.label || 'empty') + ' *'"
		:disabled="config.disabled"
		:readonly="config.readonly"
		:density="((config.density || 'comfortable') as any)"
		:variant="((config.variant || 'outlined') as any)"
		:prepend-icon="
			config.icon?.variant !== 'inner' && config.icon?.position !== 'append' ? config.icon?.value : undefined
		"
		:append-icon="
			config.icon?.variant !== 'inner' && config.icon?.position === 'append' ? config.icon.value : undefined
		"
		:prepend-inner-icon="
			config.icon?.variant === 'inner' && config.icon?.position !== 'append' ? config.icon?.value : undefined
		"
		:append-inner-icon="
			config.icon?.variant === 'inner' && config.icon?.position === 'append' ? config.icon.value : undefined
		"
		:rules="[(value) => (!value && config.required ? '' : true)]"
		:chips="config.chips === false ? false : true"
		:multiple="config.multiple"
		:items="config.options"
		:item-title="(item) => $t(item.label || 'empty')"
		:item-value="config.restOptions?.value || 'value'"
	/>
</template>
