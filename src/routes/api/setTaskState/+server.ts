import { itemsDB } from '$lib/items.server';
import { error, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
    const data = await request.json();
    if (typeof data !== 'object') {
        error(400, 'invalid data');
    }
    const taskId = data.id;
    const taskState = data.done;
    if (typeof taskId !== 'string' || typeof taskState !== 'boolean') {
        error(400, 'invalid data');
    }
    if (!itemsDB.setStatus(taskId, taskState)) {
        error(410, 'task not found');
    }
    return new Response('');
};