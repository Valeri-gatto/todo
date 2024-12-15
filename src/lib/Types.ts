export type Item = {
    id: string;
    text: string;
    done: boolean;
};

export type Filter = "all" | "todo" | "done";