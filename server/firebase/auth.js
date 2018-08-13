import { auth } from './admin';
import Error from '../api/models/error';

class User {
    constructor(firebaseUserJson) {
        this.uid = firebaseUserJson.uid;
        this.email = firebaseUserJson.email;
        this.displayName = firebaseUserJson.displayName;
        this.photoURL = firebaseUserJson.photoURL;
    }
}

const createUser = async (user, withSecret = false) => {
    try {
        const userRecord = await auth.createUser(user);
        return withSecret ? userRecord : new User(userRecord);
    } catch (error) {
        throw new Error(500, error.errorInfo.message);
    }
};

export default createUser;
