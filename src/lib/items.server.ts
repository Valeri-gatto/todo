import type { Item } from "./Types";
import { MongoClient, ObjectId, ServerApiVersion } from 'mongodb';
import { DB_PASS, DB_USER, DB_ADDR } from '$env/static/private';

const dbUri = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_ADDR}/?retryWrites=true&w=majority&appName=Test`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(dbUri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

const db = client.db("todo").collection<Omit<Item, "id">>("todo");


class Database {
    // A base class whose constructor returns the object it's given
    async getAll(): Promise<Item[]> {
        const res = await db.find().toArray();
        return res.map(todo => ({ id: todo._id.toHexString(), text: todo.text, done: todo.done }))
    }

    async addTask(text: string): Promise<string> {
        const res = await db.insertOne({
            text,
            done: false
        });
        return res.insertedId.toHexString()
    }

    async removeTask(id: Item["id"]): Promise<boolean> {
        const res = await db.deleteOne({
            _id: ObjectId.createFromHexString(id)
        });
        return res.deletedCount !== 0;
    }

    async setStatus(id: Item["id"], done: boolean): Promise<boolean> {
        const res = await db.updateOne(
            {
                _id: ObjectId.createFromHexString(id),
            },
            {
                $set: {
                    done,
                }
            }
        )
        return res.modifiedCount != 0;
    }
}

export const itemsDB = new Database();

