import type { Item, User } from "./Types";
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
const dbUsers = client.db("todo").collection<User>("users");


class Database {
    async getAll(): Promise<Item[]> {
        const res = await db.find().toArray();
        return res.map(todo => ({ id: todo._id.toHexString(), text: todo.text, done: todo.done }))
    }
    // добавить фильтр по id пользователя

    async addTask(text: string): Promise<string> {
        const res = await db.insertOne({
            text,
            done: false
        });
        return res.insertedId.toHexString()
    }
    // добавить фильтр по id пользователя

    async removeTask(id: Item["id"]): Promise<boolean> {
        const res = await db.deleteOne({
            _id: ObjectId.createFromHexString(id)
        });
        return res.deletedCount !== 0;
    }
    // добавить фильтр по id пользователя

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
    // добавить фильтр по id пользователя


    // функция добавления нового пользователя
    async addUser(name: User["name"], password: User["password"]): Promise<string> {
        const res = await dbUsers.insertOne({
            name,
            password,
        });
        return res.insertedId.toHexString();
    }

    // функция проверки наличия логина пользователя в базе данных
    async findUser(name: User["name"], password: User["password"]): Promise<ObjectId | undefined> {
        const res = await dbUsers.findOne({
            name,
            password
        });
        return res?._id;
    }
}

export const itemsDB = new Database();

