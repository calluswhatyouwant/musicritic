/* @flow */

import * as admin from 'firebase-admin/';

import config from '../config';

if (admin.apps.length === 0) {
    admin.initializeApp({
        credential: admin.credential.cert(config.firebase.serviceAccount),
        databaseURL: config.firebase.databaseUrl,
    });
}

export const db = admin.firestore();
export const auth = admin.auth();
