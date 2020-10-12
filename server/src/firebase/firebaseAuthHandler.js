import admin from "firebase-admin";

function checkAuth(req, res, next) {
  if (req.headers.authorization) {
    admin.auth().verifyIdToken(req.headers.authorization)
      .then(() => {
        next()
      }).catch(() => {
        res.status(401).send('Unauthorized')
      });
  } else {
    res.status(401).send('Unauthorized, no header token provided')
  }
}

export default checkAuth