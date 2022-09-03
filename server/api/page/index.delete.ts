import { DELETE_DOC } from '@/server/lib/firestore';

export default defineEventHandler(async (event) => {
	try {
		const query = useQuery(event.req);
		const where = query.where ? JSON.parse(query.where as any) : null;
		return {
			status: 'OK',
			result: await DELETE_DOC('page', where.id),
			msgs: [{ type: 'success', message: 'message.page_success_deleted' }],
		};
	} catch (error) {
		return error;
	}
});
