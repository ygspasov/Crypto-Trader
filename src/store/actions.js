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
import { getDatabase, ref, set, onValue } from 'firebase/database';
const db = getDatabase();

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
        const uid = userCredential.user.uid;
        console.log('userCredential: ', userCredential);
        console.log('uid ', uid);
        console.log('accessToken ', user.accessToken);
        this.traders.push({
          uid,
          name,
          email,
        });
        this.createTrader(uid, name, email);
        console.log(this.traders[0]);
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
    this.name = name;
  },
  signInUser(data) {
    const email = data.email;
    const password = data.password;
    const auth = getAuth();
    this.traderEmail = email;
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
  //db
  //Adding new trader to the db (called on sign up action).
  createTrader(userId, name, email) {
    set(ref(db, 'traders/' + userId), {
      name,
      email,
      admin: false,
      premium: false,
    });
  },
  //Fetching all the active traders from the db
  loadTraders() {
    const traderData = ref(db, 'traders/');
    onValue(traderData, snapshot => {
      const data = snapshot.val();
      console.log('db traders: ', data);
      //Setting store traders to database traders
      this.traders = data;
      console.log('store traders: ', this.traders);
    });
  },
};
