import { LOGOUT } from "../lib/firestore";

export default defineEventHandler(async (event) => {
    try {
        LOGOUT();
        return { status: 'OK' };
    } catch (error) {
        return error
    }
})