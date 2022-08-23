<script setup lang="ts">
import { Ref } from 'vue';

import configs from '@/assets/data/form.json';
import { ITERATE } from '@/core/utils/modify-object.function';

ITERATE(configs, (config: any, name: string) => useState(`config_${name}`, () => config));

/* $fetch('/profile', { method: 'POST', body: { aaaa: 'aaa', bbb: 'bbb' } }); */
</script>
<template>
	<div>
		<NuxtLayout>
			<NuxtPage />
		</NuxtLayout>
	</div>
</template>
