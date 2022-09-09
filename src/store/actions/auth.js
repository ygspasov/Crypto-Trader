import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithCustomToken,
} from 'firebase/auth';
const firebaseConfig = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_DOMAIN,
  databaseURL: process.env.VUE_APP_DATABASE_URL,
  projectId: process.env.VUE_APP_PROJECT_ID,
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
import { signOut } from 'firebase/auth';
export default {
  signInUser(data) {
    const email = data.email;
    const password = data.password;
    // const auth = getAuth();
    this.traderEmail = email;
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        // Signed in
        const uid = userCredential.user.uid;
        // const token = userCredential.user.accessToken;
        const token = userCredential._tokenResponse.idToken;
        this.accessToken = token;
        console.log('local traders: ', this.traders);
        console.log('user: ', userCredential);
        console.log('userCredential', userCredential);
        localStorage.setItem('uid', uid);
        localStorage.setItem('token', token);
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  },
  signUpUser(data) {
    const email = data.email;
    const password = data.password;
    const name = data.name;
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        // Signed in
        const user = userCredential.user;
        const uid = userCredential.user.uid;
        console.log('userCredential: ', userCredential);
        console.log('uid ', uid);
        console.log('accessToken ', user.accessToken);
        this.createTrader(uid, name, email);
        this.signedUp = true;
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
    this.name = name;
  },
  autoLogin() {
    const auth = getAuth();
    let token = localStorage.getItem('token');
    console.log('localstorage token: ', token);

    signInWithCustomToken(auth, token)
      .then(userCredential => {
        // Signed in
        console.log(userCredential);
      })
      .catch(error => {
        console.log('catch block:');
        const errorCode = error.code;
        console.log(errorCode);
        const errorMessage = error.message;
        console.log(errorMessage);
        // ...
      });
  },
  signOutUser() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log('Sign-out successful');
        this.accessToken = '';
        localStorage.removeItem('token');
        localStorage.removeItem('uid');
      })
      .catch(error => {
        console.log(error);
      });
  },
};
