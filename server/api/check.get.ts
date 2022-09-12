import { VERIFY } from '../lib/firestore';

export default defineEventHandler(async (event) => {
	try {
		const result = await VERIFY(event);
		if (result) {
			return {
				result: result,
			};
		} else {
			event.res.statusCode = 401;
			return { type: 'error', message: 'message.unauthorized' };
		}
	} catch (error) {
		const data =
			error.statusCode === 500
				? {
						statusCode: 401,
						statusMessage: 'message.unauthorized',
						message: 'message.unauthorized',
						error: error,
				  }
				: error;
		event.res.statusCode = data.statusCode;
		return data;
	}
});
