<script setup lang="ts">
	import { CLONE, ITERATE } from '../utils/modify-object.function';

	const props = defineProps<{
		config: any;
		data?: any;
	}>();

	const emits = defineEmits(['submit']);

	const result = ref('');
	const loading = ref(false);

	const onError = (e) => {
		console.log(e);
	};

	const onFocus = (e) => {
		console.log(e);
	};

	const onBlur = (e) => {
		console.log(e);
	};

	const onSubmit = () => {
		try {
			const tmpData = CLONE(result.value ? JSON.parse(result.value) : props.data || {});
			// simulace form struktury
			ITERATE(tmpData, (value, key) => (tmpData[key] = { value: value }));
			const form = {
				value: {
					elements: tmpData,
					// je to valid, pac to nespadlo pri JSON.parse
					validate: () => ({ valid: true }),
				},
			};
			emits('submit', props.config.submitUrl, form, props.config.fields, loading, props.config.method);
		} catch (error) {
			useToast({ type: 'error', message: 'form.msg.wrong_json' });
		}
	};
</script>

<template>
	<vue-jsoneditor
		:mainMenuBar="false"
		:mode="config?.mode || 'text'"
		v-model:json="data"
		@change="result = $event.text"
		@error="onError"
		@focus="onFocus"
		@blur="onBlur"
	/>
	<v-row class="pa-5">
		<v-spacer></v-spacer>
		<v-btn color="primary" :loading="loading" :disabled="!config.submitUrl" @click="onSubmit">
			{{ $t('btn.send') }}
		</v-btn>
	</v-row>
</template>
