import type { Handle } from '@sveltejs/kit';
import { ObjectId } from 'mongodb';

export const handle: Handle = async ({ event, resolve }) => {
    try {
        event.locals.userId = ObjectId.createFromHexString(event.cookies.get('userID') || "");
    } catch {
        event.cookies.delete("userID", { path: "/" })
    }
    const response = await resolve(event);
    return response;
};