import { LOGIN } from '@/server/lib/firestore';

export default defineEventHandler(async (event) => {
	try {
		const body = await useBody(event);
		return {
			result: await LOGIN(body.email, body.password),
			msgs: [{ type: 'success', message: 'message.success_login' }],
		};
	} catch (error) {
		return error;
	}
});
