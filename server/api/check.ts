import { CURRENT_USER } from "../lib/firestore";

export default defineEventHandler(async (event) => {
    try {
        return CURRENT_USER();
    } catch (error) {
        return error;
    }
})