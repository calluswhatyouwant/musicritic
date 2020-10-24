import { auth } from './firebaseAdmin';

function checkAuth(req, res, next) {
    if (req.headers.authorization) {
        auth.verifyIdToken(req.headers.authorization)
            .then(async token => {
                req.user = await auth.getUser(token.uid);
                next();
            })
            .catch(() => {
                res.status(401).send('Unauthorized');
            });
    } else {
        res.status(401).send('Unauthorized, no header token provided');
    }
}

export default checkAuth;
