/* @flow */

import { ref } from '../firebase/firebaseAdmin';

type UserModel = {
    uid: string | null,
    username: string,
}

export const Users = ref.child('users');

export const createUser = async (user: UserModel) => {
    Users.child(user.uid).set({ username: user.username });
};

export const getUserByUsername =
    async (username: string): Promise<UserModel> => {
        const userSnapshot = await Users.orderByChild('username')
            .equalTo(username)
            .once('value');
        return userSnapshot.val();
    };
