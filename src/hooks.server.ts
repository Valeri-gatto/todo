import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
    event.locals.userId = event.cookies.get('userID');
    const response = await resolve(event);
    return response;
};