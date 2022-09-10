import { CHECK_AUTH, GET_DOCS } from '@/server/lib/firestore';
import { REMOVE_LAST_STRING } from '~~/core/utils/modify-string.functions';

export default defineEventHandler(async (event) => {
	try {
		const query = useQuery(event.req);
		const where = query.where ? JSON.parse(query.where as any) : null;
		const result = await GET_DOCS('component', where);
		return {
			result: CHECK_AUTH(event, REMOVE_LAST_STRING(event.req.url, '?', true), event.req.method, result),
		};
	} catch (error) {
		return error;
	}
});
