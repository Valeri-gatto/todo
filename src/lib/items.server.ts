import type { Items } from "./Types";
import { v4 as uuid } from 'uuid';
import { readFileSync, writeFileSync } from 'node:fs';


class Database {
    #data: Items[]
    #fileStorage: string
    // A base class whose constructor returns the object it's given
    constructor(fileStorage: string) {
        this.#fileStorage = fileStorage;
        try {
            const data = readFileSync(this.#fileStorage, { encoding: "utf-8" })
            this.#data = JSON.parse(data);
        } catch {
            this.#data = [];
        }
    }
    #save() {
        writeFileSync(this.#fileStorage, JSON.stringify(this.#data))
    }

    getAll(): Items[] {
        return this.#data
    }

    addTask(text: string): Items["id"] {
        const id = uuid();
        this.#data.push({
            id,
            // можно сделать id через: crypto.randomUUID();
            text,
            done: false
        });
        this.#save();
        return id;
    }

    removeTask(id: Items["id"]): boolean {
        const index = this.#data.findIndex((t) => t.id === id);
        if (index === -1) {
            return false;
        }
        this.#data.splice(index, 1);
        this.#save();
        return true;
    }

    setStatus(id: Items["id"], done: boolean): boolean {
        const task = this.#data.find(t => t.id === id);
        if (!task) {
            return false;
        }
        task.done = done;
        this.#save();
        return true;
    }
}

export const itemsDB = new Database("D:/программистка/todo/db.json");
