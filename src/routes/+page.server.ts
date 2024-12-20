import { itemsDB } from '$lib/items.server';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { Actions } from './$types';
import { COOKIE_PARAMS, SESSION_COOKIE_NAME } from '$lib/jwt';

export const actions = {
    addTask: async ({ request, locals }) => {
        const data = await request.formData();
        const text = data.get("newTask")?.toString().trim();
        if (!text || !locals.userId) {
            return
        }
        await itemsDB.addTask(text, locals.userId);
    },
    removeTask: async ({ request, locals }) => {
        const data = await request.formData();
        const idTask = data.get("taskId")?.toString().trim();
        if (idTask && locals.userId) {
            await itemsDB.removeTask(idTask, locals.userId)
        }
    },
    deleteCookies: async ({ cookies }) => {
        cookies.delete(SESSION_COOKIE_NAME, { path: COOKIE_PARAMS.path });
        redirect(302, '/login');
    }
} satisfies Actions;


export const load: PageServerLoad = async ({ locals }) => {
    if (locals.userId) {
        return { items: await itemsDB.getAll(locals.userId) };
    } else {
        redirect(302, '/login');
    }
};