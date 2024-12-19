import { itemsDB } from '$lib/items.server.js';
import { checkPassword } from '$lib/Types.js';
import { fail, redirect, type Actions } from '@sveltejs/kit';

export const actions = {
    login: async ({ request, cookies }) => {
        const data = await request.formData();
        const userName = data.get("username")?.toString().trim();
        const password = data.get("password")?.toString().trim();
        const repeatPassword = data.get("repeatPassword")?.toString().trim();
        const pageType = data.get("type")?.toString().trim();

        // в обоих случаях проверяем наличие пароля и соответствие его условиям
        if (!userName || !password) {
            return fail(400, { error: 'Empty username or password', pageType })
        }

        if (pageType === 'login') {
            // проверить наличие логина в базе данных
            const userId = await itemsDB.findUser(userName, password);
            if (!userId) {
                return fail(400, { error: 'Invalid login or password', pageType })
            }
            cookies.set('userID', userId, { path: '/' });
            redirect(302, '/');
        } else {
            if (checkPassword(password).length !== 0) {
                return fail(400, { error: 'Invalid login or password', pageType });
            }
            // проверяем, что второй пароль совпал с первым
            if (repeatPassword !== password) {
                return fail(400, { error: 'Invalid login or password', pageType })
            }
            // добавляем пользователя
            const userId = await itemsDB.addUser(userName, password);
            if (!userId) {
                return fail(400, { error: 'Username already taken', pageType })
            }
            // установить куку в браузере
            cookies.set('userID', userId, { path: '/' });
            redirect(302, '/');
        }
    }
} satisfies Actions;
