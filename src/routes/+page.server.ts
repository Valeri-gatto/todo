import { itemsDB } from '$lib/items.server';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { Actions } from './$types';


export const actions = {
    addTask: async ({ request }) => {
        const data = await request.formData();
        const text = data.get("newTask")?.toString().trim();
        if (!text) {
            return
        }
        await itemsDB.addTask(text)
    },
    removeTask: async ({ request }) => {
        const data = await request.formData();
        const idTask = data.get("taskId")?.toString().trim();
        if (idTask) {
            await itemsDB.removeTask(idTask)
        }
    },
    deleteCookies: async ({ cookies }) => {
        cookies.delete('userID', { path: '/' });
        redirect(302, '/login');
    }
} satisfies Actions;


export const load: PageServerLoad = async () => {
    return { items: await itemsDB.getAll() };
};

// до получения всего проверить наличие куки (функция бд). Если нет - редирект на логин + отобразить ошибку
// если есть - редирект на главную страницу с фильтром по задачам конкретного пользователя.
// запрос в бд для их получения
