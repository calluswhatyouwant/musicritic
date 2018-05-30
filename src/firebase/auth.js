import { auth } from './firebase-config';

export const signInWithEmailAndPassword = (email, password) =>
    auth().signInWithEmailAndPassword(email, password);

export const getCurrentUser = () => auth().currentUser;

export const signInWithFacebook = () => {
    const facebookProvider = new auth.FacebookAuthProvider();

    auth().signInWithRedirect(facebookProvider).then(() => {
        auth().getRedirectResult().then((result) => {
            if (result.credential) {
                const token = result.credential.accessToken;
            }
            const user = result.user;
        }).catch(error => console.log(error.code));
    });
}

export const getAccessToken = () => getCurrentUser().getIdToken();
