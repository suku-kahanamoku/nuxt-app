<script setup lang="ts">
import { ref } from 'vue';

import {
	IFormField,
	IFormFieldNumber,
	IFormFieldTextarea,
	IFormFieldSelect,
	IFormFieldRadio,
	IFormFieldDatetime,
} from '@/core/form/field/field.interface';
import TextField from '@/core/form/field/TextField.vue';
import TextareaField from '@/core/form/field/TextareaField.vue';
import SelectField from '@/core/form/field/SelectField.vue';
import SearchField from '@/core/form/field/SearchField.vue';
import CheckboxField from '@/core/form/field/Checkbox.vue';
import RadioField from '@/core/form/field/RadioField.vue';

const props = defineProps<{
	config:
		| IFormField
		| IFormFieldNumber
		| IFormFieldTextarea
		| IFormFieldSelect
		| IFormFieldRadio
		| IFormFieldDatetime;
}>();
</script>

<template>
	<!-- todo - je to urcene jen pro frontend, pac select field dela neplechu pri navigaci -->
	<client-only>
		<TextareaField v-if="config.type === 'textarea'" :config="(config as IFormFieldTextarea)" />
		<SelectField v-else-if="config.type === 'select'" :config="(config as IFormFieldSelect)" />
		<SearchField v-else-if="config.type === 'search'" :config="(config as IFormFieldSelect)" />
		<CheckboxField v-else-if="config.type === 'checkbox'" :config="(config as IFormFieldRadio)" />
		<RadioField v-else-if="config.type === 'radio'" :config="(config as IFormFieldRadio)" />
		<template v-else-if="config.type === 'group'">
			<Field v-for="childConfig in (config as any).options" :config="childConfig" />
		</template>
		<TextField v-else :config="config" />
	</client-only>
</template>
