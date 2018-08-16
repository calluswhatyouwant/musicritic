import * as admin from 'firebase-admin/';

import config from '../config';

if (admin.apps.length === 0) {
    admin.initializeApp({
        credential: admin.credential.cert(config.firebase.serviceAccount),
        databaseURL: config.firebase.databaseUrl,
    });
}

export const db = admin.database();
export const ref = db.ref('/musicritic');
export const auth = admin.auth();
