import { VERIFY } from '../lib/firestore';

export default defineEventHandler(async (event) => {
	try {
		const result = await VERIFY(event);
		if (result) {
			return {
				result: result,
			};
		} else {
			throw new Error('message.unauthorized');
		}
	} catch (error) {
		return error;
	}
});
