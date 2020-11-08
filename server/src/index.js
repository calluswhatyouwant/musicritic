/* @flow */

import express from 'express';
import http from 'http';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import bodyParser from 'body-parser';
import config from './config';
import authRouter from './spotify/spotifyAuthController';
import trackReviewsApi from './track-reviews/trackReviewController';
import trackApi from './track/trackController';
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

app.use(authRouter);
app.use(trackApi);
app.use(trackReviewsApi);

const server = http.createServer(app);
const { port } = config.host;

server.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});
