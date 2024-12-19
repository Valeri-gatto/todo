import type { Item, User } from "./Types";
import { MongoClient, MongoServerError, ObjectId, ServerApiVersion } from 'mongodb';
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

const db = client.db("todo").collection<Omit<Item, "id" | "user_id"> & {
    user_id: ObjectId
}>("todo");
const dbUsers = client.db("todo").collection<User>("users");


class Database {
    async getAll(user_id: ObjectId): Promise<Item[]> {
        const res = await db.find({
            user_id,
        }).toArray();
        return res.map(todo => ({ user_id: todo.user_id.toHexString(), id: todo._id.toHexString(), text: todo.text, done: todo.done }))
    }

    async addTask(text: string, user_id: ObjectId): Promise<string> {
        const res = await db.insertOne({
            user_id,
            text,
            done: false
        });
        return res.insertedId.toHexString()
    }

    async removeTask(id: Item["id"], user_id: ObjectId): Promise<boolean> {
        const res = await db.deleteOne({
            user_id,
            _id: ObjectId.createFromHexString(id)
        });
        return res.deletedCount !== 0;
    }

    async setStatus(id: Item["id"], user_id: ObjectId, done: boolean): Promise<boolean> {
        const res = await db.updateOne(
            {
                _id: ObjectId.createFromHexString(id),
                user_id,
            },
            {
                $set: {
                    done,
                }
            }
        )
        return res.modifiedCount != 0;
    }

    // функция добавления нового пользователя
    async addUser(name: User["name"], password: User["password"]): Promise<string | undefined> {
        try {
            const res = await dbUsers.insertOne({
                name,
                password,
            })
            return res.insertedId.toHexString();
        }
        catch (err) {
            if (err instanceof MongoServerError && err.code === 11000) {
                return undefined;
            } else {
                throw err;
            }

        }
    }

    // функция проверки наличия логина пользователя в базе данных
    async findUser(name: User["name"], password: User["password"]): Promise<string | undefined> {
        const res = await dbUsers.findOne({
            name,
            password
        });
        return res?._id.toHexString();
    }
}

export const itemsDB = new Database();

