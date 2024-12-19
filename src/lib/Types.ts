
export type Item = {
    user_id: string;
    id: string;
    text: string;
    done: boolean;
};

export type User = {
    name: string;
    password: string;
}

export type Filter = "all" | "todo" | "done";


export function checkPassword(pas: string): string[] {
    const errors: string[] = [];
    if (pas.length < 6) {
        errors.push("Password too short");
    }
    if (pas.length > 15) {
        errors.push("Password too long");
    }
    if (!pas.match(/\d/)) {
        errors.push("Password must include at least one digit")
    }
    if (!pas.match(/[A-Z]/)) {
        errors.push("Password must include at least one capital letter")
    }
    if (!pas.match(/^[A-Za-z0-9!@#$%^&*(\-)=+_~]*$/)) {
        errors.push("Password includes forbidden characters")
    }
    return errors;
}