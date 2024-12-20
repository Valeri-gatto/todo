import type { Handle } from '@sveltejs/kit';
import { ObjectId } from 'mongodb';
import { COOKIE_PARAMS, jwt_verify, SESSION_COOKIE_NAME } from '$lib/jwt';

export const handle: Handle = async ({ event, resolve }) => {
    const token = event.cookies.get(SESSION_COOKIE_NAME);
    try {
        if (!token) {
            throw new Error();
        }
        const id = jwt_verify(token)?.userID;
        if (!id) {
            throw new Error();
        }
        event.locals.userId = ObjectId.createFromHexString(id);
    } catch {
        event.cookies.delete(SESSION_COOKIE_NAME, { path: COOKIE_PARAMS.path })
    }
    const response = await resolve(event);
    return response;
};