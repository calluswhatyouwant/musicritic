/* @flow */

import express from 'express';
import http from 'http';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import bodyParser from 'body-parser';
import config from './config';
import authRouter from './spotify/spotifyAuthController';
import trackReviewsApi from './reviews/trackReviewController';
import albumReviewsApi from './reviews/albumReviewController';
import trackApi from './track/trackController';
import albumApi from './album/albumController';
import checkAuth from './firebase/firebaseAuthHandler';
import { initSpotifyToken } from './spotify/util';

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

initSpotifyToken();

app.use('/app', express.static('public'));

app.get('/hello', checkAuth, (req, res) =>
    res.send(`Hello, ${req.user.displayName}!`)
);

app.get('/', (req, res) => res.send(`Hello, it's working!!!`));

app.use(authRouter);
app.use(trackApi);
app.use(albumApi);
app.use(trackReviewsApi);
app.use(albumReviewsApi);

const server = http.createServer(app);
const { port } = config.host;

server.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});

export default app;
