import { AUTH_USE_PROJECTION, GET_DOCS, AUTH_USE_ROUTE } from '@/server/lib/firestore';

export default defineEventHandler(async (event) => {
	try {
		if (!AUTH_USE_ROUTE(event)) {
			throw new Error('message.permission_error');
		}
		const query = useQuery(event.req);
		const where = query.where ? JSON.parse(query.where as any) : null;
		const result = await GET_DOCS('component', where);
		return {
			result: AUTH_USE_PROJECTION(event, result),
		};
	} catch (error) {
		return error;
	}
});
