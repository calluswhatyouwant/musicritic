const config = {};

config.spotify = {
    scope: 'user-read-email user-read-recently-played',
    authBaseUri: 'https://accounts.spotify.com',
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
};

config.host = {
    baseUri: process.env.BASE_URI || 'http://localhost',
    port: process.env.PORT || 5000,
    production: process.env.NODE_ENV === 'production',
};

config.client = {
    baseUri: process.env.CLIENT_BASE_URI || 'http://localhost:3000',
    errorPath: '/error',
    successPath: '/auth',
};

const serviceAccount = {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY,
};

config.firebase = {
    serviceAccount: process.env.FIREBASE_SERVICE_ACCOUNT || serviceAccount,
    databaseUrl: process.env.FIREBASE_DATABASE_URL,
};

export default config;
