import express from 'express';

import Users from '../collections';
import Error from '../models/error';
import createUser from '../../firebase/auth';

const router = express.Router();

const usernameExists = async (username) => {
    const userSnapshot = await Users.orderByChild('username')
        .equalTo(username)
        .once('value');
    const databaseUser = userSnapshot.val();
    if (databaseUser) {
        throw new Error(500, 'Username already exists');
    }
};

const signUp = async (user) => {
    await usernameExists(user.username).catch();
    const newUser = await createUser(user);
    Users.child(newUser.uid).set({ username: user.username });
    return newUser;
};

router.post('/users', (req, res) => {
    const user = req.body;
    signUp(user)
        .then(newUser => res.status(201).send(newUser))
        .catch(error => res.status(error.status).send(error));
});

export default router;
