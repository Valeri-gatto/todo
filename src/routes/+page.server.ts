import { items } from '$lib/items.server';
import type { PageServerLoad } from './$types';
import type { Actions } from './$types';
import { v4 as uuid } from 'uuid';


export const actions = {
    addTask: async ({ request }) => {
        const data = await request.formData();
        const text = data.get("newTask")?.toString().trim();
        if (!text) {
            return
        }
        items.push({
            id: uuid(),
            // можно сделать id через: crypto.randomUUID();
            text,
            done: false
        });
    },
    removeTask: async ({ request }) => {
        const data = await request.formData();
        const idTask = data.get("taskId")?.toString().trim();
        const index = items.findIndex((t) => t.id === idTask);
        if (index === -1) {
            return
        }
        items.splice(index, 1);
    }
} satisfies Actions;


export const load: PageServerLoad = async () => {
    return { items };
};
