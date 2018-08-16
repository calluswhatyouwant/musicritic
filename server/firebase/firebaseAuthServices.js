/* @flow */

import { auth } from './firebaseAdmin';

type FirebaseUser = {
    uid: string | null,
    email: string,
    displayName: string,
}

const userRecordToJson = (userRecord): FirebaseUser => ({
    uid: userRecord.uid,
    email: userRecord.email,
    displayName: userRecord.displayName,
    photoURL: userRecord.photoURL,
});

export const createUser = async (user: FirebaseUser): Promise<FirebaseUser> => {
    try {
        const userRecord = await auth.createUser(user);
        return userRecordToJson(userRecord);
    } catch (error) {
        throw new Error(error.errorInfo.message);
    }
};

export const getUserInfo = async (uid: string): Promise<FirebaseUser> =>
    userRecordToJson(auth().getUser(uid));
