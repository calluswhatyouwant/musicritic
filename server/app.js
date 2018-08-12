import express from 'express';
import http from 'http';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import config from './config';
import authRouter from './spotify/auth/routes';
import usersApi from './api/controllers/users';

if (!config.host.production) {
    dotenv.config({ path: '../.env' });
}

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.use('/auth', authRouter);
app.use(usersApi);

app.use((err, req, res) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const server = http.createServer(app);
const { host: { port } } = config;

server.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});
