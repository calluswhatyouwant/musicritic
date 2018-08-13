import dotenv from 'dotenv';
import path from 'path';

if (process.env.NODE_ENV !== 'production') {
    dotenv.config({ path: path.join(__dirname, '..', '.env') });
}

let port;
if (process.env.NODE_ENV === 'production') {
    port = process.env.PORT;
}

const config = {};

config.spotify = {
    scope: 'user-read-email user-read-recently-played user-top-read',
    authBaseUri: 'https://accounts.spotify.com',
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
};

config.host = {
    baseUri: process.env.SERVER_BASE_URI || 'http://localhost',
    port: port || process.env.SERVER_PORT || 5000,
    production: process.env.NODE_ENV === 'production',
};

config.client = {
    baseUrl: process.env.CLIENT_URL || 'http://localhost:3000',
    errorPath: '/error',
    successPath: '/auth',
};

const serviceAccount = {
    project_id: process.env.FIREBASE_PROJECT_ID,
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    private_key: process.env.FIREBASE_PRIVATE_KEY,
};

config.firebase = {
    serviceAccount: process.env.FIREBASE_SERVICE_ACCOUNT || serviceAccount,
    databaseUrl: process.env.FIREBASE_DATABASE_URL,
};

export default config;
