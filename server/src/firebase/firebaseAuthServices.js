/* @flow */

import { auth } from './firebaseAdmin';
import { getCurrentUser } from '../spotify/util';

type FirebaseUser = {
    uid: string | null,
    email: string,
    displayName: string,
};

export const loginWithSpotify = async (userToken: string): Promise<string> => {
    const userSpotify = await getCurrentUser(userToken);
    try {
        await auth.getUser(userSpotify.uid);
    } catch {
        await auth.createUser(userSpotify);
    } finally {
        return await auth.createCustomToken(userSpotify.uid);
    }
};

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
