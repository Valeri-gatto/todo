import { itemsDB } from '$lib/items.server';
import type { PageServerLoad } from './$types';
import type { Actions } from './$types';


export const actions = {
    addTask: async ({ request }) => {
        const data = await request.formData();
        const text = data.get("newTask")?.toString().trim();
        if (!text) {
            return
        }
        itemsDB.addTask(text)
    },
    removeTask: async ({ request }) => {
        const data = await request.formData();
        const idTask = data.get("taskId")?.toString().trim();
        if (idTask) {
            itemsDB.removeTask(idTask)
        }
    }
} satisfies Actions;


export const load: PageServerLoad = async () => {
    return { items: itemsDB.getAll() };
};
