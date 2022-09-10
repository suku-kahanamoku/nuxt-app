import { LOGIN, SET_TOKEN } from '@/server/lib/firestore';

export default defineEventHandler(async (event) => {
	try {
		const body = await useBody(event);
		const result = await LOGIN(body.email, body.password);
		SET_TOKEN(event, result.idToken);
		return {
			result: result,
			msgs: [{ type: 'success', message: 'message.success_login' }],
		};
	} catch (error) {
		return error;
	}
});
