import type { Items } from '$lib/Types';
import type { PageServerLoad } from './$types';
import type { Actions } from './$types';

export const actions = {
    addTask: async (ev) => {
        console.log(ev)
    },
    removeTask: async () => {
    }
} satisfies Actions;

const items: Items[] = [{
    id: "djfsidfkmel",
    text: "sodwm",
    done: false
}];

export const load: PageServerLoad = async () => {
    return { items };
};
