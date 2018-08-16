/* @flow */

import type { UserInfo, User } from './userTypes';

import {
    createUser as createDatabaseUser,
    getUserByUsername,
} from './userCollections';
import { createUser as createFirebaseUser }
    from '../firebase/firebaseAuthServices';

export const getUserInformation = () => {
    throw new Error('Not implemented yet');
};
/* TODO: Finish implementation
    async (username: string): Promise<UserInfo | null> => {
        const user = await getUserByUsername(username);
        if (user) {
            const firebaseUserInfo = getUserInfo(user.uid);
            return { ...firebaseUserInfo, ...user };
        }
        return null;
    };
*/

export const createUser = async (user: User): Promise<UserInfo> => {
    const userDatabase = await getUserByUsername(user.username);
    if (!userDatabase) {
        const createdUser = await createFirebaseUser(user);
        await createDatabaseUser(user);
        return { ...createdUser, username: user.username };
    }
    throw new Error('Username already exists');
};
