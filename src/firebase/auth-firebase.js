import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from './exports.js';

const auth = getAuth();
const provider = new GoogleAuthProvider();

export function userRegister(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export function userLogIn(email, password) {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      return user;
    });
}

export function googleLogIn() {
  return signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential.accessToken;
      // const user = result.user;
      return credential;
    });
}

export function forgetPassword(email) {
  return sendPasswordResetEmail(auth, email);
}
