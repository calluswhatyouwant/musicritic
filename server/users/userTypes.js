/* @flow */

export type User = {
    uid: string | null,
    email: string,
    username: string,
    password: string,
    displayName: string,
}

export type UserInfo = {
    uid: string | null,
    email: string,
    username: string | null,
    displayName: string | null,
}
