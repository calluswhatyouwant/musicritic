/**
 * Default values for the listed environment variables.
 * To use a custom value, just add the environment variable on your OS
 * using the names given on the following keys.
 */
module.exports = {
    SERVER_BASE_URL: process.env.SERVER_BASE_URL || 'http://localhost:5000',
    FIREBASE_DATABASE_URL: '',
    FIREBASE_AUTH_DOMAIN: '',
    FIREBASE_API_KEY: '',
};
