/* @flow */

import express from 'express';

import { createUser } from './userServices';

const router = express.Router();

router.post('/users', (req, res) => {
    const user = req.body;
    createUser(user)
        .then(newUser => res.status(201).send(newUser))
        .catch(error => res.status(error.status).send(error));
});

export default router;
