import { VERIFY } from '../lib/firestore';

export default defineEventHandler(async (event) => {
	try {
		return {
			result: VERIFY(event),
		};
	} catch (error) {
		return error;
	}
});
