
import { JWT_KEY } from '$env/static/private';
import { signSync, verifySync } from '@node-rs/jsonwebtoken';
import type { CookieSerializeOptions } from 'cookie';

const loginLength = /* 1 month */ 30 * 24 * 60 * 60;

export const SESSION_COOKIE_NAME = "session";

export const COOKIE_PARAMS: CookieSerializeOptions & { path: string } = {
    path: '/',
    httpOnly: true,
    sameSite: "lax",
}

export function getCookieParams(): CookieSerializeOptions & { path: string } {
    return {
        ...COOKIE_PARAMS,
        expires: (new Date(Date.now() + loginLength * 1000)),
    }
}

export type JWT_Token_Content = {
    userID: string
}
const getUtcTimestamp = () => Math.floor(new Date().getTime() / 1000)

export function jwt_sign(content: JWT_Token_Content): string {
    const iat = getUtcTimestamp();
    return signSync({
        iat, // issued at (время выдачи)
        exp: iat + loginLength, // expires (время окончания)
        data: content, // произвольные данные
    }, JWT_KEY)
}

export function jwt_verify(token: string): JWT_Token_Content | null {
    try {
        return verifySync(token, JWT_KEY)["data"] as JWT_Token_Content;
    } catch {
        return null
    }
}