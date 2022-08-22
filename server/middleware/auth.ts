import { CURRENT_USER } from "../lib/firestore";

export default defineEventHandler(async (event) => {
    if (event.req.url.indexOf('/pz') >= 0) {
        const user = await CURRENT_USER();
        if (!user) {
            event.res.writeHead(301, { Location: '/login' });
        }
    }
})