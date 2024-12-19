import { itemsDB } from '$lib/items.server';
import { error, redirect, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request, locals }) => {
    const data = await request.json();
    if (typeof data !== 'object') {
        error(400, 'invalid data');
    }
    const taskId = data.id;
    const taskState = data.done;
    const userId = locals.userId;
    if (typeof taskId !== 'string' || typeof taskState !== 'boolean') {
        error(400, 'invalid data');
    }
    if (!userId) {
        redirect(404, '/login')
    }
    if (!itemsDB.setStatus(taskId, userId, taskState)) {
        error(410, 'task not found');
    }
    return new Response('');
};