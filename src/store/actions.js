import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
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
    const name = data.name;
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        // Signed in
        const user = userCredential.user;
        console.log('userCredential: ', userCredential);
        console.log('user.uid ', user.uid);
        console.log('accessToken ', user.accessToken);
        this.users.push({
          id: user.uid,
          name,
          email,
        });
        console.log(this.users);
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
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        // Signed in
        const user = userCredential.user;
        this.accessToken = user.accessToken;
        console.log('login accessToken from the state: ', this.accessToken);
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  },
  signOutUser() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log('Sign-out successful');
        this.accessToken = '';
      })
      .catch(error => {
        console.log(error);
      });
  },
};
