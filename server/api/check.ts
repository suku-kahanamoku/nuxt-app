import { CURRENT_USER } from '../lib/firestore';

export default defineEventHandler(async (event) => {
	try {
		return {
			result: CURRENT_USER(),
		};
	} catch (error) {
		return error;
	}
});
