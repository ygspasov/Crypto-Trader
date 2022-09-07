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
  async loadCrypto() {
    if (this.crypto.length > 0) this.crypto = [];
    const APIkey = process.env.VUE_APP_MY_ENV_VARIABLE;
    const response = await fetch(
      `https://api.nomics.com/v1/currencies/ticker?key=${APIkey}`
    );
    const responseData = await response.json();
    responseData.forEach(el => {
      el.price_date = new Date(el.price_date).toLocaleDateString('en-us', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
      });
      el.high_timestamp = new Date(el.high_timestamp).toLocaleDateString(
        'en-us',
        {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
        }
      );
      this.crypto.push({
        id: el.id,
        name: el.name,
        currency: el.currency,
        price: el.price,
        'price date': el.price_date,
        'number of exchanges': el.num_exchanges,
        'market cap': el.market_cap,
        'market cap dominance': el.market_cap_dominance,
        high: el.high,
        'high time stamp': el.high_timestamp,
      });
    });
    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to fetch');
      throw error;
    }
  },
  //auth
  signUpUser(data) {
    const email = data.email;
    const password = data.password;
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        // Signed in
        const user = userCredential.user;
        console.log('userCredential: ', userCredential);
        console.log('user.uid ', user.uid);
        console.log('accessToken ', user.accessToken);
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
  },
  signInUser(data) {
    const email = data.email;
    const password = data.password;
    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        // Signed in
        const uid = userCredential.user.uid;
        // const token = userCredential.user.accessToken;
        const token = userCredential._tokenResponse.idToken;
        console.log(
          'userCredential._tokenResponse.idToken: ',
          userCredential._tokenResponse.idToken
        );
        this.accessToken = token;
        this.users.push({
          uid,
          token,
        });
        console.log('local users: ', this.users);
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
