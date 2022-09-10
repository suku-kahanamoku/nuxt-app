import { LOGOUT } from '../lib/firestore';

export default defineEventHandler(async (event) => {
	try {
		LOGOUT(event);
		return { status: 'OK', msgs: [{ type: 'success', message: 'message.success_logout' }] };
	} catch (error) {
		return error;
	}
});
