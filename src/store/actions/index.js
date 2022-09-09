import { getDatabase, ref, set, onValue } from 'firebase/database';
const db = getDatabase();
import auth from './auth.js';
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
  ...auth,
  //Trader operations
  //Adding new trader to the db (called on sign up action).
  createTrader(userId, name, email) {
    set(ref(db, 'traders/' + userId), {
      userId,
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
  //Opening a new account
  openTraderAccount(userId, currency, amount) {
    set(ref(db, 'users/' + userId), {
      currency,
      amount,
    });
  },
};
