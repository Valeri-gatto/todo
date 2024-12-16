export type Item = {
    id: string;
    text: string;
    done: boolean;
};

export type User = {
    name: string;
    password: string;
}

export type Filter = "all" | "todo" | "done";


export function checkPassword(pas: string): boolean {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/;
    return regex.test(pas);
}